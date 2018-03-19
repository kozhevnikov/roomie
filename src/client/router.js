import Vue from 'vue';
import VueRouter from 'vue-router';

import London from './views/London.vue';
import Paris from './views/Paris.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/london' },
    { name: 'London', path: '/london', component: London },
    { name: 'Paris', path: '/paris', component: Paris },
    { path: '*', redirect: '/' },
  ]
});
