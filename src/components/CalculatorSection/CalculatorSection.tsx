import { Typography } from '@heroui/react';

import styles from './CalculatorSection.module.scss';

interface CalculatorSectionProps {
  title?: string;
  children: React.ReactNode;
}

const CalculatorSection = ({ title, children }: CalculatorSectionProps) => (
  <section className={styles.section}>
    {title ? (
      <Typography.Heading
        className={styles.title}
        level={2}
      >
        {title}
      </Typography.Heading>
    ) : null}

    <div className={styles.body}>
      {children}
    </div>
  </section>
);

export default CalculatorSection;
