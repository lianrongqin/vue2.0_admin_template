import Vue from 'vue';
import VueRouter from 'vue-router';
import permission from './src/permission';
import routes from './src/routes';
import path from './src/routesPath';
import config from '../../config.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: config.AppPathPrefix ? config.AppPathPrefix : '',
  routes
});
// 路由权限处理
permission(router);

export { routes, permission, path };
export default router;
