const expressPino = require('express-pino-logger');
const pretty = require('pino-pretty')

const requestLogger = expressPino({
  level: 'info',
  enabled: true,
  stream: pretty({
    colorize: true
  })
});

module.exports = {
  requestLogger,
}