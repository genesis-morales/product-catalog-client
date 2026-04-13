import React, { useState } from 'react';
import {
  AppstoreOutlined,
  FileTextOutlined,
  InboxOutlined,
  MenuOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import type { MenuProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Footer, Sider } = Layout;

const NAV_ITEMS: MenuProps['items'] = [
  { key: '/dashboard', icon: <AppstoreOutlined />, label: 'Dashboard' },
  { key: '/products',  icon: <InboxOutlined />,   label: 'Products'  },
  { key: '/orders',    icon: <FileTextOutlined />, label: 'Orders'    },
  { key: '/customers', icon: <UserOutlined />,     label: 'Customers' },
];

const AppLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate    = useNavigate();
  const location    = useLocation();
  const { token: { colorBgContainer } } = theme.useToken();

  const openMobile  = () => setMobileOpen(true);
  const closeMobile = () => setMobileOpen(false);

  const handleNavClick = (path: string) => {
    navigate(path);
    closeMobile();
  };

  const menuItems: MenuProps['items'] = NAV_ITEMS.map((item: any) => ({
    ...item,
    onClick: () => handleNavClick(item.key),
  }));

  return (
    <Layout hasSider className="app-layout">

      <div
        className={`sider-overlay ${mobileOpen ? 'visible' : ''}`}
        onClick={closeMobile}
      />

      <Sider className={`app-sider ${mobileOpen ? 'open' : ''}`} width={250}>
        <div className="sider-user">
          <div className="sider-user__avatar">A</div>
          <div className="sider-user__info">
            <span className="sider-user__name">Admin</span>
            <span className="sider-user__email">admin@techcatalog.com</span>
          </div>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />

        <div className="sider-bottom">
          <button className="sider-link" onClick={() => handleNavClick('/settings')}>
            <SettingOutlined /> Settings
          </button>
          <button className="sider-view-store" onClick={() => window.open('/store', '_blank')}>
            <ShopOutlined /> View Store
          </button>
        </div>
      </Sider>

      <Layout className="app-inner-layout">
        <Header className="app-header" style={{ background: colorBgContainer }}>
          <button className="app-header__menu-btn" onClick={openMobile} aria-label="Abrir menú">
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