const Koa = require('koa');
const send = require('koa-send');
const serve = require('koa-static');
const session = require('koa-session');

const { config, logger, router, passport } = require('./src/server');

function level(ctx) {
  const urls = [
    /^\/api\/room\//,
    /^\/(bundle\.js|styles\.css|favicon\.ico)$/
  ];

  if (urls.some(url => url.test(ctx.url))) return 'silly';

  if (!ctx.isAuthenticated()) return 'debug';

  return 'info';
}

const app = new Koa();

app.keys = [config.get('session.key')];
app.proxy = true;

app.use(session({ maxAge: config.get('session.age') }, app));

app.use(passport.initialize()).use(passport.session());

app.use(async (ctx, next) => {
  try {
    logger.log(level(ctx), `${ctx.method} ${ctx.url} ${ctx.state.user ? ctx.state.user.email : 'anonymous'} ${ctx.ip} ${ctx.headers['user-agent']}`);
    await next();
  } catch (error) {
    logger.error('%O', error);
    ctx.status = error.code || 500;
    ctx.body = error.toString();
  }
});

app.use(router.anonymous.routes());

if (config.get('authentication.enable')) {
  app.use(async (ctx, next) => {
    if (ctx.isAuthenticated()) {
      await next();
    } else {
      ctx.session.redirect = ctx.url;
      ctx.redirect('/login');
    }
  });
}

app.use(router.authenticated.routes());

app.use(serve('dist')).use(ctx => send(ctx, 'dist/index.html'));

app.listen(config.get('port'));

logger.info('Listening...');
