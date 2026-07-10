import type { Metadata } from 'next';

import { createMetadata } from '@/utils/metadata';

export { default } from '@/views/Work';

export const metadata: Metadata = createMetadata({
  title: 'Отделочные работы в Бердске',
  description: 'Полный перечень отделочных, штукатурных, малярных и сантехнических работ. Монтаж полов, потолков, облицовка плиткой, установка сантехники в Бердске.',
  url: '/work'
});
