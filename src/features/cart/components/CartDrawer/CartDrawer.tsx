import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItemRow } from '../CartItem/CartItemRow';
import './CartDrawer.scss';

export const CartDrawer: React.FC = () => {
  const { cart, isOpen, closeCart, itemCount, loading } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? 'visible' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">
            Carrito
            {itemCount > 0 && (
              <span className="cart-drawer__badge">{itemCount}</span>
            )}
          </h2>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Cerrar carrito">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="cart-drawer__body">
          {loading && (
            <div className="cart-drawer__loading">
              <div className="cart-spinner" />
            </div>
          )}

          {!loading && (!cart?.items || cart.items.length === 0) ? (
            <div className="cart-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p>Tu carrito está vacío</p>
              <button className="cart-empty__btn" onClick={closeCart}>
                Ver productos
              </button>
            </div>
          ) : (
            <ul className="cart-drawer__items">
              {cart?.items.map(item => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__total">
              <span>Total</span>
              <span className="cart-drawer__total-price">
                ₡{cart.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <button className="cart-drawer__checkout">
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  );
};