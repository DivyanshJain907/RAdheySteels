'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';

export default function AboutPage() {
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
            About Radhey Raman Steel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-gray-300"
          >
            Your trusted steel supplier since 1979
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-lg text-gray-300 mt-3 md:mt-4"
          >
            Radhey raman steel suppliers is one of the leading wholesale 
            iron/steel supplier providing a huge variety of high grade
            iron steel materials.
          </motion.p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-12 md:mb-16"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-darkGray mb-4 md:mb-6">Our Story</h2>
              <p className="text-gray-600 text-base md:text-lg mb-3 md:mb-4">
                Radhey Raman Steel Suppliers is the authorised dealer of SAIL/RINL in Uttar Pradesh. 
                It stands as a trusted name in the iron and steel industry, delivering strength, reliability and quality 
                to the backbone of modern construction and various infrastructure projects.
              </p>
              <p className="text-gray-600 text-base md:text-lg mb-3 md:mb-4">
                We are a leading wholesale supplier of high grade steel and iron materials serving a wide spectrum of products 
                with a huge client based network. We ensure that every product meets the highest standards of durability and 
                building lasting partnership with our clients.
              </p>
              <p className="text-gray-600 text-base md:text-lg">
                Our commitment to quality, reliability, and customer satisfaction has made us a preferred choice 
                for contractors, builders, and industrial units across Uttar Pradesh and beyond.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-orange-500 text-white p-6 md:p-8 rounded-lg"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Key Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>45+ years of experience</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Authorized RINL/SAIL Dealer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Wide product range</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Competitive pricing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  <span>Fast delivery</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="border-l-4 border-orange-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-darkGray mb-3">Our Mission</h3>
              <p className="text-gray-600">
                To provide high-quality steel products and exceptional customer service that enables our clients 
                to build stronger structures and achieve their goals.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="border-l-4 border-orange-500 pl-6"
            >
              <h3 className="text-2xl font-bold text-darkGray mb-3">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and reliable steel supplier in the region, known for our quality, 
                integrity, and commitment to customer success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-darkGray mb-8 md:mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[
              { title: 'Quality Products', description: 'Premium steel from authorized RINL/SAIL dealers ensuring superior quality' },
              { title: 'Expert Team', description: 'Knowledgeable staff ready to assist with product selection and specifications' },
              { title: 'Competitive Prices', description: 'Best market rates without compromising on quality' },
              { title: 'Timely Delivery', description: 'Reliable logistics ensuring on-time delivery to your location' },
              { title: 'Warranty Support', description: 'Complete warranty and after-sales support for all products' },
              { title: 'Trusted Partner', description: '45+ years of serving satisfied customers across multiple sectors' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-xl font-bold text-orange-500 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
