'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function DemoPage() {
  return (
    <main className="bg-white">
      <Header1 />

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-32 bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700 text-white px-4 -mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-bold mb-6 md:mb-8"
          >
            Welcome to Radhey Raman Steel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
          >
            Premium quality steel products from authorized RINL/SAIL dealer
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Quality Products', description: 'Premium RINL/SAIL steel products for all needs' },
              { title: 'Trusted Supplier', description: 'Authorized dealer with years of experience' },
              { title: 'Fast Delivery', description: 'Reliable and timely delivery to your location' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-gray-50 p-8 rounded-lg border border-orange-200"
              >
                <h3 className="text-xl font-bold text-gray-700 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-bold text-white mb-8"
          >
            Explore Our Services
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center"
          >
            <Link href="/products">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-700 px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition transform hover:scale-105 text-base md:text-lg w-full md:w-auto shadow-lg hover:shadow-xl">
                View Products
              </button>
            </Link>
            <Link href="/quote">
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 md:px-12 py-3 md:py-4 rounded-lg font-bold transition border-2 border-white text-base md:text-lg w-full md:w-auto shadow-lg hover:shadow-xl">
                Get a Quote
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

