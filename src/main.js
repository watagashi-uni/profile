import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$assets = function () {
  // TODO: cache assets to kirafan.cn
  return 'https://sekai-res.dnaroma.eu/file/sekai-assets';
};

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
