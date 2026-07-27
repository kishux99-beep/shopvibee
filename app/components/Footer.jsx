import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        
        {/* Copyright Text */}
        <p className="mb-4 md:mb-0">
          © 2026 ShopVibee Deals. All rights reserved.
        </p>
        
        {/* Active Footer Links */}
        <div className="flex items-center space-x-4">
          <Link href="/privacy" className="hover:text-blue-600 transition">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-blue-600 transition">
            Terms of Service
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact Us
          </Link>
        </div>

      </div>
    </footer>
  );
}