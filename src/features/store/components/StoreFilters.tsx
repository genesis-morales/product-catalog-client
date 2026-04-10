import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Select, Slider } from 'antd';
import React from 'react';
import type { StoreSortOption } from '../hooks/useStoreProducts';

interface StoreFiltersProps {
  search: string;
  priceRange: [number, number];
  sort: StoreSortOption;
  onSearchChange: (value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onSortChange: (value: StoreSortOption) => void;
  onClear: () => void;
}

export const StoreFilters: React.FC<StoreFiltersProps> = ({
  search,
  priceRange,
  sort,
  onSearchChange,
  onPriceRangeChange,
  onSortChange,
  onClear,
}) => (
  <aside className="store-filters">
    <h3 className="store-filters-title">Filtros</h3>

    <div className="store-filter-block">
      <h4>Buscar</h4>
      <Input
        placeholder="Buscar productos..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>

    <div className="store-filter-block">
      <h4>Rango de Precios</h4>
      <Slider
        range
        min={0}
        max={3000}
        step={50}
        value={priceRange}
        onChange={(value) => onPriceRangeChange(value as [number, number])}
      />
      <div className="store-price-labels">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>

    <Button type="primary" block onClick={onClear}>
      Limpiar
    </Button>

    <div className="store-filter-block" style={{ marginTop: 16 }}>
      <h4>Ordenar por</h4>
      <Select
        value={sort}
        onChange={(value) => onSortChange(value as StoreSortOption)}
        style={{ width: '100%' }}
        options={[
          { label: 'Relevancia', value: 'relevance' },
          { label: 'Precio: menor a mayor', value: 'price_asc' },
          { label: 'Precio: mayor a menor', value: 'price_desc' },
        ]}
      />
    </div>
  </aside>
);
