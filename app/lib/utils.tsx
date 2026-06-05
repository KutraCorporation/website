import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types/Product";
import type { TeamDetail } from "@/lib/types/Team";
import { Mail, X } from "lucide-react";

function Github({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export const baseUrl = "http://localhost:3000/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const products: Product[] = [
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
  /*{
    id: "aether",
    name: "Aether",
    description: "A programming language for high-performance, standalone software ready for quantum technology; it supports contract writing and artificial intelligence for virtually all Web3 networks.",
    links: [
      { id: 1, name: "Github", link: "https://github.com/KutraCorporation/aether" },
    ],
  }*/
].sort((a, b) => a.name.localeCompare(b.name));

export const teams: TeamDetail[] = [
  {
    title: 'Mehmet Ali Durusoy',
    role: 'Co-Founder & CEO',
    socialAccounts: [
      {
        _type: "twitter",
        url: "mehmetalidsy"
      },
      {
        _type: "linkedin",
        url: "mehmetalidsy"
      },
      {
        _type: "github",
        url: "mehmetalidsy"
      }
    ]
  },
];

export function socialAccountUrl(_type: string, url: string, _title: string, iconClass?: string) {
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
        icon: <Github className={iconClass} />,
        label: _title + " of Github",
        url: "https://github.com/" + url
      };
    break;


    case "linkedin":
      output = {
        icon: <Linkedin className={iconClass} />,
        label: _title + " of Linkedin",
        url: "https://linkedin.com/in/" + url
      };
    break;

    case "twitter":
      output = {
        icon: <X className={iconClass} />,
        label: _title + " of X (Twitter)",
        url: "https://x.com/" + url
      };
    break;

    default: output = {}; break;
  }
  return output;
};

export function sanitizeId(name: string){
  return name
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};