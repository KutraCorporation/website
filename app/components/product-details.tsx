"use client";

import { Box } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import type { Product } from "@/lib/types/Product";
import Img from "./Img";
import { Button } from "./ui/button";
import { getLangBaseUrl } from "@/lib/utils";
import { useLocaleContext } from "@/components/LocaleProvider";

type ProductDetailContentProps = {
  product: Product;
};

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const { locale } = useLocaleContext();
  const t = useTranslations(`products.items.${product.id}`);
  const sharedT = useTranslations("products");
  const messages = useMessages();
  const langBaseUrl = getLangBaseUrl(locale);

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
          <div className="flex gap-6 items-start">
            <div 
              aria-label={`${product.name} image`} 
              title={`${product.name} image`} 
              className="relative w-1/3 aspect-[4/3] overflow-hidden flex items-center justify-center bg-[#0d0d0d]/80 shrink-0"
            >
              {product.logo?.png ? (
                <Img
                  src={product.logo.png}
                  altText={`${product.name} logo`}
                  imgClass="w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105 opacity-70"
                />
              ) : (
                <div className="w-32 h-32 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--accent-cyan)]/20 transition-colors">
                  <Box className="w-16 h-16 text-[#b8b8b8] group-hover:text-[var(--accent-cyan)]/80" aria-hidden />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60 pointer-events-none" aria-hidden />
            </div>          

            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-bold text-white">{productName}</h1>
              <p className="text-xl text-gray-400">{productDescription}</p>
              {length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
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
              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button
                      size="lg"
                      className="rounded-xl px-8 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:bg-[#00b8d4] hover:opacity-95 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] shadow-lg shadow-[var(--accent-cyan)]/20 transition-all"
                      asChild
                    >
                    <a
                      href={`${langBaseUrl}/projects/${product.id}/contributors`}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >{sharedT('contributors')}</a>
                  </Button>
                  {product.links && product.links.length > 0 && (
                    product.links.map((productLink, index) => (
                      <Button
                        size="lg"
                        key={productLink.id ?? index}
                        className="rounded-xl px-8 h-12 font-bold bg-[var(--accent-cyan)] text-[#0a0a0a] hover:bg-[#00b8d4] hover:opacity-95 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] shadow-lg shadow-[var(--accent-cyan)]/20 transition-all"
                        asChild
                      >
                        <a 
                          key={productLink.id ?? index}
                          href={productLink.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >{productLink.name}</a>
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
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
      </div>
    </div>
  );
}

