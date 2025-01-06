import api from './api';
import { Product } from '@/types/types';

export const fetchProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const createProduct = async (product: Product) => {
  const response = await api.post('/products', product);
  return response.data;
};

export const updateProduct = async (id: number, product: Product) => {
  const response = await api.put(`/products/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
