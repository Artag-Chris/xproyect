import type { MetadataRoute } from 'next';

const locales = ['en', 'es'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lumenxlabs.com.co';

  return locales.flatMap((lang) => [
    {
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
  ]);
}
