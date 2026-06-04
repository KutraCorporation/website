import { getRequestConfig } from 'next-intl/server';
import { i18n, type Locale } from './i18n';

export default getRequestConfig(async ({ requestLocale }) => {
    const requestedLocale = await requestLocale;
    
    const locale = requestedLocale && i18n.locales.includes(requestedLocale as Locale)
        ? requestedLocale
        : i18n.defaultLocale;

    return {
        locale,
        messages: (await import(`../translations/${locale}.json`)).default
    };
});
