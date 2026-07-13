import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { teams as teamRawData, socialAccountUrl, baseUrl, sanitizeId, getLangBaseUrl, getLocalizedUrl, generateSiteMetadata } from "@/lib/utils";
import { i18n } from "@/i18n/i18n";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  const pageUrl = getLangBaseUrl(locale) + "/about/team";

  const languages = Object.fromEntries(
    i18n.locales.map((lang) => [lang, getLocalizedUrl(lang, "about/team")])
  );

  const baseMetadata = generateSiteMetadata({
    title: `${t("heading")} - Kutra`,
    description: t("heading"),
    url: pageUrl,
    locale,
  });

  return {
    ...baseMetadata,
    alternates: {
      ...baseMetadata.alternates,
      languages: {
        "x-default": getLocalizedUrl("en", "about/team"),
        ...languages,
      },
    },
  };
}

export default async function TeamPage() {
  const t = await getTranslations("team");
  const r = await getTranslations("team.roles");

  const teams = teamRawData.map(member => ({
    title: member.title,
    role: r(member.roleKey),
    socialAccounts: member.socialAccounts
  }));

  const teamSchemaData = {
    "@context": "https://schema.org",
    "@graph": teams.map(member => ({
      "@type": "Person",
      "@id": `${baseUrl}#person-${sanitizeId(member.title)}`,
      "name": member.title,
      "jobTitle": member.role,
      "worksFor": {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`
      },
      "sameAs": member.socialAccounts?.map(s => {
        if (!s.url) return '';
        if (s.url.startsWith('http')) return s.url;
        return socialAccountUrl(s._type, s.url, member.title).url || '';
      }).filter(Boolean) || []
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchemaData) }}
      />
      <div>
        <section id="team">
          <div className="bg-black text-white py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto space-y-20">
                <div className="text-center contain-content">
                  <h2 className="text-owt1 uppercase text-xl">{t('heading')}</h2>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {teams.map((team, teamIdx) => (
                      <div key={teamIdx} className="p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-owt1/25 transition-all text-center">
                        <h3 className="text-xl font-bold mb-2">{team.title}</h3>
                        <small className="text-sm text-white">{team.role}</small>
                        <div className="flex justify-center items-center gap-2 mt-3">
                          {team.socialAccounts.map((socialAccount, idx) => {
                            const output = socialAccountUrl(socialAccount._type, socialAccount.url, team.title, "w-5 h-5");
                            return (
                              <a key={JSON.stringify(idx + socialAccount._type)} href={output?.url} title={output.label} aria-label={output.label} target="_blank" rel="noopener noreferrer" className="min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#b8b8b8] hover:text-[#e8e8e8] hover:border-owt1/25 transition-all">
                                {output?.icon}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}