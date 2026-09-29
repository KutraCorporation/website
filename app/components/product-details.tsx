"use client";

import { ArrowDownToLine, Box, ExternalLink, FileText } from "lucide-react";
import { useTranslations, useMessages } from "next-intl";
import Link from "next/link";
import type { Product } from "@/lib/types/Product";
import Img from "./Img";
import { Button } from "./ui/button";
import { getLangBaseUrl } from "@/lib/utils";
import { useLocaleContext } from "@/components/LocaleProvider";
import * as BrandIcons from "@/lib/icons";

type ProductDetailContentProps = {
  product: Product;
};

const repoMap: Record<string, string> = {
  authenticator: "authenticator",
  certwallet: "certwallet-contracts",
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

  const repoName = repoMap[product.id] ?? product.id;

  const platformConfig: Record<string, { name: string; href: string; Icon: (props: { className?: string }) => React.ReactNode }> = {
    Android: {
      name: "Android",
      href: `https://play.google.com/store/apps/details?id=com.kutra.${product.id}`,
      Icon: BrandIcons.Android,
    },
    iOS: {
      name: "iOS",
      href: `https://apps.apple.com/app/kutra-${product.id}`,
      Icon: BrandIcons.Apple,
    },
    macOS: {
      name: "macOS",
      href: `https://github.com/KutraCorporation/${repoName}/releases`,
      Icon: BrandIcons.Apple,
    },
    Linux: {
      name: "Linux",
      href: `https://github.com/KutraCorporation/${repoName}/releases`,
      Icon: BrandIcons.LinuxTux,
    },
    Windows: {
      name: "Windows",
      href: `https://github.com/KutraCorporation/${repoName}/releases`,
      Icon: BrandIcons.Windows,
    },
  };

  const platforms = (product.platforms ?? [])
    .map((key) => ({ id: `app${key}`, ...(platformConfig[key] ?? {}) }))
    .filter((p) => p.name);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex gap-6 items-start">
            <div 
              aria-hidden={product.logo?.png ? undefined : true}
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
                  <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl px-8 h-12 font-bold border-white/15 bg-transparent text-[#e8e8e8] hover:bg-white/5 hover:border-(--accent-cyan)/40 hover:text-white focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] transition-all"
                      asChild
                    >
                    <Link
                      href={`${langBaseUrl}/projects/${product.id}/terms`}
                      className="inline-flex items-center gap-2"
                    >
                      <FileText className="w-4 h-4" aria-hidden />
                      {sharedT('viewTerms')}
                    </Link>
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
            <h2 className="text-2xl font-semibold text-white">{sharedT("detailsHeading")}</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              {details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
        <hr/>
        {platforms.length > 0 && (
          <section id="download" aria-labelledby={`download-heading-${product.id}`}>
            <h2 id={`download-heading-${product.id}`} className="text-2xl font-semibold text-white">{sharedT('download')}</h2>
            <div className="bg-[var(--accent-cyan)] w-full h-0.5 mt-2" aria-hidden />
            <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 list-none p-0">
              {platforms.map(({ id, name, href, Icon }) => (
                <li key={id}>
                  <a
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${product.name} — ${sharedT('download')} (${name})`}
                    className="group flex flex-col items-center gap-3 rounded-xl bg-[#0a0a0a] p-5 border border-white/10 shadow-lg shadow-black/30 transition-all duration-300 hover:border-(--accent-cyan)/40 hover:shadow-[0_0_25px_-8px_var(--accent-cyan-muted)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--accent-cyan) focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                  >
                    <Icon className="w-10 h-10 text-[#b8b8b8] group-hover:text-(--accent-cyan) group-hover:scale-110 transition-all duration-300" />
                    <span className="text-sm font-bold text-[#e8e8e8]" translate="no">{name}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-(--accent-cyan)/80 group-hover:text-(--accent-cyan)">
                      <ArrowDownToLine className="w-3.5 h-3.5" aria-hidden />
                      {sharedT('download')}
                      <ExternalLink className="w-3 h-3 opacity-60" aria-hidden />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

