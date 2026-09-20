'use client';

import { useState } from 'react';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Jab video poori tarah play ho kar khatam hogi, tab yeh function chalega
  const handleVideoEnded = () => {
    setFadeOut(true);
    setTimeout(() => {
      setLoading(false);
    }, 600); // Fade out transition duration
  };

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Mobile Screen ke liye optimized view */}
      <div className="block sm:hidden w-full h-full flex items-center justify-center p-4 bg-white">
        <video
          src="/logo-animation.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="max-w-full max-h-[80vh] w-auto h-auto object-contain drop-shadow-md"
        />
      </div>

      {/* Laptop / Computer Screen ke liye optimized view (Quality fatne se bachane ke liye) */}
      <div className="hidden sm:flex w-full h-full items-center justify-center bg-white p-8">
        <video
          src="/logo-animation.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnded}
          className="max-w-4xl max-h-[85vh] w-auto h-auto object-contain drop-shadow-xl"
        />
      </div>
    </div>
  );
}