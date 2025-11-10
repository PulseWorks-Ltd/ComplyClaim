import { z } from 'zod';

export const healthSafetyDocumentSchema = z.object({
  id: z.string().uuid(),
  documentName: z.string().min(1),
  documentType: z.enum([
    'site-safety-plan',
    'risk-assessment',
    'method-statement',
    'incident-report',
    'hazard-register',
    'safety-induction',
    'permit-to-work',
    'inspection-report',
    'other'
  ]),
  projectName: z.string().min(1),
  description: z.string().optional(),
  fileUrl: z.string().url().optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
  uploadedBy: z.string().min(1),
  status: z.enum(['draft', 'pending-review', 'approved', 'expired']).default('draft'),
  expiryDate: z.string().datetime().optional(),
  version: z.string().default('1.0'),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createHealthSafetyDocumentSchema = z.object({
  body: z.object({
    documentName: z.string().min(1),
    documentType: z.enum([
      'site-safety-plan',
      'risk-assessment',
      'method-statement',
      'incident-report',
      'hazard-register',
      'safety-induction',
      'permit-to-work',
      'inspection-report',
      'other'
    ]),
    projectName: z.string().min(1),
    description: z.string().optional(),
    uploadedBy: z.string().min(1),
    expiryDate: z.string().datetime().optional(),
    version: z.string().default('1.0'),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export const updateHealthSafetyDocumentSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    documentName: z.string().min(1).optional(),
    documentType: z.enum([
      'site-safety-plan',
      'risk-assessment',
      'method-statement',
      'incident-report',
      'hazard-register',
      'safety-induction',
      'permit-to-work',
      'inspection-report',
      'other'
    ]).optional(),
    projectName: z.string().min(1).optional(),
    description: z.string().optional(),
    status: z.enum(['draft', 'pending-review', 'approved', 'expired']).optional(),
    expiryDate: z.string().datetime().optional(),
    version: z.string().optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
  }),
});

export type HealthSafetyDocument = z.infer<typeof healthSafetyDocumentSchema>;
export type CreateHealthSafetyDocumentInput = z.infer<typeof createHealthSafetyDocumentSchema>['body'];
export type UpdateHealthSafetyDocumentInput = z.infer<typeof updateHealthSafetyDocumentSchema>['body'];
