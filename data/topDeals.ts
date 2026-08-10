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
    id: 4,
    title: 'Noise Pulse 2 Max 1.85" Display, Bluetooth Calling Smart Watch, 10 Days Battery, 550 NITS Brightness, Smart DND, 100 Sports Modes, Smartwatch for Men and Women (Deep Wine)',
    category: 'Smartwatches',
    price: '₹1,099',
    originalPrice: '₹5,999',
    discount: '-82% OFF',
    image: 'https://i.ibb.co/7dZqtCJ2/BFKQBZ-1.jpg',
    store: 'Amazon',
    link: 'https://link.amazon/B0fT0zGiD',
    expiresIn: '',
    promoCode: '',
    description: 'Noise Pulse 2 Max is a feature-packed smartwatch that combines style and functionality. With a large 1.85" display, Bluetooth calling, and a long-lasting battery, it keeps you connected and on top of your fitness goals.',
    features: ['Operating System	: android, ios', 'Display Size :	1.85 Inches', 'Battery Life :	10 Days', 'Bluetooth Calling :	Yes', 'Sports Modes  :	100', 'Brightness	: 550 NITS']
  },
 {
    id: 5,
    title: 'Gun Pistol Lighter Heavy Weight Metal Body Real and Original Like Gun Pistol for Decorative, Smoking Filled with Gas',
    category: 'Home',
    price: '₹1,399',
    originalPrice: '₹2,999',
    discount: '-53% OFF',
    image: 'https://i.ibb.co/qMgZb5Kg/r-Sn-Rn-ILSLDgd-MZry-ZINf-Tk-Ow-Czrxbvt-K.jpg',
    store: 'Amazon',
    link: 'https://link.amazon/B0b50YOCH',
    expiresIn: '2 days left',
    description: 'Made from high quality Allow Metal Having a high-grade and high-quality lighter is the first smokers should take into consideration. Designed for convenience, this classic shaped refillable gas lighter is long lasting and sharp flamed. Antique design revolver pistol gun lighter THIS IS NOT A USB LIGHTER. It is best suited for those who like to have a surprise element in their accessories. The lighter is very durable and easy to use, a perfect gift for your best friend. Can be refilled at any local cigarette vendor / betel shop. Superb Quality Refillable Cigarette Lighter material to ensure its durability. Runs on Butane Gas, easily available. Perfect gift for your love ones. Keep outing of children, it is not a toy. NOTE: DUE TO SHIPPING RESTRICTIONS, THERE MAY BE NO FUEL IN THE LIGHTER. PLEASE GET IT FILLED FROM A LOCAL SHOP. Superb Quality Refillable Cigarette Lighter Material To Ensure Its Durability. Strong Body It Is More Decoration Or Collection Than A Lighter Help Shows Your Noble Quality And Notable Social Position.',
    features: ['Colour  :  Z83 BLACK', 'Material :	Metal', 'Style :	Pistol', 'Item Weight   :	450 Grams', 'Fuel Type :	Butane', 'Product 	: 10L x 15W x 5Th ', 'Dimensions : Centimeters', 'Number of Items	: 1', 'Net Quantity	 : 1.0 Count', 'Number of Packs	 : 1', ]
  },
   {
    id: 2,
    title: 'JBL Tune 520BT Wireless On Ear Headphones with Mic, Upto 57H Battery, Speed Charge : 5 Min Charge Gives Up to 3H of Playback, Multipoint Connect, Customizable Bass with Headphones App, BT 5.3 (Black)',
    category: 'Electronics',
    price: '₹2,799',
    originalPrice: '₹4,999',
    discount: '44% OFF',
    image: 'https://i.ibb.co/Y7SXD7WG/RECIa-Dy-LSXEd-ETVPa-SXCyb-Us-Qxa-Zj-Byo.jpg',
    store: 'Amazon',
    link: 'https://link.amazon/B0ayX6mS3',
    expiresIn: '',
    promoCode: '',
    description: 'With up to 57-hour battery life and quick charging of 5min gives 3Hrs playback, you’ ll have enough power for multi-day road trips and long festival weekends JBL Tune 520BT feature the renowned JBL Pure Bass sound, the same that powers the most famous venues all around the world Customize your listening experience with JBL Headphones App to tailor the sound to your taste with the EQ.',
    features: ['Brand	: JBL', 'Connectivity : Technology	Wireless', 'Communication Technology :	Bluetooth', 'Included Components	: 1 x JBL Tune 520BT headphones 1 x USB-C Charging Cable 1 x Warranty', 'Colour	Black',]
  },
  {
    id: 1,
    title: 'Wellcore - Pure Micronised Creatine Monohydrate (122g, 33 Servings) Fruit Fusion Lab Tested | Supports Athletic Performance and Power',
    category: 'Supplements',
    price: '₹610',
    originalPrice: '₹699.00',
    discount: '13% OFF',
    image: 'https://i.ibb.co/Hf8nZC2S/imageqy-TWkaqh-RGKVzbovwpk-Ndy-Tshej.jpg',
   
    store: 'Wellversed',
    link: 'https://store.wellversed.in/products/wellcore-pure-micronised-creatine-monohydrate-122g-33-servings-lab-tested-fruit-fusion-supports-athletic-performance-and-power',
    expiresIn: '',
    promoCode: 'KRISH',
    description: 'HELPS BUILD MUSCLE & STRENGTH: Every scoop of Wellcore Creatine Monohydrate delivers the fuel for your physical performance. It helps you train harder, lift heavier, and recover faster.',
    features: ['Weight : 122g', 'Servings : 33 ', 'Lab Tested', 'Supports Athletic Performance and Power', 'Fruit Fusion Flavor']
  },
];