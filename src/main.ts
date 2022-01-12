/*
 * @Author: lrq
 * Date: 2021-01-28
 * @Last Modified by: lrq
*/

import 'core-js';
import 'regenerator-runtime/runtime';
import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import './appInit';
import App from './App.vue';
import { app } from '@/sdk';

Vue.use(app.permission);


new Vue({
  store,
  router,
  render: h => h(App),
  created() { }
}).$mount('#app');

// 权限
Object.defineProperty(Vue.prototype, '$authorization', {
  get() {
    return store.getters.authorization;
  },
  set() {
    throw new Error('$authorization can not be modified');
  }
});

// Vue.prototype.$authorization = store.getters.authorization;