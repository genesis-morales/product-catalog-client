export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  subtotal: number;
  total: number;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_notes?: string;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  items?: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderFilters {
  search: string;
  status: OrderStatus | null;
}

export interface PaginatedOrders {
  data: Order[];
  total: number;
  current_page: number;
  per_page: number;
}