import React from 'react';
import { Card } from 'antd';
import type { DashboardStats } from '../../types/dashboard';
import './OrderStatusChart.scss';

interface OrderStatusChartProps {
  stats: DashboardStats | null;
}

const STATUS_CONFIG = {
  pending:    { label: 'Pendiente',   color: '#f59e0b' },
  processing: { label: 'En proceso',  color: '#1677ff' },
  completed:  { label: 'Completada',  color: '#22c55e' },
  cancelled:  { label: 'Cancelada',   color: '#ef4444' },
} as const;

export const OrderStatusChart: React.FC<OrderStatusChartProps> = ({ stats }) => {
  const items = (
    ['pending', 'processing', 'completed', 'cancelled'] as const
  ).map((s) => ({
    status: s,
    count:
      s === 'pending' ? stats?.pending_orders ?? 0 :
      s === 'processing' ? stats?.processing_orders ?? 0 :
      s === 'completed' ? stats?.completed_orders ?? 0 :
      stats?.cancelled_orders ?? 0,
    ...STATUS_CONFIG[s],
  }));


  const total = items.reduce((acc, i) => acc + i.count, 0);

  return (
    <Card title="Estado de órdenes" className="order-status-chart" variant="borderless">
      <div className="osc-list">
        {items.map(({ status, label, color, count }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={status} className="osc-item">
              <div className="osc-item__header">
                <span className="osc-item__dot" style={{ background: color }} />
                <span className="osc-item__label">{label}</span>
                <span className="osc-item__count">{count}</span>
              </div>
              <div className="osc-item__bar-bg">
                <div
                  className="osc-item__bar-fill"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};