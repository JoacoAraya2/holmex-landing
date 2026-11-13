<template>
  <section id="demo" class="bg-abyss-2">
    <div class="gutter mx-auto max-w-7xl py-20">
      <!-- Con sesión: la demo completa (se descarga recién al ingresar, para que la landing siga liviana) -->
      <template v-if="sesion">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <div class="min-w-0">
            <p class="eyebrow">Demo web · acceso privado</p>
            <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Calcule una malla con HOLMEX</h2>
          </div>
          <div class="flex items-center gap-3 text-sm">
            <span class="text-mute">
              Cuenta <span class="font-mono text-ink">{{ sesion.usuario }}</span> · vigente hasta el {{ fechaLegible(sesion.vence) }}
            </span>
            <button type="button" class="btn-ghost py-2 text-sm" @click="salir">Salir</button>
          </div>
        </div>
        <DemoApp class="mt-8" :usuario="sesion.usuario" @sesion-terminada="sesionTerminada" />
      </template>

      <!-- Sin sesión: qué incluye la demo y el ingreso -->
      <div v-else class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div class="min-w-0">
          <p class="eyebrow">Demo web · acceso privado</p>
          <h2 class="display mt-3 text-3xl font-extrabold sm:text-4xl">Pruebe el motor de HOLMEX desde el navegador</h2>
          <p class="mt-4 max-w-[56ch] text-mute">
            Para empresas mineras invitadas. Ingrese los parámetros de su labor y vea la malla en 2D y 3D, calculada en
            nuestro servidor con el mismo motor del software. El acceso dura {{ DEMO.duracion }} y no tiene costo.
          </p>
          <ul class="mt-8 flex flex-col gap-3">
            <li v-for="item in DEMO.incluye" :key="item" class="flex gap-3 text-ink">
              <svg class="mt-1 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#38bdf8" stroke-width="2" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" /></svg>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="mt-8 border-t border-line/60 pt-5 text-sm text-mute">
            ¿Su empresa quiere un acceso? Escríbanos desde el
            <a href="#contacto" class="text-glint underline-offset-4 hover:underline">formulario de contacto</a>
            o postule al <a href="#piloto" class="text-glint underline-offset-4 hover:underline">programa piloto</a>.
          </p>
        </div>

        <form class="sheet min-w-0 rounded-xl p-6 sm:p-8" novalidate @submit.prevent="ingresar">
          <p class="font-mono text-xs uppercase tracking-[0.14em] text-glint">Ingreso a la demo</p>
          <div class="mt-5">
            <label for="demo-usuario" class="text-sm">Usuario</label>
            <input id="demo-usuario" v-model.trim="usuario" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required class="field mt-2" placeholder="Usuario entregado por HOLMEX" />
          </div>
          <div class="mt-4">
            <label for="demo-clave" class="text-sm">Contraseña</label>
            <input id="demo-clave" v-model="clave" type="password" autocomplete="current-password" required class="field mt-2" />
          </div>
          <label class="mt-5 flex gap-3 text-sm text-mute">
            <input v-model="acepta" type="checkbox" class="mt-1 h-4 w-4 shrink-0 accent-[#00d2ff]" />
            <span>
              Acepto usar la demo solo para evaluar HOLMEX y no compartir mi acceso ni los resultados fuera de mi empresa
              (<a href="#/terminos" class="text-glint underline-offset-4 hover:underline">términos</a>).
            </span>
          </label>
          <p v-if="error" class="mt-4 text-sm text-[#fca5a5]" role="alert">{{ error }}</p>
          <button type="submit" class="btn-primary mt-6 w-full" :disabled="enviando">
            {{ enviando ? 'Ingresando…' : 'Ingresar a la demo' }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { DEMO } from '../data/content.js'

const DemoApp = defineAsyncComponent(() => import('./demo/DemoApp.vue'))

const sesion = ref(null)
const usuario = ref('')
const clave = ref('')
const acepta = ref(false)
const error = ref('')
const enviando = ref(false)

function fechaLegible(iso) {
  if (!iso) return ''
  const [a, m, d] = iso.split('-')
  return `${d}-${m}-${a}`
}

async function ingresar() {
  error.value = ''
  if (!usuario.value || !clave.value) {
    error.value = 'Ingrese su usuario y contraseña.'
    return
  }
  if (!acepta.value) {
    error.value = 'Debe aceptar las condiciones de uso de la demo.'
    return
  }
  enviando.value = true
  try {
    const r = await fetch('/api/demo/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario.value, clave: clave.value }),
    })
    const datos = await r.json().catch(() => ({}))
    if (!r.ok || !datos.ok) {
      error.value = datos.error || 'No se pudo ingresar. Intente de nuevo.'
      return
    }
    clave.value = ''
    sesion.value = datos
  } catch {
    error.value = 'Sin conexión con el servidor. Revise su internet e intente de nuevo.'
  } finally {
    enviando.value = false
  }
}

async function salir() {
  await fetch('/api/demo/logout', { method: 'POST' }).catch(() => {})
  sesion.value = null
}

function sesionTerminada(mensaje) {
  sesion.value = null
  error.value = mensaje || 'Su sesión terminó. Vuelva a ingresar.'
}

// Si ya había una sesión abierta en este navegador, se retoma sin pedir la contraseña.
onMounted(async () => {
  try {
    const r = await fetch('/api/demo/sesion', { headers: { Accept: 'application/json' } })
    if (r.ok) {
      const datos = await r.json()
      if (datos.ok) sesion.value = datos
    }
  } catch {
    /* sin sesión */
  }
})
</script>
