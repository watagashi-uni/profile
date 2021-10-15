import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false;

Vue.prototype.$assets = function () {
  // TODO: cache assets to kirafan.cn
  return 'https://assets.pjsek.ai/file/pjsekai-assets/startapp';
};

Vue.prototype.$eventID = function () {
  return 31;
};

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
