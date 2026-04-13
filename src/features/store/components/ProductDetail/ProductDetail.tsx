import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, PictureOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../../../cart/context/CartContext';
import { getImageUrl } from '../../../../utils/imageUrl';
import type { Product } from '../../../products/types/product';
import './ProductDetail.scss';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  return (
    <div className="product-detail">
      <button className="product-detail__back" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined /> Volver
      </button>

      <div className="product-detail__card">
        {/* Imagen */}
        <div className="product-detail__image">
          {product.img && !imgError ? (
            <img
              src={getImageUrl(product.img)}
              alt={product.name}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="product-detail__image-placeholder">
              <PictureOutlined style={{ fontSize: 64, color: '#9ca3af' }} />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-detail__info">
          {product.subcategory && (
            <span className="product-detail__category">
              {product.subcategory.category?.name} / {product.subcategory.name}
            </span>
          )}

          <h1 className="product-detail__name">{product.name}</h1>

          <p className="product-detail__price">
            ₡{Number(product.price).toLocaleString('es-CR', { minimumFractionDigits: 2 })}
          </p>

          <p className="product-detail__description">{product.description}</p>

          <div className="product-detail__stock">
            {product.stock > 0 ? (
              <span className="product-detail__stock--available">
                ✓ En stock ({product.stock} disponibles)
              </span>
            ) : (
              <span className="product-detail__stock--out">Sin stock</span>
            )}
          </div>

          <button
            className="product-detail__add-btn"
            onClick={() => addItem(product.id)}
            disabled={!product.available || product.stock === 0}
          >
            <ShoppingCartOutlined />
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};