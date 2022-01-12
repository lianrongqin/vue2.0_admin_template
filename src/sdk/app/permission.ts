

import store, { mutationType } from '@/store';
import { apiUser } from '@/api';

class permission {
  public static install(Vue, options) {
    /**
    * 判断用户是否拥有授权.
    * @param module 模块, 多模块使用'_'连接.
    * @param action 
    */
    Vue.prototype.hasPower = function (module: String, action?: String) {
      let policys = store.getters.permission || [];
      if (null != policys) {
        let modules: String[] = module.split('_');
        // 遍历所有策略
        for (let i = 0; i < policys.length; i++) {
          let policy = policys[i];
          // 遍历所有策略里的action
          for (let n = 0; n < policy.action.length; n++) {
            let item = policy.action[n];
            // if (module.match(item.module)) {
            if (permission.matchModul(module, modules, item)) {
              if (action && !action.match(item.action)) {
                continue;
              }
              return true;
            }
          }
        }

      }
      return false;
    };
  }

  public static matchModul(module: String, arr: String[], action: any) {
    if (module.match('^' + action.module)) {
      return true;
    }
    let modules: String[] = action.module.split('_');
    if (modules.length < arr.length) {
      // 如果正则未匹配通过,且模块长度小于待测数据,那么一定是不匹配的.
      return false;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != modules[i]) {
        return false;
      }
    }
    return true;
  }

  public static getPermission() {

  }
}


export default permission;