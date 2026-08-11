import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesEs: CategoryCopyOverrides = {
  json: {
    blurb: 'Lee, comprueba, compara y transforma JSON sin salir de la página.',
  },
  jwt: {
    blurb: 'Lee lo que declara un token y comprueba que de verdad está firmado.',
  },
  text: {
    name: 'Texto',
    blurb: 'Mide un escrito y déjalo ordenado.',
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
      'formateador json gratis',
      'formatear json sin subir archivos',
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
    keywords: [
      'visor json',
      'ver json online',
      'json viewer español',
      'explorador json',
      'visor json online gratis',
      'ver json grande online',
    ],
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
      'validador json online gratis',
      'validador de json schema online',
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
      'Un comparador JSON en el que puedes editar. Los dos documentos se colocan uno al lado del otro como editores vivos con la diferencia dibujada entre ellos: el rojo marca lo que solo tiene JSON 1, el verde lo que solo tiene JSON 2, y las flechas del centro copian un bloque en cualquier dirección, así que puedes reconciliar el par mientras lo lees. Ningún lado es la referencia. Y como el veredicto es estructural y no textual, las claves reordenadas y la sangría distinta nunca cuentan como cambios.',
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
      'comparar dos archivos json',
      'json diff gratis',
    ],
  },

  'jwt-decoder': {
    name: 'Decodificador JWT',
    tagline: 'Lee las claims de un token y demuestra su firma',
    does: [
      'Cabecera y payload',
      'Caducidad en lenguaje claro',
      'Comprobación de firma',
      'Secreto o clave pública',
    ],
    title: 'Decodificador JWT — decodifica y verifica',
    description:
      'Decodificador JWT gratuito. Lee la cabecera, el payload y la caducidad de un JSON Web Token, y verifica su firma. Ni el token ni la clave salen de tu navegador.',
    overview:
      'Un decodificador de JWT que divide un token en sus tres partes, decodifica la cabecera y el payload, y lista cada claim en lenguaje claro — con la caducidad, el «no antes de» y la fecha de emisión mostrados como fechas reales en lugar de segundos desde la época. También verifica la firma: pega el secreto compartido para un algoritmo HS o una clave pública para RS, PS o ES, y la comprobación se ejecuta sobre la propia WebCrypto de tu navegador. Ni el token ni la clave se suben nunca, y la clave ni siquiera se guarda en este navegador.',
    faqs: [
      {
        q: '¿Es seguro pegar un JWT real en este decodificador?',
        a: 'Sí. El token lo decodifica JavaScript en tu propia pestaña y no hay backend al que enviarlo: desconéctate de la red y el decodificador sigue funcionando. Con los JWT esto importa más que con casi cualquier otro dato, porque un token es una credencial viva, y pegarlo en un sitio que lo envía a un servidor entrega todo lo que ese token concede.',
      },
      {
        q: '¿Decodificar un JWT significa que es válido?',
        a: 'No, y la diferencia importa. La cabecera y el payload están codificados en base64url, no cifrados, así que cualquiera que tenga el token puede leerlos: por eso un JWT nunca es sitio para guardar un secreto. Solo comprobar la firma con la clave correcta te dice que el token es auténtico, que no ha sido alterado y que puedes fiarte de sus claims.',
      },
      {
        q: '¿Qué algoritmos de firma puede verificar?',
        a: 'HS256, HS384 y HS512 con un secreto compartido, y RS256/384/512, PS256/384/512 y ES256/384/512 con una clave pública dada como bloque PEM, como JWK suelto o como JWKS completo — en cuyo caso el kid del token elige la clave. La verificación usa la WebCrypto integrada en el navegador, así que ningún material de clave se envía a ninguna parte.',
      },
      {
        q: '¿Se guarda mi clave o mi secreto de firma?',
        a: 'No. Todas las demás herramientas del sitio guardan tu entrada en localStorage para que una recarga no pierda tu trabajo; la clave de verificación queda deliberadamente excluida. Se mantiene en memoria, se usa para la comprobación y desaparece cuando sales de la página.',
      },
      {
        q: '¿Por qué mi token aparece como caducado?',
        a: 'La claim exp es un NumericDate —segundos desde 1970— y el decodificador la muestra como fecha real junto a cuánto hace que pasó. Un token caducado es la causa más común de un 401 repentino en una API que funcionaba hace un momento. Una claim nbf en el futuro hace lo mismo por el otro extremo.',
      },
    ],
    keywords: [
      'decodificador jwt',
      'decodificar jwt',
      'verificar firma jwt',
      'jwt decoder español',
      'json web token decodificar',
      'jwt decoder online gratis',
      'decodificar jwt sin subir el token',
    ],
  },

  'jwt-encoder': {
    name: 'Codificador JWT',
    tagline: 'Crea un token a partir de claims y fírmalo de verdad',
    does: ['Cabecera y payload', 'HS / RS / PS / ES', 'Presets de caducidad', 'Firma con WebCrypto'],
    title: 'Codificador JWT — crea y firma un token',
    description:
      'Codificador JWT gratuito. Crea un JSON Web Token con tus propias claims y fírmalo con HS, RS, PS o ES. La clave nunca sale de tu navegador.',
    overview:
      'Un codificador de JWT que produce un token realmente firmado, no una imitación en base64. Escribe la cabecera y el payload como JSON, elige un algoritmo y pega el secreto compartido para un algoritmo HS o una clave privada PKCS#8 para RS, PS o ES: la firma la calcula la propia WebCrypto de tu navegador. La caducidad, la fecha de emisión y el «no antes de» se pueden estampar desde presets, así que no volverás a convertir un epoch a mano.',
    faqs: [
      {
        q: '¿Es seguro pegar una clave de firma en este codificador?',
        a: 'La clave se usa en tu propia pestaña y se descarta: nunca se guarda en el almacenamiento, nunca entra en un evento de analítica y no hay backend que pudiera recibirla. Dicho eso, una clave de firma es el secreto más peligroso de cualquier sistema que use JWT, porque quien la tenga puede acuñar tokens que tus servicios aceptarán. Para una clave de producción, generar los tokens en tu propio entorno sigue siendo mejor costumbre; esta herramienta está pensada para desarrollo, pruebas y aprendizaje.',
      },
      {
        q: '¿Con qué algoritmos puede firmar?',
        a: 'HS256, HS384 y HS512 con un secreto compartido, y RS256/384/512, PS256/384/512 y ES256/384/512 con una clave privada en bloque PEM PKCS#8 o como JWK privado. También produce el token no asegurado con `alg: none`, claramente marcado como algo que no demuestra nada, porque reproducir uno es la forma de comprobar que tu verificador lo rechaza.',
      },
      {
        q: '¿Por qué rechaza mi secreto corto?',
        a: 'La RFC 7518 exige una clave HMAC al menos tan larga como el hash: 32 bytes para HS256, 48 para HS384 y 64 para HS512. Los navegadores firman tan tranquilos con un secreto de cuatro caracteres, y el token resultante se rompe sin conexión en segundos. El codificador lo bloquea por defecto y te deja saltártelo, ya que reproducir un token débil es a veces justo lo que hace falta.',
      },
      {
        q: '¿Puede sobrescribir el algoritmo de mi cabecera?',
        a: 'Siempre escribe `alg` a partir del algoritmo que elegiste, y es deliberado. Una cabecera que declara un algoritmo sobre una firma hecha con otro no es un token: es el punto de partida de la vulnerabilidad de JWT más conocida. Cualquier otro campo de cabecera que escribas —`kid`, `cty`, lo que sea— se conserva tal cual.',
      },
    ],
    keywords: [
      'codificador jwt',
      'generador jwt',
      'crear jwt',
      'firmar jwt online',
      'generar json web token',
      'generar jwt online',
      'firmar jwt hs256 online',
    ],
  },

  'text-counter': {
    name: 'Contador de texto',
    tagline: 'Palabras, caracteres, frases y párrafos a la vez',
    does: [
      'Palabras y caracteres',
      'Frases y párrafos',
      'Tiempo de lectura',
      'Frecuencia de palabras',
    ],
    title: 'Contador de palabras y caracteres',
    description:
      'Contador de palabras y caracteres gratuito. Cuenta palabras, caracteres, frases y párrafos mientras escribes, con tiempo de lectura. En tu navegador.',
    overview:
      'Un contador de palabras que lo cuenta todo a la vez: palabras, caracteres con y sin espacios, frases, párrafos, líneas y bytes UTF-8, actualizándose mientras escribes. También estima el tiempo de lectura y de lectura en voz alta, sigue los límites contra los que la gente escribe de verdad y lista las palabras que más has usado. El recuento usa la segmentación de texto Unicode del navegador, así que el japonés y el chino se cuentan por palabras en vez de aparecer como una única palabra enorme.',
    faqs: [
      {
        q: '¿Cómo cuenta las palabras en japonés o chino?',
        a: 'Correctamente, cosa que la mayoría de contadores no hace. El japonés y el chino no separan las palabras con espacios, así que contar dividiendo por espacios convierte un párrafo entero en una sola palabra. Esta herramienta usa la segmentación de texto Unicode integrada en el navegador, que sabe dónde se separan las palabras de verdad en cualquier alfabeto, y mide el tiempo de lectura del CJK en caracteres por minuto en lugar de palabras por minuto.',
      },
      {
        q: '¿Qué cuenta como frase o como párrafo?',
        a: 'Las frases las decide el algoritmo Unicode de separación de frases, de modo que «Dr. Smith fue a Washington D.C. ayer» es una frase y no tres, y se reconoce el punto ideográfico. Un párrafo es un bloque separado por una línea en blanco; si el texto no tiene ninguna línea en blanco, cada línea no vacía cuenta como uno.',
      },
      {
        q: '¿Cómo se calcula el tiempo de lectura?',
        a: 'A 238 palabras por minuto para texto alfabético, que es la mediana de lectura silenciosa adulta de prosa general, y a 400 caracteres por minuto para CJK. El tiempo hablado usa los ritmos más lentos que logra un ponente real, unas 140 palabras por minuto. Son estimaciones, no medidas: la escritura técnica densa va más despacio que una novela.',
      },
      {
        q: '¿Se sube mi texto a alguna parte?',
        a: 'No. El recuento es JavaScript ejecutándose en tu propia pestaña, dentro de un Web Worker para que un documento largo no congele la página. Desconéctate de la red y sigue funcionando. Esto importa más de lo que parece en un contador de texto, porque lo que la gente cuenta suelen ser borradores, cartas de presentación y escritos sin publicar.',
      },
    ],
    keywords: [
      'contador de palabras',
      'contador de caracteres',
      'contar palabras online',
      'contador de frases',
      'contar párrafos',
      'contar palabras y caracteres gratis',
      'calcular tiempo de lectura',
    ],
  },

  'text-formatter': {
    name: 'Formateador de texto',
    tagline: 'Quita el desorden de un texto que escribió otro',
    does: [
      'Quitar espacios de más',
      'Borrar líneas duplicadas',
      'Cambiar mayúsculas',
      'Ordenar la puntuación',
    ],
    title: 'Formateador de texto — limpia texto desordenado',
    description:
      'Formateador y limpiador de texto gratuito. Quita espacios de más y líneas duplicadas, cambia mayúsculas y ordena la puntuación. En tu navegador.',
    overview:
      'Un formateador de texto que conduces tú, no uno que decide por ti. Cada operación es un interruptor: contraer espacios repetidos, quitar espacios finales, eliminar líneas duplicadas o en blanco, ordenar líneas, pasar a mayúsculas, minúsculas, tipo título o tipo frase, y ordenar la puntuación de la prosa en inglés. Nada se ejecuta si no lo activas, y la herramienta informa de exactamente qué cambió cada interruptor, así que el resultado es algo que aceptar y no algo que releer.',
    faqs: [
      {
        q: '¿Puede corregir la gramática?',
        a: 'No, y lo dice en lugar de fingir. La corrección gramatical de verdad —concordancia, tiempo verbal, elección de artículo— necesita un servidor o un modelo de lenguaje en WebAssembly, y este sitio no tiene backend y su Content-Security-Policy no permite WebAssembly. Lo que sí hace es la capa mecánica que la gente suele querer decir: palabras repetidas, espacios que faltan tras la puntuación, espacios antes de la puntuación, comillas rectas y mayúsculas. Eso es tipografía, donde la respuesta correcta es una regla y no un juicio.',
      },
      {
        q: '¿Qué conserva «eliminar líneas duplicadas»?',
        a: 'La primera aparición de cada línea, en su posición original, comparando la línea entera de forma exacta. Las líneas en blanco nunca se deduplican, ya que son lo que separa los párrafos y contraerlas reorganizaría el documento en un único bloque sin avisar.',
      },
      {
        q: '¿Cómo trata el tipo título las siglas?',
        a: 'No las toca. Cualquier palabra con una mayúscula después de la primera letra —JSON, iPhone, McCarthy— pasa intacta, porque pasarla a minúsculas para volver a poner la inicial en mayúscula convertiría JSON en Json. Las palabras menores como «de» o «la» se quedan en minúscula salvo que abran o cierren la línea.',
      },
      {
        q: '¿Estropeará mi código, mis URL o mis números decimales?',
        a: 'Las reglas de puntuación están escritas justo para evitarlo. Nunca se inserta un espacio tras una coma o dos puntos seguidos de un dígito, así que 1.000 y 12:30 sobreviven. El punto solo gana un espacio entre una secuencia en minúsculas y una mayúscula, lo que deja intactos e.g., Node.js, 3.14 y utildock.dev. La regla de comillas tipográficas omite todo lo que va entre acentos graves.',
      },
    ],
    keywords: [
      'formateador de texto',
      'quitar espacios de más',
      'eliminar líneas duplicadas',
      'limpiar texto online',
      'cambiar mayúsculas online',
      'eliminar líneas en blanco online',
      'ordenar líneas alfabéticamente',
    ],
  },
};
