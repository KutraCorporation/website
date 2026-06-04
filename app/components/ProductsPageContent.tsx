"use client";

import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/types/Product";

type Props = {
  products: Product[];
};

export default function ProductsPageContent({ products }: Props) {
  const t = useTranslations("products");

  return (
    <section aria-labelledby="products-heading">
      <div className="mx-auto px-2 text-left">
        <div className="mb-10 mt-5 max-w-4xl">
          <h1 id="products-heading" className="text-4xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-sm text-[#b8b8b8] leading-relaxed">
            {t("subtitle")}
          </p>
        </div>
        <div className="p-5 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
