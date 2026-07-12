import type { BreadcrumbList, WithContext } from 'schema-dts';

import config from '@/config';

interface BreadcrumbJsonLdItem {
  label: string;
  href: string;
}

export const createBreadcrumbJsonLd = (items: BreadcrumbJsonLdItem[]): WithContext<BreadcrumbList> => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${config.APP_URL}${item.href}`
  }))
});
