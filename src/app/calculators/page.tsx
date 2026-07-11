import type { Metadata } from 'next';

import { createMetadata } from '@/utils/metadata';

export { default } from '@/views/Calculators';

export const metadata: Metadata = createMetadata({
  title: 'Калькуляторы для ремонта — расчёт материалов онлайн',
  description: 'Бесплатные онлайн-калькуляторы расхода материалов: плитка, обои, ламинат, шпаклёвка, краска, стяжка пола. Точный расчёт по формулам.',
  url: '/calculators'
});
