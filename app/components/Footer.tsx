"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Icons } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer
      className="bg-zinc-950 border-t border-white/6 pt-16 pb-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 mb-14">
          <div className="lg:col-span-2">
            <Link
              href="/"
              translate="no"
              aria-label={"Kutra Home page"}
              className="inline-flex gap-2.5 items-center mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              <span className="font-black text-2xl tracking-tighter text-[#e8e8e8]">Kutra</span>
            </Link>
            <p className="text-[#b8b8b8] text-sm leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
            <nav className="flex gap-3 mt-6" aria-label={t("socialAria")}>
              <Link
                href="https://github.com/KutraCorporation"
                aria-label={t("projbrandOn", { platform: "GitHub" })}
                title={t('projbrandOn', { platform: 'GitHub' })}
                rel="me noopener noreferrer"
                target="_blank"
                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-[var(--accent-cyan)]/30 transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <Icons.Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/kutra"
                aria-label={t("projbrandOn", { platform: "LinkedIn" })}
                title={t('projbrandOn', { platform: 'LinkedIn' })}
                rel="me noopener noreferrer"
                target="_blank"
                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-[var(--accent-cyan)]/30 transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <Icons.Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://x.com/kutra"
                aria-label={t("projbrandOn", { platform: "X (Twitter)" })}
                title={t('projbrandOn', { platform: 'X (Twitter)' })}
                rel="me noopener noreferrer"
                target="_blank"
                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-[var(--accent-cyan)]/30 transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <Icons.Twitter className="w-5 h-5" />
              </Link>
              <Link
                href={`https://youtube.com/@KutraCorporation${locale === "en" ? "" : locale.toUpperCase()}`}
                aria-label={t("projbrandOn", { platform: "YouTube" })}
                title={t('projbrandOn', { platform: 'YouTube' })}
                rel="me noopener noreferrer"
                target="_blank"
                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-[var(--accent-cyan)]/30 transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <Icons.Youtube className="w-5 h-5" />
              </Link>
            </nav>
          </div>
          <div className="lg:col-span-2">
            <a href="/about" className="text-[#b8b8b8] hover:text-owt1 text-sm leading-relaxed max-w-sm uppercase">{t('corporate')}</a>
            <nav className="flex flex-col mt-6 gap-3">
              <Link href="/about/overview">{t('overview')}</Link>
              <Link href="/about/team">{t('team')}</Link>
              <Link href="/about/contact">{t('contact')}</Link>
            </nav>
          </div>
        </div>
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#737373]">
          <p translate="no">{new Date().getFullYear() + ' © ' + t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

