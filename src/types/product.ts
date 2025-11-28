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
