const convict = require('convict');

const config = convict({
  /**
   * Server port
   * @see https://github.com/koajs/koa/blob/master/docs/api/index.md#applisten
   */
  port: { format: 'port', env: 'PORT', default: 3000 },

  /**
   * Session config
   * @see https://github.com/koajs/session#example
   */
  session: {
    key: { format: String, default: 'some secret hurr' },
    age: { format: Number, default: 1000 * 60 * 60 * 24 * 7 }
  },

  /**
   * Google Sign-In
   * @see https://developers.google.com/identity/
   */
  authentication: {
    enable: { format: Boolean, default: false },
    email: { format: RegExp, default: /@(example\.com|.*)$/ }
  }
});

config.validate();
config.loadFile('client_secret.json');

module.exports = config;
