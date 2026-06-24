import { MetadataRoute } from 'next';
import { baseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    host: baseUrl,
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: baseUrl + 'sitemap.xml',
  };
}