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
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
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

  const categories = Array.from(
    new Set(products.map((product) => String(product.category || '').trim()).filter(Boolean))
  ).sort((a, b) => a.localeCompare(b));

  const filteredProducts = products.filter((product) => {
    const name = String(product.name || '').toLowerCase();
    const category = String(product.category || '').toLowerCase();
    const search = searchTerm.trim().toLowerCase();

    const searchMatch = !search || name.includes(search) || category.includes(search);
    const categoryMatch =
      categoryFilter === 'all' ||
      String(product.category || '').trim().toLowerCase() === categoryFilter.toLowerCase();

    return searchMatch && categoryMatch;
  });

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

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by product name or category"
            className="md:col-span-2 px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing {filteredProducts.length} of {products.length} products
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-600">Loading...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="space-y-4">
          {filteredProducts.map((product) => (
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
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const statusOptions = ['new', 'contacted', 'quoted', 'won', 'lost'];
  const priorityOptions = ['low', 'medium', 'high'];

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

  const handleContactFieldChange = (id: string, field: string, value: any) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact._id === id
          ? {
              ...contact,
              [field]: value,
            }
          : contact
      )
    );
  };

  const handleSaveContact = async (contact: any) => {
    const token = localStorage.getItem('adminToken');
    setSavingId(contact._id);

    try {
      const response = await fetch(`/api/contacts/${contact._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': token || '',
        },
        body: JSON.stringify({
          seen: contact.seen,
          status: contact.status || 'new',
          priority: contact.priority || 'medium',
          notes: contact.notes || '',
          followUpAt: contact.followUpAt || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to save lead update: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to save lead update.');
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteContact = async (id: string) => {
    const token = localStorage.getItem('adminToken');
    const shouldDelete = window.confirm('Are you sure you want to delete this lead?');

    if (!shouldDelete) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-secret': token || '',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to delete lead: ${errorData.error || 'Unknown error'}`);
        return;
      }

      setContacts((prev) => prev.filter((contact) => contact._id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete lead.');
    } finally {
      setDeletingId(null);
    }
  };

  const exportContactsCsv = () => {
    if (!contacts.length) {
      return;
    }

    const headers = [
      'Name',
      'Email',
      'Phone',
      'Status',
      'Priority',
      'Seen',
      'FollowUpAt',
      'CreatedAt',
      'Message',
      'Notes',
    ];

    const escapeCell = (value: any) => `"${String(value ?? '').replace(/"/g, '""')}"`;

    const rows = contacts.map((contact) => [
      contact.name,
      contact.email,
      contact.phone || '',
      contact.status || 'new',
      contact.priority || 'medium',
      Boolean(contact.seen) ? 'yes' : 'no',
      contact.followUpAt ? new Date(contact.followUpAt).toISOString() : '',
      contact.createdAt ? new Date(contact.createdAt).toISOString() : '',
      contact.message || '',
      contact.notes || '',
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCell).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredContacts = contacts.filter((contact) => {
    const search = searchTerm.trim().toLowerCase();
    const name = String(contact.name || '').toLowerCase();
    const email = String(contact.email || '').toLowerCase();
    const phone = String(contact.phone || '').toLowerCase();

    const searchMatch = !search || name.includes(search) || email.includes(search) || phone.includes(search);
    const statusMatch = statusFilter === 'all' || (contact.status || 'new') === statusFilter;
    const priorityMatch = priorityFilter === 'all' || (contact.priority || 'medium') === priorityFilter;

    return searchMatch && statusMatch && priorityMatch;
  });

  const pipelineStats = {
    total: contacts.length,
    new: contacts.filter((c) => (c.status || 'new') === 'new').length,
    quoted: contacts.filter((c) => c.status === 'quoted').length,
    won: contacts.filter((c) => c.status === 'won').length,
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-2">
        <h2 className="text-3xl font-bold text-black">Leads & Contact Messages</h2>
        <button
          onClick={exportContactsCsv}
          className="bg-slate-700 text-white px-4 py-2 rounded hover:bg-slate-800 transition text-sm font-semibold"
        >
          Export CSV
        </button>
      </div>
      <p className="text-gray-600 mb-6">Track lead stage, priority, follow-up and notes from one place.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
          <p className="text-xs text-gray-500">Total Leads</p>
          <p className="text-xl font-bold text-gray-900">{pipelineStats.total}</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-xs text-blue-600">New</p>
          <p className="text-xl font-bold text-blue-700">{pipelineStats.new}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
          <p className="text-xs text-yellow-700">Quoted</p>
          <p className="text-xl font-bold text-yellow-800">{pipelineStats.quoted}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-lg p-3">
          <p className="text-xs text-green-700">Won</p>
          <p className="text-xl font-bold text-green-800">{pipelineStats.won}</p>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or phone"
            className="md:col-span-2 px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
          >
            <option value="all">All stages</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-800"
          >
            <option value="all">All priorities</option>
            {priorityOptions.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm text-gray-600 mt-3">
          Showing {filteredContacts.length} of {contacts.length} leads
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-600">Loading...</div>
      ) : filteredContacts.length > 0 ? (
        <div className="space-y-4">
          {filteredContacts.map((contact) => (
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

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Lead Stage</label>
                  <select
                    value={contact.status || 'new'}
                    onChange={(e) => handleContactFieldChange(contact._id, 'status', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-800"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Priority</label>
                  <select
                    value={contact.priority || 'medium'}
                    onChange={(e) => handleContactFieldChange(contact._id, 'priority', e.target.value)}
                    className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-800"
                  >
                    {priorityOptions.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Follow-up Date</label>
                  <input
                    type="date"
                    value={contact.followUpAt ? new Date(contact.followUpAt).toISOString().slice(0, 10) : ''}
                    onChange={(e) =>
                      handleContactFieldChange(contact._id, 'followUpAt', e.target.value ? new Date(e.target.value).toISOString() : null)
                    }
                    className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-800"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={Boolean(contact.seen)}
                      onChange={(e) => handleContactFieldChange(contact._id, 'seen', e.target.checked)}
                    />
                    Mark as Seen
                  </label>
                </div>
              </div>

              <p className="text-gray-700">{contact.message}</p>

              <div className="mt-4">
                <label className="block text-xs text-gray-500 mb-1">Internal Notes</label>
                <textarea
                  value={contact.notes || ''}
                  onChange={(e) => handleContactFieldChange(contact._id, 'notes', e.target.value)}
                  className="w-full px-3 py-2 rounded border border-gray-300 bg-white text-gray-800 resize-none"
                  rows={3}
                  placeholder="Add follow-up details, quote notes, or customer requirements"
                />
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => handleDeleteContact(contact._id)}
                  disabled={deletingId === contact._id}
                  className="bg-slate-700 text-white px-5 py-2 rounded hover:bg-slate-800 transition disabled:opacity-60"
                >
                  {deletingId === contact._id ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => handleSaveContact(contact)}
                  disabled={savingId === contact._id}
                  className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600 transition disabled:opacity-60"
                >
                  {savingId === contact._id ? 'Saving...' : 'Save Lead Update'}
                </button>
              </div>
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
          heading: formData.heading,
          year: parseInt(formData.year.toString()),
          image: formData.image || '',
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
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || 'Failed to save timeline entry'));
      }
    } catch (error) {
      console.error('Error saving timeline entry:', error);
      alert('Error saving timeline entry: ' + (error instanceof Error ? error.message : 'Unknown error'));
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-3">
        <h2 className="text-2xl md:text-3xl font-bold text-black">Timeline Management</h2>
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
          className="w-full md:w-auto bg-orange-500 text-white px-4 md:px-6 py-2 md:py-3 rounded font-bold text-sm md:text-base"
        >
          {showForm ? 'Cancel' : '+ Add Timeline Entry'}
        </motion.button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-4 md:p-8 mb-6 md:mb-8 border border-gray-200 shadow-lg"
        >
          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-black">{editingId ? 'Edit Timeline Entry' : 'Add New Timeline Entry'}</h3>
          <form onSubmit={handleAddEntry} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              required
              className="col-span-1 md:col-span-2 px-3 md:px-4 py-2 md:py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition text-sm md:text-base"
            />

            <input
              type="number"
              placeholder="Year"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              required
              className="px-3 md:px-4 py-2 md:py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition text-sm md:text-base"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="px-3 md:px-4 py-2 md:py-3 bg-white text-darkGray rounded border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 outline-none transition text-sm md:text-base"
            />

            <button
              type="submit"
              className="col-span-1 md:col-span-2 bg-orange-500 text-white py-2 md:py-3 rounded font-bold hover:bg-orange-600 transition text-sm md:text-base"
            >
              {editingId ? 'Update Entry' : 'Add Entry'}
            </button>
          </form>
        </motion.div>
      )}

      <div className="space-y-3 md:space-y-4">
        {timelineEntries.length > 0 ? (
          timelineEntries.map((entry) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 md:gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span className="text-orange-500 font-bold text-base md:text-lg">{entry.year}</span>
                    <h3 className="text-base md:text-lg font-bold text-darkGray break-words">{entry.heading}</h3>
                  </div>
                  {entry.image && (
                    <p className="text-xs text-gray-500 break-all">Image URL: {entry.image.substring(0, 50)}...</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="flex-1 md:flex-none bg-orange-500 text-white px-4 md:px-6 py-2 rounded hover:bg-orange-600 transition font-semibold text-xs md:text-sm whitespace-nowrap"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEntry(entry._id)}
                    className="flex-1 md:flex-none bg-slate-700 text-white px-4 md:px-6 py-2 rounded hover:bg-slate-800 transition font-semibold text-xs md:text-sm whitespace-nowrap"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 md:py-12 bg-gray-50 rounded-lg border border-gray-300">
            <p className="text-gray-600 text-sm md:text-base">No timeline entries yet. Create your first entry!</p>
          </div>
        )}
      </div>
    </div>
  );
}
