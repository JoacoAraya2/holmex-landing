<template>
  <video
    v-for="(clip, i) in clips"
    :key="clip.src"
    :ref="(el) => (videos[i] = el)"
    class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
    :class="i === actual ? 'opacity-100' : 'opacity-0'"
    :src="clip.src"
    muted
    loop
    playsinline
    :preload="i === actual || i === siguiente ? 'auto' : 'none'"
    :aria-hidden="i !== actual"
    aria-label="Operación en un túnel de minería subterránea"
    @error="emit('error', clip.src)"
  ></video>
</template>

<script setup>
import { watch, onMounted } from 'vue'

// Pila de videos superpuestos: solo el clip activo se ve y se reproduce.
const props = defineProps({
  clips: { type: Array, required: true },
  actual: { type: Number, required: true },
  siguiente: { type: Number, required: true },
  sinMovimiento: { type: Boolean, default: false },
})
const emit = defineEmits(['error'])
const videos = []

function reproducirActual() {
  videos.length = props.clips.length
  videos.forEach((v, i) => {
    if (!v) return
    if (i === props.actual && !props.sinMovimiento) {
      v.currentTime = 0
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  })
}

watch(() => [props.actual, props.clips.length, props.sinMovimiento], reproducirActual, { flush: 'post' })
onMounted(reproducirActual)
</script>
