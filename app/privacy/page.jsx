'use client';

import Link from 'next/link';
import { FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

export default function PrivacyPolicy() {
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
            Privacy & Trust
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        
        {/* Page Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
            <FaShieldAlt />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-gray-500">
            Last updated: 2026 • Your privacy is critically important to us at ShopVibee.
          </p>
        </div>

        {/* Content Card Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">1</span>
              Introduction
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              At ShopVibee, accessible from shopvibee.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ShopVibee and how we use it to enhance your deal-finding experience.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">2</span>
              Information We Collect
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              We collect information when you subscribe to our deal alerts, interact with our curated discounts, save items to your wishlist, or contact us directly. This may include your email address and category preferences for personalized deal notifications.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">3</span>
              Google AdSense & Cookies
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              Google, as a third-party vendor, uses cookies to serve ads on ShopVibee. Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visits to our site and/or other sites on the Internet.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">4</span>
              Log Files & Analytics
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              ShopVibee follows a standard procedure of using log files to analyze web traffic, including IP addresses, browser types, and date/time stamps.
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">5</span>
              Third-Party Privacy Policies
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-10">
              ShopVibee's Privacy Policy does not apply to other advertisers or merchant websites linked through our affiliate offers. We advise you to consult the respective Privacy Policies of these third-party stores for more detailed information.
            </p>
          </section>

        </div>

        {/* Back to Home CTA Box */}
        <div className="mt-8 bg-indigo-600 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-indigo-200">
          <div>
            <h3 className="font-bold text-base sm:text-lg">Have questions regarding your privacy?</h3>
            <p className="text-xs text-indigo-100 mt-0.5">We are always open to addressing any data concerns you might have.</p>
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