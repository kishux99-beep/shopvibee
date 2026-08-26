import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Script from 'next/script';
import CookieConsent from '@/app/components/CookieConsent';

export const metadata: Metadata = {
  title: 'ShopVibee - Top Curated Deals',
  description: 'Handpicked discounts and deals on supplements, electronics, and lifestyle.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 🚀 OneSignal Web Push Notification Script */}
        <Script
          src="https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js"
          strategy="afterInteractive"
        />
        <Script id="onesignal-init" strategy="afterInteractive">
          {`
            // Localhost par error rokne ke liye condition
            if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
              window.OneSignalDeferred = window.OneSignalDeferred || [];
              OneSignalDeferred.push(async function(OneSignal) {
                await OneSignal.init({
                  appId: "bda0e2bd-981a-4e05-b280-9eee9f8f1005",
                  notifyButton: {
                    enable: false, // ❌ Floating bell widget fully disabled
                  },
                });

                // Naye user ke liye direct browser Native Permission Prompt dikhayein
                setTimeout(() => {
                  if (!OneSignal.User.PushSubscription.optedIn) {
                    OneSignal.Notifications.requestPermission();
                  }
                }, 1000);
              });
            }
          `}
        </Script>
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
        <CookieConsent />
      </body>
    </html>
  );
}