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
  const t = await getTranslations({ locale, namespace: "termsPage" });
  const pageUrl = getLangBaseUrl(locale) + "/terms";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "terms")])
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
        "x-default": getLocalizedUrl("en", "terms"),
        ...languages,
      },
    },
  };
}

export default async function TermsPage() {
  const t = await getTranslations("termsPage");

  return (
    <>
      <script
        id="kutra-terms-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: t("title"), path: "/terms" },
          ])),
        }}
      />
      <LegalContent namespace="termsPage" />
    </>
  );
}
