//! Motor de Holmex para la demo web.
//!
//! Este crate envuelve el núcleo de cálculo de Holmex-RS (`core/`, copiado desde
//! el repositorio Holmex-RS con `motor/copiar-core.*`) y lo compila a WebAssembly
//! para que el Worker de Cloudflare lo ejecute en el servidor. El navegador nunca
//! recibe este código: solo recibe la respuesta recortada que arma `calcular_demo`.
//!
//! Qué acepta la demo: dimensiones de la labor, largo de barra, diámetros, RMR,
//! densidad de roca y modo de malla. El resto de los parámetros queda fijo en los
//! valores de referencia del ejecutable (explosivo de catálogo, carga de contorno
//! reducida con sus valores iniciales, sin iniciación electrónica).
//!
//! Qué devuelve: el perfil de la labor, la posición de cada tiro (cara y fondo),
//! el número de tiros por tipo, el largo de tiro y el avance. No devuelve cargas,
//! costos, datos de rainura, geomecánica, energía, fragmentación ni secuencia.

#[path = "../core/mod.rs"]
pub mod core;

use crate::core::geotech;
use crate::core::models::{BlastParams, HoleCoordinate, HoleType, MeshMode};
use crate::core::profile3d::Hole3D;
#[cfg(test)]
use crate::core::HolmexEngine;
use crate::core::{base, crown, cut, explosives, lifters, profile3d, spatial, validation, walls};
use serde::{Deserialize, Serialize};

/// Parámetros que la demo deja ingresar.
#[derive(Debug, Deserialize)]
#[serde(deny_unknown_fields)]
pub struct DemoInput {
    pub ancho_labor: f64,
    pub alto_labor: f64,
    pub largo_barra: f64,
    pub diametro_tiro_vacio_mm: f64,
    pub diametro_tiro_cargado_mm: f64,
    pub rmr: f64,
    pub densidad_roca: f64,
    pub modo: String,
}

#[derive(Debug, Serialize)]
pub struct DemoHole {
    /// Tipo: alivio, rainura, zapatera, corona, caja o auxiliar.
    pub tipo: &'static str,
    /// Diámetro (mm).
    pub d: f64,
    /// Cara del tiro en el frente (m, eje de la labor en x = 0, centro en y = 0).
    pub x: f64,
    pub y: f64,
    /// Fondo del tiro (m); z es la profundidad desde el frente hacia el macizo.
    pub xf: f64,
    pub yf: f64,
    pub zf: f64,
}

#[derive(Debug, Serialize)]
pub struct DemoProfile {
    pub ancho_m: f64,
    pub alto_hastial_m: f64,
    pub alto_boveda_m: f64,
    pub alto_m: f64,
}

#[derive(Debug, Serialize)]
pub struct DemoCount {
    pub rainuras: u32,
    pub zapateras: u32,
    pub coronas: u32,
    pub cajas: u32,
    pub auxiliares: u32,
    pub alivio: u32,
    pub total_cargados: u32,
}

#[derive(Debug, Serialize)]
pub struct DemoOutput {
    pub ok: bool,
    pub modo: String,
    pub perfil: DemoProfile,
    pub tiros: Vec<DemoHole>,
    pub conteo: DemoCount,
    pub largo_tiro_m: Option<f64>,
    pub avance_m: Option<f64>,
}

#[derive(Debug, Serialize)]
struct DemoError {
    ok: bool,
    error: String,
}

// Rangos de la demo: los mismos valores que ofrece el formulario del ejecutable,
// sin campos libres. Así nadie puede recorrer el motor con valores arbitrarios.
const DIMENSIONES_M: [f64; 5] = [3.0, 3.5, 4.0, 4.5, 5.0];
const BARRAS_M: [f64; 6] = [1.4, 1.8, 2.4, 3.0, 3.6, 4.5];
const DIAM_VACIO_MM: [f64; 4] = [76.0, 89.0, 102.0, 127.0];
const DIAM_CARGADO_MM: [f64; 6] = [38.0, 41.0, 45.0, 48.0, 51.0, 64.0];

fn una_de(valor: f64, opciones: &[f64]) -> bool {
    valor.is_finite() && opciones.iter().any(|o| (o - valor).abs() < 1e-6)
}

fn validar(e: &DemoInput) -> Result<MeshMode, String> {
    let mut errores = Vec::new();
    if !una_de(e.ancho_labor, &DIMENSIONES_M) {
        errores.push("El ancho de la labor debe ser 3,0; 3,5; 4,0; 4,5 o 5,0 m");
    }
    if !una_de(e.alto_labor, &DIMENSIONES_M) {
        errores.push("El alto de la labor debe ser 3,0; 3,5; 4,0; 4,5 o 5,0 m");
    }
    if !una_de(e.largo_barra, &BARRAS_M) {
        errores.push("Largo de barra no disponible en la demo");
    }
    if !una_de(e.diametro_tiro_vacio_mm, &DIAM_VACIO_MM) {
        errores.push("Diámetro de tiro vacío no disponible en la demo");
    }
    if !una_de(e.diametro_tiro_cargado_mm, &DIAM_CARGADO_MM) {
        errores.push("Diámetro de tiro cargado no disponible en la demo");
    }
    // RMR en pasos enteros y densidad en pasos de 0,01 t/m³.
    if !(e.rmr.is_finite() && (20.0..=90.0).contains(&e.rmr) && e.rmr.fract() == 0.0) {
        errores.push("El RMR debe ser un número entero entre 20 y 90");
    }
    let dens_centesimas = (e.densidad_roca * 100.0).round();
    if !(e.densidad_roca.is_finite()
        && (2.0..=3.5).contains(&e.densidad_roca)
        && (e.densidad_roca * 100.0 - dens_centesimas).abs() < 1e-6)
    {
        errores.push("La densidad de roca debe estar entre 2,00 y 3,50 t/m³");
    }
    let modo = MeshMode::parse(Some(e.modo.as_str())).map_err(|_| {
        "El modo de malla debe ser \"estandar\" u \"optimizado\"".to_string()
    });
    if !errores.is_empty() {
        return Err(errores.join("\n"));
    }
    modo
}

fn parametros(e: &DemoInput) -> BlastParams {
    let d_cargado_m = e.diametro_tiro_cargado_mm / 1000.0;
    BlastParams {
        ancho_labor: e.ancho_labor,
        alto_labor: e.alto_labor,
        largo_barra: e.largo_barra,
        diametro_tiro_vacio: e.diametro_tiro_vacio_mm / 1000.0,
        diametro_tiro_cargado: d_cargado_m,
        rmr: Some(e.rmr),
        densidad_roca: Some(e.densidad_roca),
        // Carga de contorno reducida con los valores iniciales que el ejecutable
        // propone para el diámetro elegido.
        carga_lineal_contorno_kg_m: Some(geotech::reduced_contour_charge_initial_kg_m(
            d_cargado_m,
        )),
        rws_contorno: Some(geotech::REDUCED_CONTOUR_INITIAL_RWS),
        ..BlastParams::default()
    }
}

fn tipo(t: HoleType) -> &'static str {
    match t {
        HoleType::Relief => "alivio",
        HoleType::Cut => "rainura",
        HoleType::Lifter => "zapatera",
        HoleType::Crown => "corona",
        HoleType::Wall => "caja",
        HoleType::Helper => "auxiliar",
    }
}

fn redondear(v: f64) -> f64 {
    (v * 1000.0).round() / 1000.0
}

/// Malla de la demo: los pasos 1 a 6 y 12 de `HolmexEngine::calculate_with_mode`,
/// en el mismo orden y con las mismas funciones del núcleo, sin el campo de
/// energía ni Kuz-Ram (la demo no los muestra y son el 90 % del tiempo de
/// cálculo). La prueba `malla_igual_al_motor_completo` verifica que la malla sea
/// idéntica a la del motor completo en todas las combinaciones de la demo.
struct MallaDemo {
    coords: Vec<HoleCoordinate>,
    holes_3d: Vec<Hole3D>,
    largo_tiro_m: f64,
    avance_m: f64,
}

fn malla_demo(params: &BlastParams, mode: MeshMode) -> Result<MallaDemo, String> {
    validation::validate_blast_params(params)?;
    let p = params.normalized();
    let is_optimized = mode == MeshMode::Optimized;
    let explosive =
        explosives::resolve_explosive(p.explosive_product_id.as_deref(), p.explosivo_propio.as_ref())?;
    let densidad_roca = p.densidad_roca.ok_or("Falta la Densidad de Roca")?;
    let geotech_input = geotech::GeotechInput {
        rmr: p.rmr.ok_or("Falta el RMR")?,
        ucs_mpa: p.ucs_mpa,
        rqd_pct: p.rqd_pct,
        density_t_m3: densidad_roca,
        modo_carga_contorno: p
            .modo_carga_contorno
            .clone()
            .ok_or("Falta el modo de carga del contorno")?,
        carga_lineal_contorno_kg_m: p.carga_lineal_contorno_kg_m,
        rws_contorno: p.rws_contorno,
        explosive_density_g_cm3: explosive.density_g_cm3,
        explosive_vod_m_s: explosive.vod_m_s,
        hole_diameter_mm: p.diametro_tiro_cargado * 1000.0,
    };
    let geotech_eval = geotech::evaluate_geotech(&geotech_input)?;
    let base_data = base::calcular_datos_base(&p, explosive.rws / 100.0);
    let (rock_constant, _) = geotech::calculate_adjusted_rock_constant(geotech_input.rmr, densidad_roca);
    let cut_data = cut::calcular_rainuras(&p, &base_data, rock_constant);
    let lifters_data =
        lifters::calcular_zapateras(&p, &base_data, cut_data.concentracion_carga, rock_constant)?;
    let spacing_multiplier = p.electronic_spacing_multiplier()?;
    let contour_charge_kg_m = geotech_eval.contorno.carga_lineal_kg_m;
    let crown_data = crown::calcular_coronas(&p, &base_data, spacing_multiplier, contour_charge_kg_m);
    let walls_data = walls::calcular_cajas(
        &p,
        &base_data,
        &lifters_data,
        &crown_data,
        spacing_multiplier,
        contour_charge_kg_m,
    )?;
    let (_, coords) = if is_optimized {
        spatial::generar_distribucion_espacial_optimizada(&p, &cut_data, &lifters_data, &crown_data, &walls_data)
    } else {
        spatial::generar_distribucion_espacial(&p, &cut_data, &lifters_data, &crown_data, &walls_data)
    };
    let holes_3d =
        profile3d::project_mesh_to_3d(&coords, p.largo_barra, p.ancho_labor, p.alto_labor, base_data.taco);
    Ok(MallaDemo {
        coords,
        holes_3d,
        largo_tiro_m: base_data.hole_length_m,
        avance_m: base_data.advance_m,
    })
}

/// Calcula una malla para la demo y devuelve solo lo necesario para dibujarla.
pub fn calcular_demo(entrada: &str) -> Result<DemoOutput, String> {
    if entrada.len() > 2048 {
        return Err("Solicitud demasiado grande".into());
    }
    let e: DemoInput =
        serde_json::from_str(entrada).map_err(|_| "Parámetros inválidos".to_string())?;
    let modo = validar(&e)?;
    let p = parametros(&e);
    let m = malla_demo(&p, modo)?;
    if m.holes_3d.len() != m.coords.len() {
        return Err("La proyección 3D no coincide con la malla".into());
    }
    let tiros = m
        .coords
        .iter()
        .zip(m.holes_3d.iter())
        .map(|(c, h)| DemoHole {
            tipo: tipo(c.hole_type),
            d: c.diameter_mm,
            x: redondear(c.x),
            y: redondear(c.y),
            xf: redondear(h.x_toe),
            yf: redondear(h.y_toe),
            zf: redondear(h.z_toe),
        })
        .collect::<Vec<_>>();

    let contar = |t: HoleType| m.coords.iter().filter(|h| h.hole_type == t).count() as u32;
    let alivio = contar(HoleType::Relief);
    let conteo = DemoCount {
        rainuras: contar(HoleType::Cut),
        zapateras: contar(HoleType::Lifter),
        coronas: contar(HoleType::Crown),
        cajas: contar(HoleType::Wall),
        auxiliares: contar(HoleType::Helper),
        alivio,
        total_cargados: m.coords.len() as u32 - alivio,
    };

    let g = crate::core::profile3d::profile_geometry(p.ancho_labor, p.alto_labor);
    Ok(DemoOutput {
        ok: true,
        modo: e.modo,
        perfil: DemoProfile {
            ancho_m: g.ancho_m,
            alto_hastial_m: g.alto_hastial_m,
            alto_boveda_m: g.alto_boveda_m,
            alto_m: g.alto_m,
        },
        tiros,
        conteo,
        largo_tiro_m: Some(redondear(m.largo_tiro_m)),
        avance_m: Some(redondear(m.avance_m)),
    })
}

/// Igual que `calcular_demo`, pero siempre devuelve JSON (también los errores).
pub fn calcular_demo_json(entrada: &str) -> String {
    match calcular_demo(entrada) {
        Ok(salida) => serde_json::to_string(&salida).unwrap_or_else(|_| {
            r#"{"ok":false,"error":"No se pudo preparar la respuesta"}"#.to_string()
        }),
        Err(error) => serde_json::to_string(&DemoError { ok: false, error })
            .unwrap_or_else(|_| r#"{"ok":false,"error":"Error del motor"}"#.to_string()),
    }
}

// ---------------------------------------------------------------------------
// Interfaz WebAssembly mínima (sin wasm-bindgen): el Worker reserva memoria con
// `reservar`, copia el JSON de entrada, llama a `calcular` y lee la salida con
// `salida_ptr` / `salida_len`.

#[cfg(target_arch = "wasm32")]
mod wasm {
    use std::cell::RefCell;

    thread_local! {
        static SALIDA: RefCell<Vec<u8>> = const { RefCell::new(Vec::new()) };
    }

    #[no_mangle]
    pub extern "C" fn reservar(len: usize) -> *mut u8 {
        let mut buf = Vec::<u8>::with_capacity(len);
        let ptr = buf.as_mut_ptr();
        std::mem::forget(buf);
        ptr
    }

    /// # Safety
    /// `ptr` debe venir de `reservar(len)` con el mismo `len`.
    #[no_mangle]
    pub unsafe extern "C" fn liberar(ptr: *mut u8, len: usize) {
        drop(Vec::from_raw_parts(ptr, 0, len));
    }

    /// # Safety
    /// `ptr` debe apuntar a `len` bytes válidos reservados con `reservar`.
    #[no_mangle]
    pub unsafe extern "C" fn calcular(ptr: *const u8, len: usize) {
        let bytes = std::slice::from_raw_parts(ptr, len);
        let salida = match std::str::from_utf8(bytes) {
            Ok(texto) => super::calcular_demo_json(texto),
            Err(_) => r#"{"ok":false,"error":"Parámetros inválidos"}"#.to_string(),
        };
        SALIDA.with(|s| *s.borrow_mut() = salida.into_bytes());
    }

    #[no_mangle]
    pub extern "C" fn salida_ptr() -> *const u8 {
        SALIDA.with(|s| s.borrow().as_ptr())
    }

    #[no_mangle]
    pub extern "C" fn salida_len() -> usize {
        SALIDA.with(|s| s.borrow().len())
    }
}

#[cfg(test)]
mod pruebas {
    use super::*;

    const CASO: &str = r#"{"ancho_labor":3.5,"alto_labor":4.0,"largo_barra":1.8,"diametro_tiro_vacio_mm":76,"diametro_tiro_cargado_mm":38,"rmr":60,"densidad_roca":2.68,"modo":"estandar"}"#;

    #[test]
    fn caso_de_referencia_igual_al_ejecutable() {
        let demo = calcular_demo(CASO).unwrap();
        let exe = HolmexEngine::calculate_with_mode(&BlastParams::default(), MeshMode::Standard).unwrap();
        assert_eq!(demo.tiros.len(), exe.coordenadas_tiros.len());
        for (a, b) in demo.tiros.iter().zip(exe.coordenadas_tiros.iter()) {
            assert!((a.x - b.x).abs() < 1e-3 && (a.y - b.y).abs() < 1e-3);
        }
        assert_eq!(demo.conteo.total_cargados, exe.descripcion_tiros["Total Tiros"]);
    }

    /// La malla de la demo es la misma del motor completo en todas las
    /// combinaciones de dimensiones, barras y diámetros (RMR y densidad en una
    /// muestra), en los dos modos.
    #[test]
    fn malla_igual_al_motor_completo() {
        let mut casos = 0;
        for modo in ["estandar", "optimizado"] {
            for ancho in DIMENSIONES_M {
                for alto in DIMENSIONES_M {
                    for barra in BARRAS_M {
                        for (i, dv) in DIAM_VACIO_MM.iter().enumerate() {
                            for (j, dc) in DIAM_CARGADO_MM.iter().enumerate() {
                                let rmr = [25.0, 45.0, 60.0, 85.0][(i + j) % 4];
                                let dens = [2.2, 2.68, 3.1][(i + 2 * j) % 3];
                                let e = DemoInput {
                                    ancho_labor: ancho,
                                    alto_labor: alto,
                                    largo_barra: barra,
                                    diametro_tiro_vacio_mm: *dv,
                                    diametro_tiro_cargado_mm: *dc,
                                    rmr,
                                    densidad_roca: dens,
                                    modo: modo.into(),
                                };
                                let mm = validar(&e).unwrap();
                                let p = parametros(&e);
                                let completo = HolmexEngine::calculate_with_mode(&p, mm);
                                let demo = malla_demo(&p, mm);
                                match (completo, demo) {
                                    (Ok(c), Ok(d)) => {
                                        assert_eq!(c.coordenadas_tiros.len(), d.coords.len());
                                        for (a, b) in c.coordenadas_tiros.iter().zip(d.coords.iter()) {
                                            assert!(a.x == b.x && a.y == b.y && a.hole_type == b.hole_type);
                                        }
                                        let h3 = c.perfil_3d.unwrap().holes;
                                        for (a, b) in h3.iter().zip(d.holes_3d.iter()) {
                                            assert!(a.x_toe == b.x_toe && a.y_toe == b.y_toe && a.z_toe == b.z_toe);
                                        }
                                        assert_eq!(c.avance_m, Some(d.avance_m));
                                    }
                                    (Err(a), Err(b)) => assert_eq!(a, b),
                                    (a, b) => panic!("difieren: {:?} / {:?}", a.err(), b.err()),
                                }
                                casos += 1;
                            }
                        }
                    }
                }
            }
        }
        assert_eq!(casos, 2 * 5 * 5 * 6 * 4 * 6);
    }

    #[test]
    fn rechaza_valores_fuera_de_la_demo() {
        let malo = CASO.replace("\"ancho_labor\":3.5", "\"ancho_labor\":3.7");
        assert!(calcular_demo(&malo).is_err());
        let extra = CASO.replace("}", ",\"precio_anfo\":1}");
        assert!(calcular_demo(&extra).is_err());
    }

    #[test]
    fn la_respuesta_no_trae_datos_restringidos() {
        let json = calcular_demo_json(CASO);
        for campo in ["charge", "kg", "precio", "geomecanica", "energy", "kuzram", "rainura\":{", "datos_"] {
            assert!(!json.contains(campo), "la respuesta contiene {campo}");
        }
    }
}
