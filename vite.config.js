import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // La vista 3D de la demo (Three.js) pesa ~570 kB y se descarga solo al abrirla.
  build: { chunkSizeWarningLimit: 650 },
})
