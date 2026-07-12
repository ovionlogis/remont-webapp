import { Typography } from '@heroui/react';
import Link from 'next/link';

import CalculatorCard from '@/components/CalculatorCard';
import { calculatorCategories, calculatorTools } from '@/content/calculators/data';

import styles from './Calculators.module.scss';

const Calculators = () => (
  <div className={styles.content}>
    <Typography.Heading
      className={styles.title}
      level={1}
    >
      Калькуляторы для ремонта
    </Typography.Heading>

    <Typography.Paragraph className={styles.intro}>
      Онлайн-калькуляторы помогают заранее прикинуть, сколько материала понадобится на комнату:
      плитки, обоев, ламината, шпаклёвки, краски или смеси для стяжки пола. Каждый расчёт — это
      количество материала по введённым размерам, а не стоимость ремонта: калькуляторы не считают
      смету и не дают итоговую цену работ.
    </Typography.Paragraph>

    {calculatorCategories.map((category) => (
      <section
        key={category.slug}
        className={styles.category}
      >
        <Typography.Heading
          className={styles.categoryTitle}
          level={2}
        >
          {category.title}
        </Typography.Heading>

        <Typography.Paragraph className={styles.categoryDescription}>
          {category.description}
        </Typography.Paragraph>

        <ul className={styles.cards}>
          {calculatorTools
            .filter((tool) => tool.category === category.slug)
            .map((tool) => (
              <li key={tool.slug}>
                <CalculatorCard tool={tool} />
              </li>
            ))}
        </ul>
      </section>
    ))}

    <Typography.Paragraph className={styles.footerText}>
      Заранее рассчитанное количество материала удобно использовать в разговоре с продавцом или
      прорабом — так проще сверить объём закупки и не переплачивать за лишний запас. Точную
      стоимость работ и материалов под ваш объект смотрите в{' '}
      <Link href="/price">
        прайс-листе
      </Link>
      {' '}или уточняйте на замере.
    </Typography.Paragraph>
  </div>
);

export default Calculators;
