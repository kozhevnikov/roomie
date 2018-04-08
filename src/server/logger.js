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
      stderrLevels: [],
      handleExceptions: true
    })
  ],
  exitOnError: false
});

const urls = [
  /^\/healthz$/,
  /^\/login$/,
  /^\/login\/callback\?/,
  /^\/api\/room\//,
  /^\/(bundle\.js|styles\.css|favicon\.ico)$/
];

logger.getLevel = (context) => {
  if (urls.some(url => url.test(context.url))) return 'silly';
  if (!context.isAuthenticated()) return 'debug';
  return 'info';
};

module.exports = logger;
