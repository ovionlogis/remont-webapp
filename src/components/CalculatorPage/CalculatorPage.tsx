import { Typography } from '@heroui/react';

import styles from './CalculatorPage.module.scss';

interface CalculatorPageProps {
  title: string;
  intro: string;
  children: React.ReactNode;
}

const CalculatorPage = ({ title, intro, children }: CalculatorPageProps) => (
  <div className={styles.content}>
    <div className={styles.head}>
      <Typography.Heading
        className={styles.title}
        level={1}
      >
        {title}
      </Typography.Heading>

      <Typography.Paragraph className={styles.intro}>
        {intro}
      </Typography.Paragraph>
    </div>

    {children}
  </div>
);

export default CalculatorPage;
