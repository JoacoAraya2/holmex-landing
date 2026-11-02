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

        <div class="mt-10 border-t border-line/60 pt-6">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-mute">Contacto oficial</p>
          <a :href="'mailto:' + CONTACT_EMAIL" class="mt-2 inline-flex items-center gap-2.5 text-lg font-semibold text-ink transition-colors hover:text-glint">
            <svg class="shrink-0 text-glint" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="1.5" /><path d="M3 5.5l7 5.5 7-5.5" /></svg>
            {{ CONTACT_EMAIL }}
          </a>
          <p class="mt-1 text-sm text-mute">Cotizaciones, demostraciones y soporte a clientes.</p>
        </div>
      </div>

      <div class="sheet min-w-0 rounded-xl p-6 sm:p-8">
        <form v-if="!enviado" class="grid gap-5 sm:grid-cols-2" novalidate @submit.prevent="enviar">
          <p class="text-sm text-mute sm:col-span-2">Todos los datos de contacto son obligatorios.</p>
          <div class="sm:col-span-2">
            <label for="f-nombre" class="text-sm">Nombre del solicitante</label>
            <input id="f-nombre" v-model.trim="form.nombre" type="text" autocomplete="name" required class="field mt-2" placeholder="Nombre y apellido" v-bind="atributosError('nombre')" />
            <p v-if="errores.nombre" id="e-nombre" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.nombre }}</p>
          </div>
          <div class="sm:col-span-2">
            <label for="f-empresa" class="text-sm">Empresa / Faena contratista</label>
            <input id="f-empresa" v-model.trim="form.empresa" type="text" autocomplete="organization" required class="field mt-2" placeholder="Razón social o faena" v-bind="atributosError('empresa')" />
            <p v-if="errores.empresa" id="e-empresa" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.empresa }}</p>
          </div>
          <div>
            <label for="f-region" class="text-sm">Región de la operación</label>
            <select id="f-region" v-model="form.region" required class="field mt-2" v-bind="atributosError('region')">
              <option value="" disabled>Seleccione una región</option>
              <option v-for="r in REGIONES" :key="r" :value="r">{{ r }}</option>
            </select>
            <p v-if="errores.region" id="e-region" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.region }}</p>
          </div>
          <div>
            <label for="f-telefono" class="text-sm">Teléfono / WhatsApp</label>
            <input id="f-telefono" v-model.trim="form.telefono" type="tel" autocomplete="tel" required class="field num mt-2 font-mono" placeholder="+56 9 1234 5678" v-bind="atributosError('telefono')" />
            <p v-if="errores.telefono" id="e-telefono" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.telefono }}</p>
          </div>
          <div class="sm:col-span-2">
            <label for="f-correo" class="text-sm">Correo corporativo</label>
            <input id="f-correo" v-model.trim="form.correo" type="email" autocomplete="email" required class="field mt-2" placeholder="nombre@empresa.cl" v-bind="atributosError('correo')" />
            <p v-if="errores.correo" id="e-correo" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.correo }}</p>
          </div>
          <label for="f-insitu" class="flex items-start gap-3 rounded-md border border-line/70 bg-abyss-2 p-4 text-sm sm:col-span-2">
            <input id="f-insitu" v-model="form.insitu" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 accent-[#00d2ff]" />
            Solicito prueba de cálculo in situ para una labor subterránea
          </label>
          <label for="f-piloto" class="flex items-start gap-3 rounded-md border border-line/70 bg-abyss-2 p-4 text-sm sm:col-span-2">
            <input id="f-piloto" v-model="form.piloto" type="checkbox" class="mt-0.5 h-4 w-4 shrink-0 accent-[#00d2ff]" />
            Quiero postular al programa piloto
          </label>
          <div class="sm:col-span-2">
            <label for="f-privacidad" class="flex items-start gap-3 text-sm text-mute">
              <input id="f-privacidad" v-model="form.aceptaPrivacidad" type="checkbox" required class="mt-0.5 h-4 w-4 shrink-0 accent-[#00d2ff]" v-bind="atributosError('aceptaPrivacidad')" />
              <span>Acepto que HOLMEX use estos datos para responder mi solicitud, según la <a href="#/privacidad" class="text-glint underline underline-offset-2 hover:text-ink">Política de Privacidad</a>.</span>
            </label>
            <p v-if="errores.aceptaPrivacidad" id="e-aceptaPrivacidad" class="mt-1.5 text-sm text-[#fca5a5]">{{ errores.aceptaPrivacidad }}</p>
          </div>

          <button type="submit" class="btn-primary sm:col-span-2" :disabled="enviando">
            {{ enviando ? 'Enviando…' : 'Enviar solicitud' }}
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
            <a :href="enlaceCorreo" class="btn-primary">Abrir en mi correo</a>
            <button type="button" class="btn-ghost" @click="copiar">{{ copiado ? 'Copiado' : 'Copiar resumen' }}</button>
            <button type="button" class="btn-ghost" @click="enviado = false">Editar datos</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { REGIONES, CONTACT_EMAIL } from '../data/content.js'

// Formspree reenvía cada solicitud a contacto@holmex.cl. VITE_FORM_ENDPOINT permite cambiarlo sin tocar el código.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || 'https://formspree.io/f/xwllwodw'

const PASOS = [
  'Reunión técnica con jefatura de operaciones o planificación P&T.',
  'Cálculo en vivo de una frente con sus parámetros y litología.',
  'Propuesta de licencia anual por computador y plan de puesta en marcha.',
]

const form = reactive({ nombre: '', empresa: '', region: '', correo: '', telefono: '', insitu: true, piloto: false, aceptaPrivacidad: false })
// Mensaje por campo obligatorio; se muestra bajo el campo y se asocia a él para lectores de pantalla.
const errores = reactive({})
const CAMPOS = ['nombre', 'empresa', 'region', 'telefono', 'correo', 'aceptaPrivacidad']
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
    `Postula al programa piloto: ${form.piloto ? 'Sí' : 'No'}`,
  ].join('\n'),
)

// Abre el cliente de correo con el resumen listo para enviar (saltos de línea CRLF según RFC 6068).
const enlaceCorreo = computed(
  () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Solicitud de propuesta HOLMEX')}` +
    `&body=${encodeURIComponent(resumen.value.replace(/\n/g, '\r\n'))}`,
)

function validar(campo) {
  const valor = form[campo]
  switch (campo) {
    case 'nombre':
      return valor ? '' : 'Escriba su nombre y apellido.'
    case 'empresa':
      return valor ? '' : 'Indique la empresa o faena.'
    case 'region':
      return valor ? '' : 'Seleccione la región de la operación.'
    case 'telefono':
      return valor ? '' : 'Escriba un teléfono de contacto.'
    case 'correo':
      if (!valor) return 'Escriba su correo corporativo.'
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? '' : 'Use el formato nombre@empresa.cl.'
    case 'aceptaPrivacidad':
      return valor ? '' : 'Acepte la Política de Privacidad para enviar la solicitud.'
  }
  return ''
}

function atributosError(campo) {
  return {
    'aria-invalid': errores[campo] ? 'true' : undefined,
    'aria-describedby': errores[campo] ? 'e-' + campo : undefined,
  }
}

// Después de un intento de envío, los errores se actualizan mientras la persona corrige cada campo.
watch(form, () => {
  for (const campo of CAMPOS) if (errores[campo]) errores[campo] = validar(campo)
})

async function enviar() {
  for (const campo of CAMPOS) errores[campo] = validar(campo)
  const primero = CAMPOS.find((campo) => errores[campo])
  if (primero) {
    document.getElementById(primero === 'aceptaPrivacidad' ? 'f-privacidad' : 'f-' + primero)?.focus()
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
      // Formspree usa "email" como dirección de respuesta y "_subject" como asunto del correo.
      body: JSON.stringify({
        _subject: `Solicitud de propuesta HOLMEX · ${form.empresa}`,
        email: form.correo,
        Nombre: form.nombre,
        Empresa: form.empresa,
        Región: form.region,
        Teléfono: form.telefono,
        'Prueba in situ': form.insitu ? 'Sí' : 'No',
        'Programa piloto': form.piloto ? 'Sí' : 'No',
      }),
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
