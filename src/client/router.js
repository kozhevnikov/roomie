import Vue from 'vue';
import Router from 'vue-router';

import London from './views/London.vue';
import Paris from './views/Paris.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/london' },
    { path: '/london', component: London },
    { path: '/paris', component: Paris },
    { path: '*', redirect: '/' }
  ]
});
