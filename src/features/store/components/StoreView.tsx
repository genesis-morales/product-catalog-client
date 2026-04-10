import { Alert, Spin } from 'antd';
import React from 'react';
import { useStoreProducts } from '../hooks/useStoreProducts';
import { StoreCard } from './StoreCard';
import { StoreFilters } from './StoreFilters';

export const StoreView: React.FC = () => {
  const {
    filteredProducts,
    loading,
    error,
    search,
    priceRange,
    sort,
    setSearch,
    setPriceRange,
    setSort,
    loadProducts,
  } = useStoreProducts();

  const handleClear = () => {
    setSearch('');
    setPriceRange([0, 3000]);
    setSort('relevance');
    void loadProducts();
  };

  return (
    <div className="store-wrapper">
      <div className="store-page">
        <header className="store-header">
          <div className="store-logo">TechStore</div>
          <div className="store-header-actions">
            {/* Aquí luego puedes poner iconos de carrito / usuario */}
          </div>
        </header>

        <div className="store-main">
          <aside className="store-filters">
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

          <section className="store-content">
            {loading && <Spin tip="Cargando productos..." />}
            {error && <Alert type="error" message="Error cargando productos" description={error} />}

            <div className="store-list-header">
              <span>Mostrando {filteredProducts.length} productos</span>
            </div>

            <div className="store-grid">
              {filteredProducts.map(product => (
                <StoreCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
