import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  router
});
