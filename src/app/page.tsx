'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ContactForm from '@/components/ContactForm';
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

      {/* Full Page Particle Text Effect Hero */}
      <section className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-darkGray to-dark overflow-hidden pt-20">
        <ParticleTextEffect words={["RADHEY", "RAMAN", "STEELS", "SINCE", "1979"]} width={1000} height={500} />
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-darkGray">Our Steel Products</h2>
            <p className="text-gray-600 text-lg">Premium RINL/SAIL steel products trusted by industry professionals</p>
          </motion.div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin">⟳</div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="text-center py-20 text-gray-600">
              <p>No Products available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4 text-darkGray">Get In Touch</h2>
            <p className="text-gray-600 text-lg">Have questions? We&apos;d love to hear from you.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <Footer />
    </main>
  );
}
