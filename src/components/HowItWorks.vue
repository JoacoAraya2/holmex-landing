<template>
  <section id="como-funciona" class="blueprint border-y border-line/60">
    <div class="gutter mx-auto max-w-7xl py-20">
      <p class="eyebrow">Cómo funciona</p>
      <h2 class="display mt-3 max-w-3xl text-3xl font-extrabold sm:text-4xl">De los parámetros de la labor a la memoria técnica, en cuatro pasos</h2>

      <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(paso, i) in COMO_FUNCIONA" :key="paso.titulo" class="sheet relative min-w-0 rounded-xl p-6">
          <span class="num display text-4xl font-extrabold text-glint/90">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-3 text-lg font-semibold">{{ paso.titulo }}</h3>
          <p class="mt-2 text-sm text-mute">{{ paso.texto }}</p>
        </li>
      </ol>

      <div class="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div class="min-w-0">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-warn">Memoria técnica de ejemplo</p>
          <h3 class="display mt-3 text-2xl font-extrabold sm:text-3xl">El documento que respalda cada disparo</h3>
          <p class="mt-4 max-w-[52ch] text-mute">
            Estas son páginas de una memoria real generada por HOLMEX para una labor de 3,5 × 4 m con barra de 1,8 m.
            Es el respaldo técnico que la Administración puede presentar ante una fiscalización de Sernageomin.
          </p>
          <a href="#contacto" class="btn-primary mt-6">Solicitar la memoria completa</a>

          <div class="mt-10 rounded-xl border border-line/80 bg-panel/90">
            <p class="border-b border-line/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Requisitos del computador</p>
            <dl class="divide-y divide-line/50">
              <div v-for="[campo, valor] in REQUISITOS" :key="campo" class="grid gap-1 px-5 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt class="font-mono text-xs uppercase tracking-[0.08em] text-mute sm:pt-0.5">{{ campo }}</dt>
                <dd class="text-sm text-ink">{{ valor }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div class="grid min-w-0 grid-cols-2 gap-4">
          <button
            v-for="(pag, i) in MEMORIA_EJEMPLO"
            :key="pag.src"
            type="button"
            class="group min-w-0 text-left"
            :class="pag.ancho > pag.alto ? 'col-span-2' : ''"
            @click="abrir(i)"
          >
            <span class="block overflow-hidden rounded-lg border border-line/80 bg-white shadow-[0_24px_60px_-30px_rgba(0,210,255,0.35)] transition-transform group-hover:-translate-y-1">
              <img :src="pag.src" :alt="'Memoria técnica HOLMEX: ' + pag.titulo" :width="pag.ancho" :height="pag.alto" loading="lazy" class="block h-auto w-full" />
            </span>
            <span class="mt-2 block font-mono text-[11px] uppercase tracking-[0.12em] text-mute group-hover:text-ink">{{ pag.titulo }}</span>
          </button>
        </div>
      </div>
    </div>

    <dialog ref="visor" class="m-auto max-h-[92vh] max-w-[min(92vw,1100px)] overflow-auto rounded-xl bg-abyss p-0 backdrop:bg-abyss/85" @click.self="cerrar">
      <div v-if="seleccionada" class="relative">
        <button type="button" class="btn-ghost absolute right-3 top-3 px-3 py-1.5 text-sm" @click="cerrar">Cerrar</button>
        <img :src="seleccionada.src" :alt="'Memoria técnica HOLMEX: ' + seleccionada.titulo" :width="seleccionada.ancho" :height="seleccionada.alto" class="block h-auto w-full" />
      </div>
    </dialog>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { COMO_FUNCIONA, MEMORIA_EJEMPLO, REQUISITOS } from '../data/content.js'

const visor = ref(null)
const seleccionada = ref(null)

function abrir(i) {
  seleccionada.value = MEMORIA_EJEMPLO[i]
  visor.value.showModal()
}

function cerrar() {
  visor.value.close()
}
</script>
