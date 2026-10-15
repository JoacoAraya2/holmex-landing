<template>
  <footer class="border-t border-line/60 bg-abyss-2">
    <div class="gutter mx-auto flex max-w-7xl flex-col justify-between gap-3 py-6 text-xs text-mute sm:flex-row sm:items-center">
      <p>© {{ year }} {{ DOMINIO }}. Todos los derechos reservados.</p>
      <nav class="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal">
        <a v-for="d in DOCUMENTOS_LEGALES" :key="d.id" :href="'#/' + d.id" class="hover:text-ink">{{ d.titulo }}</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
import { DOMINIO } from '../data/content.js'
import { DOCUMENTOS_LEGALES } from '../data/legal.js'

const year = new Date().getFullYear()
</script>
