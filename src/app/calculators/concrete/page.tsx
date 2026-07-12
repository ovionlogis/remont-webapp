import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import ConcreteCalculator, { faqItems } from '@/views/ConcreteCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор бетона — расчёт объёма для фундамента и плиты',
  description: 'Расчёт объёма бетона в кубометрах для плиты, ленточного фундамента, столбов и свай с учётом запаса. Ориентир для заказа бетона от миксера.',
  url: '/calculators/concrete'
});

const ConcreteCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <ConcreteCalculator />
  </>
);

export default ConcreteCalculatorPage;
