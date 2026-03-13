import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // max 100 requests per 15 minutes
  message: { error: 'Too many requests, slow down.' }
})