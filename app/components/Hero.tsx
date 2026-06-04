"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#e8e8e8] mb-3 leading-[1.1]"
          style={{ fontFeatureSettings: '"cv02", "cv03", "cv04"' }}
        >
          {t("headline")}
          <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] via-[#a855f7] to-[var(--accent-cyan)]">
            {t("tagline")}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed mb-10"
        >
          {t("subhead")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-4"
        >
          <Button
            size="lg"
            className="rounded-xl px-8 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:bg-[#00b8d4] hover:opacity-95 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] shadow-lg shadow-[var(--accent-cyan)]/20 transition-all"
            asChild
          >
            <Link href="#ecosystem" className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden />
              {t("ctaPrimary")}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      {/* Subtle spotlight – no heavy animation */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-30"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent-cyan-muted),transparent_70%)]" />
      </div>
    </div>
  );
}
