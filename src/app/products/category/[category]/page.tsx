import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Header1 } from "@/components/ui/header";
import dbConnect from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { toCategorySlug, toTitleCase } from "@/lib/categorySeo";

const siteUrl = "https://www.radheyramansteelsuppliers.in";

interface ProductItem {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
  featured?: boolean;
}

async function getProductsByCategorySlug(categorySlug: string): Promise<{
  products: ProductItem[];
  displayCategory: string;
}> {
  await dbConnect();

  const rawProducts = await Product.find({ inStock: true })
    .sort({ createdAt: -1 })
    .lean();

  const products = rawProducts
    .filter((item: any) => toCategorySlug(String(item.category || "")) === categorySlug)
    .map((item: any) => ({
      _id: String(item._id),
      name: String(item.name),
      price: Number(item.price || 0),
      category: String(item.category || ""),
      image: item.image ? String(item.image) : undefined,
      description: String(item.description || ""),
      featured: Boolean(item.featured),
    }));

  const displayCategory =
    products[0]?.category || toTitleCase(categorySlug.replace(/-/g, " "));

  return { products, displayCategory };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const { products, displayCategory } = await getProductsByCategorySlug(slug);

  if (!products.length) {
    const fallbackTitle = `${toTitleCase(slug.replace(/-/g, " "))} Products`;

    return {
      title: `${fallbackTitle} | Radhey Raman Steel Suppliers`,
      description:
        "Explore steel products from Radhey Raman Steel Suppliers in Kanpur.",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const productCount = products.length;
  const title = `${displayCategory} Supplier in Kanpur | ${productCount}+ Products`;
  const description = `Buy ${displayCategory} in Kanpur from Radhey Raman Steel Suppliers. Authorised dealer associated with Steel Authority of India Limited and Rashtriya Ispat Nigam Limited products.`;
  const canonicalPath = `/products/category/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
      siteName: "Radhey Raman Steel Suppliers",
      images: ["/logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logo.png"],
    },
    keywords: [
      `${displayCategory} supplier in Kanpur`,
      `${displayCategory} dealer Kanpur`,
      "construction steel supplier near me",
      "iron and steel wholesaler Kanpur",
    ],
  };
}

export default async function ProductCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { products, displayCategory } = await getProductsByCategorySlug(category);

  if (!products.length) {
    notFound();
  }

  return (
    <main className="bg-white">
      <Header1 />

      <section className="relative w-full py-10 md:py-20 bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700 text-white px-4 -mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-5xl font-bold mb-4">{displayCategory} in Kanpur</h1>
          <p className="text-sm md:text-xl text-gray-100">
            Explore {displayCategory} products with competitive pricing and fast delivery support.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <p className="text-slate-700 font-medium">{products.length} products found in this category.</p>
            <Link href="/products" className="text-orange-600 hover:text-orange-700 font-semibold">
              View all categories
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl md:text-3xl font-bold text-gray-700 mb-4">
            Need Bulk {displayCategory} Supply?
          </h2>
          <p className="text-slate-700 mb-6 md:text-lg">
            Request a quick quotation for project and wholesale requirements.
          </p>
          <Link
            href="/quote"
            className="inline-flex bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
