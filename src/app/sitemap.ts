import type { MetadataRoute } from 'next';

const locales = ['en', 'es'] as const;
const services = [
  'process-automation',
  'ai-for-business',
  'web-development',
  'digital-transformation',
  'ai-colombia-business',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumenxlabs.com.co';
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    entries.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    });

    for (const slug of services) {
      entries.push({
        url: `${baseUrl}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      });
    }
  }

  return entries;
}
