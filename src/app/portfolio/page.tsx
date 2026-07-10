import type { Metadata } from 'next';

import { createMetadata } from '@/utils/metadata';

export { default } from '@/views/Portfolio';

export const metadata: Metadata = createMetadata({
  title: 'Портфолио выполненных работ',
  description: 'Фотографии выполненных работ по ремонту и отделке квартир в Бердске. Сауна, санузел, кухня, лоджия, потолки — смотрите наши реальные проекты.',
  url: '/portfolio'
});
