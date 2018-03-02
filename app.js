const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');

const { logger, router } = require('./src/server');

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  }
  catch (error) {
    logger.error(error);
    ctx.status = error.code || 500;
    ctx.body = error.toString();
  }
});

app.use(router.routes())
  .use(serve('dist'))
  .use(async ctx => await send(ctx, 'dist/index.html'));

app.listen(3000);

logger.info('Listening...');
