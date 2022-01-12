import { store2 } from '@/store';
import { relaunchApp, alertToast } from '@/utils';
import { STORAGE_TOKEN, STORAGE_USER_INFO } from '@/config';
import path, { pathLoginForbidden, pathUnloginForbidden } from './routesPath';

export default function (router) {
  // router.beforeEach((to, from, next) => {
  //   const token = store2.get(STORAGE_TOKEN) || '';
  //   const userInfo = store2.get(STORAGE_USER_INFO) || '';
  //   if (token && userInfo && pathLoginForbidden.includes(to.path)) {
  //     alertToast('已登录，请先退出');
  //     if (from) {
  //       router.replace(from.path);
  //     } else {
  //       relaunchApp();
  //     }
  //   } else if ((!token || !userInfo) && pathUnloginForbidden.includes(to.path)) {
  //     alertToast('还未登录，请先登录');
  //     router.replace(path.PATH_LOGIN);
  //   } else {
  //     next();
  //   }
  // });
}