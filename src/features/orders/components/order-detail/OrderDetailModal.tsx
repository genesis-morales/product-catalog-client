import { Descriptions, Divider, Modal, Select, Space, Table, Tag, message } from 'antd';
import React, { useState } from 'react';
import type { Order, OrderStatus } from '../../types/order';
import './OrderDetailModal.scss';

const STATUS_OPTIONS = [
  { value: 'pending',    label: 'Pendiente' },
  { value: 'processing', label: 'En proceso' },
  { value: 'completed',  label: 'Completada' },
  { value: 'cancelled',  label: 'Cancelada' },
];

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending:    'gold',
  processing: 'blue',
  completed:  'green',
  cancelled:  'red',
};

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onStatusUpdated: (id: number, status: OrderStatus) => Promise<void>;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  open,
  onClose,
  onStatusUpdated,
}) => {
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    if (!order) return;
    setUpdatingStatus(true);
    try {
      await onStatusUpdated(order.id, newStatus);
      message.success('Estado actualizado');
      onClose();
    } catch {
      message.error('Error al actualizar el estado');
    } finally {
      setUpdatingStatus(false);
    }
  };

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

  return (
    <Modal
      title={
        <Space>
          <span>Orden</span>
          <span className="orderNumberTitle">{order.order_number}</span>
          <Tag color={STATUS_COLORS[order.status]}>
            {STATUS_OPTIONS.find((s) => s.value === order.status)?.label}
          </Tag>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={null}
      width={720}
    >
      {/* Cambio de estado */}
      <div className="statusSection">
        <span className="statusLabel">Cambiar estado:</span>
        <Select
          value={order.status}
          options={STATUS_OPTIONS}
          onChange={handleStatusChange}
          loading={updatingStatus}
          className="statusSelect"
        />
      </div>

      <Divider />

      {/* Info del cliente y envío */}
      <Descriptions title="Datos de envío" column={2} size="small" bordered>
        <Descriptions.Item label="Nombre">{order.shipping_name}</Descriptions.Item>
        <Descriptions.Item label="Teléfono">{order.shipping_phone}</Descriptions.Item>
        <Descriptions.Item label="Ciudad">{order.shipping_city}</Descriptions.Item>
        <Descriptions.Item label="Dirección" span={2}>{order.shipping_address}</Descriptions.Item>
        {order.shipping_notes && (
          <Descriptions.Item label="Notas" span={2}>{order.shipping_notes}</Descriptions.Item>
        )}
      </Descriptions>

      <Divider />

      {/* Productos */}
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

      {/* Totales */}
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