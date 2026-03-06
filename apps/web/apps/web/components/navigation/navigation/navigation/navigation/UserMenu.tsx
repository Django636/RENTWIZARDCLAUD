'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface UserMenuProps {
  name?: string;
  email?: string;
}

export function UserMenu({ name = 'User', email = 'user@rentwizard.de' }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
      >
        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-950">{name[0]}</span>
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-medium text-slate-100">{name}</span>
          <span className="text-xs text-slate-400">{email}</span>
        </div>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-slate-800 border border-slate-700 shadow-lg">
          <button className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 transition-colors">
            Profil
          </button>
          <button className="w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700 transition-colors">
            Einstellungen
          </button>
          <div className="border-t border-slate-700" />
          <button className="w-full px-4 py-2 text-left text-sm text-error-500 hover:bg-slate-700 transition-colors">
            Abmelden
          </button>
        </div>
      )}
    </div>
  );
}