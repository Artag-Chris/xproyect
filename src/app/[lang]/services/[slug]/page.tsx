import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import ServicePage from '@/components/services/ServicePage';

const services = [
  'process-automation',
  'ai-for-business',
  'web-development',
  'digital-transformation',
  'ai-colombia-business',
] as const;

export async function generateStaticParams() {
  const locales = ['en', 'es'] as const;
  const params: { lang: string; slug: string }[] = [];
  for (const lang of locales) {
    for (const slug of services) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as 'en' | 'es') as { services?: Record<string, { meta: { title: string; description: string } }> };
  const service = dict.services?.[slug];
  if (!service?.meta) return { title: 'Lumen X Labs' };

  const imageUrl = `https://lumenxlabs.com.co/${lang}/opengraph-image`;

  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.meta.title,
      description: service.meta.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://lumenxlabs.com.co/${lang}/services/${slug}`,
      languages: {
        en: `https://lumenxlabs.com.co/en/services/${slug}`,
        es: `https://lumenxlabs.com.co/es/services/${slug}`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang as 'en' | 'es') as { services?: Record<string, { meta: { title: string; description: string } }> };
  const meta = dict.services?.[slug]?.meta;
  const Base = 'https://lumenxlabs.com.co';
  const homeUrl = `${Base}/${lang}`;
  const pageUrl = `${Base}/${lang}/services/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      meta && {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: meta.title,
        description: meta.description,
        url: pageUrl,
        provider: { '@id': `${Base}/#organization` },
        areaServed: ['Pereira', 'Risaralda', 'Colombia', 'Worldwide'],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Lumen X Labs', item: homeUrl },
          { '@type': 'ListItem', position: 2, name: meta?.title ?? slug, item: pageUrl },
        ],
      },
    ].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServicePage slug={slug} />
    </>
  );
}
