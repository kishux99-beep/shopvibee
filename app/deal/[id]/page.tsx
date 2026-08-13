import { Metadata } from 'next';
import Link from 'next/link';
import { initialDeals, Deal } from '@/data/deals';
import { flashDealsData, FlashDeal } from '@/data/flashDeals';
import { topDealsData, TopDeal } from '@/data/topDeals';
import DealDetailClient from './DealDetailClient';

type Props = {
  params: Promise<{ id: string }>;
};

// Helper function to fetch deal from all sources
async function getDeal(idString: string) {
  const dealId = Number(idString);
  const allDeals: (Deal | FlashDeal | TopDeal)[] = [
    ...initialDeals,
    ...flashDealsData,
    ...topDealsData,
  ];
  return {
    deal: allDeals.find((d) => d.id === dealId),
    allDeals,
  };
}

// 🚀 Dynamic Open Graph (OG) Metadata Generator (Server-Side)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { deal } = await getDeal(resolvedParams.id);

  if (!deal) {
    return {
      title: 'Deal Not Found - ShopVibee',
      description: 'The requested deal is no longer available.',
    };
  }

  const guidance = (deal as any)?.vibeeGuidance;

  // 🛠️ FIX 1: Clean Title (Aapki discount value me 'OFF' pehle se ho sakta hai)
  const cleanDiscount = deal.discount ? deal.discount.replace(/off/gi, '').trim() : '';
  const title = `${cleanDiscount ? cleanDiscount + ' OFF - ' : ''}${deal.title} at ${deal.price}`;
  const description = `${guidance?.verdict || deal.description} Buy now on ${deal.store}.`;
  const url = `https://shopvibee.in/deal/${deal.id}`;

  // 🛠️ FIX 2: Absolute Image URL format for WhatsApp/Facebook
  let imageUrl = deal.image || '';
  if (imageUrl && !imageUrl.startsWith('http')) {
    imageUrl = `https://shopvibee.in${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
  }

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'ShopVibee',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: deal.title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl],
    },
  };
}

export default async function DealDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { deal, allDeals } = await getDeal(resolvedParams.id);

  if (!deal) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Deal Not Found ❌</h2>
        <p className="text-sm text-gray-500 mb-6">The deal you are looking for might have expired or removed.</p>
        <Link href="/" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold shadow-md">
          Back to Home 🏠
        </Link>
      </div>
    );
  }

  // Google SEO Product Schema JSON-LD Structured Data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: deal.title,
    image: (deal as any).images || [deal.image],
    description: deal.description,
    brand: {
      '@type': 'Brand',
      name: deal.store || 'Amazon',
    },
    offers: {
      '@type': 'Offer',
      url: `https://shopvibee.in/deal/${deal.id}`,
      priceCurrency: 'INR',
      price: deal.price ? deal.price.replace(/[^0-9.]/g, '') : '0',
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: deal.store || 'Amazon',
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <DealDetailClient deal={deal} allDeals={allDeals} />
    </>
  );
}