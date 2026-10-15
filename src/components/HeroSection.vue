<template>
  <!-- Variante "pantalla": el video ocupa todo el fondo del banner y el texto va encima. -->
  <section
    v-if="variante === 'pantalla' && clips.length"
    id="inicio"
    class="relative isolate overflow-hidden border-b border-line/60 bg-abyss"
  >
    <div class="absolute inset-0 -z-10">
      <VideoStack :clips="clips" :actual="actual" :siguiente="siguiente" :sin-movimiento="sinMovimiento" @error="descartar" />
      <div class="absolute inset-0 bg-gradient-to-r from-abyss/95 via-abyss/60 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-abyss/30"></div>
      <div class="blueprint absolute inset-0 opacity-15 mix-blend-screen"></div>
    </div>

    <div class="gutter mx-auto flex min-h-[calc(100svh-66px)] max-w-7xl flex-col justify-between gap-10 py-14 md:py-20">
      <HeroCopy sobre-video class="max-w-2xl" />

      <div>
      <div class="grid grid-cols-4 items-start gap-x-3 lg:gap-x-4">
        <button
          v-for="(clip, i) in clips"
          :key="clip.src"
          type="button"
          class="group text-left"
          :aria-pressed="i === actual"
          @click="irA(i)"
        >
          <span class="block h-0.5 overflow-hidden rounded-full bg-ink/20">
            <span v-if="i === actual" :key="'p' + actual" class="barra-progreso block h-full bg-glint" :style="estiloBarra"></span>
          </span>
          <span class="mt-3 hidden font-mono text-[11px] uppercase tracking-[0.14em] lg:block" :class="i === actual ? 'text-glint' : 'text-mute group-hover:text-ink'">
            {{ String(i + 1).padStart(2, '0') }} · {{ clip.etiqueta }}
          </span>
          <span class="mt-1 hidden text-sm leading-snug transition-colors lg:block" :class="i === actual ? 'text-ink' : 'text-ink/50 group-hover:text-ink/80'">
            {{ clip.titulo }}
          </span>
        </button>
      </div>
      <p v-if="clipActual" :key="clipActual.src" class="titulo-clip mt-3 lg:hidden">
        <span class="block font-mono text-[11px] uppercase tracking-[0.14em] text-glint">{{ String(actual + 1).padStart(2, '0') }} · {{ clipActual.etiqueta }}</span>
        <span class="mt-1 block text-sm leading-snug text-ink">{{ clipActual.titulo }}</span>
      </p>
      </div>
    </div>
  </section>

  <!-- Variantes "tarjeta" (por defecto) y "hud": texto a la izquierda, video en una lámina a la derecha. -->
  <section v-else id="inicio" class="blueprint relative overflow-hidden border-b border-line/60">
    <div class="gutter mx-auto grid max-w-7xl items-center gap-12 py-14 md:py-20 lg:grid-cols-[1fr_1.1fr]">
      <HeroCopy />

      <figure class="min-w-0">
        <div
          class="relative aspect-video max-w-full overflow-hidden rounded-xl border bg-abyss shadow-[0_30px_80px_-40px_rgba(0,210,255,0.5)]"
          :class="variante === 'hud' ? 'border-ion/40' : 'border-line-hi/60'"
        >
          <VideoStack v-if="clips.length" :clips="clips" :actual="actual" :siguiente="siguiente" :sin-movimiento="sinMovimiento" @error="descartar" />
          <img
            v-else
            :src="capturaApp"
            alt="Pantalla de parámetros de la labor en HOLMEX"
            width="1400"
            height="728"
            class="absolute inset-0 h-full w-full object-cover object-top"
          />

          <!-- Capa técnica: marco, perfil de la labor con su malla de tiros y lectura del dato del clip -->
          <template v-if="variante === 'hud' && clipActual">
            <div class="pointer-events-none absolute inset-0 bg-abyss/35"></div>
            <svg class="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 640 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <g :key="'malla' + actual" class="malla-hud" transform="translate(48 -34) scale(0.85)">
                <path d="M230 300 V170 A90 90 0 0 1 410 170 V300 Z" fill="rgba(56,189,248,0.06)" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="4 3" />
                <circle v-for="(t, k) in TIROS" :key="k" :cx="t[0]" :cy="t[1]" r="4" :class="t[2]" class="hole" />
              </g>
            </svg>
            <span class="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-ion/80"></span>
            <span class="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-ion/80"></span>
            <span class="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-ion/80"></span>
            <span class="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-ion/80"></span>
            <div class="pointer-events-none absolute inset-x-5 top-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-ink/80">
              <span class="flex items-center gap-2"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-h-cor"></span>Frente {{ String(actual + 1).padStart(2, '0') }}</span>
              <span>HOLMEX · modo sin conexión</span>
            </div>
            <div class="pointer-events-none absolute right-5 top-12 rounded-md border border-ion/40 bg-abyss/70 px-3 py-2 text-right backdrop-blur-sm">
              <span :key="clipActual.dato" class="dato-hud display block text-2xl font-extrabold text-glint">{{ clipActual.dato }}</span>
              <span class="block font-mono text-[10px] uppercase tracking-widest text-mute">{{ clipActual.datoDetalle }}</span>
            </div>
          </template>

          <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent"></div>
          <figcaption class="absolute inset-x-0 bottom-0 p-4" :class="variante === 'hud' ? 'px-6 pb-6' : ''">
            <template v-if="clipActual">
              <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">
                {{ String(actual + 1).padStart(2, '0') }} / {{ String(clips.length).padStart(2, '0') }} · {{ clipActual.etiqueta }}
              </span>
              <p :key="clipActual.src" class="titulo-clip mt-1 max-w-[42ch] text-base font-semibold leading-snug text-ink sm:text-lg">{{ clipActual.titulo }}</p>
              <div class="mt-3 flex gap-1.5" role="tablist" aria-label="Videos del banner">
                <button
                  v-for="(clip, i) in clips"
                  :key="clip.src"
                  type="button"
                  role="tab"
                  :aria-selected="i === actual"
                  :aria-label="clip.etiqueta"
                  class="relative h-1.5 overflow-hidden rounded-full transition-all"
                  :class="i === actual ? 'w-10 bg-ink/25' : 'w-3 bg-ink/40 hover:bg-ink/70'"
                  @click="irA(i)"
                >
                  <span v-if="i === actual" :key="'p' + actual" class="barra-progreso absolute inset-y-0 left-0 bg-glint" :style="estiloBarra"></span>
                </button>
              </div>
            </template>
            <span v-else class="font-mono text-[11px] uppercase tracking-[0.14em] text-ink">Frentes de avance · minería subterránea</span>
          </figcaption>
        </div>
      </figure>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { HERO_VIDEOS } from '../data/content.js'
import HeroCopy from './HeroCopy.vue'
import VideoStack from './VideoStack.vue'
import capturaApp from '../assets/app-parametros.webp'

// Segundos que se muestra cada clip antes de pasar al siguiente.
const DURACION_CLIP = 7

// Diseño del banner. Por defecto "pantalla"; los otros se pueden ver con ?banner=tarjeta o ?banner=hud.
const VARIANTES = ['tarjeta', 'pantalla', 'hud']
const VARIANTE_POR_DEFECTO = 'pantalla'

// Tiros de la malla dibujada en la variante "hud": [x, y, clase de color]
const TIROS = [
  [250, 292, 'hole-zapatera'], [290, 292, 'hole-zapatera'], [330, 292, 'hole-zapatera'], [370, 292, 'hole-zapatera'], [390, 292, 'hole-zapatera'],
  [245, 250, 'hole-caja'], [245, 205, 'hole-caja'], [395, 250, 'hole-caja'], [395, 205, 'hole-caja'],
  [255, 150, 'hole-corona'], [285, 112, 'hole-corona'], [320, 98, 'hole-corona'], [355, 112, 'hole-corona'], [385, 150, 'hole-corona'],
  [300, 210, 'hole-auxiliar'], [340, 210, 'hole-auxiliar'], [320, 165, 'hole-auxiliar'], [300, 255, 'hole-auxiliar'], [340, 255, 'hole-auxiliar'],
  [320, 228, 'hole-vacio'],
]

const variante = ref(VARIANTE_POR_DEFECTO)
const clips = ref(HERO_VIDEOS.filter((c) => c.src))
const actual = ref(0)
const siguiente = computed(() => (clips.value.length ? (actual.value + 1) % clips.value.length : 0))
const clipActual = computed(() => clips.value[actual.value])
const sinMovimiento = ref(false)
const estiloBarra = computed(() => ({ animationDuration: `${DURACION_CLIP}s`, width: sinMovimiento.value ? '100%' : undefined }))
let temporizador = null

function programar() {
  clearTimeout(temporizador)
  if (sinMovimiento.value || clips.value.length < 2) return
  temporizador = setTimeout(() => irA(siguiente.value), DURACION_CLIP * 1000)
}

function irA(i) {
  actual.value = i
  programar()
}

function descartar(src) {
  const i = clips.value.findIndex((c) => c.src === src)
  if (i === -1) return
  clips.value.splice(i, 1)
  if (actual.value >= clips.value.length) actual.value = 0
  programar()
}

watch(actual, programar)

onMounted(() => {
  const pedida = new URLSearchParams(window.location.search).get('banner')
  if (VARIANTES.includes(pedida)) variante.value = pedida
  sinMovimiento.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  programar()
})

onBeforeUnmount(() => clearTimeout(temporizador))
</script>
