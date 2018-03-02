const winston = require('winston');

const logger = new winston.Logger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      timestamp: true,
      colorize: true,
      prettyPrint: true,
      stderrLevels: []
    })
  ]
});

module.exports = logger;
