const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');

const router = require('./src/server/router');

const app = new Koa()
  .use(router.routes())
  .use(serve('dist'))
  .use(async ctx => await send(ctx, 'dist/index.html'));

app.listen(3000);
