import { p } from '../format';
import type { UIStrings } from './en';

export const es: UIStrings = {
  chrome: {
    skipToContent: 'Ir al contenido',
    homeAria: 'Inicio de UtilDock',
    navTools: 'Herramientas',
    navSite: 'Sitio',
    breadcrumb: 'Ruta de navegación',
    home: 'Inicio',
    soon: 'pronto',
    comingSoon: 'próximamente',
    categoryTools: 'Herramientas {category}',
    allCategoryTools: 'Todas las herramientas {category}',
    openToolsMenu: 'Abrir el menú de herramientas',
    closeToolsMenu: 'Cerrar el menú de herramientas',
    toolsButton: 'Herramientas',
    privacyPill: 'Nada sale de esta pestaña',
    privacyPillMobile: 'Lo que pegas se queda en esta pestaña',
    open: 'Abrir',
  },

  theme: {
    toLight: 'Cambiar al tema claro',
    toDark: 'Cambiar al tema oscuro',
    title: 'Cambiar de tema',
    light: 'Claro',
    dark: 'Oscuro',
  },

  footer: {
    tagline: 'Tu muelle de utilidades para desarrolladores.',
    blurb: 'Gratis, sin anuncios, y todo se ejecuta en tu propio navegador.',
    about: 'Acerca de',
    privacy: 'Privacidad',
    analytics: 'Analítica',
    copyright: '© {year} UtilDock',
    language: 'Idioma',
    languageAria: 'Elegir idioma',
  },

  consent: {
    region: 'Analítica',
    heading: 'Analítica',
    undecided:
      'Nos gustaría usar Google Analytics para contar las visitas a las páginas y saber así qué herramientas conviene mejorar. Instala una cookie. Nunca se incluye nada de lo que pegues: tu JSON no sale de esta pestaña en ningún caso.',
    privacyPolicy: 'Política de privacidad',
    whatItCollects: 'Qué recopila',
    currentlyOn: 'Activada ahora mismo',
    granted:
      'Google Analytics está contando las visitas en este navegador. Nunca se incluye nada de lo que pegues.',
    currentlyOff: 'Desactivada ahora mismo',
    denied:
      'No se solicita nada a Google desde este navegador, y cualquier cookie de analítica que ya se hubiera escrito ha sido eliminada. Todas las herramientas funcionan exactamente igual en ambos casos.',
    allow: 'Permitir analítica',
    decline: 'No, gracias',
    turnOff: 'Desactivarla',
    turnOn: 'Activarla',
    close: 'Cerrar',
  },

  tool: {
    taglineSuffix: 'se ejecuta en esta pestaña, nunca se envía a ninguna parte',
    howItWorks: 'Cómo funciona el {name}',
    otherTools: 'Otras herramientas',
    commonQuestions: 'Preguntas frecuentes',
  },

  home: {
    title: 'Herramientas JSON y JWT gratis en tu navegador',
    description:
      'Herramientas gratuitas para desarrolladores que funcionan en tu navegador: formateador, visor, validador y comparador JSON, decodificador y codificador JWT, contador de palabras. Sin anuncios ni registro.',
    headlineLead: 'Herramientas para desarrolladores que nunca',
    headlineAccent: 'tocan un servidor.',
    lede: 'Utilidades pequeñas y afiladas que se ejecutan por completo en esta pestaña: gratis, sin anuncios y sin registro. Un formateador, un visor, un validador y un comparador de JSON, y un decodificador de JWT que comprueba firmas sin ver nunca tu clave.',
    assurances: ['Nada se sube', 'Nada se registra', 'Sin cuenta, sin límites'],
    closeLine: 'Desconecta la red. Sigue funcionando.',
    closeCta: 'Por qué es cierto',
    keywords: [
      'herramientas para desarrolladores',
      'herramientas json',
      'formateador json online',
      'utilidades gratis para programadores',
    ],
  },

  hub: {
    chooseHeading: 'Elige una herramienta',
    toolCount: p({
      one: '{count} herramienta · habrá más',
      other: '{count} herramientas · habrá más',
    }),
    notes: [
      {
        head: 'Nada de lo que pegas se sube',
        body: 'Todas las herramientas de aquí son JavaScript ejecutándose en tu propia pestaña. Pega una carga útil de producción con la red desconectada y seguirá funcionando: no hay ningún servidor nuestro que pudiera recibirla.',
      },
      {
        head: 'Sin anuncios, sin cuenta, sin límite',
        body: 'Sin interstitials, sin registro y sin tope de cuánto puedes pegar. La página en la que aterrizas es la herramienta.',
      },
    ],
    closeLine: 'Comprueba la afirmación en tu panel de Red.',
    closeCta: 'Por qué es cierto',

    categories: {
      json: {
        title: 'Herramientas JSON gratis, sin anuncios',
        description:
          'Herramientas JSON gratuitas: visor, validador, comparador y formateador. Sin anuncios ni registro, y nada de lo que pegues sale de tu navegador.',
        keywords: [
          'herramientas json',
          'herramientas json online',
          'herramientas json gratis',
          'utilidades json',
        ],
        headlineLead: 'Todas las herramientas JSON,',
        headlineAccent: 'en una pestaña.',
        lede: 'Cuatro herramientas afiladas para trabajar con JSON: un [visor](/json/viewer) en árbol, un [validador](/json/validator) de sintaxis y esquema, un [comparador](/json/diff) visual y un [formateador y minificador](/json/formatter). Todas gratis, todas sin anuncios, y todas analizan tu documento en esta pestaña en lugar de en un servidor.',
        note: {
          head: 'Pensadas para documentos grandes',
          body: 'El análisis, la validación y la comparación se ejecutan en un hilo de trabajo, así que un documento de varios megabytes se procesa sin que la página se bloquee mientras escribes.',
        },
      },
      jwt: {
        title: 'Herramientas JWT — decodificar y firmar',
        description:
          'Herramientas JWT gratuitas online: decodifica un token, verifica su firma o crea y firma uno nuevo. Tu token y tu clave no salen del navegador.',
        keywords: [
          'herramientas jwt',
          'decodificar jwt online',
          'jwt decoder online gratis',
          'verificar firma jwt',
          'crear token jwt online',
        ],
        headlineLead: 'Lee el token.',
        headlineAccent: 'Confía en la firma.',
        lede: 'Dos herramientas para JSON Web Tokens: un [decodificador](/jwt/decoder) que muestra cada claim y comprueba la firma contra una clave que tú aportas, y un [codificador](/jwt/encoder) que crea y firma un token nuevo. La firma se ejecuta con WebCrypto en esta pestaña, así que el secreto que pegas nunca se transmite.',
        note: {
          head: 'Tu clave nunca sale de la pestaña',
          body: 'La firma y la verificación usan WebCrypto, la primitiva del propio navegador. La clave se guarda en memoria, se usa y se descarta: es la única entrada de este sitio que deliberadamente no se guarda.',
        },
      },
      text: {
        title: 'Herramientas de texto — contar y limpiar',
        description:
          'Herramientas de texto gratuitas online: cuenta palabras, caracteres y frases, o limpia espacios, mayúsculas y puntuación. Todo en tu navegador.',
        keywords: [
          'contador de palabras online',
          'contar caracteres online',
          'herramientas de texto',
          'formatear texto online',
          'quitar espacios de más',
        ],
        headlineLead: 'Mide el texto,',
        headlineAccent: 'luego ordénalo.',
        lede: 'Dos herramientas para la prosa: un [contador](/text/counter) que informa de palabras, caracteres, frases y tiempo de lectura mientras escribes, y un [formateador](/text/formatter) que corrige espacios, mayúsculas y puntuación según las convenciones del idioma en el que trabajas. Nada de lo que pegues sale de la página.',
        note: {
          head: 'Correcto en cualquier escritura',
          body: 'El conteo y el formateo siguen la segmentación Unicode, así que el japonés se cuenta por sus palabras en lugar de contarse como una sola, y el francés conserva el espacio antes de su puntuación en vez de perderlo.',
        },
      },
    },
  },

  notFound: {
    title: 'Página no encontrada',
    description: 'Esa página no existe en UtilDock.',
    headline: 'Esa página no existe.',
    body: 'Puede que el enlace esté obsoleto o que la dirección se haya escrito mal. Abajo están todas las herramientas de UtilDock.',
    cta: 'Volver al inicio',
    allTools: 'Todas las herramientas',
  },

  about: {
    title: 'Acerca de — quién crea UtilDock y por qué',
    description:
      'Por qué existe UtilDock: utilidades para desarrolladores pequeñas, rápidas y sin anuncios que se ejecutan por completo en tu navegador, creadas por una sola persona, sin publicidad y sin subir nunca nada de lo que pegues.',
    heading: 'Acerca de UtilDock',
    whyHeading: 'Por qué existe',
    why: [
      'Todo desarrollador necesita formatear algún JSON o averiguar por qué dos cargas útiles no coinciden. Las herramientas que aparecen primero en esas búsquedas suelen estar sepultadas en anuncios, interrumpidas por muros de cookies y —lo más incómodo— a menudo envían lo que pegues a un servidor del que no sabes nada. Es un mal trato cuando lo que estás depurando es una carga útil de producción.',
      'UtilDock es lo contrario: un conjunto pequeño de herramientas afiladas, sin publicidad, sin registro, y sin que nada de lo que pegues salga nunca de tu máquina.',
    ],
    builtHeading: 'Cómo está construido',
    built: [
      'El sitio es estático: HTML, CSS y un poco de JavaScript, servidos desde el borde de la red de Cloudflare. Cada herramienta es un componente autocontenido que se hidrata solo en su propia página, así que las páginas que no usas no te cuestan nada. El trabajo pesado (analizar, validar, comparar) ocurre en un Web Worker, y por eso un documento de varios megabytes no congela la página mientras escribes.',
      'No hay backend. Es una restricción deliberada: una herramienta que no puede enviar tus datos a ninguna parte no puede filtrarlos. Lee la [página de privacidad](/privacy) para conocer los detalles.',
    ],
    todayHeading: 'Qué hay hoy',
    today:
      'JSON llegó primero porque es a lo que más recurrimos la mayoría, y después llegó un decodificador de JWT —con verificación de firma incluida, que se ejecuta sobre la propia WebCrypto del navegador, así que la clave tampoco sale de tu máquina—. La lista seguirá creciendo, siempre con las mismas reglas: rápido, gratis, sin anuncios y enteramente del lado del cliente.',
  },

  privacy: {
    title: 'Privacidad — nada de lo que pegas sale de tu navegador',
    description:
      'UtilDock se ejecuta por completo en tu navegador. Ningún documento que pegues sale nunca de tu dispositivo: no hay ningún servidor que pudiera recibirlo.',
    heading: 'Política de privacidad',
    updated: 'Última actualización: {date}',
    updatedDate: 'agosto de 2026',
    translationNote:
      'Esta es una traducción ofrecida por conveniencia. Si difiere de la versión en inglés, prevalece la versión en inglés.',
    lead: '**Nada de lo que pegas en UtilDock sale nunca de tu navegador.** Todas las herramientas son JavaScript ejecutándose en tu propia pestaña. Tu JSON nunca se envía a un backend, nunca se escribe en un registro y nunca lo vemos: no hay ningún servidor nuestro que pudiera recibirlo.',
    howHeading: 'Cómo funcionan las herramientas',
    how: [
      'UtilDock es un sitio web estático. Cuando abres una herramienta, tu navegador descarga algo de HTML, CSS y JavaScript, y todo lo que ocurre después sucede localmente. El análisis, el formateo, la validación y la comparación se ejecutan dentro de tu pestaña. Abrir un archivo con el botón **Cargar** —o soltarlo sobre la página— lo lee desde tu disco a la memoria; no es una subida.',
      'Como no hay backend, el contenido con el que trabajas nunca se transmite, registra ni conserva en ninguna parte. Puedes desconectarte de internet y las herramientas siguen funcionando.',
    ],
    storedHeading: 'Información almacenada en tu dispositivo',
    stored:
      'Para que una recarga no te haga perder el trabajo, cada herramienta guarda su entrada actual en el `localStorage` de tu navegador, junto con tu elección de tema y algunas preferencias como el tamaño de la sangría. Estos datos permanecen en tu dispositivo, solo puede leerlos UtilDock en tu navegador, y nunca se nos transmiten. Borrar los datos del sitio de este dominio en tu navegador los elimina todos.',
    storedConsent:
      'Tu respuesta a la pregunta sobre analítica se guarda del mismo modo, para que solo se te pregunte una vez. No registra nada más que la propia elección.',
    analyticsHeading: 'Analítica y cookies',
    analyticsOn: [
      'Con tu consentimiento, usamos Google Analytics para entender cómo se usa el sitio —qué páginas se visitan y con qué frecuencia— y saber así qué herramientas merece la pena mejorar. Se carga a través de un contenedor de Google Tag Manager y no se ejecuta hasta que lo permites. Si lo rechazas, no se instala ninguna cookie de analítica y no se recopila ningún dato.',
      'Cuando está activado, Google Analytics recopila datos web estándar: páginas vistas, ubicación aproximada derivada de tu dirección IP, sitio de procedencia e información general del dispositivo y del navegador. Instala cookies llamadas `_ga` y `_ga_*` para reconocer a los visitantes que regresan. Este tratamiento se describe en la [política de privacidad de Google](https://policies.google.com/privacy).',
      '**La analítica nunca recibe el contenido con el que trabajas.** Tu JSON no se incluye en ningún evento de analítica. También hemos desactivado las funciones publicitarias de Google, de modo que tu visita no se usa para remarketing, personalización de anuncios ni creación de audiencias.',
    ],
    analyticsOff:
      'Este sitio no carga actualmente ninguna analítica. No se instalan cookies de analítica, no se ejecuta ningún script de terceros y no hay nada que consentir.',
    analyticsNever:
      'No vendemos tus datos, y no usamos redes publicitarias, widgets de redes sociales, grabación de sesiones ni fingerprinting.',
    choicesHeading: 'Tus opciones',
    choicesLead: 'Puedes',
    choicesButton: 'consultar o cambiar esta preferencia',
    choicesRest:
      'en cualquier momento. El panel muestra qué ajuste está vigente y te permite cambiarlo; el enlace de analítica del pie de cada página abre ese mismo panel.',
    choicesImmediate:
      'Desactivarla surte efecto de inmediato, no en tu siguiente carga de página, y las cookies `_ga` se eliminan en ese mismo momento: no necesitas borrar los datos del sitio en tu navegador para deshacerte de ellas, aunque hacerlo también funciona. No se vuelve a contactar con Google en ninguna página posterior a menos que la reactives.',
    choicesUngated:
      'Todas las herramientas de este sitio funcionan igual aceptes o no la analítica. Nada queda condicionado a esa elección. Borrar los datos del sitio de este dominio en tu navegador elimina todo lo que UtilDock haya guardado, incluidos tu tema y tus entradas guardadas.',
    hostingHeading: 'Alojamiento',
    hosting:
      'UtilDock se sirve mediante Cloudflare Pages. Como cualquier alojamiento web, Cloudflare procesa las solicitudes de red necesarias para entregar una página y puede conservar datos técnicos limitados —dirección IP, agente de usuario, marcas de tiempo— por seguridad y prevención de abusos, conforme a la [política de privacidad de Cloudflare](https://www.cloudflare.com/privacypolicy/). Eso cubre las solicitudes de los propios archivos del sitio. Lo que pegas en una herramienta nunca forma parte de ninguna solicitud, así que nunca está en ningún registro.',
    securityHeading: 'Seguridad',
    security: [
      'El sitio se sirve por HTTPS con una Content-Security-Policy estricta que restringe qué orígenes pueden cargar código o recibir datos. Eso es lo que mantiene el compromiso de privacidad anterior como una propiedad de cómo está construido el sitio, y no como una promesa que simplemente tengas que creer. Puedes verificarlo: abre las herramientas de desarrollo de tu navegador, usa cualquier herramienta del sitio e inspecciona las solicitudes.',
      'Los problemas de seguridad pueden comunicarse a [security@utildock.dev](mailto:security@utildock.dev), o consulta nuestro [security.txt](/.well-known/security.txt).',
    ],
    childrenHeading: 'Privacidad de los menores',
    children:
      'UtilDock es una herramienta para desarrolladores y no está dirigida a menores. No recopilamos conscientemente información personal de nadie, incluidos los menores de 13 años.',
    changesHeading: 'Cambios en esta política',
    changes:
      'Si esta política cambia, la fecha de la parte superior de esta página cambia con ella. El compromiso de que los datos que pegas se quedan en tu navegador no es algo que tengamos intención de revisar.',
    contactHeading: 'Contacto',
    contact:
      'Las dudas sobre esta política pueden dirigirse a [security@utildock.dev](mailto:security@utildock.dev).',
  },

  toolAbout: {
    'json-formatter': [
      'Pega o suelta un documento en el panel de entrada y el resultado formateado aparece mientras escribes. Elige dos, tres o cuatro espacios, o tabuladores, según lo que use tu proyecto. Cambia a **Minificar** para eliminar hasta el último byte de espacio en blanco, que es lo que quieres antes de incrustar JSON en una variable de entorno o en una URL.',
      '**Ordenar claves** reescribe cada objeto con sus claves en orden alfabético. Dos documentos que solo difieren en el orden de las claves pasan a ser idénticos byte a byte, lo que hace que se comparen limpiamente en el control de versiones.',
      'El análisis se ejecuta en un Web Worker, así que incluso los documentos de varios megabytes se formatean sin que la página deje de responder mientras escribes.',
    ],
    'json-viewer': [
      'Pega un documento en el panel de origen y se convierte en un árbol navegable, con objetos y arrays plegables en todos los niveles y valores coloreados por tipo.',
      'El cuadro de filtro busca tanto en claves como en valores, y abre lo que haga falta para mostrarte una coincidencia. Pasa el cursor sobre cualquier fila para copiar la ruta completa hasta ese valor.',
      'Solo se renderizan las filas que están en pantalla, así que un documento con cientos de miles de nodos se desplaza con fluidez.',
    ],
    'json-validator': [
      'Cada error de sintaxis se informa con su línea y columna exactas, y se subraya en el editor donde ocurre. El analizador se detiene en el primer problema, así que corrige ese y aparecerá cualquier otro más abajo.',
      'Activa **Comprobar contra un esquema** y se abre un segundo panel para un JSON Schema. Cada infracción se lista con su ruta, y al hacer clic en una el editor salta hasta ella.',
      'Tanto el documento como el esquema se quedan en esta pestaña. Ninguno se sube, que es justo lo que importa cuando el esquema es interno y el documento es real.',
    ],
    'json-diff': [
      'Pega un documento en cada lado. La comparación es estructural, no textual: ambos documentos se analizan primero, así que las claves reordenadas, la sangría distinta y los espacios finales nunca cuentan como cambios.',
      'Los elementos de un array se emparejan por identidad cuando existe alguna —un campo **id**, **key**, **uuid** o **name**—, de modo que insertar un elemento al principio informa de una única adición en lugar de reescribir todo lo que viene después.',
      'Las rachas largas de líneas idénticas se pliegan, dejando los cambios con la estructura justa alrededor para situar cada uno. Alt + ↑ y Alt + ↓ recorren las diferencias.',
    ],
    'jwt-decoder': [
      'Pega un token —con o sin su prefijo `Bearer`— y se dividirá en sus tres partes, coloreadas para que veas dónde termina cada una. La cabecera y la carga útil se decodifican a JSON, y los claims se listan de nuevo en lenguaje claro, con `exp`, `nbf` e `iat` mostrados como fechas reales y como cuánto hace o cuánto falta.',
      '**Decodificar un JWT no es verificarlo.** Las dos primeras partes son base64url, no cifrado: cualquiera que tenga el token puede leerlas, y por eso un token nunca es sitio para guardar un secreto. Activa **Comprobar la firma** y pega el secreto compartido para un algoritmo HS, o una clave pública para uno RS, PS o ES, y la firma se comprueba de verdad — HS256/384/512, RS256/384/512, PS256/384/512 y ES256/384/512, usando la propia WebCrypto del navegador.',
      'La clave que pegas se trata de forma distinta a cualquier otra entrada de este sitio: nunca se escribe en `localStorage` ni se restaura al recargar. Nada de esto —ni el token ni la clave— se sube a ningún sitio, y no existe servidor que pudiera recibirlos.',
    ],
    'jwt-encoder': [
      'Escribe la cabecera y el payload como JSON, elige un algoritmo y el token se ensambla y se firma mientras escribes. Los **presets de caducidad** estampan `iat`, `exp` y opcionalmente `nbf` en el payload desde un mismo instante, de modo que los tres nunca puedan discrepar por un segundo — el tipo de cosa que solo falla dentro de la tolerancia de desfase de reloj de otra persona.',
      '`alg` siempre se escribe a partir del algoritmo que elegiste, diga lo que diga tu cabecera. No es una comodidad: una cabecera que declara un algoritmo sobre una firma hecha con otro es el punto de partida de la vulnerabilidad más conocida de JWT, y no hay ningún token legítimo que esta herramienta se niegue a crear por ello. Cualquier otro campo de cabecera que escribas se conserva exactamente como lo escribiste.',
      'Los secretos HS más cortos que el hash se **rechazan por defecto** — la RFC 7518 exige 32 bytes para HS256, 48 para HS384 y 64 para HS512, y un navegador firmará con cuatro caracteres tan tranquilo aunque el resultado se pueda romper sin conexión en segundos. La comprobación se puede desactivar, porque reproducir un token débil es a veces justo lo que se busca.',
      'La clave de firma se trata como el decodificador trata su clave de verificación, y aún con más cuidado: nunca se escribe en `localStorage`, nunca se restaura al recargar, nunca aparece en un evento de analítica, y no hay backend que pudiera recibirla. Una clave de firma es el secreto más peligroso de un sistema que usa JWT, así que para una clave de producción sigue siendo mejor costumbre acuñar los tokens en tu propio entorno.',
    ],
    'text-counter': [
      'Pega o escribe en el panel y todos los recuentos se actualizan a la vez: palabras, caracteres con y sin espacios, frases, párrafos, líneas y bytes UTF-8. No hay que pulsar nada.',
      'El recuento usa la **segmentación de texto Unicode** del propio navegador en lugar de dividir por espacios, y la diferencia no es académica. El japonés y el chino no separan las palabras con espacios, así que dividir por espacios convierte un párrafo entero en una sola palabra; esa misma división parte «l’objet» en dos. La segmentación sabe dónde empiezan y acaban las palabras de verdad en todos los alfabetos en los que se publica el sitio, y el tiempo de lectura para CJK se mide en caracteres por minuto en vez de en palabras.',
      'El panel de **límites** sigue los topes contra los que la gente escribe de verdad — una publicación de 280 caracteres, un SMS de 160, un título de página de 60, una meta descripción de 155 — y la tabla de frecuencia muestra en qué palabras te apoyaste, que es la forma más rápida de pillarte repitiendo una.',
    ],
    'text-formatter': [
      'Cada operación es un interruptor, y nada se ejecuta hasta que lo activas. Contrae espacios repetidos, elimina espacios al final de línea, quita líneas en blanco o duplicadas, ordena líneas, cambia mayúsculas y minúsculas, o arregla la puntuación de la prosa en inglés — en cualquier combinación. El resultado aparece junto a la entrada mientras escribes, y **Reemplazar entrada** lo devuelve al principio para que puedas hacer otra pasada.',
      'La herramienta informa de lo que cambió cada interruptor — «12 líneas duplicadas eliminadas», «3 palabras repetidas» — en lugar de devolverte un documento reescrito y dejarte a ti detectar la diferencia. Así, una regla que se activó cuando no debía queda a la vista en vez de enterrada.',
      '**No corrige la gramática, y no pretende hacerlo.** La concordancia, el tiempo verbal y la elección de artículo necesitan o un servidor o un modelo de lenguaje en WebAssembly; este sitio no tiene backend, y su Content-Security-Policy no permite WebAssembly. Lo que hay en su lugar es la capa mecánica — palabras repetidas, espaciado alrededor de la puntuación, comillas rectas, mayúsculas — donde la respuesta correcta es una regla y no un juicio. Esas cuatro siguen la convención tipográfica inglesa y vienen desactivadas, ya que el francés espacia la puntuación de otra manera y el CJK no la espacia en absoluto.',
    ],
  },

  islands: {
    common: {
      load: 'Cargar',
      loadTitle: 'Leer un archivo local: se lee en esta máquina, nunca se sube',
      sample: 'Ejemplo',
      sampleTitle: 'Cargar un documento de ejemplo',
      clear: 'Limpiar',
      copy: 'Copiar',
      copied: 'Copiado',
      copyTitle: 'Copiar al portapapeles',
      download: 'Descargar',
      dropHere: 'Suelta el material aquí',
      path: 'ruta',
      pathCopied: 'copiada',
      copyPathTitle: 'Copiar la ruta — {path}',
      validJson: 'JSON válido',
      errorAt: 'Línea {line}, columna {column} — {message}',
      stats: '{objects} objetos · {arrays} arrays · {keys} claves · profundidad {depth}',
      removeNulls: 'Quitar nulos',
      removeNullsTitle:
        'Elimina toda propiedad de objeto cuyo valor sea null. Los null dentro de arrays se dejan intactos: quitar uno desplazaría todos los índices siguientes.',
      nullsRemoved: p({ one: '{count} nulo quitado', other: '{count} nulos quitados' }),
    },

    formatter: {
      inputTitle: 'Entrada',
      formattedTitle: 'Formateado',
      minifiedTitle: 'Minificado',
      inputLabel: 'Entrada JSON',
      outputLabel: 'Salida JSON formateada',
      placeholder: '{\n  "pega": "aquí tu JSON"\n}',
      idle: 'Pega o suelta JSON para empezar',
      indent: 'Sangría',
      spaces: '{count} espacios',
      tab: 'Tabulador',
      sortKeys: 'Ordenar claves',
      sortKeysTitle: 'Ordenar alfabéticamente las claves de los objetos',
      pretty: 'Formatear',
      minify: 'Minificar',
      sameSize: 'mismo tamaño',
      sizeDelta: '{delta} % de escoria retirada',
      prettyFile: 'formateado.json',
      minifiedFile: 'minificado.json',
    },

    viewer: {
      sourceTitle: 'Origen',
      treeTitle: 'Árbol',
      sourceLabel: 'Origen JSON',
      placeholder: '{\n  "pega": "el JSON que quieres explorar"\n}',
      idle: 'Pega o suelta JSON para explorarlo',
      filter: 'Filtrar claves y valores',
      filterAria: 'Filtrar el árbol',
      expandAll: 'Expandir todo',
      expandAllTitle: 'Expandir todos los nodos',
      collapse: 'Plegar',
      collapseTitle: 'Plegar hasta la raíz',
      expand: 'Expandir',
      treeAria: 'Árbol JSON',
      nothingYet: 'Todavía no hay nada que mostrar',
      matching: p({
        one: '{count} nodo coincidente',
        other: '{count} nodos coincidentes',
      }),
      rowsShown: '{count} filas mostradas',
      noFilterMatch: 'Ninguna clave ni valor coincide con ese filtro.',
      emptyValid: 'El árbol aparece aquí en cuanto el panel Origen contenga JSON válido.',
      emptyError: 'Corrige el error de sintaxis en el panel Origen y el árbol aparecerá aquí.',
    },

    validator: {
      documentTitle: 'Documento',
      schemaTitle: 'JSON Schema',
      resultTitle: 'Resultado',
      documentLabel: 'Documento JSON que validar',
      placeholder: '{\n  "pega": "el JSON que quieres comprobar"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: 'Con errores',
      brokenTitle: 'Cargar un documento con errores de sintaxis deliberados',
      sampleValidTitle: 'Cargar un ejemplo válido',
      useSchema: 'Comprobar contra un esquema',
      useSchemaTitle: 'Comprobar además el documento contra un JSON Schema',
      idle: 'Pega o suelta JSON para validarlo',
      checking: 'Comprobando…',
      invalidAt: 'JSON no válido — línea {line}, columna {column}: {message}',
      schemaViolations: p({
        one: 'JSON válido, pero {count} infracción del esquema',
        other: 'JSON válido, pero {count} infracciones del esquema',
      }),
      validAndMatches: 'JSON válido y conforme al esquema',
      emptyBody:
        'Pega un documento en el panel Documento. Se comprueba mientras escribes, enteramente en esta pestaña.',
      firstProblem:
        'El analizador se detiene en el primer problema que encuentra. Corrige este y aparecerán los errores que haya más abajo en el documento.',
      okSchema: 'El documento es JSON válido y cumple todas las reglas del esquema.',
      okPlain: 'El documento es JSON válido.',
      atLine: 'L{line}',
    },

    diff: {
      firstTitle: 'JSON 1',
      secondTitle: 'JSON 2',
      firstLabel: 'Primer documento JSON',
      secondLabel: 'Segundo documento JSON',
      firstPlaceholder: '{\n  "pega": "el primer documento"\n}',
      secondPlaceholder: '{\n  "pega": "el segundo documento"\n}',
      swap: 'Intercambiar',
      swapTitle: 'Intercambiar los dos lados',
      tidy: 'Ordenar',
      tidyTitle: 'Volver a indentar ambos documentos con los ajustes de al lado',
      tidyOne: 'Ordenar este documento',
      autoTidy: 'Ordenar al pegar',
      autoTidyTitle:
        'Reindenta un documento en cuanto se pega, se suelta o se carga. Lo que escribes nunca se reformatea por debajo.',
      foldSame: 'Plegar iguales',
      foldSameTitle: 'Plegar las rachas largas de líneas idénticas en una sola fila',
      showAll: 'Mostrar todo',
      showAllTitle: 'Mostrar todas las líneas idénticas en lugar de plegarlas',
      prev: 'Diferencia anterior',
      next: 'Diferencia siguiente',
      prevTitle: 'Diferencia anterior (Mayús + F7)',
      nextTitle: 'Diferencia siguiente (F7)',
      keyboardHint: 'F7 / Mayús + F7 recorre las diferencias',
      applyRight: 'Copiar a JSON 2',
      applyRightTitle: 'Copiar este bloque a JSON 2',
      applyLeft: 'Copiar a JSON 1',
      applyLeftTitle: 'Copiar este bloque a JSON 1',
      truncated: 'Comparación truncada: los documentos son muy grandes',
      onlyFirst: 'solo en JSON 1',
      onlySecond: 'solo en JSON 2',
      idle: 'Pega un documento en cada lado, o pulsa **Ejemplo** para probarlo con un par que difiere de unas cuantas maneras interesantes. Los dos lados siguen siendo editables, y las flechas del centro copian un bloque en cualquier dirección.',
      identicalBody:
        'Los dos documentos son equivalentes. Todos los valores coinciden, y las diferencias de orden de claves, indentación y espacios se ignoran porque ninguna cambia lo que significa el JSON.',
      formattingOnly:
        'Los mismos datos escritos de otra forma: todos los valores coinciden, así que lo que ves marcado es formato u orden de claves. Alinea los dos lados para limpiarlo.',
      alignSides: 'Alinear',
      alignSidesTitle:
        'Ordenar las claves de ambos documentos y reindentarlos, para que solo queden marcadas las diferencias reales',
      tallyTitle: '{kind} en los datos mismos, diga lo que diga el formato',
      kinds: {
        added: 'añadido',
        removed: 'eliminado',
        changed: 'modificado',
        moved: 'movido',
      },
    },

    jwt: {
      tokenTitle: 'Token',
      tokenLabel: 'JSON Web Token que decodificar',
      placeholder: 'Pega un JSON Web Token — tres partes separadas por puntos',
      idle: 'Pega un token para leerlo',
      decoded: 'Decodificado',

      segHeader: 'Cabecera',
      segPayload: 'Carga útil',
      segSignature: 'Firma',
      segChars: p({ one: '{count} carácter', other: '{count} caracteres' }),

      sampleTitle: 'Cargar un token de ejemplo realmente firmado',
      expired: 'Caducado',
      expiredTitle: 'Cargar un token cuya caducidad ya ha pasado',

      faults: {
        'not-a-token':
          'Eso no es un JSON Web Token. Un JWT son tres partes en base64url unidas por puntos.',
        encrypted:
          'Esto es un token cifrado (un JWE: cinco partes, no tres). Su contenido no puede leerse sin la clave de descifrado, ni con esta herramienta ni con ninguna otra.',
        'too-few-parts':
          'Un JWT tiene tres partes unidas por puntos. Este tiene menos, así que le falta algo.',
        'too-many-parts':
          'Esto tiene más partes separadas por puntos de las que puede tener un JWT o un JWE.',
        'bad-base64':
          'Esta parte no es base64url válido, así que no puede decodificarse. Lo habitual es que el token esté truncado.',
        'bad-json': 'Esta parte se decodificó, pero lo que salió no es JSON.',
        'not-an-object':
          'Esta parte es JSON, pero la cabecera y la carga útil de un token deben ser objetos.',
      },

      headerTitle: 'Cabecera',
      payloadTitle: 'Carga útil',
      headerLabel: 'Cabecera decodificada',
      payloadLabel: 'Carga útil decodificada',
      algorithm: 'Algoritmo',
      keyId: 'ID de clave',
      tokenType: 'Tipo',

      claimsTitle: 'Claims',
      registeredHeading: 'Claims registrados',
      customHeading: 'Claims personalizados',
      noClaims: 'Pega un token en el panel Token y sus claims aparecerán aquí, en lenguaje claro.',
      noCustomClaims: 'Este token no lleva nada más allá de los claims registrados.',
      noRegisteredClaims:
        'Este token no lleva ninguno de los claims registrados, ni siquiera una caducidad.',

      claimNames: {
        iss: 'Emisor',
        sub: 'Sujeto',
        aud: 'Destinatario',
        exp: 'Caduca',
        nbf: 'No antes de',
        iat: 'Emitido',
        jti: 'ID del token',
      },
      claimHints: {
        iss: 'Quién emitió este token',
        sub: 'Sobre quién o qué trata',
        aud: 'Quién debe aceptarlo',
        exp: 'A partir de este momento debe rechazarse',
        nbf: 'Antes de este momento debe rechazarse',
        iat: 'Cuándo se emitió',
        jti: 'Su identificador único, usado para revocación',
      },

      windowExpired: 'Caducado',
      windowNotYet: 'Todavía no es válido',
      windowValid: 'Dentro de su periodo de validez',
      windowUnbounded: 'Sin caducidad — este token nunca deja de aceptarse',

      signatureTitle: 'Firma',
      decodeNotVerify:
        'Un JWT está **codificado, no cifrado**: cualquiera que tenga este token puede leer todo lo de arriba sin ninguna clave. Solo comprobar la firma te dice que es auténtico y que no ha sido alterado.',
      verify: 'Comprobar la firma',
      verifyTitle: 'Comprobar la firma con una clave, aquí en esta pestaña',
      secretLabel: 'Secreto compartido',
      secretPlaceholder: 'El secreto con el que se firmó este token',
      keyLabel: 'Clave pública',
      keyPlaceholder: 'Una clave pública PEM, un JWK, o un JWKS completo',
      keyAria: 'Clave de verificación',
      base64Secret: 'El secreto es base64url',
      base64SecretTitle:
        'Decodificar el secreto desde base64url antes de usarlo como material de clave',
      keyNeverStored:
        'La clave se usa y se descarta: nunca se guarda en este navegador ni se envía a ninguna parte.',
      sampleSecretHint: 'El token de ejemplo está firmado con `{secret}`.',
      checking: 'Comprobando…',
      notChecked: 'Sin comprobar',

      verdicts: {
        valid: 'Firma verificada',
        invalid: 'La firma no coincide con esa clave',
        unsecured:
          'Token sin protección: su `alg` es `none`, así que no lleva firma y no demuestra nada. La mayoría de las bibliotecas los rechazan directamente.',
        unsupported: '{algorithm} no es un algoritmo que esta herramienta pueda comprobar.',
        'bad-key':
          'No se pudo leer esa clave. Usa un bloque PEM que empiece por `BEGIN PUBLIC KEY`, un JWK o un JWKS.',
        'no-key': 'Introduce una clave y la firma se comprobará mientras escribes.',
        'no-signature': 'Este token no tiene parte de firma, así que no hay nada que comprobar.',
        'kid-mismatch':
          'Ninguna clave de ese conjunto coincide con el `kid` de este token, así que no hay con qué comprobarlo.',
        error: 'No se pudo comprobar la firma en este navegador.',
      },
    },
    jwtEncoder: {
      headerTitle: 'Cabecera',
      payloadTitle: 'Payload',
      tokenTitle: 'Token firmado',
      headerLabel: 'Cabecera del JWT como JSON',
      payloadLabel: 'Payload del JWT como JSON',
      tokenLabel: 'El token firmado',
      headerPlaceholder: '{\n  "kid": "tu-id-de-clave"\n}',
      payloadPlaceholder: '{\n  "sub": "user_123",\n  "name": "Ada Lovelace"\n}',

      algorithm: 'Algoritmo',
      algorithmTitle: 'Cómo se firmará este token — también se escribe en la cabecera',
      unsecured: 'none — sin firmar',
      unsecuredWarning:
        'Este es un **token no asegurado**: su `alg` es `none`, no lleva firma y no demuestra nada. La mayoría de las bibliotecas los rechazan de plano. Solo sirve para comprobar que la tuya también lo hace.',

      signingTitle: 'Clave de firma',
      secretLabel: 'Secreto compartido',
      secretPlaceholder: 'El secreto con el que firmar este token',
      keyLabel: 'Clave privada',
      keyPlaceholder: 'Una clave privada PKCS#8, o un JWK privado',
      keyAria: 'Clave de firma',
      base64Secret: 'El secreto es base64url',
      base64SecretTitle: 'Decodificar el secreto desde base64url antes de usarlo como material de clave',
      keyNeverStored:
        'La clave se usa y se descarta: nunca se guarda en este navegador ni se envía a ninguna parte.',
      keyIsDangerous:
        'Una clave de firma acuña tokens que tus sistemas aceptarán. Para una clave de producción, mejor tu propio entorno.',
      allowWeak: 'Permitir un secreto corto',
      allowWeakTitle:
        'Firmar aunque el secreto sea más corto de lo que exige la RFC 7518 — para reproducir un token débil',
      sampleSecretHint: 'El ejemplo se firma con `{secret}`.',

      claimsTitle: 'Claims de tiempo',
      stamp: 'Estampar',
      stampTitle: 'Escribir iat, exp y nbf en el payload a partir de este momento',
      expiresIn: 'Caduca en',
      includeNotBefore: 'Añadir también nbf',
      includeNotBeforeTitle: 'Añadir una claim «no antes de», fijada a ahora',
      expiryPresets: {
        '15m': '15 minutos',
        '1h': '1 hora',
        '24h': '24 horas',
        '7d': '7 días',
        '30d': '30 días',
      },
      stamped: 'iat y exp estampados en el payload',

      segHeader: 'Cabecera',
      segPayload: 'Payload',
      segSignature: 'Firma',
      segChars: p({ one: '{count} carácter', other: '{count} caracteres' }),

      idle: 'Escribe un payload y elige una clave para acuñar un token',
      signing: 'Firmando…',
      signed: 'Token firmado',
      signedUnsecured: 'Token no asegurado creado — no lleva firma',
      tokenFile: 'token.jwt',
      emptyToken:
        'Aquí aparece el token firmado. No se sube nada para producirlo: la firma la calcula este navegador.',

      faults: {
        'bad-header-json': 'La cabecera no es JSON válido, así que todavía no hay nada que codificar.',
        'bad-payload-json': 'El payload no es JSON válido, así que todavía no hay nada que codificar.',
        'header-not-object':
          'La cabecera de un token debe ser un objeto JSON, no un array ni un valor suelto.',
        'payload-not-object':
          'El payload de un token debe ser un objeto JSON, no un array ni un valor suelto.',
        unsupported: 'Ese no es un algoritmo con el que esta herramienta pueda firmar.',
        'no-key': 'Introduce una clave y el token se firma mientras escribes.',
        'bad-key':
          'No se pudo leer esa clave. Usa un bloque PEM que empiece por `BEGIN PRIVATE KEY`, o un JWK privado — el que lleva un valor `d`.',
        'weak-secret':
          '{algorithm} exige un secreto de al menos {required} bytes; este tiene {actual}. Un secreto más corto puede romperse sin conexión. Activa **Permitir un secreto corto** para firmar igualmente.',
        error: 'No se pudo firmar el token en este navegador.',
      },
    },

    counter: {
      inputTitle: 'Texto',
      inputLabel: 'Texto para contar',
      placeholder: 'Pega o escribe el texto que quieras medir…',
      idle: 'Pega o escribe texto para contarlo',
      counting: 'Contando…',

      countsTitle: 'Recuentos',
      words: 'Palabras',
      characters: 'Caracteres',
      charactersNoSpaces: 'Sin espacios',
      sentences: 'Frases',
      paragraphs: 'Párrafos',
      lines: 'Líneas',
      bytes: 'Bytes UTF-8',

      timeTitle: 'Tiempo de lectura',
      readingTime: 'Leyendo',
      speakingTime: 'Leyendo en voz alta',
      underAMinute: 'menos de un minuto',
      minutesAndSeconds: '{minutes} min {seconds} s',
      justSeconds: '{seconds} s',

      averagesTitle: 'Promedios',
      averageWordLength: 'Longitud de palabra',
      averageSentenceLength: 'Palabras por frase',
      longestWord: 'Palabra más larga',
      charsUnit: p({ one: '{count} carácter', other: '{count} caracteres' }),
      wordsUnit: p({ one: '{count} palabra', other: '{count} palabras' }),

      limitsTitle: 'Límites',
      limitNames: {
        tweet: 'Publicación (X)',
        sms: 'SMS',
        'page-title': 'Título de página',
        'meta-description': 'Meta descripción',
      },
      remaining: 'quedan {count}',
      over: '{count} de más',
      limitsNote:
        'Los dos límites de SEO son aproximaciones: los buscadores recortan por anchura, no por caracteres.',

      frequencyTitle: 'Palabras más usadas',
      frequencyEmpty: 'Las palabras que más uses aparecen aquí en cuanto haya texto que contar.',
      frequencyCount: p({ one: '{count} vez', other: '{count} veces' }),

      emptyBody:
        'Pega texto en el panel de la izquierda. Todos los recuentos se actualizan mientras escribes, enteramente en esta pestaña.',
      impreciseNotice:
        'Este navegador no tiene segmentación de texto Unicode, así que las palabras se cuentan dividiendo por espacios. La cifra será incorrecta para chino, japonés y coreano.',
      cjkNotice:
        'Contado como CJK: las palabras se segmentan en lugar de dividirse por espacios, y el tiempo de lectura se mide en caracteres por minuto.',
    },

    textFormatter: {
      inputTitle: 'Entrada',
      outputTitle: 'Formateado',
      optionsTitle: 'Qué arreglar',
      inputLabel: 'Texto para formatear',
      outputLabel: 'Texto formateado',
      placeholder: 'Pega el texto que quieras ordenar…',
      idle: 'Pega texto y elige qué arreglar',
      formatting: 'Formateando…',

      whitespaceHeading: 'Espacios',
      trimLineEnds: 'Espacios finales',
      trimLineEndsTitle: 'Eliminar espacios y tabulaciones al final de cada línea',
      collapseSpaces: 'Espacios repetidos',
      collapseSpacesTitle:
        'Contraer series de espacios o tabulaciones en uno solo, manteniendo la sangría',
      collapseBlankLines: 'Líneas en blanco de más',
      collapseBlankLinesTitle: 'Contraer dos o más líneas en blanco en una',
      removeBlankLines: 'Todas las líneas en blanco',
      removeBlankLinesTitle: 'Eliminar todas las líneas en blanco',
      trimDocument: 'Principio y final',
      trimDocumentTitle: 'Recortar los espacios del principio y del final del documento',
      tabsToSpaces: 'Tabulaciones a espacios',
      tabsToSpacesTitle: 'Sustituir cada tabulación por dos espacios',

      linesHeading: 'Líneas',
      removeDuplicateLines: 'Líneas duplicadas',
      removeDuplicateLinesTitle:
        'Conservar la primera aparición de cada línea; las líneas en blanco se mantienen',
      sortLines: 'Ordenar',
      sortModes: {
        none: 'No ordenar',
        asc: 'De la A a la Z',
        desc: 'De la Z a la A',
      },

      caseHeading: 'Mayúsculas',
      caseModes: {
        none: 'Dejar como está',
        lower: 'minúsculas',
        upper: 'MAYÚSCULAS',
        title: 'Tipo Título',
        sentence: 'Tipo frase',
      },

      writingHeading: 'Puntuación',
      fixRepeatedWords: 'Palabras repetidas',
      fixRepeatedWordsTitle: 'Contraer una palabra duplicada por accidente, como «de de»',
      spaceAfterPunctuation: 'Espacio tras la puntuación',
      spaceAfterPunctuationTitle:
        'Añadir el espacio que falta tras una coma o un punto — nunca dentro de números, URL o e.g.',
      removeSpaceBeforePunctuation: 'Espacio antes de la puntuación',
      removeSpaceBeforePunctuationTitle:
        'Eliminar el espacio dejado antes de una coma, un punto o dos puntos',
      smartQuotes: 'Comillas tipográficas',
      smartQuotesTitle:
        'Convertir las comillas rectas en tipográficas; lo que va entre acentos graves se omite',


      changesTitle: 'Qué cambió',
      noChanges: 'No hacía falta cambiar nada.',
      nothingEnabled: 'Activa al menos una opción y el resultado aparecerá aquí.',
      replaceInput: 'Reemplazar entrada',
      replaceInputTitle: 'Poner el resultado en la entrada para hacer otra pasada',
      reset: 'Restablecer',
      resetTitle: 'Devolver todos los interruptores a su valor por defecto',
      outputFile: 'texto-formateado.txt',
      emptyBody:
        'Aquí aparece el texto ordenado. No se sube nada: cada transformación se ejecuta en esta pestaña.',
    },
  },
};
