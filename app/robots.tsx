import { MetadataRoute } from 'next';
import { baseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: baseUrl + 'sitemap.xml',
  };
}