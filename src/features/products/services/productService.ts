// src/features/products/services/productService.ts
import api from '../../../services/api';
import type {
    ApiResponse,
    Category,
    Product,
    ProductFormData,
    Subcategory,
    UploadResponse
} from '../types/product';

export class ProductService {
  // Obtener productos con paginación
  static async getProducts(page = 1, perPage = 10): Promise<ApiResponse<Product[]>> {
    const response = await api.get(`/products?page=${page}&per_page=${perPage}`);
    const data = response.data.data || response.data; // Maneja ambos formatos de respuesta

    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
        current_page: page,
        per_page: perPage,
      };
    }

    const responseData = Array.isArray(data?.data) ? data.data : [];
    const total = typeof data?.total === 'number' ? data.total : responseData.length;
    const current_page = typeof data?.current_page === 'number' ? data.current_page : page;
    const per_page = typeof data?.per_page === 'number' ? data.per_page : perPage;

    return {
      data: responseData,
      total,
      current_page,
      per_page,
    };
  }

  // Obtener producto por ID
  static async getProduct(id: number): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  }

  // Crear producto
  static async createProduct(data: ProductFormData): Promise<Product> {
    const response = await api.post('/products', data);
    return response.data;
  }

  // Actualizar producto
  static async updateProduct(id: number, data: Partial<ProductFormData>): Promise<Product> {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  }

  // Eliminar producto
  static async deleteProduct(id: number): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  // Subir imagen
  static async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/products/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Obtener categorías
    static async getCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data.data; // extrae el array
    }

  // Obtener subcategorías
  static async getSubcategories(): Promise<Subcategory[]> {
    const response = await api.get('/subcategories');
    return response.data.data;
  }

  // Obtener subcategorías por categoría
  static async getSubcategoriesByCategory(categoryId: number): Promise<Subcategory[]> {
    const response = await api.get(`/categories/${categoryId}/subcategories`);
    return response.data.data;
  }

  // Obtener todos los productos sin paginación
  static async getAllProducts(): Promise<Product[]> {
    const response = await api.get('/products');
    const data = response.data;
    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  }
}