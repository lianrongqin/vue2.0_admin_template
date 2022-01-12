import * as options from './options';
/*
 * @Author: lrq
 * Date: 2021-01-28
 * @Last Modified by: lrq
 
*/

/**
 *
 * @description 工具函数
 * @param options
 */
import { } from './options';
export function getMapFromOptions(options: any) {
  return options.reduce((a: any, b: any) => {
    a[b.value] = b.label;
    return a;
  }, {});
}



export {

};