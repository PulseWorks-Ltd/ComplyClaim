import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  
  // AWS S3
  AWS_REGION: z.string().default('ap-southeast-2'),
  AWS_ACCESS_KEY_ID: z.string().optional(),
  AWS_SECRET_ACCESS_KEY: z.string().optional(),
  S3_BUCKET_NAME: z.string().default('complyclaim-documents'),
  
  // SendGrid
  SENDGRID_API_KEY: z.string().optional(),
  SENDGRID_FROM_EMAIL: z.string().email().default('noreply@complyclaim.com'),
  
  // Redis
  REDIS_HOST: z.string().default('localhost'),
  REDIS_PORT: z.string().default('6379'),
  REDIS_PASSWORD: z.string().optional(),
  
  // CORS
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

export type Env = z.infer<typeof envSchema>;

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables:', parsedEnv.error.format());
  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
