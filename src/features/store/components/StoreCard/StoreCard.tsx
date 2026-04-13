// src/features/store/components/StoreCard/StoreCard.tsx
import React from 'react';
import type { Product } from '../../../products/types/product';
import "./StoreCard.scss";

interface StoreCardProps {
  product: Product;
}

export const StoreCard: React.FC<StoreCardProps> = ({ product }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="store-card">
      <div className="store-card__image">
        {product.img && !imgError ? (
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="store-card__image-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <path d="m21 15-5-5L5 21"/>
            </svg>
          </div>
        )}
      </div>
      <div className="store-card__body">
        <h3 className="store-card__name">{product.name}</h3>
        <p className="store-card__desc">{product.description}</p>
        <div className="store-card__footer">
          <span className="store-card__price">
            ₡{Number(product.price).toLocaleString('es-CR', { minimumFractionDigits: 2 })}
          </span>
          <button className="store-card__cart-btn" aria-label={`Agregar ${product.name} al carrito`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
};