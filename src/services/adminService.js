import api from './api';

export const getAllProductsAdmin = async () => {
  try {
    const response = await api.get('/admin/products');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await api.post('/admin/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add product');
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/admin/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};
