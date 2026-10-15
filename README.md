# HOLMEX · Landing page

Vue 3 (`<script setup>`) + Tailwind CSS v4 + Vite.

## Uso

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # sitio estático en dist/
```

## Estructura

- `src/App.vue` — orden de las secciones.
- `src/components/` — una sección por componente (el hero usa `HeroCopy.vue` y `VideoStack.vue`) .
- `src/data/content.js` — todos los textos comerciales, equipo, comparativa y correo de contacto.
- `src/data/legal.js` — Política de Privacidad, Términos de Uso y Metodologías.
- `src/style.css` — paleta "Deep Mining Blue" (`@theme`) y clases base.

## Videos del banner principal

El hero muestra un carrusel de clips a pantalla completa detrás del texto (silenciados, con fundido cada 7 s y un mensaje por clip). La lista está en
`HERO_VIDEOS` dentro de `src/data/content.js` y los archivos en `public/media/` (1080p, licencia Pexels).
Para sumar un clip, guárdelo en `public/media/` y agregue un objeto a la lista. Si ningún video carga,
el hero muestra una captura de la aplicación.

## Antes de publicar

1. Reemplazar `CONTACT_EMAIL` en `src/data/content.js` por el correo comercial real.
2. Opcional: copiar `.env.example` a `.env` y definir `VITE_FORM_ENDPOINT` (Formspree, CRM o backend) para que el formulario envíe las solicitudes. Sin endpoint, el formulario prepara un resumen para copiar.
3. Verificar que cada foto en `src/assets/team-*.webp` corresponda al nombre asignado en `EQUIPO`.

`scripts/build-preview.mjs` genera una versión de un solo archivo HTML (Vue por CDN) para vistas previas.
