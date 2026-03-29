'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductCard from '../ProductCard';

interface Product {
  _id: string;
  name: string;
  image?: string;
  category: string;
  description: string;
  featured?: boolean;
}

export const ProductCarousel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Duplicate products for seamless loop
  const duplicatedProducts = [...products, ...products];

  if (loading) {
    return (
      <div className="w-full h-80 bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading products...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">No featured products available</div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-white py-12">
        <div className="relative w-full overflow-hidden px-2 sm:px-4">
          <div className="animate-scroll flex gap-6">
            {duplicatedProducts.map((product, index) => (
              <div
                key={`${product._id}-${index}`}
                className="flex-shrink-0 w-48 md:w-64 lg:w-80"
              >
                <ProductCard
                  _id={product._id}
                  name={product.name}
                  image={product.image}
                  category={product.category}
                  description={product.description}
                  featured={product.featured}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};
