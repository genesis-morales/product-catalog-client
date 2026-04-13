import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '../../products/types/product';
import { StoreService } from '../services/storeService';
import { useStoreContext } from '../context/StoreContext';

export type StoreSortOption = 'relevance' | 'price_asc' | 'price_desc';

export const useStoreProducts = () => {
  const { search, setSearch } = useStoreContext();

  const [products, setProducts]           = useState<Product[]>([]);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState<string | null>(null);
  const [priceRange, setPriceRange]       = useState<[number, number]>([0, 5000000]);
  const [sort, setSort]                   = useState<StoreSortOption>('relevance');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>();

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await StoreService.getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      list = list.filter(p => p.subcategory?.category_id === selectedCategory);
    }

    list = list.filter(p => {
      const price = Number(p.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sort === 'price_asc') list.sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === 'price_desc') list.sort((a, b) => Number(b.price) - Number(a.price));

    return list;
  }, [products, search, priceRange, sort, selectedCategory]);

  const clearFilters = useCallback(() => {
    setSearch('');
    setPriceRange([0, 5000000]);
    setSort('relevance');
    setSelectedCategory(undefined);
  }, [setSearch]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    search,
    priceRange,
    sort,
    selectedCategory,
    setSearch,
    setPriceRange,
    setSort,
    setSelectedCategory,
    clearFilters,
    loadProducts,
  };
};