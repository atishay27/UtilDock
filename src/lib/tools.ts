/**
 * The tool registry — the single source of truth for UtilDock.
 *
 * Everything derived from this: the homepage grid, the header nav, the command
 * palette, the "related tools" rail, sitemap priorities and per-page JSON-LD.
 * Adding a tool means adding an entry here, a page under src/pages/, and a
 * component under src/components/tools/. Nothing else needs editing.
 */

export type ToolStatus = 'live' | 'planned';

export type CategoryId = 'json' | 'jwt';

export interface Category {
  id: CategoryId;
  name: string;
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
  /** Full sentence for <meta name="description"> and the tool page header. */
  description: string;
  /** Page <title> without the site suffix. */
  title: string;
  keywords: string[];
  icon: IconName;
  status: ToolStatus;
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
    title: 'JSON Viewer — collapsible tree, search and path copy',
    description:
      'Paste JSON and explore it as a collapsible, colour-coded tree. Search keys and values, copy any path, and switch back to raw text at any time. Runs entirely in your browser.',
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
    title: 'JSON Validator — syntax errors with line numbers, JSON Schema support',
    description:
      'Validate JSON and get the exact line and column of any syntax error. Optionally check your document against a JSON Schema and see every violation mapped back to its source line. Runs entirely in your browser.',
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
    title: 'JSON Diff — compare two JSON documents side by side',
    description:
      'Compare two JSON documents and see exactly what was added, removed or changed, by path. Key order is ignored by default, so only real differences show up. Runs entirely in your browser.',
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
    title: 'JSON Formatter & Minifier — pretty-print or compact any JSON',
    description:
      'Pretty-print JSON with the indentation you want, minify it back down, or sort keys alphabetically for stable diffs. Runs entirely in your browser.',
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
