import { api } from './api';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
}

export interface PaymentClaim {
  id: string;
  claimNumber: number;
  contractName: string;
  contractorName: string;
  principalName: string;
  claimDate: string;
  valuationDate: string;
  lineItems: LineItem[];
  subtotal: number;
  gst: number;
  total: number;
  retentionPercentage: number;
  retentionAmount: number;
  previousAmount: number;
  thisClaimAmount: number;
  status: 'draft' | 'submitted' | 'approved' | 'paid';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const paymentClaimService = {
  getAll: async () => {
    const response = await api.get<{ status: string; data: PaymentClaim[] }>('/payment-claims');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get<{ status: string; data: PaymentClaim }>(`/payment-claims/${id}`);
    return response.data.data;
  },

  create: async (data: Partial<PaymentClaim>) => {
    const response = await api.post<{ status: string; data: PaymentClaim }>('/payment-claims', data);
    return response.data.data;
  },

  update: async (id: string, data: Partial<PaymentClaim>) => {
    const response = await api.patch<{ status: string; data: PaymentClaim }>(`/payment-claims/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string) => {
    await api.delete(`/payment-claims/${id}`);
  },
};
