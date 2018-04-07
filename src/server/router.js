const Router = require('koa-router');

const passport = require('./passport');
const calendar = require('./calendar');

const anonymous = new Router();
const authenticated = new Router();

// region Anonymous Routes

anonymous.get('/healthz', (ctx) => { ctx.status = 200; });

/** @see http://www.passportjs.org/docs/google/#routes */
anonymous.get('/login', passport.authenticate('google', {
  scope: 'email'
}));

anonymous.get('/login/callback', ctx => passport.authenticate('google', {
  successRedirect: ctx.session.redirect || '/',
  failureRedirect: '/logout'
})(ctx));

anonymous.get('/logout', (ctx) => {
  ctx.logout();
  ctx.redirect('/');
});

// endregion

// region Authenticated Routes

authenticated.get('/api/room/:id/:date?', async (ctx) => {
  const { id, date } = ctx.params;
  ctx.body = await calendar.events(id, date);
});

authenticated.get('/api/*', (ctx) => { ctx.status = 404; });

// endregion

module.exports = { anonymous, authenticated };
