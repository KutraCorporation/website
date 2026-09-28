"use client";

import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/types/Product";
import { useLocaleContext } from "@/components/LocaleProvider";
import { getLangBaseUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

type Props = {
  products: Product[];
};


export default function ProductsPageContent({ products }: Props) {
  const t = useTranslations("products");
  const openSourceProjectPage =  useTranslations("openSourcePage");
  const { locale } = useLocaleContext();
  const langBaseUrl = getLangBaseUrl(locale);

  return (
    <section aria-labelledby="products-heading">
      <div className="mx-auto px-2 text-left">
        <div className="ml-auto mt-20 max-w-4xl">
          <h1 id="products-heading" className="text-4xl font-black text-white mb-4">
            {t("title")}
          </h1>
          <small>
            <a className={"hover:text-owt1 flex items-center gap-1"} href={langBaseUrl + "/projects/open-source-projects"} title={openSourceProjectPage('title')} aria-label={openSourceProjectPage('title')}>
              <span>{openSourceProjectPage('title')}</span>
              <span><ArrowRight/></span>
            </a>
          </small>
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
