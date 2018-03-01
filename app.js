const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

router.get('/healthz', ctx => { ctx.status = 200; });

app.use(router.routes());

app.use(serve('public'));

app.listen(3000);
