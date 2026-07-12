import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import PlasterCalculator, { faqItems } from '@/views/PlasterCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор расхода штукатурки',
  description: 'Расчёт расхода штукатурки в кг и мешках по площади стен, толщине слоя и типу смеси. Учёт количества слоёв.',
  url: '/calculators/plaster-consumption'
});

const PlasterCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <PlasterCalculator />
  </>
);

export default PlasterCalculatorPage;
