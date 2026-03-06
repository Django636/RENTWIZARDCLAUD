'use client';

import { X, Home, Building2, Users, CreditCard, Settings, FileText, Bell } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidePanelProps {
  role?: 'vermieter' | 'mieter';
  isOpen?: boolean;
  onClose?: () => void;
}

const VERMIETER_MENUS = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Building2, label: 'Objekte', href: '/vermieter/objekte' },
  { icon: Users, label: 'Mieter', href: '/vermieter/mieter' },
  { icon: CreditCard, label: 'Finanzen', href: '/vermieter/finanzen' },
  { icon: FileText, label: 'Dokumente', href: '/vermieter/dokumente' },
  { icon: Bell, label: 'Meldungen', href: '/vermieter/meldungen' },
  { icon: Settings, label: 'Einstellungen', href: '/vermieter/einstellungen' },
];

const MIETER_MENUS = [
  { icon: Home, label: 'Übersicht', href: '/mieter' },
  { icon: FileText, label: 'Vertrag', href: '/mieter/vertrag' },
  { icon: CreditCard, label: 'Zahlungen', href: '/mieter/zahlungen' },
  { icon: FileText, label: 'Dokumente', href: '/mieter/dokumente' },
  { icon: Bell, label: 'Meldungen', href: '/mieter/meldungen' },
];

export function SidePanel({ role = 'vermieter', isOpen = true, onClose }: SidePanelProps) {
  const pathname = usePathname();
  const menus = role === 'vermieter' ? VERMIETER_MENUS : MIETER_MENUS;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-64 border-r border-slate-700 bg-slate-900 pt-16 transition-transform lg:relative lg:pt-0 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="absolute top-4 right-4 lg:hidden">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-slate-300" />
            </button>
          </div>

          <nav className="flex flex-col gap-1 flex-1 pt-4 lg:pt-0">
            {menus.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={onClose}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 pt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Abmelden</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function LogOut(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}