<template>
  <section id="ds132" class="blueprint border-y border-line/60">
    <div class="gutter mx-auto grid max-w-7xl gap-6 pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div class="min-w-0">
        <p class="eyebrow">Marco normativo</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">La ley pide fundamento técnico. HOLMEX lo deja por escrito.</h2>
      </div>
      <div class="min-w-0 lg:justify-self-end">
        <p class="max-w-[58ch] text-mute">
          El reglamento exige que la perforación y tronadura se rijan por procedimientos aprobados por la
          administración de la faena. No prescribe método de cálculo ni herramienta: la responsabilidad de
          fundamentar cada diseño recae en el ingeniero.
        </p>
        <p class="mt-4 max-w-[58ch] text-ink">
          HOLMEX entrega la memoria de cálculo estructurada, con la justificación matemática y geomecánica de cada
          disparo, para que la administración acredite el fundamento técnico de sus decisiones ante una fiscalización
          de Sernageomin.
        </p>
      </div>
    </div>

    <div class="gutter mx-auto max-w-7xl pb-20 pt-10">
      <div class="sheet overflow-hidden rounded-xl">
        <header class="border-b border-line/70 bg-volt/10 p-6 sm:p-8">
          <p class="eyebrow">DS N° 132 · Título XV · Pequeña minería (hasta 5.000 t/mes)</p>
          <h3 class="display mt-3 text-2xl font-extrabold sm:text-3xl">Lo que pide el reglamento y cómo lo apoya HOLMEX</h3>
          <p class="mt-3 max-w-[75ch] text-sm text-mute">
            Según el texto vigente del Decreto N° 1 de 2024, un Proyecto Minero debe describir la perforación y la
            tronadura de cada labor, y la faena debe guardar el registro de los diagramas de disparo que utiliza.
            HOLMEX calcula esos antecedentes; su presentación, firma y cumplimiento siguen a cargo del ingeniero
            proyectista y de la empresa.
          </p>
        </header>
        <div class="hidden grid-cols-[170px_1fr_1fr] gap-6 border-b border-line/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-mute md:grid sm:px-8">
          <span>Artículo</span>
          <span>Lo que exige</span>
          <span>Lo que entrega HOLMEX</span>
        </div>
        <dl class="divide-y divide-line/50">
          <div v-for="f in DS132_TITULO_XV" :key="f.articulo" class="grid gap-2 px-6 py-4 sm:px-8 md:grid-cols-[170px_1fr_1fr] md:gap-6">
            <dt class="font-mono text-xs text-glint md:pt-0.5">{{ f.articulo }}</dt>
            <dd class="text-sm text-mute">{{ f.exige }}</dd>
            <dd class="text-sm text-ink"><span class="font-mono text-xs uppercase tracking-[0.12em] text-h-caj md:hidden">HOLMEX · </span>{{ f.holmex }}</dd>
          </div>
        </dl>
        <p class="border-t border-line/70 px-6 py-4 font-mono text-xs text-mute sm:px-8">
          Alcance: HOLMEX no reemplaza la medición de vibraciones en terreno ni emite declaraciones de conformidad
          sobre umbrales de vibración.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { DS132_TITULO_XV } from '../data/content.js'
</script>
