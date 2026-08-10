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
  'Toys&Games',
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
    title: 'Wellcore - Pure Micronised Creatine Monohydrate (122g, 33 Servings) Fruit Fusion Lab Tested | Supports Athletic Performance and Power',
    category: 'Supplements',
    price: '₹610',
    originalPrice: '₹699.00',
    discount: '13% OFF',
    image: 'https://i.ibb.co/Hf8nZC2S/imageqy-TWkaqh-RGKVzbovwpk-Ndy-Tshej.jpg',
    images: [
      'https://i.ibb.co/Hf8nZC2S/imageqy-TWkaqh-RGKVzbovwpk-Ndy-Tshej.jpg',
      'https://i.ibb.co/FbPpjDHd/image-Mx-KBSz-ZLih-Ftyu-Uq-Ux-VUiplt-LJa.png',
      'https://i.ibb.co/rKschnc0/imaged-Gwdr-Itz-IXNDKPpc-ELqv-JPGCw-Ru.jpg',
      'https://i.ibb.co/Q7ZR8SCq/imageepzu-DMmf-Wxe-ETLlk-HTa-RUi-GVq-Eq.png',
      'https://i.ibb.co/p6GsHFL2/imagee-Js-WWum-TEXpg-IMQLJj-NLh-FJYud-O.jpg',
      'https://i.ibb.co/RkYrKtdy/image-GEk-Sdl-OWam-OBo-SQZn-QMkl-OJizp-Z.jpg',
      'https://i.ibb.co/yFq8KhMp/image-Tcqc-QNXkks-Kfw-Gs-Daz-PIuirujz-H.png',
    ],
    store: 'Wellversed',
    link: 'https://store.wellversed.in/products/wellcore-pure-micronised-creatine-monohydrate-122g-33-servings-lab-tested-fruit-fusion-supports-athletic-performance-and-power',
    expiresIn: '',
    promoCode: 'KRISH',
    description: 'HELPS BUILD MUSCLE & STRENGTH: Every scoop of Wellcore Creatine Monohydrate delivers the fuel for your physical performance. It helps you train harder, lift heavier, and recover faster.',
    features: ['Weight : 122g', 'Servings : 33 ', 'Lab Tested', 'Supports Athletic Performance and Power', 'Fruit Fusion Flavor']
  },

  // --- ELECTRONICS & WEARABLES ---
  {
    id: 2,
    title: 'JBL Tune 520BT Wireless On Ear Headphones with Mic, Upto 57H Battery, Speed Charge : 5 Min Charge Gives Up to 3H of Playback, Multipoint Connect, Customizable Bass with Headphones App, BT 5.3 (Black)',
    category: 'Electronics',
    price: '₹2,799',
    originalPrice: '₹4,999',
    discount: '44% OFF',
    image: 'https://i.ibb.co/Y7SXD7WG/RECIa-Dy-LSXEd-ETVPa-SXCyb-Us-Qxa-Zj-Byo.jpg',
    images: [
      'https://i.ibb.co/Y7SXD7WG/RECIa-Dy-LSXEd-ETVPa-SXCyb-Us-Qxa-Zj-Byo.jpg',
      'https://i.ibb.co/TBBdxM9y/q-JHs-Oj-LSXJIOng-Pj-ZOJjd-IOGa-TKt-Sgn-L.jpg',
      'https://i.ibb.co/fVzxBpT0/Tlx-VSLSXc-Zdk-Et-Gis-Mx-Sge-Rq-Pq-AIwx-IG.jpg"',
      'https://i.ibb.co/4nGC3RG7/rabekv-PLSXUPnc-Jf-SIil-FRAXj-Ldrpx-Mb.jpg',
      'https://i.ibb.co/LXBL6M0p/cf-Fi-ERLSXWUIbia-UQtu-Cm-UWLMLNKpau-K.jpg',
      'https://i.ibb.co/wF5VcWsP/h-XUoe-Nl-KLSXFm-Iw-Xbdftuxtt-Ya-NCn-WYf.jpg',

    ],
    store: 'Amazon',
    link: 'https://link.amazon/B0ayX6mS3',
    expiresIn: '',
    promoCode: '',
    description: 'With up to 57-hour battery life and quick charging of 5min gives 3Hrs playback, you’ ll have enough power for multi-day road trips and long festival weekends JBL Tune 520BT feature the renowned JBL Pure Bass sound, the same that powers the most famous venues all around the world Customize your listening experience with JBL Headphones App to tailor the sound to your taste with the EQ.',
    features: ['Brand	: JBL', 'Connectivity : Technology	Wireless', 'Communication Technology :	Bluetooth', 'Included Components	: 1 x JBL Tune 520BT headphones 1 x USB-C Charging Cable 1 x Warranty', 'Colour	Black',]
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
    title: 'Noise Pulse 2 Max 1.85" Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart DND, 100 Sports Modes, Smartwatch for Men and Women (Deep Wine)',
    category: 'Smartwatches',
    price: '₹1,099',
    originalPrice: '₹5,999',
    discount: '-82% OFF',
    image: 'https://i.ibb.co/7dZqtCJ2/BFKQBZ-1.jpg',
    images: [
      'https://i.ibb.co/7dZqtCJ2/BFKQBZ-1.jpg',
      'https://i.ibb.co/YBNgcHWr/GQRFZS-1.jpg',
      'https://i.ibb.co/r2GPhKRm/QNKNFL-1.jpg',
      'https://i.ibb.co/XZ6KgD1r/REBYOZ-1.jpg',
      'https://i.ibb.co/qKTNXhd/SMLBSD-1.jpg',
      'https://i.ibb.co/tMkL1vz9/VOKZMC-1.jpg',
    ],
    store: 'Amazon',
    link: 'https://link.amazon/B0fT0zGiD',
    expiresIn: '',
    promoCode: '',
    description: 'Noise Pulse 2 Max is a feature-packed smartwatch that combines style and functionality. With a large 1.85" display, Bluetooth calling, and a long-lasting battery, it keeps you connected and on top of your fitness goals.',
    features: ['Operating System	: android, ios', 'Display Size :	1.85 Inches', 'Battery Life :	10 Days', 'Bluetooth Calling :	Yes', 'Sports Modes  :	100', 'Brightness	: 550 NITS']
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
      'https://i.ibb.co/QFWRhFZD/Jv-NUy-Bq-LSXbtu-DCg-Ouv-SQh-AIn-Rmae-Wd-E.jpg',
      'https://i.ibb.co/rKBScv5q/rh-Qlq-Xc-DLSXVy-Jqbfrd-NEMrlhx-Pfx-VLf.jpg',
      'https://i.ibb.co/C3nwByfd/ege-Wa-KPPLSXNy-Ja-Od-GWFs-KGjacpzbq-Ad.jpg',
      'https://i.ibb.co/GSSPgsx/b-Sk-YBt-GLSXUi-Ut-RHvq-Tj-Mhl-DIaa-ZVi-RZ.jpg',
      'https://i.ibb.co/fYL7S0M8/oteo-LSXHf-OZHg-ZLe-GJgyfjurm-JIDl-OXO.jpg',
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
  },

   {
    id: 15,
    title: 'Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator',
    category: 'Electronics',
    price: '₹699',
    originalPrice: '₹1,495',
    discount: '53% OFF',
    image: 'https://i.ibb.co/JFvwdxg5/ULzvmj-YLSXkq-ZFUp-Tb-Tfj-VHx-OSMs-OHul.jpg',
    images: [
      'https://i.ibb.co/JFvwdxg5/ULzvmj-YLSXkq-ZFUp-Tb-Tfj-VHx-OSMs-OHul.jpg',
      'https://i.ibb.co/RThdjnHG/OWchee-LSXUFw-Tt-Oo-QFj-Shn-Lk-Ytrm-CCHe.jpg',
      'https://i.ibb.co/pHH3QbV/QVHPd-BOy-LSXv-Oqsym-JQBwamj-SNTJFPhh.jpg',
      'https://i.ibb.co/QvwW1B8w/Ov-Jbey-BLSXt-Iu-EZVCLBifx-PSfh-TMNc-Aq.jpg',
      'https://i.ibb.co/8DLkvVhN/Kkx-Emv-GLSXPCax-Zoay-WWggiwcij-Ec-MJq.jpg',
      'https://i.ibb.co/Y4HTjVTd/h-UAe-Emr-LSXKMETmwi-Jl-LZucpstz-PLc-NU.jpg',
      'https://i.ibb.co/mFrwbfpG/ezl-FGLSXh-Ms-Eg-CLe-Mahdl-Nde-WFGOIw-Zl.jpg',
    ],
    store: 'Amazon',
    link: 'https://link.amazon/B0ilLfheW',
    expiresIn: '',
    promoCode: '',
    description: 'Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator "More information is available on Amazon."',
    features: ['Recommended Uses For Product :	Reels, Streaming, Video Conference, Vlogging', ' Brand : Digitek ', 'Model Name  :	DWM 010' , 'Connectivity Technology  :	Wireless','Connector Type	: USB Type-C' ]
  },
  
  // --- Toys & Games ---
   {
    id: 16,
    title: 'GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors',
    category: 'Toys&Games',
    price: '₹309',
    originalPrice: '₹999',
    discount: '69% OFF',
    image: 'https://i.ibb.co/Fqyv3jBr/51p-Git1u-TFL-SL1280.jpg',
    images: [
      'https://i.ibb.co/Fqyv3jBr/51p-Git1u-TFL-SL1280.jpg',
      'https://i.ibb.co/fbfRrdt/71f-PAa-If77-L-SL1500.jpg',
      'https://i.ibb.co/JR4X9sgn/81n9-KSRat-UL-SL1500.jpg',
      'https://i.ibb.co/HpBbjZrv/711-Zriyn-NBL-SL1500.jpg',
      'https://i.ibb.co/Vcsm3j66/71-Ih5-LQe-WL-SL1500.jpg',
      'https://i.ibb.co/7xHcJJWj/61g-Ehh-U2dt-L-SL1280.jpg',
      'https://i.ibb.co/MDFbWj0L/612kj-G6h-QRL-SL1080.jpg',
      'https://i.ibb.co/zhvfVQTy/815vn37-Y4-TL-SL1500.jpg',
      'https://i.ibb.co/Z62zmsqF/81-NZC97-Al2-L-SL1500.jpg',
    ],
    store: 'Amazon',
    link: 'https://link.amazon/B03Cg6I2d',
    expiresIn: '',
    promoCode: '',
    description: 'GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors "More information is available on Amazon." ',
    features: [' Brand : GRAPHENE', 'Age Range Description :	2+ Kid and toddlers' , 'Country of Origin	: India','Unit Count :	1 Count','"More information is available on Amazon."' ]
  },
];