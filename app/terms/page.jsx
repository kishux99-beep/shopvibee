'use client';

import Link from 'next/link';
import { FaArrowLeft, FaFileContract, FaCheckCircle, FaShieldAlt, FaHandshake } from 'react-icons/fa';

export default function TermsOfService() {
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
            Legal & Policy
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        
        {/* Page Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
            <FaFileContract />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Terms of Service
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-500">
            Last updated: 2026 • Please read these terms carefully before using ShopVibee.
          </p>
        </div>

        {/* Content Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</span>
              Welcome to ShopVibee
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              Welcome to ShopVibee! These terms and conditions outline the rules and regulations for the use of ShopVibee's website, located at shopvibee.in. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use ShopVibee if you do not agree to all of the terms stated on this page.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</span>
              Cookies & Tracking
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              We employ the use of cookies. By accessing ShopVibee, you agreed to use cookies in agreement with the Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</span>
              Affiliate Links & Disclaimer
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              ShopVibee participates in affiliate marketing programs. This means that when you click on certain product links or use promo codes provided on our site and make a purchase, we may earn a small commission at zero additional cost to you. We strive to curate genuine fitness and electronics deals, but we are not directly responsible for third-party merchant transactions, pricing updates, or product shipments.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">4</span>
              User License & Restrictions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              Unless otherwise stated, ShopVibee and/or its licensors own the intellectual property rights for all material on ShopVibee. All intellectual property rights are reserved. You may access this from ShopVibee for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
          </section>

        </div>

        {/* Back to Home CTA Box */}
        <div className="mt-8 bg-indigo-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-200">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Have questions about our terms?</h3>
            <p className="text-xs text-indigo-100 mt-0.5">Feel free to reach out to our team via our contact portal.</p>
          </div>
          <Link
            href="/contact"
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm transition shadow-sm whitespace-nowrap"
          >
            Contact Support
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