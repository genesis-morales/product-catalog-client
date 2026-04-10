import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Product } from '../../products/types/product';
import { StoreService } from '../services/storeService';

export type StoreSortOption = 'relevance' | 'price_asc' | 'price_desc';

export const useStoreProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [sort, setSort] = useState<StoreSortOption>('relevance');

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await StoreService.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
      console.error('Error loading store products:', err);
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
      list = list.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    list = list.filter(product => {
      const price = Number(product.price);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sort === 'price_asc') {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === 'price_desc') {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return list;
  }, [products, search, priceRange, sort]);

  return {
    products,
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
  };
};
