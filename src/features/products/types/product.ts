// src/features/products/types/product.ts
export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  name: string;
  category_id: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  img: string | null;
  subcategory_id: number;
  created_at: string;
  updated_at: string;
  subcategory?: Subcategory;
}

// Tipos para formularios
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  available: boolean;
  category_id: number;
  subcategory_id: number;
  img?: string | null;
}

// Tipos para filtros
export interface ProductFilterState {
  search: string;
  categoryId?: number;
  available?: boolean | null;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  data: T;
  total?: number;
  current_page?: number;
  per_page?: number;
}

export interface UploadResponse {
  url: string;
}