import Link from 'next/link';

import { calculatorCategories, calculatorTools } from '@/content/calculators/data';

import styles from './Calculators.module.scss';

const Calculators = () => (
  <div className={styles.content}>
    <h1 className={styles.title}>
      Калькуляторы для ремонта
    </h1>

    <p className={styles.intro}>
      Онлайн-калькуляторы помогают заранее прикинуть, сколько материала понадобится на комнату:
      плитки, обоев, ламината, шпаклёвки, краски или смеси для стяжки пола. Каждый расчёт — это
      количество материала по введённым размерам, а не стоимость ремонта: калькуляторы не считают
      смету и не дают итоговую цену работ.
    </p>

    {calculatorCategories.map((category) => (
      <section
        key={category.slug}
        className={styles.category}
      >
        <h2 className={styles.categoryTitle}>
          {category.title}
        </h2>

        <p className={styles.categoryDescription}>
          {category.description}
        </p>

        <ul className={styles.cards}>
          {calculatorTools
            .filter((tool) => tool.category === category.slug)
            .map((tool) => (
              <li
                key={tool.slug}
                className={styles.card}
              >
                <Link
                  className={styles.cardTitle}
                  href={`/calculators/${tool.slug}`}
                >
                  {tool.title}
                </Link>

                <p className={styles.cardDescription}>
                  {tool.description}
                </p>
              </li>
            ))}
        </ul>
      </section>
    ))}

    <p className={styles.footerText}>
      Заранее рассчитанное количество материала удобно использовать в разговоре с продавцом или
      прорабом — так проще сверить объём закупки и не переплачивать за лишний запас. Точную
      стоимость работ и материалов под ваш объект смотрите в{' '}
      <Link href="/price">
        прайс-листе
      </Link>
      {' '}или уточняйте на замере.
    </p>
  </div>
);

export default Calculators;
