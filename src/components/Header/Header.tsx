import { Phone } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/Logo';
import Nav from '@/components/Nav';
import { phones } from '@/content/contacts';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.top}>
      <div className={styles.logo}>
        <Link href="/">
          <Logo className={styles.logoImage} />

          <span className={styles.brandName}>
            Ремонт и отделка
          </span>
        </Link>
      </div>

      <Nav />

      <div className={styles.contacts}>
        <Phone
          className={styles.phoneIcon}
          size={20}
        />

        <div className={styles.phone}>
          <a href={phones.primary.href}>
            {phones.primary.label}
          </a>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
