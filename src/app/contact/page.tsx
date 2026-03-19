'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Get in touch with our team for any inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-darkGray mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? Reach out to us anytime. Our team is here to help!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue text-white">
                    <span className="text-lg">📍</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Address</h3>
                  <p className="text-gray-600">
                    Radhey Raman Steel<br/>
                    Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue text-white">
                    <span className="text-lg">📞</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Phone</h3>
                  <p className="text-gray-600">+91 (555) 000-0000</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue text-white">
                    <span className="text-lg">✉️</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Email</h3>
                  <p className="text-gray-600">info@radheysteels.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue text-white">
                    <span className="text-lg">⏰</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br/>
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-cream p-8 rounded-lg"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
