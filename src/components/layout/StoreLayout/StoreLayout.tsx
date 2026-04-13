import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../components/header/Header';
import { CartDrawer } from '../../../features/cart/components/CartDrawer/CartDrawer';
import './StoreLayout.scss';

const StoreLayout: React.FC = () => (
  <div className="store-layout">
    <Header />
    <main className="store-layout__content">
      <Outlet />
    </main>
    <CartDrawer />
  </div>
);

export default StoreLayout;