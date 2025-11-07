import React, { useState } from 'react';
import {
  AppstoreOutlined,
  InboxOutlined,
  FileTextOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './Layout.css';

const { Header, Content, Footer, Sider } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: React.createElement(AppstoreOutlined),
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/products',
      icon: React.createElement(InboxOutlined),
      label: 'Products',
      onClick: () => navigate('/products'),
    },
    {
      key: '/orders',
      icon: React.createElement(FileTextOutlined),
      label: 'Orders',
      onClick: () => navigate('/orders'),
    },
    {
      key: '/customers',
      icon: React.createElement(UserOutlined),
      label: 'Customers',
      onClick: () => navigate('/customers'),
    },
  ];

  return (
    <Layout hasSider className="app-layout">
      <Sider
        className="app-sider"
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value: boolean) => setCollapsed(value)}
        width={250}
      >
        <div className="demo-logo-vertical">Tech Catalog</div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]} 
          items={items} 
        />
      </Sider>
      <Layout className="app-inner-layout">
        <Header className="app-header" style={{ background: colorBgContainer }} />
        <Content className="app-content">
          <div
            className="app-container"
            style={{ background: colorBgContainer, borderRadius: borderRadiusLG }}
          >
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