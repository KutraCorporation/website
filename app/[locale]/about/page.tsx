import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLangBaseUrl, getLocalizedUrl, generateSiteMetadata } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";
import AboutContent from "./AboutContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  const pageUrl = getLangBaseUrl(locale) + "/about";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "about")])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${t("headline")} - Kutra`,
    description: t("subhead"),
    url: pageUrl,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", "about"),
        ...languages,
      },
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
