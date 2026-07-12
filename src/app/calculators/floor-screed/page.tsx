import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
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
    <LdJson json={createFaqJsonLd(faqItems)} />

    <FloorScreedCalculator />
  </>
);

export default FloorScreedCalculatorPage;
