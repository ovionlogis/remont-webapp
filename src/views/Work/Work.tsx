import { Typography } from '@heroui/react';
import Link from 'next/link';

import { data } from '@/content/works/data';

import styles from './Work.module.scss';

const Work = () => (
  <div className={styles.content}>
    <Typography.Heading
      className={styles.head}
      level={1}
    >
      Отделочные работы
    </Typography.Heading>

    <ol className={styles.list}>
      {data.map((service, index) => (
        <li key={service.title}>
          <div className={styles.categoryHead}>
            <span className={styles.index}>
              {index + 1}
              .
            </span>

            <service.icon
              aria-hidden
              className={styles.categoryIcon}
            />

            <Typography.Heading
              className={styles.categoryTitle}
              level={2}
            >
              {service.title}
            </Typography.Heading>
          </div>

          <ul>
            {service.items.map((item) => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>

    <Typography.Paragraph className={styles.priceLink}>
      Стоимость этих работ смотрите в
      {' '}
      <Link href="/price">
        прайс-листе
      </Link>
      .
    </Typography.Paragraph>
  </div>
);

export default Work;
