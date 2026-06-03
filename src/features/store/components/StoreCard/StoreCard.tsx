import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined, PictureOutlined } from '@ant-design/icons';
import { useCart } from '../../../cart/context/CartContext';
import { getImageUrl } from '../../../../utils/imageUrl';
import type { Product } from '../../../products/types/product';
import './StoreCard.scss';

interface StoreCardProps {
  product: Product;
}

export const StoreCard: React.FC<StoreCardProps> = ({ product }) => {
  const [imgError, setImgError] = React.useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const isOutOfStock = !product.available || product.stock === 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isOutOfStock) return;

    addItem(product.id);
  };

  return (
    <article
      className="store-card"
      onClick={() => navigate(`/store/${product.id}`)}
    >
      <div className="store-card__image">
        {product.img && !imgError ? (
          <img
            src={getImageUrl(product.img)}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="store-card__image-placeholder">
            <PictureOutlined style={{ fontSize: 40, color: '#9ca3af' }} />
          </div>
        )}

        {isOutOfStock && (
          <span className="store-card__badge">Sin stock</span>
        )}
      </div>

      <div className="store-card__body">
        <h3 className="store-card__name">{product.name}</h3>
        <p className="store-card__desc">{product.description}</p>

        <div className="store-card__footer">
          <div className="store-card__meta">
            <span className="store-card__price">
              ₡{Number(product.price).toLocaleString('es-CR', {
                minimumFractionDigits: 2,
              })}
            </span>

            <span
              className={`store-card__stock ${
                isOutOfStock
                  ? 'store-card__stock--out'
                  : 'store-card__stock--available'
              }`}
            >
              {isOutOfStock ? 'Sin stock' : `Stock: ${product.stock}`}
            </span>
          </div>

          <button
            className="store-card__cart-btn"
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingCartOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </article>
  );
};