'use client';

import { ThemeProvider } from '@reloop/ui/hooks/use-theme';
import { ReactNode } from 'react';

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
