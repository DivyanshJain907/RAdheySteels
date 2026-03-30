'use client';

import React, { useEffect, useState, useRef } from 'react';
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const [isAutoScroll, setIsAutoScroll] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsAutoScroll(true), 5000);
    return () => clearTimeout(timer);
  }, [isAutoScroll]);

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

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    setIsAutoScroll(false);
    const scrollAmount = 320; // Width of card + gap
    const newPosition = direction === 'left' 
      ? Math.max(carouselRef.current.scrollLeft - scrollAmount, 0)
      : carouselRef.current.scrollLeft + scrollAmount;
    
    carouselRef.current.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartRef.current - touchEnd;
    
    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        handleScroll('right');
      } else {
        handleScroll('left');
      }
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
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          <div className="relative w-full overflow-hidden">
            {/* Left Arrow */}
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 md:p-3 transition shadow-lg hover:shadow-xl"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className={`overflow-x-hidden flex gap-6 px-12 sm:px-16 ${isAutoScroll ? 'animate-scroll' : 'scroll-smooth'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
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

            {/* Right Arrow */}
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 md:p-3 transition shadow-lg hover:shadow-xl"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite !important;
          width: fit-content;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
};
