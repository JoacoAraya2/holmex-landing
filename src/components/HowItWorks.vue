<template>
  <section id="como-funciona" class="bg-abyss">
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

      <div class="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div class="min-w-0">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-warn">Memoria técnica</p>
          <h3 class="display mt-3 text-2xl font-extrabold sm:text-3xl">El documento que respalda cada disparo</h3>
          <p class="mt-4 max-w-[52ch] text-mute">
            Por cada labor, HOLMEX genera una memoria con los parámetros de entrada, la distribución de tiros, el
            consumo estimado de explosivo, los planos 2D acotados, la vista 3D y el dossier geomecánico con el radio de
            daño. Es el respaldo técnico que la Administración puede presentar ante una fiscalización de Sernageomin.
          </p>
          <a href="#contacto" class="btn-primary mt-6">Solicitar una demostración</a>
        </div>

        <div class="min-w-0 rounded-xl border border-line/80 bg-panel/90">
          <p class="border-b border-line/60 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-glint">Requisitos del computador</p>
          <dl class="divide-y divide-line/50">
            <div v-for="[campo, valor] in REQUISITOS" :key="campo" class="grid gap-1 px-5 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt class="font-mono text-xs uppercase tracking-[0.08em] text-mute sm:pt-0.5">{{ campo }}</dt>
              <dd class="text-sm text-ink">{{ valor }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { COMO_FUNCIONA, REQUISITOS } from '../data/content.js'
</script>
