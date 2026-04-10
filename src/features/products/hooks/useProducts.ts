// src/features/products/hooks/useProducts.ts
import { useCallback, useEffect, useState } from 'react';
import { ProductService } from '../services/productService';
import type { ApiResponse, Product } from '../types/product';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  pageSize: number;
  refetch: () => Promise<void>;
  loadProducts: (page?: number, perPage?: number) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadProducts = useCallback(async (page = 1, perPage = 10) => {
    setLoading(true);
    setError(null);

    try {
      const response: ApiResponse<Product[]> = await ProductService.getProducts(page, perPage);
      setProducts(response.data);
      setTotal(response.total || 0);
      setCurrentPage(response.current_page || page);
      setPageSize(response.per_page || perPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await loadProducts(currentPage, pageSize);
  }, [loadProducts, currentPage, pageSize]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    total,
    currentPage,
    pageSize,
    refetch,
    loadProducts,
  };
};