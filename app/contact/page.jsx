'use client';

import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaArrowLeft, FaHeadset, FaClock } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/20 to-gray-50 text-gray-900 font-sans flex flex-col justify-between">
      
      {/* Top Header / Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-indigo-600 transition"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
          <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
            ShopVibee Support
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl mx-auto flex items-center justify-center text-2xl mb-4 shadow-inner">
            <FaHeadset />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
            Get in Touch With Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Have questions about our fitness deals, supplement coupon codes, or need assistance? Our team is always here to help you out!
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/+918057717153" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaWhatsapp />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">WhatsApp Chat</h3>
            <p className="text-xs text-gray-500 mb-4">Instant support & quick queries resolution.</p>
            <span className="mt-auto text-xs font-bold text-emerald-600 group-hover:underline flex items-center gap-1">
              Chat on WhatsApp &rarr;
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/shopvibee.in" 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaInstagram />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Instagram DM</h3>
            <p className="text-xs text-gray-500 mb-4">Connect with our community & creators.</p>
            <span className="mt-auto text-xs font-bold text-pink-600 group-hover:underline flex items-center gap-1">
              Message on Instagram &rarr;
            </span>
          </a>

          {/* Email Support Card */}
          <a
            href="mailto:shopvibee.in@gmail.com"
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
          >
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
              <FaEnvelope />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Email Support</h3>
            <p className="text-xs text-gray-500 mb-4">For business, partnerships & detailed queries.</p>
            <span className="mt-auto text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1">
              shopvibee.in@gmail.com &rarr;
            </span>
          </a>

        </div>

        {/* Extra Info Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
              <FaClock />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Response Time</h4>
              <p className="text-xs text-gray-500 mt-0.5">We typically reply within 24 hours on all working days.</p>
            </div>
          </div>
          <Link
            href="/"
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm shadow-lg shadow-indigo-200 transition text-center"
          >
            Explore All Deals
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