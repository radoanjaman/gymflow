'use client';

import React from 'react';
import { GymFlowMark } from '@/components/ui/GymFlowLogo';

interface GymFlowLoaderProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
}

export function GymFlowLoader({
  label = 'GymFlow',
  sublabel = 'Loading workout experience...',
  fullScreen = false,
}: GymFlowLoaderProps) {
  const content = (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center animate-in fade-in duration-300">
      {/* Animated Glowing Dual Rings + Brand Mark */}
      <div className="relative flex items-center justify-center h-20 w-20">
        {/* Outer glowing pulsing aura */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping opacity-60" />

        {/* Orbiting Neon Gradient Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-orange-500/50 animate-spin" />

        {/* Reverse Secondary Inner Ring */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-500/70 border-l-orange-500/30 animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />

        {/* Center GymFlow Mark */}
        <div className="relative h-12 w-12 rounded-2xl bg-zinc-950 border border-zinc-800 text-white flex items-center justify-center shadow-lg shadow-orange-500/25 animate-pulse">
          <GymFlowMark className="h-7 w-7 text-white" accentColor="#FF5500" />
        </div>
      </div>

      {/* Brand & Sublabel with subtle shimmer */}
      <div className="space-y-1">
        <h3 className="text-base font-black tracking-tight text-foreground">
          {label}
        </h3>
        <p className="text-xs text-muted-foreground animate-pulse">
          {sublabel}
        </p>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return <div className="flex min-h-[280px] w-full items-center justify-center">{content}</div>;
}
