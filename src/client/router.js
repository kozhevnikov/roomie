import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import London from './views/London.vue';
import Paris from './views/Paris.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/london', component: London },
    { path: '/paris', component: Paris },
    { path: '*', redirect: '/' }
  ]
});
