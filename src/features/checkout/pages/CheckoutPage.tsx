import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../cart/context/CartContext';
import { OrderService } from '../services/orderService';
import { CheckoutForm } from '../components/CheckoutForm';
import type { ShippingData } from '../types/order';
import type { Order } from '../types/order';
import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSubmit = async (data: ShippingData) => {
    setLoading(true);
    try {
      const created = await OrderService.createOrder(data);
      setOrder(created);
      await fetchCart(); // resetea el carrito en el contexto
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de confirmación
  if (order) {
    return (
      <div className="checkout-confirm">
        <div className="checkout-confirm__card">
          <div className="checkout-confirm__icon">✓</div>
          <h2 className="checkout-confirm__title">¡Pedido confirmado!</h2>
          <p className="checkout-confirm__number">Orden <strong>{order.order_number}</strong></p>
          <p className="checkout-confirm__msg">
            Gracias por tu compra. Te contactaremos pronto para coordinar la entrega.
          </p>
          <div className="checkout-confirm__summary">
            {order.items.map(item => (
              <div key={item.id} className="checkout-confirm__item">
                <span>{item.product_name} × {item.quantity}</span>
                <span>₡{item.total_price.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
            <div className="checkout-confirm__total">
              <span>Total</span>
              <span>₡{order.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
          <button className="checkout-confirm__btn" onClick={() => navigate('/store')}>
            Seguir comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <h1 className="checkout-page__heading">Finalizar compra</h1>

        <div className="checkout-page__layout">
          {/* Formulario */}
          <div className="checkout-page__main">
            <CheckoutForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Resumen del carrito */}
          <aside className="checkout-page__summary">
            <h3 className="checkout-summary__title">Resumen</h3>
            <ul className="checkout-summary__items">
              {cart?.items.map(item => (
                <li key={item.id} className="checkout-summary__item">
                  <span className="checkout-summary__name">
                    {item.product.name} <em>×{item.quantity}</em>
                  </span>
                  <span className="checkout-summary__price">
                    ₡{item.total_price.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
                  </span>
                </li>
              ))}
            </ul>
            <div className="checkout-summary__total">
              <span>Total</span>
              <span>₡{cart?.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};