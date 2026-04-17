import { useCallback, useEffect, useState } from 'react';
import { OrderService } from '../services/orderService';
import type { Order } from '../types/order';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadOrders = useCallback(
    async (page = 1, size = 10, params?: { search?: string; status?: string }) => {
      setLoading(true);
      try {
        const res = await OrderService.getOrders(page, size, params);
        setOrders(res.data);
        setTotal(res.total);
        setCurrentPage(res.current_page);
        setPageSize(res.per_page);
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  return { orders, loading, total, currentPage, pageSize, loadOrders, refetch: () => loadOrders(currentPage, pageSize) };
};