'use client';

import React from 'react';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

/** Root client-side providers wrapper for the theme. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
