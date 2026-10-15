<template>
  <section id="simulador" class="bg-abyss">
    <div class="gutter mx-auto max-w-7xl py-20">
      <div class="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div class="max-w-3xl">
          <p class="eyebrow">Simulador espacial</p>
          <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Cambie la labor y vea la malla recalcularse</h2>
          <p class="mt-4 max-w-[62ch] text-mute">
            Una versión reducida del flujo de HOLMEX: sección, barra, diámetros y litología. La secuencia de salida
            aparece numerada sobre cada tiro.
          </p>
        </div>
        <span class="w-fit rounded border border-warn/50 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-warn">Modelo demostrativo simplificado</span>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
        <form class="sheet flex min-w-0 flex-col gap-5 rounded-xl p-5" @submit.prevent aria-label="Parámetros de la labor">
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Parámetros de la labor</p>

          <div>
            <label for="sim-ancho" class="flex justify-between text-sm"><span>Ancho de labor</span><span class="num font-mono text-ion">{{ c(p.ancho.toFixed(1)) }} m</span></label>
            <input id="sim-ancho" v-model.number="p.ancho" type="range" min="3" max="5" step="0.5" class="mt-2 w-full" />
          </div>
          <div>
            <label for="sim-alto" class="flex justify-between text-sm"><span>Alto de labor</span><span class="num font-mono text-ion">{{ c(p.alto.toFixed(1)) }} m</span></label>
            <input id="sim-alto" v-model.number="p.alto" type="range" min="3" max="5" step="0.5" class="mt-2 w-full" />
          </div>
          <div>
            <label for="sim-barra" class="text-sm">Largo de barra</label>
            <select id="sim-barra" v-model.number="p.barra" class="field mt-2">
              <option v-for="b in BARRAS" :key="b" :value="b">{{ c(b.toFixed(1)) }} m</option>
            </select>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label for="sim-dcarga" class="text-sm">Tiro cargado</label>
              <select id="sim-dcarga" v-model.number="p.dCarga" class="field mt-2">
                <option v-for="d in DIAM_CARGA" :key="d" :value="d">{{ d }} mm</option>
              </select>
            </div>
            <div>
              <label for="sim-dvacio" class="text-sm">Tiro vacío</label>
              <select id="sim-dvacio" v-model.number="p.dVacio" class="field mt-2">
                <option v-for="d in DIAM_VACIO" :key="d" :value="d">{{ d }} mm</option>
              </select>
            </div>
          </div>
          <div>
            <label for="sim-lito" class="text-sm">Litología predominante</label>
            <select id="sim-lito" v-model="p.litologia" class="field mt-2">
              <option v-for="l in LITOLOGIAS" :key="l.id" :value="l.id">{{ l.nombre }} · RMR {{ l.rmr }}</option>
            </select>
          </div>
          <div>
            <label for="sim-precio" class="text-sm">Precio ANFO (CLP/kg)</label>
            <input id="sim-precio" v-model.number="p.precioAnfo" type="number" min="0" step="50" class="field num mt-2 font-mono" />
          </div>
          <label for="sim-seq" class="flex items-center gap-2 text-sm text-mute">
            <input id="sim-seq" v-model="verSecuencia" type="checkbox" class="h-4 w-4 accent-[#00d2ff]" />
            Mostrar secuencia de salida
          </label>
        </form>

        <div class="flex min-w-0 flex-col gap-4">
          <div class="blueprint rounded-xl border border-line/80 p-3 sm:p-5">
            <div class="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span class="text-glint">Sección {{ c(p.ancho.toFixed(2)) }} × {{ c(p.alto.toFixed(2)) }} m · {{ mesh.metrics.tiros }} tiros</span>
              <span class="rounded-full border px-2.5 py-0.5" :class="claseColor">Clase {{ mesh.rmr.clase }} · {{ mesh.rmr.nombre }} (RMR {{ mesh.litologia.rmr }})</span>
            </div>
            <div class="mx-auto mt-2 max-w-[640px]">
              <MeshDrawing :mesh="mesh" :seq="verSecuencia" :anim-key="animKey" />
            </div>
          </div>

          <div class="overflow-x-auto rounded-xl border border-line/80">
            <table class="w-full min-w-[520px] text-left text-sm">
              <thead class="bg-panel-2 font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                <tr>
                  <th scope="col" class="px-4 py-2.5 font-medium">Parámetro</th>
                  <th scope="col" class="px-4 py-2.5 text-right font-medium">Valor</th>
                  <th scope="col" class="px-4 py-2.5 font-medium">Base</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-line/50 bg-abyss-2">
                <tr v-for="r in filas" :key="r.k">
                  <th scope="row" class="px-4 py-2.5 font-normal text-ink">{{ r.k }}</th>
                  <td class="num px-4 py-2.5 text-right font-mono text-ion">{{ r.v }}</td>
                  <td class="px-4 py-2.5 font-mono text-xs text-mute">{{ r.b }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import MeshDrawing from './MeshDrawing.vue'
import { computeMesh, LITOLOGIAS, BARRAS, DIAM_CARGA, DIAM_VACIO } from '../data/mesh.js'

const p = reactive({ ancho: 4.0, alto: 4.0, barra: 2.4, dCarga: 38, dVacio: 102, litologia: 'andesita', precioAnfo: 1200 })
const verSecuencia = ref(true)
const animKey = ref(0)

const mesh = computed(() => computeMesh({ ...p, precioAnfo: Number(p.precioAnfo) || 0 }))

watch(
  () => [p.ancho, p.alto, p.barra, p.dCarga, p.dVacio, p.litologia],
  () => { animKey.value++ },
)

function c(v) {
  return String(v).replace('.', ',')
}

const clp = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })

const claseColor = computed(() => {
  const k = mesh.value.rmr.clase
  if (k === 'I' || k === 'II') return 'border-h-caj/60 text-h-caj'
  if (k === 'III') return 'border-warn/60 text-warn'
  return 'border-h-cor/60 text-h-cor'
})

const filas = computed(() => {
  const m = mesh.value.metrics
  return [
    { k: 'Burden máximo (zapateras)', v: `${c(m.bMax.toFixed(2))} m`, b: 'Langefors & Kihlström, f = 1,45' },
    { k: 'Burden práctico', v: `${c(m.bPrac.toFixed(2))} m`, b: 'B_máx − 0,05 − 0,03·L' },
    { k: 'Espaciamiento de corona', v: `${c(m.espCorona.toFixed(2))} m`, b: 'Holmberg & Persson, 15·d' },
    { k: 'Radio de daño en contorno', v: `≈ ${c(m.rDano.toFixed(2))} m`, b: 'q = 0,2 kg/m desacoplado' },
    { k: 'Avance esperado por disparo', v: `${c(m.avance.toFixed(2))} m`, b: '90% del largo perforado' },
    { k: 'Factor de carga', v: `${c(m.factorCarga.toFixed(2))} kg/m³`, b: `${c(m.kg.toFixed(1))} kg en ${c(m.volumen.toFixed(1))} m³` },
    { k: 'P80 proyectado', v: `${c(m.p80.toFixed(1))} cm`, b: 'Kuz-Ram, n = 1,2' },
    { k: 'Metros perforados', v: `${c(m.metrosPerforados.toFixed(1))} m`, b: `${m.tiros} tiros cargados` },
    { k: 'Costo de explosivo por disparo', v: clp.format(m.costo), b: 'ANFO-equivalente' },
  ]
})
</script>
