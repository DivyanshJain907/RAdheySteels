'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import { Testimonials } from '@/components/Testimonials';

export default function TestimonialsPage() {
  return (
    <main className="bg-white">
      <Header1 />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white px-4 -mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            Customer Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-300"
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
      <section className="py-12 md:py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-darkGray mb-8 md:mb-12 text-center">More Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
                <p className="text-gray-600 mb-4 italic">&quot; {testimonial.feedback} &quot;</p>
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
