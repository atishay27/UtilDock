import { p } from '../format';
import type { UIStrings } from './en';

/**
 * Japanese has no plural categories, so every counted phrase carries only
 * `other` — `Intl.PluralRules('ja')` returns that for any number, and writing a
 * `one` form here would be dead weight that never renders.
 */
export const ja: UIStrings = {
  chrome: {
    skipToContent: '本文へスキップ',
    homeAria: 'UtilDock ホーム',
    navTools: 'ツール',
    navSite: 'サイト',
    breadcrumb: 'パンくずリスト',
    home: 'ホーム',
    soon: '近日',
    comingSoon: '近日公開',
    categoryTools: '{category} ツール',
    allCategoryTools: '{category} ツールをすべて見る',
    openToolsMenu: 'ツールメニューを開く',
    closeToolsMenu: 'ツールメニューを閉じる',
    toolsButton: 'ツール',
    privacyPill: 'このタブから何も出ません',
    privacyPillMobile: 'あなたの JSON はこのタブに留まります',
    open: '開く',
  },

  theme: {
    toLight: 'ライトテーマに切り替える',
    toDark: 'ダークテーマに切り替える',
    title: 'テーマを切り替える',
    light: 'ライト',
    dark: 'ダーク',
  },

  footer: {
    tagline: '開発者ユーティリティのためのドック。',
    blurb: '無料、広告なし、すべてがあなたのブラウザ内で動作します。',
    about: 'このサイトについて',
    privacy: 'プライバシー',
    analytics: '分析',
    copyright: '© {year} UtilDock',
    language: '言語',
    languageAria: '言語を選択',
  },

  consent: {
    region: '分析',
    heading: '分析',
    undecided:
      'どのツールを改善すべきか知るために、Google アナリティクスでページビューを計測したいと考えています。これは Cookie を設定します。あなたが貼り付けた内容が含まれることは決してありません。いずれにせよ、あなたの JSON はこのタブから出ません。',
    privacyPolicy: 'プライバシーポリシー',
    whatItCollects: '収集される内容',
    currentlyOn: '現在オン',
    granted:
      'このブラウザで Google アナリティクスがページビューを計測しています。あなたが貼り付けた内容が含まれることはありません。',
    currentlyOff: '現在オフ',
    denied:
      'このブラウザから Google へのリクエストは一切行われず、すでに書き込まれた分析 Cookie は削除されました。どちらの場合も、すべてのツールはまったく同じように動作します。',
    allow: '分析を許可する',
    decline: '許可しない',
    turnOff: 'オフにする',
    turnOn: 'オンにする',
    close: '閉じる',
  },

  tool: {
    taglineSuffix: 'このタブ内で動作し、どこにも送信されません',
    howItWorks: '{name} のしくみ',
    otherTools: 'ほかのツール',
    commonQuestions: 'よくある質問',
  },

  home: {
    title: 'ブラウザから出ない無料の JSON ツール',
    headlineLead: 'サーバーに触れない',
    headlineAccent: '開発者ツール。',
    lede: 'このタブ内だけで完結する、小さく切れ味のよいユーティリティ。無料、広告なし、登録不要です。まずは JSON — フォーマッター、ビューア、バリデーター、比較ツール。次は JWT。',
    assurances: ['アップロードなし', 'ログなし', 'アカウント不要・制限なし'],
    closeLine: 'ネットワークを抜いてください。それでも動きます。',
    closeCta: 'なぜそう言えるのか',
    keywords: ['開発者ツール', 'json ツール', 'json 整形 オンライン', '無料 開発ツール'],
  },

  jsonHub: {
    title: 'JSON ツール — 無料・広告なし・ブラウザ内で動作',
    description:
      '無料のオンライン JSON ツール：ビューア、バリデーター、比較、フォーマッター。広告なし、登録不要、貼り付けた内容がブラウザから出ることはありません。',
    keywords: ['json ツール', 'json ツール オンライン', '無料 json ツール', 'json ユーティリティ'],
    headlineLead: 'JSON ツールのすべてを、',
    headlineAccent: 'ひとつのタブに。',
    lede: 'JSON を扱うための切れ味のよい 4 つのツール — ツリー[ビューア](/json/viewer)、構文とスキーマの[バリデーター](/json/validator)、視覚的な[比較ツール](/json/diff)、そして[フォーマッターとミニファイア](/json/formatter)。すべて無料、すべて広告なし。どれもサーバーではなくこのタブ内であなたのドキュメントを解析します。',
    chooseHeading: 'ツールを選ぶ',
    toolCount: p({ other: '{count} 個のツール · 順次追加' }),
    notes: [
      {
        head: '貼り付けた内容はアップロードされません',
        body: 'ここにあるすべてのツールは、あなた自身のタブで動く JavaScript です。ネットワークを切った状態で本番のペイロードを貼り付けても動作します。それを受け取れる当方のサーバーは存在しません。',
      },
      {
        head: '広告なし、アカウントなし、制限なし',
        body: 'インタースティシャルも登録もなく、貼り付けられる量に上限もありません。たどり着いたページが、そのままツールです。',
      },
      {
        head: '大きなドキュメント向けに作られています',
        body: '解析・検証・比較はワーカースレッドで実行されるため、数メガバイトのドキュメントでも入力中にページが固まることなく処理されます。',
      },
    ],
    closeLine: 'ネットワークパネルでこの主張を確かめてください。',
    closeCta: 'なぜそう言えるのか',
  },

  notFound: {
    title: 'ページが見つかりません',
    description: 'そのページは UtilDock に存在しません。',
    headline: 'そのページは存在しません。',
    body: 'リンクが古いか、アドレスの入力に誤りがあるかもしれません。UtilDock のすべてのツールを以下に掲載しています。',
    cta: 'ホームに戻る',
    allTools: 'すべてのツール',
  },

  about: {
    title: 'このサイトについて — UtilDock を作っているのは誰か、なぜか',
    description:
      'UtilDock が存在する理由：ブラウザ内だけで完結する、小さく高速で広告のない開発者ユーティリティ。ひとりの開発者が作り、広告はなく、貼り付けた内容がアップロードされることもありません。',
    heading: 'UtilDock について',
    whyHeading: 'なぜこれがあるのか',
    why: [
      '開発者なら誰でも、JSON を整形したり、2 つのペイロードが食い違う理由を突き止めたりする必要があります。そうした検索で最初に出てくるツールは、たいてい広告に埋もれ、Cookie の壁に遮られ、そして最も気がかりなことに、貼り付けた内容を素性の知れないサーバーへ送っていることが少なくありません。デバッグ対象が本番のペイロードであるとき、それは割に合わない取引です。',
      'UtilDock はその正反対です。切れ味のよい少数のツール、広告なし、登録なし、そして貼り付けた内容がマシンから出ていくことは決してありません。',
    ],
    builtHeading: 'どう作られているか',
    built: [
      'このサイトは静的です。HTML と CSS、そして少しの JavaScript が Cloudflare のエッジから配信されます。各ツールは自分のページでのみハイドレートする自己完結したコンポーネントなので、使っていないページのコストはゼロです。重い処理（解析・検証・比較）は Web Worker で行われ、だからこそ数メガバイトのドキュメントでも入力中にページが固まりません。',
      'バックエンドはありません。これは意図的な制約です。データをどこにも送れないツールは、データを漏らしようがありません。詳細は[プライバシーページ](/privacy)をご覧ください。',
    ],
    todayHeading: '今あるもの',
    today:
      'JSON が最初になったのは、多くの人が最も頻繁に手を伸ばすものだからです。次は JWT のデコードで、リストは今後も増えていきます。常に同じ原則のもとで — 速く、無料で、広告がなく、完全にクライアントサイドで。',
  },

  privacy: {
    title: 'プライバシー — 貼り付けた内容はブラウザから出ません',
    description:
      'UtilDock は完全にあなたのブラウザ内で動作します。貼り付けたドキュメントが端末から出ることはありません。それを受け取れるサーバーが存在しないからです。',
    heading: 'プライバシーポリシー',
    updated: '最終更新：{date}',
    updatedDate: '2026 年 8 月',
    translationNote:
      'これは便宜のために提供される翻訳です。英語版と相違がある場合は、英語版が優先されます。',
    lead: '**UtilDock に貼り付けた内容が、あなたのブラウザから出ることは決してありません。** すべてのツールは、あなた自身のタブで動く JavaScript です。あなたの JSON がバックエンドに送られることも、ログに書かれることも、私たちの目に触れることもありません。それを受け取れる当方のサーバーが存在しないからです。',
    howHeading: 'ツールのしくみ',
    how: [
      'UtilDock は静的なウェブサイトです。ツールを開くと、ブラウザが HTML と CSS、JavaScript を少し読み込み、その後の処理はすべてローカルで行われます。解析、整形、検証、比較のすべてがあなたのタブ内で実行されます。**読み込み**ボタンでファイルを開く（またはページにドロップする）操作は、ディスクからメモリへ読み込むだけで、アップロードではありません。',
      'バックエンドがないため、扱っている内容がどこかへ送信・記録・保持されることはありません。インターネットから切断してもツールは動き続けます。',
    ],
    storedHeading: '端末に保存される情報',
    stored:
      '再読み込みで作業が失われないよう、各ツールは現在の入力をブラウザの `localStorage` に保存します。テーマの選択やインデント幅などのいくつかの設定も同様です。これらのデータは端末上に留まり、あなたのブラウザ内の UtilDock だけが読み取れ、私たちに送信されることはありません。このドメインのサイトデータをブラウザで消去すれば、すべて削除されます。',
    storedConsent:
      '分析に関する質問への回答も同じ方法で保存されるため、尋ねられるのは一度だけです。記録されるのは選択そのものだけです。',
    analyticsHeading: '分析と Cookie',
    analyticsOn: [
      'あなたの同意のもと、サイトがどのように使われているか — どのページがどれくらい訪問されているか — を把握し、改善すべきツールを知るために Google アナリティクスを使用します。Google タグマネージャーのコンテナ経由で読み込まれ、あなたが許可するまで動作しません。拒否した場合、分析 Cookie は設定されず、データも収集されません。',
      '有効な場合、Google アナリティクスは標準的なウェブ分析データを収集します：閲覧されたページ、IP アドレスから推定されるおおよその位置、参照元サイト、および一般的な端末とブラウザの情報です。再訪問者を認識するため `_ga` と `_ga_*` という名前の Cookie を設定します。この処理は [Google のプライバシーポリシー](https://policies.google.com/privacy)に記載されています。',
      '**分析が、あなたの扱う内容を受け取ることは決してありません。** あなたの JSON はいかなる分析イベントにも含まれません。Google の広告機能も無効にしているため、あなたの訪問がリマーケティングや広告のパーソナライズ、オーディエンス構築に使われることはありません。',
    ],
    analyticsOff:
      'このサイトは現在、分析を一切読み込んでいません。分析 Cookie は設定されず、サードパーティのスクリプトも実行されず、同意すべきものもありません。',
    analyticsNever:
      '当方はあなたのデータを販売せず、広告ネットワーク、ソーシャルメディアウィジェット、セッション記録、フィンガープリンティングのいずれも使用しません。',
    choicesHeading: 'あなたの選択',
    choicesLead: 'いつでも',
    choicesButton: 'この設定を確認・変更',
    choicesRest:
      'できます。パネルには現在有効な設定が表示され、その場で切り替えられます。各ページのフッターにある分析リンクからも同じパネルが開きます。',
    choicesImmediate:
      'オフにすると次のページ読み込みを待たずに即座に反映され、`_ga` Cookie はその時点で削除されます。取り除くためにブラウザのサイトデータを消去する必要はありません（もちろん消去しても機能します）。再びオンにしない限り、以降のどのページでも Google に接続されることはありません。',
    choicesUngated:
      'このサイトのすべてのツールは、分析を受け入れるかどうかにかかわらず同じように動作します。この選択によって制限される機能はありません。このドメインのサイトデータを消去すると、テーマや保存された入力を含め、UtilDock が保存したものはすべて削除されます。',
    hostingHeading: 'ホスティング',
    hosting:
      'UtilDock は Cloudflare Pages で配信されています。他のウェブホストと同様に、Cloudflare はページ配信に必要なネットワークリクエストを処理し、セキュリティと不正防止のために限定的な技術データ — IP アドレス、ユーザーエージェント、タイムスタンプ — を保持することがあります。これは [Cloudflare のプライバシーポリシー](https://www.cloudflare.com/privacypolicy/)に従います。対象となるのはサイト自身のファイルへのリクエストです。ツールに貼り付けた内容がリクエストの一部になることはないため、どのログにも残りません。',
    securityHeading: 'セキュリティ',
    security: [
      'このサイトは HTTPS で配信され、どのオリジンがコードを読み込みデータを受け取れるかを制限する厳格な Content-Security-Policy が適用されています。これによって、上記のプライバシーに関する約束は、ただ信じてもらうしかない約束ではなく、サイトの作り方そのものの性質になっています。ぜひ確認してください。ブラウザの開発者ツールを開き、サイトの任意のツールを使い、リクエストを調べてみてください。',
      'セキュリティ上の問題は [security@utildock.dev](mailto:security@utildock.dev) までご報告いただくか、[security.txt](/.well-known/security.txt) をご覧ください。',
    ],
    childrenHeading: '子どものプライバシー',
    children:
      'UtilDock は開発者向けのツールであり、子どもを対象としていません。13 歳未満の子どもを含め、誰からも意図的に個人情報を収集することはありません。',
    changesHeading: 'このポリシーの変更',
    changes:
      'このポリシーが変更された場合、このページ上部の日付も変わります。貼り付けたデータがブラウザ内に留まるという約束については、見直す意図はありません。',
    contactHeading: 'お問い合わせ',
    contact:
      'このポリシーに関するご質問は [security@utildock.dev](mailto:security@utildock.dev) までお寄せください。',
  },

  toolAbout: {
    'json-formatter': [
      '入力パネルにドキュメントを貼り付けるかドロップすると、整形された結果が入力に応じて表示されます。スペース 2 個、3 個、4 個、またはタブから、プロジェクトで使っているものを選んでください。**ミニファイ**に切り替えると空白を 1 バイトも残さず削除します。JSON を環境変数や URL に埋め込む前にはこれが必要です。',
      '**キーをソート**は、各オブジェクトのキーをアルファベット順に並べ替えて書き直します。キーの順序だけが違う 2 つのドキュメントはバイト単位で同一になり、バージョン管理上できれいに差分が取れるようになります。',
      '解析は Web Worker で実行されるため、数メガバイトのドキュメントでも入力中にページが応答しなくなることなく整形できます。',
    ],
    'json-viewer': [
      'ソースパネルにドキュメントを貼り付けると、たどれるツリーになります。オブジェクトと配列はどの階層でも折りたためて、値は型ごとに色分けされます。',
      'フィルターはキーと値の両方を検索し、ヒットを見せるために必要な階層を開きます。任意の行にカーソルを合わせると、その値までの完全なパスをコピーできます。',
      '画面内にある行だけを描画するため、数十万ノードのドキュメントでもスクロールは滑らかなままです。',
    ],
    'json-validator': [
      '構文エラーは必ず正確な行と列とともに報告され、発生箇所がエディター上で下線表示されます。パーサーは最初の問題で止まるので、それを直せばさらに下にあるものが現れます。',
      '**スキーマで検証**をオンにすると、JSON Schema 用の 2 つ目のパネルが開きます。違反はそれぞれパス付きで一覧表示され、クリックするとエディターがその位置へジャンプします。',
      'ドキュメントもスキーマもこのタブに留まります。どちらもアップロードされません。スキーマが社内のもので、ドキュメントが実データであるときに効いてくるのはまさにそこです。',
    ],
    'json-diff': [
      '左右それぞれにドキュメントを貼り付けてください。比較はテキストではなく構造に対して行われます。両方のドキュメントを先に解析するため、キーの並べ替え、インデントの違い、行末の空白が変更として扱われることはありません。',
      '配列の要素は、識別子がある場合はそれで対応付けられます（**id**、**key**、**uuid**、**name** のいずれかのフィールド）。そのため先頭に要素を挿入しても、以降すべてを書き換えるのではなく 1 件の追加として報告されます。',
      '同一行が長く続く箇所は折りたたまれ、変更箇所とそれを位置づけるのに必要な最小限の構造だけが残ります。Alt + ↑ と Alt + ↓ で差分を順にたどれます。',
    ],
  },

  islands: {
    common: {
      load: '読み込み',
      loadTitle: 'ローカルファイルを読み込みます。このマシン上で読み込まれ、アップロードされません',
      sample: 'サンプル',
      sampleTitle: 'サンプルドキュメントを読み込む',
      clear: 'クリア',
      copy: 'コピー',
      copied: 'コピーしました',
      copyTitle: 'クリップボードにコピー',
      download: 'ダウンロード',
      dropHere: 'ここに素材をドロップ',
      path: 'パス',
      pathCopied: 'コピー済み',
      copyPathTitle: 'パスをコピー — {path}',
      validJson: '有効な JSON',
      errorAt: '{line} 行 {column} 列 — {message}',
      stats:
        'オブジェクト {objects} · 配列 {arrays} · キー {keys} · 深さ {depth}',
    },

    formatter: {
      inputTitle: '入力',
      formattedTitle: '整形結果',
      minifiedTitle: 'ミニファイ結果',
      inputLabel: 'JSON 入力',
      outputLabel: '整形された JSON 出力',
      placeholder: '{\n  "ここに": "JSON を貼り付け"\n}',
      idle: 'JSON を貼り付けるかドロップして開始',
      indent: 'インデント',
      spaces: 'スペース {count} 個',
      tab: 'タブ',
      sortKeys: 'キーをソート',
      sortKeysTitle: 'オブジェクトのキーをアルファベット順に並べ替える',
      pretty: '整形',
      minify: 'ミニファイ',
      sameSize: '同じサイズ',
      sizeDelta: '{delta} % の酸化スケール除去',
      prettyFile: 'formatted.json',
      minifiedFile: 'minified.json',
    },

    viewer: {
      sourceTitle: 'ソース',
      treeTitle: 'ツリー',
      sourceLabel: 'JSON ソース',
      placeholder: '{\n  "ここに": "調べたい JSON を貼り付け"\n}',
      idle: 'JSON を貼り付けるかドロップして調べる',
      filter: 'キーと値を絞り込む',
      filterAria: 'ツリーを絞り込む',
      expandAll: 'すべて展開',
      expandAllTitle: 'すべてのノードを展開する',
      collapse: '折りたたむ',
      collapseTitle: 'ルートまで折りたたむ',
      expand: '展開',
      treeAria: 'JSON ツリー',
      nothingYet: 'まだ表示するものはありません',
      matching: p({ other: '一致するノード {count} 件' }),
      rowsShown: '{count} 行を表示中',
      noFilterMatch: 'その条件に一致するキーや値はありません。',
      emptyValid: 'ソースパネルに有効な JSON が入ると、ここにツリーが表示されます。',
      emptyError: 'ソースパネルの構文エラーを直すと、ここにツリーが表示されます。',
    },

    validator: {
      documentTitle: 'ドキュメント',
      schemaTitle: 'JSON Schema',
      resultTitle: '結果',
      documentLabel: '検証する JSON ドキュメント',
      placeholder: '{\n  "ここに": "確認したい JSON を貼り付け"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: '壊れた例',
      brokenTitle: '意図的に構文エラーを含むドキュメントを読み込む',
      sampleValidTitle: '正しいサンプルを読み込む',
      useSchema: 'スキーマで検証',
      useSchemaTitle: 'ドキュメントを JSON Schema に照らしても検証する',
      idle: 'JSON を貼り付けるかドロップして検証',
      checking: '確認中…',
      invalidAt: '無効な JSON — {line} 行 {column} 列：{message}',
      schemaViolations: p({ other: '有効な JSON ですが、スキーマ違反が {count} 件' }),
      validAndMatches: '有効な JSON で、スキーマにも適合しています',
      emptyBody:
        'ドキュメントパネルにドキュメントを貼り付けてください。入力に応じて、すべてこのタブ内で検証されます。',
      firstProblem:
        'パーサーは最初に見つかった問題で停止します。これを直すと、ドキュメントのさらに下にあるエラーが現れます。',
      okSchema: 'このドキュメントは有効な JSON であり、スキーマのすべての規則を満たしています。',
      okPlain: 'このドキュメントは有効な JSON です。',
      atLine: '{line} 行',
    },

    diff: {
      originalTitle: '変更前',
      changedTitle: '変更後',
      comparisonTitle: '比較',
      originalLabel: '変更前の JSON',
      changedLabel: '変更後の JSON',
      originalPlaceholder: '{\n  "これは": "変更前のドキュメント"\n}',
      changedPlaceholder: '{\n  "これは": "比較対象のドキュメント"\n}',
      swap: '入れ替え',
      swapTitle: '左右を入れ替える',
      hideInput: '入力を隠す',
      editInput: '入力を編集',
      hideTitle: 'エディターを隠して比較にページ全体を使う',
      showTitle: 'エディターを再表示する',
      foldSame: '同一行を畳む',
      showAll: 'すべて表示',
      showAllTitle: '変更のない行を畳まずにすべて表示する',
      split: '左右',
      stack: '縦積み',
      splitTitle: '2 つのドキュメントを左右に並べて表示する',
      stackTitle: '2 つのドキュメントを 1 列に積み重ねる',
      prev: '前の差分',
      next: '次の差分',
      prevTitle: '前の差分（Alt + ↑）',
      nextTitle: '次の差分（Alt + ↓）',
      keyboardHint: 'Alt + ↑ / ↓ で差分をたどれます',
      truncated: '比較を打ち切りました — ドキュメントが非常に大きいためです',
      onlyOriginal: '変更前のみ',
      onlyChanged: '変更後のみ',
      replaced: '置換',
      headerOriginal: '変更前',
      headerChanged: '変更後',
      unifiedOriginal: '− 変更前',
      unifiedChanged: '+ 変更後',
      idle: '左右それぞれにドキュメントを貼り付けてください。**サンプル**を押すと、いくつか興味深い違いのあるペアで試せます。',
      sideError:
        '{side}のドキュメントの {line} 行目に構文エラーがあります。修正すると比較が実行されます。',
      sideOriginal: '変更前',
      sideChanged: '変更後',
      comparing: '比較中…',
      identicalTitle: '2 つのドキュメントは等価です',
      identicalBody:
        'すべての値が一致しています。キーの順序、インデント、空白の違いは無視されます。いずれも JSON の意味を変えないためです。',
      identicalLines: p({ other: '同一の行 {count} 行' }),
      showIdentical: 'これらの同一行を表示する',
      jumpTo: '次の「{kind}」の差分へ移動',
      kinds: {
        added: '追加',
        removed: '削除',
        changed: '変更',
        moved: '移動',
      },
    },
  },
};
