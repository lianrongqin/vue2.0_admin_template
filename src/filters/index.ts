import { getInstaller } from '@/utils';
export * from './src/filterDictionary';
import filters from './src/filters';
export * from './src/filters';

// 全局注册
const globalFilters = {
  ...filters
};

export default getInstaller('filter', globalFilters);