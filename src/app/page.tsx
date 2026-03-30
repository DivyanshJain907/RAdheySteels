'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import { Timeline } from '@/components/Timeline';
import { ProductCarousel } from '@/components/ui/product-carousel';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  description: string;
  featured?: boolean;
}

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700">
      <Header1 />

      {/* Enhanced Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-16" style={{
        backgroundImage: 'url(/bg.webp), url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight drop-shadow-lg"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7), 4px 4px 12px rgba(0,0,0,0.5)' }}
          >
            Radhey Raman Steel Suppliers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-3xl text-white mb-10 md:mb-14 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-semibold"
            style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7), 3px 3px 6px rgba(0,0,0,0.5)' }}
          >
            One stop solution for all your steel requirements.
            Authorised dealer of Sail/RINL in Uttar Pradesh
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-6 justify-center items-center"
          >
            <Link href="/quote">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition transform hover:scale-105 text-lg md:text-xl w-full md:w-auto shadow-lg hover:shadow-xl">
                Get a Quote
              </button>
            </Link>
            <Link href="/products">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition border-2 border-white text-lg md:text-xl w-full md:w-auto shadow-lg hover:shadow-xl">
                Explore Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stockists of Renowned Brands */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-3 md:mb-4">Stockists of Renowned Brands</h2>
            <p className="text-gray-600 text-base md:text-lg">
              <Link href="#" className="text-orange-500 hover:underline">For more details - click here</Link>
            </p>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-row gap-4 md:gap-6 md:gap-8 items-center justify-center md:justify-between">
            {[
              { name: 'SAIL', src: '/sail-logo.png' },
              { name: 'RINL', src: '/rinl-logo.png' },
              { name: 'JSW Steel', src: '/jsw-logo.png' },
              { name: 'Jindal Steel', src: '/jindal-logo.png' },
            ].map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ scale: 1.1, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                className="bg-white p-3 md:p-6 rounded-xl border-4 border-orange-500 hover:border-orange-600 transition w-full md:w-1/4 flex items-center justify-center min-h-28 md:min-h-48 shadow-md hover:shadow-2xl"
              >
                <motion.div
                  className="text-center w-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  <div className="h-20 md:h-40 lg:h-56 flex items-center justify-center">
                    <Image
                      src={brand.src}
                      alt={brand.name}
                      width={brand.name === 'Jindal Steel' ? 280 : 220}
                      height={brand.name === 'Jindal Steel' ? 280 : 220}
                      className="max-w-full max-h-full object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wider"
            >
              Our Products
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-gray-700 mt-2">Quality Steel Products</h2>
            <p className="text-slate-700 text-base md:text-lg">Wide range of premium RINL/SAIL steel products for all your needs</p>
          </motion.div>

          {/* Product Carousel */}
          <ProductCarousel />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12 md:mt-16"
          >
            <Link href="/products">
              <button className="bg-gray-700 hover:bg-orange-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg">
                View All Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-orange-500 font-semibold text-sm md:text-base uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mt-2 mb-6">Building Trust Since 1979</h2>
              <p className="text-slate-700 mb-4 text-base md:text-lg">
                Radhey Raman Steel is a trusted authorized dealer of RINL/SAIL steel products, serving the construction and industrial sectors for over 45 years.
              </p>
              <p className="text-slate-700 mb-6 text-base md:text-lg">
                We are committed to providing premium quality steel products at competitive prices with exceptional customer service and timely delivery.
              </p>
              <Link href="/about">
                <button className="bg-gray-700 hover:bg-orange-500 text-white px-6 md:px-8 py-3 rounded-lg font-bold transition">
                  Learn More
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700 p-8 md:p-10 rounded-lg text-white"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Our Strengths</h3>
              <ul className="space-y-4">
                {[
                  'Authorized RINL/SAIL Dealer',
                  '45+ Years of Experience',
                  'Premium Quality Products',
                  'Fast & Reliable Delivery',
                  'Competitive Pricing',
                  'Expert Customer Support',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-base md:text-lg">
                    <span className="text-yellow-300 text-2xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* Timeline Section */}
      <Timeline />

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10"
          >
            Contact us today for a free quote on your steel requirements
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center"
          >
            <Link href="/quote">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg w-full sm:w-auto\">
                Get a Quote
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition border-2 border-white text-base md:text-lg w-full sm:w-auto">
                Contact Us
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
