import React from 'react';
import { Button, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import type { CustomerListItem } from '../../types/customer';
import './CustomersTable.scss';

interface CustomersTableProps {
  data: CustomerListItem[];
  loading?: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 2,
  }).format(value);

const formatDate = (value: string | null) => {
  if (!value) return 'Sin compras';
  return new Date(value).toLocaleDateString('es-CR');
};

export const CustomersTable: React.FC<CustomersTableProps> = ({ data, loading }) => {
  const navigate = useNavigate();

  const columns: ColumnsType<CustomerListItem> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (value) => <span className="customers-table__name">{value}</span>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Órdenes',
      dataIndex: 'total_orders',
      key: 'total_orders',
      width: 110,
      render: (value) => <Tag>{value}</Tag>,
    },
    {
      title: 'Monto gastado',
      dataIndex: 'total_spent',
      key: 'total_spent',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Última compra',
      dataIndex: 'last_order_at',
      key: 'last_order_at',
      render: (value) => formatDate(value),
    },
    {
      title: 'Acciones',
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <Button type="link" onClick={() => navigate(`/customers/${record.id}`)}>
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <div className="customers-table">
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};