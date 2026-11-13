<template>
  <div ref="contenedor" class="relative aspect-[4/3] w-full overflow-hidden bg-[#0a1124]" style="max-height: 70vh">
    <canvas ref="lienzo" class="block h-full w-full touch-none" :aria-label="`Vista 3D de la labor con ${resultado.conteo.total_cargados} tiros cargados`" role="img"></canvas>
    <p class="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-mono text-4xl font-bold text-white/[0.05] sm:text-6xl" style="transform: rotate(-20deg)">DEMO · {{ marca }}</p>
    <p class="pointer-events-none absolute bottom-2 left-3 font-mono text-[11px] text-mute">Arrastre para girar · rueda o pellizco para acercar</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { colorTiro } from './colores.js'

const props = defineProps({
  resultado: { type: Object, required: true },
  marca: { type: String, required: true },
})

const contenedor = ref(null)
const lienzo = ref(null)
let renderer, scene, camera, controls, observador, grupo, cuadro

function forma(perfil) {
  // Perfil en el plano XY, coordenadas del motor: piso en -alto/2, eje en x = 0.
  const rx = perfil.ancho_m / 2
  const ry = perfil.alto_boveda_m
  const yPiso = -perfil.alto_m / 2
  const ySpring = yPiso + perfil.alto_hastial_m
  const s = new THREE.Shape()
  s.moveTo(-rx, yPiso)
  s.lineTo(rx, yPiso)
  s.lineTo(rx, ySpring)
  const n = 32
  for (let i = 1; i <= n; i++) {
    const a = (i / n) * Math.PI
    s.lineTo(rx * Math.cos(a), ySpring + ry * Math.sin(a))
  }
  s.lineTo(-rx, yPiso)
  return s
}

function limpiar(objeto) {
  objeto.traverse((o) => {
    o.geometry?.dispose()
    if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose())
  })
}

function construir() {
  if (grupo) {
    scene.remove(grupo)
    limpiar(grupo)
  }
  grupo = new THREE.Group()
  const { perfil, tiros } = props.resultado
  const profundidad = Math.max(...tiros.map((t) => t.zf), 1)
  const largo = profundidad + 0.6

  // Macizo: el perfil extruido hacia adentro (z negativo en la escena).
  const geo = new THREE.ExtrudeGeometry(forma(perfil), { depth: largo, bevelEnabled: false, curveSegments: 32 })
  geo.translate(0, 0, -largo)
  grupo.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x5577c2, transparent: true, opacity: 0.1, side: THREE.DoubleSide, depthWrite: false })))
  grupo.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 })))

  // Contorno del frente, resaltado.
  const puntos = forma(perfil).getPoints(64).map((p) => new THREE.Vector3(p.x, p.y, 0.002))
  grupo.add(new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(puntos), new THREE.LineBasicMaterial({ color: 0xf8fafc })))

  // Tiros: de la cara (z = 0) al fondo.
  const cache = new Map()
  for (const t of tiros) {
    const desde = new THREE.Vector3(t.x, t.y, 0)
    const hasta = new THREE.Vector3(t.xf, t.yf, -t.zf)
    const largoTiro = desde.distanceTo(hasta)
    if (largoTiro < 1e-6) continue
    const clave = colorTiro(t, perfil.alto_m).relleno
    if (!cache.has(clave)) cache.set(clave, new THREE.MeshStandardMaterial({ color: t.tipo === 'alivio' || t.tipo === 'rainura' ? 0xe2e8f0 : clave, roughness: 0.5 }))
    const radio = t.tipo === 'alivio' ? Math.max(t.d / 2000, 0.02) : 0.025
    const cil = new THREE.Mesh(new THREE.CylinderGeometry(radio, radio, largoTiro, 12, 1), cache.get(clave))
    cil.position.copy(desde).add(hasta).multiplyScalar(0.5)
    cil.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hasta.clone().sub(desde).normalize())
    grupo.add(cil)
  }

  // Piso de referencia con grilla de 0,5 m.
  const lado = Math.ceil(Math.max(perfil.ancho_m + 2, largo + 1))
  const grilla = new THREE.GridHelper(lado, lado * 2, 0x1e3a8a, 0x162447)
  grilla.position.set(0, -perfil.alto_m / 2 - 0.001, -largo / 2)
  grupo.add(grilla)

  scene.add(grupo)

  // Cámara en diagonal frente al disparo.
  const d = Math.max(perfil.ancho_m, perfil.alto_m)
  camera.position.set(d * 0.95, d * 0.35, d * 1.25)
  controls.target.set(0, 0, -largo * 0.35)
  controls.update()
}

function ajustarTamano() {
  const { clientWidth: w, clientHeight: h } = contenedor.value
  if (!w || !h) return
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

function animar() {
  cuadro = requestAnimationFrame(animar)
  controls.update()
  renderer.render(scene, camera)
}

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ canvas: lienzo.value, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0a1124)
  camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.05, 100)
  scene.add(new THREE.AmbientLight(0xffffff, 0.75))
  const luz = new THREE.DirectionalLight(0xffffff, 1.4)
  luz.position.set(3, 5, 6)
  scene.add(luz)
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.minDistance = 1
  controls.maxDistance = 25
  observador = new ResizeObserver(ajustarTamano)
  observador.observe(contenedor.value)
  ajustarTamano()
  construir()
  animar()
})

watch(() => props.resultado, construir)

onBeforeUnmount(() => {
  cancelAnimationFrame(cuadro)
  observador?.disconnect()
  controls?.dispose()
  if (grupo) limpiar(grupo)
  renderer?.dispose()
})
</script>
