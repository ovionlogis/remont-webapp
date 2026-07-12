import { Typography } from '@heroui/react';

import CalculatorCard from '@/components/CalculatorCard';
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
      <Typography.Heading
        className={styles.title}
        level={2}
      >
        Похожие калькуляторы
      </Typography.Heading>

      <ul className={styles.list}>
        {tools.map((tool) => (
          <li key={tool.slug}>
            <CalculatorCard tool={tool} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedCalculators;
