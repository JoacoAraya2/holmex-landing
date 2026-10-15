<template>
  <section id="licencia" class="bg-abyss">
    <div class="gutter mx-auto grid max-w-7xl gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div class="min-w-0">
        <p class="eyebrow">Licencia y precio</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Un precio claro, pensado para la mediana y pequeña minería</h2>
        <p class="mt-4 max-w-[58ch] text-mute">
          Se paga una vez por equipo y el software queda instalado en su computador de faena. Sin suscripciones,
          sin llaves físicas y sin depender de internet.
        </p>
        <ul class="mt-8 flex flex-col gap-3">
          <li v-for="item in LICENCIA.incluye" :key="item" class="flex gap-3 text-ink">
            <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#38bdf8" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <article class="sheet min-w-0 overflow-hidden rounded-xl">
        <header class="flex flex-wrap items-end justify-between gap-4 border-b border-line/70 bg-volt/10 p-6 sm:p-8">
          <div>
            <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">{{ LICENCIA.modalidad }}</p>
            <p class="mt-2 flex items-baseline gap-2">
              <span class="num display text-5xl font-extrabold text-ink">{{ LICENCIA.precio }}</span>
              <span class="font-mono text-lg text-mute">{{ LICENCIA.impuesto }}</span>
            </p>
          </div>
          <a href="#contacto" class="btn-primary">Solicitar propuesta</a>
        </header>
        <dl class="divide-y divide-line/50">
          <div v-for="a in LICENCIA.atributos" :key="a.criterio" class="grid gap-1 px-6 py-4 sm:grid-cols-[200px_1fr] sm:gap-6 sm:px-8">
            <dt class="font-mono text-xs uppercase tracking-[0.1em] text-mute sm:pt-0.5">{{ a.criterio }}</dt>
            <dd class="text-ink">{{ a.valor }}</dd>
          </div>
        </dl>
      </article>
    </div>
  </section>
</template>

<script setup>
import { LICENCIA } from '../data/content.js'
</script>
