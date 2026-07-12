import { Typography } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

import ButtonLink from '@/components/ButtonLink';
import CalculatorCard from '@/components/CalculatorCard';
import { calculatorTools } from '@/content/calculators/data';
import { advantages } from '@/content/home/data';
import { data as portfolioImages } from '@/content/portfolio/data';
import { data as workServices } from '@/content/works/data';

import promoImg from './promo.png';

import styles from './Home.module.scss';

const previewImages = portfolioImages.slice(0, 6);

const previewTools = ['tile', 'putty-consumption', 'floor-screed']
  .map((slug) => calculatorTools.find((tool) => tool.slug === slug))
  .filter((tool): tool is (typeof calculatorTools)[number] => Boolean(tool));

const Home = () => (
  <div className={styles.content}>
    <div className={styles.feature}>
      <div className={styles.thumb}>
        <Image
          src={promoImg}
          alt="Ремонт и отделка квартир под ключ в Бердске"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      <Typography.Heading
        className={styles.title}
        level={1}
      >
        Ремонт и отделка квартир
      </Typography.Heading>

      <Typography.Paragraph className={styles.excerpt}>
        Предоставляем широкий спектр ремонтных и отделочных работ под ключ, от простой отделки до класса люкс, в Бердске и Академгородке. Работаем с физическими и юридическими лицами, более 20 лет опыта в ремонтно-отделочных работах.
      </Typography.Paragraph>

      <div className={styles.actions}>
        <ButtonLink
          href="/work"
          size="lg"
        >
          Узнать больше
        </ButtonLink>

        <ButtonLink
          href="/portfolio"
          size="lg"
          variant="secondary"
        >
          Наши работы
        </ButtonLink>
      </div>
    </div>

    <section className={styles.section}>
      <ul className={styles.advantages}>
        {advantages.map((advantage) => (
          <li
            key={advantage.title}
            className={styles.advantage}
          >
            <advantage.icon
              aria-hidden
              className={styles.advantageIcon}
            />

            <Typography.Heading
              className={styles.advantageTitle}
              level={3}
            >
              {advantage.title}
            </Typography.Heading>

            <Typography.Paragraph className={styles.advantageText}>
              {advantage.text}
            </Typography.Paragraph>
          </li>
        ))}
      </ul>
    </section>

    <section className={styles.section}>
      <Typography.Heading
        className={styles.sectionTitle}
        level={2}
      >
        Виды работ
      </Typography.Heading>

      <ul className={styles.services}>
        {workServices.map((service) => (
          <li key={service.title}>
            <Link
              className={styles.serviceLink}
              href="/work"
            >
              <service.icon
                aria-hidden
                className={styles.serviceIcon}
              />

              {service.title}
            </Link>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/work"
        size="lg"
        variant="secondary"
      >
        Все виды работ
      </ButtonLink>
    </section>

    <section className={styles.section}>
      <Typography.Heading
        className={styles.sectionTitle}
        level={2}
      >
        Портфолио выполненных работ
      </Typography.Heading>

      <ul className={styles.gallery}>
        {previewImages.map((image) => (
          <li key={image.src}>
            <Link
              aria-label={image.caption}
              className={styles.galleryItem}
              href="/portfolio"
            >
              <Image
                alt={image.alt}
                height={image.height}
                src={image.src}
                width={image.width}
              />
            </Link>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/portfolio"
        size="lg"
        variant="secondary"
      >
        Все работы
      </ButtonLink>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <Typography.Heading
          className={styles.sectionTitle}
          level={2}
        >
          Калькуляторы материалов
        </Typography.Heading>

        <Typography.Paragraph className={styles.sectionIntro}>
          Прикиньте расход плитки, шпаклёвки или смеси для стяжки заранее, до похода в магазин.
        </Typography.Paragraph>
      </div>

      <ul className={styles.cards}>
        {previewTools.map((tool) => (
          <li key={tool.slug}>
            <CalculatorCard tool={tool} />
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/calculators"
        size="lg"
        variant="secondary"
      >
        Все калькуляторы
      </ButtonLink>
    </section>

    <section className={styles.cta}>
      <Typography.Heading
        className={styles.ctaTitle}
        level={2}
      >
        Готовы обсудить ремонт?
      </Typography.Heading>

      <Typography.Paragraph className={styles.ctaText}>
        Позвоните нам, чтобы договориться о замере и обсудить стоимость работ.
      </Typography.Paragraph>

      <div className={styles.ctaPhones}>
        <a href="tel:+79139551249">8 (913) 955-12-49</a>
        <a href="tel:+79513719411">8 (951) 371-94-11</a>
      </div>
    </section>
  </div>
);

export default Home;
