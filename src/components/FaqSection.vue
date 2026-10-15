<template>
  <section id="preguntas" class="blueprint border-y border-line/60">
    <div class="gutter mx-auto grid max-w-7xl gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div class="min-w-0 lg:sticky lg:top-28">
        <p class="eyebrow">Preguntas frecuentes</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Lo que nos preguntan antes de comprar</h2>
        <p class="mt-4 max-w-[48ch] text-mute">
          ¿Tiene otra duda? Escríbanos y se la respondemos con un ejemplo calculado para su labor.
        </p>
        <a href="#contacto" class="btn-ghost mt-6">Hacer una consulta</a>
      </div>

      <div class="flex min-w-0 flex-col gap-3">
        <details
          v-for="(item, i) in FAQ"
          :key="item.pregunta"
          class="group rounded-xl border border-line/80 bg-panel/90 transition-colors open:border-line-hi"
          :open="i === 0"
        >
          <summary class="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-ink [&::-webkit-details-marker]:hidden">
            <span class="font-semibold">{{ item.pregunta }}</span>
            <svg class="mt-1 shrink-0 text-glint transition-transform group-open:rotate-45" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 2v12M2 8h12" /></svg>
          </summary>
          <p class="px-5 pb-5 text-mute">{{ item.respuesta }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { FAQ } from '../data/content.js'

// Datos estructurados FAQPage para que Google pueda mostrar las preguntas en los resultados.
let datosEstructurados = null

onMounted(() => {
  datosEstructurados = document.createElement('script')
  datosEstructurados.type = 'application/ld+json'
  datosEstructurados.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: f.respuesta },
    })),
  })
  document.head.appendChild(datosEstructurados)
})

onBeforeUnmount(() => datosEstructurados?.remove())
</script>
