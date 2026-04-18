import { useEffect, useState } from 'react';
import { DashboardService } from '../services/dashboardService';
import type { DashboardStats, MonthlySale, RecentOrder, TopProduct } from '../types/dashboard';

interface DashboardData {
  stats:        DashboardStats | null;
  monthlySales: MonthlySale[];
  recentOrders: RecentOrder[];
  topProducts:  TopProduct[];
  loading:      boolean;
  error:        boolean;
}

export const useDashboard = (): DashboardData => {
  const [stats,        setStats]        = useState<DashboardStats | null>(null);
  const [monthlySales, setMonthlySales] = useState<MonthlySale[]>([]);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts,  setTopProducts]  = useState<TopProduct[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError(false);
        const [s, ms, ro, tp] = await Promise.all([
          DashboardService.getStats(),
          DashboardService.getMonthlySales(),
          DashboardService.getRecentOrders(),
          DashboardService.getTopProducts(),
        ]);
        setStats(s);
        setMonthlySales(ms);
        setRecentOrders(ro);
        setTopProducts(tp);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { stats, monthlySales, recentOrders, topProducts, loading, error };
};