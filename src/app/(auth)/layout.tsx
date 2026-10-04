import React from 'react';
import Image from 'next/image';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden bg-black font-sans selection:bg-orange-500 selection:text-white">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Image
          src="/images/login-hero.jpg"
          alt="GymFlow Workout Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-30 sm:opacity-40 filter contrast-125 brightness-75 scale-105 transition-transform duration-1000"
        />
        {/* Cinematic Black & Deep Shadow Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/65" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black/95" />
        {/* Orange Ambient Athletic Backlight */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-orange-500/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-32 right-1/4 w-[450px] h-[300px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md px-4 py-8 sm:px-6 md:py-12 flex flex-col justify-center min-h-screen sm:min-h-0">
        {children}
      </div>
    </div>
  );
}
