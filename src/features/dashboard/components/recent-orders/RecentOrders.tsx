import React from 'react';
import { Card, Table, Tag } from 'antd';
import type { RecentOrder } from '../../types/dashboard';
import './RecentOrders.scss';

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const STATUS_CONFIG: Record<string, { color: string; label: string }> = {
  pending:    { color: 'gold',  label: 'Pendiente'  },
  processing: { color: 'blue',  label: 'En proceso' },
  completed:  { color: 'green', label: 'Completada' },
  cancelled:  { color: 'red',   label: 'Cancelada'  },
};

const columns = [
  {
    title:     '# Orden',
    dataIndex: 'order_number',
    key:       'order_number',
    render:    (v: string) => <span className="ro-num">{v}</span>,
  },
  {
    title:     'Cliente',
    dataIndex: 'shipping_name',
    key:       'shipping_name',
  },
  {
    title:     'Estado',
    dataIndex: 'status',
    key:       'status',
    render:    (s: string) => {
      const cfg = STATUS_CONFIG[s];
      return <Tag color={cfg?.color}>{cfg?.label ?? s}</Tag>;
    },
  },
  {
    title:     'Total',
    dataIndex: 'total',
    key:       'total',
    render:    (v: number) => `₡${Number(v).toLocaleString('es-CR')}`,
  },
  {
    title:     'Fecha',
    dataIndex: 'created_at',
    key:       'created_at',
    render:    (v: string) =>
      new Date(v).toLocaleDateString('es-CR', {
        day: '2-digit', month: 'short', year: 'numeric',
      }),
  },
];

export const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => (
  <Card title="Órdenes recientes" className="recent-orders" variant="borderless">
    <Table
      columns={columns}
      dataSource={orders}
      rowKey="id"
      pagination={false}
      size="small"
      scroll={{ x: 600 }}
    />
  </Card>
);