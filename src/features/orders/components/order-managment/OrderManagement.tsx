import React, { useCallback } from 'react';
import { OrderProvider, useOrderContext } from '../../context/OrderContext';
import { OrderDetailModal } from '../order-detail/OrderDetailModal';
import { OrderFiltersBar } from '../order-filter/OrderFilters';
import { OrderTable } from '../order-table/OrderTable';
import './OrderManagement.scss';

const OrderManagementContent: React.FC = () => {
  const {
    filteredOrders, filters, loading, total, currentPage, pageSize,
    loadOrders, setSearch, setStatus, clearFilters,
    selectedOrder, modalOpen, openDetail, closeDetail, updateOrderStatus,
  } = useOrderContext();

  const handlePaginationChange = useCallback((page: number, size: number) => {
    loadOrders(page, size);
  }, [loadOrders]);

  return (
    <div className="om-wrapper">
      <div className="om-header">
        <div>
          <h1 className="om-title">Órdenes</h1>
          <p className="om-subtitle">
            Gestiona y actualiza el estado de los pedidos de tus clientes.
          </p>
        </div>
      </div>

      <OrderFiltersBar
        filters={filters}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onClearFilters={clearFilters}
      />

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={openDetail}
        pagination={{ current: currentPage, pageSize, total, onChange: handlePaginationChange }}
      />

      <OrderDetailModal
        order={selectedOrder}
        open={modalOpen}
        onClose={closeDetail}
        onStatusUpdated={updateOrderStatus}
      />
    </div>
  );
};

export const OrderManagement: React.FC = () => (
  <OrderProvider>
    <OrderManagementContent />
  </OrderProvider>
);