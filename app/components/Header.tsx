"use client";

import Img from "./Img";
import Link from "next/link";
import { Menu, X, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, memo } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocaleContext } from "./LocaleProvider";
import { i18n } from "../i18n/i18n";
import { usePathname, useRouter } from "../i18n/i18n";
import type { Locale } from "../i18n/i18n";

const localeLabels: Record<string, string> = { tr: "Türkçe", en: "English" };

export default memo(function Header() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const t = useTranslations("header");
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
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.inset = "0";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
      setLangOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.inset = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-18 px-5 md:px-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex gap-2.5 items-center group shrink-0"
            aria-label="Kutra Home page"
            translate="no"
          >
            <div className="relative w-9 h-9 md:w-10 md:h-10 overflow-hidden rounded-xl border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Img
                src="/img/logo.png"
                altText="Kutra Corporation Logo"
                imgClass="w-full h-full object-cover"
                priority={true}
              />
            </div>
            <span className="font-black text-xl md:text-2xl tracking-tighter text-white">
              Kutra
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="flex items-center gap-2 mr-14 md:mr-0"
          >
            <Link
              href="/projects"
              className="hidden md:inline-flex text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.06] transition-all duration-200"
            >
              {t("products")}
            </Link>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all duration-200 outline-none data-[state=open]:bg-white/[0.06]">
                <Globe className="w-4 h-4 opacity-60" />
                <span>{localeLabels[locale] ?? locale.toUpperCase()}</span>
                <span
                  aria-hidden
                  className="text-[10px] opacity-40 transition-transform duration-200 data-[state=open]:rotate-180"
                >
                  ▾
                </span>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="min-w-[80px] rounded-xl bg-[#171717] border border-white/[0.08] shadow-2xl p-2 mt-2 data-[side=bottom]:animate-in data-[side=bottom]:fade-in-0 data-[side=bottom]:zoom-in-95"
                  align="end"
                  sideOffset={8}
                >
                  {i18n.locales.map((l) => (
                    <DropdownMenu.Item
                      key={l}
                      onSelect={() => handleLocaleChange(l as Locale)}
                      className={`mt-1 px-3 py-2.5 text-sm rounded-lg cursor-pointer outline-none transition-colors ${
                        locale === l
                          ? "bg-white/[0.08] text-white font-semibold"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                      }`}
                    >
                      {localeLabels[l] ?? l.toUpperCase()}
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </nav>
        </div>
      </header>

      {/* Mobile toggle — outside header to stay above z-[100] menu */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className={`md:hidden fixed top-3 right-5 z-110 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl text-white transition-colors duration-200 ${
          open ? "bg-white/[0.08]" : "hover:bg-white/[0.08]"
        }`}
      >
        <span className="relative w-6 h-6">
          <Menu
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              open
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
              open
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </span>
      </button>

      {/* Mobile menu — outside header to escape z-50 stacking context */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden fixed inset-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-2xl transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6 pb-8">
          <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
            <Link
              onClick={() => setOpen(false)}
              href="/projects"
              className="text-2xl font-bold text-white py-4 px-3 rounded-xl hover:bg-white/[0.06] transition-colors"
            >
              {t("products")}
            </Link>
          </nav>

          {/* Language selector */}
          <div className="mt-auto pt-6 border-t border-white/[0.06]">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-left hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-medium text-white">{localeLabels[locale] ?? locale.toUpperCase()}</span>
              </div>
              <span
                aria-hidden
                className={`text-slate-500 text-xs transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
              >
                ▾
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                langOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex gap-3 px-3 pt-3 pb-1">
                {i18n.locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      handleLocaleChange(l as Locale);
                      setOpen(false);
                    }}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                      locale === l
                        ? "bg-white text-[#0a0a0a]"
                        : "bg-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.1]"
                    }`}
                  >
                    {localeLabels[l] ?? l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
