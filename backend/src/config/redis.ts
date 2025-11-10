import Redis from 'ioredis';
import { env } from './env.js';

let redisClient: Redis | null = null;

export const getRedisClient = () => {
  if (!redisClient) {
    redisClient = new Redis({
      host: env.REDIS_HOST,
      port: parseInt(env.REDIS_PORT),
      password: env.REDIS_PASSWORD || undefined,
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          return null; // Stop retrying after 3 attempts
        }
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      lazyConnect: true,
    });

    redisClient.on('error', (err) => {
      // Only log once to avoid spam
      if ('code' in err && err.code === 'ECONNREFUSED') {
        console.warn('⚠️  Redis not available, continuing without cache');
        redisClient = null;
      } else {
        console.error('Redis Client Error:', err);
      }
    });

    redisClient.on('connect', () => {
      console.log('✅ Redis connected');
    });
  }

  return redisClient;
};

export const connectRedis = async () => {
  const client = getRedisClient();
  if (!client) return;
  
  try {
    await client.connect();
  } catch (error) {
    console.warn('⚠️  Redis connection failed, continuing without cache');
    redisClient = null;
  }
};
