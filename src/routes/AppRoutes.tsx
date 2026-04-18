import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout/Layout';
import StoreLayout from '../components/layout/StoreLayout/StoreLayout';
import { AuthPage } from '../pages/auth/AuthPage';
import { CheckoutPage } from '../features/checkout/pages/CheckoutPage';
import { ProtectedRoute } from '../components/protected-route/ProtectedRoute';

const Dashboard         = lazy(() => import('../pages/admin/dasboard/Dashboard'));
const ProductManagement = lazy(() => import('../features/products/components/ProductManagement').then(m => ({ default: m.ProductManagement })));
const Orders            = lazy(() => import('../pages/admin/Orders'));
const Customers         = lazy(() => import('../pages/admin/Customers'));
const StorePage         = lazy(() => import('../pages/store/StorePage'));
const ProductDetailPage = lazy(() => import('../pages/store/ProductDetailPage'));

export const AppRoutes = () => (
  <Suspense fallback={<div>Cargando...</div>}>
    <Routes>
      {/* Raíz → tienda */}
      <Route path="/" element={<Navigate to="/store" replace />} />

      {/* Pública */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin — solo role admin */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRole="admin">
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products"  element={<ProductManagement />} />
        <Route path="/orders"    element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>

      {/* Tienda — pública */}
      <Route path="/store" element={<StoreLayout />}>
        <Route index element={<StorePage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Route>

      {/* Checkout — fuera del nest de /store 👇 */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);