'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client-side error
    console.error('GymFlow Application Error:', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center space-y-5 p-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive shadow-lg">
        <AlertCircle className="h-7 w-7" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-black tracking-tight text-foreground">Something went wrong</h2>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {error.message || 'An unexpected client error occurred while loading this view.'}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          onClick={() => reset()}
          size="sm"
          className="h-9 gap-2 px-4 font-bold shadow-md shadow-primary/20"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </Button>

        <Link href="/discover">
          <Button variant="outline" size="sm" className="h-9 gap-2 px-4 font-semibold">
            <Home className="h-4 w-4" />
            Go to Discover
          </Button>
        </Link>
      </div>
    </div>
  );
}
