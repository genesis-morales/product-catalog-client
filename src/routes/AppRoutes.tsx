import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout/Layout';
import StoreLayout from '../components/layout/StoreLayout/StoreLayout';

const Dashboard         = lazy(() => import('../pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('../features/products/components/ProductManagement').then(m => ({ default: m.ProductManagement })));
const Orders            = lazy(() => import('../pages/admin/Orders'));
const Customers         = lazy(() => import('../pages/admin/Customers'));
const StorePage         = lazy(() => import('../pages/store/StorePage'));
const ProductDetailPage = lazy(() => import('../pages/store/ProductDetailPage'));

export const AppRoutes = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Routes>

      {/* Admin */}
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products"  element={<ProductManagement />} />
        <Route path="/orders"    element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>

      {/* Tienda */}
      <Route path="/store" element={<StoreLayout />}>
        <Route index element={<StorePage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Route>

    </Routes>
  </Suspense>
);