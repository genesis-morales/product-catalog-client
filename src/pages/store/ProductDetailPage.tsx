import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import { StoreService } from '../../features/store/services/storeService';
import { ProductDetail } from '../../features/store/components/ProductDetail/ProductDetail';
import type { Product } from '../../features/products/types/product';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    StoreService.getProductById(Number(id))
      .then(setProduct)
      .catch(() => navigate('/store'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 80 }}>
      <Spin size="large" />
    </div>
  );

  if (!product) return null;

  return <ProductDetail product={product} />;
};

export default ProductDetailPage;