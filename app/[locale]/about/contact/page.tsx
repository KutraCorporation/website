import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLangBaseUrl, getLocalizedUrl, generateSiteMetadata, baseUrl, getContactEmail } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";
import ContactContent from "./ContactContent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const pageUrl = getLangBaseUrl(locale) + "/about/contact";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "about/contact")])
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
        "x-default": getLocalizedUrl("en", "about/contact"),
        ...languages,
      },
    },
  };
}

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Kutra",
    description: "Get in touch with Kutra for questions, feedback, or partnership proposals.",
    url: baseUrl + "about/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Kutra",
      email: getContactEmail(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Istanbul",
        addressCountry: "TR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactContent />
    </>
  );
}
