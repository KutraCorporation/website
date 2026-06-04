"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/utils";
import { Book, ArrowRight, UsersRound } from "lucide-react";

export default function About() {
    const t = useTranslations("about");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-black" />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden">
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden hero-mesh">
                <div className="container mx-auto max-w-6xl px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 space-y-6"
                        >
                            <motion.h1 
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.7 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#e8e8e8] leading-[1.1]"
                            >
                                {t("headline")}
                                <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] via-[#a855f7] to-(--accent-cyan)">
                                    {t("highlight")}
                                </span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.6 }}
                                className="text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed max-w-xl"
                            >
                                {t("subhead")}
                            </motion.p>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex flex-wrap items-center gap-4 pt-2"
                            >
                                <Link 
                                    href="/products" 
                                    className="inline-flex items-center gap-2 rounded-xl px-6 sm:px-8 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:opacity-90 shadow-lg shadow-[var(--accent-cyan)]/25 transition-all"
                                >
                                    {t("ctaExplore")}
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Footer Cards */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 md:mt-28"
                    >
                        {[
                            { title: t('cards.overview.title'), href: baseUrl + "about/overview", icon: Book, desc: t('cards.overview.desc') },
                            { title: t('cards.team.title'), href: baseUrl + "about/team", icon: UsersRound, desc: t('cards.team.desc') },
                        ].map((item, i) => (
                            <a 
                                key={i} 
                                href={item.href}
                                className="group relative flex flex-col justify-between overflow-hidden bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/5 hover:border-purple-500/30 transition-all duration-300 text-left min-h-[160px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/0 to-[#a855f7]/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative z-10 space-y-4">
                                    <item.icon className="w-8 h-8 text-[#b5b5b5] group-hover:text-[var(--accent-cyan)] transition-colors" />
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-bold text-[#e8e8e8] group-hover:text-white transition-colors">{item.title}</h3>
                                        <p className="text-xs text-[#b5b5b5] font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Background ambient lighting */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 pointer-events-none opacity-30" aria-hidden>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,var(--accent-cyan-muted),transparent_70%)]" />
                </div>
            </section>
        </div>
    );
}