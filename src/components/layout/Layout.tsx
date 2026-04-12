import React, { useState } from 'react';
import {
  AppstoreOutlined,
  InboxOutlined,
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  ShopOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const closeMobile = () => setMobileOpen(false);

  const items: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: React.createElement(AppstoreOutlined),
      label: 'Dashboard',
      onClick: () => { navigate('/dashboard'); closeMobile(); },
    },
    {
      key: '/products',
      icon: React.createElement(InboxOutlined),
      label: 'Products',
      onClick: () => { navigate('/products'); closeMobile(); },
    },
    {
      key: '/orders',
      icon: React.createElement(FileTextOutlined),
      label: 'Orders',
      onClick: () => { navigate('/orders'); closeMobile(); },
    },
    {
      key: '/customers',
      icon: React.createElement(UserOutlined),
      label: 'Customers',
      onClick: () => { navigate('/customers'); closeMobile(); },
    },
  ];

  return (
    <Layout hasSider className="app-layout">
      {/* Overlay móvil */}
      <div
        className={`sider-overlay ${mobileOpen ? '' : 'hidden'}`}
        onClick={closeMobile}
      />

      <Sider
        className={`app-sider ${mobileOpen ? 'open' : ''}`}
        width={250}
      >
        {/* Usuario */}
        <div className="sider-user">
          <div className="sider-user__avatar">A</div>
          <div className="sider-user__info">
            <span className="sider-user__name">Admin</span>
            <span className="sider-user__email">admin@techcatalog.com</span>
          </div>
        </div>

        {/* Menú */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={items}
        />

        {/* Bottom */}
        <div className="sider-bottom">
          <button
            className="sider-link"
            onClick={() => { navigate('/settings'); closeMobile(); }}
          >
            <SettingOutlined />
            Settings
          </button>

          <button
            className="sider-view-store"
            onClick={() => window.open('/store', '_blank')}
          >
            <ShopOutlined />
            View Store
          </button>
        </div>
      </Sider>

      <Layout className="app-inner-layout">
        <Header
          className="app-header"
          style={{ background: colorBgContainer }}
        >
          <button
            className="app-header__menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuOutlined style={{ fontSize: 20 }} />
          </button>
        </Header>

        <Content className="app-content">
          <div className="app-container">
            <Outlet />
          </div>
        </Content>

        <Footer className="app-footer">
          Tech Catalog ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;