'use client';

import { useState, use, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { initialDeals, Deal } from '@/data/deals';
import { flashDealsData, FlashDeal } from '@/data/flashDeals';
import { topDealsData, TopDeal } from '@/data/topDeals';
import logo from '@/public/logo.png';
import { FaArrowLeft, FaShieldAlt, FaBolt, FaHeart, FaShareAlt } from 'react-icons/fa';

export default function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const dealId = Number(resolvedParams.id);

  // Sabhi data sources se deal ko find karna
  const allDeals: (Deal | FlashDeal | TopDeal)[] = [
    ...initialDeals,
    ...flashDealsData,
    ...topDealsData,
  ];

  const deal = allDeals.find((d) => d.id === dealId);

  // 🚀 Multiple Images Array Handling
  const productImages = (deal as any)?.images || [deal?.image, deal?.image, deal?.image];
  const [activeImage, setActiveImage] = useState(0);

  const [copied, setCopied] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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
    const swipeThreshold = 50; // minimum distance for swipe
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      // Swiped Left -> Next Image
      setActiveImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
      // Swiped Right -> Previous Image
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

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Deal Not Found ❌</h2>
        <p className="text-sm text-gray-500 mb-6">The deal you are looking for might have expired or removed.</p>
        <Link href="/" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md">
          Back to Home 🏠
        </Link>
      </div>
    );
  }

  // Same category ke related products filter karna (current product ko chhod kar)
  const relatedDeals = allDeals.filter(
    (d) => d.category === deal.category && d.id !== deal.id
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-bounce">
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Image src={logo} alt="ShopVibee Logo" className="h-12 sm:h-16 w-auto object-contain" priority />
            </Link>
            <Link href="/" className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-2 rounded-xl transition">
              <FaArrowLeft /> Back to Deals
            </Link>
          </div>
        </header>

        {/* Main Affiliate Product Section */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
            
            {/* 🚀 Left: Interactive Mobile Swipe & Click Slider */}
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
                  {deal.discount} OFF
                </span>
                <span className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md z-10">
                  Store: {deal.store}
                </span>

                {/* Left & Right Slide Navigation Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center transition opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 text-sm font-bold"
                      aria-label="Previous Image"
                    >
                      &lt;
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center transition opacity-80 sm:opacity-0 sm:group-hover:opacity-100 z-20 text-sm font-bold"
                      aria-label="Next Image"
                    >
                      &gt;
                    </button>
                  </>
                )}
              </div>

              {/* Pagination Dots & Wishlist/Share Row */}
              <div className="flex items-center justify-between px-2">
                {/* Interactive Pagination Dots */}
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

                {/* Wishlist & Share Action Buttons */}
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

                <div className="flex items-baseline gap-3 my-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{deal.price}</span>
                  {deal.originalPrice && (
                    <span className="text-base text-gray-400 line-through">{deal.originalPrice}</span>
                  )}
                </div>

                {/* Promo Code Box if available */}
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
              </div>

              {/* Affiliate Redirect CTA Button */}
              <div className="mt-8 pt-4 border-t border-gray-100">
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
                  Similar {deal.category} Deals ⚡
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {relatedDeals.map((item) => (
                  <div
                    key={item.id}
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
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 mt-12 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} ShopVibee Deals. All affiliate rights reserved.</p>
      </footer>
    </div>
  );
}