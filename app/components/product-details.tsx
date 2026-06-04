"use client";

import { useTranslations, useMessages } from "next-intl";
import type { Product } from "@/lib/types/Product";

type ProductDetailContentProps = {
  product: Product;
};

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const t = useTranslations(`products.items.${product.id}`);
  const sharedT = useTranslations("products");
  const messages = useMessages();

  const productName = t("name");
  const productDescription = t("description");
  const details = (
    messages as {
      products?: { items?: Record<string, { details?: string[] }> };
    }
  ).products?.items?.[product.id]?.details;
  const length = product.categories?.length ?? 0;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">{productName}</h1>
          <p className="text-xl text-gray-400">{productDescription}</p>
          {length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.categories?.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-[#b5b5b5]"
                >
                  {sharedT(`categories.${category}`)}
                </span>
              ))}
            </div>
          )}
        </div>

        {details && details.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-white">
              {sharedT("detailsHeading")}
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}

        {product.links && product.links.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              {sharedT("linksHeading")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.links.map((productLink, index) => (
                <a
                  key={productLink.id ?? index}
                  href={productLink.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-[#b5b5b5] transition hover:bg-white/10 hover:text-white"
                >
                  {productLink.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

