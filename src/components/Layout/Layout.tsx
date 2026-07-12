import Footer from '@/components/Footer';
import Header from '@/components/Header';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.root}>
    <Header />

    <main className={styles.main}>
      {children}
    </main>

    <Footer />
  </div>
);

export default Layout;
