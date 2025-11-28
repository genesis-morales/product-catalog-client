import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/Layout';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/products/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import StoreView from './pages/store/StoreView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas de admin con layout */}
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
  </Route>

  {/* Ruta pública de la tienda SIN AppLayout */}
  <Route path="/store" element={<StoreView />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;