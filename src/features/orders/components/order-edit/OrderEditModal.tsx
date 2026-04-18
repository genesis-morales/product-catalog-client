import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, Select, message } from 'antd';
import { OrderService } from '../../services/orderService';
import type { Order, OrderStatus } from '../../types/order';

interface OrderEditModalProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => Promise<void>;
}

interface OrderEditFormValues {
  status: OrderStatus;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_notes?: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'processing', label: 'En proceso' },
  { value: 'completed', label: 'Completada' },
  { value: 'cancelled', label: 'Cancelada' },
];

export const OrderEditModal: React.FC<OrderEditModalProps> = ({
  order,
  open,
  onClose,
  onSaved,
}) => {
  const [form] = Form.useForm<OrderEditFormValues>();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (order && open) {
      form.setFieldsValue({
        status: order.status,
        shipping_name: order.shipping_name,
        shipping_phone: order.shipping_phone,
        shipping_address: order.shipping_address,
        shipping_city: order.shipping_city,
        shipping_notes: order.shipping_notes ?? '',
      });
    } else {
      form.resetFields();
    }
  }, [order, open, form]);

const handleSubmit = async () => {
  if (!order) return;

  try {
    setSaving(true);
    const values = await form.validateFields();

    await OrderService.updateOrderShipping(order.id, {
      shipping_name: values.shipping_name,
      shipping_phone: values.shipping_phone,
      shipping_address: values.shipping_address,
      shipping_city: values.shipping_city,
      shipping_notes: values.shipping_notes,
    });

    await OrderService.updateOrderStatus(order.id, values.status);

    message.success('Orden actualizada correctamente');
    await onSaved();
    onClose();
    form.resetFields();
  } catch (error) {
    message.error('No se pudo actualizar la orden');
  } finally {
    setSaving(false);
  }
};

  return (
    <Modal
      title="Editar orden"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Guardar cambios"
      cancelText="Cancelar"
      confirmLoading={saving}
      destroyOnHidden
      width={640}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label="Estado"
          name="status"
          rules={[{ required: true, message: 'Selecciona un estado' }]}
        >
          <Select
            placeholder="Selecciona un estado"
            options={STATUS_OPTIONS}
          />
        </Form.Item>

        <Form.Item
          label="Nombre de envío"
          name="shipping_name"
          rules={[{ required: true, message: 'Ingresa el nombre de envío' }]}
        >
          <Input placeholder="Nombre completo" />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="shipping_phone"
          rules={[{ required: true, message: 'Ingresa el teléfono' }]}
        >
          <Input placeholder="Teléfono" />
        </Form.Item>

        <Form.Item
          label="Dirección"
          name="shipping_address"
          rules={[{ required: true, message: 'Ingresa la dirección' }]}
        >
          <Input placeholder="Dirección completa" />
        </Form.Item>

        <Form.Item
          label="Ciudad"
          name="shipping_city"
          rules={[{ required: true, message: 'Ingresa la ciudad' }]}
        >
          <Input placeholder="Ciudad" />
        </Form.Item>

        <Form.Item
          label="Notas"
          name="shipping_notes"
        >
          <Input.TextArea
            rows={3}
            placeholder="Notas adicionales"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};