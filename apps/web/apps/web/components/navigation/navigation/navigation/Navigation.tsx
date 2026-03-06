'use client';

import { useState } from 'react';
import { Header } from './Header';
import { SidePanel } from './SidePanel';

interface NavigationShellProps {
  children: React.ReactNode;
  title?: string;
  role?: 'vermieter' | 'mieter';
}

export function NavigationShell({
  children,
  title = 'RentWizard',
  role = 'vermieter',
}: NavigationShellProps) {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-slate-950">
      <Header title={title} onMenuClick={() => setSideOpen(!sideOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <SidePanel
          role={role}
          isOpen={sideOpen}
          onClose={() => setSideOpen(false)}
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}