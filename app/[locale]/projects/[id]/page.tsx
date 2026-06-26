import { products, getLocalizedUrl } from "@/lib/utils";
import { ProductDetailContent } from "@/components/product-details";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

  const url = getLocalizedUrl(locale, `projects/${product.id}`);

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': getLocalizedUrl('tr', `projects/${product.id}`),
        'en-US': getLocalizedUrl('en', `projects/${product.id}`),
        'x-default': getLocalizedUrl('en', `projects/${product.id}`),
      }
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: url,
      type: 'website',
    }
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const id = (await params).id;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailContent product={product} />;
}