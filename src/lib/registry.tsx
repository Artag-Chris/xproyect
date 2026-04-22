'use client';

import { ReactNode } from 'react';
import { StyleSheetManager } from 'styled-components';

export default function StyledComponentsRegistry({ children }: { children: ReactNode }) {
  return (
    <StyleSheetManager>
      {children}
    </StyleSheetManager>
  );
}
