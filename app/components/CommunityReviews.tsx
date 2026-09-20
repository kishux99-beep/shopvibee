'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ChevronDown, 
  SlidersHorizontal, 
  Camera, 
  X, 
  Image as ImageIcon 
} from 'lucide-react';

interface ReviewItem {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  photoUrl?: string | null;
  productName?: string | null;
  store?: string | null;
  isVerified: boolean;
  createdAt: string;
}

interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  breakdown: Record<number, number>;
}

export default function CommunityReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [stats, setStats] = useState<ReviewStats | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'highest' | 'lowest'>('featured');
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    productName: '',
    store: 'Amazon',
    rating: 5,
    comment: '',
    photoUrl: '' // Base64 string yahan store hogi
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const statsRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (statsRef.current && !statsRef.current.contains(event.target as Node)) {
        setIsStatsOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
// 📸 Super Fast Canvas Compression for Base64
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // File ko read karke compress karte hain
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Profile/review photo ke liye perfect width
        const scaleSize = MAX_WIDTH / img.width;
        const targetWidth = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
        const targetHeight = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          // High quality JPEG compression (under 150KB)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
          setFormData((prev) => ({ ...prev, photoUrl: compressedBase64 }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return (b.photoUrl ? 1 : 0) - (a.photoUrl ? 1 : 0);
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) {
      triggerToast('कृपया नाम और रिव्यू विवरण भरें।');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        triggerToast('🎉 आपका रिव्यू सफलतापूर्वक सबमिट हो गया!');
        setIsWriteModalOpen(false);
        setFormData({ name: '', productName: '', store: 'Amazon', rating: 5, comment: '', photoUrl: '' });
        fetchReviews();
      } else {
        triggerToast('रिव्यू सबमिट करने में कोई त्रुटि हुई।');
      }
    } catch (err) {
      triggerToast('इंटरनेट कनेक्शन की जाँच करें।');
    } finally {
      setIsSubmitting(false);
    }
  };

  const total = stats?.totalReviews || reviews.length;
  const avg = stats?.averageRating || 5.0;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-sans">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-xl text-xs sm:text-sm font-bold animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-gray-100">
        
        {/* Rating Summary */}
        <div className="relative" ref={statsRef}>
          <button
            onClick={() => setIsStatsOpen(!isStatsOpen)}
            className="flex items-center gap-3 p-2 rounded-2xl hover:bg-gray-50 transition active:scale-95 group"
          >
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm sm:text-base font-bold text-gray-900">
              {total.toLocaleString()} Reviews
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isStatsOpen ? 'rotate-180' : ''}`} />
          </button>

          {isStatsOpen && (
            <div className="absolute left-0 mt-3 w-80 bg-white border border-gray-100 rounded-3xl shadow-2xl p-6 z-30 animate-in fade-in zoom-in-95">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-black text-gray-900">{avg}</span>
                <span className="text-xs text-gray-400">आउट ऑफ़ 5</span>
              </div>
              <div className="space-y-2.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = stats?.breakdown?.[star] || 0;
                  const percentage = total > 0 ? (count / total) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-3 text-xs">
                      <span className="w-12 font-medium text-gray-600 flex items-center gap-1">
                        {star} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                      </span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="w-8 text-right text-gray-400 font-mono text-[11px]">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-center transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {isSortMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl py-2 z-30 text-xs font-semibold">
                <div className="px-3 py-1.5 text-[10px] text-gray-400 uppercase tracking-wider">Sort by</div>
                <button onClick={() => { setSortBy('featured'); setIsSortMenuOpen(false); }} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${sortBy === 'featured' ? 'text-indigo-600' : 'text-gray-700'}`}>Featured</button>
                <button onClick={() => { setSortBy('newest'); setIsSortMenuOpen(false); }} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${sortBy === 'newest' ? 'text-indigo-600' : 'text-gray-700'}`}>Newest</button>
                <button onClick={() => { setSortBy('highest'); setIsSortMenuOpen(false); }} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${sortBy === 'highest' ? 'text-indigo-600' : 'text-gray-700'}`}>Highest Ratings</button>
                <button onClick={() => { setSortBy('lowest'); setIsSortMenuOpen(false); }} className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${sortBy === 'lowest' ? 'text-indigo-600' : 'text-gray-700'}`}>Lowest Ratings</button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition active:scale-95 flex items-center gap-2"
          >
            <span>Write a review</span>
          </button>
        </div>
      </div>

{/* 🌟 Smart Review Cards Grid (Flash Deal Container Strategy) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 items-start">
        {sortedReviews.slice(0, visibleCount).map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
          >
            {/* 📸 Case 1: Photo Box (Same as Flash Deals Strategy) */}
            {item.photoUrl && (
              <div className="relative aspect-square bg-neutral-50 rounded-2xl overflow-hidden p-3 flex items-center justify-center">
                <img 
                  src={item.photoUrl} 
                  alt={item.productName || 'Product Review'} 
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-300" 
                />

                {/* Floating Store & Product Badge */}
                {item.productName && (
                  <span className="absolute bottom-2.5 right-2.5 left-2.5 bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2.5 py-1 rounded-lg truncate text-center">
                    🛍️ {item.store || 'Amazon'}: {item.productName}
                  </span>
                )}
              </div>
            )}

            {/* 📝 Case 2 & Content Details */}
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                {/* Agar photo nahi hai toh text tag yahan clean dikhega */}
                {!item.photoUrl && item.productName && (
                  <div className="mb-2.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 inline-block truncate max-w-full">
                      🛍️ {item.store || 'Amazon'}: {item.productName}
                    </span>
                  </div>
                )}

                {/* User Info & Verified Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-gray-900 truncate">{item.name}</span>
                    {item.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex text-amber-400 mt-1.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`w-3.5 h-3.5 ${
                        idx < item.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
                      }`} 
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed line-clamp-4">
                  "{item.comment}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔄 Show More / Hide Reviews Toggle */}
      {sortedReviews.length > 4 && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => {
              if (visibleCount < sortedReviews.length) {
                setVisibleCount((prev) => prev + 4);
              } else {
                setVisibleCount(4);
              }
            }}
            className="px-8 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-800 text-xs sm:text-sm font-bold rounded-2xl shadow-sm hover:shadow transition active:scale-95 inline-flex items-center gap-2"
          >
            <span>
              {visibleCount < sortedReviews.length 
                ? 'Show more reviews' 
                : 'Hide reviews'}
            </span>
            <ChevronDown 
              className={`w-4 h-4 transition-transform duration-300 ${
                visibleCount >= sortedReviews.length ? 'rotate-180' : ''
              }`} 
            />
          </button>
        </div>
      )}

      {/* Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsWriteModalOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-lg sm:text-xl font-black text-gray-900">How would you rate this deal?</h3>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setFormData({ ...formData, rating: star })} className="p-1 hover:scale-125 transition active:scale-95">
                    <Star className={`w-8 h-8 ${star <= formData.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 hover:text-amber-200'}`} />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">आपका नाम</label>
                  <input
                    type="text"
                    required
                    placeholder="Gaurav C."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">स्टोर</label>
                  <select
                    value={formData.store}
                    onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Meesho">Meesho</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">प्रोडक्ट का नाम</label>
                <input
                  type="text"
                  placeholder="उदा. Wellcore Creatine ya OnePlus Buds"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* 📸 DIRECT PHOTO UPLOAD UI */}
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">प्रोडक्ट की फोटो (वैकल्पिक)</label>
                
                {!formData.photoUrl ? (
                  <label className="flex flex-col items-center justify-center w-full h-28 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera className="w-7 h-7 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-500 font-semibold">फोटो खींचें या गैलरी से चुनें</p>
                      <p className="text-[10px] text-gray-400 mt-1">(Max size: 2MB)</p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      capture="environment" // Mobile me direct back camera open karne ke liye option
                      className="hidden" 
                      onChange={handleImageChange} 
                    />
                  </label>
                ) : (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                    <img src={formData.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, photoUrl: '' })}
                      className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white p-1.5 rounded-full hover:bg-black transition shadow-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                      <ImageIcon className="w-3 h-3" /> Image Selected
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">आपका अनुभव (रिव्यू)</label>
                <textarea
                  required
                  rows={3}
                  placeholder="ShopVibee से डील मिलने के बाद आपका अनुभव कैसा रहा?"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 text-xs rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs sm:text-sm transition active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? 'सबमिट हो रहा है...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}