import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server"; // Burayı güncelledik
import EcosystemSection from "@/components/EcosystemSection";
import { products, baseUrl, getLangBaseUrl, teams, sanitizeId, getLocalizedUrl, generateSiteMetadata } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";

function safeJsonLd(data: unknown): string {
  const json = JSON.stringify(data);
  let safe = '';
  for (const ch of json) {
    if (ch === '<') {
      safe += '\\u003c';
    } else if (ch === '>') {
      safe += '\\u003e';
    } else if (ch === '&') {
      safe += '\\u0026';
    } else {
      safe += ch;
    }
  }
  return safe;
}

const combinedSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "Kutra",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "@id": `${baseUrl}/#logo`,
        "url": `${baseUrl}/img/logo.png`,
      },
      "sameAs": [
        "https://x.com/KutraCorporation",
        "https://github.com/KutraCorporation",
        "https://youtube.com/@KutraCorporation",
        "https://www.linkedin.com/company/KutraCorporation"
      ],
      "employee": teams.map(member => ({
        "@id": `${baseUrl}/#person-${sanitizeId(member.title)}`
      }))
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      "url": baseUrl,
      "name": "Kutra Ecosystem",
      "publisher": { "@id": `${baseUrl}/#organization` }
    }
  ]
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  const pageUrl = getLangBaseUrl(locale);
  
  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "")])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${t('tagline')} - Kutra ${locale === "en" ? "" : locale.toUpperCase()}`,
    description: "Kutra, Türkiye'nin en genç teknoloji ekosistemi olarak Next.js, Node.js ve yapay zeka ile modern uygulamalar geliştirir.",
    url: pageUrl,
    locale,
    images: [{ url: `${baseUrl}img/hero-bg.png`, width: 1200, height: 630, alt: 'Kutra' }]
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        'x-default': `${getLangBaseUrl('en')}`,
        ...languages
      },
    },
  };
}

export default function Home() {
  return (
    <>
      <script
        id="kutra-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(combinedSchema) }}
      />
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        <section className="relative flex items-center justify-center pt-32 pb-0 overflow-hidden hero-mesh">
          <div className="container relative z-10 px-6 text-center">
            <Hero />
          </div>
        </section>
        <EcosystemSection products={products.slice(0, 8)} /> 
      </div>
    </>
  );
}
