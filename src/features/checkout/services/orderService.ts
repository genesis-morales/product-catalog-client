import api from '../../../services/api';
import type { Order, ShippingData } from '../types/order';

export class OrderService {
  static async createOrder(data: ShippingData): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data;
  }

  static async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  }

  static async getOrder(id: number): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  }
}