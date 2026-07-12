'use client';

import { I18nProvider } from 'react-aria-components';

interface LocaleProviderProps {
  children: React.ReactNode;
}

const LocaleProvider = ({ children }: LocaleProviderProps) => (
  <I18nProvider locale="ru-RU">
    {children}
  </I18nProvider>
);

export default LocaleProvider;
