/**
* @desc: 导出弹框调用函数
* @return: 
*/

import ApcExportDlg from './main.vue';
import Vue from 'vue';

var exportDlg: any;
function openExportDlg(cb?) {
  if (exportDlg) {
    exportDlg.$el.remove();
  }
  exportDlg = new (Vue.extend(ApcExportDlg))({
    name: 'ApcExportDlg',
    el: document.createElement('div'),
    created() {
      this.$on('confirm', (v) => { cb(v, this.close); });
    }
  });
  document.body.append(exportDlg.$el);
  exportDlg.open();
}

export {
  openExportDlg
};
