<template>
  <section id="equipo" class="blueprint border-y border-line/60">
    <div class="gutter mx-auto max-w-7xl py-20">
      <div class="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
        <div>
          <p class="eyebrow">Equipo fundador</p>
          <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Ingeniería de software al servicio de la tronadura</h2>
        </div>
        <p class="max-w-[62ch] text-mute lg:justify-self-end">
          Tres ingenieros que trabajan con jefes de operación y planificadores P&amp;T para llevar la escuela sueca de
          voladura a un software que se usa en la frente, con cada fórmula documentada.
        </p>
      </div>

      <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="p in EQUIPO" :key="p.nombre" class="sheet flex min-w-0 flex-col overflow-hidden rounded-xl">
          <div class="relative aspect-[520/587] max-w-full overflow-hidden bg-abyss">
            <img :src="FOTOS[p.foto]" :alt="'Retrato de ' + p.nombre" width="520" height="587" loading="lazy" class="h-full w-full object-cover" />
            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-panel to-transparent"></div>
          </div>
          <div class="flex flex-1 flex-col gap-1 p-5 pt-3">
            <h3 class="text-lg font-semibold">{{ p.nombre }}</h3>
            <p class="font-mono text-xs uppercase tracking-[0.1em] text-glint">{{ p.rol }}</p>
            <p class="mt-2 text-sm text-mute">{{ p.detalle }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { EQUIPO } from '../data/content.js'
import foto1 from '../assets/team-1.webp'
import foto2 from '../assets/team-2.webp'
import foto3 from '../assets/team-3.webp'

const FOTOS = { 1: foto1, 2: foto2, 3: foto3 }
</script>
