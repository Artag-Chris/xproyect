'use client';

import { useCallback } from 'react';
import { useLocale } from '@/lib/locale-context';
import { trackEvent } from '@/lib/analytics';
import { usePathname } from 'next/navigation';

export function useTrack() {
  const { locale } = useLocale();
  const pathname = usePathname();

  const track = useCallback(
    (eventName: string, params?: Record<string, string | number | boolean | undefined>) => {
      trackEvent(eventName, {
        ...params,
        language: locale,
        page_name: pathname,
      });
    },
    [locale, pathname]
  );

  return track;
}
