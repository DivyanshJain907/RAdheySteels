'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import { Testimonials } from '@/components/Testimonials';

export default function TestimonialsPage() {
  return (
    <main className="bg-white pt-32">
      <Header1 />

      {/* Hero Section */}
      <section className="relative w-full py-20 bg-gradient-to-b from-darkGray to-dark text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Customer Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            What our satisfied customers say about us
          </motion.p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* Additional Testimonials */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-darkGray mb-12 text-center">More Client Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                company: 'Construction Pro Ltd',
                feedback: 'Excellent quality steel and reliable delivery. They have been our trusted supplier for 10 years.'
              },
              {
                name: 'Priya Singh',
                company: 'Industrial Solutions',
                feedback: 'Best prices in the market with outstanding customer service. Highly recommended!'
              },
              {
                name: 'Amit Patel',
                company: 'Metro Builders',
                feedback: 'Professional team, premium quality products, and timely delivery. Perfect partnership.'
              },
              {
                name: 'Suresh Sharma',
                company: 'Structural Designs Inc',
                feedback: 'They understand our requirements and always deliver beyond expectations. Great work!'
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.feedback}"</p>
                <div>
                  <p className="font-bold text-darkGray">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
