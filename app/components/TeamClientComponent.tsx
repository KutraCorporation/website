"use client";

import { useTranslations } from "next-intl";
import { socialAccountUrl, baseUrl, sanitizeId } from "@/lib/utils";
import type { TeamDetail } from "@/lib/types/Team";

interface TeamProps {
  teams: TeamDetail[];
}

export default function TeamClientComponent({ teams }: TeamProps) {
  const t = useTranslations("team");

  const teamSchemaData = {
    "@context": "https://schema.org",
    "@graph": teams.map(member => ({
      "@type": "Person",
      "@id": `${baseUrl}#person-${sanitizeId(member.title)}`,
      "name": member.title,
      "jobTitle": t('roles.' + member.roleKey),
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
          id="kutra-graph-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchemaData).replace(/</g, '\\u003c') }}
        />
            
    </>
  );
}