import { getLocalizedUrl, getLangBaseUrl, products, generateSiteMetadata } from "@/lib/utils";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ContributorCard from "@/components/ContributorCard";
import { Metadata } from "next";
import { i18n } from "@/i18n/i18n";
import { signWebBotAuth } from "@/lib/web-bot-auth";

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

  const repoName = repoMap[id] || id;
  const url = `https://api.github.com/repos/KutraCorporation/${repoName}/contributors?per_page=100&anon=true`;

  try {
    const baseHeaders: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36',
    };

    const privKey = process.env.WEB_BOT_AUTH_PRIVATE_KEY;
    const botHeaders = privKey
      ? await signWebBotAuth({ url, privateKey: privKey })
      : {};

    const res = await fetch(url, {
      headers: { ...baseHeaders, ...botHeaders },
      next: { revalidate: 3600 }
    });

    if (!res.ok) {
      console.error(`GitHub API Error (${repoName}): ${res.status} - ${res.statusText}`);
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error(`Error: (${repoName}):`, error);
    return [];
  }
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
  const sharedT = await getTranslations({ locale, namespace: "products" });

  const url = getLangBaseUrl(locale) + `/projects/${product.id}/contributors`;
  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, `projects/${product.id}/contributors`)])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${product.name} - ${sharedT("contributors")}`,
    description: product.description,
    url,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", `projects/${product.id}/contributors`),
        ...languages,
      },
    },
  };
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
