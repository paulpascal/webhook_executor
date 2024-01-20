const { env } = require('process');
const express = require('express');

const { logger } = require('./core/logger');
const { rateLimiter } = require('./middleware/rate-limit.middleware');
const { requestLogger } = require('./middleware/logger.middleware');
const { initializeRouter } = require('./router');

const PORT = env.PORT || 5555;

const app = express();

app.use(rateLimiter);
app.use(requestLogger);

initializeRouter(app);

app.listen(PORT, () => {
  logger.info(`[APP]: 🚀 Webhook listening on port: ${PORT}`);
});