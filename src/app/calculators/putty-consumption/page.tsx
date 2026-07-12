import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import PuttyCalculator, { faqItems } from '@/views/PuttyCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор расхода шпаклёвки',
  description: 'Расчёт расхода шпаклёвки в кг и мешках по площади стен, толщине слоя и типу материала. Учёт количества слоёв.',
  url: '/calculators/putty-consumption'
});

const PuttyCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <PuttyCalculator />
  </>
);

export default PuttyCalculatorPage;
