"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import ProductCard from "./ProductCard";
import { getLangBaseUrl } from "@/lib/utils";
import type { Product } from "@/lib/types/Product";
import { useLocaleContext } from "@/components/LocaleProvider";

type Props = { products: Product[] };

export default function EcosystemSection({ products }: Props) {
  const { locale } = useLocaleContext();
  const t = useTranslations("ecosystem");
  const langBaseUrl = getLangBaseUrl(locale);

  return (
    <section
      id="ecosystem"
      className="pt-12 pb-24 md:pt-16 md:pb-32 bg-[#0d0d0d] bg-grid-white"
      aria-labelledby="ecosystem-heading"
    >
      <div className="container px-6">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2 id="ecosystem-heading" className="text-3xl md:text-4xl font-black text-[#e8e8e8] mb-2 tracking-tight">
              {t("title")}
            </h2>
            <div className="w-16 h-0.5 bg-[var(--accent-cyan)]/60" aria-hidden />
          </div>
          <Link
            href={`${langBaseUrl}/projects`}
            className="text-xs font-bold text-[#b8b8b8] hover:text-[var(--accent-cyan)] uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
