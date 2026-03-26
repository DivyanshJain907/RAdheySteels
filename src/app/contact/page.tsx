'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main className="bg-white">
      <Header1 />

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 bg-gradient-to-r from-gray-700 via-orange-500 to-gray-700 text-white px-4 -mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-300"
          >
            Get in touch with our team for any inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12">
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
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <span className="text-lg">📍</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Address</h3>
                  <p className="text-gray-600">
                    Sales Office: 76-A Factory area fazalganj, Kanpur-208012<br/>
                    Warehouse: Arazi no. 444/445 bhautipratappur, Kanpur-209305
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <span className="text-lg">📞</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Phone</h3>
                  <p className="text-gray-600">+91 7905245645 | +91 9389708460</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <span className="text-lg">✉️</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Email</h3>
                  <p className="text-gray-600">info.rrss.co@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
                    <span className="text-lg">⏰</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-darkGray">Business Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br/>
                    Sunday: Close
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-darkGray mb-4">Our Location</h2>
            <p className="text-gray-600">Visit our sales office at the address below</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="rounded-lg overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.8!2d80.3072613!3d26.4581257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c478e54ad8293%3A0x50640de0dacc1e1f!2sRadhey%20Raman%20Steel%20suppliers!5e0!3m2!1sen!2sin!4v1711353600000"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-darkGray mb-4">Sales Office Address</h3>
            <p className="text-gray-600 leading-relaxed">
              <strong>Fact Area, 123/768/A(10)</strong><br />
              Fazalganj Industrial Estate, Fazalganj<br />
              Shastri Nagar, Kanpur<br />
              Uttar Pradesh 208012, India
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
