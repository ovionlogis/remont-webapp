import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import InsulationCalculator, { faqItems } from '@/views/InsulationCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор утеплителя — расчёт объёма и упаковок',
  description: 'Расчёт объёма утеплителя в кубометрах и количества упаковок по площади поверхности и толщине слоя. Минвата, пеноплекс, напыляемый пенополиуретан.',
  url: '/calculators/insulation'
});

const InsulationCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <InsulationCalculator />
  </>
);

export default InsulationCalculatorPage;
