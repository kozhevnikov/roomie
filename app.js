const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');

const { logger, router, passport } = require('./src/server');

const app = new Koa();

app.proxy = true;

app.use(async (ctx, next) => {
  try {
    logger.debug(ctx.method, ctx.path, ctx.request.ip, ctx.headers['user-agent']);
    await next();
  }
  catch (error) {
    logger.error(error);
    ctx.status = error.code || 500;
    ctx.body = error.toString();
  }
});

app.use(passport.initialize());

app.use(router.anonymous.routes());

app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) await next();
  else ctx.redirect('/login');
});

app.use(router.authenticated.routes());

app.use(serve('dist')).use(async ctx => await send(ctx, 'dist/index.html'));

app.listen(3000);

logger.info('Listening...');
