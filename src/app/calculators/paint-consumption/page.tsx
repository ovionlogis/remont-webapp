import type { Metadata } from 'next';

import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import PaintCalculator, { faqItems } from '@/views/PaintCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Расход краски — калькулятор расчёта на м²',
  description: 'Расчёт расхода краски в литрах и банках по площади, типу поверхности и количеству слоёв. Точный подбор объёма закупки.',
  url: '/calculators/paint-consumption'
});

const PaintCalculatorPage = () => (
  <>
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqJsonLd(faqItems)) }}
      type="application/ld+json"
    />

    <PaintCalculator />
  </>
);

export default PaintCalculatorPage;
