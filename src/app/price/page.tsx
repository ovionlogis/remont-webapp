import type { Metadata } from 'next';

import { createMetadata } from '@/utils/metadata';

export { default } from '@/views/Price';

export const metadata: Metadata = createMetadata({
  title: 'Прайс-лист на ремонт квартир в Бердске',
  description: 'Стоимость ремонтных и отделочных работ в Бердске и Академгородке. Цены на штукатурку, малярные работы, укладку плитки, сантехнику и другое.',
  url: '/price'
});
