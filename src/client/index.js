import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(VueMaterial); // https://github.com/vuematerial/vue-material/issues/1182

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  router
});
