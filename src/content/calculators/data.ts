import {
  Grid2x2,
  Layers3,
  PaintBucket,
  PaintRoller,
  TableCellsSplit,
  Wallpaper
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface CalculatorCategory {
  slug: string;
  title: string;
  description: string;
}

export interface CalculatorTool {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  priceCategorySlug: string;
  icon: LucideIcon;
}

export const calculatorCategories: CalculatorCategory[] = [
  {
    slug: 'finishing',
    title: 'Отделка',
    description: 'Количество плитки, обоев и ламината на комнату по её размерам.'
  },
  {
    slug: 'materials',
    title: 'Материалы',
    description: 'Расход шпаклёвки, краски и других материалов по площади и толщине слоя.'
  },
  {
    slug: 'floors',
    title: 'Полы',
    description: 'Расчёт смеси для стяжки пола под финишное покрытие.'
  }
];

export const calculatorTools: CalculatorTool[] = [
  {
    slug: 'tile',
    title: 'Калькулятор плитки',
    shortTitle: 'Плитка',
    category: 'finishing',
    description: 'Сколько плитки нужно на пол или стены с учётом способа укладки и запаса на подрезку.',
    priceCategorySlug: 'tiling',
    icon: Grid2x2
  },
  {
    slug: 'wallpaper',
    title: 'Калькулятор обоев',
    shortTitle: 'Обои',
    category: 'finishing',
    description: 'Количество рулонов обоев по периметру комнаты, ширине рулона и раппорту рисунка.',
    priceCategorySlug: 'wallpaper',
    icon: Wallpaper
  },
  {
    slug: 'laminate',
    title: 'Калькулятор ламината',
    shortTitle: 'Ламинат',
    category: 'finishing',
    description: 'Число упаковок ламината по площади помещения и размеру доски.',
    priceCategorySlug: 'flooring',
    icon: TableCellsSplit
  },
  {
    slug: 'putty-consumption',
    title: 'Расход шпаклёвки',
    shortTitle: 'Шпаклёвка',
    category: 'materials',
    description: 'Расход шпаклёвки в кг и мешках по площади, толщине слоя и типу материала.',
    priceCategorySlug: 'plastering',
    icon: PaintRoller
  },
  {
    slug: 'paint-consumption',
    title: 'Расход краски',
    shortTitle: 'Краска',
    category: 'materials',
    description: 'Расход краски в литрах и банках по площади и количеству слоёв.',
    priceCategorySlug: 'painting',
    icon: PaintBucket
  },
  {
    slug: 'floor-screed',
    title: 'Калькулятор стяжки пола',
    shortTitle: 'Стяжка пола',
    category: 'floors',
    description: 'Количество сухой смеси или цемента и песка на стяжку пола заданной толщины.',
    priceCategorySlug: 'floor-screed',
    icon: Layers3
  }
];
