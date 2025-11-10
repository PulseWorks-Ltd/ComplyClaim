import { Router, Request, Response, NextFunction } from 'express';
import { VariationService } from './variation.service.js';
import { validate } from '../../middleware/validate.js';
import { createVariationSchema, updateVariationSchema } from './variation.schema.js';
import { AppError } from '../../middleware/error.js';

const router = Router();
const variationService = new VariationService();

// Get all variations
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const type = req.query.type as 'variation' | 'daywork' | undefined;
    const variations = type 
      ? await variationService.findByType(type)
      : await variationService.findAll();
    res.json({ status: 'success', data: variations });
  } catch (error) {
    next(error);
  }
});

// Get variation by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const variation = await variationService.findById(req.params.id);
    if (!variation) {
      throw new AppError(404, 'Variation not found');
    }
    res.json({ status: 'success', data: variation });
  } catch (error) {
    next(error);
  }
});

// Create variation
router.post(
  '/',
  validate(createVariationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variation = await variationService.create(req.body);
      res.status(201).json({ status: 'success', data: variation });
    } catch (error) {
      next(error);
    }
  }
);

// Update variation
router.patch(
  '/:id',
  validate(updateVariationSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const variation = await variationService.update(req.params.id, req.body);
      if (!variation) {
        throw new AppError(404, 'Variation not found');
      }
      res.json({ status: 'success', data: variation });
    } catch (error) {
      next(error);
    }
  }
);

// Delete variation
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await variationService.delete(req.params.id);
    if (!deleted) {
      throw new AppError(404, 'Variation not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
