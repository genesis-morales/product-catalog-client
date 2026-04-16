import React, { useState } from 'react';
import { Alert } from 'antd';
import type { ShippingData } from '../types/order';
import './CheckoutForm.scss';

interface CheckoutFormProps {
  onSubmit: (data: ShippingData) => Promise<void>;
  loading: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, loading }) => {
  const [form, setForm] = useState<ShippingData>({
    shipping_name: '',
    shipping_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_notes: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit(form);
    } catch {
      setError('No se pudo procesar el pedido. Intenta de nuevo.');
    }
  };

  const handleChange = (field: keyof ShippingData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [field]: e.target.value });

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <h2 className="checkout-form__title">Datos de envío</h2>

      {error && <Alert type="error" message={error} showIcon style={{ marginBottom: 16 }} />}

      <div className="checkout-form__grid">
        <div className="checkout-form__field">
          <label className="checkout-form__label">Nombre completo</label>
          <input
            className="checkout-form__input"
            type="text"
            placeholder="Tu nombre completo"
            value={form.shipping_name}
            onChange={handleChange('shipping_name')}
            required
          />
        </div>

        <div className="checkout-form__field">
          <label className="checkout-form__label">Teléfono</label>
          <input
            className="checkout-form__input"
            type="tel"
            placeholder="88887777"
            value={form.shipping_phone}
            onChange={handleChange('shipping_phone')}
            required
          />
        </div>

        <div className="checkout-form__field checkout-form__field--full">
          <label className="checkout-form__label">Dirección</label>
          <input
            className="checkout-form__input"
            type="text"
            placeholder="Calle, número, referencias"
            value={form.shipping_address}
            onChange={handleChange('shipping_address')}
            required
          />
        </div>

        <div className="checkout-form__field">
          <label className="checkout-form__label">Ciudad</label>
          <input
            className="checkout-form__input"
            type="text"
            placeholder="San José"
            value={form.shipping_city}
            onChange={handleChange('shipping_city')}
            required
          />
        </div>

        <div className="checkout-form__field checkout-form__field--full">
          <label className="checkout-form__label">Notas adicionales <span>(opcional)</span></label>
          <textarea
            className="checkout-form__input checkout-form__textarea"
            placeholder="Instrucciones especiales para la entrega..."
            value={form.shipping_notes}
            onChange={handleChange('shipping_notes')}
            rows={3}
          />
        </div>
      </div>

      <button type="submit" className="checkout-form__btn" disabled={loading}>
        {loading ? 'Procesando pedido...' : 'Confirmar pedido'}
      </button>
    </form>
  );
};