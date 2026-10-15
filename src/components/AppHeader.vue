<template>
  <header class="sticky z-40 border-b border-line/70 bg-abyss/85 backdrop-blur-md" :style="{ top: 'env(safe-area-inset-top, 0px)' }">
    <div class="gutter mx-auto flex max-w-7xl items-center justify-between gap-4 py-3">
      <a href="#inicio" class="flex shrink-0 items-center gap-3" aria-label="HOLMEX, ir al inicio">
        <img :src="logoMark" alt="" width="43" height="40" class="h-10 w-auto" />
        <span class="display text-2xl font-extrabold tracking-tight">HOLMEX</span>
      </a>

      <nav class="hidden items-center gap-1 rounded-full border border-line/60 bg-abyss-2/70 p-1 xl:flex" aria-label="Principal">
        <a
          v-for="item in NAV"
          :key="item.href"
          :href="item.href"
          class="relative rounded-full px-3.5 py-1.5 text-sm transition-colors"
          :class="activa === item.href ? 'bg-volt/20 text-ink shadow-[inset_0_0_0_1px_rgba(56,189,248,0.45)]' : 'text-mute hover:text-ink'"
          :aria-current="activa === item.href ? 'location' : undefined"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <a href="#contacto" class="btn-primary hidden py-2.5 text-sm sm:inline-flex">Agendar demostración</a>
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
          v-for="(item, i) in NAV"
          :key="item.href"
          :href="item.href"
          class="flex items-center gap-4 border-b border-line/40 py-3 last:border-0"
          :class="activa === item.href ? 'text-glint' : 'text-ink'"
          @click="open = false"
        >
          <span class="font-mono text-xs text-mute">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ item.label }}
        </a>
        <a href="#contacto" class="btn-primary my-3 sm:hidden" @click="open = false">Agendar demostración</a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import logoMark from '../assets/logo-mark.png'
import { NAV } from '../data/content.js'

const open = ref(false)

// Resalta en el menú la sección que se está viendo: la última cuyo inicio ya pasó el 40% de la pantalla.
const activa = ref('')

function calcularActiva() {
  const linea = window.innerHeight * 0.4
  let actual = ''
  for (const n of NAV) {
    const el = document.getElementById(n.href.slice(1))
    if (el && el.getBoundingClientRect().top <= linea) actual = n.href
  }
  activa.value = actual
}

function alCambiarHash() {
  setTimeout(calcularActiva, 50)
}

onMounted(() => {
  calcularActiva()
  window.addEventListener('scroll', calcularActiva, { passive: true })
  window.addEventListener('hashchange', alCambiarHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', calcularActiva)
  window.removeEventListener('hashchange', alCambiarHash)
})
</script>
