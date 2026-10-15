import { createApp } from 'vue'
import App from './App.vue'
// Tipografías alojadas en el propio sitio (sin solicitudes a Google Fonts).
import '@fontsource-variable/archivo/standard.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import './style.css'

createApp(App).mount('#app')
