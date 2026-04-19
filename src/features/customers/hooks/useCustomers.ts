import { useEffect, useState } from 'react';
import { CustomerService } from '../services/customerService';
import type { CustomerListItem } from '../types/customer';

export const useCustomers = () => {
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await CustomerService.getCustomers();
      setCustomers(data);
    } catch {
      setError('No se pudo cargar la lista de clientes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    error,
    refetch: fetchCustomers,
  };
};