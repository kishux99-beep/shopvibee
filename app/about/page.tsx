'use client';

import Link from 'next/link';
import { FaArrowLeft, FaInfoCircle, FaShieldAlt, FaRocket, FaHeart } from 'react-icons/fa';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      
      {/* Top Header / Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
            About & Mission
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        
        {/* Page Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
            <FaInfoCircle />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            About ShopVibee
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-500">
            Your ultimate destination for handpicked, verified fitness supplements, tech gadgets, and exclusive online discounts.
          </p>
        </div>

        {/* Content Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</span>
              Who We Are
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              Welcome to <strong>ShopVibee</strong>. We are a dedicated team of fitness enthusiasts and tech researchers committed to making online shopping transparent, affordable, and rewarding. We curate the best deals so you don't have to waste time filtering through spam or expired offers.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</span>
              Our Mission
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              In today's crowded e-commerce space, finding genuine products with real discounts can be overwhelming. Our goal is to cut through the noise and bring you transparent, verified deals, trusted coupon codes, and straightforward price drops so you can save both time and money.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</span>
              Why Trust Us?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              We carefully analyze market prices, partner with trusted merchant networks like Amazon, Flipkart, and Wellversed, and focus heavily on fitness and lifestyle essentials. ShopVibee participates in affiliate programs, ensuring that we earn a small commission on qualifying purchases at no extra cost to you, helping us keep the platform running and free of annoying pop-up ads.
            </p>
          </section>

        </div>

        {/* Back to Home CTA Box */}
        <div className="mt-8 bg-indigo-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-200">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Want to collaborate or partner with us?</h3>
            <p className="text-xs text-indigo-100 mt-0.5">Reach out to our team for sponsorships and business inquiries.</p>
          </div>
          <Link
            href="/contact"
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} ShopVibee Deals. All rights reserved.</p>
      </footer>

    </div>
  );
}