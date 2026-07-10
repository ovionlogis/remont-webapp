import type { Metadata } from 'next';

import { createMetadata } from '@/utils/metadata';

export { default } from '@/views/Home';

export const metadata: Metadata = createMetadata({
  title: 'Ремонт и отделка квартир в Бердске, Академгородке',
  description: 'Ремонт и отделка квартир под ключ в Бердске и Академгородке. Малярные, штукатурные, сантехнические работы. Работаем с физическими и юридическими лицами.',
  absolute: true
});
