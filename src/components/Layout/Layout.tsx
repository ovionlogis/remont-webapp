import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Nav from '@/components/Nav';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.root}>
    <Header />
    <Nav />
    <main className={styles.main}>
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;
