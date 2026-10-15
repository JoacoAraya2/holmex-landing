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
        <p class="font-mono text-xs uppercase tracking-[0.14em] text-mute">Escuela sueca consolidada + Kuz-Ram</p>
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
  </section>
</template>

<script setup>
import { FUNDAMENTOS } from '../data/content.js'
</script>
