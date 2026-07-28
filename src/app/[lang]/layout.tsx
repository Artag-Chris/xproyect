import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, locales, type Locale } from '@/lib/get-dictionary';
import { LocaleProvider } from '@/lib/locale-context';
import ThemeProvider from '@/lib/theme-context';
import LenisProvider from '@/lib/lenis-context';
import Header from '@/components/common/Header';
import PageViewTracker from '@/components/common/PageViewTracker';
import LangDetector from '@/components/common/LangDetector';

const FloatingContactHub = dynamic(() => import('@/components/common/FloatingContactHub'));

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang as Locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      locale: lang === 'es' ? 'es_CO' : 'en_US',
      siteName: 'Lumen X Labs',
      url: `https://lumenxlabs.com.co/${lang}`,
    },
    alternates: {
      canonical: `https://lumenxlabs.com.co/${lang}`,
      languages: {
        en: 'https://lumenxlabs.com.co/en',
        es: 'https://lumenxlabs.com.co/es',
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dictionary = await getDictionary(lang);

  return (
    <LocaleProvider locale={lang} dictionary={dictionary}>
      <ThemeProvider>
        <LenisProvider>
        <PageViewTracker />
        <LangDetector />
          <Header />
          {children}
          <FloatingContactHub />
        </LenisProvider>
      </ThemeProvider>
    </LocaleProvider>
  );
}
