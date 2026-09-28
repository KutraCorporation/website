import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FolderGit2 } from 'lucide-react';
import RepoGrid from '@/components/RepoGrid';
import { getLangBaseUrl, getLocalizedUrl, generateSiteMetadata, safeJsonLd, breadcrumbSchema } from '@/lib/utils';
import { i18n } from '@/i18n/i18n';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "openSourcePage" });
    const pageUrl = getLangBaseUrl(locale) + "/projects/open-source-projects";

    const languages = Object.fromEntries(
        i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "projects/open-source-projects")])
    );

    const baseMetadata = generateSiteMetadata({
        title: `${t("title")} - Kutra`,
        description: t("subtitle"),
        url: pageUrl,
        locale,
    });

    return {
        ...baseMetadata,
        alternates: {
            ...baseMetadata.alternates,
            languages: {
                "x-default": getLocalizedUrl("en", "projects/open-source-projects"),
                ...languages,
            },
        },
    };
}

export async function getRepositories(errorMessage: string) {
    const url = `https://api.github.com/orgs/KutraCorporation/repos?sort=updated&per_direction=desc`;

    const headers = {
        Accept: 'application/vnd.github.v3+json',
    };

    try {
        const response = await fetch(url, {
            headers,
            next: { revalidate: 3600 }
        });

        if (!response.ok) {
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


export default async function OpenSourceProjects({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "openSourcePage" });
    const repos = await getRepositories(t("fetchError"));

    return (
        <>
            <script
                id="kutra-opensource-breadcrumb"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: safeJsonLd(breadcrumbSchema([
                        { name: "Home", path: "/" },
                        { name: "Projects", path: "/projects" },
                        { name: "Open Source Projects", path: "/projects/open-source-projects" },
                    ])),
                }}
            />
            <section className="relative overflow-hidden bg-[#0a0a0a]">
            <div className="absolute inset-0 hero-mesh pointer-events-none" aria-hidden />
            <div
                className="absolute inset-0 bg-grid-white pointer-events-none [mask-image:radial-gradient(ellipse_at_top,black_10%,transparent_65%)]"
                aria-hidden
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-20 md:pt-36 md:pb-28">
                <div className="text-center mb-14 md:mb-20">
                    <span className="inline-flex items-center gap-2 rounded-full border border-(--accent-cyan)/25 bg-(--accent-cyan)/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-(--accent-cyan) mb-6">
                        <FolderGit2 className="w-3.5 h-3.5" aria-hidden />
                        GitHub
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#e8e8e8] leading-[1.15] mb-5">
                        {t("title")}
                    </h1>
                    <div className="w-16 h-0.5 bg-(--accent-cyan)/60 mx-auto mb-6" aria-hidden />
                    <p className="text-base sm:text-lg text-[#b5b5b5] font-medium max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                <RepoGrid repos={repos} />
            </div>
        </section>
        </>
    );
}
