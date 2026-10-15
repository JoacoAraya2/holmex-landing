<template>
  <svg
    :viewBox="`0 0 ${vbW} ${vbH}`"
    class="block w-full h-auto"
    role="img"
    :aria-label="`Malla de perforación para sección de ${fmt(mesh.W)} por ${fmt(mesh.H)} metros con ${mesh.holes.length} tiros`"
  >
    <path :d="contour" class="mesh-contour" />

    <!-- Rainura: líneas entre tiros de cada cuadrante -->
    <polygon
      v-for="(q, i) in mesh.cuadrantes"
      :key="'q' + i + animKey"
      :points="q.map((p) => `${X(p.x)},${Y(p.y)}`).join(' ')"
      class="mesh-cut-line hole-anim"
      :style="{ animationDelay: delay(q[0].seq) }"
    />

    <!-- Tiro(s) vacío(s) -->
    <circle :cx="X(0)" :cy="Y(mesh.yc)" :r="Math.max(6, (mesh.D / 2) * S * 1.6)" class="hole-vacio" />
    <circle :cx="X(0)" :cy="Y(mesh.yc)" :r="2" fill="#f8fafc" />

    <g v-for="(h, i) in mesh.holes" :key="i + '-' + animKey">
      <circle
        :cx="X(h.x)"
        :cy="Y(h.y)"
        :r="h.tipo === 'rainura' ? 5.5 : 7"
        :class="['hole', 'hole-' + h.tipo, 'hole-anim']"
        :style="{ animationDelay: delay(h.seq) }"
      >
        <title>{{ etiqueta(h) }}</title>
      </circle>
      <text
        v-if="seq && h.tipo !== 'rainura'"
        :x="X(h.x) + 9"
        :y="Y(h.y) - 8"
        class="hole-seq"
      >{{ h.seq }}</text>
    </g>

    <!-- Cotas -->
    <g v-if="dims">
      <line :x1="X(-mesh.W / 2)" :y1="Y(0) + 30" :x2="X(mesh.W / 2)" :y2="Y(0) + 30" class="mesh-dim" />
      <line :x1="X(-mesh.W / 2)" :y1="Y(0) + 22" :x2="X(-mesh.W / 2)" :y2="Y(0) + 38" class="mesh-dim" />
      <line :x1="X(mesh.W / 2)" :y1="Y(0) + 22" :x2="X(mesh.W / 2)" :y2="Y(0) + 38" class="mesh-dim" />
      <text :x="X(0)" :y="Y(0) + 52" text-anchor="middle" class="mesh-dim-text">{{ fmt(mesh.W) }} m</text>

      <line :x1="X(-mesh.W / 2) - 30" :y1="Y(0)" :x2="X(-mesh.W / 2) - 30" :y2="Y(mesh.H)" class="mesh-dim" />
      <line :x1="X(-mesh.W / 2) - 38" :y1="Y(0)" :x2="X(-mesh.W / 2) - 22" :y2="Y(0)" class="mesh-dim" />
      <line :x1="X(-mesh.W / 2) - 38" :y1="Y(mesh.H)" :x2="X(-mesh.W / 2) - 22" :y2="Y(mesh.H)" class="mesh-dim" />
      <line :x1="X(-mesh.W / 2) - 22" :y1="Y(mesh.H)" :x2="X(0)" :y2="Y(mesh.H)" class="mesh-dim" stroke-dasharray="3 4" />
      <text
        :x="X(-mesh.W / 2) - 42"
        :y="Y(mesh.H / 2)"
        text-anchor="middle"
        class="mesh-dim-text"
        :transform="`rotate(-90 ${X(-mesh.W / 2) - 42} ${Y(mesh.H / 2)})`"
      >{{ fmt(mesh.H) }} m</text>

      <line :x1="X(mesh.W / 2) + 30" :y1="Y(mesh.yc)" :x2="X(0) + 14" :y2="Y(mesh.yc)" class="mesh-dim" stroke-dasharray="3 4" />
      <text :x="X(mesh.W / 2) + 34" :y="Y(mesh.yc) + 4" class="mesh-dim-text">ø{{ Math.round(mesh.D * 1000) }} vacío</text>
    </g>
  </svg>
</template>

<script setup>
import { computed } from 'vue'
import { arcoPath } from '../data/mesh.js'

const props = defineProps({
  mesh: { type: Object, required: true },
  dims: { type: Boolean, default: true },
  seq: { type: Boolean, default: false },
  animKey: { type: Number, default: 0 },
})

const S = 100
const PAD_L = 110
const PAD_R = 130
const PAD_T = 40
const PAD_B = 80

const vbW = computed(() => props.mesh.W * S + PAD_L + PAD_R)
const vbH = computed(() => props.mesh.H * S + PAD_T + PAD_B)

function X(x) {
  return PAD_L + (x + props.mesh.W / 2) * S
}
function Y(y) {
  return PAD_T + (props.mesh.H - y) * S
}

const contour = computed(() => arcoPath(props.mesh, X, Y))

function delay(seq) {
  return `${0.15 + seq * 0.09}s`
}

function fmt(v) {
  return v.toFixed(2).replace('.', ',')
}

const NOMBRES = {
  rainura: 'Rainura',
  auxiliar: 'Auxiliar',
  caja: 'Caja',
  corona: 'Corona',
  zapatera: 'Zapatera',
}

function etiqueta(h) {
  return `${NOMBRES[h.tipo]} · x ${fmt(h.x)} m · y ${fmt(h.y)} m · salida ${h.seq}`
}
</script>
