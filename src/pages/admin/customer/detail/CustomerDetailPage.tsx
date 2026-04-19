import React from 'react';
import { Alert, Button, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../../../components/page-header/PageHeader';
import { useCustomerDetail } from '../../../../features/customers/hooks/useCustomerDetail';
import { CustomerSummaryCard } from '../../../../features/customers/components/customer-summary-card/CustomerSummaryCard';
import { CustomerRecentStatus } from '../../../../features/customers/components/customer-recent-status/CustomerRecentStatus';
import { CustomerOrdersTable } from '../../../../features/customers/components/customer-orders-table/CustomerOrdersTable';
import './CustomerDetailPage.scss';

const CustomerDetailPage: React.FC = () => {  
  const navigate = useNavigate();
  const { id } = useParams();
  const { customer, loading, error } = useCustomerDetail(id);

  return (
    <div className="customer-detail-page">
      <PageHeader
        title="Detalle del cliente"
        subtitle="Consulta sus datos básicos, historial de órdenes y actividad reciente."
        extra={
          <Button onClick={() => navigate('/customers')}>
            Volver
          </Button>
        }
      />

      {error && <Alert type="error" message={error} showIcon />}

      {loading || !customer ? (
        <div className="customer-detail-page__loading">
          <Spin size="large" />
        </div>
      ) : (
        <div className="customer-detail-page__content">
          <CustomerSummaryCard customer={customer} />

          <div className="customer-detail-page__grid">
            <div className="customer-detail-page__main">
              <CustomerOrdersTable orders={customer.orders} />
            </div>

            <div className="customer-detail-page__side">
              <CustomerRecentStatus customer={customer} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetailPage;