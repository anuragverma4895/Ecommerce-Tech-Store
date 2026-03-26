import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllProductsAdmin, addProduct, updateProduct, deleteProduct } from '../services/adminService';

const CATEGORIES = ['earbuds', 'headphones', 'laptops', 'phones', 'speakers', 'accessories'];

const emptyProduct = {
  name: '', description: '', price: '', image: '', category: 'earbuds', stock: '', rating: '', featured: false,
};

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState(emptyProduct);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsAdmin();
      setProducts(data.products);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') { setSuccess(msg); setError(''); }
    else { setError(msg); setSuccess(''); }
    setTimeout(() => { setSuccess(''); setError(''); }, 3000);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await addProduct({
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating) || 0,
      });
      showMessage('Product added successfully!');
      setShowAddModal(false);
      setFormData(emptyProduct);
      fetchProducts();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      await updateProduct(selectedProduct._id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        rating: Number(formData.rating) || 0,
      });
      showMessage('Product updated successfully!');
      setShowEditModal(false);
      setSelectedProduct(null);
      setFormData(emptyProduct);
      fetchProducts();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    setFormLoading(true);
    try {
      await deleteProduct(selectedProduct._id);
      showMessage('Product deleted successfully!');
      setShowDeleteModal(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setFormLoading(false);
    }
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      stock: product.stock,
      rating: product.rating,
      featured: product.featured,
    });
    setShowEditModal(true);
  };

  const openDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !filterCategory || p.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const stats = {
    total: products.length,
    categories: [...new Set(products.map((p) => p.category))].length,
    featured: products.filter((p) => p.featured).length,
    lowStock: products.filter((p) => p.stock < 10).length,
  };

  if (!user || !user.isAdmin) return null;

  // --- Modal component ---
  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
            <h3 className="text-lg font-bold text-secondary-900">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-secondary-100 text-secondary-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  // --- Product Form ---
  const ProductForm = ({ onSubmit, submitText }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Name <span className="text-red-500">*</span></label>
        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Description <span className="text-red-500">*</span></label>
        <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Price (₹) <span className="text-red-500">*</span></label>
          <input type="number" required min="0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Stock <span className="text-red-500">*</span></label>
          <input type="number" required min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-1">Image URL <span className="text-red-500">*</span></label>
        <input type="url" required value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Category <span className="text-red-500">*</span></label>
          <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">Rating</label>
          <input type="number" min="0" max="5" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500" />
        <label htmlFor="featured" className="text-sm font-medium text-secondary-700">Featured Product</label>
      </div>
      <button type="submit" disabled={formLoading}
        className="w-full bg-primary-600 text-white py-2.5 rounded-lg hover:bg-primary-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
        {formLoading ? 'Processing...' : submitText}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-900 via-secondary-800 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-secondary-300 mt-1">Manage your products and inventory</p>
            </div>
            <button onClick={() => { setFormData(emptyProduct); setShowAddModal(true); }}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            {success}
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Products', value: stats.total, icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', color: 'primary' },
            { label: 'Categories', value: stats.categories, icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', color: 'accent' },
            { label: 'Featured', value: stats.featured, icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z', color: 'accent' },
            { label: 'Low Stock', value: stats.lowStock, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z', color: stats.lowStock > 0 ? 'red' : 'green' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-soft p-5 border border-secondary-100">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  stat.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                  stat.color === 'accent' ? 'bg-accent-100 text-accent-600' :
                  stat.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} /></svg>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary-900">{stat.value}</p>
                  <p className="text-xs text-secondary-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-soft border border-secondary-100 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
            </div>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2.5 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white min-w-[160px]">
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-soft border border-secondary-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary-50 border-b border-secondary-200">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Product</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Category</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Price</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Stock</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Rating</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Featured</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold text-secondary-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-secondary-100">
                  {filtered.length === 0 ? (
                    <tr><td colSpan="7" className="text-center py-12 text-secondary-400">No products found</td></tr>
                  ) : filtered.map((product) => (
                    <tr key={product._id} className="hover:bg-secondary-50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover bg-secondary-100" />
                          <div>
                            <p className="font-medium text-secondary-900 text-sm">{product.name}</p>
                            <p className="text-xs text-secondary-400 truncate max-w-[200px]">{product.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 capitalize">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-secondary-900">₹{product.price.toLocaleString()}</td>
                      <td className="px-5 py-4">
                        <span className={`text-sm font-medium ${product.stock < 10 ? 'text-red-600' : product.stock < 30 ? 'text-accent-600' : 'text-green-600'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-secondary-700">⭐ {product.rating}</td>
                      <td className="px-5 py-4">
                        {product.featured ? (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">Yes</span>
                        ) : (
                          <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-500">No</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => openEdit(product)} title="Edit"
                            className="p-2 rounded-lg hover:bg-primary-50 text-secondary-400 hover:text-primary-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => openDelete(product)} title="Delete"
                            className="p-2 rounded-lg hover:bg-red-50 text-secondary-400 hover:text-red-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-secondary-100 bg-secondary-50 text-sm text-secondary-500">
              Showing {filtered.length} of {products.length} products
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product">
        <ProductForm onSubmit={handleAdd} submitText="Add Product" />
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onClose={() => { setShowEditModal(false); setSelectedProduct(null); }} title="Edit Product">
        <ProductForm onSubmit={handleEdit} submitText="Update Product" />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onClose={() => { setShowDeleteModal(false); setSelectedProduct(null); }} title="Delete Product">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-secondary-900 mb-2">Are you sure?</h4>
          <p className="text-secondary-500 mb-6">
            This will permanently delete <strong className="text-secondary-900">{selectedProduct?.name}</strong>. This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={() => { setShowDeleteModal(false); setSelectedProduct(null); }}
              className="flex-1 px-4 py-2.5 border border-secondary-300 rounded-lg text-secondary-700 hover:bg-secondary-50 font-medium">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={formLoading}
              className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium disabled:opacity-50">
              {formLoading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
