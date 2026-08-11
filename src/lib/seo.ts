/**
 * Shared JSON-LD nodes.
 *
 * Every page emits one `@graph`. Organization and WebSite are in all of them so
 * that a `@id` reference always resolves on the page that makes it — a node
 * defined only on the home page is a dangling reference everywhere else.
 */

import { SITE, absoluteUrl } from './site';
import { localizedPath, type Locale } from './i18n/locales';

export const WEBSITE_ID = `${SITE.url}/#website`;
export const ORGANIZATION_ID = `${SITE.url}/#organization`;

/** Language-neutral: one `@id` must not describe itself eight different ways. */
export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: new URL('/icon-512.png', SITE.url).href,
    description: SITE.description,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    alternateName: SITE.tagline,
    url: absoluteUrl('/'),
    description: SITE.description,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export interface Crumb {
  name: string;
  /** Unprefixed path; the locale's prefix is applied here. */
  path: string;
}

export function breadcrumbNode(trail: Crumb[], locale: Locale) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localizedPath(crumb.path, locale)),
    })),
  };
}

export function itemListNode(
  name: string,
  items: { name: string; description: string; href: string }[],
  locale: Locale,
) {
  return {
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(localizedPath(item.href, locale)),
    })),
  };
}

/** Wraps page-specific nodes with the two every page carries. */
export function graph(nodes: unknown[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), ...nodes],
  };
}
