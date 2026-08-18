'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { initialLooks } from '@/data/looks';
import OutfitCard from '@/app/components/OutfitCard';
import { Sparkles, Shirt, ArrowLeft, Heart } from 'lucide-react';

export default function LooksPage() {
  const [selectedVibe, setSelectedVibe] = useState<string>('All');
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  
  // REAL-TIME STATE: Total Saved Looks (Global for this page)
  const [savedLookIds, setSavedLookIds] = useState<string[]>([]);

  const vibes = ['All', 'Smart Casual / Luxury', 'Korean Streetwear', 'Under ₹3,000'];

  // Initial Sync from localStorage (client-side only)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('saved_looks') || '[]');
      setSavedLookIds(saved);
    } catch {
      setSavedLookIds([]);
    }
  }, []);

  // GLOBAL TOGGLE FUNCTION (Real-time reactivity activator)
  const toggleSaveLook = (lookId: string) => {
    try {
      let updated: string[];
      if (savedLookIds.includes(lookId)) {
        updated = savedLookIds.filter((id: string) => id !== lookId);
      } else {
        updated = [...savedLookIds, lookId];
      }
      
      // 1. Update State (TRIGGERS REAL-TIME RE-RENDER ON THIS PAGE)
      setSavedLookIds(updated);
      // 2. Persist to localStorage
      localStorage.setItem('saved_looks', JSON.stringify(updated));
    } catch {
      // safe fallback
    }
  };

  // Efficient filtered looks calculation
  const filteredLooks = useMemo(() => {
    return initialLooks.filter((look) => {
      // 1. If Wishlist Tab is active
      if (savedOnly) {
        return savedLookIds.includes(look.id);
      }
      // 2. If 'Under 3K' budget filter active
      if (selectedVibe === 'Under ₹3,000') {
        return look.budgetCategory === 'under-3k';
      }
      // 3. If 'All' filter active
      if (selectedVibe === 'All') {
        return true;
      }
      // 4. Default Vibe filter
      return look.vibe.toLowerCase().includes(selectedVibe.toLowerCase());
    });
  }, [savedOnly, savedLookIds, selectedVibe]);

  const savedCount = savedLookIds.length;

  return (
    <main className="min-h-screen bg-[#0d0d0f] text-neutral-100 py-6 sm:py-10 px-3 sm:px-6 lg:px-8 relative overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* Subtle Studio Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[350px] sm:w-[750px] h-[350px] sm:h-[450px] bg-amber-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Grid Grid Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      {/* Top Navigation Bar: Back & Saved Count */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 flex items-center justify-between relative z-10 px-1">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 hover:text-white hover:border-amber-400/30 transition-all text-xs font-semibold backdrop-blur-md group shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:-translate-x-1 transition-transform" />
          <span>All Deals</span>
        </Link>

        {/* Real-time Wishlist Toggle Button */}
        <button
          onClick={() => {
            setSavedOnly(!savedOnly);
            if (!savedOnly) setSelectedVibe('All'); // deactivate vibes on wishlist tab
          }}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-bold transition-all backdrop-blur-md border ${
            savedOnly
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-[0_0_20px_rgba(244,63,94,0.2)]'
              : 'bg-white/[0.04] text-neutral-300 border-white/[0.08] hover:text-white hover:border-rose-400/30'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 shrink-0 ${savedOnly ? 'fill-rose-400' : ''}`} />
          <span>Saved Fits ({savedCount})</span>
        </button>
      </div>

      {/* Header Container */}
      <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-14 relative z-10 px-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] mb-3 sm:mb-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
          <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Curated Studio Outfits
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-2 sm:mb-3 uppercase font-serif text-white">
          Shop The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">Look</span>
        </h1>
        
        <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-light">
          Editorial style combinations curated for every occasion. Tap any piece to inspect details and claim discounts.
        </p>

        {/* Filter Pills with smooth horizontal scrolling */}
        {!savedOnly && (
          <div className="flex items-center justify-start sm:justify-center gap-2 mt-6 sm:mt-7 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {vibes.map((vibe) => (
              <button
                key={vibe}
                onClick={() => setSelectedVibe(vibe)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 shrink-0 ${
                  selectedVibe === vibe
                    ? 'bg-amber-400 text-black shadow-[0_0_20px_rgba(251,191,36,0.35)] scale-105 border border-amber-300'
                    : 'bg-neutral-900/90 text-neutral-400 border border-neutral-800 hover:text-neutral-100 backdrop-blur-md'
                }`}
              >
                {vibe}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid: 2 columns on extra-large screens, 1 on mobile */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 relative z-10 px-1">
        {filteredLooks.map((look) => (
          <OutfitCard
            key={look.id}
            look={look}
            // Real-time integration props
            isSaved={savedLookIds.includes(look.id)}
            onToggleSave={toggleSaveLook}
          />
        ))}
      </div>

      {/* Empty States */}
      {filteredLooks.length === 0 && (
        <div className="text-center py-20 text-neutral-500 relative z-10 px-4 border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/40 backdrop-blur-xl">
          <Shirt className="w-8 h-8 mx-auto mb-3 opacity-30 text-amber-400" />
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-medium leading-relaxed">
            {savedOnly ? 'No saved outfits yet. Tap the heart icon on any outfit card to bookmark looks!' : 'No outfits found for this vibe.'}
          </p>
          {savedOnly && (
             <button
                onClick={() => setSavedOnly(false)}
                className="mt-5 px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider"
             >
                Explore All Lookbooks
             </button>
          )}
        </div>
      )}
    </main>
  );
}