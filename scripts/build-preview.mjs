// Genera un HTML autocontenido (Vue 3 por CDN + CSS Tailwind precompilado) a partir de los SFC de src/.
// Uso: node scripts/build-preview.mjs <ruta-tailwindcss> <salida.html>
// Requisito de estilo en los SFC: <script setup> con declaraciones de nivel superior sin indentar.
import fs from 'fs'
import path from 'path'
import { pathToFileURL } from 'url'

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const SRC = path.join(ROOT, 'src')
const [twDir, outFile] = process.argv.slice(2)

const vueFiles = [path.join(SRC, 'App.vue'), ...fs.readdirSync(path.join(SRC, 'components')).map((f) => path.join(SRC, 'components', f))]

function block(src, tag) {
  const open = src.indexOf(`<${tag}`)
  if (open < 0) return ''
  const start = src.indexOf('>', open) + 1
  const end = src.lastIndexOf(`</${tag}>`)
  return src.slice(start, end)
}

function matchParen(s, i) {
  let depth = 0
  for (let j = i; j < s.length; j++) {
    if (s[j] === '(') depth++
    else if (s[j] === ')') { depth--; if (depth === 0) return j }
  }
  throw new Error('paréntesis sin cerrar')
}

const comps = {}
for (const file of vueFiles) {
  const name = path.basename(file, '.vue')
  const src = fs.readFileSync(file, 'utf8')
  const template = block(src, 'template').trim()
  let script = block(src, 'script')
  const deps = []
  const assets = []
  const exposed = new Set()
  let propsDef = null

  script = script.replace(/^import\s+(.+?)\s+from\s+['"](.+?)['"]\s*;?\s*$/gm, (m, what, from) => {
    if (from === 'vue') return ''
    if (from.endsWith('.vue')) { deps.push(what.trim()); return '' }
    if (/\.(webp|png|jpe?g|svg)$/.test(from)) {
      const abs = path.resolve(path.dirname(file), from)
      const ext = path.extname(abs).slice(1).replace('jpg', 'jpeg').replace('svg', 'svg+xml')
      assets.push(`const ${what.trim()} = "data:image/${ext};base64,${fs.readFileSync(abs).toString('base64')}";`)
      exposed.add(what.trim())
      return ''
    }
    what.replace(/[{}]/g, '').split(',').map((s) => s.trim()).filter(Boolean).forEach((n) => exposed.add(n))
    return ''
  })

  const dp = script.indexOf('defineProps(')
  if (dp >= 0) {
    const open = dp + 'defineProps'.length
    const close = matchParen(script, open)
    propsDef = script.slice(open + 1, close)
    const stmtStart = script.lastIndexOf('\n', dp) + 1
    script = script.slice(0, stmtStart) + script.slice(close + 1)
  }
  script = script.replace(/import\.meta\.env\.VITE_FORM_ENDPOINT/g, '""')
  for (const m of script.matchAll(/^(?:const|let|function|async function)\s+(\w+)/gm)) exposed.add(m[1])

  comps[name] = { name, template, script, deps, assets, exposed: [...exposed], propsDef }
}

// orden topológico
const order = []
const seen = new Set()
function visit(n) { if (seen.has(n)) return; seen.add(n); comps[n].deps.forEach(visit); order.push(n) }
Object.keys(comps).forEach(visit)

const dataJs = ['content.js', 'mesh.js', 'legal.js']
  .map((f) => fs.readFileSync(path.join(SRC, 'data', f), 'utf8').replace(/^import .*$/gm, '').replace(/^export\s+/gm, '').replace(/src: '\/media\/[^']*'/g, "src: ''"))
  .join('\n')

const compJs = order.map((n) => {
  const c = comps[n]
  return `const ${n} = {
  name: ${JSON.stringify(n)},
  components: { ${c.deps.join(', ')} },
  ${c.propsDef ? `props: ${c.propsDef},` : ''}
  template: ${JSON.stringify(c.template)},
  setup(props) {
${c.assets.join('\n')}
${c.script}
    return { ${c.exposed.join(', ')} }
  }
};`
}).join('\n\n')

const bundle = `(function () {
const { createApp, ref, reactive, computed, watch, onMounted, onBeforeUnmount } = Vue;
${dataJs}
${compJs}
createApp(App).mount('#app');
})();`

// Tailwind v4: compilar con candidatos extraídos de los fuentes
const { compile } = await import(pathToFileURL(path.join(twDir, 'dist/lib.mjs')).href)
const cssIn = fs.readFileSync(path.join(SRC, 'style.css'), 'utf8')
const compiler = await compile(cssIn, {
  base: SRC,
  loadStylesheet: async (id) => {
    const f = id === 'tailwindcss' ? path.join(twDir, 'index.css') : path.join(twDir, id.replace(/^tailwindcss\//, ''))
    return { content: fs.readFileSync(f, 'utf8'), base: twDir, path: f }
  },
})
const sources = vueFiles.map((f) => fs.readFileSync(f, 'utf8')).join('\n') + fs.readFileSync(path.join(SRC, 'data', 'content.js'), 'utf8')
const candidates = new Set(sources.split(/[\s"'`<>{}=;,]+/).filter((t) => t && t.length < 120))
const css = compiler.build([...candidates])

const favicon = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'public', 'favicon-48.png')).toString('base64')
const html = `<title>HOLMEX</title>
<link rel="icon" type="image/png" href="${favicon}">
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="Diseño de mallas de perforación y tronadura subterránea con rigor técnico y respaldo DS 132.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
${css}
</style>
<div id="app"></div>
<script src="https://cdn.jsdelivr.net/npm/vue@3.5.12/dist/vue.global.prod.js"></script>
<script>
${bundle}
</script>
`
fs.writeFileSync(outFile, html)
console.log('ok', outFile, (html.length / 1024).toFixed(0) + ' KB', 'css', (css.length / 1024).toFixed(0) + ' KB')
