<template>
  <div class="grid gap-6 lg:grid-cols-[320px_1fr]">
    <!-- Parámetros -->
    <form class="sheet min-w-0 self-start rounded-xl p-5 sm:p-6" novalidate @submit.prevent="calcular">
      <p class="font-mono text-xs uppercase tracking-[0.14em] text-glint">Parámetros de la labor</p>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label for="d-ancho" class="text-sm">Ancho (m)</label>
          <select id="d-ancho" v-model.number="p.ancho_labor" class="field mt-1.5">
            <option v-for="v in DIMENSIONES" :key="v" :value="v">{{ coma(v, 1) }}</option>
          </select>
        </div>
        <div>
          <label for="d-alto" class="text-sm">Alto (m)</label>
          <select id="d-alto" v-model.number="p.alto_labor" class="field mt-1.5">
            <option v-for="v in DIMENSIONES" :key="v" :value="v">{{ coma(v, 1) }}</option>
          </select>
        </div>
      </div>

      <div class="mt-3">
        <label for="d-barra" class="text-sm">Largo de barra (m)</label>
        <select id="d-barra" v-model.number="p.largo_barra" class="field mt-1.5">
          <option v-for="v in BARRAS" :key="v" :value="v">{{ coma(v, 1) }}</option>
        </select>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label for="d-vacio" class="text-sm">Tiro vacío (mm)</label>
          <select id="d-vacio" v-model.number="p.diametro_tiro_vacio_mm" class="field mt-1.5">
            <option v-for="v in DIAM_VACIO" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
        <div>
          <label for="d-cargado" class="text-sm">Tiro cargado (mm)</label>
          <select id="d-cargado" v-model.number="p.diametro_tiro_cargado_mm" class="field mt-1.5">
            <option v-for="v in DIAM_CARGADO" :key="v" :value="v">{{ v }}</option>
          </select>
        </div>
      </div>

      <div class="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label for="d-rmr" class="text-sm">RMR (20 a 90)</label>
          <input id="d-rmr" v-model.number="p.rmr" type="number" inputmode="numeric" min="20" max="90" step="1" class="field mt-1.5" />
        </div>
        <div>
          <label for="d-dens" class="text-sm">Densidad (t/m³)</label>
          <input id="d-dens" v-model.number="p.densidad_roca" type="number" inputmode="decimal" min="2" max="3.5" step="0.01" class="field mt-1.5" />
        </div>
      </div>

      <fieldset class="mt-4">
        <legend class="text-sm">Modo de malla</legend>
        <div class="mt-1.5 grid grid-cols-2 gap-2">
          <label v-for="m in MODOS" :key="m.id" class="flex cursor-pointer items-center justify-center rounded-md border px-3 py-2 text-sm transition-colors" :class="p.modo === m.id ? 'border-ion bg-volt/20 text-ink' : 'border-field-line text-mute hover:text-ink'">
            <input v-model="p.modo" type="radio" name="modo" :value="m.id" class="sr-only" />
            {{ m.nombre }}
          </label>
        </div>
      </fieldset>

      <div class="mt-4 rounded-md border border-line/60 bg-abyss/60 p-3 text-xs text-mute">
        <p class="flex items-center gap-2 font-mono uppercase tracking-[0.1em]"><Candado /> Fijos en la demo</p>
        <p class="mt-1.5">Explosivo Titan ANFO de catálogo, carga de contorno reducida con sus valores iniciales, sin iniciación electrónica.</p>
      </div>

      <p v-if="error" class="mt-4 whitespace-pre-line text-sm text-[#fca5a5]" role="alert">{{ error }}</p>
      <button type="submit" class="btn-primary mt-5 w-full" :disabled="calculando">
        {{ calculando ? 'Calculando…' : 'Calcular malla' }}
      </button>
    </form>

    <!-- Resultados -->
    <div class="min-w-0">
      <div class="sheet overflow-hidden rounded-xl">
        <div class="flex items-center justify-between gap-3 border-b border-line/60 px-4 py-2.5">
          <div class="flex gap-1 rounded-full border border-line/60 bg-abyss-2/70 p-1" role="tablist" aria-label="Vista">
            <button v-for="v in VISTAS" :key="v.id" type="button" role="tab" :aria-selected="vista === v.id" class="rounded-full px-3.5 py-1 text-sm transition-colors" :class="vista === v.id ? 'bg-volt/25 text-ink shadow-[inset_0_0_0_1px_rgba(56,189,248,0.45)]' : 'text-mute hover:text-ink'" @click="vista = v.id">
              {{ v.nombre }}
            </button>
          </div>
          <p v-if="resultado" class="hidden font-mono text-xs text-mute sm:block">
            {{ coma(resultado.perfil.ancho_m, 1) }} × {{ coma(resultado.perfil.alto_m, 1) }} m · {{ resultado.modo === 'optimizado' ? 'Optimizado' : 'Estándar' }}
          </p>
        </div>

        <div class="relative">
          <div v-if="!resultado" class="flex aspect-[4/3] items-center justify-center text-mute">
            {{ calculando ? 'Calculando la malla…' : 'Ingrese los parámetros y calcule.' }}
          </div>
          <template v-else>
            <Malla2D v-if="vista === '2d'" :resultado="resultado" :marca="usuario" />
            <Malla3D v-else :resultado="resultado" :marca="usuario" />
          </template>
          <div v-if="calculando && resultado" class="absolute inset-0 bg-abyss/40"></div>
        </div>
      </div>

      <!-- Resumen -->
      <dl v-if="resultado" class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div v-for="dato in resumen" :key="dato.nombre" class="rounded-lg border border-line/70 bg-panel/80 px-4 py-3">
          <dt class="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">{{ dato.nombre }}</dt>
          <dd class="num mt-1 text-xl font-semibold text-ink">{{ dato.valor }}</dd>
        </div>
      </dl>
      <p v-if="resultado" class="mt-3 text-sm text-mute">
        Por tipo:
        <span v-for="(t, i) in porTipo" :key="t.nombre"><span class="inline-block h-2.5 w-2.5 rounded-full border align-middle" :style="{ background: t.color, borderColor: t.borde }"></span> {{ t.nombre }} {{ t.n }}<span v-if="i < porTipo.length - 1"> · </span></span>
      </p>

      <!-- Funciones reservadas para la licencia -->
      <div class="mt-6 grid gap-3 sm:grid-cols-2">
        <a v-for="b in DEMO.bloqueado" :key="b.titulo" href="#piloto" class="group flex gap-3 rounded-lg border border-dashed border-line/80 bg-abyss/40 p-4 transition-colors hover:border-ion/70">
          <span class="mt-0.5 text-mute group-hover:text-glint"><Candado /></span>
          <span class="min-w-0">
            <span class="block text-sm font-semibold text-ink">{{ b.titulo }}</span>
            <span class="block text-sm text-mute">{{ b.texto }}</span>
            <span class="mt-1 block font-mono text-[11px] uppercase tracking-[0.12em] text-glint">Disponible con licencia</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, defineAsyncComponent, h } from 'vue'
import { DEMO } from '../../data/content.js'
import Malla2D from './Malla2D.vue'
import { COLORES } from './colores.js'

// La vista 3D (Three.js) se descarga solo si se abre.
const Malla3D = defineAsyncComponent(() => import('./Malla3D.vue'))

const props = defineProps({ usuario: { type: String, required: true } })
const emit = defineEmits(['sesion-terminada'])

// Los mismos valores que ofrece el formulario del software.
const DIMENSIONES = [3.0, 3.5, 4.0, 4.5, 5.0]
const BARRAS = [1.4, 1.8, 2.4, 3.0, 3.6, 4.5]
const DIAM_VACIO = [76, 89, 102, 127]
const DIAM_CARGADO = [38, 41, 45, 48, 51, 64]
const MODOS = [
  { id: 'estandar', nombre: 'Estándar' },
  { id: 'optimizado', nombre: 'Optimizado' },
]
const VISTAS = [
  { id: '2d', nombre: 'Plano 2D' },
  { id: '3d', nombre: 'Vista 3D' },
]

const Candado = () =>
  h('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': 1.6, 'aria-hidden': 'true' }, [
    h('rect', { x: 3, y: 7, width: 10, height: 7, rx: 1.5 }),
    h('path', { d: 'M5.5 7V5a2.5 2.5 0 015 0v2' }),
  ])

const p = reactive({
  ancho_labor: 3.5,
  alto_labor: 4.0,
  largo_barra: 1.8,
  diametro_tiro_vacio_mm: 76,
  diametro_tiro_cargado_mm: 38,
  rmr: 60,
  densidad_roca: 2.68,
  modo: 'estandar',
})

const resultado = ref(null)
const calculando = ref(false)
const error = ref('')
const vista = ref('2d')

function coma(v, dec = 2) {
  return Number(v).toLocaleString('es-CL', { minimumFractionDigits: dec, maximumFractionDigits: dec })
}

const resumen = computed(() => {
  const r = resultado.value
  if (!r) return []
  return [
    { nombre: 'Tiros cargados', valor: r.conteo.total_cargados },
    { nombre: 'Tiros de alivio', valor: r.conteo.alivio },
    { nombre: 'Largo de tiro', valor: r.largo_tiro_m != null ? `${coma(r.largo_tiro_m)} m` : '—' },
    { nombre: 'Avance esperado', valor: r.avance_m != null ? `${coma(r.avance_m)} m` : '—' },
  ]
})

const porTipo = computed(() => {
  const c = resultado.value?.conteo
  if (!c) return []
  return [
    { nombre: 'Rainura', n: c.rainuras, color: COLORES.rainura.relleno, borde: COLORES.rainura.borde },
    { nombre: 'Zapateras', n: c.zapateras, color: COLORES.zapatera.relleno, borde: COLORES.zapatera.relleno },
    { nombre: 'Coronas', n: c.coronas, color: COLORES.corona.relleno, borde: COLORES.corona.relleno },
    { nombre: 'Cajas', n: c.cajas, color: COLORES.caja.relleno, borde: COLORES.caja.relleno },
    { nombre: 'Auxiliares', n: c.auxiliares, color: COLORES.auxiliar.relleno, borde: COLORES.auxiliar.relleno },
  ]
})

function validar() {
  if (!Number.isInteger(p.rmr) || p.rmr < 20 || p.rmr > 90) return 'El RMR debe ser un número entero entre 20 y 90.'
  if (!Number.isFinite(p.densidad_roca) || p.densidad_roca < 2 || p.densidad_roca > 3.5) return 'La densidad debe estar entre 2,00 y 3,50 t/m³.'
  return ''
}

async function calcular() {
  error.value = validar()
  if (error.value) return
  calculando.value = true
  try {
    const cuerpo = { ...p, densidad_roca: Math.round(p.densidad_roca * 100) / 100 }
    const r = await fetch('/api/demo/calcular', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuerpo),
    })
    const datos = await r.json().catch(() => ({}))
    if (r.status === 401) {
      emit('sesion-terminada', datos.error)
      return
    }
    if (!r.ok || !datos.ok) {
      error.value = datos.error || 'No se pudo calcular. Intente de nuevo.'
      return
    }
    resultado.value = datos
  } catch {
    error.value = 'Sin conexión con el servidor. Revise su internet e intente de nuevo.'
  } finally {
    calculando.value = false
  }
}

onMounted(calcular)
</script>
