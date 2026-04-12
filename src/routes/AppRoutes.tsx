// src/routes/AppRoutes.tsx
import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppLayout from '../components/layout/Layout';

const Dashboard        = lazy(() => import('../pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('../features/products/components/ProductManagement').then(m => ({ default: m.ProductManagement })));
const Orders           = lazy(() => import('../pages/admin/Orders'));
const Customers        = lazy(() => import('../pages/admin/Customers'));
const StorePage = lazy(() => import('../pages/store/StorePage'));

export const AppRoutes = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Routes>
      {/* Admin con layout */}
      <Route path="/" element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products"  element={<ProductManagement />} />
        <Route path="/orders"    element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>

      {/* Tienda pública sin layout */}
      <Route path="/store" element={<StorePage />} />
    </Routes>
  </Suspense>
);