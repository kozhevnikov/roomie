import Vue from 'vue';
import VueRouter from 'vue-router';

import London from './views/London.vue';
import Paris from './views/Paris.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/london' },
    { path: '/london/:date?', name: 'London', component: London },
    { path: '/paris/:date?', name: 'Paris', component: Paris },
    { path: '*', redirect: '/' }
  ]
});

router.afterEach((to) => {
  document.title = to.name;
});

export default router;
