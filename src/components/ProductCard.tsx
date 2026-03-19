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
      className="bg-darkGray rounded-lg overflow-hidden border border-gold/30 hover:border-gold/60 transition group"
    >
      {/* Image Container */}
      <div className="relative h-64 bg-dark overflow-hidden">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition duration-300"
          />
        )}
        {featured && (
          <div className="absolute top-4 right-4 bg-gold text-dark px-3 py-1 rounded-full text-xs font-bold">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gold text-sm uppercase tracking-widest mb-2">
          {category}
        </p>
        <h3 className="text-white text-xl font-bold mb-2">{name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <span className="text-gold text-2xl font-bold">${price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold text-dark px-4 py-2 rounded font-semibold hover:bg-gold/90 transition"
          >
            View
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
