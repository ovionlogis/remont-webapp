import type { Metadata } from 'next';

import LdJson from '@/components/LdJson';
import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import WallpaperCalculator, { faqItems } from '@/views/WallpaperCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор обоев — расчёт рулонов',
  description: 'Расчёт количества рулонов обоев по периметру и высоте комнаты, ширине рулона и раппорту рисунка. Точный подсчёт полос.',
  url: '/calculators/wallpaper'
});

const WallpaperCalculatorPage = () => (
  <>
    <LdJson json={createFaqJsonLd(faqItems)} />

    <WallpaperCalculator />
  </>
);

export default WallpaperCalculatorPage;
