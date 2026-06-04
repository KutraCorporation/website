import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Product } from "@/lib/types/Product";
import type { TeamDetail } from "@/lib/types/Team";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

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

export function socialAccountUrl(_type: string, url: string, _title: string) {
  let output;

  switch (_type) {
    case "email":
      output = {
        icon: <Mail />,
        label: _title + " of Mail Adress",
        url: "mailto:" + url
      };
    break;

    case "github":
      output = {
        icon: <Github />,
        label: _title + " of Github",
        url: "https://github.com/" + url
      };
    break;


    case "linkedin":
      output = {
        icon: <Linkedin />,
        label: _title + " of Linkedin",
        url: "https://linkedin.com/in/" + url
      };
    break;

    case "twitter":
      output = {
        icon: <Twitter />,
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