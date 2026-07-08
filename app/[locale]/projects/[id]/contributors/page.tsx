import { getLocalizedUrl, products } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ContributorCard from "@/components/ContributorCard";
import { Metadata } from "next";

type Contributor = {
  login?: string;
  name?: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
};

async function getContributors(id: string) {
  const repoMap: { [key: string]: string } = {
    'authenticator': 'authenticator',
    'certwallet': 'certwallet-contracts',
  };

  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  
  const repoName = repoMap[id] || id;
  const res = await fetch(`https://api.github.com/repos/KutraCorporation/${repoName}/contributors?per_page=100&anon=true`, {
    headers,
    next: { revalidate: 3600 }
  });
  
  if (!res.ok) return [];
  return res.json();
}

interface PageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) return {};
  const sharedT = await getTranslations("products");

  const url = getLocalizedUrl(locale, `projects/${product.id}`);

  return {
    title: product.name + " - " + sharedT("contributors"),
    description: product.description,
    alternates: {
      canonical: url,
      languages: {
        'tr-TR': getLocalizedUrl('tr', `projects/${product.id}/contributors`),
        'en-US': getLocalizedUrl('en', `projects/${product.id}/contributors`),
        'x-default': getLocalizedUrl('en', `projects/${product.id}/contributors`),
      }
    },
    openGraph: {
      title: product.name + " - " + sharedT("contributors"),
      description: product.description,
      url: url,
      type: 'website',
    }
  }
}

export default async function ProductContributorsPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const t = await getTranslations(`products.items.${product.id}`);
  const sharedT = await getTranslations("products");
  const contributors: Contributor[] = await getContributors(product.id);

  return (
    <div className="mx-auto max-w-6xl p-8">
      <h1 className="text-4xl font-bold text-center mb-10">
        {t("name")} - {sharedT("contributors")}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {contributors.map((contributor) => (
          <ContributorCard key={contributor.id} contributor={contributor} />
        ))}
      </div>
    </div>
  );
}