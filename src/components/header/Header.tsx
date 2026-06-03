import React from 'react';
import { Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo.svg';
import { useCart } from '../../features/cart/context/CartContext';
import { useStoreContext } from '../../features/store/context/StoreContext';
import { useAuth } from '../../features/auth/context/AuthContext';
import { getAvatarColor, getInitials } from '../../utils/avatarColor';
import './Header.scss';

export const Header: React.FC = () => {
  const { openCart, itemCount } = useCart();
  const { search, setSearch } = useStoreContext();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header__left">
        <button
          className="header__brand-btn"
          onClick={() => navigate('/')}
          aria-label="Ir al inicio"
        >
          <img src={logo} alt="" className="header__logo" aria-hidden="true" />
        </button>
      </div>

      <div className="header__search">
        <div className="header__search-bar">
          <SearchOutlined className="header__search-icon" />
          <input
            type="text"
            placeholder="Buscar productos, marcas y categorías..."
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
          <Badge count={itemCount} size="small" offset={[0, 2]}>
            <ShoppingCartOutlined style={{ fontSize: 20 }} />
          </Badge>
        </button>

        {isAuthenticated ? (
          <div className="header__user">
            <div
              className="header__avatar"
              style={{ backgroundColor: getAvatarColor(user?.name ?? '') }}
              title={user?.name}
            >
              {getInitials(user?.name ?? '')}
            </div>

            <button
              className="header__action-btn"
              onClick={logout}
              aria-label="Cerrar sesión"
            >
              <LogoutOutlined style={{ fontSize: 20 }} />
            </button>
          </div>
        ) : (
          <button
            className="header__action-btn"
            onClick={() => navigate('/auth')}
            aria-label="Iniciar sesión"
          >
            <UserOutlined style={{ fontSize: 20 }} />
          </button>
        )}
      </div>
    </header>
  );
};