import React from 'react';
import { Alert, Spin } from 'antd';
import { PageHeader } from '../../../../components/page-header/PageHeader';
import { CustomersTable } from '../../../../features/customers/components/customers-table/CustomersTable';
import { useCustomers } from '../../../../features/customers/hooks/useCustomers';
import './CustomersPage.scss';

const Customers: React.FC = () => {
  const { customers, loading, error } = useCustomers();

  return (
    <div className="customers-page">
      <PageHeader
        title="Clientes"
        subtitle="Consulta los clientes, su historial de compra y su actividad reciente."
      />

      {error && <Alert type="error" message={error} showIcon />}

      {loading ? (
        <div className="customers-page__loading">
          <Spin size="large" />
        </div>
      ) : (
        <CustomersTable data={customers} />
      )}
    </div>
  );
};

export { Customers };
