/**
 * The tool registry — the single source of truth for UtilDock.
 *
 * Drives the homepage grid, header nav, footer, 404, the "related tools" rail
 * and per-page JSON-LD. Adding a tool means an entry here, a page under
 * src/pages/, and a component under src/components/tools/. Nothing else.
 */

export type ToolStatus = 'live' | 'planned';

export type CategoryId = 'json' | 'jwt' | 'text';

export interface Category {
  id: CategoryId;
  name: string;
  /** Path of the category hub page, or undefined until one exists. */
  href?: string;
  /** Shown on the homepage above the group of tools. */
  blurb: string;
}

export interface Tool {
  id: string;
  /** Path relative to the site root, e.g. "/json/viewer". */
  href: string;
  category: CategoryId;
  name: string;
  /** One short line, used on cards and in the nav. */
  tagline: string;
  /**
   * What the tool actually does, as a spec plate — three or four capabilities,
   * each two or three words. Rendered on the tool row beneath the tagline.
   *
   * A tagline says which tool this is; these say whether it does the specific
   * thing the visitor came for, which is the question a directory has to answer
   * before the click. They are also, not by accident, the terms people search.
   */
  does: string[];
  /** <meta name="description">. Keep under ~155 chars or Google truncates it. */
  description: string;
  /** Page <title> without the site suffix. Keep under ~49 chars for the same reason. */
  title: string;
  /** The opening paragraph of the page's prose. Longer than the meta description. */
  overview?: string;
  /** Rendered as a visible Q&A block and as FAQPage structured data. */
  faqs?: Faq[];
  keywords: string[];
  icon: IconName;
  status: ToolStatus;
}

export interface Faq {
  q: string;
  a: string;
}

export type IconName =
  | 'tree'
  | 'check-shield'
  | 'diff'
  | 'braces'
  | 'key'
  | 'key-stamp'
  | 'ruler'
  | 'plane'
  | 'convert';

export const CATEGORIES: Category[] = [
  {
    id: 'json',
    name: 'JSON',
    href: '/json',
    blurb: 'Read, check, compare and reshape JSON without leaving the page.',
  },
  {
    id: 'jwt',
    name: 'JWT',
    blurb: 'Read what a token is claiming, and check that it was really signed.',
  },
  {
    id: 'text',
    name: 'Text',
    blurb: 'Measure a piece of writing, and dress it down to something tidy.',
  },
];

export const TOOLS: Tool[] = [
  {
    id: 'json-formatter',
    href: '/json/formatter',
    category: 'json',
    name: 'JSON Formatter',
    tagline: 'Pretty-print an unreadable response, or minify it',
    does: ['Pretty-print', 'Minify to one line', 'Sort keys', 'Indent 2 / 4 / tab'],
    title: 'JSON Formatter — pretty-print and minify',
    description:
      'Free online JSON formatter and minifier. Pretty-print with any indentation, compact to one line, or sort keys alphabetically. Runs in your browser.',
    overview:
      'A JSON formatter and minifier in one. Pretty-print with two, three or four spaces or tabs, compact the document back to a single line, or sort every object’s keys alphabetically so two files diff cleanly in version control. The result updates as you type, and the document is never uploaded.',
    faqs: [
      {
        q: 'What is the difference between formatting and minifying JSON?',
        a: 'Formatting adds indentation and line breaks so the structure is readable. Minifying strips every byte of optional whitespace, which is what you want before putting JSON in an environment variable, a URL or over the wire. Both produce the same data.',
      },
      {
        q: 'Why would I sort the keys?',
        a: 'Two documents that describe the same thing but list their keys in a different order produce a noisy text diff. Sorting keys alphabetically makes them byte-identical where they agree, so only real changes appear in version control.',
      },
      {
        q: 'Can it handle very large files?',
        a: 'Yes. Parsing and formatting run in a Web Worker, so multi-megabyte documents reformat without the page going unresponsive while you type.',
      },
      {
        q: 'Is my JSON uploaded to a server?',
        a: 'Never. The formatter is JavaScript running in your own tab and there is no backend to send anything to. It keeps working with the network disconnected.',
      },
    ],
    keywords: [
      'json formatter',
      'json beautifier',
      'json minifier',
      'format json online',
      'pretty print json',
    ],
    icon: 'braces',
    status: 'live',
  },
  {
    id: 'json-viewer',
    href: '/json/viewer',
    category: 'json',
    name: 'JSON Viewer',
    tagline: 'Explore a payload too big to scroll through',
    does: ['Collapsible tree', 'Search keys and values', 'Copy any path', 'Handles 100k+ nodes'],
    title: 'JSON Viewer — collapsible tree with search',
    description:
      'Free online JSON viewer. Explore any document as a collapsible, colour-coded tree, search keys and values, and copy paths. Runs entirely in your browser.',
    overview:
      'A JSON viewer that turns a wall of text into a structure you can read. Paste an API response, a config file or a log line and explore it as a collapsible tree — colour-coded by type, searchable by key or value, with every path one click from your clipboard. Nothing is uploaded: the document is parsed in this tab.',
    faqs: [
      {
        q: 'Is it safe to paste production data into this JSON viewer?',
        a: 'Yes. The document never leaves your browser. There is no upload, no server-side parsing and no request that carries your data — you can disconnect from the network and the viewer still works. Open your browser’s Network panel while you use it and you will see nothing from the editor sent anywhere.',
      },
      {
        q: 'How large a JSON file can it open?',
        a: 'Multi-megabyte documents are fine. Parsing runs in a Web Worker so the page never freezes, and only the tree rows currently on screen are rendered, so documents with hundreds of thousands of nodes stay smooth to scroll.',
      },
      {
        q: 'How do I copy the path to a value?',
        a: 'Hover any row and click the path button. You get the full path to that value, ready to paste into your code or a jq expression.',
      },
      {
        q: 'Does it cost anything or need an account?',
        a: 'No. Every tool on UtilDock is free, has no ads, no sign-up and no usage limit.',
      },
    ],
    keywords: ['json viewer', 'json tree viewer', 'json explorer', 'json beautifier online'],
    icon: 'tree',
    status: 'live',
  },
  {
    id: 'json-validator',
    href: '/json/validator',
    category: 'json',
    name: 'JSON Validator',
    tagline: 'Find the exact line something is rejecting',
    does: ['Exact line and column', 'JSON Schema 2020-12 / 2019-09 / 07', 'Jump to each error'],
    title: 'JSON Validator — syntax and schema errors',
    description:
      'Free online JSON validator. Get the exact line and column of any syntax error and check your document against a JSON Schema. Runs entirely in your browser.',
    overview:
      'A JSON validator that tells you where the problem is, not just that there is one. Every syntax error is reported with its exact line and column and underlined in the editor. Turn on schema checking and the shape of your data is validated too, against JSON Schema draft 2020-12, 2019-09 or 07. Both the document and the schema stay in this tab.',
    faqs: [
      {
        q: 'Why is my JSON invalid when it looks correct?',
        a: 'The usual causes are a trailing comma after the last item, keys or strings wrapped in single quotes instead of double, an unescaped newline or backslash inside a string, or a stray comment — JSON allows none of those. The validator points at the exact line and column so you can see which one it is.',
      },
      {
        q: 'Which JSON Schema drafts are supported?',
        a: 'Drafts 2020-12, 2019-09 and 07, including the standard format keywords such as date-time, email and uri. Every violation is listed with its path, and clicking one jumps to it in the document.',
      },
      {
        q: 'Is my data or schema sent anywhere?',
        a: 'No. Validation runs as JavaScript in your own tab, so a production payload or an internal schema never leaves your machine. There is no server that could receive it.',
      },
      {
        q: 'Can it validate JSON Lines or JSON with comments?',
        a: 'Not yet — the validator checks strict RFC 8259 JSON, which is what most parsers and APIs accept. JSONC and NDJSON support are on the list.',
      },
    ],
    keywords: [
      'json validator',
      'json syntax checker',
      'json schema validator',
      'validate json online',
    ],
    icon: 'check-shield',
    status: 'live',
  },
  {
    id: 'json-diff',
    href: '/json/diff',
    category: 'json',
    name: 'JSON Comparator',
    tagline: 'See what actually changed between two documents',
    does: ['Structural diff', 'Ignores key order', 'Matches array items by id', 'Side-by-side'],
    title: 'JSON Diff — compare two documents visually',
    description:
      'Free online JSON diff. Compare two documents side by side with colour-coded additions, removals and changed values. Runs entirely in your browser.',
    overview:
      'A JSON comparator that shows the difference rather than listing it. The two documents are drawn as one aligned view: red marks what only the original has, green what only the changed one has, and an arrow marks every replaced value. Because the comparison is structural rather than textual, reordered keys and different indentation never register as changes.',
    faqs: [
      {
        q: 'What is the difference between a JSON diff and a text diff?',
        a: 'A text diff compares characters, so reformatting a file or reordering its keys shows up as hundreds of changes. This tool parses both documents first and compares values, so only differences that change what the JSON means are reported.',
      },
      {
        q: 'How are arrays compared?',
        a: 'Elements are matched by identity where one exists — an id, key, uuid or name field. Inserting an element at the start therefore reports one addition instead of rewriting every element after it, and elements that only moved are reported as moves.',
      },
      {
        q: 'Does key order or formatting affect the result?',
        a: 'No. Key order, indentation and trailing whitespace are ignored. Two documents that differ only in formatting compare as identical.',
      },
      {
        q: 'Are the two documents uploaded anywhere?',
        a: 'No. Both are parsed and compared in a Web Worker inside this tab. Nothing is sent to a server, which matters when you are diffing two production payloads.',
      },
    ],
    keywords: ['json diff', 'compare json', 'json comparator', 'json difference online'],
    icon: 'diff',
    status: 'live',
  },
  {
    id: 'jwt-decoder',
    href: '/jwt/decoder',
    category: 'jwt',
    name: 'JWT Decoder',
    tagline: 'Read a token’s claims, and prove its signature',
    does: [
      'Header and payload',
      'Expiry in plain words',
      'Signature check',
      'Secret or public key',
    ],
    title: 'JWT Decoder — decode and verify a token',
    description:
      'Free online JWT decoder. Read a JSON Web Token’s header, payload and expiry, and verify its signature. Token and key never leave your browser.',
    overview:
      'A JWT decoder that splits a token into its three parts, decodes the header and payload, and lists every claim in plain words — with expiry, not-before and issued-at shown as real dates rather than epoch seconds. It also verifies the signature: paste the shared secret for an HS algorithm or a public key for RS, PS or ES, and the check runs on your browser’s own WebCrypto. Neither the token nor the key is ever uploaded, and the key is never even saved to this browser.',
    faqs: [
      {
        q: 'Is it safe to paste a real JWT into this decoder?',
        a: 'Yes. The token is decoded by JavaScript in your own tab and there is no backend to send it to — disconnect from the network and the decoder still works. That matters more for JWTs than for most data: a token is a live credential, and pasting one into a site that posts it to a server hands over whatever it grants.',
      },
      {
        q: 'Does decoding a JWT mean it is valid?',
        a: 'No, and the difference matters. The header and payload are base64url-encoded, not encrypted, so anyone holding a token can read them — that is why a JWT is never a place to put a secret. Only checking the signature against the right key tells you the token is genuine and unaltered, and that its claims can be trusted.',
      },
      {
        q: 'Which signature algorithms can it verify?',
        a: 'HS256, HS384 and HS512 with a shared secret, and RS256/384/512, PS256/384/512 and ES256/384/512 with a public key given as a PEM block, a single JWK, or a whole JWKS — in which case the token’s kid picks the key. Verification uses the browser’s built-in WebCrypto, so no key material is sent anywhere.',
      },
      {
        q: 'Is my signing key or secret stored?',
        a: 'No. Every other tool on this site saves your input to localStorage so a refresh does not lose your work; the verification key is deliberately excluded. It is held in memory, used for the check, and gone when you leave the page.',
      },
      {
        q: 'Why does my token show as expired?',
        a: 'The exp claim is a NumericDate — seconds since 1970 — and the decoder shows it as a real date alongside how long ago it passed. An expired token is the most common cause of a sudden 401 from an API that was working a moment earlier. A nbf claim in the future does the same thing at the other end.',
      },
    ],
    keywords: [
      'jwt decoder',
      'decode jwt',
      'jwt verify signature',
      'json web token decoder',
      'jwt debugger',
    ],
    icon: 'key',
    status: 'live',
  },
  {
    id: 'jwt-encoder',
    href: '/jwt/encoder',
    category: 'jwt',
    name: 'JWT Encoder',
    tagline: 'Build a token from claims, and really sign it',
    does: ['Header and payload', 'HS / RS / PS / ES', 'Expiry presets', 'Signs with WebCrypto'],
    title: 'JWT Encoder — build and sign a token',
    description:
      'Free online JWT encoder. Build a JSON Web Token from your own claims and sign it with HS, RS, PS or ES. The key never leaves your browser.',
    overview:
      'A JWT encoder that produces a genuinely signed token rather than a base64 lookalike. Write the header and payload as JSON, pick an algorithm, and paste the shared secret for an HS algorithm or a PKCS#8 private key for RS, PS or ES — the signature is computed by your browser’s own WebCrypto. Expiry, issued-at and not-before can be stamped from presets so you never hand-convert an epoch again, and the finished token is checked against the decoder before it is shown.',
    faqs: [
      {
        q: 'Is it safe to paste a signing key into this encoder?',
        a: 'The key is used in your own tab and dropped — never written to storage, never included in an analytics event, and there is no backend that could receive it. That said, a signing key is the most dangerous secret in any system that uses JWTs, because whoever holds it can mint tokens your services will accept. For a production key, generating tokens in your own environment is still the better habit; this tool is built for development, testing and learning.',
      },
      {
        q: 'Which algorithms can it sign with?',
        a: 'HS256, HS384 and HS512 with a shared secret, and RS256/384/512, PS256/384/512 and ES256/384/512 with a private key given as a PKCS#8 PEM block or a private JWK. It will also produce the unsecured `alg: none` token, clearly marked as proving nothing, because reproducing one is how you test that your verifier rejects it.',
      },
      {
        q: 'Why does it refuse my short secret?',
        a: 'RFC 7518 requires an HMAC key at least as long as the hash — 32 bytes for HS256, 48 for HS384, 64 for HS512. Browsers will happily sign with a four-character secret, and the resulting token can be cracked offline in seconds. The encoder blocks that by default and lets you override it, since reproducing a weak token is sometimes exactly the task.',
      },
      {
        q: 'Can it overwrite the algorithm in my header?',
        a: 'It always writes `alg` from the algorithm you picked, and that is deliberate. A header claiming one algorithm over a signature made with another is not a token, it is the setup for the best-known JWT vulnerability. Every other header field you write — `kid`, `cty`, anything custom — is kept exactly as you typed it.',
      },
      {
        q: 'How do I set the expiry?',
        a: 'Press one of the expiry presets and `iat`, `exp` and optionally `nbf` are stamped into the payload as NumericDate seconds, all from the same instant so they cannot disagree by a second. You can also type the numbers yourself; the encoder does not require the presets.',
      },
    ],
    keywords: [
      'jwt encoder',
      'jwt generator',
      'create jwt',
      'sign jwt online',
      'json web token generator',
    ],
    icon: 'key-stamp',
    status: 'live',
  },
  {
    id: 'text-counter',
    href: '/text/counter',
    category: 'text',
    name: 'Text Counter',
    tagline: 'Words, characters, sentences and paragraphs at once',
    does: ['Words and characters', 'Sentences and paragraphs', 'Reading time', 'Keyword frequency'],
    title: 'Word Counter — words, characters, sentences',
    description:
      'Free online word and character counter. Counts words, characters, sentences and paragraphs as you type, with reading time. Runs in your browser.',
    overview:
      'A word counter that counts everything at once — words, characters with and without spaces, sentences, paragraphs, lines and UTF-8 bytes — and updates as you type. It also estimates reading and speaking time, tracks the limits people are actually writing against, and lists which words you used most. Counting uses the browser’s own Unicode text segmentation, so Japanese and Chinese are counted by word rather than reported as one enormous word, and contractions are not split in two.',
    faqs: [
      {
        q: 'How does it count words in Japanese or Chinese?',
        a: 'Correctly, which most word counters do not. Japanese and Chinese put no spaces between words, so counting by splitting on whitespace reports a whole paragraph as one word. This tool uses the browser’s built-in Unicode text segmentation, which knows where words actually break in every script, and it measures reading time for CJK in characters per minute rather than words per minute.',
      },
      {
        q: 'What counts as a sentence or a paragraph?',
        a: 'A sentence is decided by the Unicode sentence-breaking rules, so "Dr. Smith went to Washington D.C. yesterday" is one sentence and not three, and the ideographic full stop is recognised. A paragraph is a block separated by a blank line; if the text has no blank lines at all, each non-empty line is counted as one.',
      },
      {
        q: 'How is reading time calculated?',
        a: 'At 238 words per minute for alphabetic text, which is the median for adult silent reading of general prose, and 400 characters per minute for CJK. Speaking time uses the slower rates a presenter actually manages, around 140 words per minute. They are estimates, not measurements — dense technical writing runs slower than a novel.',
      },
      {
        q: 'Is my text uploaded anywhere?',
        a: 'No. Counting is JavaScript running in your own tab, in a Web Worker so a long document does not freeze the page. Disconnect from the network and it keeps working. This matters more than it sounds for a text counter, since the things people count tend to be drafts, cover letters and unpublished writing.',
      },
      {
        q: 'Does it show character counts for Twitter or a meta description?',
        a: 'Yes. The limits panel tracks the caps people are usually writing against — a 280-character post, a 160-character SMS, a 60-character page title and a 155-character meta description — and shows how much room is left in each. The two SEO figures are approximations, since Google truncates on rendered width rather than character count.',
      },
    ],
    keywords: [
      'word counter',
      'character counter',
      'count words online',
      'sentence counter',
      'paragraph counter',
    ],
    icon: 'ruler',
    status: 'live',
  },
  {
    id: 'text-formatter',
    href: '/text/formatter',
    category: 'text',
    name: 'Text Formatter',
    tagline: 'Strip the mess out of text somebody else wrote',
    does: ['Remove extra spaces', 'Delete duplicate lines', 'Change case', 'Tidy punctuation'],
    title: 'Text Formatter — clean up messy text',
    description:
      'Free online text formatter and cleaner. Remove extra spaces and duplicate lines, change case, and tidy punctuation. Runs entirely in your browser.',
    overview:
      'A text formatter you drive rather than one that decides for you. Every operation is a switch — collapse repeated spaces, strip trailing whitespace, remove duplicate or blank lines, sort lines, convert to upper, lower, title or sentence case, and tidy the punctuation of English prose. Nothing runs unless you turn it on, and the tool reports exactly what each switch changed, so the result is something to accept rather than something to re-read.',
    faqs: [
      {
        q: 'Can it fix grammar?',
        a: 'No, and it says so rather than pretending. Real grammar correction — agreement, tense, article choice — needs either a server or a WebAssembly language model, and this site has no backend and a Content-Security-Policy that does not permit WebAssembly. What it does instead is the mechanical layer people usually mean: repeated words, missing spaces after punctuation, spaces before punctuation, straight quotes, and capitalisation. Those are typography, where the right answer is a rule rather than a judgement.',
      },
      {
        q: 'What does "remove duplicate lines" keep?',
        a: 'The first occurrence of each line, in its original position, comparing the whole line exactly. Blank lines are never deduplicated, since they are what separates paragraphs and collapsing them would silently reflow the document into one block.',
      },
      {
        q: 'How does title case handle acronyms?',
        a: 'It leaves them alone. Any word with a capital letter after its first — JSON, iPhone, McCarthy — is passed through untouched, because lowercasing it to re-capitalise the first letter would turn JSON into Json. Minor words like "of" and "the" stay lowercase unless they open or close the line.',
      },
      {
        q: 'Will it break my code, URLs or decimal numbers?',
        a: 'The punctuation rules are written to avoid exactly that. A space is never inserted after a comma or colon that is followed by a digit, so 1,000 and 12:30 survive. A full stop only gains a space between a lowercase run and a capital, which leaves e.g., Node.js, 3.14 and utildock.dev untouched. The smart-quote rule skips anything inside backticks.',
      },
      {
        q: 'Is my text sent anywhere?',
        a: 'No. Every transform runs in a Web Worker inside your own tab, and there is no server of ours that could receive the text. It works with the network disconnected.',
      },
    ],
    keywords: [
      'text formatter',
      'remove extra spaces',
      'remove duplicate lines',
      'text cleaner online',
      'change case online',
    ],
    icon: 'plane',
    status: 'live',
  },
];

export const LIVE_TOOLS = TOOLS.filter((t) => t.status === 'live');

/**
 * Categories that have at least one tool, in registry order. The homepage
 * directory is built from this, so a new category appears there by adding it to
 * CATEGORIES and pointing a tool at it — the page itself never changes.
 */
export function populatedCategories(): { category: Category; tools: Tool[] }[] {
  return CATEGORIES.map((category) => ({
    category,
    tools: toolsInCategory(category.id),
  })).filter((group) => group.tools.length > 0);
}

export function toolsInCategory(category: CategoryId): Tool[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getCategory(id: CategoryId): Category {
  const category = CATEGORIES.find((c) => c.id === id);
  if (!category) throw new Error(`Unknown category id: ${id}`);
  return category;
}

/**
 * A tool name split at its category prefix. Headings render both halves so the
 * full searchable name is in the markup, with the prefix visually quieter.
 */
export function splitName(tool: Tool): { prefix: string; rest: string } {
  const prefix = `${getCategory(tool.category).name} `;
  return tool.name.startsWith(prefix)
    ? { prefix: prefix.trim(), rest: tool.name.slice(prefix.length) }
    : { prefix: '', rest: tool.name };
}

export function getTool(id: string): Tool {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) throw new Error(`Unknown tool id: ${id}`);
  return tool;
}

/** Sibling live tools, for the "related tools" rail at the bottom of a tool page. */
export function relatedTools(id: string, limit = 3): Tool[] {
  const tool = getTool(id);
  const sameCategory = LIVE_TOOLS.filter((t) => t.id !== id && t.category === tool.category);
  const rest = LIVE_TOOLS.filter((t) => t.id !== id && t.category !== tool.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
