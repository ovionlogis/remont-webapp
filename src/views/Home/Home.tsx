import Image from 'next/image';
import Link from 'next/link';

import promoImg from './promo.jpg';

import styles from './Home.module.scss';

const Home = () => (
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

    <h1 className={styles.title}>
      Ремонт и отделка квартир
    </h1>

    <span className={styles.excerpt}>
      Предоставляем широкий спектр ремонтных и отделочных работ под ключ, от простой отделки до класса люкс, в Бердске и Академгородке. Работаем с физическими и юридическими лицами, более 20 лет опыта в ремонтно-отделочных работах.
    </span>

    <div className={styles.actions}>
      <Link
        className={styles.actionButton}
        href="/work"
      >
        Узнать больше
      </Link>

      <Link
        className={styles.actionButton}
        href="/portfolio"
      >
        Наши работы
      </Link>
    </div>
  </div>
);

export default Home;
