import { getInstaller } from '@/utils';
import clickoutside from './src/clickoutside';
export * from './src/directives';

export {
  clickoutside
};

// 全局注册
const directives = { };

export default getInstaller('directive', directives);