import Link from 'next/link';

import styles from './Footer.module.scss';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/work', label: 'Виды работ' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/price', label: 'Прайс-лист' }
];

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <div>Ремонт и отделка квартир, офисных помещений в Бердске, Академгородке, Советском районе.</div>

      <p>Более 20 лет опыта в ремонтно-отделочных работах. Профессиональное выполнение, контроль качества на каждом этапе.</p>

      <nav>
        <ul className={styles.links}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    <hr className={styles.hr} />

    <div className={styles.copyright}>
      Бердск {new Date().getFullYear()}.
    </div>
  </footer>
);

export default Footer;
