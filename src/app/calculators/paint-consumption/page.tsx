import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import PaintCalculator, { faqItems } from '@/views/PaintCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор расхода краски',
  description: 'Расчёт расхода краски в литрах и банках по площади, типу поверхности и количеству слоёв. Точный подбор объёма закупки.',
  url: '/calculators/paint-consumption'
});

const PaintCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <PaintCalculator />
  </>
);

export default PaintCalculatorPage;
