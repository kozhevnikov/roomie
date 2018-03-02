const Router = require('koa-router');

const passport = require('./passport');

const anonymous = new Router();
const authenticated = new Router();

/** @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-liveness-http-request */
anonymous.get('/healthz', ctx => { ctx.status = 200; });

/** @see http://www.passportjs.org/docs/google/#routes */
anonymous.get('/login', passport.authenticate('google', {
  scope: 'email'
}));

anonymous.get('/login/callback', ctx => passport.authenticate('google', {
  successRedirect: ctx.session.redirect || '/',
  failureRedirect: '/login'
})(ctx));

authenticated.get('/logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

module.exports = { anonymous, authenticated };
