"use client";

import Img from "./Img";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, memo } from "react";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useLocaleContext } from "./LocaleProvider";
import { i18n } from "../i18n/i18n";
import { usePathname, useRouter } from "../i18n/i18n";
import type { Locale } from "../i18n/i18n";

export default memo(function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const t = useTranslations('header');
  const { locale } = useLocaleContext();

  const pathname = usePathname();
  const router = useRouter();
  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
        : "py-4 bg-transparent"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="flex gap-2.5 items-center group" aria-label="Kutra Home page" translate="no">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
            <Img src="/img/logo.png" altText="Kutra Corporation Logo" imgClass="w-full h-full object-cover" priority={true} />
          </div>
          <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white">Kutra</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-8">
          <Link href="/projects" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-colors">{t('products')}</Link>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="inline-flex items-center gap-2 text-sm font-medium px-2 py-1 rounded bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span>{locale.toUpperCase()}</span>
              <span aria-hidden>▾</span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-30 rounded-md bg-white dark:bg-slate-900 shadow-lg p-1 mt-2" align="end">
                {i18n.locales.map((l) => (
                  <DropdownMenu.Item
                    key={l}
                    onSelect={() => handleLocaleChange(l as Locale)}
                    className={`px-3 py-2 text-sm rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${locale === l ? 'font-semibold' : ''}`}
                  >
                    {l.toUpperCase()}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </nav>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            ref={buttonRef}
            onClick={() => setOpen((v) => !v)}
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-full p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu (collapsible) */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed inset-0 top-18.25 bg-white dark:bg-slate-900 z-40 transition-all duration-300 ease-in-out size-full ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="flex flex-col gap-6 p-8 h-full">
          <Link onClick={() => setOpen(false)} href="/projects" className="text-2xl font-bold">{t('products')}</Link>
          <div className="mt-auto">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex items-center gap-2 text-lg font-medium px-3 py-2 rounded bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <span>{locale.toUpperCase()}</span>
                <span aria-hidden>▾</span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="min-w-35 rounded-md bg-white dark:bg-slate-900 shadow-lg p-1 mt-2">
                  {i18n.locales.map((l) => (
                    <DropdownMenu.Item
                      key={l}
                      onSelect={() => { handleLocaleChange(l as Locale); setOpen(false); }}
                      className={`block px-3 py-2 text-lg rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 ${locale === l ? 'font-semibold' : ''}`}
                    >
                      {l.toUpperCase()}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>
    </header>
  );
});

