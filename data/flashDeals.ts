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
    id: 6,
    title: 'GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors',
    category: 'TOYS & GAMES',
    price: '₹309',
    originalPrice: '₹999',
    discount: '69% OFF',
    image: 'https://i.ibb.co/Fqyv3jBr/51p-Git1u-TFL-SL1280.jpg',
    
    store: 'Amazon',
    link: 'https://link.amazon/B03Cg6I2d',
    description: 'GRAPHENE 1:32 Scale DieCast Metal Toy Car Pull Back Action Openable Doors 4x4 Thar/Jeep Premium Car Toy Light Music for Kids Realistic Miniature Model Best Gift 2+yrs Girls Boys Random Colors "More information is available on Amazon." ',
    features: [' Brand : GRAPHENE', 'Age Range Description :	2+ Kid and toddlers' , 'Country of Origin	: India','Unit Count :	1 Count','"More information is available on Amazon."' ]
  },
    {
    id: 2,
    title: 'Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator',
    category: 'Electronics',
    price: '₹699',
    originalPrice: '₹1,495',
    discount: '53% OFF',
    image: 'https://i.ibb.co/JFvwdxg5/ULzvmj-YLSXkq-ZFUp-Tb-Tfj-VHx-OSMs-OHul.jpg',
    
    store: 'Amazon',
    link: 'https://link.amazon/B0ilLfheW',

    promoCode: '',
    description: 'Digitek DWM-010 Mic Wireless with Type-C, Mic for YouTube Wireless Recording, 2.4GHz Wireless Microphone with Noise Reduction, 40m Range, 7H Battery, LED Light Indicator "More information is available on Amazon."',
    features: ['Recommended Uses For Product :	Reels, Streaming, Video Conference, Vlogging', ' Brand : Digitek ', 'Model Name  :	DWM 010' , 'Connectivity Technology  :	Wireless','Connector Type	: USB Type-C' ]
  },
  
];