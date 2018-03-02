const passport = require('koa-passport');
const { OAuth2Strategy } = require('passport-google-oauth');

const logger = require('./logger');
const secret = require('../../config/client_secret');

const options = {
  clientID: secret.web.client_id,
  clientSecret: secret.web.client_secret,
  callbackURL: '/login/callback'
};

const strategy = new OAuth2Strategy(options, (accessToken, refreshToken, profile, done) => {
  const email = profile.emails.find(email => email.type === 'account').value;
  logger.info('Login', email);
  done(null, { email });
});

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  done(null, { email });
});

module.exports = passport;
