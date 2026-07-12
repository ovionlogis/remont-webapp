import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import DrywallCalculator, { faqItems } from '@/views/DrywallCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор гипсокартона — расчёт листов, профиля и саморезов',
  description: 'Расчёт количества листов гипсокартона, длины стоечного профиля и саморезов по площади стен или потолка. Учёт числа слоёв и запаса.',
  url: '/calculators/drywall'
});

const DrywallCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <DrywallCalculator />
  </>
);

export default DrywallCalculatorPage;
