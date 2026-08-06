export interface Deal {
  id: number;
  title: string;
  category: string;
  price: string;
  originalPrice?: string;
  discount: string;
  image: string;
  images?: string[]; // 🚀 Multiple images array support added
  store: string;
  link: string;
  expiresIn: string;
  promoCode?: string;
  description: string;
  features: string[];
}

// 🚀 Expanded Categories List
export const categories = [
  'All',
  'Supplements',
  'Electronics',
  'Wearables',
  'Furniture',
  'Laptops',
  'Smartwatches',
  'Audio',
  'Home',
  'Fashion',
  'Shoes',
  'Gaming',
  'Kitchen',
  'Automotive',
  'Beauty'
];

export const initialDeals: Deal[] = [
  // --- SUPPLEMENTS ---
  {
    id: 1,
    title: 'Optimum Nutrition (ON) Gold Standard 100% Whey Protein',
    category: 'Supplements',
    price: '₹5,499',
    originalPrice: '₹7,699',
    discount: '28% OFF',
    image: 'https://i.ibb.co/WWV5wrkQ/Whats-App-Image-2026-01-15-at-9-24-49-AM.jpg',
    images: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=800',
      'https://i.ibb.co/WWV5wrkQ/Whats-App-Image-2026-01-15-at-9-24-49-AM.jpg',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Wellversed',
    link: 'https://wellversed.in',
    expiresIn: '3 days left',
    promoCode: 'VIBEE28',
    description: 'World-renowned whey protein powder to support muscle building and fast post-workout recovery.',
    features: ['24g Protein per serving', '5.5g BCAAs', 'Low Sugar & Informed Choice Certified']
  },

  // --- ELECTRONICS & WEARABLES ---
  {
    id: 2,
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: '₹26,990',
    originalPrice: '₹34,990',
    discount: '23% OFF',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Flipkart',
    link: 'https://flipkart.com',
    expiresIn: '5 hours left',
    promoCode: 'SONY23',
    description: 'Industry-leading noise cancellation with two processors and 8 microphones for pristine sound quality.',
    features: ['30-hour battery life', 'Crystal clear hands-free calling', 'Ultra-comfortable lightweight design']
  },
  {
    id: 3,
    title: 'Apple Watch Series 9 (GPS, 41mm)',
    category: 'Wearables',
    price: '₹37,900',
    originalPrice: '₹41,900',
    discount: '10% OFF',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1509744956145-d4d1e21b0e5d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Reliance Digital',
    link: 'https://reliancedigital.in',
    expiresIn: '2 days left',
    promoCode: 'APPLE9',
    description: 'Smarter, brighter, and faster. Featuring a magical new way to use your watch without touching the screen.',
    features: ['Double tap gesture', 'Advanced health sensors', 'Always-On Retina display']
  },

  // --- 💻 LAPTOPS ---
  {
    id: 4,
    title: 'Apple MacBook Air M2 (13.6-inch, 8GB RAM, 256GB SSD)',
    category: 'Laptops',
    price: '₹92,900',
    originalPrice: '₹1,14,900',
    discount: '19% OFF',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Amazon',
    link: 'https://amazon.in',
    expiresIn: '4 days left',
    promoCode: 'MACM2',
    description: 'Strikingly thin and fast laptop powered by the M2 chip, designed to take your work and creativity anywhere.',
    features: ['Up to 18 hours battery life', '13.6-inch Liquid Retina display', 'Silent fanless design']
  },

  // --- ⌚ SMARTWATCHES ---
  {
    id: 5,
    title: 'Amazfit GTR 4 Smartwatch with Dual-Band GPS',
    category: 'Smartwatches',
    price: '₹14,999',
    originalPrice: '₹22,999',
    discount: '35% OFF',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Flipkart',
    link: 'https://flipkart.com',
    expiresIn: '1 day left',
    promoCode: 'AMAZFIT35',
    description: 'A classic sports smartwatch featuring industry-leading GPS tracking and 150+ sports modes.',
    features: ['14-day battery life', 'Bluetooth phone calls', 'HD AMOLED display']
  },

  // --- 🎧 AUDIO ---
  {
    id: 6,
    title: 'JBL Flip 6 Portable Bluetooth Waterproof Speaker',
    category: 'Audio',
    price: '₹9,999',
    originalPrice: '₹14,999',
    discount: '33% OFF',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Croma',
    link: 'https://croma.com',
    expiresIn: '6 hours left',
    promoCode: 'JBL33',
    description: 'Bold sound for every adventure. Waterproof, dustproof, and ready to party all night long.',
    features: ['12 Hours of Playtime', 'IP67 Waterproof & Dustproof', 'PartyBoost compatible']
  },

  // --- 🏠 HOME ---
  {
    id: 7,
    title: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    category: 'Home',
    price: '₹47,900',
    originalPrice: '₹58,900',
    discount: '18% OFF',
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Dyson India',
    link: 'https://dyson.in',
    expiresIn: '2 days left',
    promoCode: 'DYSON18',
    description: 'Intelligent cordless vacuum with laser illumination that reveals microscopic dust.',
    features: ['Laser reveals invisible dust', 'Counts and measures microscopic dust particles', 'Up to 60 mins run time']
  },
  {
    id: 8,
    title: 'Gun Pistol Lighter Heavy Weight Metal Body Real and Original Like Gun Pistol for Decorative, Smoking Filled with Gas',
    category: 'Home',
    price: '₹1,399',
    originalPrice: '₹2,999',
    discount: '-53% OFF',
    image: 'https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg',
    images: [
      'https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg',
      'https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg'
    ],
    store: 'Amazon',
    link: 'https://link.amazon/B0b50YOCH',
    expiresIn: '2 days left',
    description: 'Made from high quality Allow Metal Having a high-grade and high-quality lighter is the first smokers should take into consideration. Designed for convenience, this classic shaped refillable gas lighter is long lasting and sharp flamed. Antique design revolver pistol gun lighter THIS IS NOT A USB LIGHTER. It is best suited for those who like to have a surprise element in their accessories. The lighter is very durable and easy to use, a perfect gift for your best friend. Can be refilled at any local cigarette vendor / betel shop. Superb Quality Refillable Cigarette Lighter material to ensure its durability. Runs on Butane Gas, easily available. Perfect gift for your love ones. Keep outing of children, it is not a toy. NOTE: DUE TO SHIPPING RESTRICTIONS, THERE MAY BE NO FUEL IN THE LIGHTER. PLEASE GET IT FILLED FROM A LOCAL SHOP. Superb Quality Refillable Cigarette Lighter Material To Ensure Its Durability. Strong Body It Is More Decoration Or Collection Than A Lighter Help Shows Your Noble Quality And Notable Social Position.',
    features: ['Colour  :  Z83 BLACK', 'Material :	Metal', 'Style :	Pistol', 'Item Weight   :	450 Grams', 'Fuel Type :	Butane', 'Product 	: 10L x 15W x 5Th ', 'Dimensions : Centimeters', 'Number of Items	: 1', 'Net Quantity	 : 1.0 Count', 'Number of Packs	 : 1', ]
  },

  // --- 👕 FASHION ---
  {
    id: 9,
    title: 'Levi\'s Men Slim Fit Casual Cotton Shirt',
    category: 'Fashion',
    price: '₹1,599',
    originalPrice: '₹2,999',
    discount: '46% OFF',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Myntra',
    link: 'https://myntra.com',
    expiresIn: '3 days left',
    promoCode: 'LEVIS46',
    description: 'Premium breathable cotton fabric tailored for an effortless smart-casual look.',
    features: ['100% Breathable Cotton', 'Slim Fit Design', 'Machine Washable']
  },

  // --- 👟 SHOES ---
  {
    id: 10,
    title: 'Nike Air Zoom Pegasus 40 Running Shoes',
    category: 'Shoes',
    price: '₹8,395',
    originalPrice: '₹11,995',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Nike India',
    link: 'https://nike.com',
    expiresIn: '1 day left',
    promoCode: 'NIKE30',
    description: 'Springy cushioning for road running, providing a supportive and balanced ride for daily trainers.',
    features: ['Zoom Air units for responsiveness', 'Waffle-inspired rubber outsole', 'Enhanced upper mesh breathability']
  },

  // --- 🎮 GAMING ---
  {
    id: 11,
    title: 'Sony PlayStation 5 Slim Console (Disc Edition)',
    category: 'Gaming',
    price: '₹47,490',
    originalPrice: '₹54,990',
    discount: '13% OFF',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Flipkart',
    link: 'https://flipkart.com',
    expiresIn: '12 hours left',
    promoCode: 'PS5SLIM',
    description: 'Experience lightning-fast loading with an ultra-high speed SSD, deeper immersion with haptic feedback.',
    features: ['1TB SSD Storage', 'Ray Tracing Support', '4K Gaming & 120Hz Output']
  },

  // --- 🍽️ KITCHEN ---
  {
    id: 12,
    title: 'Philips Air Fryer NA120/00 with Rapid Air Technology',
    category: 'Kitchen',
    price: '₹6,999',
    originalPrice: '₹9,995',
    discount: '30% OFF',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Amazon',
    link: 'https://amazon.in',
    expiresIn: '3 days left',
    promoCode: 'PHILIPS30',
    description: 'Fry with up to 90% less fat using hot air. Crispy on the outside, tender on the inside.',
    features: ['4.2 Liter Capacity', 'Rapid Air Technology', 'Digital Touch Panel']
  },

  // --- 🚗 AUTOMOTIVE ---
  {
    id: 13,
    title: 'Qubo Smart Car Dash Camera Pro (1080p, Night Vision)',
    category: 'Automotive',
    price: '₹2,799',
    originalPrice: '₹4,990',
    discount: '43% OFF',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Amazon',
    link: 'https://amazon.in',
    expiresIn: '2 days left',
    promoCode: 'QUBO43',
    description: 'Keep your car safe on every journey with crystal clear wide-angle recording and mobile app connectivity.',
    features: ['Full HD 1080p Recording', 'G-Sensor Emergency Lock', 'WDR Night Vision']
  },

  // --- 🧴 BEAUTY ---
  {
    id: 14,
    title: 'Minimalist 10% Niacinamide Face Serum for Acne Marks',
    category: 'Beauty',
    price: '₹559',
    originalPrice: '₹699',
    discount: '20% OFF',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1608248597359-f538356f5b0d?auto=format&fit=crop&q=80&w=800'
    ],
    store: 'Nykaa',
    link: 'https://nykaa.com',
    expiresIn: '4 days left',
    promoCode: 'GLOW20',
    description: 'Powerful daily serum packed with pure Niacinamide and Matmarine to target blemishes and control oil.',
    features: ['Reduces acne marks & blemishes', 'Balances sebum activity', 'Fragrance-free formula']
  }
];