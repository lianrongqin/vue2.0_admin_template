import store, { mutationType, store2 } from '@/store';
import { STORAGE_USER_INFO, APP_AUTHORIZATION_PREFIX } from '@/config';
import { apiUser } from '@/api';
import md5 from 'js-md5';
import { Message } from 'element-ui';
import { removeUserTokenInfo } from '@/utils';
import permission from './permission';

/**
 * 登陆
 */
function login(params, cb?) {
  const param = {
    grant_type: 'client_account',
    scope: 'all',
    account: params.username,
    password: params.password
  };
  const options = {
    Authorization: ''
  };
  return apiUser.login(param, options).then(async (res) => {
    appSetToken(res.data.access_token);
    if (typeof cb === 'function') {
      cb();
    }
    return res;
  });
}


/**
 * @description 存储token
 * @param {String} token
 */
function appSetToken(token: string) {
  store.dispatch('app/appUpdateToken', token);
}

/**
 * 退出
 */
function logout() {
  // return apiUser.logout().then(() => {
  //   removeUserTokenInfo();
  // });
}
// /**
//  * 登陆成功
//  */
// function afterLoginHandler() {
//   store.dispatch('app/appUpdateUserInfo');
// }
/**

/**
 * 更新用户信息
 */
function updateUserInfo(userInfo) {
  store.dispatch('app/appUpdateUserInfo', userInfo || {});
}
/**
 * 设置用户信息
 */
function setUserInfo(userInfo) {
  store.commit(`app/${mutationType.app.updateUserInfo}`, userInfo);
}



export default {
  login,
  logout,
  setUserInfo,
  removeUserTokenInfo
};