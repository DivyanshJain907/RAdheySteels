'use client';

import { motion } from 'framer-motion';
import { Header1 } from '@/components/ui/header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const services = [
    {
      title: 'Steel Product Supply',
      description: 'Wide range of TMT steel, structural steel, wire rods, and steel plates from RINL/SAIL',
      features: ['TMT Bars', 'Structural Steel', 'Wire Rods', 'Steel Plates', 'Custom Orders']
    },
    {
      title: 'Bulk Supply',
      description: 'Efficient bulk supply solutions for large construction projects and industrial needs',
      features: ['Volume Discounts', 'Fleet Delivery', 'Project Scheduling', 'Quality Assurance', 'Custom Quantities']
    },
    {
      title: 'Technical Consultation',
      description: 'Expert guidance on steel selection based on your project requirements',
      features: ['Specification Review', 'Load Calculation', 'Quality Standards', 'Best Practices', 'Project Planning']
    },
    {
      title: 'Logistics & Delivery',
      description: 'Reliable delivery services ensuring your materials arrive on time and in perfect condition',
      features: ['Same Day Delivery', 'Scheduled Delivery', 'Safe Handling', 'Tracking System', 'Damage-Free Guarantee']
    },
    {
      title: 'After-Sales Support',
      description: 'Comprehensive support for all your post-purchase needs',
      features: ['Warranty Coverage', 'Replacement Policy', 'Technical Support', 'Quality Complaints', 'Customer Care']
    },
    {
      title: 'Quote & Estimation',
      description: 'Quick and accurate quotes for your steel requirements',
      features: ['Free Quotation', 'Custom Pricing', 'Volume Rates', 'Fast Response', 'Flexible Terms']
    },
  ];

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
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300"
          >
            Comprehensive steel supply solutions for your projects
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition"
              >
                <h3 className="text-2xl font-bold text-blue mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-blue font-bold">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="py-20 px-4 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-darkGray mb-12 text-center">Why Choose Our Services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Reliability', description: 'Consistent quality and on-time delivery every single time' },
              { title: 'Expertise', description: 'Years of experience in steel industry and customer satisfaction' },
              { title: 'Affordability', description: 'Competitive pricing without compromising on quality' },
              { title: 'Support', description: '24/7 customer support for all your queries and concerns' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white p-6 rounded-lg border-l-4 border-blue"
              >
                <h3 className="text-xl font-bold text-darkGray mb-2">{item.title}</h3>
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
