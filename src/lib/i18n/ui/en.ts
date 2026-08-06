/**
 * English is the source of truth for the string set.
 *
 * Every other locale is typed as `UIStrings`, so a missing or misspelled key is
 * a build error rather than an English word appearing in the middle of a German
 * page. There is deliberately no runtime fallback for these: `astro check` is
 * the completeness guarantee, and a fallback would let a locale ship half
 * translated without anyone noticing.
 *
 * Two conventions in the values:
 *
 *  - `{name}` is a placeholder filled by `fill()`. The braces are part of the
 *    string, so a translator can move them wherever their grammar wants them.
 *  - Counted phrases are `{ one, other, ... }` objects resolved by
 *    `plural()` through `Intl.PluralRules`, which is why Russian gets `few`
 *    and `many` and Japanese gets neither.
 *
 * Prose strings accept a deliberately tiny markup: `**bold**` and
 * `[label](href)`. `<Rich>` renders exactly those two and escapes the rest —
 * nothing here is ever passed to `set:html` raw.
 */

import { p } from '../format';

export const en = {
  chrome: {
    skipToContent: 'Skip to content',
    homeAria: 'UtilDock home',
    navTools: 'Tools',
    navSite: 'Site',
    breadcrumb: 'Breadcrumb',
    home: 'Home',
    soon: 'soon',
    comingSoon: 'coming soon',
    categoryTools: '{category} tools',
    allCategoryTools: 'All {category} tools',
    openToolsMenu: 'Open tools menu',
    closeToolsMenu: 'Close tools menu',
    toolsButton: 'Tools',
    privacyPill: 'Nothing leaves this tab',
    privacyPillMobile: 'Your JSON stays in this tab',
    open: 'Open',
  },

  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    title: 'Switch theme',
    light: 'Light',
    dark: 'Dark',
  },

  footer: {
    tagline: 'Your dock for developer utilities.',
    blurb: 'Free, ad-free, and everything runs in your own browser.',
    about: 'About',
    privacy: 'Privacy',
    analytics: 'Analytics',
    copyright: '© {year} UtilDock',
    language: 'Language',
    languageAria: 'Choose a language',
  },

  consent: {
    region: 'Analytics',
    heading: 'Analytics',
    undecided:
      'We would like to use Google Analytics to count page views, so we know which tools to improve. It sets a cookie. Nothing you paste is ever included — your JSON never leaves this tab either way.',
    privacyPolicy: 'Privacy Policy',
    whatItCollects: 'What it collects',
    currentlyOn: 'Currently on',
    granted:
      'Google Analytics is counting page views in this browser. Nothing you paste is ever included.',
    currentlyOff: 'Currently off',
    denied:
      'Nothing is requested from Google in this browser, and any analytics cookie already written has been deleted. Every tool works exactly the same either way.',
    allow: 'Allow analytics',
    decline: 'No thanks',
    turnOff: 'Turn it off',
    turnOn: 'Turn it on',
    close: 'Close',
  },

  tool: {
    taglineSuffix: 'runs in this tab, never sent anywhere',
    howItWorks: 'How the {name} works',
    otherTools: 'Other tools',
    commonQuestions: 'Common questions',
  },

  home: {
    title: 'Free JSON tools that never leave your browser',
    headlineLead: 'Developer tools that never',
    headlineAccent: 'touch a server.',
    lede: 'Small, sharp utilities that run entirely in this tab — free, ad-free and with no sign-up. JSON first: a formatter, a viewer, a validator and a comparator, with JWT next.',
    assurances: ['Nothing uploaded', 'Nothing logged', 'No account, no limits'],
    closeLine: 'Unplug the network. It still works.',
    closeCta: 'How that is true',
    keywords: [
      'developer tools',
      'json tools',
      'online json formatter',
      'free developer utilities',
    ],
  },

  jsonHub: {
    title: 'JSON Tools — free, ad-free, in your browser',
    description:
      'Free online JSON tools: viewer, validator, diff and formatter. No ads, no sign-up, and nothing you paste ever leaves your browser.',
    keywords: ['json tools', 'online json tools', 'free json tools', 'json utilities'],
    headlineLead: 'Every JSON tool,',
    headlineAccent: 'in one tab.',
    lede: 'Four sharp tools for working with JSON — a tree [viewer](/json/viewer), a syntax and schema [validator](/json/validator), a visual [comparator](/json/diff) and a [formatter and minifier](/json/formatter). All free, all ad-free, and every one of them parses your document in this tab rather than on a server.',
    chooseHeading: 'Choose a tool',
    toolCount: p({ one: '{count} tool · more coming', other: '{count} tools · more coming' }),
    notes: [
      {
        head: 'Nothing you paste is uploaded',
        body: 'Every tool here is JavaScript running in your own tab. Paste a production payload with the network disconnected and it still works — there is no server of ours that could receive it.',
      },
      {
        head: 'No ads, no account, no limit',
        body: 'No interstitials, no sign-up and no cap on how much you can paste. The page you land on is the tool.',
      },
      {
        head: 'Built for large documents',
        body: 'Parsing, validation and diffing run on a worker thread, so a multi-megabyte document is worked without the page seizing while you type.',
      },
    ],
    closeLine: 'Check the claim in your Network panel.',
    closeCta: 'How that is true',
  },

  notFound: {
    title: 'Page not found',
    description: 'That page does not exist on UtilDock.',
    headline: 'That page does not exist.',
    body: 'The link may be out of date, or the address mistyped. Every tool on UtilDock is listed below.',
    cta: 'Back to home',
    allTools: 'All tools',
  },

  about: {
    title: 'About — who builds UtilDock and why',
    description:
      'Why UtilDock exists: small, fast, ad-free developer utilities that run entirely in your browser, built by one developer with no ads and nothing you paste ever uploaded.',
    heading: 'About UtilDock',
    whyHeading: 'Why this exists',
    why: [
      'Every developer needs to pretty-print some JSON or work out why two payloads disagree. The tools that come up first for those searches tend to be buried in ads, interrupted by cookie walls, and — most uncomfortably — they often post whatever you paste to a server you know nothing about. That is a bad trade when the thing you are debugging is a production payload.',
      'UtilDock is the opposite of that: a small set of sharp tools, no advertising, no sign-up, and nothing you paste ever leaving your machine.',
    ],
    builtHeading: 'How it is built',
    built: [
      "The site is static — HTML, CSS and a little JavaScript, served from Cloudflare's edge. Each tool is a self-contained component that hydrates only on its own page, so the pages you are not using cost you nothing. The heavy work (parsing, validating, diffing) happens in a Web Worker, which is why a multi-megabyte document does not freeze the page while you type.",
      'There is no backend. That is a deliberate constraint: a tool that cannot send your data anywhere cannot leak it. Read the [privacy page](/privacy) for the details.',
    ],
    todayHeading: 'What is here today',
    today:
      'JSON came first because it is what most of us reach for most often. JWT decoding is next, and the list will keep growing — always under the same rules: fast, free, ad-free, and entirely client-side.',
  },

  privacy: {
    title: 'Privacy — nothing you paste leaves your browser',
    description:
      'UtilDock runs entirely in your browser. No document you paste ever leaves your device — there is no server that could receive it.',
    heading: 'Privacy Policy',
    updated: 'Last updated {date}',
    updatedDate: 'August 2026',
    /**
     * Shown only on translated pages. A privacy policy is the one page where a
     * translator's slip becomes a false statement about what the site does, so
     * the translated text is offered as a convenience and the English is what
     * governs. Standard practice, and honest.
     */
    translationNote:
      'This is a translation provided for convenience. If it differs from the English version, the English version applies.',
    lead: '**Nothing you paste into UtilDock ever leaves your browser.** Every tool is JavaScript running in your own tab. Your JSON is never sent to a backend, never written to a log, and never seen by us — there is no server of ours that could receive it.',
    howHeading: 'How the tools work',
    how: [
      'UtilDock is a static website. When you open a tool, your browser downloads some HTML, CSS and JavaScript, and everything after that happens locally. Parsing, formatting, validating and comparing all run inside your tab. Opening a file with the **Load** button — or dropping one onto the page — reads it from your disk into memory; it is not an upload.',
      'Because there is no backend, the content you work with is never transmitted, logged or retained anywhere. You can disconnect from the internet and the tools keep working.',
    ],
    storedHeading: 'Information stored on your device',
    stored:
      "So that a refresh does not lose your work, each tool saves its current input to your browser's `localStorage`, along with your theme choice and a few preferences such as indent size. This data stays on your device, is readable only by UtilDock in your browser, and is never transmitted to us. Clearing your browser's site data for this domain removes all of it.",
    storedConsent:
      'Your answer to the analytics question is stored the same way, so you are only asked once. It records nothing but the choice itself.',
    analyticsHeading: 'Analytics and cookies',
    analyticsOn: [
      'With your consent, we use Google Analytics to understand how the site is used — which pages are visited and how often — so we know which tools are worth improving. It is loaded through a Google Tag Manager container, and it does not run until you allow it. If you decline, no analytics cookies are set and no data is collected.',
      'When enabled, Google Analytics collects standard web analytics data: pages viewed, approximate location derived from your IP address, referring website, and general device and browser information. It sets cookies named `_ga` and `_ga_*` to recognise returning visitors. This processing is described in [Google’s privacy policy](https://policies.google.com/privacy).',
      '**Analytics never receives the content you work with.** Your JSON is not included in any analytics event. We have also disabled Google’s advertising features, so your visit is not used for remarketing, ad personalisation or audience building.',
    ],
    analyticsOff:
      'This site does not currently load any analytics. No analytics cookies are set, no third-party script runs, and there is nothing to consent to.',
    analyticsNever:
      'We do not sell your data, and we do not use advertising networks, social media widgets, session recording or fingerprinting.',
    choicesHeading: 'Your choices',
    choicesLead: 'You can',
    choicesButton: 'check or change this preference',
    choicesRest:
      'at any time. The panel shows which setting is currently in force and lets you switch it; the analytics link in the footer of every page opens the same panel.',
    choicesImmediate:
      "Turning it off takes effect immediately rather than on your next page load, and the `_ga` cookies are deleted at that moment — you do not have to clear your browser's site data to be rid of them, though doing so works too. Google is not contacted again on any subsequent page unless you turn it back on.",
    choicesUngated:
      "Every tool on this site works identically whether you accept analytics or not. Nothing is gated behind the choice. Clearing your browser's site data for this domain removes everything UtilDock has stored, including your theme and your saved inputs.",
    hostingHeading: 'Hosting',
    hosting:
      'UtilDock is served by Cloudflare Pages. Like any web host, Cloudflare processes the network requests needed to deliver a page and may retain limited technical data — IP address, user agent, timestamps — for security and abuse prevention, governed by [Cloudflare’s privacy policy](https://www.cloudflare.com/privacypolicy/). That covers requests for the site’s own files. What you paste into a tool is never part of any request, so it is never in any log.',
    securityHeading: 'Security',
    security: [
      "The site is served over HTTPS with a strict Content-Security-Policy that restricts which origins may load code or receive data. This is what keeps the privacy commitment above a property of how the site is built, rather than a promise you simply have to take on trust. You are welcome to verify it: open your browser's developer tools, use any tool on the site, and inspect the requests.",
      'Security issues can be reported to [security@utildock.dev](mailto:security@utildock.dev), or see our [security.txt](/.well-known/security.txt).',
    ],
    childrenHeading: 'Children’s privacy',
    children:
      'UtilDock is a developer tool and is not directed at children. We do not knowingly collect personal information from anyone, including children under 13.',
    changesHeading: 'Changes to this policy',
    changes:
      'If this policy changes, the date at the top of this page changes with it. The commitment that the data you paste stays in your browser is not something we intend to revisit.',
    contactHeading: 'Contact',
    contact:
      'Questions about this policy can go to [security@utildock.dev](mailto:security@utildock.dev).',
  },

  /** The `about` slot beneath each tool. Indexable prose, so it matters. */
  toolAbout: {
    'json-formatter': [
      'Paste or drop a document into the input panel and the formatted result appears as you type. Choose two, three or four spaces, or tabs — whichever your project uses. Switch to **Minify** to strip every byte of whitespace, which is what you want before embedding JSON in an environment variable or a URL.',
      '**Sort keys** rewrites every object with its keys in alphabetical order. Two documents that differ only in key order become byte-identical, which makes them diff cleanly in version control.',
      'Parsing runs in a Web Worker, so even multi-megabyte documents format without the page going unresponsive while you type.',
    ],
    'json-viewer': [
      'Paste a document into the source panel and it becomes a navigable tree, with objects and arrays collapsible at every level and values coloured by type.',
      'The filter box matches both keys and values, opening whatever it has to open to show you a hit. Hover any row to copy the full path to that value.',
      'Only the rows currently on screen are rendered, so a document with hundreds of thousands of nodes stays smooth to scroll.',
    ],
    'json-validator': [
      'Every syntax error is reported with its exact line and column, and underlined in the editor where it happens. The parser stops at the first problem, so fix that one and anything further down appears.',
      'Turn on **Check against a schema** and a second panel opens for a JSON Schema. Every violation is listed with its path, and clicking one jumps the editor to it.',
      'Both the document and the schema stay in this tab. Neither is uploaded, which is the point when the schema is internal and the document is real.',
    ],
    'json-diff': [
      'Paste a document into each side. The comparison is structural rather than textual: both documents are parsed first, so reordered keys, different indentation and trailing whitespace never register as changes.',
      'Array elements are matched by identity where one exists — an **id**, **key**, **uuid** or **name** field — so inserting an element at the start reports one addition rather than rewriting everything after it.',
      'Long runs of identical lines fold away, leaving the changes with just enough structure around them to locate each one. Alt + ↑ and Alt + ↓ step through the differences.',
    ],
  },

  /**
   * Strings handed to the React islands as props.
   *
   * These are separate from the rest because they cross a serialization
   * boundary: an island receives plain data, never a function, so anything
   * variable here is a `{placeholder}` filled at runtime by `fill()`. Keeping
   * them in one object also means each page passes exactly one prop.
   */
  islands: {
    common: {
      load: 'Load',
      loadTitle: 'Read a local file — it is read on this machine, never uploaded',
      sample: 'Sample',
      sampleTitle: 'Load a sample document',
      clear: 'Clear',
      copy: 'Copy',
      copied: 'Copied',
      copyTitle: 'Copy to clipboard',
      download: 'Download',
      dropHere: 'Drop the stock here',
      path: 'path',
      pathCopied: 'copied',
      copyPathTitle: 'Copy path — {path}',
      validJson: 'Valid JSON',
      errorAt: 'Line {line}, column {column} — {message}',
      stats: '{objects} objects · {arrays} arrays · {keys} keys · depth {depth}',
    },

    formatter: {
      inputTitle: 'Input',
      formattedTitle: 'Formatted',
      minifiedTitle: 'Minified',
      inputLabel: 'JSON input',
      outputLabel: 'Formatted JSON output',
      placeholder: '{\n  "paste": "your JSON here"\n}',
      idle: 'Paste or drop JSON to begin',
      indent: 'Indent',
      spaces: '{count} spaces',
      tab: 'Tab',
      sortKeys: 'Sort keys',
      sortKeysTitle: 'Sort object keys alphabetically',
      pretty: 'Pretty',
      minify: 'Minify',
      sameSize: 'same size',
      sizeDelta: '{delta} % scale shed',
      prettyFile: 'formatted.json',
      minifiedFile: 'minified.json',
    },

    viewer: {
      sourceTitle: 'Source',
      treeTitle: 'Tree',
      sourceLabel: 'JSON source',
      placeholder: '{\n  "paste": "the JSON you want to explore"\n}',
      idle: 'Paste or drop JSON to explore it',
      filter: 'Filter keys and values',
      filterAria: 'Filter the tree',
      expandAll: 'Expand all',
      expandAllTitle: 'Expand every node',
      collapse: 'Collapse',
      collapseTitle: 'Collapse back to the root',
      expand: 'Expand',
      treeAria: 'JSON tree',
      nothingYet: 'Nothing to show yet',
      matching: p({ one: '{count} matching node', other: '{count} matching nodes' }),
      rowsShown: '{count} rows shown',
      noFilterMatch: 'No keys or values match that filter.',
      emptyValid: 'The tree appears here as soon as the Source panel holds valid JSON.',
      emptyError: 'Fix the syntax error in the Source panel and the tree will appear here.',
    },

    validator: {
      documentTitle: 'Document',
      schemaTitle: 'JSON Schema',
      resultTitle: 'Result',
      documentLabel: 'JSON document to validate',
      placeholder: '{\n  "paste": "the JSON you want to check"\n}',
      schemaPlaceholder: '{\n  "type": "object",\n  "required": ["id"]\n}',
      broken: 'Broken',
      brokenTitle: 'Load a document with deliberate syntax errors',
      sampleValidTitle: 'Load a valid sample',
      useSchema: 'Check against a schema',
      useSchemaTitle: 'Also check the document against a JSON Schema',
      idle: 'Paste or drop JSON to validate it',
      checking: 'Checking…',
      invalidAt: 'Invalid JSON — line {line}, column {column}: {message}',
      schemaViolations: p({
        one: 'Valid JSON, but {count} schema violation',
        other: 'Valid JSON, but {count} schema violations',
      }),
      validAndMatches: 'Valid JSON and matches the schema',
      emptyBody: 'Paste a document into the Document panel. It is checked as you type, entirely in this tab.',
      firstProblem:
        'The parser stops at the first problem it hits. Fix this one and any errors further down the document will appear.',
      okSchema: 'The document is valid JSON and satisfies every rule in the schema.',
      okPlain: 'The document is valid JSON.',
      atLine: 'L{line}',
    },

    diff: {
      originalTitle: 'Original',
      changedTitle: 'Changed',
      comparisonTitle: 'Comparison',
      originalLabel: 'Original JSON',
      changedLabel: 'Changed JSON',
      originalPlaceholder: '{\n  "the": "original document"\n}',
      changedPlaceholder: '{\n  "the": "document to compare against"\n}',
      swap: 'Swap',
      swapTitle: 'Swap the two sides',
      hideInput: 'Hide input',
      editInput: 'Edit input',
      hideTitle: 'Hide the editors and give the comparison the page',
      showTitle: 'Show the editors again',
      foldSame: 'Fold same',
      showAll: 'Show all',
      showAllTitle: 'Show every unchanged line instead of folding them away',
      split: 'Split',
      stack: 'Stack',
      splitTitle: 'Show the two documents side by side',
      stackTitle: 'Stack the two documents in one column',
      prev: 'Previous difference',
      next: 'Next difference',
      prevTitle: 'Previous difference (Alt + ↑)',
      nextTitle: 'Next difference (Alt + ↓)',
      keyboardHint: 'Alt + ↑ / ↓ steps through differences',
      truncated: 'Comparison truncated — the documents are very large',
      onlyOriginal: 'only in original',
      onlyChanged: 'only in changed',
      replaced: 'replaced',
      headerOriginal: 'Original',
      headerChanged: 'Changed',
      unifiedOriginal: '− original',
      unifiedChanged: '+ changed',
      idle: 'Paste a document into each side — or press **Sample** to try it with a pair that differs in a few interesting ways.',
      sideError:
        'The {side} document has a syntax error on line {line}. Fix it and the comparison will run.',
      sideOriginal: 'original',
      sideChanged: 'changed',
      comparing: 'Comparing…',
      identicalTitle: 'The two documents are equivalent',
      identicalBody:
        'Every value matches. Differences in key order, indentation and whitespace are ignored, since none of them change what the JSON means.',
      identicalLines: p({ one: '{count} identical line', other: '{count} identical lines' }),
      showIdentical: 'Show these identical lines',
      jumpTo: 'Jump to the next {kind} difference',
      kinds: {
        added: 'added',
        removed: 'removed',
        changed: 'changed',
        moved: 'moved',
      },
    },
  },
};

/**
 * Deliberately not `as const`: the literal types that would produce cannot be
 * satisfied by a translation, since `'Skip to content'` is not assignable to
 * `'Ir al contenido'`. Widened to `string` and `string[]`, this is exactly the
 * shape contract every locale has to meet.
 */
export type UIStrings = typeof en;

/** What an island receives. One prop, plain data, no functions. */
export type IslandStrings = UIStrings['islands'];
