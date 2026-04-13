import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';
import { ProductService } from '../../../products/services/productService';
import type { Category } from '../../../products/types/product';
import { useStoreProducts } from '../../hooks/useStoreProducts';
import { StoreCard } from '../StoreCard/StoreCard';
import { StoreFilters } from '../StoreFilters/StoreFilters';
import './StoreView.scss';

export const StoreView: React.FC = () => {
  const {
    filteredProducts, loading, error,
    search, priceRange, sort, selectedCategory,
    setSearch, setPriceRange, setSort, setSelectedCategory,
    clearFilters, loadProducts,
  } = useStoreProducts();

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    ProductService.getCategories().then(setCategories).catch(console.error);
  }, []);

  const handleClear = () => {
    clearFilters();
    void loadProducts();
  };

  return (
    <div className="store-layout">
      <aside className="store-sidebar">
        <StoreFilters
          search={search}
          priceRange={priceRange}
          sort={sort}
          categories={categories}
          selectedCategory={selectedCategory}
          onSearchChange={setSearch}
          onPriceRangeChange={setPriceRange}
          onSortChange={setSort}
          onCategoryChange={setSelectedCategory}
          onClear={handleClear}
        />
      </aside>

      <main className="store-content">
        {error && (
          <Alert
            type="error"
            message="Error cargando productos"
            description={error}
            style={{ marginBottom: 16 }}
          />
        )}

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
  );
};