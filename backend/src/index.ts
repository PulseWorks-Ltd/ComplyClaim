import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { connectRedis } from './config/redis.js';
import { errorHandler } from './middleware/error.js';

// Import routes
import paymentClaimRoutes from './modules/payment-claims/payment-claim.routes.js';
import variationRoutes from './modules/variations/variation.routes.js';
import tenderRoutes from './modules/tenders/tender.routes.js';
import healthSafetyRoutes from './modules/health-safety/health-safety.routes.js';

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// API Routes
app.use('/api/payment-claims', paymentClaimRoutes);
app.use('/api/variations', variationRoutes);
app.use('/api/tenders', tenderRoutes);
app.use('/api/health-safety', healthSafetyRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found',
  });
});

// Error handler
app.use(errorHandler);

// Start server
const PORT = parseInt(env.PORT);

const startServer = async () => {
  try {
    // Connect to Redis (optional)
    await connectRedis();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${env.NODE_ENV}`);
      console.log(`🔗 CORS enabled for: ${env.CORS_ORIGIN}`);
      console.log('\n📚 API Endpoints:');
      console.log(`   - Health: http://localhost:${PORT}/health`);
      console.log(`   - Payment Claims: http://localhost:${PORT}/api/payment-claims`);
      console.log(`   - Variations: http://localhost:${PORT}/api/variations`);
      console.log(`   - Tenders: http://localhost:${PORT}/api/tenders`);
      console.log(`   - Health & Safety: http://localhost:${PORT}/api/health-safety`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
