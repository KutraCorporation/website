import { products, baseUrl, getLocalizedUrl, getLangBaseUrl, generateSiteMetadata, safeJsonLd, breadcrumbSchema } from "@/lib/utils";
import { ProductDetailContent } from "@/components/product-details";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { i18n } from "@/i18n/i18n";

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

  const url = getLangBaseUrl(locale) + `/projects/${product.id}`;
  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, `projects/${product.id}`)])
  );

  const baseMetadata = generateSiteMetadata({
    title: product.name,
    description: product.description,
    url,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", `projects/${product.id}`),
        ...languages,
      },
    },
    appLinks: {
      android: { package: "com.kutra." + product.id, app_name: product.name, url: "https://play.google.com/store/apps/details?id=com.kutra." + product.id }
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const productUrl = getLocalizedUrl(locale, `projects/${product.id}`);

  const categoryMap: Record<string, string> = {
    Security: 'SecurityApplication',
    Productivity: 'BusinessApplication',
    Web3: 'WebApplication',
    Education: 'EducationalApplication',
  };
  const appCategory = categoryMap[product.categories?.[0] ?? ''] ?? 'SoftwareApplication';

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "url": productUrl,
    "description": product.description,
    "applicationCategory": appCategory,
    "operatingSystem": "Android, iOS, Web, Windows, Linux",
    "publisher": { "@id": `${baseUrl}/#organization` },
    "author": { "@id": `${baseUrl}/#organization` },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
  };

  return (
    <>
      <script
        id={`software-schema-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(softwareSchema) }}
      />
      <script
        id={`breadcrumb-schema-${product.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: product.name, path: `/projects/${product.id}` },
          ])),
        }}
      />
      <ProductDetailContent product={product} />
    </>
  );
}
