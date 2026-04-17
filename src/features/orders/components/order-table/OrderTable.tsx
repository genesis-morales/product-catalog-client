import { EyeOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag } from 'antd';
import React, { useMemo } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import './OrderTable.scss';

const STATUS_CONFIG: Record<OrderStatus, { color: string; label: string }> = {
  pending:    { color: 'gold',    label: 'Pendiente' },
  processing: { color: 'blue',    label: 'En proceso' },
  completed:  { color: 'green',   label: 'Completada' },
  cancelled:  { color: 'red',     label: 'Cancelada' },
};

interface OrderTableProps {
  orders: Order[];
  loading: boolean;
  onView: (order: Order) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  loading,
  onView,
  pagination,
}) => {
  const columns = useMemo(() => [
    {
      title: '# ORDEN',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (value: string) => (
        <span className="ot-orderNumber">{value}</span>
      ),
    },
    {
      title: 'CLIENTE',
      key: 'client',
      render: (_: any, record: Order) => (
        <Space direction="vertical" size={0}>
          <span className="ot-clientName">{record.shipping_name}</span>
          {record.user?.email && (
            <span className="ot-clientEmail">{record.user.email}</span>
          )}
        </Space>
      ),
    },
    {
      title: 'ESTADO',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => {
        const { color, label } = STATUS_CONFIG[status];
        return (
          <Tag color={color} className="ot-statusTag">
            {label}
          </Tag>
        );
      },
    },
    {
      title: 'TOTAL',
      dataIndex: 'total',
      key: 'total',
      sorter: (a: Order, b: Order) => a.total - b.total,
      render: (value: number) =>
        `₡${Number(value).toLocaleString('es-CR')}`,
    },
    {
      title: 'FECHA',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: (a: Order, b: Order) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (value: string) =>
        new Date(value).toLocaleDateString('es-CR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
    },
    {
      title: 'ACCIONES',
      key: 'actions',
      render: (_: any, record: Order) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onView(record)}
        />
      ),
    },
  ], [onView]);

  return (
    <Table
      columns={columns}
      dataSource={orders}
      loading={loading}
      rowKey="id"
      pagination={pagination ? {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        onChange: pagination.onChange,
      } : false}
    />
  );
};