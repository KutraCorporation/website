import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLangBaseUrl, getLocalizedUrl, generateSiteMetadata, safeJsonLd, breadcrumbSchema } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";
import LegalContent from "@/components/LegalContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacyPage" });
  const pageUrl = getLangBaseUrl(locale) + "/privacy";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "privacy")])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${t("title")} - Kutra`,
    description: t("intro"),
    url: pageUrl,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", "privacy"),
        ...languages,
      },
    },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacyPage");

  return (
    <>
      <script
        id="kutra-privacy-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: t("title"), path: "/privacy" },
          ])),
        }}
      />
      <LegalContent namespace="privacyPage" />
    </>
  );
}
