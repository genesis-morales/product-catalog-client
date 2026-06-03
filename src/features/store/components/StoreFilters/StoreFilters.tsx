import React from 'react';
import type { StoreSortOption } from '../../hooks/useStoreProducts';
import type { Category } from '../../../products/types/product';
import './StoreFilters.scss';

interface StoreFiltersProps {
  search: string;
  maxPrice: number | null;
  sort: StoreSortOption;
  categories: Category[];
  selectedCategory?: number;
  onSearchChange: (value: string) => void;
  onMaxPriceChange: (value: number | null) => void;
  onSortChange: (value: StoreSortOption) => void;
  onCategoryChange: (id?: number) => void;
  onClear: () => void;
}

export const StoreFilters: React.FC<StoreFiltersProps> = ({
  maxPrice,
  onMaxPriceChange,
  onClear,
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const MIN = 0;
  const MAX = 6683150;
  const STEP = 50;

  const isPriceActive = maxPrice !== null;
  const sliderValue = maxPrice ?? MIN;
  const fillPct = ((sliderValue - MIN) / (MAX - MIN)) * 100;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value <= MIN) {
      onMaxPriceChange(null);
      return;
    }

    onMaxPriceChange(value);
  };

  return (
    <div className="filters">
      <div className="filters__header">
        <h3 className="filters__title">Filtros</h3>
        <button className="filters__clear" onClick={onClear} type="button">
          Limpiar
        </button>
      </div>

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

      <div className="filters__section">
        <h4 className="filters__label">Precio máximo</h4>

        <div className="filters__range">
          <div className="filters__range-track">
            <div
              className={`filters__range-fill ${isPriceActive ? 'is-active' : ''}`}
              style={{ width: `${fillPct}%` }}
            />

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={STEP}
              value={sliderValue}
              onChange={handlePriceChange}
              className="filters__range-input filters__range-input--single"
            />
          </div>

          <div className={`filters__range-labels ${isPriceActive ? 'is-active' : ''}`}>
            <span>{isPriceActive ? `Hasta ₡${sliderValue.toLocaleString('es-CR')}` : 'Todos los precios'}</span>
            <span>₡{MAX.toLocaleString('es-CR')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};