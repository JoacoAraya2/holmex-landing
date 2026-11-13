// Demo web de HOLMEX: inicio de sesión y cálculo de mallas en el servidor.
//
// - El motor de cálculo (worker/motor.wasm) corre aquí, en Cloudflare. El navegador solo
//   recibe la respuesta recortada: perfil, posición de los tiros, conteo, largo de tiro y avance.
// - Las cuentas viven en el secreto DEMO_CUENTAS (JSON), no en una base de datos:
//     { "admin1": { "sal": "...", "hash": "...", "vence": "2026-12-15" }, ... }
//   hash = SHA-256 de (sal + contraseña), en hexadecimal. Se generan con scripts/crear-cuentas-demo.mjs.
// - La sesión es una cookie firmada con el secreto DEMO_SECRETO (HMAC-SHA-256). No se guarda en
//   ningún lado: si cambia el secreto, todas las sesiones se cierran.
// - Cada inicio de sesión y cada cálculo queda en los registros del Worker (Workers Logs).
// - Límites: DEMO_LIMITE_LOGIN y DEMO_LIMITE_CALCULO (Rate Limiting de Cloudflare, en wrangler.jsonc).
import motorWasm from './motor.wasm'

const COOKIE = 'holmex_demo'
const DURACION_SESION_S = 8 * 60 * 60
const enc = new TextEncoder()
const dec = new TextDecoder()

let motor = null
function instanciaMotor() {
  if (!motor) motor = new WebAssembly.Instance(motorWasm, {}).exports
  return motor
}

function calcularEnMotor(textoEntrada) {
  const m = instanciaMotor()
  const bytes = enc.encode(textoEntrada)
  const ptr = m.reservar(bytes.length)
  new Uint8Array(m.memory.buffer, ptr, bytes.length).set(bytes)
  m.calcular(ptr, bytes.length)
  m.liberar(ptr, bytes.length)
  return dec.decode(new Uint8Array(m.memory.buffer, m.salida_ptr(), m.salida_len()).slice())
}

function json(datos, status = 200, extra = {}) {
  return new Response(JSON.stringify(datos), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extra },
  })
}

function b64url(bytes) {
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function desdeB64url(texto) {
  const s = atob(texto.replace(/-/g, '+').replace(/_/g, '/'))
  return Uint8Array.from(s, (c) => c.charCodeAt(0))
}

async function hmac(secreto, texto) {
  const clave = await crypto.subtle.importKey('raw', enc.encode(secreto), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return new Uint8Array(await crypto.subtle.sign('HMAC', clave, enc.encode(texto)))
}

function iguales(a, b) {
  if (a.byteLength !== b.byteLength) return false
  return crypto.subtle.timingSafeEqual(a, b)
}

async function sha256Hex(texto) {
  const h = new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(texto)))
  return [...h].map((b) => b.toString(16).padStart(2, '0')).join('')
}

function cuentas(env) {
  try {
    return JSON.parse(env.DEMO_CUENTAS || '{}')
  } catch {
    return {}
  }
}

// Fin del día de vencimiento, hora de Chile continental (UTC-3).
function venceMs(cuenta) {
  if (!cuenta?.vence) return 0
  const t = Date.parse(`${cuenta.vence}T23:59:59-03:00`)
  return Number.isFinite(t) ? t : 0
}

async function crearSesion(env, usuario, vence) {
  const exp = Math.min(Date.now() + DURACION_SESION_S * 1000, vence)
  const carga = b64url(enc.encode(JSON.stringify({ u: usuario, exp })))
  const firma = b64url(await hmac(env.DEMO_SECRETO, carga))
  return { valor: `${carga}.${firma}`, exp }
}

async function leerSesion(request, env) {
  if (!env.DEMO_SECRETO) return null
  const cookie = request.headers.get('Cookie') || ''
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`))
  if (!m) return null
  const [carga, firma] = m[1].split('.')
  if (!carga || !firma) return null
  try {
    const esperada = await hmac(env.DEMO_SECRETO, carga)
    if (!iguales(esperada, desdeB64url(firma))) return null
    const { u, exp } = JSON.parse(dec.decode(desdeB64url(carga)))
    const cuenta = cuentas(env)[u]
    // Una cuenta borrada o vencida corta la sesión aunque la cookie siga vigente.
    if (!cuenta || Date.now() > exp || Date.now() > venceMs(cuenta)) return null
    return { usuario: u, exp, vence: cuenta.vence }
  } catch {
    return null
  }
}

function cookieSesion(valor, maxAge) {
  return `${COOKIE}=${valor}; Path=/api/demo; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
}

async function dentroDelLimite(limitador, clave) {
  if (!limitador) return true
  try {
    const { success } = await limitador.limit({ key: clave })
    return success
  } catch {
    return true
  }
}

// Solo se aceptan peticiones que vienen del propio sitio.
function mismoOrigen(request) {
  const origen = request.headers.get('Origin')
  return !origen || origen === new URL(request.url).origin
}

async function login(request, env) {
  const ip = request.headers.get('CF-Connecting-IP') || 'sin-ip'
  if (!(await dentroDelLimite(env.DEMO_LIMITE_LOGIN, `login:${ip}`))) {
    return json({ ok: false, error: 'Demasiados intentos. Espere un minuto e intente de nuevo.' }, 429)
  }
  let datos
  try {
    datos = await request.json()
  } catch {
    return json({ ok: false, error: 'Solicitud inválida' }, 400)
  }
  const usuario = String(datos?.usuario || '').trim().toLowerCase().slice(0, 40)
  const clave = String(datos?.clave || '').slice(0, 200)
  const cuenta = Object.hasOwn(cuentas(env), usuario) ? cuentas(env)[usuario] : null

  // Se calcula el hash aunque la cuenta no exista, para no revelar qué usuarios existen.
  const hash = await sha256Hex((cuenta?.sal || 'sin-cuenta') + clave)
  const correcto = Boolean(cuenta?.hash) && iguales(enc.encode(hash), enc.encode(cuenta.hash))

  if (!correcto) {
    console.log(JSON.stringify({ evento: 'demo_login_fallido', usuario, ip }))
    return json({ ok: false, error: 'Usuario o contraseña incorrectos' }, 401)
  }
  const vence = venceMs(cuenta)
  if (Date.now() > vence) {
    console.log(JSON.stringify({ evento: 'demo_login_vencido', usuario }))
    return json({ ok: false, error: 'El período de prueba de esta cuenta terminó. Escríbanos a contacto@holmex.cl.' }, 403)
  }
  const sesion = await crearSesion(env, usuario, vence)
  console.log(JSON.stringify({ evento: 'demo_login', usuario, ip }))
  return json(
    { ok: true, usuario, vence: cuenta.vence, expiraSesion: sesion.exp },
    200,
    { 'Set-Cookie': cookieSesion(sesion.valor, Math.max(1, Math.floor((sesion.exp - Date.now()) / 1000))) },
  )
}

async function calcular(request, env, sesion) {
  if (!(await dentroDelLimite(env.DEMO_LIMITE_CALCULO, `calculo:${sesion.usuario}`))) {
    return json({ ok: false, error: 'Llegó al límite de cálculos por minuto. Espere un momento.' }, 429)
  }
  const texto = await request.text()
  if (texto.length > 2048) return json({ ok: false, error: 'Solicitud demasiado grande' }, 413)
  let salida
  try {
    salida = calcularEnMotor(texto)
  } catch (e) {
    motor = null // Si el motor falla, se vuelve a cargar en la próxima petición.
    console.log(JSON.stringify({ evento: 'demo_error_motor', usuario: sesion.usuario, error: String(e) }))
    return json({ ok: false, error: 'El motor no pudo calcular esta labor' }, 500)
  }
  let parametros = null
  try {
    parametros = JSON.parse(texto)
  } catch {
    /* el motor ya respondió el error */
  }
  const ok = salida.startsWith('{"ok":true')
  console.log(JSON.stringify({ evento: 'demo_calculo', usuario: sesion.usuario, ok, parametros }))
  return new Response(salida, {
    status: ok ? 200 : 422,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

export async function atenderDemo(request, env) {
  const { pathname } = new URL(request.url)
  const ruta = pathname.replace(/^\/api\/demo\/?/, '')

  if (!env.DEMO_SECRETO || !env.DEMO_CUENTAS) {
    return json({ ok: false, error: 'La demo no está configurada todavía' }, 503)
  }
  if (request.method !== 'GET' && !mismoOrigen(request)) {
    return json({ ok: false, error: 'Origen no permitido' }, 403)
  }

  if (ruta === 'login' && request.method === 'POST') return login(request, env)

  if (ruta === 'logout' && request.method === 'POST') {
    return json({ ok: true }, 200, { 'Set-Cookie': cookieSesion('', 0) })
  }

  const sesion = await leerSesion(request, env)

  if (ruta === 'sesion' && request.method === 'GET') {
    return sesion
      ? json({ ok: true, usuario: sesion.usuario, vence: sesion.vence, expiraSesion: sesion.exp })
      : json({ ok: false })
  }

  if (ruta === 'calcular' && request.method === 'POST') {
    if (!sesion) return json({ ok: false, error: 'Su sesión terminó. Vuelva a ingresar.' }, 401)
    return calcular(request, env, sesion)
  }

  return json({ ok: false, error: 'No encontrado' }, 404)
}
