import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import React from 'react';
import type { OrderFilters, OrderStatus } from '../../types/order';
import './OrderFilters.scss';

const STATUS_OPTIONS = [
  { value: 'pending',    label: 'Pendiente' },
  { value: 'processing', label: 'En proceso' },
  { value: 'completed',  label: 'Completada' },
  { value: 'cancelled',  label: 'Cancelada' },
];

interface OrderFiltersProps {
  filters: OrderFilters;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: OrderStatus | null) => void;
  onClearFilters: () => void;
}

export const OrderFiltersBar: React.FC<OrderFiltersProps> = ({
  filters,
  onSearchChange,
  onStatusChange,
  onClearFilters,
}) => {
  const hasActiveFilters = !!filters.search || !!filters.status;

  return (
    <div className="of-wrapper">
      <Input
        placeholder="Buscar por # orden o cliente..."
        prefix={<SearchOutlined />}
        value={filters.search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{ flex: 1, minWidth: 200, maxWidth: 360 }}
        allowClear
      />
      <Select
        placeholder="Estado"
        value={filters.status ?? undefined}
        onChange={(val) => onStatusChange(val ?? null)}
        options={STATUS_OPTIONS}
        style={{ minWidth: 160 }}
        allowClear
      />
      {hasActiveFilters && (
        <Button onClick={onClearFilters}>Limpiar filtros</Button>
      )}
    </div>
  );
};