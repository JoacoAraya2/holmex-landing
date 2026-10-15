<template>
  <div class="min-w-0">
    <h1 class="display text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl xl:text-[4.4rem]">
      Con <span class="text-glint">HOLMEX</span> toda la minería puede
    </h1>

    <p class="mt-6 max-w-[60ch] text-lg" :class="sobreVideo ? 'text-ink/85' : 'text-mute'">
      HOLMEX automatiza el cálculo geométrico de frentes de avance en menos de 5 minutos. Reduce los
      sobrecostos por sobreexcavación, predice la fragmentación (P80) y trabaja directamente en interior mina,
      sin conectividad de red ni suscripciones en la nube.
    </p>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <a href="#contacto" class="btn-primary">
        Agendar Demostración en Faena
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
      </a>
      <a href="#ds132" class="btn-ghost">Ver Respaldo Normativo DS 132</a>
    </div>

    <dl class="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-line/60 pt-6 font-mono">
      <div>
        <dt class="text-[11px] uppercase tracking-widest text-mute">Antes</dt>
        <dd class="num mt-1 text-lg text-ink">55–120 min</dd>
      </div>
      <div>
        <dt class="text-[11px] uppercase tracking-widest text-mute">Con HOLMEX</dt>
        <dd class="num mt-1 text-lg text-glint">&lt; 5 min</dd>
      </div>
      <div>
        <dt class="text-[11px] uppercase tracking-widest text-mute">Red requerida</dt>
        <dd class="num mt-1 text-lg text-ink">Ninguna</dd>
      </div>
    </dl>
  </div>
</template>

<script setup>
// Texto, botones y cifras del banner principal (compartido por las variantes del hero).
defineProps({ sobreVideo: { type: Boolean, default: false } })
</script>
