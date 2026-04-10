import { Button } from 'antd';
import React from 'react';
import type { Product } from '../../products/types/product';

interface StoreCardProps {
  product: Product;
}

export const StoreCard: React.FC<StoreCardProps> = ({ product }) => (
  <article className="store-card">
    {product.img && (
      <div className="store-card-image">
        <img src={product.img} alt={product.name} />
      </div>
    )}
    <div className="store-card-body">
      <h4>{product.name}</h4>
      <p className="store-card-desc">{product.description}</p>
      <div className="store-card-footer">
        <span className="store-card-price">${Number(product.price).toFixed(2)}</span>
        <Button type="default" shape="circle" aria-label={`Agregar ${product.name} al carrito`}>
          🛒
        </Button>
      </div>
    </div>
  </article>
);
