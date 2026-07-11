import type { MetadataRoute } from 'next';

import config from '@/config';
import { calculatorTools } from '@/content/calculators/data';
import { PRICE_UPDATED_AT } from '@/content/prices/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${config.APP_URL}/`,
      changeFrequency: 'yearly',
      priority: 1
    },
    {
      url: `${config.APP_URL}/work`,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${config.APP_URL}/portfolio`,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${config.APP_URL}/price`,
      lastModified: PRICE_UPDATED_AT.iso,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${config.APP_URL}/calculators`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    ...calculatorTools.map((tool) => ({
      url: `${config.APP_URL}/calculators/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ];
}
