export interface TopDeal {
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
  expiresIn?: string;
}

export const topDealsData: TopDeal[] = [
  {
    id: 201,
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'Supplements',
    price: '₹2,299',
    originalPrice: '₹3,599',
    discount: '36% OFF',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
    store: 'Amazon',
    link: 'https://link.amazon/B01LsYpwo', // आपका एफिलिएट लिंक
    description: 'Top-rated whey protein for maximum muscle recovery.',
    promoCode: 'SHOPVIBEE',
    features: [
      '24g Protein per serving',
      '5.5g BCAAs',
      'Fast absorption'
    ],
    expiresIn: '12 hours'
  },
 {
    id: 3,
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: '₹26,990',
    originalPrice: '₹34,990',
    discount: '23% OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    store: 'Flipkart',
    link: 'https://flipkart.com',
    expiresIn: '5 hours left',
    promoCode: 'SONY23',
    description: 'Industry-leading noise cancellation with two processors and 8 microphones for pristine sound quality.',
    features: ['30-hour battery life', 'Crystal clear hands-free calling', 'Ultra-comfortable lightweight design']
  },
  {
    id: 1,
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'Supplements',
    price: '₹5,499',
    originalPrice: '₹7,699',
    discount: '28% OFF',
    image: 'https://i.ibb.co/WWV5wrkQ/Whats-App-Image-2026-01-15-at-9-24-49-AM.jpg',
    
    store: 'Wellversed',
    link: 'https://wellversed.in',
    expiresIn: '3 days left',
    promoCode: 'VIBEE28',
    description: 'World-renowned whey protein powder to support muscle building and fast post-workout recovery.',
    features: ['24g Protein per serving', '5.5g BCAAs', 'Low Sugar & Informed Choice Certified']
  },
];