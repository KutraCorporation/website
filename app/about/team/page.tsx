import Img from "@/components/Img";
import { useTranslations } from "next-intl";
import { teams, socialAccountUrl, baseUrl, sanitizeId } from "@/lib/utils";

const teamSchemaData = {
  "@context": "https://schema.org",
  "@graph": [
    ...teams.map(member => ({
      "@type": "Person",
      "@id": `${baseUrl}#person-${sanitizeId(member.title)}`,
      "name": member.title,
      "jobTitle": member.role,
      "worksFor": {
        "@type": "worksFor",
        "itemReviewed": { "@id": `${baseUrl}#organization` },
        "roleName": member.role
      },
      "sameAs": member.socialAccounts?.map(s => {
        if (!s.url) return '';
        if (s.url.startsWith('http')) return s.url;
        return socialAccountUrl(s._type, s.url, member.title).url || '';
      }).filter(Boolean) || []
    }))
  ]
};

export default function Team() {
    const t = useTranslations('team');

    return (
        <>
        <script
          id="kutra-graph-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchemaData).replace(/</g, '\\u003c') }}
        />
            <section id="team">
              <div className="bg-black text-white py-24">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl mx-auto space-y-20">
                    <div className="text-center contain-content">
                      <h2 className="text-owt1 uppercase text-xl">{t('heading')}</h2>
                      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {teams.map((team, teamIdx) => (
                          <div key={teamIdx} className="p-4 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all text-center">
                            {team.avatar && (
                              <Img src={baseUrl + team.avatar} altText={`${team.title} Avatar`} />
                            )}
                            <h3 className="text-xl font-bold mb-2">{team.title}</h3>
                            <small className="text-sm text-white">{team.role}</small>
                            <div className="flex justify-center items-center mt-2">
                              {team.socialAccounts.map((socialAccount, idx) => {
                                const output = socialAccountUrl(socialAccount._type, socialAccount.url, team.title);
                                return (
                                  <a key={JSON.stringify(idx + socialAccount._type)} href={output?.url} title={output.label} aria-label={output.label} target="_blank" className="mx-2">
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
        </>
    );
}