import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../../components/header/Header';
import { CartDrawer } from '../../../features/cart/components/CartDrawer/CartDrawer';
import { StoreProvider } from '../../../features/store/context/StoreContext';
import './StoreLayout.scss';

const StoreLayout: React.FC = () => (
  <StoreProvider>
  <div className="store-body">
    <Header />
    <main className="store-layout__content">
      <Outlet />
    </main>
    <CartDrawer />
  </div>
  </StoreProvider>
);

export default StoreLayout;