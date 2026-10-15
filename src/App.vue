<template>
  <AppHeader />
  <main>
    <LegalPage v-if="documentoLegal" :documento="documentoLegal" />
    <template v-else>
      <HeroSection />
      <ProofPoints />
      <ProblemSolution />
      <ProductShowcase />
      <HowItWorks />
      <SpatialSimulator />
      <RegulatoryFramework />
      <LicenseSection />
      <SupportSection />
      <TeamSection />
      <PilotSection />
      <FaqSection />
      <ContactSection />
    </template>
  </main>
  <AppFooter />
  <WhatsAppButton />
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from './components/AppHeader.vue'
import HeroSection from './components/HeroSection.vue'
import ProofPoints from './components/ProofPoints.vue'
import ProblemSolution from './components/ProblemSolution.vue'
import RegulatoryFramework from './components/RegulatoryFramework.vue'
import SpatialSimulator from './components/SpatialSimulator.vue'
import ProductShowcase from './components/ProductShowcase.vue'
import LicenseSection from './components/LicenseSection.vue'
import TeamSection from './components/TeamSection.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/AppFooter.vue'
import LegalPage from './components/LegalPage.vue'
import SupportSection from './components/SupportSection.vue'
import HowItWorks from './components/HowItWorks.vue'
import PilotSection from './components/PilotSection.vue'
import FaqSection from './components/FaqSection.vue'
import WhatsAppButton from './components/WhatsAppButton.vue'
import { DOCUMENTOS_LEGALES } from './data/legal.js'

// Las páginas legales se abren con #/privacidad y #/terminos; cualquier otro ancla vuelve a la landing.
const hash = ref(window.location.hash)
const documentoLegal = computed(() => DOCUMENTOS_LEGALES.find((d) => hash.value === '#/' + d.id))

async function alCambiarHash() {
  const veniaDeLegal = Boolean(documentoLegal.value)
  hash.value = window.location.hash
  await nextTick()
  if (documentoLegal.value) {
    window.scrollTo(0, 0)
  } else if (veniaDeLegal) {
    const destino = hash.value.length > 1 ? document.getElementById(hash.value.slice(1)) : null
    if (destino) requestAnimationFrame(() => destino.scrollIntoView({ behavior: 'instant' }))
    else window.scrollTo(0, 0)
  }
}

onMounted(() => window.addEventListener('hashchange', alCambiarHash))
onBeforeUnmount(() => window.removeEventListener('hashchange', alCambiarHash))
</script>
