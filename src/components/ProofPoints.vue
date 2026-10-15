<template>
  <section aria-label="Indicadores clave" class="border-b border-line/60 bg-abyss">
    <div class="gutter mx-auto max-w-7xl">
      <ul class="grid divide-line/60 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x">
        <li v-for="p in PROOF_POINTS" :key="p.titulo" class="flex min-w-0 flex-col gap-2 border-b border-line/40 py-8 last:border-b-0 sm:px-6 lg:border-b-0 lg:first:pl-0">
          <span class="num display-condensed text-5xl font-bold text-ion">{{ p.cifra }}</span>
          <h2 class="text-base font-semibold text-ink">{{ p.titulo }}</h2>
          <p class="text-sm text-mute">{{ p.texto }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { PROOF_POINTS } from '../data/content.js'
</script>
