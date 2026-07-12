import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import TileCalculator, { faqItems } from '@/views/TileCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор плитки — расчёт количества',
  description: 'Онлайн-расчёт количества плитки на комнату по размерам помещения и плитки, с учётом способа укладки и запаса. Расчёт упаковок.',
  url: '/calculators/tile'
});

const TileCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <TileCalculator />
  </>
);

export default TileCalculatorPage;
