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
    privacyPillMobile: '你的 JSON 留在这个标签页里',
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
    title: '永不离开浏览器的免费 JSON 工具',
    headlineLead: '从不碰服务器的',
    headlineAccent: '开发者工具。',
    lede: '小而锋利的实用工具，完全在这个标签页里运行——免费、无广告、无需注册。先是 JSON：格式化工具、查看器、校验器和比较工具，接下来是 JWT。',
    assurances: ['不上传任何内容', '不记录任何日志', '无需账号，没有限制'],
    closeLine: '拔掉网络。它照样能用。',
    closeCta: '为什么是真的',
    keywords: ['开发者工具', 'json 工具', 'json 格式化 在线', '免费开发工具'],
  },

  jsonHub: {
    title: 'JSON 工具 — 免费、无广告、在浏览器中运行',
    description:
      '免费的在线 JSON 工具：查看器、校验器、比较和格式化。无广告、无需注册，你粘贴的内容不会离开浏览器。',
    keywords: ['json 工具', 'json 在线工具', '免费 json 工具', 'json 实用工具'],
    headlineLead: '所有 JSON 工具，',
    headlineAccent: '都在一个标签页里。',
    lede: '四个用于处理 JSON 的锋利工具——树状[查看器](/json/viewer)、语法与模式[校验器](/json/validator)、可视化[比较工具](/json/diff)，以及[格式化与压缩工具](/json/formatter)。全部免费、全部无广告，并且每一个都在这个标签页里解析你的文档，而不是在服务器上。',
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
      {
        head: '为大文档而生',
        body: '解析、校验和比较都在工作线程中执行，因此几兆字节的文档也能处理，而不会在你输入时卡住页面。',
      },
    ],
    closeLine: '在浏览器的「网络」面板里验证这个说法。',
    closeCta: '为什么是真的',
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
      'JSON 排在最前，因为它是我们大多数人最常打交道的东西。接下来是 JWT 解码，这个列表还会继续增长——始终遵循同样的原则：快速、免费、无广告，并且完全在客户端运行。',
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
      originalTitle: '原始',
      changedTitle: '变更后',
      comparisonTitle: '比较',
      originalLabel: '原始 JSON',
      changedLabel: '变更后的 JSON',
      originalPlaceholder: '{\n  "这是": "原始文档"\n}',
      changedPlaceholder: '{\n  "这是": "用来比较的文档"\n}',
      swap: '交换',
      swapTitle: '交换两侧',
      hideInput: '隐藏输入',
      editInput: '编辑输入',
      hideTitle: '隐藏编辑器，把整页留给比较结果',
      showTitle: '重新显示编辑器',
      foldSame: '折叠相同行',
      showAll: '显示全部',
      showAllTitle: '显示每一行未变更的内容，而不是把它们折叠起来',
      split: '并排',
      stack: '堆叠',
      splitTitle: '并排显示两份文档',
      stackTitle: '把两份文档堆叠在一列中',
      prev: '上一处差异',
      next: '下一处差异',
      prevTitle: '上一处差异（Alt + ↑）',
      nextTitle: '下一处差异（Alt + ↓）',
      keyboardHint: 'Alt + ↑ / ↓ 可在差异之间跳转',
      truncated: '比较已截断——文档非常大',
      onlyOriginal: '仅在原始文档中',
      onlyChanged: '仅在变更后文档中',
      replaced: '已替换',
      headerOriginal: '原始',
      headerChanged: '变更后',
      unifiedOriginal: '− 原始',
      unifiedChanged: '+ 变更后',
      idle: '在两侧各粘贴一份文档——或者按下**示例**，用一对在几个有意思的地方存在差异的文档试试看。',
      sideError: '{side}文档的第 {line} 行有语法错误。修正它，比较就会运行。',
      sideOriginal: '原始',
      sideChanged: '变更后的',
      comparing: '正在比较…',
      identicalTitle: '两份文档是等价的',
      identicalBody:
        '每个值都匹配。键的顺序、缩进和空白上的差异都被忽略，因为它们都不会改变 JSON 的含义。',
      identicalLines: p({ other: '{count} 行完全相同' }),
      showIdentical: '显示这些完全相同的行',
      jumpTo: '跳转到下一处「{kind}」差异',
      kinds: {
        added: '新增',
        removed: '删除',
        changed: '变更',
        moved: '移动',
      },
    },
  },
};
