import { z } from 'zod';

export const tenderSchema = z.object({
  id: z.string().uuid(),
  tenderNumber: z.string().min(1),
  projectName: z.string().min(1),
  clientName: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(['draft', 'submitted', 'won', 'lost', 'withdrawn']).default('draft'),
  submissionDate: z.string().datetime(),
  closingDate: z.string().datetime(),
  estimatedValue: z.number().nonnegative(),
  actualValue: z.number().nonnegative().optional(),
  scopeOfWork: z.string().min(1),
  requirements: z.array(z.string()).optional(),
  notes: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createTenderSchema = z.object({
  body: z.object({
    tenderNumber: z.string().min(1),
    projectName: z.string().min(1),
    clientName: z.string().min(1),
    description: z.string().min(1),
    submissionDate: z.string().datetime(),
    closingDate: z.string().datetime(),
    estimatedValue: z.number().nonnegative(),
    scopeOfWork: z.string().min(1),
    requirements: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export const updateTenderSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    tenderNumber: z.string().min(1).optional(),
    projectName: z.string().min(1).optional(),
    clientName: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    status: z.enum(['draft', 'submitted', 'won', 'lost', 'withdrawn']).optional(),
    submissionDate: z.string().datetime().optional(),
    closingDate: z.string().datetime().optional(),
    estimatedValue: z.number().nonnegative().optional(),
    actualValue: z.number().nonnegative().optional(),
    scopeOfWork: z.string().min(1).optional(),
    requirements: z.array(z.string()).optional(),
    notes: z.string().optional(),
    attachments: z.array(z.string()).optional(),
  }),
});

export type Tender = z.infer<typeof tenderSchema>;
export type CreateTenderInput = z.infer<typeof createTenderSchema>['body'];
export type UpdateTenderInput = z.infer<typeof updateTenderSchema>['body'];
