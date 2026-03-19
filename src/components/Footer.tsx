'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Settings {
  shopName?: string;
  email?: string;
  phone?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    shopName: 'MetalForge',
    email: 'info@metalforge.com',
    phone: '+1 (555) 000-0000',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/admin/settings', {
          headers: { 'x-admin-secret': '1234' },
        });
        if (response.ok) {
          const data = await response.json();
          setSettings({
            shopName: data.shopName || 'MetalForge',
            email: data.email || 'info@metalforge.com',
            phone: data.phone || '+1 (555) 000-0000',
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };

    fetchSettings();
  }, []);

  return (
    <motion.footer
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      className="bg-dark border-t border-gold/20 text-lightGray py-12"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-gold font-bold text-lg mb-4">{settings.shopName}</h3>
            <p className="text-sm text-gray-400">
              Premium metal products crafted with precision and excellence.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#products" className="hover:text-gold transition">Products</a></li>
              <li><a href="#contact" className="hover:text-gold transition">Contact</a></li>
              <li><a href="/admin" className="hover:text-gold transition">Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm text-gray-400">
              Email: {settings.email}<br />
              Phone: {settings.phone}
            </p>
          </div>
        </div>

        <div className="border-t border-gold/20 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 {settings.shopName}. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
