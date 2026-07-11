import type { Metadata } from 'next';

import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import TileCalculator, { faqItems } from '@/views/TileCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор плитки — расчёт количества на пол и стены',
  description: 'Онлайн-расчёт количества плитки на комнату по размерам помещения и плитки, с учётом способа укладки и запаса. Расчёт упаковок.',
  url: '/calculators/tile'
});

const TileCalculatorPage = () => (
  <>
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqJsonLd(faqItems)) }}
      type="application/ld+json"
    />

    <TileCalculator />
  </>
);

export default TileCalculatorPage;
