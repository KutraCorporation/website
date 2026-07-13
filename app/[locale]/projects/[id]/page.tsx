import { products, getLocalizedUrl, getLangBaseUrl, generateSiteMetadata } from "@/lib/utils";
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
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const id = (await params).id;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailContent product={product} />;
}
