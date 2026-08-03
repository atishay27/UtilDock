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
    blurb: 'Inspect and verify tokens. Coming soon.',
  },
];

export const TOOLS: Tool[] = [
  {
    id: 'json-viewer',
    href: '/json/viewer',
    category: 'json',
    name: 'JSON Viewer',
    tagline: 'Explore JSON as a collapsible tree',
    title: 'JSON Viewer — collapsible tree with search',
    description:
      'Free online JSON viewer. Explore any document as a collapsible, colour-coded tree, search keys and values, and copy paths. Runs entirely in your browser.',
    overview:
      'A JSON viewer that turns a wall of text into a structure you can read. Paste an API response, a config file or a log line and explore it as a collapsible tree — colour-coded by type, searchable by key or value, with every path one click from your clipboard. Nothing is uploaded: the document is parsed in this tab.',
    faqs: [
      {
        q: 'Is it safe to paste production data into this JSON viewer?',
        a: 'Yes. The document never leaves your browser. There is no upload, no server-side parsing and no request that carries your data — you can disconnect from the network and the viewer still works. Open your browser’s Network panel while you use it and you will see nothing sent.',
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
    tagline: 'Find syntax errors and check against a schema',
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
    tagline: 'Diff two documents structurally',
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
    id: 'json-formatter',
    href: '/json/formatter',
    category: 'json',
    name: 'JSON Formatter',
    tagline: 'Pretty-print, minify and sort keys',
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
    id: 'jwt-decoder',
    href: '/jwt/decoder',
    category: 'jwt',
    name: 'JWT Decoder',
    tagline: 'Decode and inspect token claims',
    title: 'JWT Decoder',
    description: 'Decode a JSON Web Token and inspect its header, payload and claims.',
    keywords: ['jwt decoder', 'decode jwt'],
    icon: 'key',
    status: 'planned',
  },
];

export const LIVE_TOOLS = TOOLS.filter((t) => t.status === 'live');

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
