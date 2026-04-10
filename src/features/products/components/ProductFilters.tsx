// src/features/products/components/ProductFilters.tsx
import { ClearOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select } from 'antd';
import React from 'react';
import type { Category, ProductFilterState } from '../types/product';

interface ProductFiltersProps {
  filters: ProductFilterState;
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value?: number) => void;
  onAvailableChange: (value?: boolean | null) => void;
  onClearFilters: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  categories,
  onSearchChange,
  onCategoryChange,
  onAvailableChange,
  onClearFilters,
}) => {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
      <Input
        placeholder="Buscar por nombre o descripción"
        prefix={<SearchOutlined />}
        value={filters.search}
        onChange={(e) => onSearchChange(e.target.value)}
        allowClear
        style={{ width: 300 }}
      />

      <Select
        placeholder="Categoría"
        allowClear
        value={filters.categoryId}
        onChange={onCategoryChange}
        style={{ width: 200 }}
        options={categories.map(cat => ({
          label: cat.name,
          value: cat.id,
        }))}
      />

      <Select
        placeholder="Disponibilidad"
        allowClear
        value={filters.available}
        onChange={onAvailableChange}
        style={{ width: 150 }}
        options={[
          { label: 'Disponible', value: true },
          { label: 'No disponible', value: false },
        ]}
      />

      <Button
        icon={<ClearOutlined />}
        onClick={onClearFilters}
      >
        Limpiar Filtros
      </Button>
    </div>
  );
};