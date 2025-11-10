import { Router, Request, Response, NextFunction } from 'express';
import { PaymentClaimService } from './payment-claim.service.js';
import { validate } from '../../middleware/validate.js';
import { createPaymentClaimSchema, updatePaymentClaimSchema } from './payment-claim.schema.js';
import { AppError } from '../../middleware/error.js';

const router = Router();
const paymentClaimService = new PaymentClaimService();

// Get all payment claims
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const claims = await paymentClaimService.findAll();
    res.json({ status: 'success', data: claims });
  } catch (error) {
    next(error);
  }
});

// Get payment claim by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const claim = await paymentClaimService.findById(req.params.id);
    if (!claim) {
      throw new AppError(404, 'Payment claim not found');
    }
    res.json({ status: 'success', data: claim });
  } catch (error) {
    next(error);
  }
});

// Create payment claim
router.post(
  '/',
  validate(createPaymentClaimSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const claim = await paymentClaimService.create(req.body);
      res.status(201).json({ status: 'success', data: claim });
    } catch (error) {
      next(error);
    }
  }
);

// Update payment claim
router.patch(
  '/:id',
  validate(updatePaymentClaimSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const claim = await paymentClaimService.update(req.params.id, req.body);
      if (!claim) {
        throw new AppError(404, 'Payment claim not found');
      }
      res.json({ status: 'success', data: claim });
    } catch (error) {
      next(error);
    }
  }
);

// Delete payment claim
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await paymentClaimService.delete(req.params.id);
    if (!deleted) {
      throw new AppError(404, 'Payment claim not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
