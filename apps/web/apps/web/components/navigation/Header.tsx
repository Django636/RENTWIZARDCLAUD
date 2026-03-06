'use client';

import { Menu, Bell, Settings, LogOut, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export function Header({ title = 'RentWizard', onMenuClick }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    onMenuClick?.();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-slate-900">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="h-10 w-10 rounded-lg bg-slate-800 p-2 hover:bg-slate-700 transition-colors lg:hidden"
          >
            <Menu size={20} className="text-slate-200" />
          </button>
          <h1 className="text-xl font-bold text-slate-50">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative h-10 w-10 rounded-lg bg-slate-800 p-2 hover:bg-slate-700 transition-colors">
            <Bell size={20} className="text-slate-200" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500"></span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-slate-700"></div>

          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center gap-2 h-10 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
              <User size={18} className="text-slate-300" />
            </button>
          </div>

          <button className="h-10 w-10 rounded-lg bg-slate-800 p-2 hover:bg-slate-700 transition-colors">
            <Settings size={20} className="text-slate-200" />
          </button>
        </div>
      </div>
    </header>
  );
}