import React from 'react';
import { Col, Row, Spin } from 'antd';
import { OrderStatusChart } from '../../../features/dashboard/components/order-status/OrderStatusChart';
import { RecentOrders } from '../../../features/dashboard/components/recent-orders/RecentOrders';
import { SalesChart } from '../../../features/dashboard/components/sales-charts/SalesChart';
import { StatsCards } from '../../../features/dashboard/components/stats-cards/StatsCards';
import { TopProducts } from '../../../features/dashboard/components/top-products/TopProducts';
import { useDashboard } from '../../../features/dashboard/hooks/useDashboard';
import './DashboardPage.scss';

const Dashboard: React.FC = () => {
  const { stats, monthlySales, recentOrders, topProducts, loading } = useDashboard();

  if (loading) {
    return (
      <div className="dp-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="dp">
      <div className="dp-header">
        <h1 className="dp-title">Dashboard</h1>
        <p className="dp-subtitle">Resumen general de la tienda</p>
      </div>

      {/* KPIs */}
      <StatsCards stats={stats} />

      {/* Ventas + Estado de órdenes */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <SalesChart data={monthlySales} />
        </Col>
        <Col xs={24} lg={8}>
          <OrderStatusChart stats={stats} />
        </Col>
      </Row>

      {/* Órdenes recientes + Top productos */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <RecentOrders orders={recentOrders} />
        </Col>
        <Col xs={24} lg={8}>
          <TopProducts products={topProducts} />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
