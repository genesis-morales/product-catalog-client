import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/Layout';

const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ProductManagement = lazy(() => import('./features/products/components/ProductManagement').then(module => ({ default: module.ProductManagement })));
const Orders = lazy(() => import('./pages/admin/Orders'));
const Customers = lazy(() => import('./pages/admin/Customers'));
const StoreView = lazy(() => import('./pages/store/StoreView').then(module => ({ default: module.StoreView })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {/* Rutas de admin con layout */}
          <Route path="/" element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Route>

          {/* Ruta pública de la tienda SIN AppLayout */}
          <Route path="/store" element={<StoreView />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;