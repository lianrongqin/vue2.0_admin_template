import config from '../../config';

/**
 * app存储key值
 */
export const STORAGE_TOKEN = 'APP_TOKEN';
export const STORAGE_USER_INFO = 'APP_USERINFO';

/**
 * app全站常量
 */

export const APP_TITLE = '后台管理';
export const APP_PATH_PREFIX = config.AppPathPrefix;
export const APP_ENCRYPT_KEY = 'q1w2e3r4t5y6u7i8';
export const APP_TIMEOUT = 20000;
export const APP_API_PREFIX = process.env.VUE_APP_API;
export const APP_IMG_PREFIX = 'http://app.ams.bespinglobal.cn/api/basic/image?path=';
export const APP_AUTHORIZATION_PREFIX = 'Bearer';

