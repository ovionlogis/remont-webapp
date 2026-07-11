import Link from 'next/link';

import { calculatorTools } from '@/content/calculators/data';

import styles from './RelatedCalculators.module.scss';

type CalculatorTool = (typeof calculatorTools)[number];

interface RelatedCalculatorsProps {
  slugs: string[];
}

const RelatedCalculators = ({ slugs }: RelatedCalculatorsProps) => {
  const tools = slugs
    .map((slug) => calculatorTools.find((tool) => tool.slug === slug))
    .filter((tool): tool is CalculatorTool => Boolean(tool));

  if (tools.length === 0) {
    return null;
  }

  return (
    <div className={styles.related}>
      <h2 className={styles.title}>
        Похожие калькуляторы
      </h2>

      <ul className={styles.list}>
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              className={styles.link}
              href={`/calculators/${tool.slug}`}
            >
              {tool.title}
            </Link>

            <span className={styles.description}>
              {tool.description}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedCalculators;
