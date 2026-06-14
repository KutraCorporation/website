import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const i18n = {
  locales: ["tr", "en"],
  defaultLocale: "tr",
} as const;

export type Locale = (typeof i18n)["locales"][number];

export const routing = defineRouting({
  locales: i18n.locales as unknown as string[],
  defaultLocale: i18n.defaultLocale,
  localePrefix: 'always' 
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);