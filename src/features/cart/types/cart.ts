export interface CartProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string | null;
}

export interface CartItem {
  id: number;
  product: CartProduct;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Cart {
  id: number;
  guest_token: string | null;
  items: CartItem[];
  subtotal: number;
  total: number;
  status: string;
  updated_at: string;
}