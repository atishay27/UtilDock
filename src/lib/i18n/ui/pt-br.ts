import { p } from '../format';
import type { UIStrings } from './en';

export const ptbr: UIStrings = {
  chrome: {
    skipToContent: 'Ir para o conteúdo',
    homeAria: 'Início do UtilDock',
    navTools: 'Ferramentas',
    navSite: 'Site',
    breadcrumb: 'Trilha de navegação',
    home: 'Início',
    soon: 'em breve',
    comingSoon: 'em breve',
    categoryTools: 'Ferramentas {category}',
    allCategoryTools: 'Todas as ferramentas {category}',
    openToolsMenu: 'Abrir o menu de ferramentas',
    closeToolsMenu: 'Fechar o menu de ferramentas',
    toolsButton: 'Ferramentas',
    privacyPill: 'Nada sai desta aba',
    privacyPillMobile: 'Seu JSON fica nesta aba',
    open: 'Abrir',
  },

  theme: {
    toLight: 'Mudar para o tema claro',
    toDark: 'Mudar para o tema escuro',
    title: 'Mudar de tema',
    light: 'Claro',
    dark: 'Escuro',
  },

  footer: {
    tagline: 'Seu cais de utilitários para desenvolvedores.',
    blurb: 'Grátis, sem anúncios, e tudo roda no seu próprio navegador.',
    about: 'Sobre',
    privacy: 'Privacidade',
    analytics: 'Análise',
    copyright: '© {year} UtilDock',
    language: 'Idioma',
    languageAria: 'Escolher idioma',
  },

  consent: {
    region: 'Análise',
    heading: 'Análise',
    undecided:
      'Gostaríamos de usar o Google Analytics para contar visualizações de página e assim saber quais ferramentas vale a pena melhorar. Isso define um cookie. Nada do que você cola é incluído — seu JSON não sai desta aba de qualquer jeito.',
    privacyPolicy: 'Política de Privacidade',
    whatItCollects: 'O que é coletado',
    currentlyOn: 'Ativada no momento',
    granted:
      'O Google Analytics está contando visualizações de página neste navegador. Nada do que você cola é incluído.',
    currentlyOff: 'Desativada no momento',
    denied:
      'Nada é solicitado ao Google neste navegador, e qualquer cookie de análise já gravado foi excluído. Todas as ferramentas funcionam exatamente igual nos dois casos.',
    allow: 'Permitir análise',
    decline: 'Não, obrigado',
    turnOff: 'Desativar',
    turnOn: 'Ativar',
    close: 'Fechar',
  },

  tool: {
    taglineSuffix: 'roda nesta aba, nunca é enviado a lugar nenhum',
    howItWorks: 'Como funciona o {name}',
    otherTools: 'Outras ferramentas',
    commonQuestions: 'Perguntas frequentes',
  },

  home: {
    title: 'Ferramentas JSON grátis no seu navegador',
    headlineLead: 'Ferramentas que nunca',
    headlineAccent: 'tocam um servidor.',
    lede: 'Utilitários pequenos e afiados que rodam inteiramente nesta aba — grátis, sem anúncios e sem cadastro. JSON primeiro: um formatador, um visualizador, um validador e um comparador, com JWT em seguida.',
    assurances: ['Nada é enviado', 'Nada é registrado', 'Sem conta, sem limites'],
    closeLine: 'Desconecte a rede. Continua funcionando.',
    closeCta: 'Por que isso é verdade',
    keywords: [
      'ferramentas para desenvolvedores',
      'ferramentas json',
      'formatador json online',
      'utilitários grátis para programadores',
    ],
  },

  jsonHub: {
    title: 'Ferramentas JSON grátis, sem anúncios',
    description:
      'Ferramentas JSON gratuitas: visualizador, validador, comparador e formatador. Sem anúncios nem cadastro, nada do que você cola sai do navegador.',
    keywords: [
      'ferramentas json',
      'ferramentas json online',
      'ferramentas json grátis',
      'utilitários json',
    ],
    headlineLead: 'Todas as ferramentas JSON,',
    headlineAccent: 'em uma aba.',
    lede: 'Quatro ferramentas afiadas para trabalhar com JSON — um [visualizador](/json/viewer) em árvore, um [validador](/json/validator) de sintaxe e esquema, um [comparador](/json/diff) visual e um [formatador e minificador](/json/formatter). Todas grátis, todas sem anúncios, e cada uma analisa seu documento nesta aba em vez de num servidor.',
    chooseHeading: 'Escolha uma ferramenta',
    toolCount: p({ one: '{count} ferramenta · vêm mais', other: '{count} ferramentas · vêm mais' }),
    notes: [
      {
        head: 'Nada do que você cola é enviado',
        body: 'Cada ferramenta aqui é JavaScript rodando na sua própria aba. Cole um payload de produção com a rede desconectada e continua funcionando — não existe nenhum servidor nosso que pudesse recebê-lo.',
      },
      {
        head: 'Sem anúncios, sem conta, sem limite',
        body: 'Sem interstitials, sem cadastro e sem teto para quanto você pode colar. A página em que você cai é a ferramenta.',
      },
      {
        head: 'Feitas para documentos grandes',
        body: 'A análise, a validação e a comparação rodam em uma thread de trabalho, então um documento de vários megabytes é processado sem a página travar enquanto você digita.',
      },
    ],
    closeLine: 'Confira a afirmação no seu painel de Rede.',
    closeCta: 'Por que isso é verdade',
  },

  notFound: {
    title: 'Página não encontrada',
    description: 'Essa página não existe no UtilDock.',
    headline: 'Essa página não existe.',
    body: 'O link pode estar desatualizado, ou o endereço foi digitado errado. Todas as ferramentas do UtilDock estão listadas abaixo.',
    cta: 'Voltar ao início',
    allTools: 'Todas as ferramentas',
  },

  about: {
    title: 'Sobre — quem constrói o UtilDock e por quê',
    description:
      'Por que o UtilDock existe: utilitários para desenvolvedores pequenos, rápidos e sem anúncios que rodam inteiramente no seu navegador, construídos por um único desenvolvedor, sem publicidade e sem nunca enviar nada do que você cola.',
    heading: 'Sobre o UtilDock',
    whyHeading: 'Por que isso existe',
    why: [
      'Todo desenvolvedor precisa formatar um JSON ou descobrir por que dois payloads discordam. As ferramentas que aparecem primeiro nessas buscas costumam estar soterradas em anúncios, interrompidas por muros de cookies e — o mais incômodo — com frequência enviam o que você cola para um servidor sobre o qual você não sabe nada. É um mau negócio quando o que você está depurando é um payload de produção.',
      'O UtilDock é o oposto disso: um conjunto pequeno de ferramentas afiadas, sem publicidade, sem cadastro, e nada do que você cola sai da sua máquina.',
    ],
    builtHeading: 'Como é construído',
    built: [
      'O site é estático — HTML, CSS e um pouco de JavaScript, servidos a partir da borda da Cloudflare. Cada ferramenta é um componente autocontido que hidrata apenas na própria página, então as páginas que você não usa não custam nada. O trabalho pesado (analisar, validar, comparar) acontece em um Web Worker, e é por isso que um documento de vários megabytes não congela a página enquanto você digita.',
      'Não há backend. Essa é uma restrição deliberada: uma ferramenta que não consegue enviar seus dados a lugar nenhum não consegue vazá-los. Leia a [página de privacidade](/privacy) para os detalhes.',
    ],
    todayHeading: 'O que existe hoje',
    today:
      'JSON veio primeiro porque é o que a maioria de nós usa com mais frequência. A decodificação de JWT é o próximo passo, e a lista vai continuar crescendo — sempre sob as mesmas regras: rápido, grátis, sem anúncios e inteiramente do lado do cliente.',
  },

  privacy: {
    title: 'Privacidade — nada do que você cola sai do seu navegador',
    description:
      'O UtilDock roda inteiramente no seu navegador. Nenhum documento que você cola sai do seu dispositivo — não existe servidor que pudesse recebê-lo.',
    heading: 'Política de Privacidade',
    updated: 'Última atualização: {date}',
    updatedDate: 'agosto de 2026',
    translationNote:
      'Esta é uma tradução oferecida por conveniência. Se divergir da versão em inglês, prevalece a versão em inglês.',
    lead: '**Nada do que você cola no UtilDock sai do seu navegador.** Cada ferramenta é JavaScript rodando na sua própria aba. Seu JSON nunca é enviado a um backend, nunca é escrito em um log e nunca é visto por nós — não existe nenhum servidor nosso que pudesse recebê-lo.',
    howHeading: 'Como as ferramentas funcionam',
    how: [
      'O UtilDock é um site estático. Quando você abre uma ferramenta, seu navegador baixa um pouco de HTML, CSS e JavaScript, e tudo depois disso acontece localmente. Análise, formatação, validação e comparação rodam todas dentro da sua aba. Abrir um arquivo com o botão **Carregar** — ou soltá-lo na página — lê o arquivo do seu disco para a memória; não é um upload.',
      'Como não há backend, o conteúdo com que você trabalha nunca é transmitido, registrado ou retido em lugar nenhum. Você pode se desconectar da internet e as ferramentas continuam funcionando.',
    ],
    storedHeading: 'Informações guardadas no seu dispositivo',
    stored:
      'Para que uma recarga não perca seu trabalho, cada ferramenta salva a entrada atual no `localStorage` do seu navegador, junto com sua escolha de tema e algumas preferências como o tamanho da indentação. Esses dados ficam no seu dispositivo, só podem ser lidos pelo UtilDock no seu navegador, e nunca são transmitidos para nós. Limpar os dados do site deste domínio no seu navegador remove tudo isso.',
    storedConsent:
      'Sua resposta à pergunta sobre análise é guardada do mesmo jeito, para que você só seja perguntado uma vez. Ela não registra nada além da própria escolha.',
    analyticsHeading: 'Análise e cookies',
    analyticsOn: [
      'Com o seu consentimento, usamos o Google Analytics para entender como o site é usado — quais páginas são visitadas e com que frequência — para saber quais ferramentas vale a pena melhorar. Ele é carregado por um contêiner do Google Tag Manager e não roda até você permitir. Se você recusar, nenhum cookie de análise é definido e nenhum dado é coletado.',
      'Quando ativado, o Google Analytics coleta dados padrão de análise web: páginas vistas, localização aproximada derivada do seu endereço IP, site de origem e informações gerais de dispositivo e navegador. Ele define cookies chamados `_ga` e `_ga_*` para reconhecer visitantes que retornam. Esse tratamento está descrito na [política de privacidade do Google](https://policies.google.com/privacy).',
      '**A análise nunca recebe o conteúdo com que você trabalha.** Seu JSON não é incluído em nenhum evento de análise. Também desativamos os recursos de publicidade do Google, de modo que sua visita não é usada para remarketing, personalização de anúncios ou formação de públicos.',
    ],
    analyticsOff:
      'Este site não carrega nenhuma análise no momento. Nenhum cookie de análise é definido, nenhum script de terceiros roda, e não há nada a consentir.',
    analyticsNever:
      'Não vendemos seus dados, e não usamos redes de publicidade, widgets de redes sociais, gravação de sessão nem fingerprinting.',
    choicesHeading: 'Suas escolhas',
    choicesLead: 'Você pode',
    choicesButton: 'consultar ou alterar essa preferência',
    choicesRest:
      'a qualquer momento. O painel mostra qual configuração está em vigor e permite alterná-la; o link de análise no rodapé de todas as páginas abre o mesmo painel.',
    choicesImmediate:
      'Desativar tem efeito imediato, e não no próximo carregamento de página, e os cookies `_ga` são excluídos naquele momento — você não precisa limpar os dados do site no seu navegador para se livrar deles, embora isso também funcione. O Google não é contatado de novo em nenhuma página seguinte, a menos que você reative.',
    choicesUngated:
      'Todas as ferramentas deste site funcionam igual, aceitando ou não a análise. Nada depende dessa escolha. Limpar os dados do site deste domínio remove tudo que o UtilDock guardou, incluindo seu tema e suas entradas salvas.',
    hostingHeading: 'Hospedagem',
    hosting:
      'O UtilDock é servido pelo Cloudflare Pages. Como qualquer host web, a Cloudflare processa as requisições de rede necessárias para entregar uma página e pode reter dados técnicos limitados — endereço IP, user agent, marcações de tempo — por segurança e prevenção de abuso, regidos pela [política de privacidade da Cloudflare](https://www.cloudflare.com/privacypolicy/). Isso cobre requisições pelos arquivos do próprio site. O que você cola em uma ferramenta nunca faz parte de nenhuma requisição, então nunca está em nenhum log.',
    securityHeading: 'Segurança',
    security: [
      'O site é servido por HTTPS com uma Content-Security-Policy estrita que restringe quais origens podem carregar código ou receber dados. É isso que mantém o compromisso de privacidade acima como uma propriedade de como o site é construído, e não como uma promessa em que você simplesmente tem que acreditar. Fique à vontade para verificar: abra as ferramentas de desenvolvedor do seu navegador, use qualquer ferramenta do site e inspecione as requisições.',
      'Problemas de segurança podem ser comunicados para [security@utildock.dev](mailto:security@utildock.dev), ou consulte nosso [security.txt](/.well-known/security.txt).',
    ],
    childrenHeading: 'Privacidade de crianças',
    children:
      'O UtilDock é uma ferramenta para desenvolvedores e não é direcionado a crianças. Não coletamos conscientemente informações pessoais de ninguém, incluindo crianças menores de 13 anos.',
    changesHeading: 'Mudanças nesta política',
    changes:
      'Se esta política mudar, a data no topo desta página muda junto. O compromisso de que os dados que você cola ficam no seu navegador não é algo que pretendemos rever.',
    contactHeading: 'Contato',
    contact:
      'Dúvidas sobre esta política podem ir para [security@utildock.dev](mailto:security@utildock.dev).',
  },

  toolAbout: {
    'json-formatter': [
      'Cole ou solte um documento no painel de entrada e o resultado formatado aparece enquanto você digita. Escolha dois, três ou quatro espaços, ou tabulações — o que seu projeto usar. Mude para **Minificar** para tirar cada byte de espaço em branco, que é o que você quer antes de embutir JSON em uma variável de ambiente ou em uma URL.',
      '**Ordenar chaves** reescreve cada objeto com as chaves em ordem alfabética. Dois documentos que diferem apenas na ordem das chaves ficam idênticos byte a byte, o que faz com que se comparem de forma limpa no controle de versão.',
      'A análise roda em um Web Worker, então até documentos de vários megabytes são formatados sem a página deixar de responder enquanto você digita.',
    ],
    'json-viewer': [
      'Cole um documento no painel de origem e ele vira uma árvore navegável, com objetos e arrays recolhíveis em todos os níveis e valores coloridos por tipo.',
      'A caixa de filtro busca tanto em chaves quanto em valores, abrindo o que for preciso para mostrar uma correspondência. Passe o cursor por qualquer linha para copiar o caminho completo até aquele valor.',
      'Apenas as linhas que estão na tela são renderizadas, então um documento com centenas de milhares de nós continua fluido para rolar.',
    ],
    'json-validator': [
      'Cada erro de sintaxe é relatado com a linha e a coluna exatas, e sublinhado no editor onde acontece. O analisador para no primeiro problema — corrija esse e qualquer coisa mais abaixo aparecerá.',
      'Ative **Verificar contra um esquema** e um segundo painel se abre para um JSON Schema. Cada violação é listada com o caminho, e clicar em uma leva o editor até ela.',
      'Tanto o documento quanto o esquema ficam nesta aba. Nenhum dos dois é enviado, que é exatamente o que importa quando o esquema é interno e o documento é real.',
    ],
    'json-diff': [
      'Cole um documento de cada lado. A comparação é estrutural, não textual: os dois documentos são analisados primeiro, então chaves reordenadas, indentação diferente e espaços no fim da linha nunca contam como mudanças.',
      'Elementos de array são pareados por identidade quando existe uma — um campo **id**, **key**, **uuid** ou **name** — de modo que inserir um elemento no começo relata uma única adição em vez de reescrever tudo que vem depois.',
      'Sequências longas de linhas idênticas são recolhidas, deixando as mudanças com estrutura suficiente ao redor para localizar cada uma. Alt + ↑ e Alt + ↓ percorrem as diferenças.',
    ],
  },

  islands: {
    common: {
      load: 'Carregar',
      loadTitle: 'Ler um arquivo local — ele é lido nesta máquina, nunca enviado',
      sample: 'Exemplo',
      sampleTitle: 'Carregar um documento de exemplo',
      clear: 'Limpar',
      copy: 'Copiar',
      copied: 'Copiado',
      copyTitle: 'Copiar para a área de transferência',
      download: 'Baixar',
      dropHere: 'Solte o material aqui',
      path: 'caminho',
      pathCopied: 'copiado',
      copyPathTitle: 'Copiar o caminho — {path}',
      validJson: 'JSON válido',
      errorAt: 'Linha {line}, coluna {column} — {message}',
      stats: '{objects} objetos · {arrays} arrays · {keys} chaves · profundidade {depth}',
    },

    formatter: {
      inputTitle: 'Entrada',
      formattedTitle: 'Formatado',
      minifiedTitle: 'Minificado',
      inputLabel: 'Entrada JSON',
      outputLabel: 'Saída JSON formatada',
      placeholder: '{\n  "cole": "seu JSON aqui"\n}',
      idle: 'Cole ou solte JSON para começar',
      indent: 'Indentação',
      spaces: '{count} espaços',
      tab: 'Tabulação',
      sortKeys: 'Ordenar chaves',
      sortKeysTitle: 'Ordenar as chaves dos objetos em ordem alfabética',
      pretty: 'Formatar',
      minify: 'Minificar',
      sameSize: 'mesmo tamanho',
      sizeDelta: '{delta} % de carepa retirada',
      prettyFile: 'formatado.json',
      minifiedFile: 'minificado.json',
    },

    viewer: {
      sourceTitle: 'Origem',
      treeTitle: 'Árvore',
      sourceLabel: 'Origem JSON',
      placeholder: '{\n  "cole": "o JSON que você quer explorar"\n}',
      idle: 'Cole ou solte JSON para explorá-lo',
      filter: 'Filtrar chaves e valores',
      filterAria: 'Filtrar a árvore',
      expandAll: 'Expandir tudo',
      expandAllTitle: 'Expandir todos os nós',
      collapse: 'Recolher',
      collapseTitle: 'Recolher até a raiz',
      expand: 'Expandir',
      treeAria: 'Árvore JSON',
      nothingYet: 'Ainda não há nada para mostrar',
      matching: p({
        one: '{count} nó correspondente',
        other: '{count} nós correspondentes',
      }),
      rowsShown: '{count} linhas exibidas',
      noFilterMatch: 'Nenhuma chave ou valor corresponde a esse filtro.',
      emptyValid: 'A árvore aparece aqui assim que o painel Origem tiver JSON válido.',
      emptyError: 'Corrija o erro de sintaxe no painel Origem e a árvore aparecerá aqui.',
    },

    validator: {
      documentTitle: 'Documento',
      schemaTitle: 'JSON Schema',
      resultTitle: 'Resultado',
      documentLabel: 'Documento JSON a validar',
      placeholder: '{\n  "cole": "o JSON que você quer verificar"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: 'Com erros',
      brokenTitle: 'Carregar um documento com erros de sintaxe propositais',
      sampleValidTitle: 'Carregar um exemplo válido',
      useSchema: 'Verificar contra um esquema',
      useSchemaTitle: 'Verificar também o documento contra um JSON Schema',
      idle: 'Cole ou solte JSON para validá-lo',
      checking: 'Verificando…',
      invalidAt: 'JSON inválido — linha {line}, coluna {column}: {message}',
      schemaViolations: p({
        one: 'JSON válido, mas {count} violação do esquema',
        other: 'JSON válido, mas {count} violações do esquema',
      }),
      validAndMatches: 'JSON válido e de acordo com o esquema',
      emptyBody:
        'Cole um documento no painel Documento. Ele é verificado enquanto você digita, inteiramente nesta aba.',
      firstProblem:
        'O analisador para no primeiro problema que encontra. Corrija este e os erros mais abaixo no documento aparecerão.',
      okSchema: 'O documento é JSON válido e satisfaz todas as regras do esquema.',
      okPlain: 'O documento é JSON válido.',
      atLine: 'L{line}',
    },

    diff: {
      originalTitle: 'Original',
      changedTitle: 'Modificado',
      comparisonTitle: 'Comparação',
      originalLabel: 'JSON original',
      changedLabel: 'JSON modificado',
      originalPlaceholder: '{\n  "o": "documento original"\n}',
      changedPlaceholder: '{\n  "o": "documento para comparar"\n}',
      swap: 'Trocar',
      swapTitle: 'Trocar os dois lados',
      hideInput: 'Ocultar entrada',
      editInput: 'Editar entrada',
      hideTitle: 'Ocultar os editores e dar a página à comparação',
      showTitle: 'Mostrar os editores de novo',
      foldSame: 'Recolher iguais',
      showAll: 'Mostrar tudo',
      showAllTitle: 'Mostrar todas as linhas sem mudança em vez de recolhê-las',
      split: 'Lado a lado',
      stack: 'Empilhar',
      splitTitle: 'Mostrar os dois documentos lado a lado',
      stackTitle: 'Empilhar os dois documentos em uma coluna',
      prev: 'Diferença anterior',
      next: 'Próxima diferença',
      prevTitle: 'Diferença anterior (Alt + ↑)',
      nextTitle: 'Próxima diferença (Alt + ↓)',
      keyboardHint: 'Alt + ↑ / ↓ percorre as diferenças',
      truncated: 'Comparação truncada — os documentos são muito grandes',
      onlyOriginal: 'só no original',
      onlyChanged: 'só no modificado',
      replaced: 'substituído',
      headerOriginal: 'Original',
      headerChanged: 'Modificado',
      unifiedOriginal: '− original',
      unifiedChanged: '+ modificado',
      idle: 'Cole um documento de cada lado — ou aperte **Exemplo** para testar com um par que difere de algumas formas interessantes.',
      sideError:
        'O documento {side} tem um erro de sintaxe na linha {line}. Corrija e a comparação vai rodar.',
      sideOriginal: 'original',
      sideChanged: 'modificado',
      comparing: 'Comparando…',
      identicalTitle: 'Os dois documentos são equivalentes',
      identicalBody:
        'Todos os valores coincidem. Diferenças de ordem de chaves, indentação e espaços em branco são ignoradas, já que nenhuma delas muda o que o JSON significa.',
      identicalLines: p({
        one: '{count} linha idêntica',
        other: '{count} linhas idênticas',
      }),
      showIdentical: 'Mostrar estas linhas idênticas',
      jumpTo: 'Ir para a próxima diferença do tipo “{kind}”',
      kinds: {
        added: 'adicionado',
        removed: 'removido',
        changed: 'modificado',
        moved: 'movido',
      },
    },
  },
};
