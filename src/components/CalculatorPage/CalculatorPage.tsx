'use client';

import { Typography } from '@heroui/react';
import { usePathname } from 'next/navigation';

import Breadcrumbs from '@/components/Breadcrumbs';
import LdJson from '@/components/LdJson';
import { createBreadcrumbJsonLd } from '@/utils/breadcrumbJsonLd';

import styles from './CalculatorPage.module.scss';

interface CalculatorPageProps {
  title: string;
  intro: string;
  children: React.ReactNode;
}

const CalculatorPage = ({ title, intro, children }: CalculatorPageProps) => {
  const pathname = usePathname();
  const breadcrumbLabel = title.split(':')[0].trim();

  const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'Калькуляторы', href: '/calculators' },
    { label: breadcrumbLabel, href: pathname }
  ];

  return (
    <>
      <LdJson json={createBreadcrumbJsonLd(breadcrumbItems)} />

      <div className={styles.content}>
        <div className={styles.top}>
          <Breadcrumbs items={[
            { label: 'Главная', href: '/' },
            { label: 'Калькуляторы', href: '/calculators' },
            { label: breadcrumbLabel }
          ]}
          />

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
        </div>

        {children}
      </div>
    </>
  );
};

export default CalculatorPage;
