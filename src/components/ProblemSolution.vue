<template>
  <section id="solucion" class="bg-abyss">
    <div class="gutter mx-auto max-w-7xl py-20">
      <div class="max-w-3xl">
        <p class="eyebrow">El problema en faena vs. la solución</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">
          La sobreexcavación se paga dos veces: en explosivo y en sostenimiento
        </h2>
        <p class="mt-4 max-w-[62ch] text-mute">
          Cada disparo de avance define el avance real, la fragmentación, el consumo de explosivo y la integridad del
          macizo que queda. Hoy esa decisión se toma con planillas y experiencia. HOLMEX la convierte en un cálculo
          reproducible.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <article class="min-w-0 rounded-xl border border-line/70 bg-abyss-2 p-6 sm:p-8">
          <header class="flex items-center justify-between gap-3 border-b border-line/60 pb-4">
            <h3 class="text-xl font-semibold">Práctica tradicional</h3>
            <span class="rounded border border-warn/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-warn">Riesgo</span>
          </header>
          <ul class="mt-5 flex flex-col gap-4">
            <li v-for="t in PROBLEMA" :key="t" class="flex gap-3 text-mute">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#f59e0b" stroke-width="2" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg>
              <span>{{ t }}</span>
            </li>
          </ul>
        </article>

        <article class="sheet min-w-0 rounded-xl p-6 sm:p-8">
          <header class="flex items-center justify-between gap-3 border-b border-line/60 pb-4">
            <h3 class="text-xl font-semibold">Con HOLMEX</h3>
            <span class="rounded border border-ion/50 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ion">Control</span>
          </header>
          <ul class="mt-5 flex flex-col gap-4">
            <li v-for="t in SOLUCION" :key="t" class="flex gap-3 text-ink">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#00d2ff" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
              <span>{{ t }}</span>
            </li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-2 border-t border-line/60 pt-5">
            <span v-for="f in ['PDF', 'XLSX', 'CSV', 'PNG']" :key="f" class="rounded bg-volt/20 px-2.5 py-1 font-mono text-xs text-glint">.{{ f.toLowerCase() }}</span>
            <span class="font-mono text-xs leading-7 text-mute">expediente por disparo</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PROBLEMA, SOLUCION } from '../data/content.js'
</script>
