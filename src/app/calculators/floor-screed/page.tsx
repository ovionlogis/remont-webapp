import type { Metadata } from 'next';

import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import FloorScreedCalculator, { faqItems } from '@/views/FloorScreedCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор стяжки пола — расчёт смеси',
  description: 'Расчёт количества сухой смеси и мешков для стяжки пола по площади и толщине слоя. Для готовых смесей и расчёта цемент/песок.',
  url: '/calculators/floor-screed'
});

const FloorScreedCalculatorPage = () => (
  <>
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqJsonLd(faqItems)) }}
      type="application/ld+json"
    />

    <FloorScreedCalculator />
  </>
);

export default FloorScreedCalculatorPage;
