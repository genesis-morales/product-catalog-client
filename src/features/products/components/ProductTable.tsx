// src/features/products/components/ProductTable.tsx
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Badge, Button, Image, Space, Table, Tag } from 'antd';
import React, { useMemo } from 'react';
import type { Product } from '../types/product';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onEdit,
  onDelete,
  pagination,
}) => {
  const getStockStatus = useMemo(() => (stock: number) => {
    if (stock === 0) return { color: 'red', text: 'Agotado' };
    if (stock < 20) return { color: 'orange', text: `${stock} en stock` };
    return { color: 'green', text: `${stock} en stock` };
  }, []);

  const columns = useMemo(() => [
    {
      title: 'PRODUCTO',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      render: (text: string, record: Product) => (
        <Space>
          {record.img && (
            <Image
              src={record.img}
              alt={text}
              width={40}
              height={40}
              style={{ objectFit: 'cover', borderRadius: 4 }}
              placeholder={<div style={{ width: 40, height: 40, background: '#f0f0f0' }} />}
            />
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'PRECIO',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'STOCK',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
      render: (stock: number) => {
        const status = getStockStatus(stock);
        return <Badge color={status.color} text={status.text} />;
      },
    },
    {
      title: 'CATEGORÍA',
      key: 'category',
      width: '15%',
      render: (_: any, record: Product) => {
        const categoryName = record.subcategory?.category?.name || 'Sin categoría';
        return (
          <Tag color="blue" style={{ borderRadius: 999 }}>
            {categoryName}
          </Tag>
        );
      },
    },
    {
      title: 'SUBCATEGORÍA',
      key: 'subcategory',
      width: '15%',
      render: (_: any, record: Product) => {
        const subcategoryName = record.subcategory?.name || 'Sin subcategoría';
        return <span>{subcategoryName}</span>;
      },
    },
    {
      title: 'DISPONIBLE',
      dataIndex: 'available',
      key: 'available',
      render: (available: boolean) => (
        <Tag color={available ? 'green' : 'red'}>
          {available ? 'Sí' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'ACCIONES',
      key: 'actions',
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ], [getStockStatus, onEdit, onDelete]);

  return (
    <Table
      columns={columns}
      dataSource={products}
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