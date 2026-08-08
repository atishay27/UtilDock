import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesPtbr: CategoryCopyOverrides = {
  json: {
    blurb: 'Leia, verifique, compare e remodele JSON sem sair da página.',
  },
  jwt: {
    blurb: 'Leia o que um token está declarando e confira que ele foi mesmo assinado.',
  },
  text: {
    name: 'Texto',
    blurb: 'Meça um texto e deixe-o em ordem.',
  },
};

export const toolsPtbr: ToolCopyOverrides = {
  'json-formatter': {
    name: 'Formatador JSON',
    tagline: 'Formate uma resposta ilegível, ou minifique-a',
    does: ['Formatar', 'Minificar em uma linha', 'Ordenar chaves', 'Indentação 2 / 4 / tab'],
    title: 'Formatador JSON — formatar e minificar',
    description:
      'Formatador e minificador JSON gratuito. Formate com qualquer indentação, compacte em uma linha ou ordene as chaves. Roda no seu navegador.',
    overview:
      'Um formatador e minificador JSON em um só. Formate com dois, três ou quatro espaços ou tabulações, compacte o documento de volta para uma única linha, ou ordene alfabeticamente as chaves de cada objeto para que dois arquivos se comparem de forma limpa no controle de versão. O resultado se atualiza enquanto você digita, e o documento nunca é enviado.',
    faqs: [
      {
        q: 'Qual a diferença entre formatar e minificar JSON?',
        a: 'Formatar acrescenta indentação e quebras de linha para deixar a estrutura legível. Minificar remove cada byte de espaço em branco opcional, que é o que você quer antes de colocar JSON em uma variável de ambiente, em uma URL ou na rede. Ambos produzem os mesmos dados.',
      },
      {
        q: 'Por que eu iria querer ordenar as chaves?',
        a: 'Dois documentos que descrevem a mesma coisa mas listam as chaves em ordens diferentes produzem um diff de texto barulhento. Ordenar as chaves alfabeticamente os deixa idênticos byte a byte onde coincidem, então só as mudanças reais aparecem no controle de versão.',
      },
      {
        q: 'Ele dá conta de arquivos muito grandes?',
        a: 'Sim. A análise e a formatação rodam em um Web Worker, então documentos de vários megabytes são reformatados sem a página deixar de responder enquanto você digita.',
      },
      {
        q: 'Meu JSON é enviado para um servidor?',
        a: 'Nunca. O formatador é JavaScript rodando na sua própria aba e não existe backend para onde enviar nada. Ele continua funcionando com a rede desconectada.',
      },
    ],
    keywords: [
      'formatador json',
      'formatar json online',
      'json formatter português',
      'minificar json',
      'json bonito',
    ],
  },

  'json-viewer': {
    name: 'Visualizador JSON',
    tagline: 'Explore um payload grande demais para percorrer rolando',
    does: [
      'Árvore recolhível',
      'Buscar chaves e valores',
      'Copiar qualquer caminho',
      'Aguenta 100 mil+ nós',
    ],
    title: 'Visualizador JSON — árvore recolhível com busca',
    description:
      'Visualizador JSON gratuito. Explore qualquer documento como árvore recolhível e colorida, busque chaves e valores, copie caminhos. Roda no navegador.',
    overview:
      'Um visualizador JSON que transforma uma parede de texto em uma estrutura que dá para ler. Cole uma resposta de API, um arquivo de configuração ou uma linha de log e explore como uma árvore recolhível — colorida por tipo, pesquisável por chave ou valor, com cada caminho a um clique da sua área de transferência. Nada é enviado: o documento é analisado nesta aba.',
    faqs: [
      {
        q: 'É seguro colar dados de produção neste visualizador JSON?',
        a: 'Sim. O documento nunca sai do seu navegador. Não há upload, nem análise no servidor, nem requisição que carregue seus dados — você pode se desconectar da rede e o visualizador continua funcionando. Abra o painel de Rede do seu navegador enquanto usa e verá que nada do editor é enviado a lugar nenhum.',
      },
      {
        q: 'Que tamanho de arquivo JSON ele consegue abrir?',
        a: 'Documentos de vários megabytes são tranquilos. A análise roda em um Web Worker, então a página nunca congela, e só as linhas da árvore que estão na tela são renderizadas, então documentos com centenas de milhares de nós continuam fluidos para rolar.',
      },
      {
        q: 'Como copio o caminho até um valor?',
        a: 'Passe o cursor por qualquer linha e clique no botão de caminho. Você recebe o caminho completo até aquele valor, pronto para colar no seu código ou em uma expressão jq.',
      },
      {
        q: 'Custa alguma coisa ou precisa de conta?',
        a: 'Não. Todas as ferramentas do UtilDock são gratuitas, sem anúncios, sem cadastro e sem limite de uso.',
      },
    ],
    keywords: [
      'visualizador json',
      'ver json online',
      'json viewer português',
      'explorador json',
    ],
  },

  'json-validator': {
    name: 'Validador JSON',
    tagline: 'Encontre a linha exata que algo está rejeitando',
    does: ['Linha e coluna exatas', 'JSON Schema 2020-12 / 2019-09 / 07', 'Pular para cada erro'],
    title: 'Validador JSON — erros de sintaxe e de esquema',
    description:
      'Validador JSON gratuito. Linha e coluna exatas de qualquer erro de sintaxe, mais validação com JSON Schema. Roda no seu navegador.',
    overview:
      'Um validador JSON que diz onde está o problema, não apenas que existe um. Cada erro de sintaxe é relatado com a linha e a coluna exatas e sublinhado no editor. Ligue a verificação de esquema e o formato dos seus dados também é validado, contra JSON Schema draft 2020-12, 2019-09 ou 07. Tanto o documento quanto o esquema ficam nesta aba.',
    faqs: [
      {
        q: 'Por que meu JSON está inválido se parece correto?',
        a: 'As causas comuns são uma vírgula sobrando depois do último item, chaves ou strings entre aspas simples em vez de duplas, uma quebra de linha ou barra invertida sem escape dentro de uma string, ou um comentário perdido — JSON não permite nada disso. O validador aponta a linha e a coluna exatas para você ver qual é.',
      },
      {
        q: 'Quais drafts do JSON Schema são suportados?',
        a: 'Os drafts 2020-12, 2019-09 e 07, incluindo as palavras-chave de formato padrão como date-time, email e uri. Cada violação é listada com o caminho, e clicar em uma leva até ela no documento.',
      },
      {
        q: 'Meus dados ou meu esquema são enviados para algum lugar?',
        a: 'Não. A validação roda como JavaScript na sua própria aba, então um payload de produção ou um esquema interno nunca sai da sua máquina. Não existe servidor que pudesse recebê-los.',
      },
      {
        q: 'Ele valida JSON Lines ou JSON com comentários?',
        a: 'Ainda não — o validador verifica JSON estrito conforme a RFC 8259, que é o que a maioria dos analisadores e APIs aceita. Suporte a JSONC e NDJSON está na lista.',
      },
    ],
    keywords: [
      'validador json',
      'validar json online',
      'json schema validator',
      'verificar sintaxe json',
    ],
  },

  'json-diff': {
    name: 'Comparador JSON',
    tagline: 'Veja o que realmente mudou entre dois documentos',
    does: [
      'Comparação estrutural',
      'Ignora a ordem das chaves',
      'Pareia itens por id',
      'Lado a lado',
    ],
    title: 'Comparar JSON — diferenças entre dois documentos',
    description:
      'Comparador JSON gratuito. Compare dois documentos lado a lado com adições, remoções e valores alterados em cores. Roda no seu navegador.',
    overview:
      'Um comparador JSON que mostra a diferença em vez de listá-la. Os dois documentos são desenhados como uma única visão alinhada: vermelho marca o que só o original tem, verde o que só o modificado tem, e uma seta marca cada valor substituído. Como a comparação é estrutural e não textual, chaves reordenadas e indentação diferente nunca contam como mudanças.',
    faqs: [
      {
        q: 'Qual a diferença entre um diff de JSON e um diff de texto?',
        a: 'Um diff de texto compara caracteres, então reformatar um arquivo ou reordenar as chaves aparece como centenas de mudanças. Esta ferramenta analisa os dois documentos primeiro e compara valores, então só são relatadas as diferenças que mudam o que o JSON significa.',
      },
      {
        q: 'Como os arrays são comparados?',
        a: 'Os elementos são pareados por identidade quando existe uma — um campo id, key, uuid ou name. Por isso inserir um elemento no começo relata uma única adição em vez de reescrever todos os elementos seguintes, e elementos que apenas se moveram são relatados como movimentos.',
      },
      {
        q: 'A ordem das chaves ou a formatação afetam o resultado?',
        a: 'Não. Ordem das chaves, indentação e espaços no fim da linha são ignorados. Dois documentos que só diferem na formatação são comparados como idênticos.',
      },
      {
        q: 'Os dois documentos são enviados para algum lugar?',
        a: 'Não. Ambos são analisados e comparados em um Web Worker dentro desta aba. Nada é enviado a um servidor, o que importa quando você está comparando dois payloads de produção.',
      },
    ],
    keywords: [
      'comparar json',
      'comparador json',
      'json diff online',
      'diferença entre dois json',
    ],
  },

  'jwt-decoder': {
    name: 'Decodificador JWT',
    tagline: 'Leia as claims de um token e prove sua assinatura',
    does: [
      'Cabeçalho e payload',
      'Expiração em palavras simples',
      'Verificação de assinatura',
      'Segredo ou chave pública',
    ],
    title: 'Decodificador JWT — decodifique e verifique',
    description:
      'Decodificador JWT gratuito. Leia o cabeçalho, o payload e a expiração de um JSON Web Token, e verifique sua assinatura. Token e chave nunca saem do seu navegador.',
    overview:
      'Um decodificador de JWT que divide um token nas suas três partes, decodifica o cabeçalho e o payload, e lista cada claim em palavras simples — com expiração, “não antes de” e data de emissão mostradas como datas reais em vez de segundos desde 1970. Ele também verifica a assinatura: cole o segredo compartilhado para um algoritmo HS ou uma chave pública para RS, PS ou ES, e a checagem roda na própria WebCrypto do seu navegador. Nem o token nem a chave são enviados a lugar nenhum, e a chave nem sequer é salva neste navegador.',
    faqs: [
      {
        q: 'É seguro colar um JWT real neste decodificador?',
        a: 'Sim. O token é decodificado por JavaScript na sua própria aba e não existe backend para onde enviá-lo — desconecte da rede e o decodificador continua funcionando. Com JWTs isso importa mais do que com quase qualquer outro dado: um token é uma credencial viva, e colá-lo num site que o envia para um servidor entrega tudo aquilo que ele concede.',
      },
      {
        q: 'Decodificar um JWT significa que ele é válido?',
        a: 'Não, e a diferença importa. O cabeçalho e o payload são codificados em base64url, não criptografados, então qualquer um com o token consegue lê-los — por isso um JWT nunca é lugar para guardar segredo. Só conferir a assinatura contra a chave certa diz que o token é legítimo, que não foi alterado e que dá para confiar nas suas claims.',
      },
      {
        q: 'Quais algoritmos de assinatura ele consegue verificar?',
        a: 'HS256, HS384 e HS512 com um segredo compartilhado, e RS256/384/512, PS256/384/512 e ES256/384/512 com uma chave pública informada como bloco PEM, JWK avulso ou JWKS inteiro — caso em que o kid do token escolhe a chave. A verificação usa a WebCrypto embutida no navegador, então nenhum material de chave é enviado para lugar algum.',
      },
      {
        q: 'Minha chave ou meu segredo de assinatura ficam guardados?',
        a: 'Não. Todas as outras ferramentas do site salvam sua entrada no localStorage para que um refresh não perca seu trabalho; a chave de verificação é deliberadamente excluída disso. Ela fica na memória, é usada para a checagem e some quando você sai da página.',
      },
      {
        q: 'Por que meu token aparece como expirado?',
        a: 'A claim exp é um NumericDate — segundos desde 1970 — e o decodificador a mostra como data real ao lado de há quanto tempo ela passou. Um token expirado é a causa mais comum de um 401 repentino numa API que funcionava um instante antes. Uma claim nbf no futuro faz o mesmo pela outra ponta.',
      },
    ],
    keywords: [
      'decodificador jwt',
      'decodificar jwt',
      'verificar assinatura jwt',
      'jwt decoder português',
      'json web token decodificar',
    ],
  },

  'jwt-encoder': {
    name: 'Codificador JWT',
    tagline: 'Monte um token a partir de claims e assine de verdade',
    does: [
      'Cabeçalho e payload',
      'HS / RS / PS / ES',
      'Presets de expiração',
      'Assina com WebCrypto',
    ],
    title: 'Codificador JWT — monte e assine um token',
    description:
      'Codificador JWT gratuito. Monte um JSON Web Token com suas próprias claims e assine com HS, RS, PS ou ES. A chave nunca sai do seu navegador.',
    overview:
      'Um codificador de JWT que produz um token de fato assinado, não um sósia em base64. Escreva o cabeçalho e o payload como JSON, escolha um algoritmo e cole o segredo compartilhado para um algoritmo HS ou uma chave privada PKCS#8 para RS, PS ou ES — a assinatura é calculada pela própria WebCrypto do seu navegador. Expiração, emissão e «não antes de» podem ser carimbados a partir de presets, então você nunca mais converte um epoch na mão.',
    faqs: [
      {
        q: 'É seguro colar uma chave de assinatura neste codificador?',
        a: 'A chave é usada na sua própria aba e descartada: nunca é gravada no armazenamento, nunca entra em um evento de analytics, e não há backend que pudesse recebê-la. Dito isso, uma chave de assinatura é o segredo mais perigoso de qualquer sistema que use JWT, porque quem a tiver pode gerar tokens que seus serviços vão aceitar. Para uma chave de produção, gerar tokens no seu próprio ambiente continua sendo o melhor hábito; esta ferramenta foi feita para desenvolvimento, testes e aprendizado.',
      },
      {
        q: 'Com quais algoritmos ele consegue assinar?',
        a: 'HS256, HS384 e HS512 com um segredo compartilhado, e RS256/384/512, PS256/384/512 e ES256/384/512 com uma chave privada em bloco PEM PKCS#8 ou como JWK privado. Ele também produz o token não protegido com `alg: none`, claramente marcado como algo que não prova nada, porque reproduzir um é justamente como se testa que o seu verificador o rejeita.',
      },
      {
        q: 'Por que ele recusa meu segredo curto?',
        a: 'A RFC 7518 exige uma chave HMAC pelo menos tão longa quanto o hash: 32 bytes para HS256, 48 para HS384 e 64 para HS512. Navegadores assinam tranquilamente com um segredo de quatro caracteres, e o token resultante pode ser quebrado offline em segundos. O codificador bloqueia isso por padrão e deixa você ignorar a regra, já que reproduzir um token fraco às vezes é exatamente a tarefa.',
      },
      {
        q: 'Ele pode sobrescrever o algoritmo do meu cabeçalho?',
        a: 'Ele sempre escreve `alg` a partir do algoritmo que você escolheu, e isso é deliberado. Um cabeçalho que declara um algoritmo sobre uma assinatura feita com outro não é um token: é o ponto de partida da vulnerabilidade de JWT mais conhecida. Qualquer outro campo de cabeçalho que você escrever — `kid`, `cty`, o que for — é mantido exatamente como digitado.',
      },
    ],
    keywords: [
      'codificador jwt',
      'gerador jwt',
      'criar jwt',
      'assinar jwt online',
      'gerador json web token',
    ],
  },

  'text-counter': {
    name: 'Contador de texto',
    tagline: 'Palavras, caracteres, frases e parágrafos de uma vez',
    does: [
      'Palavras e caracteres',
      'Frases e parágrafos',
      'Tempo de leitura',
      'Frequência de palavras',
    ],
    title: 'Contador de palavras e caracteres',
    description:
      'Contador de palavras e caracteres gratuito. Conta palavras, caracteres, frases e parágrafos enquanto você digita, com tempo de leitura. No seu navegador.',
    overview:
      'Um contador de palavras que conta tudo de uma vez — palavras, caracteres com e sem espaços, frases, parágrafos, linhas e bytes UTF-8 — e se atualiza enquanto você digita. Ele também estima o tempo de leitura e de leitura em voz alta, acompanha os limites contra os quais as pessoas realmente escrevem, e lista as palavras que você mais usou. A contagem usa a segmentação de texto Unicode do próprio navegador, então japonês e chinês são contados por palavra em vez de aparecerem como uma única palavra enorme.',
    faqs: [
      {
        q: 'Como ele conta palavras em japonês ou chinês?',
        a: 'Corretamente, o que a maioria dos contadores não faz. Japonês e chinês não separam palavras com espaços, então contar dividindo por espaços transforma um parágrafo inteiro em uma única palavra. Esta ferramenta usa a segmentação de texto Unicode embutida no navegador, que sabe onde as palavras de fato terminam em qualquer escrita, e mede o tempo de leitura de CJK em caracteres por minuto em vez de palavras por minuto.',
      },
      {
        q: 'O que conta como frase ou como parágrafo?',
        a: 'A frase é decidida pelas regras Unicode de quebra de frase, de modo que «Dr. Smith foi a Washington D.C. ontem» é uma frase e não três, e o ponto ideográfico é reconhecido. Um parágrafo é um bloco separado por uma linha vazia; se o texto não tiver nenhuma linha vazia, cada linha não vazia conta como um.',
      },
      {
        q: 'Como o tempo de leitura é calculado?',
        a: 'A 238 palavras por minuto para texto alfabético, que é a mediana da leitura silenciosa adulta de prosa geral, e a 400 caracteres por minuto para CJK. O tempo de fala usa os ritmos mais lentos que um apresentador realmente alcança, cerca de 140 palavras por minuto. São estimativas, não medições: texto técnico denso corre mais devagar que um romance.',
      },
      {
        q: 'Meu texto é enviado para algum lugar?',
        a: 'Não. A contagem é JavaScript rodando na sua própria aba, dentro de um Web Worker para que um documento longo não congele a página. Desconecte da rede e ela continua funcionando. Isso importa mais do que parece em um contador de texto, já que o que as pessoas contam costumam ser rascunhos, cartas de apresentação e textos não publicados.',
      },
    ],
    keywords: [
      'contador de palavras',
      'contador de caracteres',
      'contar palavras online',
      'contador de frases',
      'contar parágrafos',
    ],
  },

  'text-formatter': {
    name: 'Formatador de texto',
    tagline: 'Tire a bagunça de um texto que outra pessoa escreveu',
    does: [
      'Remover espaços extras',
      'Apagar linhas duplicadas',
      'Mudar maiúsculas',
      'Arrumar a pontuação',
    ],
    title: 'Formatador de texto — limpe texto bagunçado',
    description:
      'Formatador e limpador de texto gratuito. Remova espaços extras e linhas duplicadas, mude maiúsculas e arrume a pontuação. Roda no seu navegador.',
    overview:
      'Um formatador de texto que você conduz, e não um que decide por você. Cada operação é um interruptor — juntar espaços repetidos, tirar espaços no fim da linha, remover linhas duplicadas ou vazias, ordenar linhas, converter para maiúsculas, minúsculas, tipo título ou tipo frase, e arrumar a pontuação da prosa em inglês. Nada roda até você ligar, e a ferramenta informa exatamente o que cada interruptor mudou, então o resultado é algo para aceitar em vez de reler.',
    faqs: [
      {
        q: 'Ele corrige gramática?',
        a: 'Não, e diz isso em vez de fingir. Correção gramatical de verdade — concordância, tempo verbal, escolha de artigo — precisa de um servidor ou de um modelo de linguagem em WebAssembly, e este site não tem backend e sua Content-Security-Policy não permite WebAssembly. O que ele faz no lugar é a camada mecânica que as pessoas normalmente querem dizer: palavras repetidas, espaços faltando depois da pontuação, espaços antes da pontuação, aspas retas e maiúsculas. Isso é tipografia, onde a resposta certa é uma regra e não um julgamento.',
      },
      {
        q: 'O que «remover linhas duplicadas» mantém?',
        a: 'A primeira ocorrência de cada linha, na posição original, comparando a linha inteira de forma exata. Linhas vazias nunca são desduplicadas, já que são elas que separam os parágrafos e juntá-las reorganizaria o documento em um único bloco sem avisar.',
      },
      {
        q: 'Como o tipo título lida com siglas?',
        a: 'Ele não as toca. Qualquer palavra com uma maiúscula depois da primeira letra — JSON, iPhone, McCarthy — passa intacta, porque deixá-la minúscula para recapitalizar a inicial transformaria JSON em Json. Palavras menores como «of» e «the» ficam em minúsculas, a não ser que abram ou fechem a linha.',
      },
      {
        q: 'Ele vai quebrar meu código, minhas URLs ou meus números decimais?',
        a: 'As regras de pontuação foram escritas justamente para evitar isso. Nunca se insere espaço depois de uma vírgula ou dois-pontos seguidos de dígito, então 1,000 e 12:30 sobrevivem. O ponto só ganha espaço entre uma sequência minúscula e uma maiúscula, o que deixa e.g., Node.js, 3.14 e utildock.dev intactos. A regra de aspas tipográficas pula tudo que estiver entre crases.',
      },
    ],
    keywords: [
      'formatador de texto',
      'remover espaços extras',
      'remover linhas duplicadas',
      'limpar texto online',
      'mudar maiúsculas online',
    ],
  },
};
