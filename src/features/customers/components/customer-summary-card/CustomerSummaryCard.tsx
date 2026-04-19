import React from 'react';
import { Card } from 'antd';
import type { CustomerDetail } from '../../types/customer';
import './CustomerSummaryCard.scss';

interface CustomerSummaryCardProps {
  customer: CustomerDetail;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC',
    maximumFractionDigits: 2,
  }).format(value);

const formatDate = (value: string | null) => {
  if (!value) return 'Sin compras';
  return new Date(value).toLocaleDateString('es-CR');
};

export const CustomerSummaryCard: React.FC<CustomerSummaryCardProps> = ({ customer }) => {
  return (
    <Card className="customer-summary-card" variant="borderless">
      <div className="customer-summary-card__grid">
        <div>
          <p className="customer-summary-card__label">Nombre</p>
          <h3 className="customer-summary-card__value">{customer.name}</h3>
        </div>

        <div>
          <p className="customer-summary-card__label">Email</p>
          <p className="customer-summary-card__text">{customer.email}</p>
        </div>

        <div>
          <p className="customer-summary-card__label">Total de órdenes</p>
          <p className="customer-summary-card__text">{customer.total_orders}</p>
        </div>

        <div>
          <p className="customer-summary-card__label">Total gastado</p>
          <p className="customer-summary-card__text">{formatCurrency(customer.total_spent)}</p>
        </div>

        <div>
          <p className="customer-summary-card__label">Última compra</p>
          <p className="customer-summary-card__text">{formatDate(customer.last_order_at)}</p>
        </div>

        <div>
          <p className="customer-summary-card__label">Cliente desde</p>
          <p className="customer-summary-card__text">{formatDate(customer.created_at)}</p>
        </div>
      </div>
    </Card>
  );
};