import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import MasonryCalculator, { faqItems } from '@/views/MasonryCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор кирпича и блоков — расчёт кладки',
  description: 'Расчёт количества кирпича, газобетонных или пеноблоков и объёма раствора по площади стены и толщине кладки.',
  url: '/calculators/masonry'
});

const MasonryCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <MasonryCalculator />
  </>
);

export default MasonryCalculatorPage;
