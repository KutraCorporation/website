"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Shield, Sparkles, Network, Code2, Cpu, Database, ChevronRight, Milestone } from "lucide-react";

export default function OverviewContent() {
    const t = useTranslations("overviewPage");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-black" />;
    }

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
            {/* Background ambient lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] -z-10 pointer-events-none opacity-25" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent-purple-muted),transparent_60%)]" />
            </div>

            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 container mx-auto max-w-5xl px-6 relative z-10">
                
                {/* Header */}
                <div className="space-y-4 text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#b5b5b5] mb-2"
                    >
                        <Milestone className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                        <span>KUTRA ECOSYSTEM</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#e8e8e8] leading-[1.1]"
                    >
                        {t("title")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-20"
                >
                    {/* Mission Section */}
                    <motion.div
                        variants={itemVariants}
                        className="relative p-8 md:p-12 rounded-3xl bg-white/[0.01] border border-white/10 overflow-hidden hover:bg-white/[0.02] transition-all duration-500 group"
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[var(--accent-cyan)]/5 to-transparent blur-3xl rounded-full pointer-events-none group-hover:opacity-150 transition-opacity duration-500" />
                        <div className="relative z-10 space-y-4 max-w-3xl">
                            <h2 className="text-xs uppercase tracking-widest font-black text-[var(--accent-cyan)]">{t("mission.title")}</h2>
                            <p className="text-xl sm:text-2xl font-light text-[#e8e8e8] leading-relaxed">
                                {t("mission.text")}
                            </p>
                        </div>
                    </motion.div>

                    {/* Pillars Section */}
                    <div className="space-y-8">
                        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-[#e8e8e8] text-center">{t("pillars.title")}</motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { icon: Shield, color: "text-[var(--accent-cyan)]", bg: "bg-cyan-500/5 border-cyan-500/10", key: "security" },
                                { icon: Sparkles, color: "text-[#a855f7]", bg: "bg-purple-500/5 border-purple-500/10", key: "ux" },
                                { icon: Network, color: "text-emerald-400", bg: "bg-emerald-500/5 border-emerald-500/10", key: "decentralization" }
                            ].map((pillar, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                                >
                                    <div className={`p-3 rounded-xl ${pillar.bg} border w-fit ${pillar.color} mb-6`}>
                                        <pillar.icon className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-bold text-[#e8e8e8]">{t(`pillars.${pillar.key}.title`)}</h3>
                                        <p className="text-sm text-[#b5b5b5] font-light leading-relaxed">{t(`pillars.${pillar.key}.desc`)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Architecture & Tech Stack */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white/[0.01] border border-white/10 p-8 sm:p-12 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-transparent blur-3xl rounded-full pointer-events-none" />
                        
                        <div className="lg:col-span-5 space-y-4 relative z-10">
                            <h2 className="text-2xl font-bold text-[#e8e8e8]">{t("tech.title")}</h2>
                            <p className="text-sm text-[#b5b5b5] font-light leading-relaxed">
                                {t("tech.desc")}
                            </p>
                        </div>

                        <div className="lg:col-span-7 space-y-4 relative z-10">
                            {[
                                { icon: Code2, label: "Frontend Layer", key: "frontend" },
                                { icon: Cpu, label: "Backend & Edge", key: "backend" },
                                { icon: Database, label: "Decentralized Protocols", key: "web3" }
                            ].map((tech, idx) => (
                                <div key={idx} className="flex gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 items-center">
                                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#e8e8e8] shrink-0">
                                        <tech.icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-xs font-semibold text-[#b5b5b5] uppercase tracking-wider">{tech.label}</span>
                                        <p className="text-sm text-[#e8e8e8] font-medium leading-normal">{t(`tech.stack.${tech.key}`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Timeline Roadmap */}
                    <div className="space-y-12">
                        <motion.h2 variants={itemVariants} className="text-2xl font-bold text-[#e8e8e8] text-center">{t("roadmap.title")}</motion.h2>
                        
                        <div className="relative border-l border-white/10 ml-4 md:ml-32 space-y-12 pb-8">
                            {[
                                { phase: "Phase 1", color: "from-[var(--accent-cyan)] to-cyan-500 shadow-cyan-500/50", key: "p1" },
                                { phase: "Phase 2", color: "from-[#a855f7] to-purple-600 shadow-purple-500/50", key: "p2" },
                                { phase: "Phase 3", color: "from-emerald-400 to-emerald-500 shadow-emerald-400/50", key: "p3" }
                            ].map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    variants={itemVariants}
                                    className="relative pl-8 md:pl-12 group"
                                >
                                    {/* Timeline dot */}
                                    <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center">
                                        <div className={`w-2 h-2 rounded-full bg-linear-to-r ${step.color} shadow-lg`} />
                                    </div>

                                    {/* Phase identifier left-floating on md+ */}
                                    <div className="md:absolute md:-left-32 md:top-1.5 md:w-24 text-left md:text-right font-black text-[#b5b5b5] text-sm uppercase tracking-wider md:pl-0 pl-1 mb-2 md:mb-0">
                                        {step.phase}
                                    </div>

                                    {/* Content Card */}
                                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 group-hover:bg-white/[0.03] transition-all duration-300 space-y-2">
                                        <h3 className="text-lg font-bold text-[#e8e8e8] group-hover:text-white transition-colors flex items-center gap-2">
                                            {t(`roadmap.${step.key}.title`)}
                                            <ChevronRight className="w-4 h-4 text-[#525252] group-hover:text-[var(--accent-cyan)] group-hover:translate-x-0.5 transition-all" />
                                        </h3>
                                        <p className="text-sm text-[#b5b5b5] font-light leading-relaxed">
                                            {t(`roadmap.${step.key}.desc`)}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </motion.div>
            </section>
        </div>
    );
}
