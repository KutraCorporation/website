import { getTranslations } from "next-intl/server";

type Section = { heading: string; paragraphs: string[] };

export default async function LegalContent({ namespace }: { namespace: string }) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as Section[];

  return (
    <div className="bg-black text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#e8e8e8] mb-3">
            {t("title")}
          </h1>
          <p className="text-sm text-[#a1a1a1] mb-10">{t("updated")}</p>
          <p className="text-[#b5b5b5] leading-relaxed mb-12">{t("intro")}</p>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <section key={i} aria-labelledby={`legal-section-${i}`}>
                <h2
                  id={`legal-section-${i}`}
                  className="text-xl font-bold text-[var(--accent-cyan)] mb-3"
                >
                  {section.heading}
                </h2>
                <div className="space-y-3">
                  {section.paragraphs.map((paragraph, j) => (
                    <p key={j} className="text-[#b5b5b5] leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="text-[#b5b5b5] leading-relaxed mt-12 pt-8 border-t border-white/6">
            {t("contactNote")}
          </p>
        </div>
      </div>
    </div>
  );
}
