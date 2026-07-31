'use client';

import { FaWhatsapp, FaTelegramPlane, FaBell } from 'react-icons/fa';

export default function SocialAlertsBanner() {
  const handleSocialClick = (platform: 'whatsapp' | 'telegram') => {
    // Yahan par aap apne actual WhatsApp group ya Telegram channel ka link daal sakte hain
    const link = platform === 'whatsapp' 
      ? 'https://whatsapp.com/channel/0029Vb90AINC1Fu2dZh9IQ0E'
      : 'https://t.me/shopvibeein';
    
    window.open(link, '_blank');
  };

  return (
    <div className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Background Glow Effect */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 text-2xl shrink-0 border border-white/10 shadow-inner">
            <FaBell className="animate-bounce" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest bg-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-400/30">
              ⚡ Instant Loot Alerts
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold mt-2 tracking-tight">
              Never Miss a Price Drop Again!
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Join our exclusive WhatsApp & Telegram channels for lightning-fast fitness supplement and tech deal notifications directly on your phone.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => handleSocialClick('telegram')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#229ED9] hover:bg-[#1f8fb-c] text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/20 active:scale-95 hover:scale-105"
          >
            <FaTelegramPlane className="text-lg" />
            <span>Join Telegram Channel</span>
          </button>

          <button
            onClick={() => handleSocialClick('whatsapp')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-95 hover:scale-105"
          >
            <FaWhatsapp className="text-lg" />
            <span>Join WhatsApp Channel</span>
          </button>
        </div>

      </div>
    </div>
  );
}