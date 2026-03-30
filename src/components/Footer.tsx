'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Settings {
  shopName?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export default function Footer() {
  const [settings, setSettings] = useState<Settings>({
    shopName: 'Radhey Raman Steel Suppliers',
    email: 'info.rrss.co@gmail.com',
    phone: '+91 7905245645 | +91 9389708460',
  });

  useEffect(() => {
    // Fetch settings from database (optional - using hardcoded values as fallback)
    // const fetchSettings = async () => {
    //   try {
    //     const response = await fetch('/api/admin/settings', {
    //       headers: { 'x-admin-secret': '1234' },
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       setSettings({
    //         shopName: data.shopName || 'Radhey Raman Steel Suppliers',
    //         email: data.email || 'info.rrss.co@gmail.com',
    //         phone: data.phone || '+91 7905245645 | +91 9389708460',
    //       });
    //     }
    //   } catch (error) {
    //     console.error('Error fetching settings:', error);
    //   }
    // };

    // fetchSettings();
  }, []);

  return (
    <motion.footer
      initial={{ y: 100 }}
      whileInView={{ y: 0 }}
      className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-600 border-t border-gray-600 text-white py-12 md:py-16"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <Image 
              src="/logo.png" 
              alt="Radhey Raman Steels Logo" 
              width={80} 
              height={80}
              className="w-16 md:w-24 h-auto mb-3 md:mb-4"
            />
            <h3 className="text-white font-bold text-base md:text-lg mb-3 md:mb-4">{settings.shopName}</h3>
            <p className="text-xs md:text-sm text-gray-200">
              Authorised dealer of RINL/SAIL in UP. The foundation of trust since 1979.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-2 text-xs md:text-sm text-gray-200">
              <li><a href="#products" className="hover:text-yellow-300 transition">Products</a></li>
              <li><a href="#contact" className="hover:text-yellow-300 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Contact</h4>
            <p className="text-xs md:text-sm text-gray-200">
              Email: {settings.email}<br />
              Phone: {settings.phone}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Address</h4>
            <p className="text-xs md:text-sm text-gray-200 mb-3">
              <span className="font-semibold">Sales Office:</span><br />
              <a 
                href="https://maps.app.goo.gl/2X6VNRN8tyGU8EQU7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                76-A Factory area fazalganj<br />
                Kanpur-208012
              </a>
            </p>
            <p className="text-xs md:text-sm text-gray-200">
              <span className="font-semibold">Warehouse:</span><br />
              <a 
                href="https://www.google.com/maps/search/Arazi+no.+444/445+bhautipratappur+Kanpur+209305" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-300 transition"
              >
                Arazi no. 444/445 bhautipratappur<br />
                Kanpur-209305
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-orange-600 pt-6 md:pt-8 text-center text-xs md:text-sm text-gray-300">
          <p>&copy; 2026 {settings.shopName}. All rights reserved.</p>
          <p className="mt-2">
            Developed by <a href="https://divyanshjainportfolio.vercel.app" target="_blank" rel="noopener noreferrer" className="text-yellow-300 hover:underline">Jain Agency</a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
