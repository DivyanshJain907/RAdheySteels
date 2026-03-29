'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin text-orange-500 text-3xl">⟳</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Admin Header */}
      <motion.header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <h1 className="text-lg md:text-2xl font-bold text-black">Radhey Steel Admin Dashboard</h1>
          <div className="flex gap-2 md:gap-4 w-full md:w-auto">
            <button
              onClick={() => router.push('/')}
              className="flex-1 md:flex-none bg-orange-500 text-white px-4 md:px-6 py-2 rounded hover:bg-orange-600 transition text-sm md:text-base"
            >
              Landing Page
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none bg-red-600 text-white px-4 md:px-6 py-2 rounded hover:bg-red-700 transition text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.header>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex">
          {['products', 'timeline', 'contacts', 'settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-3 md:py-4 font-semibold transition border-b-2 capitalize text-sm md:text-base ${
                activeTab === tab
                  ? 'text-orange-500 border-orange-500'
                  : 'text-gray-500 border-transparent hover:text-orange-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {activeTab === 'products' && <ProductsTab />}
        {activeTab === 'timeline' && <TimelineTab />}
        {activeTab === 'contacts' && <ContactsTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

function ProductsTab() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    featured: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    console.log('Submitting product with featured value:', formData.featured);

    try {
      const url = editingId ? `/api/products/${editingId}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': token || '',
        },
        body: JSON.stringify({
          ...formData,
          featured: formData.featured === true ? true : false,
        }),
      });

      if (response.ok) {
        setFormData({
          name: '',
          description: '',
          category: '',
          image: '',
          featured: false,
        });
        setEditingId(null);
        setShowForm(false);
        fetchProducts();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || 'Failed to save product'}`);
        console.error('Error response:', errorData);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': token || '' },
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProduct = (product: any) => {
    setFormData({
      name: product.name,
      description: product.description,
      category: product.category,
      image: product.image || '',
      featured: product.featured || false,
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black">Products Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditingId(null);
              setFormData({
                name: '',
                description: '',
                category: '',
                image: '',
                featured: false,
              });
            } else {
              setShowForm(true);
            }
          }}
          className="bg-orange-500 text-white px-6 py-3 rounded font-bold"
        >
          {showForm ? 'Cancel' : '+ Add Product'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 mb-8 border border-gray-200 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6 text-black">{editingId ? 'Edit Product' : 'Add New Product'}</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="col-span-2 px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="col-span-2 px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition resize-none"
              rows={3}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="col-span-2 px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <label className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Featured Product</span>
            </label>

            <button
              type="submit"
              className="col-span-2 bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition"
            >
              {editingId ? 'Update Product' : 'Add Product'}
            </button>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-600">Loading...</div>
      ) : products.length > 0 ? (
        <div className="space-y-4">
          {products.map((product) => (
            <motion.div
              key={product._id}
              className="bg-white rounded-lg p-4 flex justify-between items-center border border-gray-200 shadow-sm"
            >
              <div>
                <h3 className="text-xl font-bold text-black">{product.name}</h3>
                <p className="text-gray-600">{product.category}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition font-semibold text-sm whitespace-nowrap"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800 transition font-semibold text-sm whitespace-nowrap"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-600">No products yet</div>
      )}
    </div>
  );
}

function ContactsTab() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch('/api/contacts', {
        headers: { 'x-admin-secret': token || '' },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-black">Contact Messages</h2>

      {loading ? (
        <div className="text-center py-20 text-gray-600">Loading...</div>
      ) : contacts.length > 0 ? (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-black">{contact.name}</h3>
                  <p className="text-orange-500">{contact.email}</p>
                  {contact.phone && <p className="text-gray-600">{contact.phone}</p>}
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{contact.message}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-600">No messages yet</div>
      )}
    </div>
  );
}

function SettingsTab() {
  const [settings, setSettings] = useState({
    shopName: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch('/api/admin/settings', {
        headers: { 'x-admin-secret': token || '' },
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
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    const token = localStorage.getItem('adminToken');
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': token || '',
        },
        body: JSON.stringify({
          shopName: settings.shopName,
          email: settings.email,
          phone: settings.phone,
        }),
      });

      if (response.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Loading settings...</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-black">Settings</h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-2 text-black">Shop Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Shop Name</label>
                <input
                  type="text"
                  value={settings.shopName}
                  onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`px-4 py-3 rounded text-white ${
                message.includes('successfully')
                  ? 'bg-green-600'
                  : 'bg-red-600'
              }`}
            >
              {message}
            </motion.div>
          )}

          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="bg-orange-500 text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

function TimelineTab() {
  const [timelineEntries, setTimelineEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    heading: '',
    year: new Date().getFullYear(),
    image: '',
  });

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      const response = await fetch('/api/timeline');
      if (response.ok) {
        const data = await response.json();
        setTimelineEntries(data);
      }
    } catch (error) {
      console.error('Error fetching timeline:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');

    try {
      const url = editingId ? `/api/timeline/${editingId}` : '/api/timeline';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': token || '',
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year.toString()),
        }),
      });

      if (response.ok) {
        setFormData({
          heading: '',
          year: new Date().getFullYear(),
          image: '',
        });
        setEditingId(null);
        setShowForm(false);
        fetchTimeline();
      }
    } catch (error) {
      console.error('Error saving timeline entry:', error);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    const token = localStorage.getItem('adminToken');

    try {
      const response = await fetch(`/api/timeline/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-secret': token || '' },
      });

      if (response.ok) {
        fetchTimeline();
      }
    } catch (error) {
      console.error('Error deleting timeline entry:', error);
    }
  };

  const handleEditEntry = (entry: any) => {
    setFormData({
      heading: entry.heading,
      year: entry.year,
      image: entry.image || '',
    });
    setEditingId(entry._id);
    setShowForm(true);
  };

  if (loading) {
    return <div className="text-center py-20 text-gray-600">Loading timeline...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-black">Timeline Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditingId(null);
              setFormData({
                heading: '',
                year: new Date().getFullYear(),
                image: '',
              });
            } else {
              setShowForm(true);
            }
          }}
          className="bg-orange-500 text-white px-6 py-3 rounded font-bold"
        >
          {showForm ? 'Cancel' : '+ Add Timeline Entry'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 mb-8 border border-gray-200 shadow-lg"
        >
          <h3 className="text-xl font-bold mb-6 text-black">{editingId ? 'Edit Timeline Entry' : 'Add New Timeline Entry'}</h3>
          <form onSubmit={handleAddEntry} className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              required
              className="col-span-2 px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              required
              className="px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="px-4 py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition"
            />

            <button
              type="submit"
              className="col-span-2 bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition"
            >
              {editingId ? 'Update Entry' : 'Add Entry'}
            </button>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {timelineEntries.length > 0 ? (
          timelineEntries.map((entry) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-orange-500 font-bold text-lg">{entry.year}</span>
                    <h3 className="text-lg font-bold text-darkGray">{entry.heading}</h3>
                  </div>
                  {entry.image && (
                    <p className="text-xs text-gray-500">Image URL: {entry.image.substring(0, 50)}...</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition font-semibold text-sm whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry._id)}
                    className="bg-slate-700 text-white px-6 py-2 rounded hover:bg-slate-800 transition font-semibold text-sm whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-300">
            <p className="text-gray-600">No timeline entries yet. Create your first entry!</p>
          </div>
        )}
      </div>
    </div>
  );
}
