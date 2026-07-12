'use client';

import { useEffect, useRef, useState } from 'react';
import { Typography } from '@heroui/react';

import ButtonLink from '@/components/ButtonLink';
import Disclaimer from '@/components/Disclaimer';
import { PRICE_UPDATED_AT, prices } from '@/content/prices/data';

import styles from './Price.module.scss';

const Price = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleSections = useRef(new Set<number>());

  useEffect(() => {
    const sections = document.querySelectorAll('[data-section-index]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-section-index'));

          if (entry.isIntersecting) {
            visibleSections.current.add(index);
          } else {
            visibleSections.current.delete(index);
          }
        });

        if (visibleSections.current.size > 0) {
          setActiveIndex(Math.min(...visibleSections.current));
        }
      },
      { rootMargin: '0px 0px -40% 0px' }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.head}>
        <Typography.Heading
          className={styles.title}
          level={1}
        >
          Прайс-лист
        </Typography.Heading>

        <ButtonLink
          download
          href="/price.pdf"
        >
          Скачать PDF
        </ButtonLink>
      </div>

      <Typography.Paragraph className={styles.updated}>
        Прайс обновлён: <time dateTime={PRICE_UPDATED_AT.iso}>{PRICE_UPDATED_AT.label}</time>
      </Typography.Paragraph>

      <Disclaimer className={styles.disclaimer}>
        Цены в прайсе ориентировочные и не являются публичной офертой.
        Итоговая стоимость определяется индивидуально после оценки объекта и может отличаться
        от цен в прайсе в зависимости от сложности, объёма и особенностей работ.
        Чтобы получить точный расчёт и оформить заказ, позвоните нам по телефону{' '}
        <a href="tel:+79139551249">8 (913) 955-12-49</a>.
      </Disclaimer>

      <div className={styles.layout}>
        <div>
          {prices.map((category, index) => (
            <section
              key={category.slug}
              id={category.slug}
              data-section-index={index}
              className={styles.section}
            >
              <Typography.Heading
                className={styles.category}
                level={2}
              >
                <span className={styles.categoryNum}>{index + 1}.</span>
                {' '}
                {category.name}
              </Typography.Heading>

              <table className={styles.table}>
                <tbody>
                  {category.items.map((item) => (
                    <tr key={item.name}>
                      <td className={styles.name}>
                        {item.name}
                      </td>

                      <td className={styles.price}>
                        {item.price.toLocaleString('ru-RU')} ₽
                      </td>

                      <td className={styles.dim}>
                        {item.dim}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          ))}
        </div>

        <nav className={styles.nav}>
          {prices.map((category, index) => (
            <a
              key={category.slug}
              className={activeIndex === index ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              href={`#${category.slug}`}
            >
              <span className={styles.navNum}>{index + 1}.</span>
              {' '}
              {category.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Price;
