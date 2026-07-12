import { cn } from '@heroui/styles';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

// eslint-disable-next-line import-x/order
import '../styles/globals.css';

import BodyScripts from '@/components/BodyScripts';
import Layout from '@/components/Layout';
import LocaleProvider from '@/components/LocaleProvider';
import config from '@/config';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from '@/utils/metadata';

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
  <html lang="ru">
    <body className={cn(lato.variable, 'text-foreground', 'bg-backgroun', 'light')}>
      <LocaleProvider>
        <Layout>
          {children}
        </Layout>
      </LocaleProvider>

      <BodyScripts />
    </body>
  </html>
);

export default RootLayout;
