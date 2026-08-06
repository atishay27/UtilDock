import type { CategoryId, Faq } from '../../tools';

/**
 * The translatable half of a registry entry.
 *
 * Everything absent from this list — `id`, `href`, `category`, `icon`,
 * `status` — is structure, is identical in every language, and stays in
 * `tools.ts` where it belongs.
 *
 * `keywords` is here for a reason that is easy to get wrong: it is not prose to
 * be translated but the terms people actually type. The German for "JSON
 * beautifier" is "JSON beautifier", because that is what German developers
 * search; a literal translation would be a keyword nobody enters.
 */
export interface ToolCopy {
  name: string;
  tagline: string;
  does: string[];
  title: string;
  description: string;
  overview: string;
  faqs: Faq[];
  keywords: string[];
}

/** Partial at both levels: an untranslated tool, or field, falls back to English. */
export type ToolCopyOverrides = Record<string, Partial<ToolCopy> | undefined>;

export interface CategoryCopy {
  name: string;
  blurb: string;
}

export type CategoryCopyOverrides = Partial<Record<CategoryId, Partial<CategoryCopy>>>;
