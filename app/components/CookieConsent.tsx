'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCookieBite } from 'react-icons/fa';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('shopvibee_cookie_consent');
    if (!consent) {
      // Page load hone ke 1.5 second baad smooth appear hoga
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('shopvibee_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('shopvibee_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-gray-200/80 transition-all duration-500 animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl shrink-0 mt-0.5 border border-amber-200/50">
          <FaCookieBite className="text-xl" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-gray-900">We value your privacy</h4>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1 leading-relaxed">
            We use cookies to improve your browsing experience and provide personalized deal recommendations. Read our{' '}
            <Link href="/privacy" className="text-indigo-600 underline font-semibold hover:text-indigo-700">
              Privacy Policy
            </Link>.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={handleAccept}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition active:scale-95 shadow-sm shadow-indigo-200"
            >
              Accept All
            </button>
            <button
              onClick={handleDecline}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold rounded-xl transition active:scale-95"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}