import api from '../../../services/api';
import type { Product } from '../../products/types/product';

export class StoreService {
static async getAllProducts(): Promise<Product[]> {
  const response = await api.get('/products/all');
  const data = response.data;
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
  }

  static async getProductById(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }
}