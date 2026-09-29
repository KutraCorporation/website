import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types/Product";
import type { TeamDetail } from "@/lib/types/Team";
import * as Icons from "@/lib/icons";
import { Metadata } from 'next';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBaseUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
};

const getLangBaseUrl = (locale: string) => {
  const base = getBaseUrl();
  const cleanLocale = locale.replace(/^\/+|\/+$/g, "").toLowerCase();
  return `${base}${cleanLocale}`;
};

export const getLocalizedUrl = (locale: string, path = "") => {
  const cleanLocale = locale.replace(/^\/+|\/+$/g, "").toLowerCase();
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const localePart = cleanLocale === "en" ? "en" : cleanLocale;
  const pathname = cleanPath ? `/${localePart}/${cleanPath}` : `/${localePart}`;
  return new URL(pathname, getBaseUrl()).toString();
};

const baseUrl = getBaseUrl();

const getContactEmail = () => {
  const hostname = new URL(getBaseUrl()).hostname;
  return `info@${hostname}`;
};

const generateSiteMetadata = ({
  title,
  description,
  url,
  locale,
  images = [],
}: {
  title: string;
  description: string;
  url: string;
  locale: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
}): Metadata => {
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kutra Corporation",
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      site: "@KutraCorporation",
      creator: "@KutraCorporation",
      title,
      description,
      images: images.map(img => img.url),
    },
  };
};

const products: Product[] = [
  {
    id: "authenticator",
    name: "Authenticator",
    categories: ["Security", "Productivity"],
    description: "Modern UI-Supported Authenticator App with advanced import/export and password protection.",
    platforms: ["Android", "iOS", "macOS", "Linux", "Windows"],
    links: [
      {id: 1, name: "Github", link: "https://github.com/KutraCorporation/authenticator" }
    ]
  },
  /*
  {
    id: "chain",
    name: "Chain Browser",
    categories: ["Web3"],
    description: "Web2 + web3 based browser for the Web3 era, with built-in wallet and support for decentralized applications.",
  },
  {
    id: "domains",
    name: "Domains",
    categories: ["Web3", "Domains"],
    description: "Decentralized domain name registration service for the Web2 + Web3 era."
  },*/
].sort((a, b) => a.name.localeCompare(b.name));

const teams: TeamDetail[] = [
  {
    title: 'Mehmet Ali Durusoy',
    roleKey: 'ceo_dev',
    socialAccounts: [
      { _type: "twitter", url: "mehmetalidsy" },
      { _type: "linkedin", url: "mehmetalidsy" },
      { _type: "github", url: "mehmetalidsy" }
    ]
  }
];

function socialAccountUrl(_type: string, url: string, _title: string, iconClass?: string) {
  return Icons.socialAccountUrl(_type, url, _title, iconClass);
}

function sanitizeId(name: string){
  return name
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

const truncateDescription = (text: string, limit = 160) => {
  return text.length > limit ? text.substring(0, limit - 3) + "..." : text;
};

const safeJsonLd = (data: unknown): string => {
  const json = JSON.stringify(data);
  let safe = '';
  for (const ch of json) {
    if (ch === '<') {
      safe += '\\u003c';
    } else if (ch === '>') {
      safe += '\\u003e';
    } else if (ch === '&') {
      safe += '\\u0026';
    } else if (ch === '\u2028') {
      safe += '\\u2028';
    } else if (ch === '\u2029') {
      safe += '\\u2029';
    } else {
      safe += ch;
    }
  }
  return safe;
};

type Crumb = { name: string; path: string };

const breadcrumbSchema = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": getLocalizedUrl('en', crumb.path),
  })),
});

export {
  baseUrl,
  getLangBaseUrl,
  getContactEmail,
  Icons, teams, products,
  sanitizeId, socialAccountUrl, cn, generateSiteMetadata, truncateDescription,
  safeJsonLd, breadcrumbSchema
};