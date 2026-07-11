import type { Metadata } from 'next';

import { createFaqJsonLd } from '@/utils/faqJsonLd';
import { createMetadata } from '@/utils/metadata';
import WallpaperCalculator, { faqItems } from '@/views/WallpaperCalculator';

export const metadata: Metadata = createMetadata({
  title: 'Калькулятор обоев — расчёт количества рулонов',
  description: 'Расчёт количества рулонов обоев по периметру и высоте комнаты, ширине рулона и раппорту рисунка. Точный подсчёт полос.',
  url: '/calculators/wallpaper'
});

const WallpaperCalculatorPage = () => (
  <>
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(createFaqJsonLd(faqItems)) }}
      type="application/ld+json"
    />

    <WallpaperCalculator />
  </>
);

export default WallpaperCalculatorPage;
