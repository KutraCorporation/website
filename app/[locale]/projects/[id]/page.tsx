import { products, baseUrl } from "@/lib/utils";
import { ProductDetailContent } from "@/components/product-details";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = (await params).id;
  const product = products.find((p) => p.id === id);

  if (!product) return {};

  const url = `${baseUrl}/projects/${product.id}`;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': `${baseUrl}tr/projects/${product.id}`,
        'en-US': `${baseUrl}en/projects/${product.id}`,
        'x-default': url,
      },
    },
    openGraph: {
      title: product.name,
      description: product.description,
      url: url,
      type: 'website',
    }
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const id = (await params).id;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();
  return <ProductDetailContent product={product} />;
}