import type { MetadataRoute } from 'next'
import { products, baseUrl } from "./lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {

    const productEntries = products.map((product) => ({
      url: `${baseUrl}products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    
    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            alternates: {
                languages: {
                    en: `${baseUrl}/en`,
                    tr: `${baseUrl}/tr`,
                },
            },
        },
        ...productEntries,
    ]
}