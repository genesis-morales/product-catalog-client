export interface CustomerListItem {
  id: number;
  name: string;
  email: string;
  total_orders: number;
  total_spent: number;
  last_order_at: string | null;
}

export interface CustomerOrderItem {
  id: number;
  order_number: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  created_at: string;
}

export interface CustomerDetail {
  id: number;
  name: string;
  email: string;
  created_at: string;
  total_orders: number;
  total_spent: number;
  last_order_at: string | null;
  recent_status: {
    pending: number;
    processing: number;
    completed: number;
    cancelled: number;
  };
  orders: CustomerOrderItem[];
}