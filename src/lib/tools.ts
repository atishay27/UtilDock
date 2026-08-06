/**
 * The tool registry — the single source of truth for UtilDock.
 *
 * Drives the homepage grid, header nav, footer, 404, the "related tools" rail
 * and per-page JSON-LD. Adding a tool means an entry here, a page under
 * src/pages/, and a component under src/components/tools/. Nothing else.
 */

export type ToolStatus = 'live' | 'planned';

export type CategoryId = 'json' | 'jwt';

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
