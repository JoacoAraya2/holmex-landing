<template>
  <section id="soporte" class="bg-abyss">
    <div class="gutter mx-auto max-w-7xl pb-20">
      <div class="glow-line"></div>
      <div class="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div class="min-w-0">
          <p class="eyebrow">Después de la compra</p>
          <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Qué incluye la licencia y qué se cotiza aparte</h2>
        </div>
        <p class="max-w-[58ch] text-mute lg:justify-self-end">
          HOLMEX se vende como programa ejecutable con licencia anual por equipo. Los servicios que la faena solicite después
          de la puesta en marcha se cotizan por separado, con un valor adicional.
        </p>
      </div>

      <div class="mt-10 grid gap-6 lg:grid-cols-2">
        <article class="sheet min-w-0 rounded-xl">
          <header class="flex items-center justify-between gap-3 border-b border-line/70 px-6 py-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-h-caj">Incluido en la licencia</p>
            <span class="font-mono text-xs text-mute">{{ LICENCIA.precio }} {{ LICENCIA.impuesto }} · {{ LICENCIA.unidad }}</span>
          </header>
          <ul class="divide-y divide-line/50">
            <li v-for="s in SOPORTE.incluido" :key="s.titulo" class="flex gap-4 px-6 py-4">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#22c55e" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
              <div class="min-w-0">
                <h3 class="font-semibold text-ink">{{ s.titulo }}</h3>
                <p class="mt-1 text-sm text-mute">{{ s.texto }}</p>
              </div>
            </li>
          </ul>
        </article>

        <article class="min-w-0 rounded-xl border border-warn/40 bg-panel/90">
          <header class="flex items-center justify-between gap-3 border-b border-warn/30 px-6 py-4">
            <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-warn">Con costo adicional</p>
            <span class="font-mono text-xs text-mute">Se cotiza por solicitud</span>
          </header>
          <ul class="divide-y divide-line/50">
            <li v-for="s in SOPORTE.adicional" :key="s.titulo" class="flex gap-4 px-6 py-4">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f59e0b" stroke-width="2" aria-hidden="true"><path d="M8 3v10M3 8h10" /></svg>
              <div class="min-w-0">
                <h3 class="font-semibold text-ink">{{ s.titulo }}</h3>
                <p class="mt-1 text-sm text-mute">{{ s.texto }}</p>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { LICENCIA, SOPORTE } from '../data/content.js'
</script>
