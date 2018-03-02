const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');
const session = require('koa-session');

const { logger, router, passport } = require('./src/server');
const config = require('./config/config');

const app = new Koa();

app.keys = [config.session];
app.proxy = true;

app.use(session({ maxAge: 7 * 24 * 60 * 60 * 1000 }, app));
app.use(passport.initialize()).use(passport.session());

app.use(async (ctx, next) => {
  try {
    logger.log(
      ctx.isAuthenticated() ? 'info' : 'debug',
      ctx.method,
      ctx.path,
      ctx.isAuthenticated() ? ctx.state.user.email : 'anonymous',
      ctx.request.ip,
      ctx.headers['user-agent']
    );
    await next();
  }
  catch (error) {
    logger.error(error);
    ctx.status = error.code || 500;
    ctx.body = error.toString();
  }
});

app.use(router.anonymous.routes());

app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) await next();
  else ctx.redirect('/login');
});

app.use(router.authenticated.routes());

app.use(serve('dist')).use(async ctx => await send(ctx, 'dist/index.html'));

app.listen(3000);

logger.info('Listening...');
