const { env } = require('process');
const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: env.WINDOWS_SIZE_IN_MS || (60 * 1000) * 2, // 2min of window size in milliseconds
  max: env.MAX_REQUEST_PER_WINDOWS || 1, // the number of allowed requests per window per user
  standardHeaders: true, // appropriate headers should be added to the response showing the enforced limit
  legacyHeader: false,
});

module.exports = {
  rateLimiter,
}