import ProductsPageContent from "@/components/ProductsPageContent";
import { products, baseUrl, getLocalizedUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const PAGE_URL = `${getLocalizedUrl('en', 'projects')}/`;

const combinedSchema = [
  {
    "@type": "ItemList",
    "name": "Kutra Ecosystem Products",
    "numberOfItems": products.length,
    "itemListElement": products.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "@id": `${PAGE_URL + product.id}/#software`,
        "name": product.name,
        "url": `${PAGE_URL + product.id}`,
        "publisher": { "@id": `${baseUrl}/#organization` },
        "author": { "@id": `${baseUrl}/#organization` },
        "applicationCategory": "SecurityApplication",
        "operatingSystem": "Android, iOS, Web, Windows, Linux",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "ratingCount": "1"
        }
      }
    }))
  }
];

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("ecosystem");
  const pageUrl = getLocalizedUrl(locale, "projects");

  return {
    title: t("title"),
    alternates: {
      canonical: pageUrl,
      languages: {
        "x-default": getLocalizedUrl('en', "projects"),
        "en": getLocalizedUrl('en', "projects"),
        "tr": getLocalizedUrl('tr', "projects"),
      },
    },
  };
}

export default function Products() {
  return (
    <>
      <script
        id="kutra-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema).replace(/</g, '\u003c') }}
      />
      <ProductsPageContent products={products.slice(0, 6)} />
    </>
  );
}