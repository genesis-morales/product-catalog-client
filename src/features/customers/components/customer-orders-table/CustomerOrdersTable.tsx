import React from 'react';
import { Card, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CustomerOrderItem } from '../../types/customer';
import './CustomerOrdersTable.scss';

interface CustomerOrdersTableProps {
  orders: CustomerOrderItem[];
}

const STATUS_MAP = {
  pending: { label: 'Pendiente', color: 'gold' },
  processing: { label: 'En proceso', color: 'blue' },
  completed: { label: 'Completada', color: 'green' },
  cancelled: { label: 'Cancelada', color: 'red' },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 2,
  }).format(value);

const columns: ColumnsType<CustomerOrderItem> = [
  {
    title: 'Orden',
    dataIndex: 'order_number',
    key: 'order_number',
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (value: keyof typeof STATUS_MAP) => {
      const status = STATUS_MAP[value];
      return <Tag color={status.color}>{status.label}</Tag>;
    },
  },
  {
    title: 'Total',
    dataIndex: 'total',
    key: 'total',
    render: (value) => formatCurrency(value),
  },
  {
    title: 'Fecha',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (value) => new Date(value).toLocaleDateString('es-CR'),
  },
];

export const CustomerOrdersTable: React.FC<CustomerOrdersTableProps> = ({ orders }) => {
  return (
    <Card title="Historial de órdenes" className="customer-orders-table" variant="borderless">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={orders}
        pagination={{ pageSize: 6 }}
      />
    </Card>
  );
};