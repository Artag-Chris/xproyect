'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Dict = Record<string, unknown>;

interface LocaleContextValue {
  locale: string;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolve(obj: Dict, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return path;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : path;
}

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: string;
  dictionary: Dict;
  children: ReactNode;
}) {
  const value: LocaleContextValue = {
    locale,
    t: (key: string) => resolve(dictionary, key),
  };
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return { locale: 'en', t: (key: string) => key };
  }
  return ctx;
}
