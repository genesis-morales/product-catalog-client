import api from "./api";

interface Category {
  id: number;
  name: string;
}

interface Subcategory {
  id: number;
  name: string;
  category_id: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  subcategory_id: number;
}

export const productService = {
  // Obtener todas las categorías
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Obtener subcategorías por categoría
  getSubcategories: async (categoryId: number): Promise<Subcategory[]> => {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data;
  },

  // Obtener productos por subcategoría
  getProducts: async (subcategoryId: number): Promise<Product[]> => {
    const response = await api.get(`/subcategories/${subcategoryId}/products`);
    return response.data;
  },

  // Obtener todos los productos
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products');
    return response.data;
  },
};
