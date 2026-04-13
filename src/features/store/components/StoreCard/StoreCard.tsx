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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      </div>

      <div className="store-card__body">
        <h3 className="store-card__name">{product.name}</h3>
        <p className="store-card__desc">{product.description}</p>

        <div className="store-card__footer">
          <span className="store-card__price">
            ₡{Number(product.price).toLocaleString('es-CR', { minimumFractionDigits: 2 })}
          </span>
          <button
            className="store-card__cart-btn"
            aria-label={`Agregar ${product.name} al carrito`}
            onClick={handleAddToCart}
          >
            <ShoppingCartOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>
    </article>
  );
};