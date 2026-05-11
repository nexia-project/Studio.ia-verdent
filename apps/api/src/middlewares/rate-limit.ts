import { Request, Response, NextFunction } from 'express';
import { redis } from '../config/redis';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  keyPrefix?: string;
}

const defaultConfig: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  keyPrefix: 'ratelimit:',
};

export const rateLimitMiddleware = (config: Partial<RateLimitConfig> = {}) => {
  const { windowMs, maxRequests, keyPrefix } = { ...defaultConfig, ...config };

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const identifier = req.ip || 'unknown';
      const key = `${keyPrefix}${identifier}`;

      const current = await redis.incr(key);

      if (current === 1) {
        await redis.pexpire(key, windowMs);
      }

      const ttl = await redis.pttl(key);

      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current));
      res.setHeader('X-RateLimit-Reset', new Date(Date.now() + ttl).toISOString());

      if (current > maxRequests) {
        return res.status(429).json({
          error: 'Too Many Requests',
          message: `Rate limit exceeded. Try again in ${Math.ceil(ttl / 1000)} seconds.`,
        });
      }

      next();
    } catch (error) {
      console.error('Rate limit error:', error);
      next();
    }
  };
};