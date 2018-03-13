const passport = require('koa-passport');
const { OAuth2Strategy } = require('passport-google-oauth');

const config = require('./config');
const logger = require('./logger');

const web = config.get('web');
const options = {
  clientID: web.client_id,
  clientSecret: web.client_secret,
  callbackURL: '/login/callback'
};

const strategy = new OAuth2Strategy(options, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails.find(email => email.type === 'account').value;
  const test = config.get('authentication.email').test(email);
  logger.log(test ? 'info' : 'error', 'Login %s', email);
  done(null, test ? { email } : false);
});

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  done(null, { email });
});

module.exports = passport;
