const Router = require('koa-router');

const router = new Router();

/** @see https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/#define-a-liveness-http-request */
router.get('/healthz', ctx => { ctx.status = 200; });

module.exports = router;
