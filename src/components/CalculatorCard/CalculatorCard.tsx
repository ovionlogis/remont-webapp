import { Card } from '@heroui/react';
import { cardVariants } from '@heroui/styles';
import Link from 'next/link';

import type { CalculatorTool } from '@/content/calculators/data';

import styles from './CalculatorCard.module.scss';

interface CalculatorCardProps {
  tool: CalculatorTool;
}

const CalculatorCard = ({ tool }: CalculatorCardProps) => (
  <Link
    className={cardVariants().base({ className: styles.card })}
    href={`/calculators/${tool.slug}`}
  >
    <tool.icon
      aria-hidden
      className={styles.icon}
    />

    <Card.Header className={styles.header}>
      <span className={styles.title}>
        {tool.title}
      </span>
    </Card.Header>

    <Card.Description className={styles.description}>
      {tool.description}
    </Card.Description>
  </Link>
);

export default CalculatorCard;
