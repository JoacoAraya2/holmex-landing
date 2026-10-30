// Contenido comercial de la landing. Editar aquí sin tocar componentes.

export const NAV = [
  { href: '#solucion', label: 'Solución' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#ds132', label: 'DS 132' },
  { href: '#licencia', label: 'Precio' },
  { href: '#piloto', label: 'Piloto' },
  { href: '#preguntas', label: 'Preguntas' },
]

// Dominio oficial del sitio (registro en NIC Chile).
export const DOMINIO = 'holmex.cl'

// Correo oficial de HOLMEX para cotizaciones, demostraciones y soporte.
export const CONTACT_EMAIL = 'contacto@holmex.cl'

export const PROOF_POINTS = [
  {
    cifra: '>90%',
    titulo: 'Reducción en tiempo de planificación',
    texto: 'De 55–120 minutos de cálculo manual por disparo a menos de 5 minutos automatizados.',
  },
  {
    cifra: '0 red',
    titulo: '100% autónomo (air-gapped)',
    texto: 'Funciona en frentes ciegas sin señal celular, enlace satelital ni conexión a internet.',
  },
  {
    cifra: '1/año',
    titulo: 'Licencia anual por equipo',
    texto: 'Un solo pago al año por cada equipo. Sin llaves USB físicas de alto costo ni cobros mensuales sorpresivos.',
  },
  {
    cifra: 'DS 132',
    titulo: 'Respaldo normativo por disparo',
    texto: 'Memoria de cálculo con los antecedentes de perforación y tronadura que pide el reglamento para cada labor.',
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
  'Diseño listo en menos de 5 minutos, con la sección dibujada a escala antes de perforar.',
  'Carga ajustada por RMR y litología, con control de energía en el contorno para proteger techo y cajas.',
  'Guía limpia para el perforista con coordenadas, profundidad y secuencia de salida.',
  'Expediente operacional inmediato en PDF, Excel, CSV e IREDES, con los parámetros y resultados de cada disparo.',
]

// Carrusel de videos del banner principal (archivos en public/media/, 1080p).
// Todos los clips son de Pexels bajo la licencia Pexels (uso comercial libre, crédito no obligatorio):
// https://www.pexels.com/license/
// Para agregar otro clip basta con sumar un objeto a esta lista.
export const HERO_VIDEOS = [
  {
    src: '/media/hero-mineria-1080.mp4',
    etiqueta: 'Frente de avance',
    titulo: 'Geometría del frente calculada en menos de 5 minutos',
    dato: '< 5 min',
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
    etiqueta: 'Plano operativo',
    titulo: 'Plano acotado listo para marcar la frente',
    dato: '2D · 3D',
    datoDetalle: 'Planos a escala de la malla',
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
  precio: 'USD 3.000',
  impuesto: '+ IVA / año',
  modalidad: 'Licencia anual por equipo',
  unidad: 'por equipo',
  ejemplos: [
    { equipos: 1, total: 'USD 3.000' },
    { equipos: 3, total: 'USD 9.000' },
    { equipos: 5, total: 'USD 15.000' },
  ],
  atributos: [
    { criterio: 'Modelo de cobro', valor: 'Pago anual de USD 3.000 + IVA por cada equipo entregado a la empresa. Sin llaves USB físicas ni mensualidades.' },
    { criterio: 'Requisitos de red', valor: '100% offline nativo, también en interior mina.' },
    { criterio: 'Capacitación', valor: 'Adopción operacional en menos de 3 horas.' },
    { criterio: 'Entregables a terreno', valor: 'Memoria en PDF, coordenadas en Excel o CSV y archivo IREDES para el jumbo.' },
    { criterio: 'Respaldo técnico', valor: 'Memoria de cálculo por disparo con los parámetros de entrada y los resultados.' },
  ],
  incluye: [
    'Instalación y puesta en marcha en el computador de faena',
    'Capacitación inicial para el equipo de P&T',
    'Prueba de cálculo en una labor real',
  ],
}

export const CAPTURAS = [
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

// Ficha técnica visible para el cliente. No publicar la tecnología interna ni métricas de desarrollo.
export const FICHA = [
  ['Plataforma', 'Windows 10 y 11 (64 bits)'],
  ['Conexión', 'No requiere internet'],
  ['Datos de la faena', 'Guardados solo en el equipo'],
  ['Exportación', 'PDF, PNG, Excel, CSV e IREDES'],
  ['Telemetría', 'Ninguna'],
]

export const EQUIPO = [
  {
    nombre: 'Vicente Gago Salazar',
    rol: 'Dirección de Producto y Arquitectura',
    detalle: 'Diseño del producto y relación técnica con cada faena.',
    foto: 1,
  },
  {
    nombre: 'Vicente Gómez Hidalgo',
    rol: 'Motor de Cálculo y Datos',
    detalle: 'Desarrollo del motor de cálculo de mallas y de la gestión de datos de cada labor.',
    foto: 3,
  },
  {
    nombre: 'Joaquín Araya López',
    rol: 'Calidad y Exportación Técnica',
    detalle: 'Control de calidad del software y de los entregables a terreno: memoria técnica, planillas y archivo IREDES.',
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
      'Se basa en el método de Holmberg para frentes de avance, una referencia reconocida en el diseño de mallas para túneles y galerías, e incorpora la caracterización geomecánica del macizo con RMR, Q y GSI. Además estima el radio de daño en el contorno y entrega una recomendación de fortificación de referencia.',
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
      'Recomendamos Windows 11 de 64 bits, que sigue recibiendo actualizaciones de seguridad. HOLMEX usa pocos recursos: basta un notebook de faena con 4 GB de RAM (8 GB recomendado). También funciona en Windows 10, aunque Microsoft dejó de darle soporte de seguridad en octubre de 2025.',
  },
  {
    pregunta: '¿Qué pasa si cambio o se daña el computador?',
    respuesta:
      'La licencia es anual y por equipo. Si necesita moverla a un computador nuevo, la traspasamos desactivando la instalación anterior. Este servicio tiene un costo adicional.',
  },
  {
    pregunta: '¿Cuánto toma aprender a usarlo?',
    respuesta:
      'La capacitación inicial dura menos de 3 horas y está incluida en la licencia, junto con la instalación y una prueba de cálculo en una labor real.',
  },
  {
    pregunta: '¿Cuánto cuesta?',
    respuesta:
      'USD 3.000 + IVA al año por cada equipo entregado a la empresa, facturado en pesos chilenos, sin mensualidades ni llaves USB. Por ejemplo, una empresa con 3 equipos paga USD 9.000 + IVA al año. El primer año incluye la instalación inicial y la capacitación inicial. Los viáticos, actualizaciones, mantenciones y servicios adicionales se cotizan aparte.',
  },
]

// Qué incluye la licencia y qué servicios se cobran aparte. Revisar cada compromiso antes de publicar.
export const SOPORTE = {
  incluido: [
    { titulo: 'Licencia anual', texto: 'El ejecutable de HOLMEX instalado en un equipo durante 12 meses, renovable cada año. Sin mensualidades.' },
    { titulo: 'Puesta en marcha inicial', texto: 'Instalación en su computador de faena y validación de un cálculo con una labor real.' },
    { titulo: 'Capacitación inicial', texto: 'Una capacitación para el equipo de P&T al momento de la instalación.' },
    { titulo: 'Soporte por correo', texto: `Consultas sobre el uso del software a ${CONTACT_EMAIL}, sin costo, de lunes a viernes de 08:30 a 18:00 (hora de Chile).` },
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
  { titulo: 'Calcule en segundos', texto: 'El motor de cálculo dimensiona rainura, zapateras, cajas, coronas y auxiliares, y compara el diseño estándar con el recomendado.' },
  { titulo: 'Revise y ajuste', texto: 'Plano 2D acotado, modelo 3D con desviación, simuladores de tiempos y de jumbo, y mapa de energía para validar el diseño.' },
  { titulo: 'Entregue a terreno', texto: 'Memoria técnica en PDF, coordenadas en Excel o CSV y archivo IREDES para el jumbo.' },
]

// Requisitos del computador donde se instala HOLMEX.
export const REQUISITOS = [
  ['Sistema operativo', 'Windows 11 de 64 bits (recomendado). Compatible con Windows 10.'],
  ['Procesador', '64 bits, 2 núcleos a 1 GHz o más'],
  ['Memoria RAM', '4 GB mínimo · 8 GB recomendado'],
  ['Espacio en disco', 'Menos de 100 MB, más el historial de cálculos'],
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

// DS N° 132, Título XV (pequeña minería, hasta 5.000 t/mes), texto del Decreto N° 1 de 2024 (Diario Oficial, 09-04-2024).
// Cada fila: qué exige el artículo y cómo lo apoya HOLMEX.
export const DS132_TITULO_XV = [
  {
    articulo: 'Art. 601 N° 13 a',
    exige: 'Describir con figuras o planos el diagrama de disparo de cada labor o tipo de sección, con el diámetro y la profundidad de perforación.',
    holmex: 'Plano 2D acotado de la malla para cada sección, con diámetros de tiros cargados y de alivio y largo de perforación.',
  },
  {
    articulo: 'Art. 601 N° 13 b.1 y b.3',
    exige: 'Indicar las cantidades de explosivo por tiro y por disparo, y el factor de carga de cada tipo de labor.',
    holmex: 'Carga por tiro y por zona, consumo total de explosivo del disparo y factor de carga en kg/m³.',
  },
  {
    articulo: 'Art. 601 N° 13 b.2',
    exige: 'Indicar el tipo de conexión y la secuencia de iniciación de cada tipo de disparo.',
    holmex: 'Secuencia de salida de los tiros, revisable en el simulador de tiempos.',
  },
  {
    articulo: 'Art. 601 N° 13 b.4',
    exige: 'Indicar el avance esperado por disparo en cada labor.',
    holmex: 'Avance efectivo estimado según el largo de barra, junto al volumen teórico excavado.',
  },
  {
    articulo: 'Art. 601 N° 15',
    exige: 'Proponer el diagrama de disparo estándar que se usará en las labores de avance.',
    holmex: 'Diseño estándar y diseño optimizado para cada sección, como base del diagrama que se presenta en el proyecto.',
  },
  {
    articulo: 'Art. 609 letra d y art. 648',
    exige: 'Perforar según el diagrama de disparo establecido y mantener en la faena el registro del diagrama utilizado y de sus modificaciones.',
    holmex: 'Historial local de cada cálculo con su fecha y parámetros, como respaldo del diagrama utilizado y de sus cambios.',
  },
]
