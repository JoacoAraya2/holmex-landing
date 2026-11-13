<template>
  <div class="bg-white">
    <svg :viewBox="caja" class="block h-auto w-full" role="img" :aria-label="`Plano 2D de la malla: ${resultado.conteo.total_cargados} tiros cargados`" style="max-height: 70vh">
      <!-- Grilla de 0,5 m -->
      <g stroke="#e2e8f0" :stroke-width="0.006">
        <line v-for="x in grillaX" :key="'gx' + x" :x1="x" :x2="x" :y1="-g.top" :y2="-g.bottom" />
        <line v-for="y in grillaY" :key="'gy' + y" :x1="g.left" :x2="g.right" :y1="-y" :y2="-y" />
      </g>

      <!-- Marca de agua -->
      <text :x="0" :y="0" text-anchor="middle" dominant-baseline="middle" :font-size="perfil.ancho_m * 0.11" font-weight="700" fill="#0f172a" fill-opacity="0.06" :transform="`rotate(-28)`" style="font-family: var(--font-mono); user-select: none">DEMO · {{ marca }}</text>

      <!-- Perfil de la labor -->
      <path :d="contorno" fill="none" stroke="#0f172a" :stroke-width="0.022" stroke-linejoin="round" />

      <!-- Tiros -->
      <g v-for="(t, i) in resultado.tiros" :key="i">
        <circle :cx="t.x" :cy="-t.y" :r="radio(t)" :fill="colorTiro(t, perfil.alto_m).relleno" :stroke="colorTiro(t, perfil.alto_m).borde" :stroke-width="0.012">
          <title>{{ NOMBRES[t.tipo] }}</title>
        </circle>
      </g>

      <!-- Cotas: ancho y alto de la labor -->
      <g stroke="#475569" :stroke-width="0.008" fill="#334155" :font-size="0.14" style="font-family: var(--font-mono)">
        <line :x1="-w2" :x2="w2" :y1="cotaY" :y2="cotaY" />
        <line :x1="-w2" :x2="-w2" :y1="cotaY - 0.06" :y2="cotaY + 0.06" />
        <line :x1="w2" :x2="w2" :y1="cotaY - 0.06" :y2="cotaY + 0.06" />
        <text :x="0" :y="cotaY + 0.2" text-anchor="middle" stroke="none">{{ coma(perfil.ancho_m) }} m</text>
        <line :x1="cotaX" :x2="cotaX" :y1="-yTope" :y2="-yPiso" />
        <line :x1="cotaX - 0.06" :x2="cotaX + 0.06" :y1="-yTope" :y2="-yTope" />
        <line :x1="cotaX - 0.06" :x2="cotaX + 0.06" :y1="-yPiso" :y2="-yPiso" />
        <text :x="cotaX - 0.1" :y="0" text-anchor="middle" stroke="none" :transform="`rotate(-90 ${cotaX - 0.1} 0)`">{{ coma(perfil.alto_m) }} m</text>
      </g>

      <text :x="g.right - 0.05" :y="-g.bottom - 0.07" text-anchor="end" :font-size="0.1" fill="#64748b" style="font-family: var(--font-mono)">HOLMEX · demo · {{ marca }} · no válido para operación</text>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { colorTiro, NOMBRES } from './colores.js'

const props = defineProps({
  resultado: { type: Object, required: true },
  marca: { type: String, required: true },
})

const perfil = computed(() => props.resultado.perfil)
const w2 = computed(() => perfil.value.ancho_m / 2)
const yPiso = computed(() => -perfil.value.alto_m / 2)
const ySpring = computed(() => yPiso.value + perfil.value.alto_hastial_m)
const yTope = computed(() => ySpring.value + perfil.value.alto_boveda_m)

// Márgenes alrededor del perfil (m), con espacio para las cotas.
const g = computed(() => ({
  left: -w2.value - 0.75,
  right: w2.value + 0.45,
  top: yTope.value + 0.35,
  bottom: yPiso.value - 0.8,
}))
const caja = computed(() => {
  const { left, right, top, bottom } = g.value
  return `${left} ${-top} ${right - left} ${top - bottom}`
})
const cotaY = computed(() => -yPiso.value + 0.28)
const cotaX = computed(() => -w2.value - 0.35)

const pasos = (desde, hasta) => {
  const v = []
  for (let x = Math.ceil(desde / 0.5) * 0.5; x <= hasta + 1e-9; x += 0.5) v.push(Number(x.toFixed(2)))
  return v
}
const grillaX = computed(() => pasos(g.value.left, g.value.right))
const grillaY = computed(() => pasos(g.value.bottom, g.value.top))

// Perfil: paredes rectas bajo una bóveda semielíptica, igual que el software.
const contorno = computed(() => {
  const rx = w2.value
  const ry = perfil.value.alto_boveda_m
  return `M ${-rx} ${-yPiso.value} L ${-rx} ${-ySpring.value} A ${rx} ${ry} 0 0 1 ${rx} ${-ySpring.value} L ${rx} ${-yPiso.value} Z`
})

// Tamaños del plano operativo del software (6 px y 5 px a 95 px/m); los alivios a su diámetro real.
function radio(t) {
  if (t.tipo === 'alivio') return Math.max(t.d / 2000, 0.02)
  if (t.tipo === 'rainura') return 0.053
  return 0.063
}

function coma(v) {
  return Number(v).toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>
