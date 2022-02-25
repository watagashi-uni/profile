import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

import sekai from './sekai';

Object.defineProperty(Vue.prototype, '$sekai', {
  get: function () {
    return sekai;
  }
});

Object.defineProperty(Vue.prototype, '$db', {
  get: function () {
    return sekai.database;
  }
});

Vue.prototype.$eventID = function () {
  return 31;
};

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');

Date.prototype.format = function (format) {
  format = format.replace(/YYYY/g, this.getFullYear());
  format = format.replace(/MM/g, ('0' + (this.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + this.getDate()).slice(-2));
  format = format.replace(/HH/g, ('0' + this.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + this.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + this.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ('00' + this.getMilliseconds()).slice(-3));

  format = format.replace(/YY/g, ('0' + this.getFullYear()).slice(-2));
  format = format.replace(/M/g, (this.getMonth() + 1));
  format = format.replace(/D/g, (this.getDate()));
  format = format.replace(/H/g, (this.getHours()));
  format = format.replace(/m/g, (this.getMinutes()));
  format = format.replace(/s/g, (this.getSeconds()));
  format = format.replace(/S/g, (this.getMilliseconds()));
  return format;
};

Date.prototype.toLocaleDateString = function () {
  return this.format('YYYY/M/D');
};

Date.prototype.toLocaleString = function () {
  return this.format('YYYY/M/D H:mm:ss');
};