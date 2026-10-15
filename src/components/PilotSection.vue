<template>
  <section id="piloto" class="bg-abyss">
    <div class="gutter mx-auto max-w-7xl py-20">
      <div class="sheet grid overflow-hidden rounded-2xl lg:grid-cols-[1fr_1fr]">
        <div class="min-w-0 border-b border-line/70 bg-volt/10 p-6 sm:p-10 lg:border-b-0 lg:border-r">
          <p class="eyebrow">Programa piloto {{ new Date().getFullYear() }}</p>
          <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Buscamos {{ PILOTO.cupos }} faenas para probar HOLMEX en terreno</h2>
          <p class="mt-4 max-w-[52ch] text-mute">
            Durante {{ PILOTO.duracion }} usamos HOLMEX en sus labores reales, junto a su equipo de P&amp;T, y comparamos los
            resultados con su método actual.
          </p>

          <div class="mt-8">
            <div class="flex items-baseline justify-between font-mono text-sm">
              <span class="text-ink">{{ disponibles }} de {{ PILOTO.cupos }} cupos disponibles</span>
              <span class="text-mute">{{ PILOTO.ocupados }} tomados</span>
            </div>
            <div class="mt-2 grid gap-1.5" :style="{ gridTemplateColumns: `repeat(${PILOTO.cupos}, minmax(0, 1fr))` }" aria-hidden="true">
              <span v-for="n in PILOTO.cupos" :key="n" class="h-2 rounded-full" :class="n <= PILOTO.ocupados ? 'bg-ink/25' : 'bg-glint'"></span>
            </div>
          </div>

          <a href="#contacto" class="btn-primary mt-8">Postular al programa piloto</a>
        </div>

        <div class="min-w-0 p-6 sm:p-10">
          <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Qué recibe su faena</p>
          <ul class="mt-5 flex flex-col gap-4">
            <li v-for="b in PILOTO.beneficios" :key="b" class="flex gap-3 text-ink">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#38bdf8" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
              <span>{{ b }}</span>
            </li>
          </ul>
          <p class="mt-8 border-t border-line/60 pt-5 text-sm text-mute">
            <span class="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Quiénes pueden postular · </span>{{ PILOTO.requisitos }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { PILOTO } from '../data/content.js'

const disponibles = Math.max(PILOTO.cupos - PILOTO.ocupados, 0)
</script>
