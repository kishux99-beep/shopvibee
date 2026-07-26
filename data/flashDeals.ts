export interface FlashDeal {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  store: string;
  link: string;
  description: string;
  promoCode?: string;
  features: string[];
}

// ⏱️ यहाँ सेट करें कि फ्लैश डील कितने घंटे और कितने मिनट चलनी चाहिए
export const flashDurationHours = 24;   // जैसे: 24 घंटे
export const flashDurationMinutes = 0; // और 0 मिनट (कुल 24 घंटे 0 मिनट)


export const flashDealsData: FlashDeal[] = [
  {
    id: 101,
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'Supplements',
    price: '₹2,199',
    originalPrice: '₹3,599',
    discount: '39% OFF',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    store: 'Amazon',
    link: 'https://link.amazon/B01LsYpwo',
    description: 'Limited-time mega flash deal on authentic whey protein.',
    promoCode: 'FLASH10',
    features: [
      '24g Pure Protein',
      'Instantized formula'
    ]
  }
];