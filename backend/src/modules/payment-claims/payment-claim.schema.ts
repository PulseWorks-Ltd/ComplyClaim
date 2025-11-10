import { z } from 'zod';

export const lineItemSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1),
  quantity: z.number().positive(),
  unit: z.string().min(1),
  rate: z.number().positive(),
  amount: z.number().positive(),
});

export const paymentClaimSchema = z.object({
  id: z.string().uuid(),
  claimNumber: z.number().int().positive(),
  contractName: z.string().min(1),
  contractorName: z.string().min(1),
  principalName: z.string().min(1),
  claimDate: z.string().datetime(),
  valuationDate: z.string().datetime(),
  lineItems: z.array(lineItemSchema),
  subtotal: z.number().nonnegative(),
  gst: z.number().nonnegative(),
  total: z.number().nonnegative(),
  retentionPercentage: z.number().min(0).max(100).default(5),
  retentionAmount: z.number().nonnegative(),
  previousAmount: z.number().nonnegative().default(0),
  thisClaimAmount: z.number().nonnegative(),
  status: z.enum(['draft', 'submitted', 'approved', 'paid']).default('draft'),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createPaymentClaimSchema = z.object({
  body: z.object({
    contractName: z.string().min(1),
    contractorName: z.string().min(1),
    principalName: z.string().min(1),
    claimDate: z.string().datetime(),
    valuationDate: z.string().datetime(),
    lineItems: z.array(lineItemSchema),
    retentionPercentage: z.number().min(0).max(100).default(5),
    previousAmount: z.number().nonnegative().default(0),
    notes: z.string().optional(),
  }),
});

export const updatePaymentClaimSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    contractName: z.string().min(1).optional(),
    contractorName: z.string().min(1).optional(),
    principalName: z.string().min(1).optional(),
    claimDate: z.string().datetime().optional(),
    valuationDate: z.string().datetime().optional(),
    lineItems: z.array(lineItemSchema).optional(),
    retentionPercentage: z.number().min(0).max(100).optional(),
    previousAmount: z.number().nonnegative().optional(),
    status: z.enum(['draft', 'submitted', 'approved', 'paid']).optional(),
    notes: z.string().optional(),
  }),
});

export type PaymentClaim = z.infer<typeof paymentClaimSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
export type CreatePaymentClaimInput = z.infer<typeof createPaymentClaimSchema>['body'];
export type UpdatePaymentClaimInput = z.infer<typeof updatePaymentClaimSchema>['body'];
