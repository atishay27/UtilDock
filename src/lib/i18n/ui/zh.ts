import { p } from '../format';
import type { UIStrings } from './en';

/** Chinese has no plural categories — every counted phrase carries only `other`. */
export const zh: UIStrings = {
  chrome: {
    skipToContent: '跳到主要内容',
    homeAria: 'UtilDock 首页',
    navTools: '工具',
    navSite: '站点',
    breadcrumb: '面包屑导航',
    home: '首页',
    soon: '即将推出',
    comingSoon: '即将推出',
    categoryTools: '{category} 工具',
    allCategoryTools: '全部 {category} 工具',
    openToolsMenu: '打开工具菜单',
    closeToolsMenu: '关闭工具菜单',
    toolsButton: '工具',
    privacyPill: '没有任何内容离开此标签页',
    privacyPillMobile: '你粘贴的内容留在这个标签页里',
    open: '打开',
  },

  theme: {
    toLight: '切换到浅色主题',
    toDark: '切换到深色主题',
    title: '切换主题',
    light: '浅色',
    dark: '深色',
  },

  footer: {
    tagline: '你的开发者工具船坞。',
    blurb: '免费、无广告，一切都在你自己的浏览器里运行。',
    about: '关于',
    privacy: '隐私',
    analytics: '分析',
    copyright: '© {year} UtilDock',
    language: '语言',
    languageAria: '选择语言',
  },

  consent: {
    region: '分析',
    heading: '分析',
    undecided:
      '我们希望使用 Google Analytics 统计页面浏览量，以了解哪些工具值得改进。它会设置一个 Cookie。你粘贴的内容永远不会包含在内——无论如何，你的 JSON 都不会离开这个标签页。',
    privacyPolicy: '隐私政策',
    whatItCollects: '收集了什么',
    currentlyOn: '当前已开启',
    granted:
      'Google Analytics 正在此浏览器中统计页面浏览量。你粘贴的内容永远不会包含在内。',
    currentlyOff: '当前已关闭',
    denied:
      '此浏览器不会向 Google 发出任何请求，已写入的分析 Cookie 也已删除。无论哪种情况，所有工具的运行完全相同。',
    allow: '允许分析',
    decline: '不用了',
    turnOff: '关闭它',
    turnOn: '开启它',
    close: '关闭',
  },

  tool: {
    taglineSuffix: '在此标签页内运行，从不发送到任何地方',
    howItWorks: '{name} 的工作原理',
    otherTools: '其他工具',
    commonQuestions: '常见问题',
  },

  home: {
    title: '永不离开浏览器的免费 JSON 与 JWT 工具',
    description:
      '完全在浏览器中运行的免费开发者工具：JSON 格式化、查看、校验与比较，JWT 解码与编码，字数统计。无广告、无需注册、不上传任何内容。',
    headlineLead: '从不碰服务器的',
    headlineAccent: '开发者工具。',
    lede: '小而锋利的实用工具，完全在这个标签页里运行——免费、无广告、无需注册。JSON 的格式化工具、查看器、校验器和比较工具，再加上一个从不接触你的密钥就能验证签名的 JWT 解码器。',
    assurances: ['不上传任何内容', '不记录任何日志', '无需账号，没有限制'],
    closeLine: '拔掉网络。它照样能用。',
    closeCta: '为什么是真的',
    keywords: ['开发者工具', 'json 工具', 'json 格式化 在线', '免费开发工具'],
  },

  hub: {
    chooseHeading: '选择一个工具',
    toolCount: p({ other: '{count} 个工具 · 还会更多' }),
    notes: [
      {
        head: '你粘贴的内容不会被上传',
        body: '这里的每个工具都是在你自己的标签页中运行的 JavaScript。断开网络后粘贴生产环境的数据，它依然可用——我们没有任何服务器能够接收它。',
      },
      {
        head: '无广告、无账号、无限制',
        body: '没有插屏广告，不需要注册，也不限制你能粘贴多少内容。你打开的那个页面，就是工具本身。',
      },
    ],
    closeLine: '在浏览器的「网络」面板里验证这个说法。',
    closeCta: '为什么是真的',

    categories: {
      json: {
        title: 'JSON 工具 — 免费、无广告、在浏览器中运行',
        description:
          '免费的在线 JSON 工具：查看器、校验器、比较和格式化。无广告、无需注册，你粘贴的内容不会离开浏览器。',
        keywords: ['json 工具', 'json 在线工具', '免费 json 工具', 'json 实用工具'],
        headlineLead: '所有 JSON 工具，',
        headlineAccent: '都在一个标签页里。',
        lede: '四个用于处理 JSON 的锋利工具——树状[查看器](/json/viewer)、语法与模式[校验器](/json/validator)、可视化[比较工具](/json/diff)，以及[格式化与压缩工具](/json/formatter)。全部免费、全部无广告，并且每一个都在这个标签页里解析你的文档，而不是在服务器上。',
        note: {
          head: '为大文档而生',
          body: '解析、校验和比较都在工作线程中执行，因此几兆字节的文档也能处理，而不会在你输入时卡住页面。',
        },
      },
      jwt: {
        title: 'JWT 工具 — 解码、验证与签名',
        description:
          '免费的在线 JWT 工具：解码令牌、验证签名，或生成并签名一个新令牌。你的令牌和密钥都不会离开浏览器。',
        keywords: [
          'jwt 工具',
          'jwt 解码 在线',
          'jwt 解码器 免费',
          '验证 jwt 签名',
          '生成 jwt 令牌 在线',
        ],
        headlineLead: '读懂令牌，',
        headlineAccent: '验证签名。',
        lede: '两个用于 JSON Web Token 的工具——[解码器](/jwt/decoder)会展示每一个 claim，并用你提供的密钥验证签名；[编码器](/jwt/encoder)则生成并签名一个全新的令牌。签名通过这个标签页里的 WebCrypto 完成，所以你粘贴的密钥永远不会被发送出去。',
        note: {
          head: '你的密钥不会离开这个标签页',
          body: '签名和验证都通过浏览器自带的 WebCrypto 原语完成。密钥只保存在内存中，用过即弃——它是本站唯一刻意不保存的输入。',
        },
      },
      text: {
        title: '文本工具 — 统计字数并整理文字',
        description:
          '免费的在线文本工具：统计词数、字符数和句子数，或清理空格、大小写与标点。全部在你的浏览器中运行。',
        keywords: [
          '字数统计',
          '在线字符统计',
          '文本工具',
          '在线文本格式化',
          '删除多余空格',
        ],
        headlineLead: '先量一量文字，',
        headlineAccent: '再把它整理好。',
        lede: '两个处理文字的工具——[计数器](/text/counter)在你输入时给出词数、字符数、句子数和阅读时间；[格式化工具](/text/formatter)则按照你所用语言的排版惯例修正空格、大小写和标点。你粘贴的内容不会离开这个页面。',
        note: {
          head: '在任何文字系统中都准确',
          body: '统计和格式化都遵循 Unicode 分词规则，因此日文会按词来计数而不是算作一个词，法文也会保留标点前的空格而不是把它删掉。',
        },
      },
    },
  },

  notFound: {
    title: '页面未找到',
    description: 'UtilDock 上不存在该页面。',
    headline: '该页面不存在。',
    body: '链接可能已经过期，或者地址输入有误。UtilDock 的全部工具列在下方。',
    cta: '返回首页',
    allTools: '全部工具',
  },

  about: {
    title: '关于 — 谁在做 UtilDock，以及为什么',
    description:
      'UtilDock 为何存在：小巧、快速、无广告的开发者工具，完全在你的浏览器中运行，由一位开发者独立构建，没有广告，你粘贴的内容也从不上传。',
    heading: '关于 UtilDock',
    whyHeading: '为什么会有这个站',
    why: [
      '每个开发者都需要格式化一段 JSON，或者弄清楚两份数据为什么对不上。这类搜索排在前面的工具，往往被广告淹没、被 Cookie 弹窗打断，而最让人不安的是，它们常常把你粘贴的内容发送到一台你一无所知的服务器上。当你调试的是生产环境的数据时，这是一笔很糟的交易。',
      'UtilDock 正好相反：一小组锋利的工具，没有广告，无需注册，你粘贴的任何内容都不会离开你的机器。',
    ],
    builtHeading: '它是怎么构建的',
    built: [
      '这是一个静态站点——HTML、CSS 和少量 JavaScript，从 Cloudflare 的边缘节点分发。每个工具都是自包含的组件，只在自己的页面上注水，因此你没有使用的页面不会带来任何开销。繁重的工作（解析、校验、比较）在 Web Worker 中完成，这正是几兆字节的文档不会在你输入时冻结页面的原因。',
      '没有后端。这是刻意的约束：一个无法把你的数据发送到任何地方的工具，也就无从泄露它。细节请见[隐私页面](/privacy)。',
    ],
    todayHeading: '目前有什么',
    today:
      'JSON 排在最前，因为它是我们大多数人最常打交道的东西，随后加入的是 JWT 解码器——包括签名验证，它跑在浏览器自带的 WebCrypto 上，所以密钥同样不会离开你的机器。这个列表还会继续增长，始终遵循同样的原则：快速、免费、无广告，并且完全在客户端运行。',
  },

  privacy: {
    title: '隐私 — 你粘贴的内容不会离开浏览器',
    description:
      'UtilDock 完全在你的浏览器中运行。你粘贴的任何文档都不会离开你的设备——不存在能够接收它的服务器。',
    heading: '隐私政策',
    updated: '最后更新：{date}',
    updatedDate: '2026 年 8 月',
    translationNote:
      '本页面为便利而提供的译文。如与英文版本有出入，以英文版本为准。',
    lead: '**你粘贴到 UtilDock 的任何内容都不会离开你的浏览器。** 每个工具都是在你自己的标签页中运行的 JavaScript。你的 JSON 从不会被发送到后端、从不会写入日志，我们也从未看到过它——我们没有任何服务器能够接收它。',
    howHeading: '工具是如何运行的',
    how: [
      'UtilDock 是一个静态网站。当你打开一个工具时，浏览器会下载一些 HTML、CSS 和 JavaScript，此后的一切都在本地进行。解析、格式化、校验和比较全部在你的标签页内运行。用**加载**按钮打开文件（或把文件拖放到页面上）只是把它从磁盘读入内存；这不是上传。',
      '由于没有后端，你处理的内容从不会被传输、记录或保留在任何地方。你可以断开互联网连接，工具照常工作。',
    ],
    storedHeading: '保存在你设备上的信息',
    stored:
      '为了让刷新不丢失你的工作，每个工具都会把当前输入保存到浏览器的 `localStorage`，同时保存你的主题选择和缩进宽度等少量偏好设置。这些数据留在你的设备上，只有你浏览器中的 UtilDock 能够读取，并且从不会传输给我们。在浏览器中清除本域名的站点数据即可将其全部删除。',
    storedConsent:
      '你对分析问题的回答也以同样方式保存，因此只会询问你一次。它只记录选择本身，不记录别的。',
    analyticsHeading: '分析与 Cookie',
    analyticsOn: [
      '在获得你同意的前提下，我们使用 Google Analytics 了解站点的使用情况——哪些页面被访问、访问频率如何——以便知道哪些工具值得改进。它通过 Google 跟踪代码管理器容器加载，在你允许之前不会运行。如果你拒绝，则不会设置任何分析 Cookie，也不会收集任何数据。',
      '启用后，Google Analytics 会收集标准的网页分析数据：浏览的页面、根据你的 IP 地址推断的大致位置、来源网站，以及一般的设备和浏览器信息。它会设置名为 `_ga` 和 `_ga_*` 的 Cookie 来识别回访者。此项处理在 [Google 的隐私政策](https://policies.google.com/privacy)中有说明。',
      '**分析永远不会收到你处理的内容。** 你的 JSON 不会包含在任何分析事件中。我们还禁用了 Google 的广告功能，因此你的访问不会被用于再营销、广告个性化或受众构建。',
    ],
    analyticsOff:
      '本站目前不加载任何分析。不会设置分析 Cookie，不会运行第三方脚本，也没有需要你同意的内容。',
    analyticsNever:
      '我们不出售你的数据，也不使用广告网络、社交媒体挂件、会话录制或指纹识别。',
    choicesHeading: '你的选择',
    choicesLead: '你可以随时',
    choicesButton: '查看或更改此项偏好设置',
    choicesRest:
      '。面板会显示当前生效的设置并允许你切换；每个页面页脚的「分析」链接都会打开同一个面板。',
    choicesImmediate:
      '关闭会立即生效，而不是等到下一次加载页面，`_ga` Cookie 也会在那一刻被删除——你不需要清除浏览器的站点数据来摆脱它们，当然那样做也可以。除非你重新开启，否则后续任何页面都不会再联系 Google。',
    choicesUngated:
      '无论你是否接受分析，本站的每个工具都完全一样地工作。没有任何功能取决于这个选择。清除本域名的站点数据会删除 UtilDock 保存的一切，包括你的主题和已保存的输入。',
    hostingHeading: '托管',
    hosting:
      'UtilDock 由 Cloudflare Pages 提供服务。与任何网页托管商一样，Cloudflare 会处理分发页面所需的网络请求，并可能出于安全和防滥用目的保留有限的技术数据——IP 地址、用户代理、时间戳——这受 [Cloudflare 的隐私政策](https://www.cloudflare.com/privacypolicy/)约束。这涵盖的是对站点自身文件的请求。你粘贴到工具中的内容从不属于任何请求的一部分，因此也不会出现在任何日志中。',
    securityHeading: '安全',
    security: [
      '本站通过 HTTPS 提供服务，并采用严格的 Content-Security-Policy，限制哪些来源可以加载代码或接收数据。正是这一点，让上面关于隐私的承诺成为站点构建方式本身的属性，而不是一个你只能选择相信的口头保证。欢迎你亲自验证：打开浏览器的开发者工具，使用站点上的任意工具，然后检查网络请求。',
      '安全问题可以报告到 [security@utildock.dev](mailto:security@utildock.dev)，或查看我们的 [security.txt](/.well-known/security.txt)。',
    ],
    childrenHeading: '儿童隐私',
    children:
      'UtilDock 是一款开发者工具，并非面向儿童。我们不会有意收集任何人的个人信息，包括 13 岁以下的儿童。',
    changesHeading: '本政策的变更',
    changes:
      '如果本政策发生变更，本页顶部的日期也会随之更新。至于「你粘贴的数据留在你的浏览器里」这一承诺，我们并不打算重新考虑。',
    contactHeading: '联系方式',
    contact:
      '关于本政策的问题可以发送至 [security@utildock.dev](mailto:security@utildock.dev)。',
  },

  toolAbout: {
    'json-formatter': [
      '把文档粘贴或拖放到输入面板，格式化结果会随着你的输入即时出现。可以选择 2 个、3 个或 4 个空格，也可以选择制表符——用你项目里采用的那种。切换到**压缩**可以去掉每一个空白字节，把 JSON 放进环境变量或 URL 之前正需要这样。',
      '**键排序**会把每个对象的键按字母顺序重写。两份仅在键顺序上不同的文档会变得逐字节一致，从而在版本控制中干净地比对。',
      '解析在 Web Worker 中运行，因此即便是几兆字节的文档，也能在你输入时完成格式化而不会让页面失去响应。',
    ],
    'json-viewer': [
      '把文档粘贴到源面板，它就会变成一棵可以浏览的树，对象和数组在每一层都能折叠，值按类型着色。',
      '过滤框同时匹配键和值，并会展开必要的层级把命中项显示给你。把鼠标悬停在任意一行上，即可复制通往该值的完整路径。',
      '只渲染当前屏幕上的行，因此拥有几十万个节点的文档滚动起来依然流畅。',
    ],
    'json-validator': [
      '每个语法错误都会带着精确的行号和列号报告出来，并在编辑器中于出错处加下划线。解析器会在第一个问题处停下——修好这一个，后面的问题就会显现。',
      '打开**按模式校验**，就会为 JSON Schema 打开第二个面板。每处违规都会连同其路径一起列出，点击其中一条就会让编辑器跳转过去。',
      '文档和模式都留在这个标签页里。两者都不会被上传——当模式是内部的、文档是真实数据时，这正是关键所在。',
    ],
    'json-diff': [
      '在两侧各粘贴一份文档。比较是结构性的而非文本性的：两份文档会先被解析，因此重新排序的键、不同的缩进和行尾空白都不会被算作变更。',
      '数组元素在存在标识时按标识配对——**id**、**key**、**uuid** 或 **name** 字段——因此在开头插入一个元素只会报告一处新增，而不是把后面的一切重写一遍。',
      '长段完全相同的行会被折叠起来，只留下变更本身以及刚好足以定位它们的结构。Alt + ↑ 和 Alt + ↓ 可以在差异之间逐个跳转。',
    ],
    'jwt-decoder': [
      '粘贴一个令牌——带不带 `Bearer` 前缀都可以——它会被拆成三个部分，并用颜色区分，让你看清每一段在哪里结束。头部和负载会被解码成 JSON，声明还会用通俗的说法再列一遍，其中 `exp`、`nbf` 和 `iat` 会显示为真实日期，并标出已经过去多久或者还有多久。',
      '**解码 JWT 不等于验证 JWT。** 前两部分是 base64url，不是加密：任何拿到令牌的人都能读到，所以令牌永远不是存放机密的地方。打开**验证签名**，为 HS 系列算法粘贴共享密钥，或者为 RS、PS、ES 系列粘贴公钥，签名就会被真正验证——支持 HS256/384/512、RS256/384/512、PS256/384/512 和 ES256/384/512，使用浏览器自带的 WebCrypto。',
      '你粘贴的密钥与本站其他任何输入都不同：它绝不会写入 `localStorage`，刷新后也不会被恢复。令牌和密钥都不会被上传，而且根本不存在能接收它们的服务器。',
    ],
    'jwt-encoder': [
      '用 JSON 写好头部和载荷，选一个算法，令牌就会随着你的输入组装并签名。**有效期预设**会以同一个时刻把 `iat`、`exp`（以及可选的 `nbf`）打进载荷，因此三者绝不会相差一秒——这类问题往往只在别人系统的时钟偏差容忍范围里才暴露出来。',
      '无论你的头部怎么写，`alg` 始终按你选定的算法写入。这不是为了方便：头部声称一种算法、签名却用另一种算法生成，正是 JWT 最著名漏洞的起点，而这条规则不会让任何正当的令牌造不出来。你写的其他头部字段都会原样保留。',
      '比哈希更短的 HS 密钥**默认会被拒绝**——RFC 7518 要求 HS256 至少 32 字节、HS384 至少 48 字节、HS512 至少 64 字节，而浏览器用四个字符也照签不误，尽管结果在离线状态下几秒钟就能被破解。这项检查可以关掉，因为复现一个弱令牌有时正是你要做的事。',
      '签名密钥的处理方式与解码器对待验证密钥的方式相同，而且更加谨慎：绝不写入 `localStorage`，刷新后不会恢复，不会出现在任何分析事件里，也没有任何后端能收到它。在使用 JWT 的系统中，签名密钥是最危险的秘密，所以对于生产密钥，在自己的环境里签发令牌仍是更好的习惯。',
    ],
    'text-counter': [
      '把文本粘贴或输入到面板里，所有计数会同时更新：词数、含空格与不含空格的字符数、句子、段落、行数和 UTF-8 字节数。不需要按任何按钮。',
      '计数使用浏览器自带的 **Unicode 文本分段**，而不是按空格切分，这个差别并非纸上谈兵。中文和日文的词与词之间不加空格，按空格切分会把整整一段算成一个词；同样的切分还会把法语的「l’objet」切成两个。文本分段知道本站发布的每一种文字里词到底在哪里断开，而 CJK 的阅读时间按每分钟字符数而非词数来衡量。',
      '**限制**面板跟踪人们真正在意的上限——280 字符的帖子、160 字符的短信、60 字符的页面标题、155 字符的元描述——而词频表会显示你倚重了哪些词，这是发现自己在重复用词的最快办法。',
    ],
    'text-formatter': [
      '每一项操作都是一个开关，不打开就不会运行。合并重复空格、去掉行尾空白、删除空行或重复行、排序行、转换大小写，或整理英文散文的标点——任意组合都可以。结果会随着输入出现在旁边，**替换输入**则把结果送回输入框，方便你再跑一遍。',
      '工具会报告每个开关改动了什么——「删除 12 行重复」「3 处重复词」——而不是丢给你一份改写过的文档、让你自己去找差别。这样一来，某条规则不该生效却生效了，是看得见的，而不是被埋掉的。',
      '**它不修正语法，也不假装能修。**主谓一致、时态和冠词选择要么需要服务器，要么需要 WebAssembly 语言模型；本站没有后端，其 Content-Security-Policy 也不允许 WebAssembly。取而代之的是机械层面——重复词、标点周围的空格、直引号、首字母大写——在这些地方，正确答案是规则而不是判断。这四项遵循英文排版惯例，默认关闭，因为法语的标点空格方式不同，而 CJK 根本不加空格。',
    ],
  },

  islands: {
    common: {
      load: '加载',
      loadTitle: '读取本地文件——它在本机读取，从不上传',
      sample: '示例',
      sampleTitle: '加载一份示例文档',
      clear: '清空',
      copy: '复制',
      copied: '已复制',
      copyTitle: '复制到剪贴板',
      download: '下载',
      dropHere: '把材料放到这里',
      path: '路径',
      pathCopied: '已复制',
      copyPathTitle: '复制路径 — {path}',
      validJson: '有效的 JSON',
      errorAt: '第 {line} 行，第 {column} 列 — {message}',
      stats: '对象 {objects} · 数组 {arrays} · 键 {keys} · 深度 {depth}',
      removeNulls: '去掉 null',
      removeNullsTitle:
        '删除所有取值为 null 的对象属性。数组里的 null 保持原样——删掉一个会让后面的所有下标整体前移。',
      nullsRemoved: p({ other: '去掉了 {count} 个 null' }),
    },

    formatter: {
      inputTitle: '输入',
      formattedTitle: '格式化结果',
      minifiedTitle: '压缩结果',
      inputLabel: 'JSON 输入',
      outputLabel: '格式化后的 JSON 输出',
      placeholder: '{\n  "在这里": "粘贴你的 JSON"\n}',
      idle: '粘贴或拖放 JSON 即可开始',
      indent: '缩进',
      spaces: '{count} 个空格',
      tab: '制表符',
      sortKeys: '键排序',
      sortKeysTitle: '按字母顺序排列对象的键',
      pretty: '格式化',
      minify: '压缩',
      sameSize: '大小相同',
      sizeDelta: '去除氧化皮 {delta} %',
      prettyFile: 'formatted.json',
      minifiedFile: 'minified.json',
    },

    viewer: {
      sourceTitle: '源',
      treeTitle: '树',
      sourceLabel: 'JSON 源',
      placeholder: '{\n  "在这里": "粘贴你想查看的 JSON"\n}',
      idle: '粘贴或拖放 JSON 即可查看',
      filter: '过滤键和值',
      filterAria: '过滤这棵树',
      expandAll: '全部展开',
      expandAllTitle: '展开每一个节点',
      collapse: '折叠',
      collapseTitle: '折叠回根节点',
      expand: '展开',
      treeAria: 'JSON 树',
      nothingYet: '暂时没有可显示的内容',
      matching: p({ other: '{count} 个匹配节点' }),
      rowsShown: '显示 {count} 行',
      noFilterMatch: '没有键或值匹配该过滤条件。',
      emptyValid: '只要「源」面板中有有效的 JSON，树就会出现在这里。',
      emptyError: '修正「源」面板中的语法错误，树就会出现在这里。',
    },

    validator: {
      documentTitle: '文档',
      schemaTitle: 'JSON Schema',
      resultTitle: '结果',
      documentLabel: '待校验的 JSON 文档',
      placeholder: '{\n  "在这里": "粘贴你想检查的 JSON"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: '有错误的',
      brokenTitle: '加载一份故意含有语法错误的文档',
      sampleValidTitle: '加载一份有效的示例',
      useSchema: '按模式校验',
      useSchemaTitle: '同时按 JSON Schema 校验该文档',
      idle: '粘贴或拖放 JSON 即可校验',
      checking: '正在检查…',
      invalidAt: '无效的 JSON — 第 {line} 行，第 {column} 列：{message}',
      schemaViolations: p({ other: 'JSON 有效，但有 {count} 处不符合模式' }),
      validAndMatches: 'JSON 有效，并且符合模式',
      emptyBody: '把文档粘贴到「文档」面板。它会随着你的输入被检查，全部在这个标签页内完成。',
      firstProblem:
        '解析器会在遇到的第一个问题处停下。修正这一个，文档后面的错误就会显现出来。',
      okSchema: '该文档是有效的 JSON，并且满足模式中的每一条规则。',
      okPlain: '该文档是有效的 JSON。',
      atLine: '第 {line} 行',
    },

    diff: {
      firstTitle: 'JSON 1',
      secondTitle: 'JSON 2',
      firstLabel: '第一份 JSON 文档',
      secondLabel: '第二份 JSON 文档',
      firstPlaceholder: '{\n  "粘贴": "第一份文档"\n}',
      secondPlaceholder: '{\n  "粘贴": "第二份文档"\n}',
      swap: '交换',
      swapTitle: '交换左右两侧',
      tidy: '整理',
      tidyTitle: '用旁边的设置重新缩进两份文档',
      tidyOne: '整理这份文档',
      autoTidy: '粘贴时整理',
      autoTidyTitle:
        '文档被粘贴、拖入或载入时立即重新缩进。正在输入的内容永远不会被悄悄改写。',
      foldSame: '折叠相同',
      foldSameTitle: '把连续相同的多行折叠成一行',
      showAll: '全部展开',
      showAllTitle: '显示每一行相同的内容，而不是折叠起来',
      prev: '上一处差异',
      next: '下一处差异',
      prevTitle: '上一处差异（Shift + F7）',
      nextTitle: '下一处差异（F7）',
      keyboardHint: 'F7 / Shift + F7 逐个查看差异',
      applyRight: '复制到 JSON 2',
      applyRightTitle: '把这一块复制到 JSON 2',
      applyLeft: '复制到 JSON 1',
      applyLeftTitle: '把这一块复制到 JSON 1',
      truncated: '比较已截断——文档非常大',
      onlyFirst: '仅在 JSON 1 中',
      onlySecond: '仅在 JSON 2 中',
      idle: '在两侧各粘贴一份文档——或者按下**示例**，用一对在几个有意思的地方存在差异的文档试试看。两侧都可以直接编辑，中间的箭头可以把一整块往任意一边复制。',
      identicalBody:
        '两份文档是等价的。每个值都一致，键的顺序、缩进和空白的差异会被忽略，因为它们都不改变这份 JSON 的含义。',
      formattingOnly:
        '同样的数据，写法不同——所有的值都一致，所以标出来的是格式或键的顺序。把两侧对齐即可消除。',
      alignSides: '对齐',
      alignSidesTitle:
        '把两份文档的键排序并重新缩进，让标出来的只剩真正的差异',
      tallyTitle: '无论格式如何，数据本身的{kind}',
      kinds: {
        added: '新增',
        removed: '删除',
        changed: '修改',
        moved: '移动',
      },
    },

    jwt: {
      tokenTitle: '令牌',
      tokenLabel: '要解码的 JSON Web Token',
      placeholder: '粘贴一个 JSON Web Token——由点号分隔的三个部分',
      idle: '粘贴一个令牌即可读取',
      decoded: '已解码',

      segHeader: '头部',
      segPayload: '负载',
      segSignature: '签名',
      segChars: p({ other: '{count} 个字符' }),

      sampleTitle: '载入一个真实且已正确签名的示例令牌',
      expired: '已过期',
      expiredTitle: '载入一个有效期已经过去的令牌',

      faults: {
        'not-a-token': '这不是 JSON Web Token。JWT 是用点号连接的三段 base64url。',
        encrypted:
          '这是一个加密令牌（JWE——五段而不是三段）。没有解密密钥就无法读取其内容，本工具和其他任何工具都一样。',
        'too-few-parts': 'JWT 由点号连接的三段组成。这个少于三段，说明缺了一部分。',
        'too-many-parts': '这里用点号分隔的段数比 JWT 或 JWE 所能有的还多。',
        'bad-base64': '这一段不是有效的 base64url，因此无法解码。最常见的原因是令牌被截断了。',
        'bad-json': '这一段解码成功了，但出来的内容不是 JSON。',
        'not-an-object': '这一段是 JSON，但令牌的头部和负载都必须是对象。',
      },

      headerTitle: '头部',
      payloadTitle: '负载',
      headerLabel: '解码后的头部',
      payloadLabel: '解码后的负载',
      algorithm: '算法',
      keyId: '密钥 ID',
      tokenType: '类型',

      claimsTitle: '声明',
      registeredHeading: '注册声明',
      customHeading: '自定义声明',
      noClaims: '在「令牌」面板里粘贴一个令牌，它的声明就会用通俗的说法列在这里。',
      noCustomClaims: '这个令牌除了注册声明之外没有别的内容。',
      noRegisteredClaims: '这个令牌不含任何注册声明——连过期时间都没有。',

      claimNames: {
        iss: '签发者',
        sub: '主体',
        aud: '受众',
        exp: '过期时间',
        nbf: '生效时间',
        iat: '签发时间',
        jti: '令牌 ID',
      },
      claimHints: {
        iss: '谁签发了这个令牌',
        sub: '它描述的是谁或什么',
        aud: '谁应当接受它',
        exp: '过了这一刻就必须拒绝',
        nbf: '在这一刻之前必须拒绝',
        iat: '它是什么时候签发的',
        jti: '它的唯一标识，用于吊销',
      },

      windowExpired: '已过期',
      windowNotYet: '尚未生效',
      windowValid: '在有效期内',
      windowUnbounded: '未设置过期时间——这个令牌永远不会失效',

      signatureTitle: '签名',
      decodeNotVerify:
        'JWT 是**编码，不是加密**——任何拿到这个令牌的人，不需要密钥就能读到上面的全部内容。只有验证签名才能说明它是真的、没有被改动过。',
      verify: '验证签名',
      verifyTitle: '就在这个标签页里，用密钥验证签名',
      secretLabel: '共享密钥',
      secretPlaceholder: '签发这个令牌时使用的密钥',
      keyLabel: '公钥',
      keyPlaceholder: 'PEM 格式的公钥、单个 JWK，或者整个 JWKS',
      keyAria: '验证用的密钥',
      base64Secret: '密钥是 base64url',
      base64SecretTitle: '在作为密钥材料使用之前，先把密钥从 base64url 解码',
      keyNeverStored: '密钥用完即弃——绝不会保存在这个浏览器里，也绝不会发送到任何地方。',
      sampleSecretHint: '示例令牌是用 `{secret}` 签名的。',
      checking: '验证中…',
      notChecked: '未验证',

      verdicts: {
        valid: '签名已验证',
        invalid: '签名与该密钥不匹配',
        unsecured:
          '未加保护的令牌——它的 `alg` 是 `none`，因此不带签名，什么也证明不了。大多数库会直接拒绝这类令牌。',
        unsupported: '{algorithm} 不是本工具能够验证的算法。',
        'bad-key': '无法读取该密钥。请使用以 `BEGIN PUBLIC KEY` 开头的 PEM 块、JWK 或 JWKS。',
        'no-key': '输入密钥后，签名会随着你的输入即时验证。',
        'no-signature': '这个令牌没有签名部分，因此没有可验证的内容。',
        'kid-mismatch': '该密钥集中没有与这个令牌的 `kid` 相符的密钥，因此无从验证。',
        error: '在这个浏览器里无法验证签名。',
      },
    },
    jwtEncoder: {
      headerTitle: '头部',
      payloadTitle: '载荷',
      tokenTitle: '已签名令牌',
      headerLabel: 'JSON 格式的 JWT 头部',
      payloadLabel: 'JSON 格式的 JWT 载荷',
      tokenLabel: '已签名的令牌',
      headerPlaceholder: '{\n  "kid": "你的密钥 id"\n}',
      payloadPlaceholder: '{\n  "sub": "user_123",\n  "name": "Ada Lovelace"\n}',

      algorithm: '算法',
      algorithmTitle: '这个令牌将如何签名——同时写入头部',
      unsecured: 'none — 不签名',
      unsecuredWarning:
        '这是一个**未加保护的令牌**：它的 `alg` 是 `none`，不带签名，也证明不了任何事。大多数库会直接拒绝。它的唯一用处，是测试你的库是否也会拒绝。',

      signingTitle: '签名密钥',
      secretLabel: '共享密钥',
      secretPlaceholder: '用来签名这个令牌的密钥',
      keyLabel: '私钥',
      keyPlaceholder: 'PKCS#8 私钥，或私有 JWK',
      keyAria: '签名密钥',
      base64Secret: '密钥为 base64url',
      base64SecretTitle: '在作为密钥材料使用前，先从 base64url 解码',
      keyNeverStored: '密钥用完即弃——不会保存在这个浏览器里，也不会发送到任何地方。',
      keyIsDangerous: '签名密钥能造出你的系统会接受的令牌。生产密钥请在自己的环境里用。',
      allowWeak: '允许短密钥',
      allowWeakTitle: '即使密钥短于 RFC 7518 的要求也照签——用于复现弱令牌',
      sampleSecretHint: '示例使用 `{secret}` 签名。',

      claimsTitle: '时间声明',
      stamp: '打时间戳',
      stampTitle: '以此刻为准，把 iat、exp 和 nbf 写入载荷',
      expiresIn: '有效期',
      includeNotBefore: '同时设置 nbf',
      includeNotBeforeTitle: '添加一个「不早于」声明，设为当前时刻',
      expiryPresets: {
        '15m': '15 分钟',
        '1h': '1 小时',
        '24h': '24 小时',
        '7d': '7 天',
        '30d': '30 天',
      },
      stamped: '已把 iat 和 exp 写入载荷',

      segHeader: '头部',
      segPayload: '载荷',
      segSignature: '签名',
      segChars: p({ other: '{count} 个字符' }),

      idle: '写好载荷并选择密钥，即可生成令牌',
      signing: '签名中…',
      signed: '令牌已签名',
      signedUnsecured: '已生成未加保护的令牌——它不带签名',
      tokenFile: 'token.jwt',
      emptyToken: '已签名的令牌会显示在这里。生成过程不上传任何内容：签名由这个浏览器计算。',

      faults: {
        'bad-header-json': '头部不是有效的 JSON，暂时没有可编码的内容。',
        'bad-payload-json': '载荷不是有效的 JSON，暂时没有可编码的内容。',
        'header-not-object': '令牌头部必须是 JSON 对象，不能是数组或单个值。',
        'payload-not-object': '令牌载荷必须是 JSON 对象，不能是数组或单个值。',
        unsupported: '这不是本工具能用来签名的算法。',
        'no-key': '输入密钥后，令牌会随着你的输入完成签名。',
        'bad-key':
          '无法读取该密钥。请使用以 `BEGIN PRIVATE KEY` 开头的 PEM 块，或带有 `d` 值的私有 JWK。',
        'weak-secret':
          '{algorithm} 要求密钥至少 {required} 字节，而这个只有 {actual} 字节。更短的密钥可以离线破解。若仍要签名，请打开**允许短密钥**。',
        error: '这个浏览器无法完成令牌签名。',
      },
    },

    counter: {
      inputTitle: '文本',
      inputLabel: '要统计的文本',
      placeholder: '粘贴或输入你要测量的文本…',
      idle: '粘贴或输入文本即可统计',
      counting: '统计中…',

      countsTitle: '统计',
      words: '词数',
      characters: '字符',
      charactersNoSpaces: '不含空格',
      sentences: '句子',
      paragraphs: '段落',
      lines: '行数',
      bytes: 'UTF-8 字节',

      timeTitle: '阅读时间',
      readingTime: '默读',
      speakingTime: '朗读',
      underAMinute: '不到一分钟',
      minutesAndSeconds: '{minutes} 分 {seconds} 秒',
      justSeconds: '{seconds} 秒',

      averagesTitle: '平均值',
      averageWordLength: '词长',
      averageSentenceLength: '每句词数',
      longestWord: '最长的词',
      charsUnit: p({ other: '{count} 个字符' }),
      wordsUnit: p({ other: '{count} 个词' }),

      limitsTitle: '限制',
      limitNames: {
        tweet: '帖子（X）',
        sms: '短信',
        'page-title': '页面标题',
        'meta-description': '元描述',
      },
      remaining: '还剩 {count}',
      over: '超出 {count}',
      limitsNote: '两项 SEO 限制只是近似值——搜索引擎按显示宽度截断，而不是按字符数。',

      frequencyTitle: '最常用的词',
      frequencyEmpty: '有文本可统计时，你最常用的词会出现在这里。',
      frequencyCount: p({ other: '{count} 次' }),

      emptyBody: '在左侧面板粘贴文本。所有统计都会随着输入更新，全部在这个标签页里完成。',
      impreciseNotice:
        '这个浏览器没有 Unicode 文本分段，因此词数是按空格切分统计的。对中文、日文和韩文来说，这个数字并不正确。',
      cjkNotice: '按 CJK 统计：词由文本分段切分而非按空格切分，阅读时间按每分钟字符数计算。',
    },

    textFormatter: {
      inputTitle: '输入',
      outputTitle: '格式化结果',
      optionsTitle: '要处理的项目',
      inputLabel: '要格式化的文本',
      outputLabel: '格式化后的文本',
      placeholder: '粘贴你想整理的文本…',
      idle: '粘贴文本并选择要处理的项目',
      formatting: '格式化中…',

      whitespaceHeading: '空白',
      trimLineEnds: '行尾空白',
      trimLineEndsTitle: '删除每行末尾的空格和制表符',
      collapseSpaces: '重复空格',
      collapseSpacesTitle: '把连续的空格或制表符合并为一个，保留缩进',
      collapseBlankLines: '多余空行',
      collapseBlankLinesTitle: '把两行及以上的空行合并为一行',
      removeBlankLines: '所有空行',
      removeBlankLinesTitle: '删除所有空行',
      trimDocument: '开头和结尾',
      trimDocumentTitle: '去掉整篇文档开头和结尾的空白',
      tabsToSpaces: '制表符转空格',
      tabsToSpacesTitle: '把每个制表符替换为两个空格',

      linesHeading: '行',
      removeDuplicateLines: '重复行',
      removeDuplicateLinesTitle: '每行只保留第一次出现；空行会保留',
      sortLines: '排序',
      sortModes: {
        none: '不排序',
        asc: '升序',
        desc: '降序',
      },

      caseHeading: '大小写',
      caseModes: {
        none: '保持原样',
        lower: '全部小写',
        upper: '全部大写',
        title: '每词首字母大写',
        sentence: '句首大写',
      },

      writingHeading: '标点',
      fixRepeatedWords: '重复词',
      fixRepeatedWordsTitle: '合并意外重复的词，例如「the the」',
      spaceAfterPunctuation: '标点后的空格',
      spaceAfterPunctuationTitle: '补上逗号或句号后缺失的空格——数字、URL 和 e.g. 不受影响',
      removeSpaceBeforePunctuation: '标点前的空格',
      removeSpaceBeforePunctuationTitle: '删除逗号、句号或冒号前多余的空格',
      smartQuotes: '弯引号',
      smartQuotesTitle: '把直引号转成排版用的弯引号；反引号内的代码会跳过',


      changesTitle: '改动内容',
      noChanges: '没有需要改动的地方。',
      nothingEnabled: '至少打开一个选项，结果就会出现在这里。',
      replaceInput: '替换输入',
      replaceInputTitle: '把结果送回输入框，再跑一遍',
      reset: '重置选项',
      resetTitle: '把每个开关恢复为默认值',
      outputFile: 'formatted.txt',
      emptyBody: '整理后的文本会显示在这里。不会上传任何内容——所有转换都在这个标签页里完成。',
    },
  },
};
