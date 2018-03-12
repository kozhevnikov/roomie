const winston = require('winston');

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.splat(),
        winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
      ),
      stderrLevels: []
    })
  ]
});

module.exports = logger;
