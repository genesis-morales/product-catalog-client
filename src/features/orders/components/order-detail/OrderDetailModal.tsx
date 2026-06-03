import { Descriptions, Divider, Modal, Space, Table, Tag } from 'antd';
import React from 'react';
import type { Order, OrderStatus } from '../../types/order';
import './OrderDetailModal.scss';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'processing', label: 'En proceso' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'gold',
  processing: 'blue',
  completed: 'green',
  cancelled: 'red',
};

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  open,
  onClose,
}) => {
  const itemColumns = [
    {
      title: 'Producto',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio unitario',
      dataIndex: 'unit_price',
      key: 'unit_price',
      render: (v: number) => `₡${Number(v).toLocaleString('es-CR')}`,
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      render: (v: number) => `₡${Number(v).toLocaleString('es-CR')}`,
    },
  ];

  if (!order) return null;

  const statusLabel =
    STATUS_OPTIONS.find((s) => s.value === order.status)?.label || order.status;

  return (
    <Modal
      title={
        <Space>
          <span>Orden</span>
          <span className="orderNumberTitle">{order.order_number}</span>
          <Tag color={STATUS_COLORS[order.status]}>
            {statusLabel}
          </Tag>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
    >
      <Descriptions title="Datos de la orden" column={2} size="small" bordered>
        <Descriptions.Item label="Estado">
          <Tag color={STATUS_COLORS[order.status]}>
            {statusLabel}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Número de orden">
          {order.order_number}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions title="Datos de envío" column={2} size="small" bordered>
        <Descriptions.Item label="Nombre">{order.shipping_name}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{order.shipping_phone}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{order.shipping_city}</Descriptions.Item>
        <Descriptions.Item label="Dirección" span={2}>
          {order.shipping_address}
        </Descriptions.Item>
        {order.shipping_notes && (
          <Descriptions.Item label="Notas" span={2}>
            {order.shipping_notes}
          </Descriptions.Item>
        )}
      </Descriptions>

      <Divider />

      {order.items && order.items.length > 0 && (
        <>
          <Table
            title={() => <span className="sectionTitle">Productos</span>}
            columns={itemColumns}
            dataSource={order.items}
            rowKey="id"
            pagination={false}
            size="small"
          />
          <Divider />
        </>
      )}

      <div className="totals">
        <div className="totalRow">
          <span>Subtotal</span>
          <span>₡{Number(order.subtotal).toLocaleString('es-CR')}</span>
        </div>
        <div className="totalRow totalRowFinal">
          <span>Total</span>
          <span>₡{Number(order.total).toLocaleString('es-CR')}</span>
        </div>
      </div>
    </Modal>
  );
};