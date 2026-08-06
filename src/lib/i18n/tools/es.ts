import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesEs: CategoryCopyOverrides = {
  json: {
    blurb: 'Lee, comprueba, compara y transforma JSON sin salir de la página.',
  },
  jwt: {
    blurb: 'Inspecciona y verifica tokens. Próximamente.',
  },
};

/**
 * Spanish names put the format after the noun — "Formateador JSON", not "JSON
 * Formateador" — which is also the word order people type into a search box.
 * `splitName` finds no category prefix in these and renders the name whole,
 * which is the correct outcome rather than a fallback.
 */
export const toolsEs: ToolCopyOverrides = {
  'json-formatter': {
    name: 'Formateador JSON',
    tagline: 'Formatea una respuesta ilegible, o minifícala',
    does: ['Formatear', 'Minificar a una línea', 'Ordenar claves', 'Sangría 2 / 4 / tab'],
    title: 'Formateador JSON — formatear y minificar',
    description:
      'Formateador y minificador JSON gratuito. Formatea con cualquier sangría, compacta a una línea u ordena las claves. Se ejecuta en tu navegador.',
    overview:
      'Un formateador y minificador JSON en uno. Formatea con dos, tres o cuatro espacios o con tabuladores, compacta el documento de vuelta a una sola línea, u ordena alfabéticamente las claves de cada objeto para que dos archivos se comparen limpiamente en el control de versiones. El resultado se actualiza mientras escribes, y el documento nunca se sube.',
    faqs: [
      {
        q: '¿Cuál es la diferencia entre formatear y minificar JSON?',
        a: 'Formatear añade sangría y saltos de línea para que la estructura sea legible. Minificar elimina hasta el último byte de espacio en blanco opcional, que es lo que quieres antes de poner JSON en una variable de entorno, en una URL o de enviarlo por la red. Ambos producen los mismos datos.',
      },
      {
        q: '¿Para qué querría ordenar las claves?',
        a: 'Dos documentos que describen lo mismo pero listan sus claves en distinto orden producen una comparación de texto ruidosa. Ordenar las claves alfabéticamente los deja idénticos byte a byte allí donde coinciden, así que en el control de versiones solo aparecen los cambios reales.',
      },
      {
        q: '¿Puede con archivos muy grandes?',
        a: 'Sí. El análisis y el formateo se ejecutan en un Web Worker, así que documentos de varios megabytes se reformatean sin que la página deje de responder mientras escribes.',
      },
      {
        q: '¿Se sube mi JSON a un servidor?',
        a: 'Nunca. El formateador es JavaScript ejecutándose en tu propia pestaña y no hay ningún backend al que enviar nada. Sigue funcionando con la red desconectada.',
      },
    ],
    keywords: [
      'formateador json',
      'formatear json online',
      'json formatter español',
      'minificar json',
      'embellecer json',
    ],
  },

  'json-viewer': {
    name: 'Visor JSON',
    tagline: 'Explora una carga útil demasiado grande para recorrerla a mano',
    does: [
      'Árbol plegable',
      'Buscar claves y valores',
      'Copiar cualquier ruta',
      'Aguanta 100 000+ nodos',
    ],
    title: 'Visor JSON — árbol plegable con búsqueda',
    description:
      'Visor JSON gratuito. Explora cualquier documento como un árbol plegable, busca claves y valores y copia rutas. Se ejecuta en tu navegador.',
    overview:
      'Un visor JSON que convierte un muro de texto en una estructura que puedes leer. Pega una respuesta de API, un archivo de configuración o una línea de log y explóralo como un árbol plegable: coloreado por tipo, con búsqueda por clave o valor, y con cada ruta a un clic de tu portapapeles. No se sube nada: el documento se analiza en esta pestaña.',
    faqs: [
      {
        q: '¿Es seguro pegar datos de producción en este visor JSON?',
        a: 'Sí. El documento nunca sale de tu navegador. No hay subida, ni análisis en el servidor, ni ninguna solicitud que lleve tus datos: puedes desconectarte de la red y el visor sigue funcionando. Abre el panel de Red de tu navegador mientras lo usas y no verás que se envíe nada desde el editor.',
      },
      {
        q: '¿Qué tamaño de archivo JSON puede abrir?',
        a: 'Los documentos de varios megabytes no son problema. El análisis se ejecuta en un Web Worker, así que la página nunca se congela, y solo se renderizan las filas del árbol que están en pantalla, de modo que documentos con cientos de miles de nodos se desplazan con fluidez.',
      },
      {
        q: '¿Cómo copio la ruta hasta un valor?',
        a: 'Pasa el cursor por cualquier fila y haz clic en el botón de ruta. Obtienes la ruta completa hasta ese valor, lista para pegar en tu código o en una expresión jq.',
      },
      {
        q: '¿Cuesta algo o hace falta una cuenta?',
        a: 'No. Todas las herramientas de UtilDock son gratuitas, sin anuncios, sin registro y sin límite de uso.',
      },
    ],
    keywords: ['visor json', 'ver json online', 'json viewer español', 'explorador json'],
  },

  'json-validator': {
    name: 'Validador JSON',
    tagline: 'Encuentra la línea exacta que algo está rechazando',
    does: ['Línea y columna exactas', 'JSON Schema 2020-12 / 2019-09 / 07', 'Saltar a cada error'],
    title: 'Validador JSON — errores de sintaxis y esquema',
    description:
      'Validador JSON gratuito. Línea y columna exactas de cualquier error de sintaxis, más validación con JSON Schema. Se ejecuta en tu navegador.',
    overview:
      'Un validador JSON que te dice dónde está el problema, no solo que lo hay. Cada error de sintaxis se informa con su línea y columna exactas y se subraya en el editor. Activa la comprobación de esquema y también se valida la forma de tus datos, contra JSON Schema draft 2020-12, 2019-09 o 07. Tanto el documento como el esquema se quedan en esta pestaña.',
    faqs: [
      {
        q: '¿Por qué mi JSON no es válido si parece correcto?',
        a: 'Las causas habituales son una coma sobrante tras el último elemento, claves o cadenas entre comillas simples en lugar de dobles, un salto de línea o una barra invertida sin escapar dentro de una cadena, o algún comentario perdido: JSON no admite nada de eso. El validador señala la línea y la columna exactas para que veas cuál es.',
      },
      {
        q: '¿Qué drafts de JSON Schema se admiten?',
        a: 'Los drafts 2020-12, 2019-09 y 07, incluidas las palabras clave de formato estándar como date-time, email y uri. Cada infracción se lista con su ruta, y al hacer clic en una se salta hasta ella en el documento.',
      },
      {
        q: '¿Se envían mis datos o mi esquema a alguna parte?',
        a: 'No. La validación se ejecuta como JavaScript en tu propia pestaña, así que una carga útil de producción o un esquema interno nunca salen de tu máquina. No hay ningún servidor que pudiera recibirlos.',
      },
      {
        q: '¿Puede validar JSON Lines o JSON con comentarios?',
        a: 'Todavía no: el validador comprueba JSON estricto según RFC 8259, que es lo que aceptan la mayoría de analizadores y APIs. La compatibilidad con JSONC y NDJSON está en la lista.',
      },
    ],
    keywords: [
      'validador json',
      'validar json online',
      'json schema validator',
      'comprobar sintaxis json',
    ],
  },

  'json-diff': {
    name: 'Comparador JSON',
    tagline: 'Ve qué cambió de verdad entre dos documentos',
    does: [
      'Comparación estructural',
      'Ignora el orden de claves',
      'Empareja elementos por id',
      'Lado a lado',
    ],
    title: 'Comparar JSON — diferencias entre dos documentos',
    description:
      'Comparador JSON gratuito. Compara dos documentos lado a lado con adiciones, eliminaciones y cambios en color. Se ejecuta en tu navegador.',
    overview:
      'Un comparador JSON que muestra la diferencia en lugar de enumerarla. Los dos documentos se dibujan como una única vista alineada: el rojo marca lo que solo tiene el original, el verde lo que solo tiene el modificado, y una flecha señala cada valor reemplazado. Como la comparación es estructural y no textual, las claves reordenadas y la sangría distinta nunca cuentan como cambios.',
    faqs: [
      {
        q: '¿Qué diferencia hay entre comparar JSON y comparar texto?',
        a: 'Una comparación de texto compara caracteres, así que reformatear un archivo o reordenar sus claves aparece como cientos de cambios. Esta herramienta analiza primero ambos documentos y compara valores, de modo que solo se informan las diferencias que cambian lo que el JSON significa.',
      },
      {
        q: '¿Cómo se comparan los arrays?',
        a: 'Los elementos se emparejan por identidad cuando existe alguna: un campo id, key, uuid o name. Por eso insertar un elemento al principio informa de una sola adición en lugar de reescribir todos los elementos siguientes, y los elementos que solo se han movido se informan como movimientos.',
      },
      {
        q: '¿El orden de las claves o el formato afectan al resultado?',
        a: 'No. El orden de las claves, la sangría y los espacios finales se ignoran. Dos documentos que solo difieren en el formato se comparan como idénticos.',
      },
      {
        q: '¿Se suben los dos documentos a alguna parte?',
        a: 'No. Ambos se analizan y se comparan en un Web Worker dentro de esta pestaña. No se envía nada a ningún servidor, lo que importa cuando estás comparando dos cargas útiles de producción.',
      },
    ],
    keywords: [
      'comparar json',
      'comparador json',
      'json diff online',
      'diferencias entre dos json',
    ],
  },

  'jwt-decoder': {
    name: 'Decodificador JWT',
    tagline: 'Decodifica e inspecciona las claims de un token',
    does: ['Cabecera y payload', 'Caducidad y claims', 'Comprobación de firma'],
    title: 'Decodificador JWT',
    description:
      'Decodifica un JSON Web Token e inspecciona su cabecera, su payload y sus claims.',
    keywords: ['decodificador jwt', 'decodificar jwt', 'jwt decoder español'],
  },
};
