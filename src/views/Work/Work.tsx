import Link from 'next/link';

import { data } from '@/content/works/data';

import styles from './Work.module.scss';

const Work = () => (
  <div className={styles.content}>
    <h1 className={styles.head}>
      Отделочные работы
    </h1>

    <ol className={styles.list}>
      {data.map((service) => (
        <li key={service.title}>
          <h2 className={styles.categoryTitle}>
            {service.title}
          </h2>

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

    <p className={styles.priceLink}>
      Стоимость этих работ смотрите в
      {' '}
      <Link href="/price">
        прайс-листе
      </Link>
      .
    </p>
  </div>
);

export default Work;
