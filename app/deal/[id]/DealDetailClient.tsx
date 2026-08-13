'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Deal } from '@/data/deals';
import { FlashDeal } from '@/data/flashDeals';
import { TopDeal } from '@/data/topDeals';
import logo from '@/public/logo-dark.png';
import { FaArrowLeft, FaShieldAlt, FaBolt, FaHeart, FaShareAlt, FaLightbulb, FaCheckCircle, FaUserCheck } from 'react-icons/fa';

type DealDetailClientProps = {
  deal: Deal | FlashDeal | TopDeal;
  allDeals: (Deal | FlashDeal | TopDeal)[];
};

export default function DealDetailClient({ deal, allDeals }: DealDetailClientProps) {
  const router = useRouter();

  // Multiple Images Array Handling
  const productImages = (deal as any)?.images || [deal?.image, deal?.image, deal?.image];
  const [activeImage, setActiveImage] = useState(0);

  const [copied, setCopied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Category-Scoped Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Sticky Buy Bar Visibility State & Ref
  const [isMainBuyVisible, setIsMainBuyVisible] = useState(false);
  const mainBuyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsMainBuyVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (mainBuyRef.current) {
      observer.observe(mainBuyRef.current);
    }

    return () => {
      if (mainBuyRef.current) {
        observer.unobserve(mainBuyRef.current);
      }
    };
  }, [deal]);

  // Check initial wishlist status from localStorage on load
  useEffect(() => {
    if (deal) {
      const savedWishlist: number[] = JSON.parse(localStorage.getItem('shopvibee_wishlist') || '[]');
      setIsWishlisted(savedWishlist.includes(deal.id));
    }
  }, [deal]);

  // Touch Swipe Coordinates Tracking for Mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      setActiveImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
      setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    triggerToast(`Promo code '${code}' copied! 📋`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!deal) return;
    const savedWishlist: number[] = JSON.parse(localStorage.getItem('shopvibee_wishlist') || '[]');
    let updatedWishlist: number[];

    if (isWishlisted) {
      updatedWishlist = savedWishlist.filter((id) => id !== deal.id);
      setIsWishlisted(false);
      triggerToast('Removed from Wishlist 🤍');
    } else {
      updatedWishlist = [...savedWishlist, deal.id];
      setIsWishlisted(true);
      triggerToast('Added to your Wishlist ❤️');
    }

    localStorage.setItem('shopvibee_wishlist', JSON.stringify(updatedWishlist));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: deal?.title,
        text: `Check out this amazing deal on ShopVibee: ${deal?.title}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('Deal link copied to clipboard! 🔗');
    }
  };

  const relatedDeals = allDeals.filter(
    (d) => 
      d.category === deal.category && 
      d.id !== deal.id &&
      d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const guidance = (deal as any)?.vibeeGuidance;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between pb-20 sm:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <Image src={logo} alt="ShopVibee Logo" className="h-10 sm:h-14 w-auto object-contain" priority />
            </Link>

            {/* Category-Scoped Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={`Search in ${deal.category}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-100 text-xs sm:text-sm text-gray-900 px-4 py-2 pl-9 rounded-xl border border-transparent focus:border-indigo-600 focus:bg-white focus:outline-none transition"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
              </div>
            </div>

            <button
              onClick={() => router.back()}
              className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-2 rounded-xl transition flex-shrink-0 cursor-pointer active:scale-95"
            >
              <FaArrowLeft /> Back
            </button>
          </div>
        </header>

        {/* Main Affiliate Product Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
            
            {/* Left: Interactive Mobile Swipe & Click Slider */}
            <div className="flex flex-col gap-4">
              <div 
                className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-inner group touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={productImages[activeImage]} 
                  alt={deal.title} 
                  className="w-full h-full object-cover transition-all duration-300 select-none pointer-events-none" 
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-extrabold px-3 py-1 rounded-lg shadow-md animate-pulse z-10">
                  {deal.discount}
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                  Store: {deal.store}
                </span>

                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                      }}
                      className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full items-center justify-center transition opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 text-sm font-bold"
                      aria-label="Previous Image"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full items-center justify-center transition opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 text-sm font-bold"
                      aria-label="Next Image"
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>

              {/* Pagination Dots & Wishlist/Share Row */}
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full">
                  {productImages.map((_: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`h-2 rounded-full transition-all ${
                        activeImage === idx ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-2.5 rounded-full border transition shadow-sm ${
                      isWishlisted 
                        ? 'bg-red-50 border-red-200 text-red-500 scale-105' 
                        : 'bg-white border-gray-200 text-gray-600 hover:text-red-500 hover:border-red-200'
                    }`}
                    aria-label="Wishlist"
                  >
                    <FaHeart className="text-base" />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 hover:border-indigo-200 transition shadow-sm"
                    aria-label="Share"
                  >
                    <FaShareAlt className="text-base" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Selector Bar */}
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {productImages.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === idx ? 'border-indigo-600 scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Details & Affiliate CTA */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  {deal.category}
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 mt-3 leading-snug">
                  {deal.title}
                </h1>

                {/* Price and Discount Section */}
                <div className="flex flex-col my-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{deal.price}</span>
                    {deal.originalPrice && (
                      <span className="text-base text-gray-400 line-through">{deal.originalPrice}</span>
                    )}
                  </div>
                  {deal.discount && (
                    <span className="text-xs sm:text-sm font-extrabold text-emerald-600 mt-1">
                      🔥 {deal.discount} Discount
                    </span>
                  )}
                </div>

                {/* Promo Code Box */}
                {deal.promoCode && (
                  <div className="my-4 p-3.5 bg-indigo-50/70 border border-dashed border-indigo-300 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-indigo-500 font-bold block">Coupon Code</span>
                      <span className="text-sm font-mono font-extrabold text-indigo-900">{deal.promoCode}</span>
                    </div>
                    <button
                      onClick={() => handleCopyCode(deal.promoCode!)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 ${
                        copied ? 'bg-emerald-600 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {copied ? '✓ Copied!' : 'Copy Code'}
                    </button>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                  {deal.description}
                </p>

                {/* Highlights */}
                {deal.features && deal.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Deal Highlights</h4>
                    <ul className="space-y-1.5">
                      {deal.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <span className="text-indigo-600 font-bold">✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* ShopVibee Smart Guidance Box */}
                {guidance && (
                  <div className="mt-5 p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 via-amber-50/30 to-indigo-50/50 border border-amber-200/80 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2 text-amber-900 font-black text-xs sm:text-sm uppercase tracking-wider">
                        <FaLightbulb className="text-amber-500 text-base animate-pulse" />
                        <span>ShopVibee Guidance</span>
                      </div>
                      {guidance.bestFor && (
                        <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <FaUserCheck className="text-[9px]" /> {guidance.bestFor}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 text-xs text-gray-700 leading-relaxed">
                      <div className="bg-white/80 backdrop-blur-sm p-2.5 rounded-xl border border-amber-100">
                        <p className="font-medium text-gray-800">
                          <strong className="text-amber-800 font-bold">Why Buy This Deal? </strong>
                          {guidance.whyBuy}
                        </p>
                      </div>

                      <div className="flex items-start gap-2 pt-0.5 text-emerald-800 font-medium">
                        <FaCheckCircle className="text-emerald-600 text-sm flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] sm:text-xs">
                          <strong className="font-bold">Verdict: </strong>
                          {guidance.verdict}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Affiliate Redirect CTA Button */}
              <div ref={mainBuyRef} className="mt-8 pt-4 border-t border-gray-100">
                <a
                  href={deal.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerToast(`Redirecting to secure affiliate store (${deal.store})... 🚀`)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold py-4 rounded-2xl shadow-xl shadow-indigo-600/30 transition-all duration-300 text-sm sm:text-base active:scale-95 hover:scale-[1.01]"
                >
                  <FaBolt className="text-amber-300" />
                  <span>Buy Now on {deal.store} &rarr;</span>
                </a>
                <p className="text-[10px] text-center text-gray-400 mt-2 flex items-center justify-center gap-1">
                  <FaShieldAlt className="text-emerald-500" /> Secure affiliate redirection • Best verified price
                </p>
              </div>

            </div>
          </div>

          {/* Related / Similar Products Section */}
          {relatedDeals.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 border-l-4 border-indigo-600 pl-3">
                  {searchQuery ? `Search Results in ${deal.category}` : `Similar ${deal.category} Deals`} ⚡
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedDeals.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    onClick={() => router.push(`/deal/${item.id}`)}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1"
                  >
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                        {item.discount}
                      </span>
                    </div>
                    <div className="p-3 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[9px] font-semibold uppercase tracking-wider text-indigo-600">
                          {item.store}
                        </span>
                        <h4 className="font-semibold text-gray-900 text-xs mt-0.5 line-clamp-1 group-hover:text-indigo-600 transition">
                          {item.title}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-2">
                          <span className="text-xs font-bold text-gray-900">{item.price}</span>
                          <span className="text-[10px] text-gray-400 line-through">{item.originalPrice}</span>
                        </div>
                      </div>
                      <span className="mt-3 block w-full text-center bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white text-indigo-700 font-semibold py-1.5 rounded-xl text-[10px] transition">
                        View Deal &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchQuery && relatedDeals.length === 0 && (
            <div className="mt-12 text-center py-12 bg-white rounded-2xl border border-gray-100">
              <p className="text-sm text-gray-500">No matching products found in "{deal.category}" for "{searchQuery}".</p>
            </div>
          )}
        </main>
      </div>

      {/* Floating Sticky Buy Bar */}
      {!isMainBuyVisible && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto bg-white/95 backdrop-blur-xl border border-gray-100 p-3 sm:p-4 rounded-3xl shadow-2xl transition-all duration-300 animate-slide-up">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <img 
                src={productImages[activeImage]} 
                alt={deal.title} 
                className="w-12 h-12 rounded-2xl object-cover border border-gray-100 flex-shrink-0 shadow-sm" 
              />
              <div className="overflow-hidden">
                <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">{deal.title}</h4>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-indigo-600">{deal.price}</span>
                    {deal.originalPrice && <span className="text-[11px] text-gray-400 line-through">{deal.originalPrice}</span>}
                  </div>
                  {deal.discount && (
                    <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded border border-emerald-200">
                      {deal.discount}🔥
                    </span>
                  )}
                </div>
              </div>
            </div>
            <a
              href={deal.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerToast(`Redirecting to secure affiliate store (${deal.store})... 🚀`)}
              className="flex-shrink-0 flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white font-extrabold px-5 sm:px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg shadow-indigo-600/30 active:scale-95 transition-all duration-300 hover:scale-[1.02]"
            >
              <FaBolt className="text-amber-300 text-sm animate-pulse" />
              <span>Buy Now on {deal.store} &rarr;</span>
            </a>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} ShopVibee Deals. All affiliate rights reserved.</p>
      </footer>
    </div>
  );
}