import { useCallback, useState } from 'react';
import type { Order, OrderFilters, OrderStatus } from '../types/order';

const INITIAL_FILTERS: OrderFilters = { search: '', status: null };

export const useOrderFilters = (orders: Order[]) => {
  const [filters, setFilters] = useState<OrderFilters>(INITIAL_FILTERS);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      !filters.search ||
      order.order_number.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.shipping_name.toLowerCase().includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || order.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const setSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  }, []);

  const setStatus = useCallback((value: OrderStatus | null) => {
    setFilters((prev) => ({ ...prev, status: value }));
  }, []);

  const clearFilters = useCallback(() => setFilters(INITIAL_FILTERS), []);

  return { filters, filteredOrders, setSearch, setStatus, clearFilters };
};