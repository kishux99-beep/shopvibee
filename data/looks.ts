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

];