// Contenido comercial de la landing. Editar aquí sin tocar componentes.

export const NAV = [
  { href: '#solucion', label: 'Solución' },
  { href: '#ds132', label: 'Marco Legal DS 132' },
  { href: '#simulador', label: 'Simulador Espacial' },
  { href: '#licencia', label: 'Licencia y Precio' },
  { href: '#contacto', label: 'Contacto' },
]

// Reemplazar por el correo comercial real antes de publicar el sitio.
export const CONTACT_EMAIL = 'contacto@holmex.cl'

export const PROOF_POINTS = [
  {
    cifra: '>96%',
    titulo: 'Reducción en tiempo de planificación',
    texto: 'De 55–120 minutos de cálculo manual por disparo a menos de 2 minutos automatizados.',
  },
  {
    cifra: '0 red',
    titulo: '100% autónomo (air-gapped)',
    texto: 'Funciona en frentes ciegas sin señal celular, enlace satelital ni conexión a internet.',
  },
  {
    cifra: '1×',
    titulo: 'Licencia perpetua por equipo',
    texto: 'Sin llaves USB físicas de alto costo ni cobros mensuales sorpresivos.',
  },
  {
    cifra: '13/13',
    titulo: 'Trazabilidad total de parámetros',
    texto: 'Cada constante del cálculo tiene procedencia declarada: fuente, página o heurística identificada.',
  },
]

export const PROBLEMA = [
  'Estimaciones por tanteo o planillas Excel con fórmulas desarticuladas y errores de tipeo y redondeo.',
  'Jumbo detenido en la frente mientras se calcula el diagrama de disparo.',
  'Dosificación que no se ajusta al macizo: sobreconsumo de explosivo y sobreexcavación (overbreak).',
  'Instrucciones verbales o tablas sueltas en papel; errores de emboquillado y paralelismo.',
  'Sin memoria técnica auditable que respalde a la administración ante una fiscalización.',
]

export const SOLUCION = [
  'Cálculo analítico determinista de toda la malla: rainura, auxiliares, cajas, corona y zapateras.',
  'Diseño listo en menos de 2 minutos, con la sección dibujada a escala antes de perforar.',
  'Carga ajustada por RMR y litología, con control de energía en el contorno para proteger techo y cajas.',
  'Guía limpia para el perforista con coordenadas, profundidad y secuencia de salida.',
  'Expediente operacional inmediato en PDF, DXF y CSV con la procedencia de cada parámetro.',
]

export const FUNDAMENTOS = [
  {
    codigo: 'Langefors & Kihlström · 1978',
    titulo: 'Burden máximo y balance de carga',
    texto:
      'Constante de roca, grado de fijación y relación espaciamiento-burden para dimensionar el burden de cada zona del frente.',
    formula: 'B_máx = (d/33)·√(P·s / (c̄·f·E/B))',
  },
  {
    codigo: 'Holmberg & Persson · 1978',
    titulo: 'Contorno perimetral y daño inducido',
    texto:
      'Espaciamiento de corona de 15–16 veces el diámetro y relación E/B de 0,8 en voladura suave. Predicción del radio de daño para reducir pernos, shotcrete y marcos.',
    formula: 'E_corona = 15·d   ·   E/B = 0,8',
  },
  {
    codigo: 'Kuz-Ram · Cunningham 1983',
    titulo: 'Fragmentación y P80',
    texto:
      'Tamaño medio, índice de uniformidad y P80 proyectado para evitar bolones sobre-tamaño, tronadura secundaria y atascos en chancado.',
    formula: 'X₅₀ = A·K⁻⁰·⁸·Q¹ᐟ⁶·(115/E)¹⁹ᐟ³⁰',
  },
  {
    codigo: 'Bieniawski RMR · Barton Q',
    titulo: 'Caracterización del macizo',
    texto:
      'La calidad geomecánica del frente modula la constante de roca y la dosificación. Conversión RMR–Q incluida.',
    formula: 'RMR → Q de Barton',
  },
]

// Carrusel de videos del banner principal (archivos en public/media/, 1080p).
// Todos los clips son de Pexels bajo la licencia Pexels (uso comercial libre, crédito no obligatorio):
// https://www.pexels.com/license/
// Para agregar otro clip basta con sumar un objeto a esta lista.
export const HERO_VIDEOS = [
  {
    src: '/media/hero-mineria-1080.mp4',
    etiqueta: 'Frente de avance',
    titulo: 'Geometría del frente calculada en menos de 2 minutos',
    dato: '< 2 min',
    datoDetalle: 'Diseño del diagrama de disparo',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/underground-tunnel-construction-with-heavy-machinery-31752064/
  },
  {
    src: '/media/tunel-excavadora.mp4',
    etiqueta: 'Sobreexcavación',
    titulo: 'Menos sobrecostos por sobreexcavación en cada disparo',
    dato: 'Contorno',
    datoDetalle: 'Control de sobreexcavación',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/excavator-operating-in-tunnel-construction-site-31752063/
  },
  {
    src: '/media/tunel-maquinaria.mp4',
    etiqueta: 'Fragmentación P80',
    titulo: 'Predicción de fragmentación antes de tronar',
    dato: 'P80',
    datoDetalle: 'Fragmentación estimada',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/heavy-construction-equipment-in-underground-tunnel-31752065/
  },
  {
    src: '/media/tunel-cuadrilla.mp4',
    etiqueta: 'Interior mina',
    titulo: 'Funciona sin red ni nube, directo en la labor',
    dato: '0 red',
    datoDetalle: 'Opera 100% sin conexión',
    // Autor: Sururi Ballıdağ
    // https://www.pexels.com/video/construction-workers-are-working-on-a-tunnel-16035050/
  },
]

export const LICENCIA = {
  precio: 'USD 2.000',
  impuesto: '+ IVA',
  modalidad: 'Licencia perpetua por equipo',
  atributos: [
    { criterio: 'Modelo de cobro', valor: 'Pago único por equipo. Sin llaves USB físicas ni mensualidades.' },
    { criterio: 'Requisitos de red', valor: '100% offline nativo, también en interior mina.' },
    { criterio: 'Capacitación', valor: 'Adopción operacional en menos de 3 horas.' },
    { criterio: 'Entregables a terreno', valor: 'Guías directas en PDF, DXF y CSV para el perforista.' },
    { criterio: 'Trazabilidad de fórmulas', valor: 'Cada constante con obra y página, o marcada como heurística.' },
  ],
  incluye: [
    'Instalación y puesta en marcha en el computador de faena',
    'Capacitación inicial para el equipo de P&T',
    'Prueba de cálculo en una labor real',
  ],
}

export const CAPTURAS = [
  {
    id: 'inicio',
    titulo: 'Panel de inicio',
    texto: 'Historial local de cálculos y estadísticas por mes. Todo queda en el equipo, en una base SQLite.',
  },
  {
    id: 'parametros',
    titulo: 'Parámetros de la labor',
    texto: 'Sección, barra, diámetros, precio del ANFO y caracterización geomecánica RMR, Q y GSI con presets de terreno.',
  },
  {
    id: 'malla',
    titulo: 'Malla generada',
    texto: 'Sección dibujada a escala con rainura de cuatro cuadrantes, zapateras, corona, cajas y auxiliares.',
  },
]

export const FICHA = [
  ['Plataforma', 'Windows · ejecutable de ~12 MB'],
  ['Núcleo de cálculo', 'Rust'],
  ['Interfaz', 'Vue 3 sobre Tauri v2'],
  ['Persistencia', 'SQLite local'],
  ['Inicio de la aplicación', '1,42 s (mediana)'],
  ['Exportación DXF', '0,3 ms'],
  ['Cobertura de pruebas del núcleo', '87,5%'],
  ['Telemetría', 'Ninguna'],
]

export const EQUIPO = [
  {
    nombre: 'Vicente Gago Salazar',
    rol: 'Dirección de Producto y Arquitectura',
    detalle: 'Arquitectura de software, visualizador 2D y relación técnica con faenas.',
    foto: 1,
  },
  {
    nombre: 'Vicente Gómez Hidalgo',
    rol: 'Motor de Cálculo y Datos',
    detalle: 'Implementación del motor analítico Holmberg, base de datos local y repositorio.',
    foto: 3,
  },
  {
    nombre: 'Joaquín Araya López',
    rol: 'Calidad y Exportación Técnica',
    detalle: 'Subsistema de exportación PDF/DXF/CSV y plan de pruebas bajo ISO/IEC 25010.',
    foto: 2,
  },
]

export const REGIONES = ['Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana', "O'Higgins", 'Otra región']
