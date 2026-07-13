import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Img from "./Img";

interface Contributor {
  login?: string;
  name?: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type: string;
}

export default async function ContributorCard({ contributor }: { contributor: Contributor }) {
  const sharedT = await getTranslations("products");

  return (
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col items-center gap-1.5 rounded-lg p-3 text-center",
        "border border-white/8 bg-[#111]",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_8px_24px_-8px_rgba(0,0,0,0.4)]",
        "hover:border-(--accent-cyan)/25 hover:shadow-[0_0_30px_-8px_var(--accent-cyan-muted)]",
        "transition-all duration-300 ease-out",
        "focus-visible:ring-2 focus-visible:ring-(--accent-cyan)/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d]"
      )}
    >
      <Img 
        src={contributor.avatar_url} 
        altText={`${contributor.login}'s avatar`}
        imgClass="w-20 h-20 rounded-full shrink-0 ring-2 ring-white/10 group-hover:ring-(--accent-cyan)/30 transition-all"
      />
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-white truncate max-w-28">
          {contributor.login || contributor.name || "Unknown"}
        </span>
        <span className="text-xs text-[#b8b8b8]">
          {contributor.contributions + " " + sharedT("contributors_uba_text")}
        </span>
      </div>
      <ExternalLink className="w-3 h-3 text-[#555] group-hover:text-(--accent-cyan) transition-colors shrink-0" />
    </a>
  );
}
