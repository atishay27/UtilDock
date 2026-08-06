/**
 * The build-time side of i18n: dictionaries, tool-copy merging, and the URL
 * bookkeeping that hreflang needs.
 *
 * Astro components import from here. React islands must not — this module
 * imports every dictionary, and an island that touched it would pull all of
 * them into the client bundle. Islands get `format.ts` and a `strings` prop.
 */

import { SITE, absoluteUrl } from '../site';
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_IDS,
  localizedPath,
  type Locale,
} from './locales';
import { en, type UIStrings } from './ui/en';
import { es } from './ui/es';
import { de } from './ui/de';
import { fr } from './ui/fr';
import { ptbr } from './ui/pt-br';
import { ja } from './ui/ja';
import { ru } from './ui/ru';
import { zh } from './ui/zh';
import { toolsEs, categoriesEs } from './tools/es';
import { toolsDe, categoriesDe } from './tools/de';
import { toolsFr, categoriesFr } from './tools/fr';
import { toolsPtbr, categoriesPtbr } from './tools/pt-br';
import { toolsJa, categoriesJa } from './tools/ja';
import { toolsRu, categoriesRu } from './tools/ru';
import { toolsZh, categoriesZh } from './tools/zh';
import type { CategoryCopy, CategoryCopyOverrides, ToolCopyOverrides } from './tools/types';
import { CATEGORIES, type Category, type CategoryId, type Tool } from '../tools';

export * from './locales';
export type { UIStrings } from './ui/en';

const DICTIONARIES: Record<Locale, UIStrings> = { en, es, de, fr, 'pt-br': ptbr, ja, ru, zh };

/**
 * Per-locale replacements for the copy that lives inline in `tools.ts`.
 *
 * The registry keeps its English text so adding a tool stays exactly what
 * CLAUDE.md says it is — one entry there, one page, one component. A tool that
 * nobody has translated yet simply reads in English on the localised pages,
 * which is the right failure: the tool still works, still links, still appears
 * in the nav, and the gap is visible rather than a missing page.
 */
const TOOL_OVERRIDES: Record<Locale, ToolCopyOverrides> = {
  en: {},
  es: toolsEs,
  de: toolsDe,
  fr: toolsFr,
  'pt-br': toolsPtbr,
  ja: toolsJa,
  ru: toolsRu,
  zh: toolsZh,
};
const CATEGORY_OVERRIDES: Record<Locale, CategoryCopyOverrides> = {
  en: {},
  es: categoriesEs,
  de: categoriesDe,
  fr: categoriesFr,
  'pt-br': categoriesPtbr,
  ja: categoriesJa,
  ru: categoriesRu,
  zh: categoriesZh,
};

/** The dictionary for a locale. Complete by construction — see `ui/en.ts`. */
export function t(locale: Locale): UIStrings {
  return DICTIONARIES[locale];
}

/** The BCP 47 tag, for `Intl.PluralRules` and `<html lang>`. */
export function langTag(locale: Locale): string {
  return LOCALES[locale].hreflang;
}

/**
 * A tool with its copy in the requested locale, falling back field by field.
 * Field-level rather than entry-level: a translated tagline should not be
 * thrown away because nobody has got to the FAQs yet.
 */
export function localizedTool(tool: Tool, locale: Locale): Tool {
  const override = TOOL_OVERRIDES[locale][tool.id];
  if (!override) return tool;
  return {
    ...tool,
    name: override.name ?? tool.name,
    tagline: override.tagline ?? tool.tagline,
    does: override.does ?? tool.does,
    title: override.title ?? tool.title,
    description: override.description ?? tool.description,
    overview: override.overview ?? tool.overview,
    faqs: override.faqs ?? tool.faqs,
    keywords: override.keywords ?? tool.keywords,
  };
}

export function localizedCategory(category: Category, locale: Locale): CategoryCopy & Category {
  const override = CATEGORY_OVERRIDES[locale][category.id];
  return {
    ...category,
    name: override?.name ?? category.name,
    blurb: override?.blurb ?? category.blurb,
  };
}

export function localizedCategories(locale: Locale): (Category & CategoryCopy)[] {
  return CATEGORIES.map((category) => localizedCategory(category, locale));
}

export function localizedTools(tools: Tool[], locale: Locale): Tool[] {
  return tools.map((tool) => localizedTool(tool, locale));
}

/** `href` for a link, already carrying the current locale's prefix. */
export function href(path: string, locale: Locale): string {
  return localizedPath(path, locale);
}

export interface Alternate {
  locale: Locale;
  hreflang: string;
  href: string;
}

/**
 * Every published address for one page, for the `<link rel="alternate">` block.
 *
 * Reciprocity is the rule Google actually enforces: every locale's page must
 * list every other, including itself, or the whole cluster is ignored. Building
 * the list from one function called by one layout is how that stays true.
 */
export function alternates(rootPathname: string): Alternate[] {
  return LOCALE_IDS.map((locale) => ({
    locale,
    hreflang: LOCALES[locale].hreflang,
    href: absoluteUrl(localizedPath(rootPathname, locale)),
  }));
}

/** `x-default` points at English, which is also the unprefixed address. */
export function defaultAlternate(rootPathname: string): string {
  return absoluteUrl(localizedPath(rootPathname, DEFAULT_LOCALE));
}

/** The site name never translates; the tagline does. */
export function siteName(): string {
  return SITE.name;
}

export type { CategoryId };
