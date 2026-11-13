// Crea las cuentas de la demo web y los secretos que usa el Worker.
//
// Uso (desde la carpeta holmex-landing):
//   node scripts/crear-cuentas-demo.mjs [cantidad] [vence AAAA-MM-DD] [carpeta de salida]
//   node scripts/crear-cuentas-demo.mjs 5 2026-12-15 ..
//
// Escribe dos archivos en la carpeta de salida (por defecto, la carpeta de arriba, fuera del repositorio):
//   demo-cuentas-PRIVADO.txt  usuarios y contraseñas para entregar a cada empresa
//   demo-secretos.json        lo que se sube a Cloudflare con:
//                             npx wrangler secret bulk ../demo-secretos.json
// Después de subirlo, borre demo-secretos.json. Nunca suba estos archivos a GitHub.
//
// Volver a correr el script crea contraseñas nuevas y cierra todas las sesiones abiertas.
import { createHash, randomBytes, randomInt } from 'node:crypto'
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const cantidad = Number(process.argv[2] || 5)
const hoy = new Date()
const enUnMes = new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() + 1, hoy.getUTCDate()))
const vence = process.argv[3] || enUnMes.toISOString().slice(0, 10)
const salida = resolve(process.argv[4] || '..')

if (!Number.isInteger(cantidad) || cantidad < 1 || cantidad > 20) throw new Error('La cantidad debe ser de 1 a 20')
if (!/^\d{4}-\d{2}-\d{2}$/.test(vence)) throw new Error('La fecha debe tener la forma AAAA-MM-DD')

// Sin letras ni números que se confundan (0/O, 1/l/I). 18 caracteres de 55 posibles: más de 100 bits.
const ALFABETO = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789'
function contrasena(largo = 18) {
  let s = ''
  for (let i = 0; i < largo; i++) s += ALFABETO[randomInt(ALFABETO.length)]
  // En grupos de 6 para dictarla o copiarla sin errores.
  return s.match(/.{1,6}/g).join('-')
}

const cuentas = {}
const lineas = [
  'HOLMEX · Cuentas de la demo web (holmex.cl, sección Demo)',
  `Vencen el ${vence} a las 23:59 (hora de Chile).`,
  'PRIVADO: entregar cada cuenta solo a su empresa. No subir a GitHub ni reenviar por canales públicos.',
  '',
]
for (let i = 1; i <= cantidad; i++) {
  const usuario = `admin${i}`
  const clave = contrasena()
  const sal = randomBytes(16).toString('hex')
  const hash = createHash('sha256').update(sal + clave).digest('hex')
  cuentas[usuario] = { sal, hash, vence }
  lineas.push(`${usuario}    ${clave}`)
}

const secretos = {
  DEMO_CUENTAS: JSON.stringify(cuentas),
  DEMO_SECRETO: randomBytes(32).toString('hex'),
}

writeFileSync(join(salida, 'demo-cuentas-PRIVADO.txt'), lineas.join('\n') + '\n')
writeFileSync(join(salida, 'demo-secretos.json'), JSON.stringify(secretos, null, 2) + '\n')
console.log(`Listo: ${cantidad} cuentas, vencen el ${vence}.`)
console.log(`  ${join(salida, 'demo-cuentas-PRIVADO.txt')}`)
console.log(`  ${join(salida, 'demo-secretos.json')}  ->  npx wrangler secret bulk "${join(salida, 'demo-secretos.json')}"`)
