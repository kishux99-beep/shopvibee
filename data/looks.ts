export interface LookPiece {
  id: string;
  name: string;
  brand: string;
  price: string;
  originalPrice: string;
  discount: string;
  category: string;
  image: string;
  affiliateUrl: string;
}

export interface FashionLook {
  id: string;
  title: string;
  vibe: string;
  totalPrice: string;
  totalOriginalPrice: string;
  totalSavings: string;
  budgetCategory: 'under-3k' | 'under-5k' | 'premium';
  modelImage: string;
  description: string;
  pieces: LookPiece[];
}

export const initialLooks: FashionLook[] = [
  {
    id: "look-1",
    title: "Old Money Suede Fit",
    vibe: "Smart Casual / Luxury",
    totalPrice: "₹4,299",
    totalOriginalPrice: "₹8,999",
    totalSavings: "52% OFF",
    budgetCategory: "under-5k",
    modelImage: "https://i.ibb.co/CXZPQtP/Whats-App-Image-2026-08-18-at-9-52-53-AM.jpg",
    description: "Tan brown zip suede jacket paired with black tailored pleated trousers, leather Chelsea boots, and minimalist black timepiece.",
    pieces: [
      {
        id: "p-1",
        name: "Tan Suede Zip Jacket",
        brand: "ROADSTER LUXE",
        price: "₹1,899",
        originalPrice: "₹3,999",
        discount: "52% OFF",
        category: "Outerwear",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-2",
        name: "Tailored Pleated Pants",
        brand: "SNITCH",
        price: "₹1,199",
        originalPrice: "₹2,299",
        discount: "48% OFF",
        category: "Bottomwear",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-3",
        name: "Leather Chelsea Boots",
        brand: "RED TAPE LUXE",
        price: "₹1,499",
        originalPrice: "₹4,999",
        discount: "70% OFF",
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-4",
        name: "Minimalist Black Watch",
        brand: "FOSSIL STYLE",
        price: "₹699",
        originalPrice: "₹1,499",
        discount: "53% OFF",
        category: "Accessory",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      }
    ]
  },
  {
    id: "look-2",
    title: "Minimal Quarter-Zip Set",
    vibe: "Korean Streetwear",
    totalPrice: "₹2,899",
    totalOriginalPrice: "₹5,499",
    totalSavings: "47% OFF",
    budgetCategory: "under-3k",
    modelImage: "https://i.ibb.co/CXZPQtP/Whats-App-Image-2026-08-18-at-9-52-53-AM.jpg",
    description: "Cream fleece quarter-zip pullover styled with wide charcoal trousers, clean white low-top kicks, and a stealth dial watch.",
    pieces: [
      {
        id: "p-5",
        name: "Quarter-Zip Fleece Hoodie",
        brand: "LEVEL STUDIOS",
        price: "₹1,299",
        originalPrice: "₹2,499",
        discount: "48% OFF",
        category: "Topwear",
        image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-6",
        name: "Wide Straight Charcoal Pants",
        brand: "URBAN ESSENTIALS",
        price: "₹899",
        originalPrice: "₹1,699",
        discount: "47% OFF",
        category: "Bottomwear",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-7",
        name: "Clean White Lows",
        brand: "VEJA VIBE",
        price: "₹799",
        originalPrice: "₹1,899",
        discount: "58% OFF",
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      },
      {
        id: "p-8",
        name: "All-Black Chrono Watch",
        brand: "TIMEX STEALTH",
        price: "₹499",
        originalPrice: "₹999",
        discount: "50% OFF",
        category: "Accessory",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500&auto=format&fit=crop&q=80",
        affiliateUrl: "https://amazon.in"
      }
    ]
  }
];