# Motor de la demo web

El núcleo de cálculo de Holmex-RS compilado a WebAssembly. Corre solo en el Worker de Cloudflare
(`worker/motor.wasm`); el navegador nunca lo descarga.

- `src/lib.rs`: recibe los parámetros permitidos en la demo, valida que estén dentro de las opciones
  del formulario y devuelve solo perfil, tiros (cara y fondo), conteo, largo de tiro y avance.
  No calcula el campo de energía ni Kuz-Ram, que la demo no muestra (eran el 90 % del tiempo).
- `core/`: copia del núcleo de Holmex-RS. **No se sube a GitHub** (está en `.gitignore`).
- La prueba `malla_igual_al_motor_completo` compara la malla de la demo con el motor completo en
  las 7.200 combinaciones de la demo.

Cuando cambie el núcleo en Holmex-RS, vuelva a generar el motor:

```powershell
.\motor\copiar-core.ps1 -HolmexRS "C:\ruta\a\Holmex-RS"
npm run build
npx wrangler deploy
```
