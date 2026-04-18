import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { toCategorySlug } from '@/lib/categorySeo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.radheyramansteelsuppliers.in';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quote`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  try {
    await dbConnect();

    const categoryValues: string[] = await Product.distinct('category');
    const uniqueCategorySlugs = Array.from(
      new Set(
        categoryValues
          .map((category) => toCategorySlug(String(category || '')))
          .filter(Boolean)
      )
    );

    const categoryRoutes: MetadataRoute.Sitemap = uniqueCategorySlugs.map((slug) => ({
      url: `${baseUrl}/products/category/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes];
  } catch {
    return staticRoutes;
  }
}
