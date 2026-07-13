import React from 'react';
import type { ReactNode } from 'react';
import ProductsPageContent from "@/components/ProductsPageContent";
import { products, baseUrl, getLocalizedUrl, getLangBaseUrl, generateSiteMetadata } from "@/lib/utils";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { i18n } from '@/i18n/i18n';

function safeJsonLd(data: unknown): string {
  const json = JSON.stringify(data);
  let safe = '';
  for (const ch of json) {
    if (ch === '<') {
      safe += '\\u003c';
    } else if (ch === '>') {
      safe += '\\u003e';
    } else if (ch === '&') {
      safe += '\\u0026';
    } else {
      safe += ch;
    }
  }
  return safe;
}

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
  const t = await getTranslations({ locale, namespace: "ecosystem" });
  const pageUrl = getLangBaseUrl(locale) + "/projects";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "projects")])
  );

  const baseMetadata = generateSiteMetadata({
    title: t("title"),
    description: t("description"),
    url: pageUrl,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", "projects"),
        ...languages,
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(combinedSchema) }}
      />
      <ProductsPageContent products={products.slice(0, 6)} />
    </>
  );
}