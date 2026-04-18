import api from '../../../services/api';
import type { Order, OrderStatus, PaginatedOrders } from '../types/order';

export const OrderService = {
  getOrders: async (
    page = 1,
    pageSize = 10,
    params?: { search?: string; status?: string }
  ): Promise<PaginatedOrders> => {
    const { data } = await api.get('/admin/orders', {
      params: { page, per_page: pageSize, ...params },
    });
    return data;
  },

  getOrder: async (id: number): Promise<Order> => {
    const { data } = await api.get(`/admin/orders/${id}`);
    return data;
  },

updateOrderShipping: async (
  id: number,
  payload: {
    shipping_name: string;
    shipping_phone: string;
    shipping_address: string;
    shipping_city: string;
    shipping_notes?: string;
  }
): Promise<Order> => {
  const { data } = await api.put(`/admin/orders/${id}/shipping`, payload);
  return data;
},

updateOrderStatus: async (
  id: number,
  status: OrderStatus
): Promise<Order> => {
  const { data } = await api.put(`/admin/orders/${id}/status`, { status });
  return data;
},
};