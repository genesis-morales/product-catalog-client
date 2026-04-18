import api from '../../../services/api';
import type { DashboardStats, MonthlySale, RecentOrder, TopProduct } from '../types/dashboard';

export const DashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const { data } = await api.get('/admin/dashboard/stats');
    return data;
  },

  getMonthlySales: async (): Promise<MonthlySale[]> => {
    const { data } = await api.get('/admin/dashboard/monthly-sales');
    return data;
  },

  getRecentOrders: async (): Promise<RecentOrder[]> => {
    const { data } = await api.get('/admin/dashboard/recent-orders');
    return data;
  },

  getTopProducts: async (): Promise<TopProduct[]> => {
    const { data } = await api.get('/admin/dashboard/top-products');
    return data;
  },
};