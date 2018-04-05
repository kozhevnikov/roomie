import Vue from 'vue';
import VueRouter from 'vue-router';

import London from './views/London.vue';
import Paris from './views/Paris.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/london' },
    { path: '/london', name: 'London', component: London },
    { path: '/paris', name: 'Paris', component: Paris },
    { path: '*', redirect: '/' }
  ]
});
