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
    privacyPillMobile: '貼り付けたものはこのタブに留まります',
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
    title: 'ブラウザから出ない無料の JSON・JWT ツール',
    description:
      'ブラウザ内だけで動く無料の開発者ツール：JSON フォーマッター・ビューア・バリデーター・差分、JWT デコーダーとエンコーダー、文字数カウント。広告なし、登録不要、アップロードなし。',
    headlineLead: 'サーバーに触れない',
    headlineAccent: '開発者ツール。',
    lede: 'このタブ内だけで完結する、小さく切れ味のよいユーティリティ。無料、広告なし、登録不要です。JSON のフォーマッター、ビューア、バリデーター、比較ツールに加えて、鍵を一切見ることなく署名を検証する JWT デコーダーも。',
    assurances: ['アップロードなし', 'ログなし', 'アカウント不要・制限なし'],
    closeLine: 'ネットワークを抜いてください。それでも動きます。',
    closeCta: 'なぜそう言えるのか',
    keywords: ['開発者ツール', 'json ツール', 'json 整形 オンライン', '無料 開発ツール'],
  },

  hub: {
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
    ],
    closeLine: 'ネットワークパネルでこの主張を確かめてください。',
    closeCta: 'なぜそう言えるのか',

    categories: {
      json: {
        title: 'JSON ツール — 無料・広告なし・ブラウザ内で動作',
        description:
          '無料のオンライン JSON ツール：ビューア、バリデーター、比較、フォーマッター。広告なし、登録不要、貼り付けた内容がブラウザから出ることはありません。',
        keywords: ['json ツール', 'json ツール オンライン', '無料 json ツール', 'json ユーティリティ'],
        headlineLead: 'JSON ツールのすべてを、',
        headlineAccent: 'ひとつのタブに。',
        lede: 'JSON を扱うための切れ味のよい 4 つのツール — ツリー[ビューア](/json/viewer)、構文とスキーマの[バリデーター](/json/validator)、視覚的な[比較ツール](/json/diff)、そして[フォーマッターとミニファイア](/json/formatter)。すべて無料、すべて広告なし。どれもサーバーではなくこのタブ内であなたのドキュメントを解析します。',
        note: {
          head: '大きなドキュメント向けに作られています',
          body: '解析・検証・比較はワーカースレッドで実行されるため、数メガバイトのドキュメントでも入力中にページが固まることなく処理されます。',
        },
      },
      jwt: {
        title: 'JWT ツール — デコード・検証・署名',
        description:
          '無料のオンライン JWT ツール：トークンをデコードし、署名を検証し、新しいトークンを作成して署名します。トークンも鍵もブラウザから出ません。',
        keywords: [
          'jwt ツール',
          'jwt デコード オンライン',
          'jwt デコーダー 無料',
          'jwt 署名 検証',
          'jwt トークン 生成',
        ],
        headlineLead: 'トークンを読み、',
        headlineAccent: '署名を確かめる。',
        lede: 'JSON Web Token のための 2 つのツール — すべてのクレームを表示し、あなたが指定した鍵で署名を検証する[デコーダー](/jwt/decoder)と、新しいトークンを作成して署名する[エンコーダー](/jwt/encoder)。署名はこのタブ内の WebCrypto で行われるため、貼り付けた秘密鍵が送信されることはありません。',
        note: {
          head: '鍵はタブの外に出ません',
          body: '署名も検証もブラウザ自身のプリミティブである WebCrypto で行われます。鍵はメモリ上に置かれ、使われ、破棄されます。このサイトで意図的に保存しない唯一の入力です。',
        },
      },
      text: {
        title: 'テキストツール — 文字数を数えて整える',
        description:
          '無料のオンラインテキストツール：単語・文字・文の数を数え、空白や大文字小文字、句読点を整えます。すべてブラウザ内で動作します。',
        keywords: [
          '文字数カウント',
          '単語数 カウント オンライン',
          'テキストツール',
          'テキスト整形 オンライン',
          '余分な空白 削除',
        ],
        headlineLead: '文章を測って、',
        headlineAccent: 'それから整える。',
        lede: '文章のための 2 つのツール — 入力しながら単語数・文字数・文の数・読了時間を表示する[カウンター](/text/counter)と、作業中の言語の慣習に合わせて空白・大文字小文字・句読点を直す[フォーマッター](/text/formatter)。貼り付けた内容がページの外に出ることはありません。',
        note: {
          head: 'どの文字体系でも正しく',
          body: 'カウントも整形も Unicode のセグメンテーションに従うため、日本語は 1 語ではなく語ごとに数えられ、フランス語は句読点の前の空白を失わずに保ちます。',
        },
      },
    },
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
      'JSON が最初になったのは、多くの人が最も頻繁に手を伸ばすものだからです。続いて JWT デコーダーが加わりました。署名の検証も含めてブラウザー自身の WebCrypto 上で動くので、鍵もあなたの手元から出ません。リストは今後も増えていきます。常に同じ原則のもとで — 速く、無料で、広告がなく、完全にクライアントサイドで。',
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
    'jwt-decoder': [
      'トークンを貼り付けると（`Bearer` 接頭辞はあってもなくても構いません）、3 つの部分に分かれ、それぞれの区切りが色で分かるようになります。ヘッダーとペイロードは JSON にデコードされ、クレームは平易な言葉で改めて一覧表示されます。`exp`、`nbf`、`iat` は実際の日付として、またどれだけ前か・どれだけ先かとしても表示されます。',
      '**JWT のデコードは検証ではありません。** 最初の 2 つの部分は暗号化ではなく base64url です。トークンを持っている人なら誰でも読めます。だからこそ、トークンは秘密情報を入れる場所ではありません。**署名を検証する**を有効にして、HS 系なら共有シークレットを、RS・PS・ES 系なら公開鍵を貼り付けると、署名が実際に検証されます — HS256/384/512、RS256/384/512、PS256/384/512、ES256/384/512 に対応し、ブラウザー自身の WebCrypto を使います。',
      '貼り付けた鍵は、このサイトのほかのどの入力とも違う扱いを受けます。`localStorage` に書き込まれることはなく、再読み込み時に復元されることもありません。トークンも鍵も、どこにもアップロードされません。そもそも、それらを受け取れるサーバーが存在しません。',
    ],
    'jwt-encoder': [
      'ヘッダーとペイロードを JSON で書き、アルゴリズムを選ぶと、入力しながらトークンが組み立てられ、署名されます。**有効期限のプリセット**は `iat`、`exp`、必要なら `nbf` を同じ一瞬から打刻するので、三つが 1 秒ずれることはありません。これは他システムのクロックずれ許容範囲の中でしか表面化しない、厄介な種類の不具合です。',
      '`alg` はヘッダーに何が書かれていても、常に選んだアルゴリズムから書き込まれます。これは利便性のためではありません。あるアルゴリズムを名乗るヘッダーに別のアルゴリズムで作った署名を組み合わせたものは、JWT で最もよく知られた脆弱性の出発点であり、そのために作れなくなる正当なトークンは存在しません。ヘッダーのそれ以外のフィールドは、書いたとおりそのまま保たれます。',
      'ハッシュより短い HS シークレットは**既定で拒否されます**。RFC 7518 は HS256 に 32 バイト、HS384 に 48 バイト、HS512 に 64 バイトを要求しており、ブラウザーは 4 文字でも平然と署名しますが、その結果はオフラインで数秒のうちに破られます。この検査は切ることもできます。弱いトークンを再現すること自体が目的の場合があるからです。',
      '署名鍵は、デコーダーが検証鍵を扱うのと同じように、いやそれ以上に慎重に扱われます。`localStorage` に書かれず、再読み込みでも復元されず、アナリティクスのイベントにも入らず、受け取りうるバックエンドも存在しません。署名鍵は JWT を使うシステムで最も危険な秘密です。本番の鍵については、自分の環境でトークンを発行するほうが良い習慣であり続けます。',
    ],
    'text-counter': [
      'パネルに貼り付けるか入力すると、単語数、空白ありとなしの文字数、文、段落、行、UTF-8 バイト数がすべて同時に更新されます。何も押す必要はありません。',
      'カウントには空白での分割ではなく、ブラウザー自身の **Unicode テキスト分割**を使っています。この違いは机上のものではありません。日本語と中国語は単語の間に空白を置かないため、空白で分割すると段落まるごとが 1 単語として数えられてしまいます。同じ分割はフランス語の «l’objet» を 2 語に切ってしまいます。テキスト分割はこのサイトが公開するすべての文字体系で、単語が本当にどこで切れるかを知っており、CJK の読了時間は単語数ではなく 1 分あたりの文字数で測られます。',
      '**上限**パネルは、実際に人が意識して書いている上限を追いかけます。280 文字の投稿、160 文字の SMS、60 文字のページタイトル、155 文字のメタディスクリプション。頻度表はどの語に頼ったかを示し、同じ語の繰り返しに気づく最短の方法になります。',
    ],
    'text-formatter': [
      'すべての処理はスイッチで、入れるまで何も動きません。連続した空白をまとめる、行末の空白を取る、空行や重複行を消す、行を並べ替える、大文字小文字を変える、英文の句読点を整える——どの組み合わせでも構いません。結果は入力の隣に、打っている最中から現れます。**入力を置き換え**を押すと結果が入力側に戻り、続けてもう一度かけられます。',
      'このツールは各スイッチが何を変えたかを報告します。「重複行を 12 行削除」「繰り返しの語 3 件」といった具合です。書き換えた文書だけを返して違いを探させることはしません。意図せず働いてしまった規則も、埋もれるのではなく見える形になります。',
      '**文法は直しませんし、直すとも言いません。**一致・時制・冠詞の選択には、サーバーか WebAssembly の言語モデルが要ります。このサイトにバックエンドはなく、Content-Security-Policy は WebAssembly を許可していません。代わりにあるのは機械的な層です。繰り返しの語、句読点まわりの空白、直線的な引用符、大文字化——正解が判断ではなく規則である領域です。この 4 つは英語の組版慣習に従うため既定では切ってあります。フランス語は句読点の空け方が違い、CJK はそもそも空けないからです。',
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
      removeNulls: 'null を除去',
      removeNullsTitle:
        '値が null のオブジェクトのプロパティをすべて削除します。配列の中の null はそのままにします — 取り除くと以降の添字がすべてずれてしまうためです。',
      nullsRemoved: p({ other: 'null を {count} 件除去' }),
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
      firstTitle: 'JSON 1',
      secondTitle: 'JSON 2',
      firstLabel: '1 つ目の JSON ドキュメント',
      secondLabel: '2 つ目の JSON ドキュメント',
      firstPlaceholder: '{\n  "ここに": "1 つ目のドキュメント"\n}',
      secondPlaceholder: '{\n  "ここに": "2 つ目のドキュメント"\n}',
      swap: '入れ替え',
      swapTitle: '左右を入れ替える',
      tidy: '整形',
      tidyTitle: '隣の設定で両方のドキュメントを整形し直す',
      tidyOne: 'このドキュメントを整形',
      autoTidy: '貼り付け時に整形',
      autoTidyTitle:
        '貼り付け・ドロップ・読み込みで届いたドキュメントをその場で整形します。入力中の文字が勝手に整形されることはありません。',
      foldSame: '同じ行を畳む',
      foldSameTitle: '同一の行が長く続く箇所を 1 行に畳む',
      showAll: 'すべて表示',
      showAllTitle: '同一の行も畳まずにすべて表示する',
      prev: '前の差分',
      next: '次の差分',
      prevTitle: '前の差分（Shift + F7）',
      nextTitle: '次の差分（F7）',
      keyboardHint: 'F7 / Shift + F7 で差分をたどれます',
      applyRight: 'JSON 2 へコピー',
      applyRightTitle: 'このブロックを JSON 2 へコピー',
      applyLeft: 'JSON 1 へコピー',
      applyLeftTitle: 'このブロックを JSON 1 へコピー',
      truncated: '比較を打ち切りました — ドキュメントが非常に大きいためです',
      onlyFirst: 'JSON 1 だけにある',
      onlySecond: 'JSON 2 だけにある',
      idle: '左右それぞれにドキュメントを貼り付けてください。**サンプル**を押すと、いくつか興味深い違いのあるペアで試せます。どちらの側もそのまま編集でき、中央の矢印でブロックをどちら向きにもコピーできます。',
      identicalBody:
        '2 つのドキュメントは等価です。すべての値が一致しており、キーの順序・インデント・空白の違いは JSON の意味を変えないため無視されます。',
      formattingOnly:
        '同じデータを別の書き方で表しています。値はすべて一致しているので、印が付いているのは整形やキーの順序の差です。両側をそろえると消えます。',
      alignSides: 'そろえる',
      alignSidesTitle:
        '両方のドキュメントのキーを並べ替えて整形し直し、本当の差分だけが印として残るようにします',
      tallyTitle: '整形の差にかかわらず、データそのものにおける{kind}',
      kinds: {
        added: '追加',
        removed: '削除',
        changed: '変更',
        moved: '移動',
      },
    },

    jwt: {
      tokenTitle: 'トークン',
      tokenLabel: 'デコードする JSON Web Token',
      placeholder: 'JSON Web Token を貼り付けてください — ドットで区切られた 3 つの部分',
      idle: 'トークンを貼り付けると読み取ります',
      decoded: 'デコード完了',

      segHeader: 'ヘッダー',
      segPayload: 'ペイロード',
      segSignature: '署名',
      segChars: p({ other: '{count} 文字' }),

      sampleTitle: '実際に正しく署名されたサンプルトークンを読み込む',
      expired: '期限切れ',
      expiredTitle: '有効期限がすでに過ぎたトークンを読み込む',

      faults: {
        'not-a-token':
          'これは JSON Web Token ではありません。JWT は base64url の 3 つの部分をドットでつないだものです。',
        encrypted:
          'これは暗号化トークン（JWE — 3 つではなく 5 つの部分）です。復号鍵がなければ中身は読めません。このツールでも、ほかのどのツールでも同じです。',
        'too-few-parts':
          'JWT はドットでつないだ 3 つの部分から成ります。これはそれより少ないため、何かが欠けています。',
        'too-many-parts':
          'ドットで区切られた部分が、JWT にも JWE にもありえない数だけあります。',
        'bad-base64':
          'この部分は正しい base64url ではないためデコードできません。原因はたいてい、トークンが途中で切れていることです。',
        'bad-json': 'この部分はデコードできましたが、出てきたものは JSON ではありません。',
        'not-an-object':
          'この部分は JSON ですが、トークンのヘッダーとペイロードはそれぞれオブジェクトである必要があります。',
      },

      headerTitle: 'ヘッダー',
      payloadTitle: 'ペイロード',
      headerLabel: 'デコードされたヘッダー',
      payloadLabel: 'デコードされたペイロード',
      algorithm: 'アルゴリズム',
      keyId: '鍵 ID',
      tokenType: '種別',

      claimsTitle: 'クレーム',
      registeredHeading: '登録済みクレーム',
      customHeading: 'カスタムクレーム',
      noClaims: 'トークンパネルにトークンを貼り付けると、そのクレームがここに平易な言葉で並びます。',
      noCustomClaims: 'このトークンには登録済みクレーム以外は含まれていません。',
      noRegisteredClaims:
        'このトークンには登録済みクレームが 1 つも含まれていません。有効期限すらありません。',

      claimNames: {
        iss: '発行者',
        sub: '主体',
        aud: '想定受信者',
        exp: '有効期限',
        nbf: '有効開始',
        iat: '発行日時',
        jti: 'トークン ID',
      },
      claimHints: {
        iss: 'このトークンを発行したのは誰か',
        sub: '誰の、または何についてのものか',
        aud: '誰が受け入れるべきか',
        exp: 'この時点を過ぎたら拒否しなければならない',
        nbf: 'この時点より前は拒否しなければならない',
        iat: 'いつ発行されたか',
        jti: '失効管理に使われる一意の ID',
      },

      windowExpired: '期限切れ',
      windowNotYet: 'まだ有効ではありません',
      windowValid: '有効期間内',
      windowUnbounded: '有効期限なし — このトークンは受け入れられ続けます',

      signatureTitle: '署名',
      decodeNotVerify:
        'JWT は**暗号化ではなくエンコード**されているだけです。このトークンを持っている人は誰でも、鍵なしで上の内容をすべて読めます。それが本物で改ざんされていないと分かるのは、署名を検証したときだけです。',
      verify: '署名を検証する',
      verifyTitle: 'このタブの中で、鍵を使って署名を検証します',
      secretLabel: '共有シークレット',
      secretPlaceholder: 'このトークンの署名に使われたシークレット',
      keyLabel: '公開鍵',
      keyPlaceholder: 'PEM 形式の公開鍵、単一の JWK、または JWKS 全体',
      keyAria: '検証用の鍵',
      base64Secret: 'シークレットは base64url',
      base64SecretTitle: '鍵素材として使う前に、シークレットを base64url からデコードします',
      keyNeverStored:
        '鍵は使ったあと破棄されます。このブラウザーに保存されることも、どこかへ送られることもありません。',
      sampleSecretHint: 'サンプルトークンは `{secret}` で署名されています。',
      checking: '検証中…',
      notChecked: '未検証',

      verdicts: {
        valid: '署名を検証しました',
        invalid: '署名がその鍵と一致しません',
        unsecured:
          '保護されていないトークンです。`alg` が `none` なので署名を持たず、何も証明しません。多くのライブラリはこれを一律に拒否します。',
        unsupported: '{algorithm} は、このツールが検証できるアルゴリズムではありません。',
        'bad-key':
          'その鍵は読み取れませんでした。`BEGIN PUBLIC KEY` で始まる PEM ブロック、JWK、または JWKS を使ってください。',
        'no-key': '鍵を入力すると、入力に応じて署名が検証されます。',
        'no-signature': 'このトークンには署名部分がないため、検証するものがありません。',
        'kid-mismatch':
          'そのセットの中に、このトークンの `kid` と一致する鍵がありません。検証の対象がありません。',
        error: 'このブラウザーでは署名を検証できませんでした。',
      },
    },
    jwtEncoder: {
      headerTitle: 'ヘッダー',
      payloadTitle: 'ペイロード',
      tokenTitle: '署名済みトークン',
      headerLabel: 'JWT ヘッダー（JSON）',
      payloadLabel: 'JWT ペイロード（JSON）',
      tokenLabel: '署名済みのトークン',
      headerPlaceholder: '{\n  "kid": "your-key-id"\n}',
      payloadPlaceholder: '{\n  "sub": "user_123",\n  "name": "Ada Lovelace"\n}',

      algorithm: 'アルゴリズム',
      algorithmTitle: 'このトークンの署名方式 — ヘッダーにも書き込まれます',
      unsecured: 'none — 署名なし',
      unsecuredWarning:
        'これは**非セキュアなトークン**です。`alg` が `none` で署名を持たず、何も証明しません。たいていのライブラリは即座に拒否します。自分のライブラリがきちんと拒否するか試すためだけのものです。',

      signingTitle: '署名鍵',
      secretLabel: '共有シークレット',
      secretPlaceholder: 'このトークンの署名に使うシークレット',
      keyLabel: '秘密鍵',
      keyPlaceholder: 'PKCS#8 の秘密鍵、または秘密 JWK',
      keyAria: '署名鍵',
      base64Secret: 'シークレットは base64url',
      base64SecretTitle: '鍵素材として使う前にシークレットを base64url からデコードする',
      keyNeverStored:
        '鍵は使われたあと破棄されます。このブラウザーに保存されず、どこにも送信されません。',
      keyIsDangerous:
        '署名鍵はあなたのシステムが受け入れるトークンを作れます。本番の鍵なら自分の環境で。',
      allowWeak: '短いシークレットを許可',
      allowWeakTitle:
        'RFC 7518 の要求より短いシークレットでも署名する — 弱いトークンを再現したいとき用',
      sampleSecretHint: 'サンプルは `{secret}` で署名されています。',

      claimsTitle: '時刻クレーム',
      stamp: '打刻',
      stampTitle: 'この瞬間を基準に iat、exp、nbf をペイロードへ書き込む',
      expiresIn: '有効期限',
      includeNotBefore: 'nbf も設定',
      includeNotBeforeTitle: '現在時刻を指す nbf クレームを追加する',
      expiryPresets: {
        '15m': '15 分',
        '1h': '1 時間',
        '24h': '24 時間',
        '7d': '7 日',
        '30d': '30 日',
      },
      stamped: 'iat と exp をペイロードに打刻しました',

      segHeader: 'ヘッダー',
      segPayload: 'ペイロード',
      segSignature: '署名',
      segChars: p({ other: '{count} 文字' }),

      idle: 'ペイロードを書き、鍵を選ぶとトークンが作られます',
      signing: '署名中…',
      signed: 'トークンに署名しました',
      signedUnsecured: '非セキュアなトークンを作成しました — 署名はありません',
      tokenFile: 'token.jwt',
      emptyToken:
        '署名済みトークンがここに表示されます。作成のために何もアップロードされません。署名はこのブラウザーが計算します。',

      faults: {
        'bad-header-json': 'ヘッダーが有効な JSON ではないため、まだエンコードするものがありません。',
        'bad-payload-json':
          'ペイロードが有効な JSON ではないため、まだエンコードするものがありません。',
        'header-not-object':
          'トークンのヘッダーは JSON オブジェクトである必要があります。配列や単独の値は使えません。',
        'payload-not-object':
          'トークンのペイロードは JSON オブジェクトである必要があります。配列や単独の値は使えません。',
        unsupported: 'これはこのツールが署名できるアルゴリズムではありません。',
        'no-key': '鍵を入力すると、入力しながらトークンに署名します。',
        'bad-key':
          'その鍵は読み取れませんでした。`BEGIN PRIVATE KEY` で始まる PEM ブロック、または `d` を持つ秘密 JWK を使ってください。',
        'weak-secret':
          '{algorithm} は少なくとも {required} バイトのシークレットを要求しますが、これは {actual} バイトです。これより短いとオフラインで破られます。それでも署名するには**短いシークレットを許可**を有効にしてください。',
        error: 'このブラウザーではトークンに署名できませんでした。',
      },
    },

    counter: {
      inputTitle: 'テキスト',
      inputLabel: 'カウントするテキスト',
      placeholder: '測りたいテキストを貼り付けるか入力してください…',
      idle: 'テキストを貼り付けるか入力するとカウントします',
      counting: 'カウント中…',

      countsTitle: 'カウント',
      words: '単語',
      characters: '文字',
      charactersNoSpaces: '空白を除く',
      sentences: '文',
      paragraphs: '段落',
      lines: '行',
      bytes: 'UTF-8 バイト',

      timeTitle: '読了時間',
      readingTime: '黙読',
      speakingTime: '音読',
      underAMinute: '1 分未満',
      minutesAndSeconds: '{minutes} 分 {seconds} 秒',
      justSeconds: '{seconds} 秒',

      averagesTitle: '平均',
      averageWordLength: '単語の長さ',
      averageSentenceLength: '1 文あたりの単語',
      longestWord: '最も長い単語',
      charsUnit: p({ other: '{count} 文字' }),
      wordsUnit: p({ other: '{count} 単語' }),

      limitsTitle: '上限',
      limitNames: {
        tweet: '投稿（X）',
        sms: 'SMS',
        'page-title': 'ページタイトル',
        'meta-description': 'メタディスクリプション',
      },
      remaining: '残り {count}',
      over: '{count} 超過',
      limitsNote: 'SEO の 2 つは目安です。検索エンジンは文字数ではなく表示幅で切ります。',

      frequencyTitle: 'よく使う語',
      frequencyEmpty: 'カウントするテキストが入ると、よく使う語がここに並びます。',
      frequencyCount: p({ other: '{count} 回' }),

      emptyBody:
        '左のパネルにテキストを貼り付けてください。すべてのカウントが入力中に更新され、処理はこのタブ内で完結します。',
      impreciseNotice:
        'このブラウザーには Unicode テキスト分割がないため、単語は空白で区切って数えています。中国語・日本語・韓国語では数値が正しくありません。',
      cjkNotice:
        'CJK として集計しています。単語は空白ではなくテキスト分割で区切られ、読了時間は 1 分あたりの文字数で測られます。',
    },

    textFormatter: {
      inputTitle: '入力',
      outputTitle: '整形結果',
      optionsTitle: '直す項目',
      inputLabel: '整形するテキスト',
      outputLabel: '整形されたテキスト',
      placeholder: '整えたいテキストを貼り付けてください…',
      idle: 'テキストを貼り付けて、直す項目を選んでください',
      formatting: '整形中…',

      whitespaceHeading: '空白',
      trimLineEnds: '行末の空白',
      trimLineEndsTitle: '各行の末尾にある空白とタブを削除する',
      collapseSpaces: '連続した空白',
      collapseSpacesTitle: '連続する空白やタブを 1 つにまとめる（インデントは残す）',
      collapseBlankLines: '余分な空行',
      collapseBlankLinesTitle: '2 行以上続く空行を 1 行にまとめる',
      removeBlankLines: 'すべての空行',
      removeBlankLinesTitle: '空行をすべて削除する',
      trimDocument: '先頭と末尾',
      trimDocumentTitle: '文書全体の先頭と末尾にある空白を削除する',
      tabsToSpaces: 'タブを空白に',
      tabsToSpacesTitle: 'タブをすべて半角空白 2 つに置き換える',

      linesHeading: '行',
      removeDuplicateLines: '重複行',
      removeDuplicateLinesTitle: '各行の最初の 1 件だけ残す（空行はそのまま）',
      sortLines: '並べ替え',
      sortModes: {
        none: '並べ替えない',
        asc: '昇順',
        desc: '降順',
      },

      caseHeading: '大文字・小文字',
      caseModes: {
        none: 'そのまま',
        lower: 'すべて小文字',
        upper: 'すべて大文字',
        title: 'Title Case',
        sentence: 'Sentence case',
      },

      writingHeading: '句読点',
      fixRepeatedWords: '繰り返しの語',
      fixRepeatedWordsTitle: '「the the」のように誤って重なった語をまとめる',
      spaceAfterPunctuation: '句読点の後の空白',
      spaceAfterPunctuationTitle:
        'カンマやピリオドの後に足りない空白を補う（数値・URL・e.g. には入れない）',
      removeSpaceBeforePunctuation: '句読点の前の空白',
      removeSpaceBeforePunctuationTitle: 'カンマ・ピリオド・コロンの前に残った空白を削除する',
      smartQuotes: '曲がった引用符',
      smartQuotesTitle:
        '直線的な引用符を組版用に変換する（バッククォート内のコードは対象外）',


      changesTitle: '変更点',
      noChanges: '変更の必要はありませんでした。',
      nothingEnabled: '少なくとも 1 つ有効にすると、ここに結果が出ます。',
      replaceInput: '入力を置き換え',
      replaceInputTitle: '結果を入力側に戻して、もう一度かける',
      reset: '設定を戻す',
      resetTitle: 'すべてのスイッチを既定値に戻す',
      outputFile: 'formatted.txt',
      emptyBody:
        '整えたテキストがここに出ます。何もアップロードされず、変換はすべてこのタブで実行されます。',
    },
  },
};
