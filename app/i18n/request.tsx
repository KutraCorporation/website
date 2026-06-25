import { getRequestConfig } from 'next-intl/server';
import { i18n, type Locale } from './i18n';

const messages = {
  tr: () => import('../../translations/tr.json'),
  en: () => import('../../translations/en.json')
};

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !i18n.locales.includes(locale as Locale)) {
    locale = i18n.defaultLocale;
  }

  return {
    locale,
    messages: (await messages[locale as Locale]()).default
  };
});