"use client";
import React, { useSyncExternalStore, PropsWithChildren } from 'react';

function subscribe() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

// Renders children only after the component has mounted on the client.
export default function ClientOnly({ children }: PropsWithChildren<object>) {
  const mounted = useSyncExternalStore(subscribe, () => true, getServerSnapshot);
  if (!mounted) return null;
  return <>{children}</>;
}
