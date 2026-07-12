import { Card } from '@heroui/react';
import Link from 'next/link';

import type { CalculatorTool } from '@/content/calculators/data';

import styles from './CalculatorCard.module.scss';

interface CalculatorCardProps {
  tool: CalculatorTool;
}

const CalculatorCard = ({ tool }: CalculatorCardProps) => (
  <Card className={styles.card}>
    <Card.Header className={styles.header}>
      <tool.icon
        aria-hidden
        className={styles.icon}
      />

      <Link
        className={styles.title}
        href={`/calculators/${tool.slug}`}
      >
        {tool.title}
      </Link>
    </Card.Header>

    <Card.Description className={styles.description}>
      {tool.description}
    </Card.Description>
  </Card>
);

export default CalculatorCard;
