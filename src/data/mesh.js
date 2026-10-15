// Motor geométrico DEMOSTRATIVO para la landing page.
// Reproduce la lógica general del diseño de frentes (escuela sueca) con
// simplificaciones declaradas. No reemplaza el núcleo de cálculo de HOLMEX.

export const LITOLOGIAS = [
  { id: 'andesita', nombre: 'Andesita competente', rmr: 70, densidad: 2.68, factorRoca: 7 },
  { id: 'granodiorita', nombre: 'Granodiorita masiva', rmr: 80, densidad: 2.72, factorRoca: 8 },
  { id: 'brecha', nombre: 'Brecha fracturada', rmr: 48, densidad: 2.55, factorRoca: 5 },
]

export const BARRAS = [1.8, 2.4, 3.0, 3.6]
export const DIAM_CARGA = [38, 45]
export const DIAM_VACIO = [76, 102]

export function claseRMR(rmr) {
  if (rmr > 80) return { clase: 'I', nombre: 'Muy buena' }
  if (rmr > 60) return { clase: 'II', nombre: 'Buena' }
  if (rmr > 40) return { clase: 'III', nombre: 'Regular' }
  if (rmr > 20) return { clase: 'IV', nombre: 'Mala' }
  return { clase: 'V', nombre: 'Muy mala' }
}

const ANFO_DENSIDAD = 850 // kg/m3
const R2 = (v) => Math.round(v * 100) / 100

export function computeMesh(input) {
  const W = input.ancho
  const H = input.alto
  const lito = LITOLOGIAS.find((l) => l.id === input.litologia) || LITOLOGIAS[0]
  const d = input.dCarga / 1000 // m
  const D = input.dVacio / 1000 // m
  const L = input.barra * 0.95 // largo efectivo de perforación
  const avance = 0.9 * L

  // Sección tipo baúl: hastiales verticales + bóveda de segmento circular
  const flecha = W * 0.25
  const hw = H - flecha
  const R = ((W / 2) ** 2 + flecha ** 2) / (2 * flecha)
  const yArc = H - R
  const area = W * hw + segmentoArea(R, W)

  // Langefors & Kihlström (1978, p. 46): burden máximo, zapateras f = 1.45, E/B = 1.25
  const cRoca = 0.4 * (1 + (lito.rmr - 60) / 200) // ajuste por RMR: heurística demostrativa
  const P = 0.95 // grado de empaquetamiento kg/dm3 (ANFO neumático)
  const s = 0.84 // potencia en peso relativa al LFB
  const bMax = (input.dCarga / 33) * Math.sqrt((P * s) / ((cRoca + 0.05) * 1.45 * 1.25))
  const bPrac = bMax - 0.05 - 0.03 * L

  const holes = []
  let seq = 0

  // Rainura: 4 cuadrantes alrededor del tiro vacío
  const cutMaxHalf = W * 0.24
  const yc = clamp(H * 0.42, 1.0, hw - 0.2)
  const radios = [1.5 * D]
  while (radios.length < 4) radios.push(radios[radios.length - 1] * 2.1)
  const cuadrantes = []
  radios.forEach((r, i) => {
    const half = i % 2 === 0 ? r : r / Math.SQRT2
    if (half > cutMaxHalf) return
    const pts = (i % 2 === 0)
      ? [[0, r], [r, 0], [0, -r], [-r, 0]]
      : [[half, half], [half, -half], [-half, -half], [-half, half]]
    seq++
    const q = pts.map(([x, y]) => ({ x, y: yc + y, tipo: 'rainura', grupo: i + 1, seq }))
    cuadrantes.push(q)
    holes.push(...q)
  })
  const ultimo = cuadrantes[cuadrantes.length - 1]
  const cutHalf = Math.max(...ultimo.map((p) => Math.abs(p.x)))

  // Contorno: cajas (hastiales)
  const nCaja = Math.max(2, Math.round((hw - 0.9) / 0.62) + 1)
  const cajas = []
  for (let i = 0; i < nCaja; i++) {
    const y = 0.6 + ((hw - 0.25 - 0.6) * i) / (nCaja - 1)
    cajas.push({ x: -W / 2, y }, { x: W / 2, y })
  }

  // Corona: espaciamiento 15·d (Holmberg & Persson, 1978, p. 8, voladura suave)
  const espCorona = 15 * d
  const ang0 = Math.atan2(hw - yArc, -W / 2)
  const ang1 = Math.atan2(hw - yArc, W / 2)
  const arcLen = R * (ang0 - ang1)
  const nCor = Math.max(3, Math.round(arcLen / espCorona) + 1)
  const corona = []
  for (let i = 0; i < nCor; i++) {
    const a = ang0 - ((ang0 - ang1) * i) / (nCor - 1)
    corona.push({ x: R * Math.cos(a), y: yArc + R * Math.sin(a) })
  }

  // Zapateras (piso)
  const espZap = Math.min(1.1 * bPrac, 0.75)
  const nZap = Math.ceil(W / espZap) + 1
  const zapateras = []
  for (let i = 0; i < nZap; i++) zapateras.push({ x: -W / 2 + (W * i) / (nZap - 1), y: 0 })

  // Auxiliares: malla simétrica entre rainura y contorno
  const espAux = clamp(bPrac, 0.7, 1.1)
  const aux = []
  const margen = 0.5
  for (let gy = 0.65; gy < H - margen; gy += espAux) {
    for (let k = -6; k <= 6; k++) {
      const x = k * espAux
      if (!dentro(x, gy, W, hw, R, yArc, margen)) continue
      if (Math.abs(x) < cutHalf + 0.22 && Math.abs(gy - yc) < cutHalf + 0.22) continue
      aux.push({ x, y: gy })
    }
  }

  // Secuencia de salida: rainura → auxiliares → cajas → corona → zapateras
  aux.sort((a, b) => Math.hypot(a.x, a.y - yc) - Math.hypot(b.x, b.y - yc))
  aux.forEach((p) => holes.push({ ...p, tipo: 'auxiliar', seq: ++seq }))
  seq++
  cajas.forEach((p) => holes.push({ ...p, tipo: 'caja', seq }))
  seq++
  corona.forEach((p) => holes.push({ ...p, tipo: 'corona', seq }))
  seq++
  zapateras.forEach((p) => holes.push({ ...p, tipo: 'zapatera', seq }))

  // Carga explosiva
  const qLineal = (Math.PI / 4) * d * d * ANFO_DENSIDAD // kg/m (ANFO)
  const qContorno = 0.2 // kg/m ANFO-eq, cartuchos desacoplados
  let kg = 0
  let kgPrincipal = 0
  let nPrincipal = 0
  for (const h of holes) {
    if (h.tipo === 'caja' || h.tipo === 'corona') kg += qContorno * (L - 0.3)
    else {
      const frac = h.tipo === 'zapatera' ? 0.8 : 0.67
      const q = qLineal * L * frac
      kg += q
      kgPrincipal += q
      nPrincipal++
    }
  }
  const volumen = area * avance
  const factorCarga = kg / volumen

  // Kuz-Ram (Cunningham, 1983): X50 en cm, ANFO E = 100; n = 1.2 (supuesto declarado)
  const Q = kgPrincipal / nPrincipal
  const x50 = lito.factorRoca * Math.pow(factorCarga, -0.8) * Math.pow(Q, 1 / 6) * Math.pow(115 / 100, 19 / 30)
  const n = 1.2
  const p80 = x50 * Math.pow(Math.log(5) / Math.log(2), 1 / n)

  // Radio de daño de contorno, anclado a 0.25–0.35 m @ 0.2 kg/m (Holmberg & Persson, 1978, p. 4)
  const rDano = 0.3 * Math.sqrt(qContorno / 0.2)

  return {
    W, H, hw, R, yArc, flecha, yc, D,
    holes,
    cuadrantes,
    litologia: lito,
    rmr: claseRMR(lito.rmr),
    metrics: {
      tiros: holes.length,
      bMax: R2(bMax),
      bPrac: R2(bPrac),
      factorCarga: R2(factorCarga),
      kg: Math.round(kg * 10) / 10,
      p80: Math.round(p80 * 10) / 10,
      avance: R2(avance),
      area: R2(area),
      volumen: Math.round(volumen * 10) / 10,
      metrosPerforados: Math.round(holes.length * L * 10) / 10,
      espCorona: R2(espCorona),
      rDano: R2(rDano),
      costo: Math.round(kg * (input.precioAnfo || 1200)),
    },
  }
}

function dentro(x, y, W, hw, R, yArc, m) {
  if (Math.abs(x) > W / 2 - m || y < m) return false
  if (y <= hw) return true
  return Math.hypot(x, y - yArc) < R - m
}

function segmentoArea(R, cuerda) {
  const theta = 2 * Math.asin(cuerda / (2 * R))
  return (R * R / 2) * (theta - Math.sin(theta))
}

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v))
}

export function arcoPath(m, toX, toY) {
  // Contorno completo de la sección para SVG
  return [
    `M ${toX(-m.W / 2)} ${toY(0)}`,
    `L ${toX(-m.W / 2)} ${toY(m.hw)}`,
    `A ${m.R * 100} ${m.R * 100} 0 0 1 ${toX(m.W / 2)} ${toY(m.hw)}`,
    `L ${toX(m.W / 2)} ${toY(0)}`,
    'Z',
  ].join(' ')
}
