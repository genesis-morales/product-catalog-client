import React from 'react';
import { Card } from 'antd';
import type { TopProduct } from '../../types/dashboard';
import './TopProducts.scss';

interface TopProductsProps {
  products: TopProduct[];
}

export const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const max = products[0]?.total_sold ?? 1;

  return (
    <Card title="Productos más vendidos" className="top-products" variant="borderless">
      <div className="tp-list">
        {products.map((p, i) => {
          const pct = Math.round((p.total_sold / max) * 100);
          return (
            <div key={p.id} className="tp-item">
              <span className="tp-item__rank">{i + 1}</span>
              <div className="tp-item__info">
                <div className="tp-item__header">
                  <span className="tp-item__name">{p.name}</span>
                  <span className="tp-item__sold">{p.total_sold} vendidos</span>
                </div>
                <div className="tp-item__bar-bg">
                  <div className="tp-item__bar-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};