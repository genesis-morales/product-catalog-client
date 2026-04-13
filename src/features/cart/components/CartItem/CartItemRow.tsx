import React from 'react';
import { Image } from 'antd';
import { useCart } from '../../context/CartContext';
import type { CartItem } from '../../types/cart';
import { getImageUrl } from '../../../../utils/imageUrl';
import './CartItemRow.scss';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateItem, removeItem } = useCart();

  return (
    <li className="cart-item">
      <div className="cart-item__image">
        <Image
          src={getImageUrl(item.product.img)}
          alt={item.product.name}
          width={72}
          height={72}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          fallback="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='72' height='72' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='1.5'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='m21 15-5-5L5 21'/%3E%3C/svg%3E"
          preview={false}
        />
      </div>

      <div className="cart-item__info">
        <p className="cart-item__name">{item.product.name}</p>
        <p className="cart-item__price">
          ₡{item.unit_price.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
        </p>

        <div className="cart-item__actions">
          <div className="cart-item__qty">
            <button
              onClick={() => updateItem(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              aria-label="Reducir cantidad"
            >−</button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateItem(item.id, item.quantity + 1)}
              aria-label="Aumentar cantidad"
            >+</button>
          </div>

          <button
            className="cart-item__remove"
            onClick={() => removeItem(item.id)}
            aria-label="Eliminar producto"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
            </svg>
          </button>
        </div>
      </div>

      <p className="cart-item__total">
        ₡{item.total_price.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
      </p>
    </li>
  );
};