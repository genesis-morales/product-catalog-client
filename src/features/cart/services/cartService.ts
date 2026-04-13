import api from '../../../services/api';
import type { Cart } from '../types/cart';

export class CartService {
  static async getCart(): Promise<Cart> {
    const response = await api.get('/cart');
    return response.data;
  }

  static async addItem(productId: number, quantity: number = 1): Promise<Cart> {
    const response = await api.post('/cart/items', { product_id: productId, quantity });
    return response.data;
  }

  static async updateItem(itemId: number, quantity: number): Promise<Cart> {
    const response = await api.put(`/cart/items/${itemId}`, { quantity });
    return response.data;
  }

  static async removeItem(itemId: number): Promise<Cart> {
  const response = await api.delete(`/cart/items/${itemId}`);
  return response.data;
  }
}