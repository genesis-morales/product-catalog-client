import React from 'react';
import { Col, Row } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined, DollarOutlined, FileTextOutlined,InboxOutlined, UserOutlined, } from '@ant-design/icons';
import type { DashboardStats } from '../../types/dashboard';
import './StatsCards.scss';

interface StatsCardsProps {
  stats: DashboardStats | null;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const kpis = [
    {
      key:   'revenue',
      label: 'Ventas totales',
      value: `₡${Number(stats?.total_revenue ?? 0).toLocaleString('es-CR')}`,
      icon:  <DollarOutlined />,
      trend: stats?.revenue_trend ?? 0,
      color: '#1677ff',
      bg:    '#eff6ff',
    },
    {
      key:   'orders',
      label: 'Órdenes',
      value: String(stats?.total_orders ?? 0),
      icon:  <FileTextOutlined />,
      trend: stats?.orders_trend ?? 0,
      color: '#7c3aed',
      bg:    '#f5f3ff',
    },
    {
      key:   'customers',
      label: 'Clientes',
      value: String(stats?.total_customers ?? 0),
      icon:  <UserOutlined />,
      trend: stats?.customers_trend ?? 0,
      color: '#0891b2',
      bg:    '#ecfeff',
    },
    {
      key:   'products',
      label: 'Productos activos',
      value: String(stats?.active_products ?? 0),
      icon:  <InboxOutlined />,
      trend: null,
      color: '#059669',
      bg:    '#ecfdf5',
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {kpis.map((kpi) => (
        <Col key={kpi.key} xs={24} sm={12} xl={6}>
          <div className="stat-card">
            <div
              className="stat-card__icon"
              style={{ background: kpi.bg, color: kpi.color }}
            >
              {kpi.icon}
            </div>
            <div className="stat-card__body">
              <span className="stat-card__label">{kpi.label}</span>
              <span className="stat-card__value">{kpi.value}</span>
              {kpi.trend !== null && (
                <span className={`stat-card__trend ${kpi.trend >= 0 ? 'up' : 'down'}`}>
                  {kpi.trend >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  {Math.abs(kpi.trend)}% este mes
                </span>
              )}
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};