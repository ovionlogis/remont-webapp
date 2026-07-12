import {
  Blocks,
  Building2,
  Grid2x2,
  Layers3,
  Paintbrush,
  PaintBucket,
  PaintRoller,
  SquareStack,
  TableCellsSplit,
  Thermometer,
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
    description: 'Количество плитки и обоев на комнату по её размерам.'
  },
  {
    slug: 'materials',
    title: 'Материалы',
    description: 'Расход шпаклёвки, краски и других материалов по площади и толщине слоя.'
  },
  {
    slug: 'floors',
    title: 'Полы',
    description: 'Расчёт стяжки и ламината для финишного покрытия пола.'
  },
  {
    slug: 'construction',
    title: 'Конструктив',
    description: 'Расчёт кладки стен и объёма бетона для фундаментов, плит и колонн.'
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
  },
  {
    slug: 'laminate',
    title: 'Калькулятор ламината',
    shortTitle: 'Ламинат',
    category: 'floors',
    description: 'Число упаковок ламината по площади помещения и размеру доски.',
    priceCategorySlug: 'flooring',
    icon: TableCellsSplit
  },
  {
    slug: 'drywall',
    title: 'Калькулятор гипсокартона',
    shortTitle: 'Гипсокартон',
    category: 'materials',
    description: 'Число листов гипсокартона, длина профиля и количество саморезов по площади стен или потолка.',
    priceCategorySlug: 'drywall',
    icon: SquareStack
  },
  {
    slug: 'plaster-consumption',
    title: 'Расход штукатурки',
    shortTitle: 'Штукатурка',
    category: 'materials',
    description: 'Расход штукатурки в кг и мешках по площади, толщине слоя и типу смеси.',
    priceCategorySlug: 'plastering',
    icon: Paintbrush
  },
  {
    slug: 'insulation',
    title: 'Калькулятор утеплителя',
    shortTitle: 'Утепление',
    category: 'materials',
    description: 'Объём утеплителя и количество упаковок по площади и толщине слоя.',
    priceCategorySlug: 'insulation',
    icon: Thermometer
  },
  {
    slug: 'masonry',
    title: 'Калькулятор кирпича и блоков',
    shortTitle: 'Кладка',
    category: 'construction',
    description: 'Количество кирпича или блоков и объём раствора по площади и толщине кладки.',
    priceCategorySlug: 'masonry',
    icon: Blocks
  },
  {
    slug: 'concrete',
    title: 'Калькулятор бетона',
    shortTitle: 'Бетон',
    category: 'construction',
    description: 'Объём бетона в кубометрах для плиты, ленты фундамента или свай с учётом запаса.',
    priceCategorySlug: 'concrete',
    icon: Building2
  }
];
