export interface DashboardStats {
  pending_orders: number;
  processing_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_revenue:    number;
  total_orders:     number;
  total_customers:  number;
  active_products:  number;
  revenue_trend:    number;
  orders_trend:     number;
  customers_trend:  number;
  orders_by_status: {
    pending:    number;
    processing: number;
    completed:  number;
    cancelled:  number;
  };
}

export interface MonthlySale {
  month: string;
  total: number;
}

export interface RecentOrder {
  id:            number;
  order_number:  string;
  shipping_name: string;
  status:        string;
  total:         number;
  created_at:    string;
}

export interface TopProduct {
  id:         number;
  name:       string;
  total_sold: number;
  revenue:    number;
}