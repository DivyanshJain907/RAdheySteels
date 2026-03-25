'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductCardProps {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
  featured?: boolean;
}

export default function ProductCard({
  name,
  price,
  category,
  image,
  description,
  featured,
}: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue transition group shadow-md hover:shadow-lg"
    >
      {/* Image Container */}
      <div className="relative h-40 md:h-56 lg:h-64 bg-gray-200 overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-blue text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-blue text-sm uppercase tracking-widest mb-2 font-semibold">
          {category}
        </p>
        <h3 className="text-darkGray text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-blue text-2xl font-bold">Rs. {price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary transition shadow-md"
          >
            View
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
