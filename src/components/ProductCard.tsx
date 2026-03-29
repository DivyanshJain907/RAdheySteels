'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { createPortal } from 'react-dom';

interface ProductCardProps {
  _id?: string;
  id?: string;
  name: string;
  price?: number;
  category: string;
  image?: string;
  description: string;
  featured?: boolean;
}

export default function ProductCard({
  name,
  price,
  category,
  image,
  description,
  featured,
}: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const handleWhatsAppInquiry = () => {
    const phoneNumber = '917905245645';
    const message = `Hi! I would like to know more about ${name}. Can you provide me with details and pricing?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    setShowModal(false);
  };

  const handleEmailInquiry = () => {
    const emailSubject = `Inquiry about ${name}`;
    const emailBody = `Hello,\n\nI would like to know more about the following product:\n\nProduct: ${name}\nCategory: ${category}\n\nPlease provide me with details and pricing.\n\nThank you!`;
    const mailtoURL = `mailto:info@radheyramensteel.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoURL;
    setShowModal(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -10 }}
        onClick={() => setShowModal(true)}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-500 transition group shadow-md hover:shadow-lg cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative h-40 md:h-56 lg:h-64 bg-gray-200 overflow-hidden">
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition duration-300"
            />
          )}
          {featured && (
            <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-orange-500 text-sm uppercase tracking-widest mb-2 font-semibold">
            {category}
          </p>
          <h3 className="text-darkGray text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

          <div className="flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition shadow-md w-full"
            >
              Enquire Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Inquiry Modal - Rendered as Portal */}
      {showModal && typeof document !== 'undefined' && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999] p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-2xl w-full max-w-sm px-6 py-8 relative"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
              <p className="text-orange-500 font-semibold text-sm uppercase">{category}</p>
            </div>

            {image && (
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <p className="text-gray-700 text-base mb-8 text-center">{description}</p>

            <div className="mt-6 flex flex-col gap-4">
              <button
                onClick={handleWhatsAppInquiry}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-3 rounded-lg transition"
              >
                WhatsApp Inquiry
              </button>

              <button
                onClick={handleEmailInquiry}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-lg py-3 rounded-lg transition"
              >
                Email Inquiry
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg py-3 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>,
        document.body
      )}
    </>
  );
}
