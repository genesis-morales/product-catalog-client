import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/Layout';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/products/Products';
import Orders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';

// Public pages
import ViewStore from './pages/public/ViewStore';
import ProductDetail from './pages/public/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {/* Admin routes */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          
          {/* Public routes */}
          <Route path="store" element={<ViewStore />} />
          <Route path="store/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;