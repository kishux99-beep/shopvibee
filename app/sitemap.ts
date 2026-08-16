import { MetadataRoute } from 'next';
import { initialDeals } from '@/data/deals';
import { flashDealsData } from '@/data/flashDeals';
import { topDealsData } from '@/data/topDeals';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shopvibee.in';

  // Saari deals ko ek list mein combine karna
  const allDeals = [
    ...initialDeals,
    ...flashDealsData,
    ...topDealsData,
  ];

  // Dynamic deal pages ke URLs generate karna
  const dealUrls: MetadataRoute.Sitemap = allDeals.map((deal) => ({
    url: `${baseUrl}/deal/${deal.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  // Home page + Deals pages
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1.0,
    },
    ...dealUrls,
  ];
}