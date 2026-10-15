<template>
  <section class="blueprint border-b border-line/60">
    <div class="gutter mx-auto max-w-3xl py-14 md:py-20">
      <a href="#inicio" class="font-mono text-xs uppercase tracking-[0.14em] text-glint hover:text-ink">← Volver al inicio</a>
      <p class="eyebrow mt-8">{{ documento.etiqueta || 'Información legal' }}</p>
      <h1 class="display mt-3 text-3xl font-extrabold sm:text-5xl">{{ documento.titulo }}</h1>
      <p class="mt-3 font-mono text-xs text-mute">Última actualización: {{ ACTUALIZADO }}</p>

      <nav class="mt-6 flex flex-wrap gap-2" aria-label="Documentos">
        <a
          v-for="d in DOCUMENTOS_LEGALES"
          :key="d.id"
          :href="'#/' + d.id"
          class="rounded-md border px-3 py-1.5 text-sm transition-colors"
          :class="d.id === documento.id ? 'border-ion text-ink' : 'border-line text-mute hover:text-ink'"
          :aria-current="d.id === documento.id ? 'page' : undefined"
        >
          {{ d.titulo }}
        </a>
      </nav>

      <article class="sheet mt-8 rounded-xl p-6 sm:p-10">
        <p class="text-ink">{{ documento.intro }}</p>
        <section v-for="(s, i) in documento.secciones" :key="s.titulo" class="mt-8">
          <h2 class="text-lg font-semibold text-ink"><span v-if="documento.numerar">{{ i + 1 }}. </span>{{ s.titulo }}</h2>
          <p v-for="p in s.parrafos" :key="p" class="mt-3 text-mute">{{ p }}</p>
          <ul v-if="s.lista" class="mt-3 flex flex-col gap-2">
            <li v-for="item in s.lista" :key="item" class="flex gap-3 text-mute">
              <span class="mt-2.5 h-1 w-3 shrink-0 bg-ion/70" aria-hidden="true"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p v-if="s.cierre" class="mt-3 text-mute">{{ s.cierre }}</p>
        </section>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ACTUALIZADO, DOCUMENTOS_LEGALES } from '../data/legal.js'

defineProps({ documento: { type: Object, required: true } })
</script>
