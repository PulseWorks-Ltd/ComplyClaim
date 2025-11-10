import { Router, Request, Response, NextFunction } from 'express';
import { HealthSafetyService } from './health-safety.service.js';
import { validate } from '../../middleware/validate.js';
import { createHealthSafetyDocumentSchema, updateHealthSafetyDocumentSchema } from './health-safety.schema.js';
import { AppError } from '../../middleware/error.js';

const router = Router();
const healthSafetyService = new HealthSafetyService();

// Get all H&S documents
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { type, project } = req.query;
    let documents;
    
    if (type) {
      documents = await healthSafetyService.findByType(type as any);
    } else if (project) {
      documents = await healthSafetyService.findByProject(project as string);
    } else {
      documents = await healthSafetyService.findAll();
    }
    
    res.json({ status: 'success', data: documents });
  } catch (error) {
    next(error);
  }
});

// Get H&S document by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await healthSafetyService.findById(req.params.id);
    if (!document) {
      throw new AppError(404, 'Document not found');
    }
    res.json({ status: 'success', data: document });
  } catch (error) {
    next(error);
  }
});

// Create H&S document
router.post(
  '/',
  validate(createHealthSafetyDocumentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await healthSafetyService.create(req.body);
      res.status(201).json({ status: 'success', data: document });
    } catch (error) {
      next(error);
    }
  }
);

// Update H&S document
router.patch(
  '/:id',
  validate(updateHealthSafetyDocumentSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const document = await healthSafetyService.update(req.params.id, req.body);
      if (!document) {
        throw new AppError(404, 'Document not found');
      }
      res.json({ status: 'success', data: document });
    } catch (error) {
      next(error);
    }
  }
);

// Delete H&S document
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await healthSafetyService.delete(req.params.id);
    if (!deleted) {
      throw new AppError(404, 'Document not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Get upload URL for file
router.post('/:id/upload-url', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName } = req.body;
    if (!fileName) {
      throw new AppError(400, 'fileName is required');
    }
    
    const uploadUrl = await healthSafetyService.generateUploadUrl(req.params.id, fileName);
    res.json({ status: 'success', data: { uploadUrl } });
  } catch (error) {
    next(error);
  }
});

// Get download URL for file
router.get('/:id/download-url', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await healthSafetyService.findById(req.params.id);
    if (!document || !document.fileName) {
      throw new AppError(404, 'Document or file not found');
    }
    
    const downloadUrl = await healthSafetyService.generateDownloadUrl(req.params.id, document.fileName);
    res.json({ status: 'success', data: { downloadUrl } });
  } catch (error) {
    next(error);
  }
});

// Attach file to document
router.post('/:id/attach', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileName, fileSize } = req.body;
    if (!fileName || !fileSize) {
      throw new AppError(400, 'fileName and fileSize are required');
    }
    
    const document = await healthSafetyService.attachFile(req.params.id, fileName, fileSize);
    if (!document) {
      throw new AppError(404, 'Document not found');
    }
    res.json({ status: 'success', data: document });
  } catch (error) {
    next(error);
  }
});

export default router;
