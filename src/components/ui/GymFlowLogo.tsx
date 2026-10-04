import * as React from 'react';
import { cn } from '@/lib/utils';

interface GymFlowLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showText?: boolean;
  accentColor?: string; // default vibrant orange
  textColor?: string;
  className?: string;
}

const SIZE_MAP = {
  xs: { mark: 'h-4 w-4', text: 'text-xs', gap: 'gap-1.5' },
  sm: { mark: 'h-5 w-5', text: 'text-sm', gap: 'gap-2' },
  md: { mark: 'h-7 w-7', text: 'text-lg', gap: 'gap-2.5' },
  lg: { mark: 'h-9 w-9', text: 'text-2xl', gap: 'gap-3' },
  xl: { mark: 'h-12 w-12', text: 'text-3xl', gap: 'gap-3.5' },
  '2xl': { mark: 'h-16 w-16', text: 'text-4xl', gap: 'gap-4' },
};

/**
 * Scalable GymFlow Logo Glyph matching the uploaded brand mark
 * Angular 'G' monogram with the orange accent square dot and white pillar
 */
export function GymFlowMark({
  className = 'h-7 w-7',
  accentColor = '#FF5500',
  ...props
}: React.SVGProps<SVGSVGElement> & { accentColor?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 select-none inline-block', className)}
      aria-label="GymFlow Logo"
      {...props}
    >
      {/* Outer Angular G Monogram (White / CurrentColor) */}
      <path
        d="M0 0 H60 V18 H18 V78 H46 V52 H32 V36 H62 V78 L46 96 H16 L0 80 Z"
        fill="currentColor"
      />

      {/* Top-Right Accent Dot (Vibrant Orange) */}
      <rect x="76" y="0" width="24" height="24" rx="2" fill={accentColor} />

      {/* Right Vertical Pillar (White / CurrentColor) */}
      <rect x="76" y="34" width="24" height="62" rx="2" fill="currentColor" />
    </svg>
  );
}

export function GymFlowLogo({
  size = 'md',
  showText = true,
  accentColor = '#FF5500',
  textColor = 'text-white',
  className,
  ...props
}: GymFlowLogoProps) {
  const sizeConfig = SIZE_MAP[size];

  if (!showText) {
    return (
      <GymFlowMark
        className={cn(sizeConfig.mark, className)}
        accentColor={accentColor}
        {...props}
      />
    );
  }

  return (
    <div className={cn('inline-flex items-center select-none font-sans', sizeConfig.gap, className)}>
      <GymFlowMark
        className={cn(sizeConfig.mark, 'text-white')}
        accentColor={accentColor}
        {...props}
      />
      <span
        className={cn(
          'font-black tracking-[0.16em] uppercase leading-none transition-colors',
          sizeConfig.text,
          textColor
        )}
      >
        GYM<span style={{ color: accentColor }}>FLOW</span>
      </span>
    </div>
  );
}
