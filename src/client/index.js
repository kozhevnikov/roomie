import Vue from 'vue';
import { MdCard } from 'vue-material/dist/components';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default.css';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(MdCard);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App),
  router
});
