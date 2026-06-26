import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { getTranslations } from "next-intl/server"; // Burayı güncelledik
import EcosystemSection from "@/components/EcosystemSection";
import { products, baseUrl, getLangBaseUrl, teams, sanitizeId } from "@/lib/utils";

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
  const upperLocale = locale === "en" ? "" : locale.toUpperCase();
  const pageUrl = getLangBaseUrl(locale);

  return {
    title: `${t('tagline')} - Kutra ${upperLocale}`,
    description: "Kutra, Türkiye'nin en genç teknoloji ekosistemi olarak Next.js, Node.js ve yapay zeka ile modern uygulamalar geliştirir.",
    alternates: {
      canonical: pageUrl,
      languages: {
        'x-default': `${getLangBaseUrl('en')}`,
        'en': `${getLangBaseUrl('en')}`,
        'tr': `${getLangBaseUrl('tr')}`,
      },
    },
    openGraph: {
      title: "Kutra | Derin Çözümler, Sınırsız Teknoloji",
      description: "Kutra, Türkiye'nin en genç teknoloji ekosistemi olarak Next.js, Node.js ve yapay zeka ile modern uygulamalar geliştirir.",
      url: pageUrl,
      siteName: `Kutra ${upperLocale}`,
      images: [
        {
          url: `${baseUrl}img/hero-bg.png`,
          width: 1200,
          height: 630,
          alt: `Kutra ${upperLocale}`,
        },
      ],
      locale: locale === 'tr' ? 'tr_TR' : 'en_US',
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@KutraCorporation",
      creator: "@KutraCorporation",
      title: `${t('tagline')} - Kutra ${upperLocale}`,
      description: "Kutra, Türkiye'nin en genç teknoloji ekosistemi olarak Next.js, Node.js ve yapay zeka ile modern uygulamalar geliştirir.",
      images: [`${baseUrl}img/kutra-hero.png`],
    },
    other: {
      'shortlink': 'https://kutra.link/website'
    }
  }
}

export default function Home() {
  return (
    <>
      <script
        id="kutra-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema).replace(/</g, '\\u003c') }}
      />
      <div className="flex flex-col min-h-screen bg-[#0a0a0a]">
        {/* Hero Section */}
        <section
          className="relative flex items-center justify-center pt-32 pb-0 overflow-hidden hero-mesh"
          aria-label="Kutra – Güvenli, Sınırsız Dijital Gelecek"
        >
          <div className="container relative z-10 px-6 text-center">
            <Hero />
          </div>
        </section>
        <section className="flex flex-row justify-center items-center gap-5 px-3 py-6 md:py-8 lg:py-12 text-center bg-[#111111]" aria-hidden>
          <a href="#" rel="noopener noreferrer" className="text-[#e8e8e8] hover:text-owt1">DeepMatter St.</a>
          <a href="#" rel="noopener noreferrer" className="text-[#e8e8e8] hover:text-owt1">TST Digital</a>
        </section>
        <EcosystemSection products={products.slice(0, 8)} /> 
      </div>
    </>
  );
}
