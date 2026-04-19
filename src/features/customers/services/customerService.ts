import api from '../../../services/api';
import type { CustomerDetail, CustomerListItem } from '../types/customer';

export const CustomerService = {
  getCustomers: async (): Promise<CustomerListItem[]> => {
    const { data } = await api.get('/customers');
    return data;
  },

  getCustomerById: async (id: string | number): Promise<CustomerDetail> => {
    const { data } = await api.get(`/customers/${id}`);
    return data;
  },
};