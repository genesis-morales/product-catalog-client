// src/features/products/hooks/useProductFilters.ts
import { useCallback, useMemo, useState } from 'react';
import type { Product, ProductFilterState } from '../types/product';

interface UseProductFiltersReturn {
  filters: ProductFilterState;
  filteredProducts: Product[];
  setSearch: (search: string) => void;
  setCategoryId: (categoryId?: number) => void;
  setAvailable: (available?: boolean | null) => void;
  clearFilters: () => void;
}

export const useProductFilters = (products: Product[]): UseProductFiltersReturn => {
  const [filters, setFilters] = useState<ProductFilterState>({
    search: '',
    categoryId: undefined,
    available: null,
  });

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setCategoryId = useCallback((categoryId?: number) => {
    setFilters(prev => ({ ...prev, categoryId }));
  }, []);

  const setAvailable = useCallback((available?: boolean | null) => {
    setFilters(prev => ({ ...prev, available }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      categoryId: undefined,
      available: null,
    });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtro por búsqueda
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por categoría
    if (filters.categoryId) {
      filtered = filtered.filter(product => {
        const subcategory = product.subcategory;
        return subcategory?.category_id === filters.categoryId;
      });
    }

    // Filtro por disponibilidad
    if (filters.available !== null && filters.available !== undefined) {
      filtered = filtered.filter(product => product.available === filters.available);
    }

    return filtered;
  }, [products, filters]);

  return {
    filters,
    filteredProducts,
    setSearch,
    setCategoryId,
    setAvailable,
    clearFilters,
  };
};