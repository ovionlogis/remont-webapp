import Link from 'next/link';

import Logo from '@/components/Logo';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href="/">
        <Logo />
      </Link>
    </div>

    <div className={styles.contacts}>
      <div className={styles.phone}>
        <a href="tel:+79139551249">8 (913) 955-12-49</a>
        <br />
        <a href="tel:+79513719411">8 (951) 371-94-11</a>
      </div>
    </div>
  </header>
);

export default Header;
