'use client';

import { useCallback, useState } from 'react';
import { Drawer, Separator } from '@heroui/react';
import {
  Calculator, Hammer, Image, Menu, Tag
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Logo from '@/components/Logo';
import { phones } from '@/content/contacts';

import styles from './Nav.module.scss';

const links = [
  { href: '/work', label: 'Отделка', icon: Hammer },
  { href: '/portfolio', label: 'Портфолио', icon: Image },
  { href: '/price', label: 'Прайс', icon: Tag },
  { href: '/calculators', label: 'Калькуляторы', icon: Calculator }
];

const Nav = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

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

      <button
        aria-label="Меню"
        className={styles.trigger}
        type="button"
        onClick={openMenu}
      >
        <Menu size={22} />
      </button>

      <Drawer.Backdrop
        isOpen={isOpen}
        onOpenChange={setIsOpen}
      >
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading>
                <Link
                  className={styles.drawerLogo}
                  href="/"
                  onClick={closeMenu}
                >
                  <Logo className={styles.drawerLogoImage} />

                  <span className={styles.drawerBrandName}>Ремонт и отделка</span>
                </Link>
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <ul className={styles.drawerList}>
                {links.map(({
                  href, label, icon: Icon
                }) => (
                  <li
                    key={href}
                    className={pathname === href ? styles.active : undefined}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                    >
                      <Icon size={18} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Separator className={styles.drawerSeparator} />

              <div className={styles.drawerPhones}>
                <a href={phones.primary.href}>{phones.primary.label}</a>
                <a href={phones.secondary.href}>{phones.secondary.label}</a>
              </div>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </nav>
  );
};

export default Nav;
