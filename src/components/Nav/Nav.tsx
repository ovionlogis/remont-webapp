'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Nav.module.scss';

const links = [
  { href: '/', label: 'Главная' },
  { href: '/work', label: 'Отделка' },
  { href: '/portfolio', label: 'Портфолио' },
  { href: '/price', label: 'Прайс' }
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {links.map(({ href, label }) => (
          <li
            key={href}
            className={pathname === href ? styles.active : undefined}
          >
            <Link href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
