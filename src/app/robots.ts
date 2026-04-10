
import { MetadataRoute } from 'next';

/**
 * Configures the robots.txt file to optimize scholarly crawler behavior.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://rdservices.in'; // Replace with your actual production domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
