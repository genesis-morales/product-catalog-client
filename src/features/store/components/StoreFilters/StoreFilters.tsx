import React from 'react';
import type { StoreSortOption } from '../../hooks/useStoreProducts';
import type { Category } from '../../../products/types/product';
import './StoreFilters.scss';

interface StoreFiltersProps {
  search: string;
  priceRange: [number, number];
  sort: StoreSortOption;
  categories: Category[];           
  selectedCategory?: number;       
  onSearchChange: (value: string) => void;
  onPriceRangeChange: (value: [number, number]) => void;
  onSortChange: (value: StoreSortOption) => void;
  onCategoryChange: (id?: number) => void; 
  onClear: () => void;
}

export const StoreFilters: React.FC<StoreFiltersProps> = ({
  priceRange,
  onPriceRangeChange,
  onClear,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const MIN = 0;
  const MAX = 3000;

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), priceRange[1] - 50);
    onPriceRangeChange([val, priceRange[1]]);
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), priceRange[0] + 50);
    onPriceRangeChange([priceRange[0], val]);
  };

  const minPct = ((priceRange[0] - MIN) / (MAX - MIN)) * 100;
  const maxPct = ((priceRange[1] - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Filtros</h3>
        <button className="filters__clear" onClick={onClear}>Limpiar</button>
      </div>

      {/* ── Categorías ── */}
      <div className="filters__section">
        <h4 className="filters__label">Categorías</h4>
        <ul className="filters__categories">
          <li
            className={`filters__category-item ${!selectedCategory ? 'active' : ''}`}
            onClick={() => onCategoryChange(undefined)}
          >
            Todas
          </li>
          {categories.map((cat) => (
            <li
              key={cat.id}
              className={`filters__category-item ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              {cat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Rango de precios ── */}
      <div className="filters__section">
        <h4 className="filters__label">Rango de Precios</h4>
        <div className="filters__range">
          <div
            className="filters__range-track"
            style={{
              background: `linear-gradient(to right,
                #e5e7eb ${minPct}%,
                #2563eb ${minPct}%,
                #2563eb ${maxPct}%,
                #e5e7eb ${maxPct}%)`,
            }}
          >
            <input
              type="range" min={MIN} max={MAX} step={50}
              value={priceRange[0]}
              onChange={handleMin}
              className="filters__range-input"
            />
            <input
              type="range" min={MIN} max={MAX} step={50}
              value={priceRange[1]}
              onChange={handleMax}
              className="filters__range-input"
            />
          </div>
          <div className="filters__range-labels">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <button className="filters__apply">Aplicar Filtros</button>
    </div>
  );
};