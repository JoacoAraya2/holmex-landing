// Textos legales del sitio: Política de Privacidad y Términos de Uso.
// Redactados como base con normativa chilena vigente a octubre de 2026. Deben ser revisados por un abogado
// antes de publicar. Completar los datos de EMPRESA (los marcados entre corchetes).
import { CONTACT_EMAIL } from './content.js'

export const EMPRESA = {
  razonSocial: '[Razón social de HOLMEX]',
  rut: '[RUT]',
  domicilio: '[Domicilio comercial, comuna, región]',
  ciudadTribunales: 'La Serena',
  correo: CONTACT_EMAIL,
}

export const ACTUALIZADO = '15 de octubre de 2026'

export const PRIVACIDAD = {
  id: 'privacidad',
  titulo: 'Política de Privacidad',
  numerar: true,
  intro:
    'Esta política explica qué datos personales recopila este sitio, para qué los usamos y cómo puede ejercer sus derechos. Se rige por la Ley N° 19.628 sobre Protección de la Vida Privada y, desde su entrada en vigencia, por las modificaciones de la Ley N° 21.719.',
  secciones: [
    {
      titulo: 'Responsable del tratamiento',
      parrafos: [
        `${EMPRESA.razonSocial}, RUT ${EMPRESA.rut}, con domicilio en ${EMPRESA.domicilio}. Correo de contacto para materias de privacidad: ${EMPRESA.correo}.`,
      ],
    },
    {
      titulo: 'Datos que recopilamos',
      parrafos: ['Solo recopilamos los datos que usted ingresa voluntariamente en el formulario de contacto:'],
      lista: [
        'Nombre y apellido del solicitante.',
        'Empresa o faena contratista.',
        'Región de la operación.',
        'Correo electrónico corporativo y teléfono.',
        'Si solicita una prueba de cálculo en terreno.',
      ],
      cierre:
        'No solicitamos datos sensibles ni datos de menores de edad. El sitio no usa cookies propias, herramientas de analítica ni publicidad.',
    },
    {
      titulo: 'Para qué usamos sus datos',
      lista: [
        'Responder su solicitud y coordinar la demostración del software.',
        'Preparar y enviar la propuesta comercial y la ficha técnica.',
        'Dar seguimiento comercial a la misma solicitud.',
      ],
      cierre:
        'La base del tratamiento es su consentimiento, que otorga al enviar el formulario, y la ejecución de las gestiones previas a un contrato que usted mismo solicita. No vendemos ni cedemos sus datos a terceros para fines publicitarios.',
    },
    {
      titulo: 'Con quién compartimos datos',
      parrafos: [
        'Para operar el sitio usamos proveedores que actúan por cuenta nuestra: el servicio de alojamiento web, el servicio de correo electrónico y, si está habilitado, el servicio que recibe el formulario. Estos proveedores solo tratan los datos para prestarnos el servicio.',
        'El sitio no carga recursos de terceros para mostrarse: las tipografías y el resto de los archivos se sirven desde nuestro propio dominio.',
      ],
    },
    {
      titulo: 'Transferencias internacionales',
      parrafos: [
        'Algunos de nuestros proveedores, como el alojamiento web, el correo electrónico o el servicio que recibe el formulario, pueden almacenar o procesar datos en servidores ubicados fuera de Chile, por ejemplo en Estados Unidos o la Unión Europea.',
        'Solo trabajamos con proveedores que ofrecen garantías adecuadas de protección y confidencialidad, y que tratan los datos únicamente para prestarnos el servicio. Al enviar el formulario, usted acepta esta transferencia con ese fin. Puede pedirnos el detalle de los proveedores y de los países involucrados escribiendo a nuestro correo.',
      ],
    },
    {
      titulo: 'Cuánto tiempo guardamos sus datos',
      parrafos: [
        'Conservamos los datos de contacto mientras exista una relación comercial o una conversación en curso y, como máximo, 24 meses desde el último contacto. Después los eliminamos, salvo que una ley nos obligue a conservarlos.',
      ],
    },
    {
      titulo: 'Sus derechos',
      parrafos: [
        'Usted puede solicitar en cualquier momento el acceso, la rectificación, la cancelación o el bloqueo de sus datos (artículo 12 de la Ley N° 19.628) y, desde la vigencia de la Ley N° 21.719, también la oposición y la portabilidad. También puede retirar su consentimiento.',
        `Para ejercerlos, escriba a ${EMPRESA.correo} indicando su nombre y el derecho que desea ejercer. Responderemos sin costo y a más tardar dentro de 30 días corridos.`,
        'Si considera que no hemos atendido correctamente su solicitud, puede reclamar ante la Agencia de Protección de Datos Personales creada por la Ley N° 21.719, una vez que esté en funcionamiento, o ante los tribunales de justicia según la ley vigente.',
      ],
    },
    {
      titulo: 'Datos de su faena y el software HOLMEX',
      parrafos: [
        'El software HOLMEX funciona sin conexión a internet en los equipos del cliente. Los parámetros de las labores, diseños y memorias de cálculo que se generan con el software quedan en esos equipos y no se transmiten a HOLMEX.',
      ],
    },
    {
      titulo: 'Seguridad',
      parrafos: [
        'Aplicamos medidas técnicas y organizativas razonables para proteger los datos contra pérdida, acceso no autorizado o divulgación. Si ocurre un incidente que afecte sus datos, lo informaremos según lo exija la ley.',
      ],
    },
    {
      titulo: 'Cambios a esta política',
      parrafos: [
        'Podemos actualizar esta política para reflejar cambios legales o del servicio. La versión vigente y su fecha de actualización estarán siempre publicadas en esta página.',
      ],
    },
  ],
}

export const TERMINOS = {
  id: 'terminos',
  titulo: 'Términos de Uso y Aviso Legal',
  numerar: true,
  intro:
    'Estos términos regulan el uso de este sitio web y aclaran el alcance del software HOLMEX. El uso del software se rige además por el contrato de licencia que se firme con cada cliente; si hay diferencias, prevalece ese contrato.',
  secciones: [
    {
      titulo: 'Identificación',
      parrafos: [`Este sitio pertenece a ${EMPRESA.razonSocial}, RUT ${EMPRESA.rut}, con domicilio en ${EMPRESA.domicilio}.`],
    },
    {
      titulo: 'Naturaleza del software',
      parrafos: [
        'HOLMEX es una herramienta de apoyo al diseño de mallas de perforación y tronadura para labores subterráneas. Realiza cálculos a partir de métodos de la literatura técnica (Langefors–Kihlström, Holmberg–Persson, Kuz-Ram, entre otros) y de los parámetros que ingresa el usuario.',
        'Los resultados son estimaciones técnicas. No reemplazan el criterio profesional, la validación en terreno, la medición de vibraciones ni los procedimientos de la faena.',
      ],
    },
    {
      titulo: 'Responsabilidad técnica de la empresa minera (DS N° 132)',
      parrafos: [
        'El Reglamento de Seguridad Minera (Decreto Supremo N° 132 de 2002, Ministerio de Minería) asigna a la empresa minera y a sus profesionales la responsabilidad sobre el diseño y la ejecución de las obras. En particular:',
      ],
      lista: [
        'Artículo 33: los ingenieros a cargo de la faena firman todo proyecto y se hacen responsables por las obras mineras cuya ejecución tengan a cargo.',
        'Artículo 153: las operaciones de perforación y tronadura deben estar reguladas por procedimientos de trabajo aprobados por la Administración de la faena.',
        'Artículo 537: esas operaciones deben estar normalizadas por procedimientos internos de la faena (personal, equipos, carguío y tronadura).',
        'Artículos 25 y 26: la empresa minera debe mantener reglamentos internos de sus operaciones críticas y un sistema documentado de procedimientos.',
        'Artículo 570: cuando una tronadura pueda afectar instalaciones o poblados cercanos, corresponde a la Administración adoptar las medidas de control.',
      ],
      cierre:
        'En consecuencia, la aprobación, firma y ejecución de cada diseño, así como la seguridad de las personas en la faena, son responsabilidad de la empresa minera, de su Administración y de sus profesionales. HOLMEX entrega el cálculo y la memoria técnica como apoyo a esas decisiones.',
    },
    {
      titulo: 'Datos de entrada',
      parrafos: [
        'El usuario es responsable de la exactitud de los parámetros que ingresa (geometría de la labor, caracterización del macizo rocoso, explosivos y equipos). Resultados obtenidos con datos incorrectos o incompletos no son atribuibles a HOLMEX.',
      ],
    },
    {
      titulo: 'Licencia de uso',
      parrafos: [
        'Cada licencia permite instalar y usar HOLMEX en un solo equipo del cliente. La licencia es personal del cliente que la adquiere.',
      ],
      lista: [
        'Está prohibido revender, ceder, arrendar o sublicenciar la licencia a terceros.',
        'Está prohibido compartir la licencia o instalar el software en más equipos que los licenciados.',
        'El traspaso a otro equipo del mismo cliente se realiza solo a través de HOLMEX, como servicio con costo adicional.',
      ],
      cierre:
        'El incumplimiento de estas condiciones permite a HOLMEX dar por terminada la licencia, sin perjuicio de las acciones legales que correspondan.',
    },
    {
      titulo: 'Condiciones comerciales',
      lista: [
        'El precio de la licencia se expresa en dólares estadounidenses más IVA.',
        'La factura se emite en pesos chilenos, convirtiendo el precio según el dólar observado publicado por el Banco Central de Chile el día de emisión de la factura.',
        'La licencia se entrega y activa una vez confirmado el pago, según lo indicado en la propuesta comercial.',
        'Los viáticos, actualizaciones, mantenciones y demás servicios adicionales se cotizan y facturan por separado.',
      ],
      cierre:
        'HOLMEX no realiza reembolsos una vez entregada la licencia. Esto no afecta la garantía de cálculo ni los derechos irrenunciables que la ley reconozca al cliente.',
    },
    {
      titulo: 'Limitación de responsabilidad',
      parrafos: [
        'En la medida permitida por la ley chilena (artículos 1547 y 1558 del Código Civil), HOLMEX no responde por daños indirectos, lucro cesante, pérdida de producción ni por accidentes o incidentes derivados de la ejecución en terreno de un diseño, la que corresponde a la empresa minera según el punto 3.',
        'Cuando la ley lo permita, la responsabilidad total de HOLMEX frente a un cliente se limita al monto pagado por la licencia involucrada. Esta limitación no aplica a los casos de dolo o culpa grave, que la ley no permite excluir (artículos 44 y 1465 del Código Civil), ni a los derechos irrenunciables que la ley reconozca al cliente.',
      ],
    },
    {
      titulo: 'Confidencialidad',
      parrafos: [
        'HOLMEX mantendrá en reserva toda la información técnica y operacional de la faena que conozca durante la instalación, la capacitación, el programa piloto o el soporte, incluidos parámetros de labores, diseños, planos y resultados.',
        'Esa información se usa solo para prestar el servicio solicitado y no se divulga ni se usa con otros fines sin autorización escrita del cliente, salvo que una ley o una autoridad competente lo exija.',
      ],
    },
    {
      titulo: 'Contenido del sitio',
      parrafos: [
        'La información de este sitio es referencial y puede cambiar sin aviso. Las cifras de desempeño corresponden a casos y condiciones específicos y no constituyen una garantía de resultados en otra faena. La oferta comercial vinculante es la que conste en la propuesta y el contrato de licencia.',
      ],
    },
    {
      titulo: 'Propiedad intelectual',
      parrafos: [
        'El software HOLMEX, su código, su núcleo de cálculo, la marca, los textos y el diseño de este sitio están protegidos por la Ley N° 17.336 sobre Propiedad Intelectual, que reconoce a los programas computacionales como obras protegidas. Se prohíbe copiarlos, modificarlos, descompilarlos o distribuirlos sin autorización escrita.',
        'Los videos del banner provienen de Pexels y se usan bajo su licencia.',
      ],
    },
    {
      titulo: 'Uso indebido',
      parrafos: [
        'Se prohíbe intentar acceder sin autorización a los sistemas de HOLMEX, alterar su funcionamiento o interceptar sus datos. Estas conductas pueden constituir delitos según la Ley N° 21.459 sobre Delitos Informáticos.',
      ],
    },
    {
      titulo: 'Ley aplicable y tribunales',
      parrafos: [
        `Estos términos se rigen por las leyes de la República de Chile. Cualquier controversia se someterá a los tribunales ordinarios de justicia de ${EMPRESA.ciudadTribunales}, sin perjuicio de los derechos que la ley reconozca al cliente.`,
      ],
    },
  ],
}

export const METODOLOGIAS = {
  id: 'metodologias',
  titulo: 'Metodologías',
  etiqueta: 'Fundamentos técnicos',
  intro:
    'HOLMEX implementa métodos publicados en la literatura técnica de perforación, tronadura y geomecánica. Los métodos y sus nombres pertenecen a sus autores; HOLMEX no reclama su autoría, sino la implementación en software. Este es un resumen general de cada uno y de para qué se usa dentro del programa.',
  secciones: [
    {
      titulo: 'Método de Holmberg para frentes de avance',
      parrafos: [
        'Roger Holmberg (1982) sistematizó el cálculo de mallas para túneles y galerías. Divide la frente en zonas (rainura, auxiliares, zapateras, cajas y coronas) y calcula cada una por separado.',
        'En HOLMEX es el método principal: dimensiona la rainura de tiros paralelos alrededor de los tiros vacíos de alivio, por cuadrantes, y luego distribuye el resto de los tiros hasta el contorno.',
      ],
      cierre:
        'Límites: está pensado para rainuras de tiros paralelos y supone un avance cercano al largo perforado. Las desviaciones de perforación y las discontinuidades del macizo reducen ese avance, por lo que el diseño debe ajustarse con los resultados de terreno.',
    },
    {
      titulo: 'Langefors–Kihlström',
      parrafos: [
        'Ulf Langefors y Björn Kihlström (1963) son la base de la escuela sueca de tronadura. Relacionan el burden máximo con la concentración de carga del tiro, el tipo de explosivo y una constante que representa la resistencia de la roca a ser tronada.',
        'HOLMEX usa estas relaciones para calcular el burden y el espaciamiento de cada zona, y para ajustar la constante de roca según la calidad del macizo.',
      ],
      cierre:
        'Límites: la constante de roca es empírica y fue calibrada en rocas suecas, por lo que conviene ajustarla con los resultados de las primeras tronaduras en cada faena.',
    },
    {
      titulo: 'Holmberg–Persson',
      parrafos: [
        'Roger Holmberg y Per-Anders Persson (1979) propusieron un modelo de campo cercano que estima la vibración que produce una carga cilíndrica en la roca que la rodea.',
        'HOLMEX lo usa para estimar el radio de daño alrededor de los tiros de contorno y así ayudar a controlar la sobreexcavación.',
      ],
      cierre:
        'Límites: sus constantes de atenuación y la vibración que produce daño dependen de cada sitio. Sin mediciones locales, el radio de daño es una estimación de referencia.',
    },
    {
      titulo: 'Kuz-Ram',
      parrafos: [
        'El modelo Kuz-Ram combina la ecuación de Kuznetsov (1973) con la distribución de Rosin-Rammler, en la forma propuesta por Claude Cunningham (1983). Estima el tamaño medio de los fragmentos y qué tan uniforme será la granulometría.',
        'HOLMEX lo usa para dibujar la curva de fragmentación y estimar indicadores como el P80.',
      ],
      cierre:
        'Límites: tiende a subestimar la fracción de finos, no considera de forma explícita los tiempos de retardo y fue desarrollado principalmente para tronaduras en banco, por lo que en labores subterráneas su resultado es referencial.',
    },
    {
      titulo: 'Clasificaciones geomecánicas: RMR, Q y GSI',
      parrafos: [
        'El RMR de Bieniawski (versión 1989), el índice Q de Barton (NGI, 1974) y el GSI de Hoek describen la calidad del macizo rocoso a partir de observaciones de terreno.',
        'HOLMEX los usa para caracterizar la roca, ajustar los parámetros de cálculo y entregar una recomendación de fortificación de referencia.',
      ],
      cierre:
        'Límites: su resultado depende de la calidad del mapeo geotécnico, y la recomendación de fortificación es orientativa: no reemplaza el diseño de sostenimiento de la faena.',
    },
    {
      titulo: 'Glosario',
      lista: [
        'Burden: distancia entre un tiro y la cara libre hacia la que rompe la roca.',
        'Espaciamiento: distancia entre tiros vecinos de una misma fila o zona.',
        'Rainura (o cuele): grupo central de tiros que abre el primer espacio libre de la frente.',
        'Tiro de alivio: tiro vacío, de mayor diámetro, que sirve de cara libre para la rainura.',
        'Zapateras, cajas y coronas: tiros del piso, de las paredes laterales y del techo de la labor.',
        'Auxiliares (o destrozo): tiros entre la rainura y el contorno que completan el arranque.',
        'Taco: tramo final del tiro sin explosivo, que confina la carga.',
        'Factor de carga: kilos de explosivo por metro cúbico de roca tronada.',
        'P80 y X50: tamaños bajo los cuales queda el 80% y el 50% del material tronado.',
        'Radio de daño: distancia alrededor del tiro en que la roca remanente queda fracturada por la tronadura.',
        'Sobreexcavación: roca arrancada más allá del perfil de diseño de la labor.',
      ],
    },
    {
      titulo: 'Referencias bibliográficas',
      lista: [
        'Holmberg, R. (1982). Charge calculations for tunneling. En W. A. Hustrulid (Ed.), Underground Mining Methods Handbook. SME.',
        'Langefors, U. y Kihlström, B. (1963). The Modern Technique of Rock Blasting. Almqvist & Wiksell / John Wiley & Sons.',
        'Holmberg, R. y Persson, P.-A. (1979). Design of tunnel perimeter blasthole patterns to prevent rock damage. Tunnelling 79, Institution of Mining and Metallurgy, Londres.',
        'Persson, P.-A., Holmberg, R. y Lee, J. (1994). Rock Blasting and Explosives Engineering. CRC Press.',
        'Kuznetsov, V. M. (1973). The mean diameter of the fragments formed by blasting rock. Soviet Mining Science, 9(2).',
        'Cunningham, C. V. B. (1983). The Kuz-Ram model for prediction of fragmentation from blasting. First International Symposium on Rock Fragmentation by Blasting, Luleå.',
        'Bieniawski, Z. T. (1989). Engineering Rock Mass Classifications. John Wiley & Sons.',
        'Barton, N., Lien, R. y Lunde, J. (1974). Engineering classification of rock masses for the design of tunnel support. Rock Mechanics, 6(4).',
        'Hoek, E. (1994). Strength of rock and rock masses. ISRM News Journal, 2(2).',
        'López Jimeno, C., López Jimeno, E. y García Bermúdez, P. (2003). Manual de Perforación y Voladura de Rocas. ETSI de Minas de Madrid.',
      ],
    },
    {
      titulo: 'Alcance',
      parrafos: [
        'Estos métodos entregan estimaciones a partir de modelos empíricos y de los datos que ingresa el usuario. Sus resultados deben ser revisados y validados en terreno por los profesionales de la faena, como se indica en los Términos de Uso.',
      ],
    },
  ],
}

export const DOCUMENTOS_LEGALES = [PRIVACIDAD, TERMINOS, METODOLOGIAS]
