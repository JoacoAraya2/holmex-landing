<template>
  <footer class="border-t border-line/60 bg-abyss-2">
    <div class="gutter mx-auto grid max-w-7xl gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
      <div class="min-w-0">
        <div class="flex items-center gap-3">
          <img :src="logoMark" alt="" width="35" height="32" class="h-8 w-auto" />
          <span class="display text-lg font-extrabold">HOLMEX</span>
        </div>
        <p class="mt-4 max-w-[48ch] text-sm text-mute">
          Software de diseño de mallas de perforación y tronadura para labores subterráneas de avance horizontal en
          Chile.
        </p>
      </div>
      <div class="min-w-0">
        <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Normativa</p>
        <p class="mt-3 text-sm text-mute">
          Decreto Supremo N° 132, Reglamento de Seguridad Minera (Ministerio de Minería). Fiscalización: Sernageomin.
        </p>
      </div>
      <div class="min-w-0">
        <p class="font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Soporte técnico</p>
        <p class="mt-3 select-all font-mono text-sm text-ink">{{ CONTACT_EMAIL }}</p>
        <p class="mt-1 text-sm text-mute">Lunes a viernes, 08:30–18:00 (hora de Chile)</p>
      </div>
    </div>
    <div class="gutter mx-auto max-w-7xl">
      <div class="flex flex-col justify-between gap-2 border-t border-line/50 py-6 text-xs text-mute sm:flex-row">
        <p>© {{ year }} HOLMEX. Todos los derechos reservados.</p>
        <p class="font-mono">Langefors–Kihlström · Holmberg–Persson · Kuz-Ram</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logoMark from '../assets/logo-mark.png'
import { CONTACT_EMAIL } from '../data/content.js'

const year = new Date().getFullYear()
</script>
