'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Invalid password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 pt-16 md:pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg">
          <div className="flex justify-center mb-4 md:mb-6">
            <Image 
              src="/logo.png" 
              alt="Radhey Raman Steels Logo" 
              width={160} 
              height={160}
              className="w-auto h-32"
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-black">
            Radhey Raman Steel
          </h1>
          <p className="text-gray-600 text-center mb-6 md:mb-8 text-sm md:text-base">
            Admin Portal
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="password" className="block text-xs md:text-sm font-medium mb-2 text-darkGray">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 md:py-3 bg-white text-darkGray placeholder-gray-400 rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition text-sm md:text-base"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs md:text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 md:py-3 rounded font-bold hover:bg-orange-600 transition disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-gray-600 text-xs md:text-sm mt-6 md:mt-8">
          Protected area. Unauthorized access is prohibited.
        </p>
      </motion.div>
    </div>
  );
}
