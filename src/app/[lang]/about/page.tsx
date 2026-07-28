'use client';

import { useLocale } from '@/lib/locale-context';
import AboutPageComponent from '@/components/sections/AboutPage';
import { useEffect } from 'react';

export default function About() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t('about.meta.title')} | Lumen X Labs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', t('about.meta.description'));
  }, [t]);

  return <AboutPageComponent />;
}
