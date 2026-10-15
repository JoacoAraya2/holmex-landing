// Contenido comercial de la landing. Editar aquí sin tocar componentes.

export const NAV = [
  { href: '#solucion', label: 'Solución' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#simulador', label: 'Simulador' },
  { href: '#ds132', label: 'DS 132' },
  { href: '#licencia', label: 'Precio' },
  { href: '#piloto', label: 'Piloto' },
  { href: '#preguntas', label: 'Preguntas' },
]

// Dominio oficial del sitio (registro en NIC Chile).
export const DOMINIO = 'holmex.cl'

// Reemplazar por el correo comercial real antes de publicar el sitio.
export const CONTACT_EMAIL = 'contacto@holmex.cl'

export const PROOF_POINTS = [
  {
    cifra: '>96%',
    titulo: 'Reducción en tiempo de planificación',
    texto: 'De 55–120 minutos de cálculo manual por disparo a menos de 2 minutos automatizados.',
  },
  {
    cifra: '0 red',
    titulo: '100% autónomo (air-gapped)',
    texto: 'Funciona en frentes ciegas sin señal celular, enlace satelital ni conexión a internet.',
  },
  {
    cifra: '1×',
    titulo: 'Licencia perpetua por equipo',
    texto: 'Sin llaves USB físicas de alto costo ni cobros mensuales sorpresivos.',
  },
  {
    cifra: '13/13',
    titulo: 'Trazabilidad total de parámetros',
    texto: 'Cada constante del cálculo tiene procedencia declarada: fuente, página o heurística identificada.',
  },
]

export const PROBLEMA = [
  'Estimaciones por tanteo o planillas Excel con fórmulas desarticuladas y errores de tipeo y redondeo.',
  'Jumbo detenido en la frente mientras se calcula el diagrama de disparo.',
  'Dosificación que no se ajusta al macizo: sobreconsumo de explosivo y sobreexcavación (overbreak).',
  'Instrucciones verbales o tablas sueltas en papel; errores de emboquillado y paralelismo.',
  'Sin memoria técnica auditable que respalde a la administración ante una fiscalización.',
]

export const SOLUCION = [
  'Cálculo analítico determinista de toda la malla: rainura, auxiliares, cajas, corona y zapateras.',
  'Diseño listo en menos de 2 minutos, con la sección dibujada a escala antes de perforar.',
  'Carga ajustada por RMR y litología, con control de energía en el contorno para proteger techo y cajas.',
  'Guía limpia para el perforista con coordenadas, profundidad y secuencia de salida.',
  'Expediente operacional inmediato en PDF, DXF y CSV con la procedencia de cada parámetro.',
]

export const FUNDAMENTOS = [
  {
    codigo: 'Langefors & Kihlström · 1978',
    titulo: 'Burden máximo y balance de carga',
    texto:
      'Constante de roca, grado de fijación y relación espaciamiento-burden para dimensionar el burden de cada zona del frente.',
    formula: 'B_máx = (d/33)·√(P·s / (c̄·f·E/B))',
  },
  {
    codigo: 'Holmberg & Persson · 1978',
    titulo: 'Contorno perimetral y daño inducido',
    texto:
      'Espaciamiento de corona de 15–16 veces el diámetro y relación E/B de 0,8 en voladura suave. Predicción del radio de daño para reducir pernos, shotcrete y marcos.',
    formula: 'E_corona = 15·d   ·   E/B = 0,8',
  },
  {
    codigo: 'Kuz-Ram · Cunningham 1983',
    titulo: 'Fragmentación y P80',
    texto:
      'Tamaño medio, índice de uniformidad y P80 proyectado para evitar bolones sobre-tamaño, tronadura secundaria y atascos en chancado.',
    formula: 'X₅₀ = A·K⁻⁰·⁸·Q¹ᐟ⁶·(115/E)¹⁹ᐟ³⁰',
  },
  {
    codigo: 'Bieniawski RMR · Barton Q',
    titulo: 'Caracterización del macizo',
    texto:
      'La calidad geomecánica del frente modula la constante de roca y la dosificación. Conversión RMR–Q incluida.',
    formula: 'RMR → Q de Barton',
  },
]

// Carrusel de videos del banner principal (archivos en public/media/, 1080p).
// Todos los clips son de Pexels bajo la licencia Pexels (uso comercial libre, crédito no obligatorio):
// https://www.pexels.com/license/
// Para agregar otro clip basta con sumar un objeto a esta lista.
export const HERO_VIDEOS = [
  {
    src: '/media/hero-mineria-1080.mp4',
    etiqueta: 'Frente de avance',
    titulo: 'Geometría del frente calculada en menos de 2 minutos',
    dato: '< 2 min',
    datoDetalle: 'Diseño del diagrama de disparo',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/underground-tunnel-construction-with-heavy-machinery-31752064/
  },
  {
    src: '/media/tunel-excavadora.mp4',
    etiqueta: 'Sobreexcavación',
    titulo: 'Menos sobrecostos por sobreexcavación en cada disparo',
    dato: 'Contorno',
    datoDetalle: 'Control de sobreexcavación',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/excavator-operating-in-tunnel-construction-site-31752063/
  },
  {
    src: '/media/tunel-maquinaria.mp4',
    etiqueta: 'Fragmentación P80',
    titulo: 'Predicción de fragmentación antes de tronar',
    dato: 'P80',
    datoDetalle: 'Fragmentación estimada',
    // Autor: Dominik Zítka
    // https://www.pexels.com/video/heavy-construction-equipment-in-underground-tunnel-31752065/
  },
  {
    src: '/media/tunel-cuadrilla.mp4',
    etiqueta: 'Interior mina',
    titulo: 'Funciona sin red ni nube, directo en la labor',
    dato: '0 red',
    datoDetalle: 'Opera 100% sin conexión',
    // Autor: Sururi Ballıdağ
    // https://www.pexels.com/video/construction-workers-are-working-on-a-tunnel-16035050/
  },
]

export const LICENCIA = {
  precio: 'USD 2.000',
  impuesto: '+ IVA',
  modalidad: 'Licencia perpetua por equipo',
  atributos: [
    { criterio: 'Modelo de cobro', valor: 'Pago único por equipo. Sin llaves USB físicas ni mensualidades.' },
    { criterio: 'Requisitos de red', valor: '100% offline nativo, también en interior mina.' },
    { criterio: 'Capacitación', valor: 'Adopción operacional en menos de 3 horas.' },
    { criterio: 'Entregables a terreno', valor: 'Guías directas en PDF, DXF y CSV para el perforista.' },
    { criterio: 'Trazabilidad de fórmulas', valor: 'Cada constante con obra y página, o marcada como heurística.' },
  ],
  incluye: [
    'Instalación y puesta en marcha en el computador de faena',
    'Capacitación inicial para el equipo de P&T',
    'Prueba de cálculo en una labor real',
  ],
}

export const CAPTURAS = [
  {
    id: 'inicio',
    titulo: 'Panel de inicio',
    texto: 'Historial local de cálculos y estadísticas por mes. Todo queda en el equipo, en una base SQLite.',
  },
  {
    id: 'parametros',
    titulo: 'Parámetros de la labor',
    texto: 'Sección, barra, diámetros, precio del ANFO y caracterización geomecánica RMR, Q y GSI con presets de terreno.',
  },
  {
    id: 'malla',
    titulo: 'Malla generada',
    texto: 'Sección dibujada a escala con rainura de cuatro cuadrantes, zapateras, corona, cajas y auxiliares.',
  },
]

export const FICHA = [
  ['Plataforma', 'Windows · ejecutable de ~12 MB'],
  ['Núcleo de cálculo', 'Rust'],
  ['Interfaz', 'Vue 3 sobre Tauri v2'],
  ['Persistencia', 'SQLite local'],
  ['Inicio de la aplicación', '1,42 s (mediana)'],
  ['Exportación DXF', '0,3 ms'],
  ['Cobertura de pruebas del núcleo', '87,5%'],
  ['Telemetría', 'Ninguna'],
]

export const EQUIPO = [
  {
    nombre: 'Vicente Gago Salazar',
    rol: 'Dirección de Producto y Arquitectura',
    detalle: 'Arquitectura de software, visualizador 2D y relación técnica con faenas.',
    foto: 1,
  },
  {
    nombre: 'Vicente Gómez Hidalgo',
    rol: 'Motor de Cálculo y Datos',
    detalle: 'Implementación del motor analítico Holmberg, base de datos local y repositorio.',
    foto: 3,
  },
  {
    nombre: 'Joaquín Araya López',
    rol: 'Calidad y Exportación Técnica',
    detalle: 'Subsistema de exportación PDF/DXF/CSV y plan de pruebas bajo ISO/IEC 25010.',
    foto: 2,
  },
]

export const REGIONES = ['Antofagasta', 'Atacama', 'Coquimbo', 'Valparaíso', 'Metropolitana', "O'Higgins", 'Otra región']

// Número de WhatsApp comercial en formato internacional sin "+" ni espacios (ej. '56912345678').
// Mientras esté vacío, el botón flotante de WhatsApp no se muestra.
export const WHATSAPP = ''

// Preguntas frecuentes (sección y datos estructurados para Google).
export const FAQ = [
  {
    pregunta: '¿HOLMEX reemplaza al ingeniero de perforación y tronadura?',
    respuesta:
      'No. HOLMEX automatiza el cálculo y deja la memoria técnica por escrito, pero el diseño lo revisa, aprueba y firma el profesional de la faena, como exige el DS N° 132 (artículo 33). El software le ahorra horas de cálculo manual para que dedique ese tiempo a revisar y decidir.',
  },
  {
    pregunta: '¿Qué método de cálculo usa?',
    respuesta:
      'El método de Roger Holmberg para frentes de avance, con rainura de cuatro cuadrantes en torno a un tiro de alivio, apoyado en Langefors–Kihlström, Holmberg–Persson y Kuz-Ram. Incluye evaluación geomecánica RMR (Bieniawski 1989), índice Q de Barton y GSI, y estima el radio de daño y una recomendación de soporte.',
  },
  {
    pregunta: '¿Funciona sin internet en interior mina?',
    respuesta:
      'Sí. Es una aplicación de escritorio 100% offline. Los cálculos se guardan en una base de datos local del propio equipo y el software no envía telemetría ni datos de su faena a HOLMEX.',
  },
  {
    pregunta: '¿En qué formatos entrega los resultados?',
    respuesta:
      'Exporta la malla y la memoria de cálculo en PDF, PNG, Excel y CSV, con las coordenadas de cada tiro, y en formato IREDES para cargar el diseño en jumbos compatibles con ese estándar. También importa datos MWD de la perforadora para control de calidad (QA/QC) de lo perforado.',
  },
  {
    pregunta: '¿Qué computador necesito?',
    respuesta:
      'Recomendamos Windows 11 de 64 bits, que sigue recibiendo actualizaciones de seguridad. Como HOLMEX está hecho en Rust con Tauri, usa pocos recursos: basta un notebook de faena con 4 GB de RAM (8 GB recomendado). También funciona en Windows 10, aunque Microsoft dejó de darle soporte de seguridad en octubre de 2025.',
  },
  {
    pregunta: '¿Qué pasa si cambio o se daña el computador?',
    respuesta:
      'La licencia es por equipo. Si necesita moverla a un computador nuevo, la traspasamos desactivando la instalación anterior. Este servicio tiene un costo adicional.',
  },
  {
    pregunta: '¿Cuánto toma aprender a usarlo?',
    respuesta:
      'La capacitación inicial dura menos de 3 horas y está incluida en la licencia, junto con la instalación y una prueba de cálculo en una labor real.',
  },
  {
    pregunta: '¿Cuánto cuesta?',
    respuesta:
      'USD 2.000 + IVA por equipo, en un solo pago y facturado en pesos chilenos, sin mensualidades ni llaves USB. Incluye la instalación inicial y la capacitación inicial. Los viáticos, actualizaciones, mantenciones y servicios adicionales se cotizan aparte.',
  },
]

// Qué incluye la licencia y qué servicios se cobran aparte. Revisar cada compromiso antes de publicar.
export const SOPORTE = {
  incluido: [
    { titulo: 'Licencia perpetua', texto: 'El ejecutable de HOLMEX instalado en un equipo, sin mensualidades ni fecha de término.' },
    { titulo: 'Puesta en marcha inicial', texto: 'Instalación en su computador de faena y validación de un cálculo con una labor real.' },
    { titulo: 'Capacitación inicial', texto: 'Una capacitación para el equipo de P&T al momento de la instalación.' },
    { titulo: 'Soporte por correo gratuito', texto: 'Consultas sobre el uso del software por correo, totalmente gratis y sin costo adicional, de lunes a viernes de 08:30 a 18:00 (hora de Chile).' },
    { titulo: 'Garantía de cálculo', texto: 'Si detecta un error en el motor de cálculo de su versión, lo corregimos sin costo.' },
  ],
  adicional: [
    { titulo: 'Viáticos y traslados', texto: 'Pasajes, alojamiento, alimentación y traslado a faena para cualquier visita en terreno.' },
    { titulo: 'Actualizaciones', texto: 'Nuevas versiones y funciones posteriores a la versión adquirida.' },
    { titulo: 'Mantenciones y visitas técnicas', texto: 'Revisiones, reinstalaciones o asistencia presencial que solicite la faena.' },
    { titulo: 'Capacitaciones adicionales', texto: 'Para nuevos turnos o personal que se incorpore después de la capacitación inicial.' },
    { titulo: 'Traspaso de licencia', texto: 'Mover la licencia a un computador nuevo, desactivando la instalación anterior.' },
    { titulo: 'Desarrollos a medida', texto: 'Ajustes, reportes o integraciones especiales para su operación.' },
  ],
}

// Sección "Cómo funciona": pasos del flujo de trabajo en el software.
export const COMO_FUNCIONA = [
  { titulo: 'Ingrese la labor', texto: 'Sección, largo de barra, diámetros, explosivo y caracterización del macizo con RMR, Q y GSI.' },
  { titulo: 'Calcule en segundos', texto: 'El motor Holmberg dimensiona rainura, zapateras, cajas, coronas y auxiliares, y compara el modo estándar con el recomendado.' },
  { titulo: 'Revise y ajuste', texto: 'Plano 2D acotado, vista 3D, mapa de energía, radio de daño y curva de fragmentación Kuz-Ram para validar el diseño.' },
  { titulo: 'Entregue a terreno', texto: 'Memoria técnica en PDF, coordenadas en Excel o CSV y archivo IREDES para el jumbo.' },
]

// Páginas de una memoria técnica real exportada desde HOLMEX (labor de 3,5 × 4 m), en public/memoria/.
export const MEMORIA_EJEMPLO = [
  { src: '/memoria/resumen.jpg', titulo: 'Resumen y consumo de explosivo', ancho: 952, alto: 1347 },
  { src: '/memoria/plano-acotado.jpg', titulo: 'Plano 2D acotado', ancho: 952, alto: 1347 },
  { src: '/memoria/geomecanica.jpg', titulo: 'Dossier geomecánico y daño', ancho: 952, alto: 1347 },
  { src: '/memoria/vista-3d.jpg', titulo: 'Vista 3D de la excavación', ancho: 1347, alto: 952 },
]

// Requisitos del computador donde se instala HOLMEX.
export const REQUISITOS = [
  ['Sistema operativo', 'Windows 11 de 64 bits (recomendado). Compatible con Windows 10.'],
  ['Procesador', '64 bits, 2 núcleos a 1 GHz o más'],
  ['Memoria RAM', '4 GB mínimo · 8 GB recomendado'],
  ['Espacio en disco', 'Menos de 100 MB, más el historial de cálculos'],
  ['Componentes', 'Microsoft WebView2: viene con Windows 11 y el instalador lo agrega en Windows 10'],
  ['Internet', 'No requerida para instalar licencia ni para calcular'],
]

// Programa piloto. Actualizar "ocupados" a medida que se sumen faenas.
export const PILOTO = {
  cupos: 5,
  ocupados: 0,
  duracion: '30 días',
  beneficios: [
    'Instalación, capacitación y acompañamiento directo del equipo fundador sin costo durante el piloto. Solo se cobran los viáticos.',
    'Cálculo de sus labores reales comparado con su método actual.',
    'Condición comercial preferente para la licencia al terminar el piloto.',
    'Sus comentarios influyen en las próximas versiones del software.',
  ],
  requisitos: 'Faenas subterráneas con avance horizontal en Chile, con un profesional de P&T que use el software durante el piloto.',
}
