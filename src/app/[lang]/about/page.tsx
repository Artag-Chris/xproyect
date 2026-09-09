import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, locales, type Locale } from '@/lib/get-dictionary';
import AboutPageComponent from '@/components/sections/AboutPage';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);
  const about = dict.about?.meta;

  if (!about) return { title: 'Lumen X Labs' };

  const imageUrl = `https://lumenxlabs.com.co/${lang}/opengraph-image`;

  return {
    title: about.title,
    description: about.description,
    openGraph: {
      title: about.title,
      description: about.description,
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      siteName: 'Lumen X Labs',
      url: `https://lumenxlabs.com.co/${lang}/about`,
      images: [imageUrl],
    },
    twitter: {
      card: 'summary_large_image',
      title: about.title,
      description: about.description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://lumenxlabs.com.co/${lang}/about`,
      languages: {
        en: 'https://lumenxlabs.com.co/en/about',
        es: 'https://lumenxlabs.com.co/es/about',
      },
    },
  };
}

export default function About() {
  return <AboutPageComponent />;
}