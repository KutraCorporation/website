import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLangBaseUrl, getLocalizedUrl, generateSiteMetadata } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";
import OverviewContent from "./OverviewContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "overviewPage" });
  const pageUrl = getLangBaseUrl(locale) + "/about/overview";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "about/overview")])
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
        "x-default": getLocalizedUrl("en", "about/overview"),
        ...languages,
      },
    },
  };
}

export default function OverviewPage() {
  return <OverviewContent />;
}
