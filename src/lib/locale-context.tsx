'use client';

import React, { createContext, useContext, ReactNode } from 'react';

type Dict = Record<string, unknown>;

interface LocaleContextValue {
  locale: string;
  t: (key: string) => string;
  tRaw: (key: string) => unknown;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function resolvePath(obj: Dict, path: string): unknown {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

function resolve(obj: Dict, path: string): string {
  const val = resolvePath(obj, path);
  return typeof val === 'string' ? val : path;
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
    tRaw: (key: string) => resolvePath(dictionary, key),
  };
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return { locale: 'en', t: (key: string) => key, tRaw: () => undefined };
  }
  return ctx;
}
