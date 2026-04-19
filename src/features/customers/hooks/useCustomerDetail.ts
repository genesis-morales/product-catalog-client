import { useEffect, useState } from 'react';
import { CustomerService } from '../services/customerService';
import type { CustomerDetail } from '../types/customer';

export const useCustomerDetail = (id?: string) => {
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomer = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await CustomerService.getCustomerById(id);
      setCustomer(data);
    } catch {
      setError('No se pudo cargar el detalle del cliente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [id]);

  return {
    customer,
    loading,
    error,
    refetch: fetchCustomer,
  };
};