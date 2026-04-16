export interface ShippingData {
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_notes?: string;
}

export interface OrderItem {
  id: number;
  product_name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  status: string;
  subtotal: number;
  total: number;
  shipping: {
    name: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  items: OrderItem[];
  created_at: string;
}