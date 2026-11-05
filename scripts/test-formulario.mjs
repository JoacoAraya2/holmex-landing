// Prueba automática del formulario de solicitud (sección #contacto).
//
// Uso:
//   npm run build && npx vite preview --port 4173     (en otra terminal)
//   node scripts/test-formulario.mjs                  (prueba http://localhost:4173)
//   node scripts/test-formulario.mjs https://holmex.cl
//
// Por defecto NO envía nada a Formspree: intercepta la petición y simula la respuesta.
// Con --real envía UNA solicitud de prueba de verdad (llega a contacto@holmex.cl).
// Requiere Playwright: npm i -D playwright && npx playwright install chromium

import { chromium } from 'playwright'

const args = process.argv.slice(2)
const REAL = args.includes('--real')
const URL_SITIO = (args.find((a) => !a.startsWith('--')) || 'http://localhost:4173').replace(/\/$/, '') + '/#contacto'

const DATOS = {
  nombre: 'Prueba Automática',
  empresa: 'Faena de Prueba SpA',
  region: 'Antofagasta',
  telefono: '+56 9 1234 5678',
  correo: 'prueba@holmex.cl',
}

let fallos = 0
function revisar(cond, texto) {
  console.log(`${cond ? 'OK   ' : 'FALLA'}  ${texto}`)
  if (!cond) fallos++
}

const browser = await chromium.launch()

async function nuevaPagina({ respuesta } = {}) {
  const page = await browser.newPage()
  const enviados = []
  if (!REAL || respuesta) {
    await page.route('https://formspree.io/**', async (route) => {
      enviados.push(JSON.parse(route.request().postData() || '{}'))
      if (respuesta === 'error') return route.fulfill({ status: 422, contentType: 'application/json', body: '{"error":"x"}' })
      if (respuesta === 'red') return route.abort()
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' })
    })
  }
  await page.goto(URL_SITIO)
  await page.locator('#contacto form').waitFor()
  return { page, enviados }
}

async function llenar(page, datos = DATOS, privacidad = true) {
  await page.fill('#f-nombre', datos.nombre)
  await page.fill('#f-empresa', datos.empresa)
  if (datos.region) await page.selectOption('#f-region', datos.region)
  await page.fill('#f-telefono', datos.telefono)
  await page.fill('#f-correo', datos.correo)
  if (privacidad) await page.check('#f-privacidad')
}

const enviar = (page) => page.click('#contacto button[type=submit]')
const errorDe = (page, campo) => page.locator('#e-' + campo).textContent().catch(() => null)

// 1. Formulario vacío: todos los campos marcan error y el foco va al primero.
{
  const { page, enviados } = await nuevaPagina()
  await enviar(page)
  for (const c of ['nombre', 'empresa', 'region', 'telefono', 'correo', 'aceptaPrivacidad']) {
    revisar(Boolean(await errorDe(page, c)), `vacío: muestra error en "${c}"`)
  }
  revisar((await page.evaluate(() => document.activeElement?.id)) === 'f-nombre', 'vacío: el foco va a "Nombre"')
  revisar((await page.getAttribute('#f-nombre', 'aria-invalid')) === 'true', 'vacío: aria-invalid en "Nombre"')
  revisar(enviados.length === 0, 'vacío: no se envía nada')

  // El error desaparece al corregir el campo.
  await page.fill('#f-nombre', 'Ana')
  revisar((await errorDe(page, 'nombre')) === null, 'al escribir el nombre se borra su error')
  await page.close()
}

// 2. Solo espacios cuenta como vacío.
{
  const { page } = await nuevaPagina()
  await llenar(page, { ...DATOS, nombre: '    ' })
  await enviar(page)
  revisar(Boolean(await errorDe(page, 'nombre')), 'nombre con solo espacios se rechaza')
  await page.close()
}

// 3. Correos inválidos.
for (const correo of ['sin-arroba.cl', 'a@b', 'a b@empresa.cl', '@empresa.cl']) {
  const { page, enviados } = await nuevaPagina()
  await llenar(page, { ...DATOS, correo })
  await enviar(page)
  revisar(Boolean(await errorDe(page, 'correo')) && enviados.length === 0, `correo inválido "${correo}" se rechaza`)
  await page.close()
}

// 4. Teléfono sin números (hoy se acepta: ver informe).
{
  const { page, enviados } = await nuevaPagina()
  await llenar(page, { ...DATOS, telefono: 'abc' })
  await enviar(page)
  revisar(Boolean(await errorDe(page, 'telefono')) && enviados.length === 0, 'teléfono "abc" se rechaza')
  await page.close()
}

// 5. Sin aceptar privacidad.
{
  const { page, enviados } = await nuevaPagina()
  await llenar(page, DATOS, false)
  await enviar(page)
  revisar(Boolean(await errorDe(page, 'aceptaPrivacidad')) && enviados.length === 0, 'sin aceptar privacidad no se envía')
  revisar((await page.evaluate(() => document.activeElement?.id)) === 'f-privacidad', 'el foco va a la casilla de privacidad')
  await page.close()
}

// 6. Envío correcto: datos que llegan a Formspree y mensaje de éxito.
{
  const { page, enviados } = await nuevaPagina({ respuesta: REAL ? undefined : 'ok' })
  await llenar(page)
  await page.check('#f-piloto')
  if (REAL) {
    const resp = page.waitForResponse((r) => r.url().includes('formspree.io'))
    await enviar(page)
    const r = await resp
    revisar(r.ok(), `Formspree real respondió ${r.status()}`)
  } else {
    await enviar(page)
  }
  await page.getByText('Solicitud recibida').waitFor({ timeout: 10000 }).catch(() => {})
  revisar(await page.getByText('Solicitud recibida').isVisible(), 'éxito: muestra "Solicitud recibida"')
  revisar(await page.getByText('Gracias, Prueba.').isVisible(), 'éxito: saluda por el nombre')
  if (!REAL) {
    const d = enviados[0] || {}
    revisar(enviados.length === 1, 'éxito: se envía una sola vez')
    revisar(d.email === DATOS.correo, 'Formspree: "email" = correo del solicitante (para responder)')
    revisar(d._subject === `Solicitud de propuesta HOLMEX · ${DATOS.empresa}`, 'Formspree: asunto con la empresa')
    revisar(d.Nombre === DATOS.nombre && d.Empresa === DATOS.empresa && d['Región'] === DATOS.region && d['Teléfono'] === DATOS.telefono, 'Formspree: nombre, empresa, región y teléfono')
    revisar(d['Programa piloto'] === 'Sí' && d['Prueba in situ'] === 'Sí', 'Formspree: casillas piloto e in situ')
  }
  await page.close()
}

// 7. Formspree responde error o no hay red: ofrece enviar por correo.
for (const respuesta of ['error', 'red']) {
  const { page } = await nuevaPagina({ respuesta })
  await llenar(page)
  await enviar(page)
  await page.getByText('Solicitud preparada').waitFor({ timeout: 5000 }).catch(() => {})
  revisar(await page.getByText('Solicitud preparada').isVisible(), `falla (${respuesta}): muestra el resumen para enviar por correo`)
  const href = await page.getAttribute('a:has-text("Abrir en mi correo")', 'href').catch(() => '')
  revisar(href?.startsWith('mailto:contacto@holmex.cl?subject='), `falla (${respuesta}): el botón de correo apunta a contacto@holmex.cl`)
  await page.click('button:has-text("Editar datos")')
  revisar((await page.inputValue('#f-nombre')) === DATOS.nombre, `falla (${respuesta}): "Editar datos" conserva lo escrito`)
  await page.close()
}

// 8. El botón "Postular al programa piloto" debería marcar la casilla del piloto.
{
  const { page } = await nuevaPagina()
  await page.click('#piloto a[href="#contacto"]')
  revisar(await page.isChecked('#f-piloto'), '"Postular al programa piloto" marca la casilla del piloto')
  await page.close()
}

// 9. Abrir la Política de Privacidad y volver no debería borrar lo escrito.
{
  const { page } = await nuevaPagina()
  await llenar(page, DATOS, false)
  await page.click('#contacto a[href="#/privacidad"]')
  await page.waitForTimeout(300)
  await page.goBack()
  await page.locator('#f-nombre').waitFor()
  revisar((await page.inputValue('#f-nombre')) === DATOS.nombre, 'leer la Política de Privacidad y volver conserva lo escrito')
  await page.close()
}

await browser.close()
console.log(fallos ? `\n${fallos} prueba(s) fallaron.` : '\nTodas las pruebas pasaron.')
process.exit(fallos ? 1 : 0)
