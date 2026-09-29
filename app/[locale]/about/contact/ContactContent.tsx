"use client";

import { useState, FormEvent, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useLocaleContext } from "@/components/LocaleProvider";
import {
    Mail,
    MessageSquare,
    ArrowRight,
    CheckCircle2,
    AlertCircle,
    Sparkles
} from "lucide-react";
import { Icons, getContactEmail } from "@/lib/utils";

export default function ContactContent() {
    const t = useTranslations("contactPage");
    const { locale } = useLocaleContext();
    const [status, setStatus] = useState<"idle" | "verifying" | "sending" | "success" | "error">("idle");
    const [emailError, setEmailError] = useState<string | null>(null);
    const [focused, setFocused] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEmailError(null);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const emailValue = formData.get("email") as string;

        setStatus("verifying");
        try {
            const verifyRes = await fetch("/api/verify-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: emailValue }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.valid) {
                setEmailError(verifyData.reason || "Geçersiz e-posta adresi");
                setStatus("idle");
                return;
            }
        } catch {
            setStatus("idle");
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.get("name"),
                    email: emailValue,
                    subject: formData.get("subject"),
                    message: formData.get("message"),
                }),
            });

            if (!res.ok) throw new Error("Failed");
            setStatus("success");
            form.reset();
        } catch {
            setStatus("error");
        }
    };

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
    };

    const email = getContactEmail();

    const infoItems = [
        { icon: Mail, key: "email" as const, color: "text-[var(--accent-cyan)]", bg: "bg-owt1/10 border-owt1/20", value: email }
    ];

    const socialLinks = [
        { icon: Icons.Github, label: "GitHub", href: "https://github.com/KutraCorporation" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
            {/* Hero mesh background */}
            <div className="hero-mesh absolute inset-0 -z-10" aria-hidden="true" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] -z-10 pointer-events-none opacity-30" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--accent-cyan-muted),transparent_70%)]" />
            </div>
            <div className="absolute bottom-0 right-0 w-[600px] h-[400px] -z-10 pointer-events-none opacity-20" aria-hidden="true">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,var(--accent-purple-muted),transparent_70%)]" />
            </div>

            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 container mx-auto max-w-6xl px-6 z-10">
                {/* Header */}
                <div className="max-w-3xl mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-[#b5b5b5] mb-6"
                    >
                        <MessageSquare className="w-3.5 h-3.5 text-[var(--accent-cyan)]" aria-hidden />
                        <span>{t("info.title").toUpperCase()}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#e8e8e8] leading-[1.08]"
                    >
                        {t("title")}
                        <span className="block mt-1 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-cyan)] via-[#a855f7] to-[var(--accent-cyan)]">
                            {t("subtitle").split(".")[0]}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-base sm:text-lg text-[#b5b5b5] font-medium leading-relaxed max-w-xl mt-6"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10"
                >
                    {/* Contact Form */}
                    <motion.div variants={itemVariants} className="lg:col-span-7">
                        <form
                            ref={formRef}
                            onSubmit={handleSubmit}
                            className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden group hover:border-white/15 transition-colors duration-500"
                        >
                            {/* Subtle glow on hover */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-cyan)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {[
                                        { name: "name", type: "text", placeholder: t("form.placeholderName"), icon: Sparkles },
                                        { name: "email", type: "email", placeholder: t("form.placeholderEmail"), icon: Mail },
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-2">
                                            <label
                                                htmlFor={field.name}
                                                className="text-xs font-semibold text-[#b5b5b5] uppercase tracking-wider flex items-center gap-1.5"
                                            >
                                                <field.icon className="w-3 h-3 text-[#525252]" aria-hidden />
                                                {t(`form.${field.name}`)}
                                            </label>
                                            <input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                required
                                                placeholder={field.placeholder}
                                                autoComplete={field.name === "email" ? "email" : "name"}
                                                aria-invalid={field.name === "email" && emailError ? true : undefined}
                                                aria-describedby={field.name === "email" && emailError ? "email-error" : undefined}
                                                onFocus={() => { setFocused(field.name); setEmailError(null); }}
                                                onBlur={() => setFocused(null)}
                                                className={`w-full h-12 px-4 rounded-xl bg-white/[0.03] border text-[#e8e8e8] placeholder:text-[#525252] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]/60 transition-all duration-300 text-sm ${
                                                    field.name === "email" && emailError
                                                        ? "border-red-500/50 shadow-[0_0_20px_-5px_rgba(239,68,68,0.15)]"
                                                        : focused === field.name
                                                            ? "border-[var(--accent-cyan)]/50 shadow-[0_0_20px_-5px_rgba(0,212,255,0.15)] bg-white/[0.04]"
                                                            : "border-white/10 hover:border-white/20"
                                                }`}
                                            />
                                            {field.name === "email" && emailError && (
                                                <p id="email-error" role="alert" className="text-xs text-red-400 font-medium mt-1">{emailError}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="subject"
                                        className="text-xs font-semibold text-[#b5b5b5] uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                                <MessageSquare className="w-3 h-3 text-[#525252]" aria-hidden />
                                                {t("form.subject")}
                                            </label>
                                            <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                autoComplete="off"
                                                placeholder={t("form.placeholderSubject")}
                                        onFocus={() => setFocused("subject")}
                                        onBlur={() => setFocused(null)}
                                        className={`w-full h-12 px-4 rounded-xl bg-white/[0.03] border text-[#e8e8e8] placeholder:text-[#525252] focus:outline-none transition-all duration-300 text-sm ${
                                            focused === "subject"
                                                ? "border-[var(--accent-cyan)]/50 shadow-[0_0_20px_-5px_rgba(0,212,255,0.15)] bg-white/[0.04]"
                                                : "border-white/10 hover:border-white/20"
                                        }`}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label
                                        htmlFor="message"
                                        className="text-xs font-semibold text-[#b5b5b5] uppercase tracking-wider flex items-center gap-1.5"
                                    >
                                                <Mail className="w-3 h-3 text-[#525252]" aria-hidden />
                                                {t("form.message")}
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                required
                                                rows={5}
                                                placeholder={t("form.placeholderMessage")}
                                        onFocus={() => setFocused("message")}
                                        onBlur={() => setFocused(null)}
                                        className={`w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-[#e8e8e8] placeholder:text-[#525252] focus:outline-none transition-all duration-300 text-sm resize-none min-h-[140px] ${
                                            focused === "message"
                                                ? "border-[var(--accent-cyan)]/50 shadow-[0_0_20px_-5px_rgba(0,212,255,0.15)] bg-white/[0.04]"
                                                : "border-white/10 hover:border-white/20"
                                        }`}
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div role="status" aria-live="polite" className="min-h-[1.25rem]">
                                        <AnimatePresence mode="wait">
                                            {status === "success" && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2 text-sm text-emerald-400 font-medium"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" aria-hidden />
                                                    {t("form.success")}
                                                </motion.div>
                                            )}
                                            {status === "error" && (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center gap-2 text-sm text-red-400 font-medium"
                                                >
                                                    <AlertCircle className="w-4 h-4" aria-hidden />
                                                    {t("form.error")}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === "sending" || status === "verifying"}
                                        aria-busy={status === "sending" || status === "verifying"}
                                        className="inline-flex items-center gap-2.5 rounded-xl px-7 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:brightness-110 hover:shadow-[0_0_30px_-5px_rgba(0,212,255,0.4)] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-sm group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                                    >
                                        {status === "verifying" ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                {locale === "tr" ? "Doğrulanıyor..." : "Verifying..."}
                                            </>
                                        ) : status === "sending" ? (
                                            <>
                                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                </svg>
                                                {t("form.sending")}
                                            </>
                                        ) : (
                                            <>
                                                {t("form.send")}
                                                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" aria-hidden />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>

                    {/* Contact Info Sidebar */}
                    <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
                        {/* Info Card */}
                        <div className="relative p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 overflow-hidden group hover:border-white/15 transition-colors duration-500">
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[var(--accent-purple)]/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="relative z-10 space-y-8">
                                <div className="space-y-3">
                                    <h2 className="text-xl font-bold text-[#e8e8e8]">{t("info.title")}</h2>
                                    <p className="text-sm text-[#b5b5b5] font-light leading-relaxed">{t("info.subtitle")}</p>
                                </div>

                                <div className="space-y-5">
                                    {infoItems.map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.4 + idx * 0.1, duration: 0.5 }}
                                            className="flex gap-4 items-start group/item"
                                        >
                                            <div className={`p-2.5 rounded-xl ${item.bg} border ${item.color} shrink-0 group-hover/item:scale-105 transition-transform duration-300`}>
                                                <item.icon className="w-5 h-5" aria-hidden />
                                            </div>
                                            <div className="space-y-0.5 pt-0.5">
                                                <span className="text-xs font-semibold text-[#b5b5b5] uppercase tracking-wider">
                                                    {t(`info.${item.key}.title`)}
                                                </span>
                                                <p className="text-sm text-[#e8e8e8] font-medium leading-relaxed">
                                                    <a
                                                        href={`mailto:${item.value}`}
                                                        className="hover:text-[var(--accent-cyan)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] rounded"
                                                    >
                                                        {item.value}
                                                    </a>
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Social Links Card */}
                        <div className="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/15 transition-colors duration-500">
                            <h3 className="text-sm font-bold text-[#b5b5b5] uppercase tracking-wider mb-5">Social Media</h3>
                            <div className="flex gap-3">
                                {socialLinks.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.href}
                                        title={`Kutra - ${link.label}`}
                                        aria-label={`Kutra - ${link.label}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="min-h-[44px] min-w-[44px] w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[var(--accent-cyan)] hover:border-[var(--accent-cyan)]/30 hover:bg-[var(--accent-cyan)]/5 transition-all duration-300"
                                    >
                                        <link.icon className="w-5 h-5" aria-hidden />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
