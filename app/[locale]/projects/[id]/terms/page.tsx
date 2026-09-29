import { getLocalizedUrl, getLangBaseUrl, products, generateSiteMetadata, safeJsonLd, breadcrumbSchema } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { i18n } from "@/i18n/i18n";

type Section = { heading: string; paragraphs: string[] };

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return {};
  const sharedT = await getTranslations({ locale, namespace: "productTerms" });

  const url = getLangBaseUrl(locale) + `/projects/${product.id}/terms`;
  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, `projects/${product.id}/terms`)])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${product.name} - ${sharedT("title")}`,
    description: sharedT("generalNote"),
    url,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", `projects/${product.id}/terms`),
        ...languages,
      },
    },
  };
}

export default async function ProductTermsPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const t = await getTranslations("productTerms");
  const hasSpecific = t.has(`items.${product.id}.intro`);
  const intro = hasSpecific
    ? t(`items.${product.id}.intro`)
    : t("generic.intro");
  const sections = (
    hasSpecific
      ? t.raw(`items.${product.id}.sections`)
      : t.raw("generic.sections")
  ) as Section[];

  return (
    <>
      <script
        id={`product-terms-breadcrumb-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: product.name, path: `/projects/${product.id}` },
            { name: t("title"), path: `/projects/${product.id}/terms` },
          ])),
        }}
      />
      <div className="bg-black text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              href={`/projects/${product.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-cyan)] hover:text-[#e8e8e8] transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              {t("backToProduct")}
            </Link>

            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#e8e8e8] mb-3" translate="no">
              {product.name} — {t("title")}
            </h1>
            <p className="text-sm text-[#a1a1a1] mb-10">{t("updated")}</p>
            <p className="text-[#b5b5b5] leading-relaxed mb-12">{intro}</p>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <section key={i} aria-labelledby={`product-terms-${product.id}-${i}`}>
                  <h2
                    id={`product-terms-${product.id}-${i}`}
                    className="text-xl font-bold text-[var(--accent-cyan)] mb-3"
                  >
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.paragraphs.map((paragraph, j) => (
                      <p key={j} className="text-[#b5b5b5] leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <p className="text-[#b5b5b5] leading-relaxed mt-12 pt-8 border-t border-white/6">
              {t("generalNote")}
            </p>
            <p className="text-[#a1a1a1] leading-relaxed mt-4">{t("contactNote")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
