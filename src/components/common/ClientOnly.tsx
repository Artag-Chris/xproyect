"use client";
import React, { useEffect, useState, PropsWithChildren } from 'react';

// Renders children only after the component has mounted on the client.
export default function ClientOnly({ children }: PropsWithChildren<{}>) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
}
