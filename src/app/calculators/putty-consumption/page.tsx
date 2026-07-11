import type { Metadata } from 'next';

import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import PuttyCalculator, { faqItems } from '@/views/PuttyCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Расход шпаклёвки — калькулятор расчёта по площади',
  description: 'Расчёт расхода шпаклёвки в кг и мешках по площади стен, толщине слоя и типу материала. Учёт количества слоёв.',
  url: '/calculators/putty-consumption'
});

const PuttyCalculatorPage = () => (
  <>
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqJsonLd(faqItems)) }}
      type="application/ld+json"
    />

    <PuttyCalculator />
  </>
);

export default PuttyCalculatorPage;
