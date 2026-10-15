<template>
  <header class="sticky z-40 border-b border-line/70 bg-abyss/85 backdrop-blur-md" :style="{ top: 'env(safe-area-inset-top, 0px)' }">
    <div class="gutter mx-auto flex max-w-7xl items-center justify-between gap-4 py-3">
      <a href="#inicio" class="flex items-center gap-3" aria-label="HOLMEX, ir al inicio">
        <img :src="logoMark" alt="" width="43" height="40" class="h-10 w-auto" />
        <span class="display text-2xl font-extrabold tracking-tight">HOLMEX</span>
      </a>

      <nav class="hidden items-center gap-6 xl:flex" aria-label="Principal">
        <a v-for="item in NAV" :key="item.href" :href="item.href" class="text-sm text-mute transition-colors hover:text-ink">
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <a href="#contacto" class="btn-primary hidden py-2.5 text-sm sm:inline-flex">Solicitar Demostración Comercial</a>
        <button
          id="menu-toggle"
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink xl:hidden"
          :aria-expanded="open"
          aria-controls="menu-movil"
          @click="open = !open"
        >
          <span class="sr-only">Abrir menú</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
            <path v-if="!open" d="M3 6h14M3 10h14M3 14h14" />
            <path v-else d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>

    <nav v-show="open" id="menu-movil" class="gutter border-t border-line/70 bg-abyss xl:hidden" aria-label="Móvil">
      <div class="mx-auto flex max-w-7xl flex-col py-2">
        <a
          v-for="item in NAV"
          :key="item.href"
          :href="item.href"
          class="border-b border-line/40 py-3 text-ink last:border-0"
          @click="open = false"
        >{{ item.label }}</a>
        <a href="#contacto" class="btn-primary my-3 sm:hidden" @click="open = false">Solicitar Demostración Comercial</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import logoMark from '../assets/logo-mark.png'
import { NAV } from '../data/content.js'

const open = ref(false)
</script>
