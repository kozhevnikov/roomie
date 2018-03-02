import Vue from 'vue';

Vue.config.productionTip = false;

new Vue({
  el: '#roomie',
  data: {
    message: 'Hello, Roomie!'
  },
  render(h) {
    return h('div', this.message);
  }
});
