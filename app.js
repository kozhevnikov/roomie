const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');
const session = require('koa-session');

const { config, logger, router, passport } = require('./src/server');

function log(ctx) {
  const level = ctx.isAuthenticated() ? 'info' : 'debug';
  const email = ctx.isAuthenticated() ? ctx.state.user.email : 'anonymous';
  logger.log(level, `${ctx.method} ${ctx.url} ${email} ${ctx.ip} ${ctx.headers['user-agent']}`);
}

const app = new Koa();

app.keys = [config.get('session.key')];
app.proxy = true;

app.use(session({ maxAge: config.get('session.age') }, app));

app.use(passport.initialize()).use(passport.session());

app.use(async (ctx, next) => {
  try {
    log(ctx);
    await next();
  } catch (error) {
    logger.error('%O', error);
    ctx.status = error.code || 500;
    ctx.body = error.toString();
  }
});

app.use(router.anonymous.routes());

app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.session.redirect = ctx.url;
    ctx.redirect('/login');
  }
});

app.use(router.authenticated.routes());

app.use(serve('dist')).use(ctx => send(ctx, 'dist/index.html'));

app.listen(config.get('port'));

logger.info('Listening...');
