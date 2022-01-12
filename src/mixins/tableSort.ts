import { Component, Vue } from 'vue-property-decorator';
import Sortable from 'sortablejs';

@Component
export default class tableEventMixin extends Vue {
  sortAble: boolean = false;
  sortTable: any = {};

  // 排序功能 
  dragSort() {
    const _this = this as any;
    _this.sortTable = new Sortable(this.$el.querySelector('.el-table__body-wrapper tbody'), {
      sort: false,
      animation: 300,
      onEnd: (evt) => {
        // 拖拽结束发生该事件
        _this.dataSource.splice(evt.newIndex, 0, _this.dataSource.splice(evt.oldIndex, 1)[0]);
        var newArray = _this.dataSource.slice(0);
        _this.dataSource = [];
        this.$nextTick(function () {
          _this.dataSource = newArray;
        });
      }
    });
  }


  onChangeSort(fn: Function, params) {
    this.sortTable.options.sort = !this.sortTable.options.sort;
    this.sortAble = this.sortTable.options.sort;
    if (this.sortAble) {
      this.$message('你现在可以拖动修改排序了');
    } else {
      this.onConfirmSort(fn, params);
    }
  }
  onConfirmSort(fn, params) {
    const _this = this as any;
    const sort = _this.dataSource.map((item, i) => {
      // item.dictCode 类型排序
      return {
        [params.id]: params.id == 'dictCode' ? item.dictCode : item.id,
        [params.sort]: i
      };
    });
    fn(sort).then(() => {
      this.$message({ type: 'success', message: '排序成功' });
    });
  }

  mounted() {
    this.$nextTick(() => {
      this.dragSort();
    });
  }
}
