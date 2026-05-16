'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLocale } from '@/lib/locale-context';
import { trackPageView } from '@/lib/analytics';

export default function PageViewTracker() {
  const pathname = usePathname();
  const { locale } = useLocale();
  const tracked = useRef<string>('');

  useEffect(() => {
    const key = `${pathname}-${locale}`;
    if (tracked.current === key) return;
    tracked.current = key;

    const pageName = pathname.replace(/^\/(en|es)\/?/, '') || 'home';
    trackPageView(pageName, locale, pathname);
  }, [pathname, locale]);

  return null;
}
