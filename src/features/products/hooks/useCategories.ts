// src/features/products/hooks/useCategories.ts
import { useCallback, useEffect, useState } from 'react';
import { ProductService } from '../services/productService';
import type { Category, Subcategory } from '../types/product';

interface UseCategoriesReturn {
  categories: Category[];
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getSubcategoriesByCategory: (categoryId: number) => Subcategory[];
}

export const useCategories = (): UseCategoriesReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    try {
      const [cats, subs] = await Promise.all([
        ProductService.getCategories(),
        ProductService.getSubcategories(),
      ]);
      setCategories(cats);
      setSubcategories(subs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar categorías');
      console.error('Error loading categories:', err);
    }
  }, []);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    await loadCategories();
    setLoading(false);
  }, [loadCategories]);

  const getSubcategoriesByCategory = useCallback((categoryId: number) => {
    return subcategories.filter(sub => sub.category_id === categoryId);
  }, [subcategories]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    categories,
    subcategories,
    loading,
    error,
    refetch,
    getSubcategoriesByCategory,
  };
};