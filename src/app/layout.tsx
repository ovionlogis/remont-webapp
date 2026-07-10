import type { Metadata } from 'next';
import { Arvo, Lato } from 'next/font/google';

// eslint-disable-next-line import-x/order
import '@/styles/globals.css';

import BodyScripts from '@/components/BodyScripts';
import Layout from '@/components/Layout';
import config from '@/config';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/utils/metadata';

const arvo = Arvo({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-arvo',
  display: 'swap'
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? config.APP_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Ремонт и отделка'
  },
  description: DEFAULT_DESCRIPTION
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    className={`${arvo.variable} ${lato.variable}`}
    lang="ru"
  >
    <body>
      <Layout>
        {children}
      </Layout>

      <BodyScripts />
    </body>
  </html>
);

export default RootLayout;
