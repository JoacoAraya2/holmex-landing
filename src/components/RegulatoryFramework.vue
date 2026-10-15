<template>
  <section id="ds132" class="blueprint border-y border-line/60">
    <div class="gutter mx-auto grid max-w-7xl gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="min-w-0">
        <p class="eyebrow">Marco normativo y fundamentos de ingeniería</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">La ley pide fundamento técnico. HOLMEX lo deja por escrito.</h2>

        <article class="sheet mt-8 rounded-xl p-6">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-warn">DS N° 132 · Reglamento de Seguridad Minera · Art. 570</p>
          <blockquote class="mt-4 border-l-2 border-ion pl-4 text-ink">
            Cuando los efectos de una tronadura puedan afectar instalaciones, estructuras o poblados cercanos, deben ser
            medidos y fundados en parámetros técnicos, y la empresa debe adoptar medidas de control para minimizarlos.
          </blockquote>
          <p class="mt-5 text-mute">
            El reglamento además exige que la perforación y tronadura se rijan por procedimientos aprobados por la
            administración de la faena. No prescribe método de cálculo ni herramienta: la responsabilidad de
            fundamentar cada diseño recae en el ingeniero.
          </p>
          <p class="mt-4 text-ink">
            HOLMEX entrega la memoria de cálculo estructurada, con la justificación matemática y geomecánica de cada
            disparo, para que la administración acredite el fundamento técnico de sus decisiones ante una fiscalización
            de Sernageomin.
          </p>
          <p class="mt-5 border-t border-line/60 pt-4 font-mono text-xs text-mute">
            Alcance: HOLMEX no reemplaza la medición de vibraciones en terreno ni emite declaraciones de conformidad
            sobre umbrales de vibración.
          </p>
        </article>
      </div>

      <div class="min-w-0">
        <p class="font-mono text-xs uppercase tracking-[0.14em] text-mute">Escuela sueca de tronadura y geomecánica</p>
        <div class="mt-4 grid gap-4 sm:grid-cols-2">
          <article v-for="f in FUNDAMENTOS" :key="f.titulo" class="flex min-w-0 flex-col rounded-xl border border-line/80 bg-panel/90 p-5">
            <p class="font-mono text-[11px] uppercase tracking-[0.12em] text-glint">{{ f.codigo }}</p>
            <h3 class="mt-2 text-lg font-semibold">{{ f.titulo }}</h3>
            <p class="mt-2 flex-1 text-sm text-mute">{{ f.texto }}</p>
            <code class="mt-4 block overflow-x-auto whitespace-nowrap rounded border border-line/70 bg-abyss px-3 py-2 font-mono text-[13px] text-ion">{{ f.formula }}</code>
          </article>
        </div>
        <p class="mt-5 text-sm text-mute">
          Cada constante del núcleo de cálculo remite a su obra y página. Las que no tienen respaldo bibliográfico se
          declaran como heurísticas, en el código y en la documentación técnica.
        </p>
      </div>
    </div>

    <div class="gutter mx-auto max-w-7xl pb-20">
      <div class="sheet overflow-hidden rounded-xl">
        <header class="border-b border-line/70 bg-volt/10 p-6 sm:p-8">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-warn">DS N° 132 · Título XV · Pequeña minería (hasta 5.000 t/mes)</p>
          <h3 class="display mt-3 text-2xl font-extrabold sm:text-3xl">Lo que pide el reglamento y cómo lo apoya HOLMEX</h3>
          <p class="mt-3 max-w-[75ch] text-sm text-mute">
            Según el texto vigente del Decreto N° 1 de 2024, un Proyecto Minero debe describir la perforación y la
            tronadura de cada labor, y la faena debe guardar el registro de los diagramas de disparo que utiliza.
            HOLMEX calcula esos antecedentes; su presentación, firma y cumplimiento siguen a cargo del ingeniero
            proyectista y de la empresa.
          </p>
        </header>
        <div class="hidden grid-cols-[170px_1fr_1fr] gap-6 border-b border-line/60 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-mute md:grid sm:px-8">
          <span>Artículo</span>
          <span>Lo que exige</span>
          <span>Lo que entrega HOLMEX</span>
        </div>
        <dl class="divide-y divide-line/50">
          <div v-for="f in DS132_TITULO_XV" :key="f.articulo" class="grid gap-2 px-6 py-4 sm:px-8 md:grid-cols-[170px_1fr_1fr] md:gap-6">
            <dt class="font-mono text-xs text-glint md:pt-0.5">{{ f.articulo }}</dt>
            <dd class="text-sm text-mute">{{ f.exige }}</dd>
            <dd class="text-sm text-ink"><span class="font-mono text-[11px] uppercase tracking-[0.12em] text-h-caj md:hidden">HOLMEX · </span>{{ f.holmex }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup>
import { FUNDAMENTOS, DS132_TITULO_XV } from '../data/content.js'
</script>
