import { z } from 'zod';

export const variationSchema = z.object({
  id: z.string().uuid(),
  variationNumber: z.string().min(1),
  projectName: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['variation', 'daywork']),
  date: z.string().datetime(),
  requestedBy: z.string().min(1),
  approvedBy: z.string().optional(),
  status: z.enum(['pending', 'approved', 'rejected', 'completed']).default('pending'),
  estimatedCost: z.number().nonnegative(),
  actualCost: z.number().nonnegative().optional(),
  labourHours: z.number().nonnegative().optional(),
  materials: z.array(z.object({
    id: z.string().uuid(),
    description: z.string().min(1),
    quantity: z.number().positive(),
    unit: z.string().min(1),
    unitCost: z.number().positive(),
    totalCost: z.number().positive(),
  })).optional(),
  notes: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createVariationSchema = z.object({
  body: z.object({
    variationNumber: z.string().min(1),
    projectName: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['variation', 'daywork']),
    date: z.string().datetime(),
    requestedBy: z.string().min(1),
    estimatedCost: z.number().nonnegative(),
    labourHours: z.number().nonnegative().optional(),
    materials: z.array(z.object({
      id: z.string().uuid(),
      description: z.string().min(1),
      quantity: z.number().positive(),
      unit: z.string().min(1),
      unitCost: z.number().positive(),
      totalCost: z.number().positive(),
    })).optional(),
    notes: z.string().optional(),
  }),
});

export const updateVariationSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    variationNumber: z.string().min(1).optional(),
    projectName: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    type: z.enum(['variation', 'daywork']).optional(),
    date: z.string().datetime().optional(),
    requestedBy: z.string().min(1).optional(),
    approvedBy: z.string().optional(),
    status: z.enum(['pending', 'approved', 'rejected', 'completed']).optional(),
    estimatedCost: z.number().nonnegative().optional(),
    actualCost: z.number().nonnegative().optional(),
    labourHours: z.number().nonnegative().optional(),
    materials: z.array(z.object({
      id: z.string().uuid(),
      description: z.string().min(1),
      quantity: z.number().positive(),
      unit: z.string().min(1),
      unitCost: z.number().positive(),
      totalCost: z.number().positive(),
    })).optional(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export type Variation = z.infer<typeof variationSchema>;
export type CreateVariationInput = z.infer<typeof createVariationSchema>['body'];
export type UpdateVariationInput = z.infer<typeof updateVariationSchema>['body'];
