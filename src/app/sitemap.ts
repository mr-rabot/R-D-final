
import { MetadataRoute } from 'next';

/**
 * Generates a dynamic sitemap for R&D Services to ensure scholarly content 
 * is correctly indexed by global search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rdservices.in'; // Replace with your actual production domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];
}
