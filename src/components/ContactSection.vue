<template>
  <section id="contacto" class="bg-abyss">
    <div class="gutter mx-auto grid max-w-7xl gap-12 py-20 lg:grid-cols-[0.85fr_1.15fr]">
      <div class="min-w-0">
        <p class="eyebrow">Cotización y demostración</p>
        <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Probemos HOLMEX en una de sus labores</h2>
        <p class="mt-4 max-w-[55ch] text-mute">
          Llevamos el software a su faena, calculamos una frente real con sus parámetros y le entregamos la propuesta
          comercial junto con la ficha técnica.
        </p>
        <ol class="mt-8 flex flex-col gap-4">
          <li v-for="(paso, i) in PASOS" :key="paso" class="flex gap-4">
            <span class="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ion/60 font-mono text-sm text-ion">{{ i + 1 }}</span>
            <span class="pt-1 text-ink">{{ paso }}</span>
          </li>
        </ol>
      </div>

      <div class="sheet min-w-0 rounded-xl p-6 sm:p-8">
        <form v-if="!enviado" class="grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="enviar">
          <div class="sm:col-span-2">
            <label for="f-nombre" class="text-sm">Nombre del solicitante</label>
            <input id="f-nombre" v-model.trim="form.nombre" type="text" autocomplete="name" class="field mt-2" placeholder="Nombre y apellido" />
          </div>
          <div class="sm:col-span-2">
            <label for="f-empresa" class="text-sm">Empresa / Faena contratista</label>
            <input id="f-empresa" v-model.trim="form.empresa" type="text" autocomplete="organization" class="field mt-2" placeholder="Razón social o faena" />
          </div>
          <div>
            <label for="f-region" class="text-sm">Región de la operación</label>
            <select id="f-region" v-model="form.region" class="field mt-2">
              <option value="" disabled>Seleccione una región</option>
              <option v-for="r in REGIONES" :key="r" :value="r">{{ r }}</option>
            </select>
          </div>
          <div>
            <label for="f-telefono" class="text-sm">Teléfono / WhatsApp</label>
            <input id="f-telefono" v-model.trim="form.telefono" type="tel" autocomplete="tel" class="field num mt-2 font-mono" placeholder="+56 9 1234 5678" />
          </div>
          <div class="sm:col-span-2">
            <label for="f-correo" class="text-sm">Correo corporativo</label>
            <input id="f-correo" v-model.trim="form.correo" type="email" autocomplete="email" class="field mt-2" placeholder="nombre@empresa.cl" />
          </div>
          <label for="f-insitu" class="flex items-start gap-3 rounded-md border border-line/70 bg-abyss-2 p-4 text-sm sm:col-span-2">
            <input id="f-insitu" v-model="form.insitu" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 accent-[#00d2ff]" />
            Solicito prueba de cálculo in situ para una labor subterránea
          </label>

          <p v-if="error" class="rounded-md border border-h-cor/50 bg-h-cor/10 px-4 py-3 text-sm text-ink sm:col-span-2" role="alert">{{ error }}</p>

          <button type="submit" class="btn-primary sm:col-span-2" :disabled="enviando">
            {{ enviando ? 'Enviando…' : 'Solicitar Propuesta y Ficha Técnica' }}
          </button>
        </form>

        <div v-else-if="enviado === 'remoto'" class="flex flex-col gap-3" role="status">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-h-caj">Solicitud recibida</p>
          <h3 class="text-2xl font-semibold">Gracias, {{ form.nombre.split(' ')[0] }}.</h3>
          <p class="text-mute">Le escribiremos a {{ form.correo }} para coordinar la demostración.</p>
        </div>

        <div v-else class="flex flex-col gap-4" role="status">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-glint">Solicitud preparada</p>
          <h3 class="text-2xl font-semibold">Envíe este resumen a {{ CONTACT_EMAIL }}</h3>
          <pre id="resumen-solicitud" class="overflow-x-auto whitespace-pre-wrap rounded-md border border-line/70 bg-abyss-2 p-4 font-mono text-[13px] text-ink">{{ resumen }}</pre>
          <div class="flex flex-wrap gap-3">
            <button type="button" class="btn-primary" @click="copiar">{{ copiado ? 'Copiado' : 'Copiar resumen' }}</button>
            <button type="button" class="btn-ghost" @click="enviado = false">Editar datos</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { REGIONES, CONTACT_EMAIL } from '../data/content.js'

// Endpoint opcional (Formspree, CRM, backend propio). Sin endpoint, el formulario prepara un resumen para copiar.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

const PASOS = [
  'Reunión técnica con jefatura de operaciones o planificación P&T.',
  'Cálculo en vivo de una frente con sus parámetros y litología.',
  'Propuesta de licencia perpetua por equipo y plan de puesta en marcha.',
]

const form = reactive({ nombre: '', empresa: '', region: '', correo: '', telefono: '', insitu: true })
const error = ref('')
const enviando = ref(false)
const enviado = ref(false)
const copiado = ref(false)

const resumen = computed(() =>
  [
    'Solicitud de propuesta HOLMEX',
    `Nombre: ${form.nombre}`,
    `Empresa / faena: ${form.empresa}`,
    `Región: ${form.region}`,
    `Correo: ${form.correo}`,
    `Teléfono: ${form.telefono}`,
    `Prueba de cálculo in situ: ${form.insitu ? 'Sí' : 'No'}`,
  ].join('\n'),
)

async function enviar() {
  error.value = ''
  if (!form.nombre || !form.empresa || !form.region || !form.correo || !form.telefono) {
    error.value = 'Complete todos los campos para preparar la propuesta.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.correo)) {
    error.value = 'Revise el correo corporativo: debe tener el formato nombre@empresa.cl.'
    return
  }
  if (!ENDPOINT) {
    enviado.value = 'local'
    return
  }
  enviando.value = true
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form }),
    })
    if (!res.ok) throw new Error(String(res.status))
    enviado.value = 'remoto'
  } catch (e) {
    enviado.value = 'local'
  } finally {
    enviando.value = false
  }
}

async function copiar() {
  try {
    await navigator.clipboard.writeText(resumen.value)
    copiado.value = true
  } catch (e) {
    const el = document.getElementById('resumen-solicitud')
    const sel = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(el)
    sel.removeAllRanges()
    sel.addRange(range)
  }
}
</script>
