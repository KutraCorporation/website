"use client";

import Img from "./Img";
import { motion } from "framer-motion";
import type { Product } from "../lib/types/Product";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Box } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("products");
  const productName = t(`items.${product.id}.name`);
  const productDescription = t(`items.${product.id}.description`);

  return (
    <>
      <motion.article
        whileHover={{ scale: 1.02, y: -4 }}
        className={cn(
          "group relative flex flex-col h-full rounded-2xl overflow-hidden",
          "border border-white/8 bg-[#111]",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_24px_-8px_rgba(0,0,0,0.4)]",
          "hover:border-(--accent-cyan)/25 hover:shadow-[0_0_30px_-8px_var(--accent-cyan-muted)]",
          "transition-all duration-300 ease-out",
          "focus-within:ring-2 focus-within:ring-(--accent-cyan)/40 focus-within:ring-offset-2 focus-within:ring-offset-[#0d0d0d]"
        )}
        key={product.id}
        aria-hidden="true"
        aria-labelledby={`${product.id}-card-heading`}
      >
        <div aria-label={`${product.name} image`} title={`${product.name} image`} className="relative aspect-[4/3] overflow-hidden flex items-center justify-center bg-[#0d0d0d]/80">
          {product.logo?.png ? (
            <Img
              src={product.logo.png}
              altText={`${product.name} logo`}
              imgClass={cn(
                "w-full h-full object-contain p-6 transition-transform duration-300 group-hover:scale-105 opacity-70",
              )}
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-[var(--accent-cyan)]/20 transition-colors">
              <Box className="w-8 h-8 text-[#b8b8b8] group-hover:text-[var(--accent-cyan)]/80" aria-hidden />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60 pointer-events-none" aria-hidden />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <Link href={`/projects/${product.id}`}>
            <h3 id={`${product.id}-card-heading`} className="text-lg font-bold text-[var(--accent-cyan)] tracking-tight transition-colors mb-2" translate="no">
              {productName}
            </h3>
          </Link>
          <p className="text-[#b8b8b8] text-sm leading-relaxed mb-5 font-medium">
            {productDescription}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            {product?.links?.map((productLink, index) => (
              <a
                key={productLink.id ?? index}
                href={productLink.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-11 min-w-11 text-xs font-semibold uppercase tracking-wider px-4 py-3 rounded-lg bg-white/5 text-[#b5b5b5] hover:bg-white/10 hover:text-[#e8e8e8] border border-white/5 hover:border-white/10 transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
              >
                {productLink.name}
              </a>
            ))}
          </div>
        </div>
      </motion.article >
    </>
  );
}