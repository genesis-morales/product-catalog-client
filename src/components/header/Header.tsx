import React from 'react';
import { Badge } from 'antd';
import { MenuOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined, } from '@ant-design/icons';
import { useCart } from '../../features/cart/context/CartContext';
import { useStoreContext } from '../../features/store/context/StoreContext';
import './Header.scss';

export const Header: React.FC = () => {
  const { openCart, itemCount } = useCart();
  const { search, setSearch } = useStoreContext();

  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" aria-label="Abrir menú">
          <MenuOutlined />
        </button>
        <span className="header__brand">TechStore</span>
      </div>

       <div className="header__search">
        <div className="header__search-bar">
          <SearchOutlined className="header__search-icon" />
          <input
            type="text"
            placeholder="Buscar productos..."
            className="header__search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="header__actions">
        <button
          className="header__action-btn"
          onClick={openCart}
          aria-label="Abrir carrito"
        >
          <Badge count={itemCount} size="small">
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </Badge>
        </button>

        <button className="header__action-btn" aria-label="Perfil de usuario">
          <UserOutlined style={{ fontSize: 20 }} />
        </button>
      </div>
    </header>
  );
};