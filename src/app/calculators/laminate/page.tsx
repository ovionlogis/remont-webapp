import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import LaminateCalculator, { faqItems } from '@/views/LaminateCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор ламината — расчёт упаковок',
  description: 'Расчёт количества досок и упаковок ламината по площади комнаты, размеру доски и способу укладки, с учётом запаса на подрезку.',
  url: '/calculators/laminate'
});

const LaminateCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <LaminateCalculator />
  </>
);

export default LaminateCalculatorPage;
