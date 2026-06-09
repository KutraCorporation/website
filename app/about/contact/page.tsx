"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { socialAccountUrl } from "@/lib/utils";

export default function Contact() {
    const t = useTranslations("contactPage");
    const [mounted, setMounted] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-black" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) {
            setStatus("error");
            return;
        }

        setStatus("sending");
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setStatus("success");
            setFormState({ name: "", email: "", subject: "", message: "" });
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
            {/* Background ambient lighting */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[100%] -z-10 pointer-events-none opacity-20" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,var(--accent-cyan-muted),transparent_60%)]" />
            </div>

            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 container mx-auto max-w-6xl px-6 relative z-10">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl sm:text-5xl font-black tracking-tight text-[#e8e8e8] leading-[1.1]"
                    >
                        {t("title")}
                        <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] to-[#a855f7]">
                            Kutra Support
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-6 sm:p-8 hover:bg-white/[0.03] transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/0 to-[#a855f7]/[0.01] pointer-events-none" />
                        
                        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-[#e8e8e8]">
                                        {t("form.name")} <span className="text-[var(--accent-cyan)]">*</span>
                                    </label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        placeholder={t("form.placeholderName")}
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        className="h-11 dark:bg-white/[0.02] border-white/10 text-[#e8e8e8] placeholder:text-[#525252]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-[#e8e8e8]">
                                        {t("form.email")} <span className="text-[var(--accent-cyan)]">*</span>
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        placeholder={t("form.placeholderEmail")}
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="h-11 dark:bg-white/[0.02] border-white/10 text-[#e8e8e8] placeholder:text-[#525252]"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-[#e8e8e8]">
                                    {t("form.subject")}
                                </label>
                                <Input
                                    id="subject"
                                    type="text"
                                    placeholder={t("form.placeholderSubject")}
                                    value={formState.subject}
                                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                    className="h-11 dark:bg-white/[0.02] border-white/10 text-[#e8e8e8] placeholder:text-[#525252]"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-[#e8e8e8]">
                                    {t("form.message")} <span className="text-[var(--accent-cyan)]">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={5}
                                    placeholder={t("form.placeholderMessage")}
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    className="w-full placeholder:text-[#525252] selection:bg-primary selection:text-primary-foreground dark:bg-white/[0.02] border-white/10 min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full h-12 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:opacity-90 shadow-lg shadow-[var(--accent-cyan)]/25 transition-all flex items-center justify-center gap-2"
                            >
                                {status === "sending" ? (
                                    <span>{t("form.sending")}</span>
                                ) : (
                                    <>
                                        <span>{t("form.send")}</span>
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>

                            <AnimatePresence>
                                {status === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
                                    >
                                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                                        <span>{t("form.success")}</span>
                                    </motion.div>
                                )}
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium"
                                    >
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <span>{t("form.error")}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Information Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="lg:col-span-5 space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#e8e8e8]">{t("info.title")}</h2>
                            <p className="text-sm text-[#b5b5b5] font-light leading-relaxed">{t("info.subtitle")}</p>
                        </div>

                        <div className="space-y-6">
                            {/* Email Card */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[var(--accent-cyan)] shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-[#b5b5b5]">{t("info.email.title")}</h3>
                                    <a href={`mailto:${t("info.email.value")}`} className="text-base font-semibold text-[#e8e8e8] hover:text-[var(--accent-cyan)] transition-colors">
                                        {t("info.email.value")}
                                    </a>
                                </div>
                            </div>

                            {/* Hours Card */}
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
                                <div className="p-3 rounded-xl bg-zinc-500/10 border border-white/10 text-white shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-bold text-[#b5b5b5]">{t("info.hours.title")}</h3>
                                    <p className="text-base font-semibold text-[#e8e8e8]">{t("info.hours.value")}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 space-y-4">
                                <h3 className="text-sm font-bold text-[#b5b5b5]">Follow Kutra</h3>
                                <div className="flex items-center gap-3">
                                    {[
                                        {
                                            _type: "github",
                                            url: "KutraCorporation"
                                        }
                                    ].map((socialAccount, idx) => {
                                        const output = socialAccountUrl(socialAccount._type, socialAccount.url, "Kutra Corporation", "w-5 h-5");
                                        return (
                                            <a
                                                key={idx}
                                                href={output?.url}
                                                title={output.label}
                                                aria-label={output.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-[var(--accent-cyan)]/30 hover:bg-white/10 transition-all"
                                            >
                                                {output?.icon}
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}