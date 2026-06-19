import { MetadataRoute } from 'next';
import { i18n } from '@/i18n/i18n';
import { baseUrl } from './lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return i18n.locales.map((locale) => ({
    url: `${baseUrl + locale}/sitemap.xml`,
    lastModified: new Date(),
  }));
}