import { ProductService } from '../../products/services/productService';
import type { Product } from '../../products/types/product';

export class StoreService {
  static async getProducts(): Promise<Product[]> {
    return ProductService.getAllProducts();
  }
}
