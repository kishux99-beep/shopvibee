'use client';

import Link from 'next/link';
import { Sparkles, Flame, Tag } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center">
            {/* Light Mode Logo */}
            <img 
              src="/logo-dark.png" 
              alt="ShopVibee Logo" 
              className="h-8 w-auto block dark:hidden object-contain" 
            />
            {/* Dark Mode Logo */}
            <img 
              src="/logo-light.png" 
              alt="ShopVibee Logo" 
              className="h-8 w-auto hidden dark:block object-contain" 
            />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          
          {/* Deals Link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            <span className="hidden xs:inline">Top</span> Deals
          </Link>

          {/* New Feature: Style Combos */}
          <Link
            href="/looks"
            className="group relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300 border border-violet-200/60 dark:border-violet-800/60 hover:bg-violet-100 dark:hover:bg-violet-900/80 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400 group-hover:rotate-12 transition-transform" />
            <span>Style Combos</span>
            <span className="text-[9px] bg-gradient-to-r from-violet-600 to-pink-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider shadow-sm">
              New
            </span>
          </Link>

        </nav>
      </div>
    </header>
  );
}