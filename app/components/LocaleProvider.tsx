"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getCookie, setCookie } from "cookies-next";

import { i18n, type Locale } from "../i18n/i18n";

import tr from "../../translations/tr.json";
import en from "../../translations/en.json";

const LOCALE_COOKIE = "NEXT_LOCALE";

const messages: Record<Locale, Record<string, unknown>> = { tr, en };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocaleContext() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocaleContext must be used within LocaleProvider");
  return ctx;
}

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
};

export function LocaleProvider({ children, defaultLocale = i18n.defaultLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getCookie(LOCALE_COOKIE) as Locale | undefined;
    if (stored === "tr" || stored === "en") {
      setLocaleState(stored);
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    setCookie(LOCALE_COOKIE, next, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "tr" ? "tr-TR" : "en-US";
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = locale === "tr" ? "tr-TR" : "en-US";
  }, [locale, mounted]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Europe/Istanbul">
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}
