'use client';

import { useEffect } from 'react';

export default function LangDetector() {
  useEffect(() => {
    const lang = location.pathname.startsWith('/es') ? 'es' : 'en';
    if (document.documentElement.lang !== lang) {
      document.documentElement.lang = lang;
    }
  }, []);

  return null;
}
