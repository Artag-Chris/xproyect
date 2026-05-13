import { notFound } from 'next/navigation';
import { getDictionary, hasLocale, locales } from '@/lib/get-dictionary';
import { LocaleProvider } from '@/lib/locale-context';
import ThemeProvider from '@/lib/theme-context';
import Header from '@/components/common/Header';
import SmoothScroll from '@/components/common/SmoothScroll';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
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
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </ThemeProvider>
    </LocaleProvider>
  );
}
