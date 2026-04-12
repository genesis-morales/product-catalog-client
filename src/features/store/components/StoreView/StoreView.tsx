import { Alert } from 'antd';
import React from 'react';
import { useStoreProducts } from '../../hooks/useStoreProducts';
import { StoreCard } from '../StoreCard/StoreCard';
import { StoreFilters } from '../StoreFilters/StoreFilters';
import './StoreView.scss';

export const StoreView: React.FC = () => {
  const {
    filteredProducts, loading, error,
    search, priceRange, sort,
    setSearch, setPriceRange, setSort, loadProducts,
  } = useStoreProducts();

  const handleClear = () => {
    setSearch('');
    setPriceRange([0, 3000]);
    setSort('relevance');
    void loadProducts();
  };

  return (
    <div className="store-wrapper">
      <header className="store-header">
        <div className="store-header__inner">
          <div className="store-header__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="6" fill="#2563EB"/>
              <path d="M7 10h14M7 14h10M7 18h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>TechStore</span>
          </div>
          <div className="store-header__search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="store-header__actions">
            <button className="store-header__icon-btn" aria-label="Carrito">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
            <button className="store-header__icon-btn" aria-label="Usuario">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="store-layout">
        <aside className="store-sidebar">
          <StoreFilters
            search={search}
            priceRange={priceRange}
            sort={sort}
            onSearchChange={setSearch}
            onPriceRangeChange={setPriceRange}
            onSortChange={setSort}
            onClear={handleClear}
          />
        </aside>

        <main className="store-content">
          {error && <Alert type="error" message="Error cargando productos" description={error} style={{ marginBottom: 16 }} />}

          <div className="store-content__toolbar">
            <p className="store-content__count">
              Mostrando <strong>{filteredProducts.length}</strong> productos
            </p>
            <div className="store-content__sort">
              <span>Ordenar por:</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as any)}>
                <option value="relevance">Relevancia</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="store-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="store-card-skeleton">
                  <div className="skeleton skeleton-image" />
                  <div className="store-card-skeleton__body">
                    <div className="skeleton skeleton-text" />
                    <div className="skeleton skeleton-text" style={{ width: '70%' }} />
                    <div className="skeleton skeleton-text" style={{ width: '40%', marginTop: 12 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="store-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <h3>Sin resultados</h3>
              <p>Intenta con otros filtros o busca algo diferente</p>
              <button className="store-empty__btn" onClick={handleClear}>Limpiar filtros</button>
            </div>
          ) : (
            <div className="store-grid">
              {filteredProducts.map(product => (
                <StoreCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};