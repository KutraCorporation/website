import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types/Product";
import type { TeamDetail } from "@/lib/types/Team";
import { Mail } from "lucide-react";
import * as Icons from "@/lib/icons";

export const getBaseUrl = () => {
  const rawUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return rawUrl.endsWith('/') ? rawUrl : `${rawUrl}/`;
};

const getLangBaseUrl = (locale: string) => {
  const base = getBaseUrl();
  const cleanLocale = locale.replace(/^\/+/, "");
  return `${base}${cleanLocale}`;
};

const baseUrl = getBaseUrl();

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const products: Product[] = [
  /*{
    id: "aether",
    name: "Aether",
    description: "A programming language for high-performance, standalone software ready for quantum technology; it supports contract writing and artificial intelligence for virtually all Web3 networks.",
    links: [
      { id: 1, name: "Github", link: "https://github.com/KutraCorporation/aether" },
    ],
  },*/
  {
    id: "authenticator",
    name: "Authenticator",
    categories: ["Security", "Productivity"],
    description: "Modern UI-Supported Authenticator App with advanced import/export and password protection."
  },
  {
    id: "certwallet",
    name: "CertWallet",
    categories: ["Web3", "Education"],
    description: "Secure vault for digital credentials, diplomas, and verifiable achievements on Sui Network.",
    links: [
      { id: 1, name: "Github", link: "https://github.com/KutraCorporation/certwallet-contracts" },
    ],
  },
  {
    id: "chain",
    name: "Chain Browser",
    categories: ["Web3", "Education"],
    description: "Web2 + web3 based browser for the Web3 era, with built-in wallet and support for decentralized applications.",
  },
  {
    id: "domains",
    name: "Domains",
    categories: ["Web3", "Domains"],
    description: "Decentralized domain name registration service for the Web2 + Web3 era.",
    links: [
      { id: 1, name: "Search Domains", link: "#" },
    ]
  },
  {
    id: "Simay",
    name: "Simay",
    categories: ["AI", "Personal Assistant"],
    description: "Personal Assistant",
    links: [
      { id: 1, name: "Chat with Simay", link: "#" },
    ],
  },
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
  let output: { icon?: React.ReactNode, label?: string, url?: string } = {};

  switch (_type) {
    case "email":
      output = {
        icon: <Mail className={iconClass} />,
        label: _title + " of Mail Adress",
        url: "mailto:" + url
      };
    break;

    case "github":
      output = {
        icon: <Icons.Github className={iconClass} />,
        label: _title + " of Github",
        url: "https://github.com/" + url
      };
    break;


    case "linkedin":
      output = {
        icon: <Icons.Linkedin className={iconClass} />,
        label: _title + " of Linkedin",
        url: "https://linkedin.com/in/" + url
      };
    break;

    case "twitter":
      output = {
        icon: <Icons.Twitter className={iconClass} />,
        label: _title + " of X (Twitter)",
        url: "https://x.com/" + url
      };
    break;

    case "youtube":
      output = {
        icon: <Icons.Youtube className={iconClass} />,
        label: _title + " of Youtube",
        url: "https://youtube.com/" + url
      };
    break;

    case "discord":
      output = {
        icon: <Icons.Discord className={iconClass} />,
        label: _title + " of Discord",
        url: "https://discord.gg/" + url
      };
    break;

    default: output = {}; break;
  }
  return output;
};

function sanitizeId(name: string){
  return name
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

export {
  baseUrl,
  getLangBaseUrl,
  Icons, teams, products,
  sanitizeId, socialAccountUrl, cn
};