'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { GymFlowLogo } from '@/components/ui/GymFlowLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link href="/dashboard" className="flex items-center tracking-tight transition-opacity hover:opacity-90">
        <GymFlowLogo size="sm" textColor="text-foreground" />
      </Link>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        <Link href="/settings" passHref>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full border border-border/60"
            aria-label="User Settings"
          >
            <User className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
