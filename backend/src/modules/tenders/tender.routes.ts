import { Router, Request, Response, NextFunction } from 'express';
import { TenderService } from './tender.service.js';
import { validate } from '../../middleware/validate.js';
import { createTenderSchema, updateTenderSchema } from './tender.schema.js';
import { AppError } from '../../middleware/error.js';

const router = Router();
const tenderService = new TenderService();

// Get all tenders
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as any;
    const tenders = status 
      ? await tenderService.findByStatus(status)
      : await tenderService.findAll();
    res.json({ status: 'success', data: tenders });
  } catch (error) {
    next(error);
  }
});

// Get tender by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tender = await tenderService.findById(req.params.id);
    if (!tender) {
      throw new AppError(404, 'Tender not found');
    }
    res.json({ status: 'success', data: tender });
  } catch (error) {
    next(error);
  }
});

// Create tender
router.post(
  '/',
  validate(createTenderSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await tenderService.create(req.body);
      res.status(201).json({ status: 'success', data: tender });
    } catch (error) {
      next(error);
    }
  }
);

// Update tender
router.patch(
  '/:id',
  validate(updateTenderSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tender = await tenderService.update(req.params.id, req.body);
      if (!tender) {
        throw new AppError(404, 'Tender not found');
      }
      res.json({ status: 'success', data: tender });
    } catch (error) {
      next(error);
    }
  }
);

// Delete tender
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await tenderService.delete(req.params.id);
    if (!deleted) {
      throw new AppError(404, 'Tender not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
