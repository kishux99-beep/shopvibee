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
    id: 9,
    title: 'Levi\'s Men Slim Fit Casual Cotton Shirt',
    category: 'Fashion',
    price: '₹1,599',
    originalPrice: '₹2,999',
    discount: '46% OFF',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    
    store: 'Myntra',
    link: 'https://myntra.com',
    
    promoCode: 'LEVIS46',
    description: 'Premium breathable cotton fabric tailored for an effortless smart-casual look.',
    features: ['100% Breathable Cotton', 'Slim Fit Design', 'Machine Washable']
  },
  {
    id: 10,
    title: 'Nike Air Zoom Pegasus 40 Running Shoes',
    category: 'Shoes',
    price: '₹8,395',
    originalPrice: '₹11,995',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
   
    store: 'Nike India',
    link: 'https://nike.com',
    
    promoCode: 'NIKE30',
    description: 'Springy cushioning for road running, providing a supportive and balanced ride for daily trainers.',
    features: ['Zoom Air units for responsiveness', 'Waffle-inspired rubber outsole', 'Enhanced upper mesh breathability']
  },
  
];