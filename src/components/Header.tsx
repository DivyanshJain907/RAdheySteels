'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [shopName, setShopName] = useState('MetalForge');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          headers: { 'x-admin-secret': '1234' },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.shopName) {
            setShopName(data.shopName);
          }
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-dark/95 backdrop-blur-sm z-50 border-b border-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="text-2xl font-bold text-gold"
            whileHover={{ scale: 1.05 }}
          >
            ⚔️ {shopName}
          </motion.div>
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-white hover:text-gold transition">
            Home
          </Link>
          <Link href="/#products" className="text-white hover:text-gold transition">
            Products
          </Link>
          <Link href="/#contact" className="text-white hover:text-gold transition">
            Contact
          </Link>
        </nav>

        <Link
          href="/admin"
          className="bg-gold text-dark px-6 py-2 rounded font-semibold hover:bg-gold/90 transition"
        >
          Admin
        </Link>
      </div>
    </motion.header>
  );
}
