"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Button } from "./ui/button";
import { Globe2, Hammer, BookOpen, Users } from "lucide-react";
import { getLangBaseUrl, cn } from "@/lib/utils";
import { useLocaleContext } from "@/components/LocaleProvider";

const cards = [
  { key: "global", Icon: Globe2 },
  { key: "build", Icon: Hammer },
  { key: "opensource", Icon: BookOpen },
] as const;

export default function CommunitySection() {
  const { locale } = useLocaleContext();
  const t = useTranslations("community");
  const langBaseUrl = getLangBaseUrl(locale);

  return (
    <section
      id="community"
      className="py-24 md:py-32 bg-[#0a0a0a]"
      aria-labelledby="community-heading"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2
            id="community-heading"
            className="text-3xl md:text-4xl font-black text-[#e8e8e8] mb-3 tracking-tight"
          >
            {t("title")}
          </h2>
          <div
            className="w-16 h-0.5 bg-[var(--accent-cyan)]/60 mx-auto mb-6"
            aria-hidden
          />
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
          {cards.map(({ key, Icon }, i) => (
            <motion.article
              key={key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={cn(
                "group flex flex-col items-center text-center rounded-2xl p-8",
                "border border-white/8 bg-[#111]",
                "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_24px_-8px_rgba(0,0,0,0.4)]",
                "hover:border-(--accent-cyan)/25 hover:shadow-[0_0_30px_-8px_var(--accent-cyan-muted)]",
                "transition-all duration-300 ease-out"
              )}
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--accent-cyan)]/30 transition-colors mb-5">
                <Icon className="w-7 h-7 text-[var(--accent-cyan)]" aria-hidden />
              </div>
              <h3 className="text-lg font-bold text-[#e8e8e8] tracking-tight mb-2">
                {t(`cards.${key}.title`)}
              </h3>
              <p className="text-[#b8b8b8] text-sm leading-relaxed font-medium">
                {t(`cards.${key}.desc`)}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-xl px-8 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:bg-[#00b8d4] hover:opacity-95 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] shadow-lg shadow-[var(--accent-cyan)]/20 transition-all"
            asChild
          >
            <Link
              href={`${langBaseUrl}/about/team`}
              className="inline-flex items-center gap-2"
            >
              <Users className="w-4 h-4" aria-hidden />
              {t("cta")}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
