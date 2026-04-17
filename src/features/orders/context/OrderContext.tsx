import React, { createContext, useCallback, useContext, useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { useOrderFilters } from '../hooks/useOrderFilters';
import { OrderService } from '../services/orderService';
import type { Order, OrderFilters, OrderStatus } from '../types/order';

interface OrderContextType {
  // datos
  filteredOrders: Order[];
  filters: OrderFilters;
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  // acciones de tabla
  loadOrders: (page: number, size: number) => void;
  setSearch: (value: string) => void;
  setStatus: (value: OrderStatus | null) => void;
  clearFilters: () => void;
  // detalle / modal
  selectedOrder: Order | null;
  modalOpen: boolean;
  openDetail: (order: Order) => void;
  closeDetail: () => void;
  updateOrderStatus: (id: number, status: OrderStatus) => Promise<void>;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { orders, loading, total, currentPage, pageSize, loadOrders, refetch } = useOrders();
  const { filters, filteredOrders, setSearch, setStatus, clearFilters } = useOrderFilters(orders);

  const openDetail = useCallback((order: Order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  }, []);

  const closeDetail = useCallback(() => {
    setModalOpen(false);
    setSelectedOrder(null);
  }, []);

  const updateOrderStatus = useCallback(async (id: number, status: OrderStatus) => {
    const updated = await OrderService.updateStatus(id, status);
    setSelectedOrder((prev) => (prev?.id === id ? { ...prev, status: updated.status } : prev));
    await refetch();
  }, [refetch]);

  return (
    <OrderContext.Provider value={{
      filteredOrders, filters, loading, total, currentPage, pageSize,
      loadOrders, setSearch, setStatus, clearFilters,
      selectedOrder, modalOpen, openDetail, closeDetail, updateOrderStatus,
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = (): OrderContextType => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrderContext debe usarse dentro de OrderProvider');
  return ctx;
};