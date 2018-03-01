const Koa = require('koa');
const serve = require('koa-static');

const router = require('./src/server/router');

const app = new Koa()
  .use(router.routes())
  .use(serve('dist'));

app.listen(3000);
