import React from 'react';
import { Header } from './header';
import { MobileNav } from './mobile-nav';
import { Sidebar } from './sidebar';
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister';
import { PWAInstallBanner } from '@/components/pwa/PWAInstallBanner';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Service Worker Registration */}
      <ServiceWorkerRegister />

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col pb-20 md:pb-6">
        {/* Top Header */}
        <Header />

        {/* PWA Install Banner */}
        <PWAInstallBanner />

        {/* Page Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8">{children}</main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </div>
  );
}
