import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ShopVibee - Top Curated Deals',
  description: 'Handpicked discounts and deals on supplements, electronics, and lifestyle.',
  icons: {
    icon: '/favicon.ico', // Yeh aapke public folder wale logo.png ko favicon bana dega
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}