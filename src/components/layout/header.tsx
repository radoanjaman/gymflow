'use client';

import React from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { GymFlowLogo } from '@/components/ui/GymFlowLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link
        href="/discover"
        className="flex items-center tracking-tight transition-opacity hover:opacity-90"
      >
        <GymFlowLogo size="sm" textColor="text-foreground" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}
