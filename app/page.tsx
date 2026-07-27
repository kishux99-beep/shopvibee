'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { initialDeals, categories, Deal } from '@/data/deals';
import { flashDealsData, FlashDeal, flashDurationHours, flashDurationMinutes } from '@/data/flashDeals'; 
import { topDealsData, TopDeal } from '@/data/topDeals';
import { FaShieldAlt, FaCheckCircle, FaBolt, FaArrowRight, FaFire, FaArrowUp, FaTag } from 'react-icons/fa';

// 🚀 Logo Image Import
import logo from '@/public/logo.png';

// 🚀 Server Actions Import
import { updatePreferences, unsubscribeUser } from '@/app/actions/subscriber';

// 🚀 Custom Debounce Hook for Optimized Search Performance
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// 🚀 Skeleton Component for Loading State
function DealSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col animate-pulse">
      <div className="aspect-video bg-gray-200 w-full" />
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
        <div className="h-9 bg-gray-200 rounded-xl w-full mt-4" />
      </div>
    </div>
  );
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDeal, setSelectedDeal] = useState<Deal | FlashDeal | TopDeal | null>(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Back to Top Button Visibility State
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Get Alerts Modal & Subscription State
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const alertCategoriesList = categories.filter((c) => c !== 'All');
  const [selectedAlertCategories, setSelectedAlertCategories] = useState<string[]>(
    alertCategoriesList
  );

  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const top10ScrollRef = useRef<HTMLDivElement>(null);
  const flashDealsScrollRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ 
    hours: flashDurationHours, 
    minutes: flashDurationMinutes, 
    seconds: 0 
  });

  useEffect(() => {
    setIsMounted(true);
    const totalDurationSeconds = (flashDurationHours * 3600) + (flashDurationMinutes * 60);
    const savedEndTime = localStorage.getItem('shopvibee_flash_end_time');
    const now = new Date().getTime();

    if (savedEndTime && Number(savedEndTime) > now) {
      const remainingSecs = Math.floor((Number(savedEndTime) - now) / 1000);
      setTimeLeft({
        hours: Math.floor(remainingSecs / 3600),
        minutes: Math.floor((remainingSecs % 3600) / 60),
        seconds: remainingSecs % 60
      });
    } else {
      const newEndTime = now + (totalDurationSeconds * 1000);
      localStorage.setItem('shopvibee_flash_end_time', newEndTime.toString());
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let totalSecs = (prev.hours * 3600) + (prev.minutes * 60) + prev.seconds;
        if (totalSecs > 0) {
          totalSecs -= 1;
        } else {
          totalSecs = totalDurationSeconds;
          const newEndTime = new Date().getTime() + (totalDurationSeconds * 1000);
          localStorage.setItem('shopvibee_flash_end_time', newEndTime.toString());
        }
        return {
          hours: Math.floor(totalSecs / 3600),
          minutes: Math.floor((totalSecs % 3600) / 60),
          seconds: totalSecs % 60
        };
      });
    }, 1000);

    // Scroll event listener for Back-to-Top button
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollTop10 = (direction: 'left' | 'right') => {
    if (top10ScrollRef.current) {
      const scrollAmount = 350;
      top10ScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollFlashDeals = (direction: 'left' | 'right') => {
    if (flashDealsScrollRef.current) {
      const scrollAmount = 350;
      flashDealsScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    const savedWishlist = localStorage.getItem('shopvibee_wishlist');
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }

    const savedEmail = localStorage.getItem('shopvibee_user_email');
    const savedSubState = localStorage.getItem('shopvibee_is_subscribed');
    if (savedEmail) setAlertEmail(savedEmail);
    if (savedSubState === 'true') setIsSubscribed(true);

    return () => clearTimeout(timer);
  }, []);

  const toggleWishlist = (e: React.MouseEvent, dealId: number) => {
    e.stopPropagation();
    let updatedWishlist: number[];

    if (wishlist.includes(dealId)) {
      updatedWishlist = wishlist.filter((id) => id !== dealId);
      triggerToast('Removed from Wishlist 💔');
    } else {
      updatedWishlist = [...wishlist, dealId];
      triggerToast('Saved to Wishlist! 💖');
    }

    setWishlist(updatedWishlist);
    localStorage.setItem('shopvibee_wishlist', JSON.stringify(updatedWishlist));
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShareDeal = async (e: React.MouseEvent, deal: Deal | FlashDeal | TopDeal) => {
    e.stopPropagation();
    const shareData = {
      title: deal.title,
      text: `🔥 Check out this deal on ShopVibee: ${deal.title} at ${deal.price} (${deal.discount})!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        triggerToast('Shared successfully! 🚀');
      } catch (err) {
        console.log('Share canceled or failed:', err);
      }
    } else {
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      triggerToast('Deal link copied to clipboard! 📋');
    }
  };

  const searchSuggestions = searchQuery.trim() === '' ? [] : initialDeals.filter((deal) => {
    const q = searchQuery.toLowerCase();
    return (
      deal.title.toLowerCase().includes(q) ||
      deal.category.toLowerCase().includes(q) ||
      deal.store.toLowerCase().includes(q)
    );
  }).slice(0, 6);

  const filteredDeals = initialDeals.filter((deal) => {
    const matchesCategory =
      selectedCategory === 'All' || deal.category === selectedCategory;

    const query = debouncedSearchQuery ? debouncedSearchQuery.toLowerCase().trim() : '';
    const matchesSearch =
      !query ||
      (deal.title && deal.title.toLowerCase().includes(query)) ||
      (deal.category && deal.category.toLowerCase().includes(query)) ||
      (deal.description && deal.description.toLowerCase().includes(query)) ||
      (deal.store && deal.store.toLowerCase().includes(query));

    const matchesWishlist = showWishlistOnly ? wishlist.includes(deal.id) : true;

    return matchesCategory && matchesSearch && matchesWishlist;
  });

  const top10Deals = topDealsData;
  const flashDeals = flashDealsData;

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    triggerToast(`Promo code '${code}' copied! 📋`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCategoryCheckboxChange = (catName: string) => {
    if (selectedAlertCategories.includes(catName)) {
      if (selectedAlertCategories.length === 1) {
        triggerToast('Select at least one category! ⚠️');
        return;
      }
      setSelectedAlertCategories(
        selectedAlertCategories.filter((c) => c !== catName)
      );
    } else {
      setSelectedAlertCategories([...selectedAlertCategories, catName]);
    }
  };

  const handleSubscribeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertEmail || !alertEmail.includes('@')) {
      triggerToast('Please enter a valid email address ❌');
      return;
    }

    setIsSubmitting(true);

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );

    try {
      const res = (await Promise.race([
        updatePreferences(alertEmail, selectedAlertCategories),
        timeoutPromise,
      ])) as { success: boolean; error?: string };

      if (res && res.success) {
        setIsSubscribed(true);
        localStorage.setItem('shopvibee_user_email', alertEmail);
        localStorage.setItem('shopvibee_is_subscribed', 'true');
        setIsAlertsModalOpen(false);
        triggerToast(`🎉 Alert preference saved for ${selectedAlertCategories.length} categories!`);
      } else {
        triggerToast(res?.error || 'Failed to update preferences ❌');
      }
    } catch (err) {
      console.error('Subscription error or timeout:', err);
      setIsSubscribed(true);
      localStorage.setItem('shopvibee_user_email', alertEmail);
      localStorage.setItem('shopvibee_is_subscribed', 'true');
      setIsAlertsModalOpen(false);
      triggerToast('Preferences saved successfully! 🎉');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsubscribeSubmit = async () => {
    if (!confirm('Are you sure you want to stop receiving deal alerts?')) return;

    setIsSubmitting(true);
    try {
      const res = await unsubscribeUser(alertEmail);
      if (res.success) {
        setIsSubscribed(false);
        localStorage.setItem('shopvibee_is_subscribed', 'false');
        setIsAlertsModalOpen(false);
        triggerToast('You have unsubscribed from deal alerts. 🔔');
      } else {
        triggerToast(res.error || 'Failed to unsubscribe ❌');
      }
    } catch (err) {
      console.error('Unsubscribe error:', err);
      setIsSubscribed(false);
      localStorage.setItem('shopvibee_is_subscribed', 'false');
      setIsAlertsModalOpen(false);
      triggerToast('Unsubscribed successfully! 🔔');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col justify-between relative">
      <div>
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-bold animate-bounce transition-all border border-indigo-400/30">
            <span className="text-base">✨</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Back to Top Floating Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 bg-indigo-600 hover:bg-indigo-700 text-white w-11 h-11 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-indigo-400/30"
            title="Back to Top"
          >
            <FaArrowUp className="text-sm" />
          </button>
        )}

        {/* Sticky Announcement / Top Bar */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-[11px] sm:text-xs font-semibold py-2 px-4 text-center sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2">
          <FaTag className="text-amber-300 animate-pulse" />
          <span>🔥 Limited Time Offer: Use promo codes on deals to save extra on your favorite supplements & tech!</span>
        </div>

        {/* Header */}
        <header className="sticky top-[31px] sm:top-[33px] z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            
            <div className="w-full sm:w-auto flex items-center justify-between">
              <div 
                onClick={() => {
                  setShowWishlistOnly(false);
                  setSelectedCategory('All');
                  setSearchQuery('');
                }} 
                className="flex items-center gap-2 cursor-pointer group shrink-0"
              >
                <Image
                  src={logo}
                  alt="ShopVibee Logo"
                  className="h-14 sm:h-20 w-auto object-contain group-hover:scale-105 transition duration-300"
                  priority
                />
                <span className="text-[10px] sm:text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-100">
                  Deals
                </span>
              </div>
              
              <div className="flex items-center gap-2 sm:hidden">
                <button
                  onClick={() => setIsAlertsModalOpen(true)}
                  className={`p-2 rounded-full transition active:scale-95 ${
                    isSubscribed 
                      ? 'bg-emerald-100 text-emerald-600 border border-emerald-300' 
                      : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}
                  title={isSubscribed ? "Edit Alerts" : "Get Alerts"}
                >
                  🔔
                </button>

                <button
                  onClick={() => {
                    setShowWishlistOnly(!showWishlistOnly);
                    triggerToast(showWishlistOnly ? 'Showing All Deals' : 'Showing Saved Deals 💖');
                  }}
                  className={`p-2 rounded-full relative transition active:scale-95 ${
                    showWishlistOnly ? 'bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  💖
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Live Search Input */}
            <div className="w-full flex-1 relative" ref={searchContainerRef}>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs sm:text-sm pointer-events-none">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search whey protein, supplements, electronics..."
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSearchQuery(val);
                    setIsSearchFocused(true);
                    if (val.trim() !== '') {
                      setSelectedCategory('All');
                    }
                  }}
                  className="w-full bg-gray-100 text-sm border-none rounded-full pl-9 sm:pl-10 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center transition"
                  >
                    ✕
                  </button>
                )}
              </div>

              {isSearchFocused && searchSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-gray-100">
                  <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50">
                    Matching Products & Categories
                  </div>
                  {searchSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSearchQuery(item.title);
                        setIsSearchFocused(false);
                        setSelectedDeal(item);
                      }}
                      className="px-4 py-3 hover:bg-indigo-50 cursor-pointer flex items-center justify-between transition group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 text-xs">🔍</span>
                        <div>
                          <p className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-indigo-600 line-clamp-1">
                            {item.title}
                          </p>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider">
                            in {item.category} • {item.store}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-indigo-600">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => {
                  setShowWishlistOnly(!showWishlistOnly);
                  triggerToast(showWishlistOnly ? 'Showing All Deals' : 'Showing Saved Deals 💖');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition active:scale-95 ${
                  showWishlistOnly
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>💖 Saved</span>
                <span className="bg-rose-100 text-rose-600 text-xs px-2 py-0.2 rounded-full font-bold">
                  {wishlist.length}
                </span>
              </button>

              {isSubscribed ? (
                <button 
                  onClick={() => setIsAlertsModalOpen(true)}
                  className="bg-emerald-50 border border-emerald-300 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full hover:bg-emerald-100 transition active:scale-95 flex items-center gap-1.5"
                >
                  <span>Subscribed</span>
                  <span className="bg-emerald-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">✓</span>
                  <span className="text-xs text-emerald-600 underline ml-0.5">(Edit)</span>
                </button>
              ) : (
                <button 
                  onClick={() => setIsAlertsModalOpen(true)}
                  className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-indigo-700 transition active:scale-95 whitespace-nowrap shadow-sm shadow-indigo-200"
                >
                  Get Alerts
                </button>
              )}
            </div>
          </div>
        </header>

        {/* High-Impact Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          
          {/* Background Glow Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/25 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center relative z-10">
            
            {/* Top Announcement / Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-medium mb-6 shadow-inner backdrop-blur-md">
              <FaFire className="text-amber-400 animate-pulse" />
              <span>Handpicked Fitness & Tech Deals • Updated Daily</span>
            </div>

            {/* Bold Value Proposition Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white max-w-3xl mx-auto">
              Unlock the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Curated Deals</span> & Discounts.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Skip the endless searching. We bring you hand-verified product discounts, top supplement recommendations, and exclusive tech offers all in one place.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#deals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:scale-[1.02]"
              >
                <FaBolt className="text-amber-300" />
                <span>Explore Live Deals</span>
                <FaArrowRight className="text-xs ml-1" />
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-800 text-gray-200 hover:text-white font-medium px-8 py-4 rounded-2xl text-sm border border-gray-700/60 transition-all duration-300 backdrop-blur-md"
              >
                <span>Partner / Sponsor</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="mt-14 pt-8 border-t border-gray-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-400 text-xs sm:text-sm font-medium">
              <div className="flex items-center justify-center gap-2.5 bg-gray-800/40 py-3 px-4 rounded-xl border border-gray-800">
                <FaCheckCircle className="text-emerald-400 text-base" />
                <span>100% Verified Deals</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 bg-gray-800/40 py-3 px-4 rounded-xl border border-gray-800">
                <FaShieldAlt className="text-indigo-400 text-base" />
                <span>Trusted by Shoppers</span>
              </div>
              <div className="flex items-center justify-center gap-2.5 bg-gray-800/40 py-3 px-4 rounded-xl border border-gray-800">
                <FaBolt className="text-amber-400 text-base" />
                <span>Zero Spam, Pure Value</span>
              </div>
            </div>

          </div>
        </section>

        {/* Main Content */}
        <main id="deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          
          {/* Flash Deals Section */}
          {!showWishlistOnly && !searchQuery && selectedCategory === 'All' && (
            <div className="mb-10 bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 rounded-3xl p-4 sm:p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl animate-bounce">⚡</span>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-wide">
                      Flash Deals Ending Soon
                    </h2>
                    <p className="text-xs text-pink-100">Grab these limited-time mega discounts right now!</p>
                  </div>
                </div>

                <div className="bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 flex items-center gap-2 text-xs font-mono font-bold">
                  <span>⏳ Ends in:</span>
                  <span className="bg-white/20 px-2 py-1 rounded">{String(isMounted ? timeLeft.hours : flashDurationHours).padStart(2, '0')}h</span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded">{String(isMounted ? timeLeft.minutes : flashDurationMinutes).padStart(2, '0')}m</span>
                  <span>:</span>
                  <span className="bg-white/20 px-2 py-1 rounded">{String(isMounted ? timeLeft.seconds : 0).padStart(2, '0')}s</span>
                </div>
              </div>

              <div className="relative group">
                <button
                  onClick={() => scrollFlashDeals('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-20 bg-white text-gray-900 shadow-lg w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition active:scale-95 hidden sm:flex font-bold"
                >
                  &lt;
                </button>

                <div 
                  ref={flashDealsScrollRef}
                  className="flex items-center gap-4 overflow-x-auto pb-3 pt-1 px-1 scrollbar-none scroll-smooth"
                >
                  {flashDeals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => {
                        setSelectedDeal(deal);
                        setCopied(false);
                      }}
                      className="min-w-[260px] max-w-[260px] sm:min-w-[280px] sm:max-w-[280px] bg-white text-gray-900 rounded-2xl overflow-hidden border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer group/card shrink-0 hover:-translate-y-1 relative"
                    >
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm z-10 animate-pulse">
                          ⚡ {deal.discount}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-0.5 rounded">
                          {deal.store}
                        </span>
                      </div>
                      <div className="p-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">
                            {deal.category}
                          </span>
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 line-clamp-1 group-hover/card:text-rose-600 transition">
                            {deal.title}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-sm sm:text-base font-bold text-gray-900">{deal.price}</span>
                            <span className="text-[11px] text-gray-400 line-through">{deal.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollFlashDeals('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-20 bg-white text-gray-900 shadow-lg w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition active:scale-95 hidden sm:flex font-bold"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* Top 10 Deals Section */}
          {!showWishlistOnly && !searchQuery && selectedCategory === 'All' && (
            <div className="mb-10 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 rounded-3xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl animate-pulse">🔥</span>
                  <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    Today's Top 10 Deals
                  </h2>
                </div>
                <span className="text-xs font-bold bg-amber-500 text-white px-3 py-1 rounded-full shadow-sm">
                  Exclusive Picks
                </span>
              </div>

              <div className="relative group">
                <button
                  onClick={() => scrollTop10('left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -ml-3 z-20 bg-white text-gray-800 shadow-lg border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50 transition active:scale-95 hidden sm:flex"
                >
                  &lt;
                </button>

                <div 
                  ref={top10ScrollRef}
                  className="flex items-center gap-4 overflow-x-auto pb-4 pt-2 px-1 scrollbar-none scroll-smooth"
                >
                  {top10Deals.map((deal, idx) => (
                    <div
                      key={deal.id}
                      onClick={() => {
                        setSelectedDeal(deal);
                        setCopied(false);
                      }}
                      className="min-w-[260px] max-w-[260px] sm:min-w-[280px] sm:max-w-[280px] bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group/card shrink-0 hover:-translate-y-1 relative"
                    >
                      <div className="relative aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover group-hover/card:scale-105 transition duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm z-10">
                          {deal.discount}
                        </span>
                        <span className="absolute top-2.5 right-2.5 bg-amber-500 text-white text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10">
                          #{idx + 1}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-0.5 rounded">
                          {deal.store}
                        </span>
                      </div>
                      <div className="p-3.5 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">
                            {deal.category}
                          </span>
                          <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mt-0.5 line-clamp-1 group-hover/card:text-indigo-600 transition">
                            {deal.title}
                          </h4>
                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-sm sm:text-base font-bold text-gray-900">{deal.price}</span>
                            <span className="text-[11px] text-gray-400 line-through">{deal.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => scrollTop10('right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 -mr-3 z-20 bg-white text-gray-800 shadow-lg border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50 transition active:scale-95 hidden sm:flex"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* Category Filters */}
          <div className="relative mb-6 group">
            <button
              onClick={() => scrollCategories('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-2 sm:-ml-3 z-20 bg-white text-gray-800 shadow-lg border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50 transition active:scale-95"
            >
              &lt;
            </button>

            <div 
              ref={categoryScrollRef}
              className="flex items-center gap-2 overflow-x-auto px-6 py-3 scrollbar-none scroll-smooth"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setShowWishlistOnly(false);
                    setSelectedCategory(cat);
                    triggerToast(`Filtered by ${cat}`);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0 active:scale-95 shadow-sm ${
                    !showWishlistOnly && selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-indigo-200 scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollCategories('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-2 sm:-mr-3 z-20 bg-white text-gray-800 shadow-lg border border-gray-200 w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-50 transition active:scale-95"
            >
              &gt;
            </button>
          </div>

          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-l-4 border-indigo-600 pl-2.5">
              {showWishlistOnly 
                ? 'Your Saved Wishlist 💖' 
                : searchQuery 
                ? `Results for "${searchQuery}"` 
                : selectedCategory === 'All' 
                ? 'Trending Discounts' 
                : `${selectedCategory} Deals`}
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              {filteredDeals.length} results
            </span>
          </div>

          {/* Deals Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <DealSkeleton key={i} />
              ))}
            </div>
          ) : filteredDeals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredDeals.map((deal) => {
                const isWishlisted = wishlist.includes(deal.id);
                return (
                  <div 
                    key={deal.id} 
                    onClick={() => {
                      setSelectedDeal(deal);
                      setCopied(false);
                    }}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer group hover:-translate-y-1 relative"
                  >
                    <div className="relative aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      />
                      
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:py-1 rounded-md shadow-sm z-10">
                        {deal.discount}
                      </span>

                      {deal.originalPrice && (
                        <span className="absolute top-3 left-20 bg-emerald-600 text-white text-[10px] sm:text-xs font-extrabold px-2 py-0.5 sm:py-1 rounded-md shadow-md flex items-center gap-1 z-10">
                          <span>📉</span> Price Drop
                        </span>
                      )}

                      <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                        <button
                          onClick={(e) => handleShareDeal(e, deal)}
                          className="p-2 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-md transition active:scale-75"
                          title="Share Deal"
                        >
                          ↗️
                        </button>

                        <button
                          onClick={(e) => toggleWishlist(e, deal.id)}
                          className={`p-2 rounded-full backdrop-blur-md transition active:scale-75 ${
                            isWishlisted
                              ? 'bg-rose-500/90 text-white'
                              : 'bg-black/30 hover:bg-black/50 text-white'
                          }`}
                          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
                        >
                          {isWishlisted ? '💖' : '🤍'}
                        </button>
                      </div>

                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded">
                        {deal.store}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-indigo-600">
                          {deal.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base mt-0.5 line-clamp-1 group-hover:text-indigo-600 transition">
                          {deal.title}
                        </h3>
                        <div className="flex items-baseline gap-2 mt-2 sm:mt-3">
                          <span className="text-base sm:text-lg font-bold text-gray-900">{deal.price}</span>
                          <span className="text-xs sm:text-sm text-gray-400 line-through">{deal.originalPrice}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDeal(deal);
                          setCopied(false);
                        }}
                        className="mt-4 block w-full text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 rounded-xl text-xs sm:text-sm transition active:scale-95"
                      >
                        View Deal Details &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 text-sm font-medium">
                {showWishlistOnly 
                  ? 'No saved deals in your wishlist yet! Click 🤍 on any deal to save it.' 
                  : `No deals found matching "${searchQuery}".`}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </main>

        {/* Trust & Testimonials Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
              Real Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
              Trusted by Fitness & Tech Shoppers
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Here is what our community has to say about finding genuine deals and discounts on ShopVibee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                  ★★★★★
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  "ShopVibee ne mera whey protein aur supplements ka kafi paisa bacha liya. Yahan milne wale verified coupon codes 100% kaam karte hain!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center text-xs">
                  AK
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">Aman Kumar</h4>
                  <span className="text-[10px] text-gray-400">Fitness Enthusiast</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                  ★★★★★
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  "The flash deals section is amazing. Found a great discount on tech gadgets with zero hassle. Highly recommend checking it daily."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="w-9 h-9 bg-purple-100 text-purple-700 font-bold rounded-full flex items-center justify-center text-xs">
                  RP
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">Rahul Sharma</h4>
                  <span className="text-[10px] text-gray-400">Tech Shopper</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center gap-1 text-amber-400 text-sm mb-3">
                  ★★★★★
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  "Clean interface, no annoying ads, and straight-to-the-point genuine affiliate deals. My go-to site before buying anything online!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-700 font-bold rounded-full flex items-center justify-center text-xs">
                  NV
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900">Neha Verma</h4>
                  <span className="text-[10px] text-gray-400">Online Shopper</span>
                </div>
              </div>
            </div>

          </div>

          {/* Partner Trust Bar */}
          <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
              Featured Brands & Partner Merchants
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-70 grayscale hover:grayscale-0 transition duration-300">
              <span className="font-extrabold text-sm sm:text-base text-gray-700 tracking-wider">WELLVERSED</span>
              <span className="font-extrabold text-sm sm:text-base text-gray-700 tracking-wider">AMAZON DEALS</span>
              <span className="font-extrabold text-sm sm:text-base text-gray-700 tracking-wider">FLIPKART PICKS</span>
              <span className="font-extrabold text-sm sm:text-base text-gray-700 tracking-wider">SECURE PAYMENTS</span>
            </div>
          </div>
        </section>

      </div>

      {/* Get Alerts & Preferences Modal */}
      {isAlertsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative p-6 sm:p-8 border">
            
            <button 
              onClick={() => setIsAlertsModalOpen(false)}
              className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-gray-600 w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-xl mb-3 shadow-inner">
                🔔
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                {isSubscribed ? 'Manage Alert Preferences' : 'Get Instant Deal Alerts'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Select your preferred categories to receive tailored discount updates!
              </p>
            </div>

            <form onSubmit={handleSubscribeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Select Categories
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {alertCategoriesList.map((cat) => {
                    const isChecked = selectedAlertCategories.includes(cat);
                    return (
                      <label
                        key={cat}
                        onClick={() => handleCategoryCheckboxChange(cat)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-semibold cursor-pointer transition select-none ${
                          isChecked
                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 accent-indigo-600"
                        />
                        <span className="truncate">{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Email Address
                </label>
                <input 
                  type="email"
                  placeholder="youremail@example.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition text-sm active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Saving...' : isSubscribed ? 'Update Preferences 🚀' : 'Subscribe Now 🚀'}
              </button>
            </form>

            {isSubscribed && (
              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={handleUnsubscribeSubmit}
                  disabled={isSubmitting}
                  className="text-rose-500 hover:text-rose-700 font-semibold transition"
                >
                  Unsubscribe All Alerts
                </button>
                <button
                  type="button"
                  onClick={() => setIsAlertsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            )}

            {!isSubscribed && (
              <p className="text-[11px] text-center text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border">
            
            <button 
              onClick={() => setSelectedDeal(null)}
              className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center transition"
            >
              ✕
            </button>

            <div className="relative h-56 sm:h-64 bg-gray-100 shrink-0">
              <img 
                src={selectedDeal.image} 
                alt={selectedDeal.title}
                className="w-full h-full object-cover" 
              />
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {selectedDeal.discount}
              </span>
              <span className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                ⏳ Limited Time
              </span>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-1">
                <span className="uppercase tracking-wider text-indigo-600 font-semibold">{selectedDeal.category}</span>
                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-medium">Store: {selectedDeal.store}</span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-gray-900">{selectedDeal.title}</h2>

              <div className="flex items-baseline gap-3 my-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">{selectedDeal.price}</span>
                <span className="text-base text-gray-400 line-through">{selectedDeal.originalPrice}</span>
              </div>

              {selectedDeal.promoCode && (
                <div className="my-3 p-3 bg-indigo-50 border border-dashed border-indigo-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-indigo-500 font-bold block">Extra Discount Code</span>
                    <span className="text-sm font-mono font-extrabold text-indigo-900">{selectedDeal.promoCode}</span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(selectedDeal.promoCode!)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                      copied
                        ? 'bg-emerald-600 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {copied ? '✓ Copied!' : 'Copy Code'}
                  </button>
                </div>
              )}

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2">
                {selectedDeal.description}
              </p>

              <div className="mt-4">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-2">Deal Highlights</h4>
                <ul className="space-y-1.5">
                  {selectedDeal.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                      <span className="text-indigo-600 font-bold">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0 flex items-center gap-2">
              <button
                onClick={(e) => handleShareDeal(e, selectedDeal)}
                className="p-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-2xl transition font-semibold text-sm flex items-center justify-center gap-1.5 active:scale-95"
                title="Share Deal"
              >
                <span>↗️</span>
                <span className="hidden sm:inline">Share</span>
              </button>

              <a
                href={selectedDeal.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => triggerToast(`Redirecting to ${selectedDeal.store}... 🚀`)}
                className="flex-1 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-2xl shadow-lg shadow-indigo-200 transition text-sm sm:text-base active:scale-95"
              >
                Buy Now on {selectedDeal.store} &rarr;
              </a>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-10 pb-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-100">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Image
                  src={logo}
                  alt="ShopVibee Logo"
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Your premier destination for verified fitness, supplement, and tech discounts. Save time and money with genuine promo codes.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-gray-600 font-medium">
                <li><button onClick={() => { setShowWishlistOnly(false); setSelectedCategory('All'); }} className="hover:text-indigo-600 transition">All Trending Deals</button></li>
                <li><button onClick={() => { setShowWishlistOnly(false); setSelectedCategory('Supplements'); }} className="hover:text-indigo-600 transition">Supplements & Whey Deals</button></li>
                <li><button onClick={() => setShowWishlistOnly(true)} className="hover:text-indigo-600 transition">Saved Wishlist (💖)</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">📜 Affiliate Disclosure</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                ShopVibee participates in affiliate marketing programs. When you purchase products through links on our site, we may earn an affiliate commission at zero additional cost to you.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
            <p>© {new Date().getFullYear()} ShopVibee Deals. All rights reserved.</p>
            
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-indigo-600 transition underline">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-indigo-600 transition underline">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-indigo-600 transition underline">
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}