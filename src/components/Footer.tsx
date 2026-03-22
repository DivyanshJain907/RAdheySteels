'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Settings {
  shopName?: string;
  email?: string;
  phone?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    shopName: 'Radhey Raman Steel Suppliers',
    email: 'info@radheysteels.com',
    phone: '+91 (555) 000-0000',
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
            shopName: data.shopName || 'Radhey Raman Steel Suppliers',
            email: data.email || 'info@radheysteels.com',
            phone: data.phone || '+91 (555) 000-0000',
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
      className="bg-cream border-t border-gray-200 text-darkGray py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          <div>
            <Image 
              src="/logo.png" 
              alt="Radhey Raman Steels Logo" 
              width={140} 
              height={140}
              className="w-auto h-20 md:h-28 mb-3 md:mb-4"
            />
            <h3 className="text-blue font-bold text-base md:text-lg mb-3 md:mb-4">{settings.shopName}</h3>
            <p className="text-xs md:text-sm text-gray-600">
              Authorised dealer of RINL/SAIL in UP. The foundation of trust since 1979.
            </p>
          </div>

          <div>
            <h4 className="text-darkGray font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-600">
              <li><a href="#products" className="hover:text-blue transition">Products</a></li>
              <li><a href="#contact" className="hover:text-blue transition">Contact</a></li>
              <li><a href="/admin" className="hover:text-blue transition">Admin</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-darkGray font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
            <p className="text-xs md:text-sm text-gray-600">
              Email: {settings.email}<br />
              Phone: {settings.phone}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-500">
          <p>&copy; 2026 {settings.shopName}. All rights reserved.</p>
          <p className="mt-2">
            Developed by <a href="https://divyanshjainportfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-blue hover:underline">Jain Agency</a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
