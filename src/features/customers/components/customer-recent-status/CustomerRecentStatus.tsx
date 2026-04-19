import React from 'react';
import { Card } from 'antd';
import type { CustomerDetail } from '../../types/customer';
import './CustomerRecentStatus.scss';

interface CustomerRecentStatusProps {
  customer: CustomerDetail;
}

const STATUS_CONFIG = {
  pending: { label: 'Pendiente', color: '#f59e0b' },
  processing: { label: 'En proceso', color: '#1677ff' },
  completed: { label: 'Completada', color: '#22c55e' },
  cancelled: { label: 'Cancelada', color: '#ef4444' },
} as const;

export const CustomerRecentStatus: React.FC<CustomerRecentStatusProps> = ({ customer }) => {
  const items = (['pending', 'processing', 'completed', 'cancelled'] as const).map((status) => ({
    status,
    ...STATUS_CONFIG[status],
    count: customer.recent_status?.[status] ?? 0,
  }));

  const total = items.reduce((acc, item) => acc + item.count, 0);

  return (
    <Card title="Estado de pedidos recientes" className="customer-recent-status" variant="borderless">
      <div className="customer-recent-status__list">
        {items.map(({ status, label, color, count }) => {
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;

          return (
            <div key={status} className="customer-recent-status__item">
              <div className="customer-recent-status__head">
                <div className="customer-recent-status__label-wrap">
                  <span className="customer-recent-status__dot" style={{ background: color }} />
                  <span>{label}</span>
                </div>
                <span>{count}</span>
              </div>

              <div className="customer-recent-status__bar">
                <div
                  className="customer-recent-status__fill"
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