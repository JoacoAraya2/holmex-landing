<template>
  <section id="producto" class="border-y border-line/60 bg-abyss-2">
    <div class="gutter mx-auto max-w-7xl py-20">
      <div class="max-w-3xl">
        <p class="eyebrow">El software</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Aplicación de escritorio nativa, pensada para el computador de faena</h2>
      </div>

      <div class="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Pantallas de HOLMEX">
        <button
          v-for="cap in CAPTURAS"
          :id="'tab-' + cap.id"
          :key="cap.id"
          type="button"
          role="tab"
          :aria-selected="activa === cap.id"
          aria-controls="captura-panel"
          class="rounded-md border px-3 py-2 text-sm transition-colors"
          :class="activa === cap.id ? 'border-ion bg-ion/10 text-ink' : 'border-line text-mute hover:text-ink'"
          @click="activa = cap.id"
        >{{ cap.titulo }}</button>
      </div>

      <!-- Pestañas fuera de la grilla para que la captura y la ficha técnica partan a la misma altura. -->
      <div class="mt-4 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
        <figure id="captura-panel" role="tabpanel" class="min-w-0">
          <div class="overflow-hidden rounded-xl border border-line-hi/60 bg-abyss shadow-[0_30px_80px_-40px_rgba(0,210,255,0.45)]">
            <div class="flex items-center gap-2 border-b border-line/70 bg-panel px-3 py-2">
              <span class="h-2.5 w-2.5 rounded-full bg-line"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-line"></span>
              <span class="h-2.5 w-2.5 rounded-full bg-line"></span>
              <span class="ml-2 font-mono text-[11px] text-mute">HOLMEX</span>
            </div>
            <img :src="IMAGENES[activa]" :alt="actual.titulo + ' de HOLMEX'" width="1400" height="730" class="block h-auto w-full" />
          </div>
          <figcaption class="mt-3 max-w-[65ch] text-sm text-mute">{{ actual.texto }}</figcaption>
        </figure>

        <aside class="sheet min-w-0 overflow-hidden rounded-xl">
          <p class="border-b border-line/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Ficha técnica</p>
          <dl class="divide-y divide-line/50">
            <div v-for="[k, v] in FICHA" :key="k" class="flex flex-col gap-1 px-5 py-3">
              <dt class="font-mono text-xs uppercase tracking-[0.08em] text-mute">{{ k }}</dt>
              <dd class="text-sm text-ink">{{ v }}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CAPTURAS, FICHA } from '../data/content.js'
import imgParametros from '../assets/app-parametros.webp'
import imgMalla from '../assets/app-malla.webp'

const IMAGENES = { parametros: imgParametros, malla: imgMalla }
const activa = ref('malla')
const actual = computed(() => CAPTURAS.find((c) => c.id === activa.value))
</script>
