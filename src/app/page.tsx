'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import Image from 'next/image';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { Testimonials } from '@/components/Testimonials';

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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
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

  return (
    <main className="bg-white">
      <Header1 />

      {/* Enhanced Hero Section */}
      <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 overflow-hidden pt-8 md:pt-0">
        <div className="absolute inset-0 opacity-30">
          <ParticleTextEffect words={["RADHEY", "RAMAN", "STEELS"]} width={800} height={300} />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-6"
          >
            Premium Steel Solutions Since 1979
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-2xl text-gray-300 mb-4 md:mb-10"
          >
            Authorized RINL/SAIL dealer providing trusted steel products for construction and industry
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-2 md:gap-6 justify-center items-center"
          >
            <Link href="/quote">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold transition transform hover:scale-105 text-base md:text-lg w-full sm:w-auto">
                Get a Quote
              </button>
            </Link>
            <Link href="/products">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 md:px-10 py-3 md:py-4 rounded-lg font-bold transition border-2 border-white text-base md:text-lg w-full sm:w-auto">
                Explore Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stockists of Renowned Brands */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Stockists of Renowned Brands</h2>
            <p className="text-gray-600 text-base md:text-lg">
              <Link href="#" className="text-blue hover:underline">For more details - click here</Link>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-center md:justify-between">
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
                className="bg-white p-4 md:p-6 rounded-xl border-4 border-blue hover:border-primary transition w-full md:w-1/4 flex items-center justify-center min-h-32 md:min-h-48 shadow-md hover:shadow-2xl"
              >
                <motion.div
                  className="text-center w-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  <div className="h-32 md:h-40 lg:h-56 flex items-center justify-center">
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
              className="text-blue font-semibold text-sm md:text-base uppercase tracking-wider"
            >
              Our Products
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-slate-900 mt-2\">Quality Steel Products</h2>
            <p className="text-slate-700 text-base md:text-lg\">Wide range of premium RINL/SAIL steel products for all your needs</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin">⟳</div>
              <p className="text-slate-700 mt-4">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-700 mb-4">No products available yet.</p>
              <p className="text-slate-600">Products will be added soon.</p>
            </div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12 md:mt-16"
          >
            <Link href="/products">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg">
                View All Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Brief Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-blue font-semibold text-sm md:text-base uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">Building Trust Since 1979</h2>
              <p className="text-slate-700 mb-4 text-base md:text-lg">
                Radhey Raman Steel is a trusted authorized dealer of RINL/SAIL steel products, serving the construction and industrial sectors for over 45 years.
              </p>
              <p className="text-slate-700 mb-6 text-base md:text-lg">
                We are committed to providing premium quality steel products at competitive prices with exceptional customer service and timely delivery.
              </p>
              <Link href="/about">
                <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 md:px-8 py-3 rounded-lg font-bold transition">
                  Learn More
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 p-8 md:p-10 rounded-lg text-white"
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
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue font-semibold text-sm md:text-base uppercase tracking-wider"
            >
              Our Services
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-slate-900 mt-2">Comprehensive Solutions</h2>
            <p className="text-slate-700 text-base md:text-lg">Everything you need for your steel requirements</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Bulk Supply', desc: 'Large quantity supply with volume discounts' },
              { title: 'Fast Delivery', desc: 'Same-day or scheduled delivery' },
              { title: 'Quality Checked', desc: 'All products thoroughly inspected' },
              { title: 'Expert Support', desc: 'Technical guidance for your projects' },
              { title: 'Custom Orders', desc: 'Tailored solutions for specific needs' },
              { title: 'Warranty', desc: 'Full warranty and after-sales support' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 p-6 md:p-8 rounded-lg border-l-4 border-blue hover:shadow-lg transition hover:border-slate-900"
              >
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3\">{item.title}</h3>
                <p className="text-slate-700 text-sm md:text-base\">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12 md:mt-16"
          >
            <Link href="/services">
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg\">
                View All Services
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
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
              <button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition text-base md:text-lg w-full sm:w-auto\">
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

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 px-4 bg-white\">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-8 md:mb-12"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue font-semibold text-sm md:text-base uppercase tracking-wider"
            >
              Get In Touch
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-slate-900 mt-2\">We&apos;d Love to Hear From You</h2>
            <p className="text-slate-700 text-base md:text-lg\">Send us a message and we&apos;ll respond as soon as possible</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
