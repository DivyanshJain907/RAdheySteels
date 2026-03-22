'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function QuotePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productType: '',
    quantity: '',
    specifications: '',
    deliveryDate: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: `Company: ${formData.company}\nProduct: ${formData.productType}\nQuantity: ${formData.quantity}\nSpecifications: ${formData.specifications}\nDelivery Date: ${formData.deliveryDate}\n\nMessage: ${formData.message}`,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          productType: '',
          quantity: '',
          specifications: '',
          deliveryDate: '',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <Header1 />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 bg-gradient-to-b from-darkGray to-dark text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            Book a Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-300"
          >
            Get a personalized quote for your steel requirements
          </motion.p>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-cream p-4 md:p-8 rounded-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 (555) 000-0000"
                    className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Company/Organization</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  />
                </div>

                {/* Product Type */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Product Type *</label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  >
                    <option value="">Select a product</option>
                    <option value="TMT Steel">TMT Steel</option>
                    <option value="Structural Steel">Structural Steel</option>
                    <option value="Wire Rods">Wire Rods</option>
                    <option value="Steel Plates">Steel Plates</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-darkGray mb-2">Quantity (in tons) *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    placeholder="100"
                    className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                  />
                </div>
              </div>

              {/* Specifications */}
              <div>
                <label className="block text-sm font-medium text-darkGray mb-2">Specifications/Requirements</label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  placeholder="Enter grade, size, dimensions or any specific requirements"
                  rows={3}
                  className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition resize-none"
                />
              </div>

              {/* Delivery Date */}
              <div>
                <label className="block text-sm font-medium text-darkGray mb-2">Required Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-darkGray mb-2">Additional Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any additional details or special requests"
                  rows={4}
                  className="w-full px-4 py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-blue focus:ring-2 focus:ring-blue outline-none transition resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-blue text-white py-3 rounded font-bold hover:bg-primary transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Request Quote'}
              </motion.button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 p-3 rounded text-center"
                >
                  ✓ Quote request submitted successfully! We&apos;ll contact you soon.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Why Request a Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-darkGray mb-8 text-center">Why Request a Quote From Us?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Fast Response', description: 'Get quotes within 24 hours' },
                { title: 'Competitive Pricing', description: 'Best prices in the market' },
                { title: 'Quality Assured', description: 'Premium products guaranteed' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-blue mb-2">✓</div>
                  <h3 className="text-lg font-bold text-darkGray mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
