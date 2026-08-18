'use client';

import { useState } from 'react';
import { FashionLook, LookPiece } from '@/data/looks';
import { ArrowUpRight, Sparkles, Heart, Share2, ShoppingBag, Check } from 'lucide-react';

interface OutfitCardProps {
  look: FashionLook;
  isSaved?: boolean;
  onToggleSave?: (id: string) => void;
}

export default function OutfitCard({ look, isSaved = false, onToggleSave }: OutfitCardProps) {
  const [copied, setCopied] = useState(false);

  // 🚀 Universal Native Share Handler (WhatsApp, Telegram, Instagram, etc.)
  const handleUniversalShare = async () => {
    const shareData = {
      title: `Shop The Look: ${look.title}`,
      text: `Check out this curated outfit: "${look.title}" (${look.totalPrice} • ${look.totalSavings}) on ShopVibee!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User closed share sheet or cancelled
      }
    } else {
      // Desktop / Fallback: Copy link to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Safe fallback
      }
    }
  };

  return (
    <div className="bg-neutral-900/70 backdrop-blur-2xl border border-white/[0.08] rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:border-amber-500/30">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 py-2 mb-3 bg-white/[0.03] rounded-xl sm:rounded-2xl border border-white/[0.06] backdrop-blur-md">
        <div className="flex items-center gap-1.5 min-w-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300/90 truncate">
            {look.vibe}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onToggleSave && onToggleSave(look.id)}
            title="Save to Wishlist"
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all border ${
              isSaved
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 scale-105 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                : 'bg-white/[0.04] border-white/[0.08] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-400' : ''}`} />
          </button>

          {/* Universal Share Button */}
          <button
            type="button"
            onClick={handleUniversalShare}
            title={copied ? "Link Copied!" : "Share Outfit"}
            className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center transition-all ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-white/[0.04] border-white/[0.08] text-neutral-400 hover:text-amber-300 hover:bg-amber-500/10 hover:border-amber-500/30'
            }`}
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}

            {/* Desktop Copied Tooltip */}
            {copied && (
              <span className="absolute -top-7 right-0 text-[10px] font-bold bg-emerald-500 text-black px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>

          <span className="text-[11px] sm:text-xs font-black text-amber-200 bg-amber-400/10 px-2.5 py-0.5 sm:py-1 rounded-full border border-amber-400/20 shadow-inner">
            {look.totalPrice}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start">
        
        {/* LEFT: Auto-Adaptive Image Container */}
        <div className="md:col-span-5 lg:col-span-5 flex flex-col gap-2.5">
          <div className="relative w-full rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/[0.08] bg-neutral-950 shadow-lg group">
            <img
              src={look.modelImage}
              alt={look.title}
              className="w-full h-auto block object-cover filter brightness-[0.95] contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
            />

            {/* Discount Tag */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 backdrop-blur-md">
                {look.totalSavings}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <div className="px-1">
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight font-serif">
              {look.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 leading-relaxed font-light">
              {look.description}
            </p>
          </div>
        </div>

        {/* RIGHT: Product List */}
        <div className="md:col-span-7 lg:col-span-7 p-2 sm:p-3.5 flex flex-col justify-between bg-white/[0.02] rounded-[20px] sm:rounded-[24px] border border-white/[0.06] backdrop-blur-xl">
          
          <div className="flex flex-col gap-2 sm:gap-2.5">
            {look.pieces.map((piece: LookPiece) => (
              <a
                key={piece.id}
                href={piece.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-2 sm:p-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.04] hover:border-amber-400/20 rounded-2xl transition-all duration-200"
              >
                {/* Thumbnail */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-neutral-900 border border-white/[0.08] p-1 shrink-0 overflow-hidden flex items-center justify-center">
                  <img
                    src={piece.image}
                    alt={piece.name}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info Stack */}
                <div className="flex-1 min-w-0 px-3">
                  <span className="text-[9px] sm:text-[10px] font-bold text-neutral-400 uppercase tracking-wider block truncate">
                    {piece.category} • <span className="text-amber-400/90">{piece.brand}</span>
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-neutral-200 truncate group-hover:text-amber-300 transition-colors">
                    {piece.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] text-neutral-500 line-through">
                      {piece.originalPrice}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {piece.discount}
                    </span>
                  </div>
                </div>

                {/* Price & Arrow */}
                <div className="flex items-center gap-2 shrink-0 pl-1">
                  <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                    {piece.price}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] text-neutral-300 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-black group-hover:border-amber-300 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Bottom Combo Action Bar */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-xs px-1">
            <div className="text-neutral-400 text-[11px]">
              <span>Full MRP: </span>
              <span className="line-through text-neutral-500">{look.totalOriginalPrice}</span>
            </div>
            <a
              href={look.pieces[0]?.affiliateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-300 hover:text-black font-bold text-[11px] border border-amber-400/30 transition-all"
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Shop Full Fit</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}