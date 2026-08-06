import type { CategoryCopyOverrides, ToolCopyOverrides } from './types';

export const categoriesPtbr: CategoryCopyOverrides = {
  json: {
    blurb: 'Leia, verifique, compare e remodele JSON sem sair da página.',
  },
  jwt: {
    blurb: 'Inspecione e verifique tokens. Em breve.',
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
    tagline: 'Decodifique e inspecione as claims de um token',
    does: ['Cabeçalho e payload', 'Expiração e claims', 'Verificação de assinatura'],
    title: 'Decodificador JWT',
    description:
      'Decodifique um JSON Web Token e inspecione seu cabeçalho, seu payload e suas claims.',
    keywords: ['decodificador jwt', 'decodificar jwt', 'jwt decoder português'],
  },
};
