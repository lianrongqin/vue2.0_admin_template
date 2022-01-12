import { Component, Vue } from 'vue-property-decorator';
import { menus } from '@/config';
const DEL_TIPS = '确定删除%吗?';
const DEL_TIPS2 = '确定删除所选内容?';
@Component
export default class tableEventMixin extends Vue {
  breadcrumbs: any[] = menus[this.path];
  formShow: boolean = false;
  getListFn: Function = null;
  breadcrumb: any[] = [];
  ids: any[] = [];
  editId: string = '';
  options: any = {};
  dataSource: any[] = [];
  searchValues: any = {};
  pagination: any = {
    sizeOfPage: 20,
    currentPage: 1,
    total: 0
  };
  tableProps = {
    border: false
  };
  paginationEvents = {
    'size-change': this.onSizeChange,
    'current-change': this.onCurrentChange
  };
  tableEvents: any = {
    'selection-change': this.onSelectionChange
  };

  get path() {
    return this.$route.path;
  }
  onSelectionChange(items) {
    this.ids = items.map((item) => item.id);
  }
  onCurrentChange(v) {
    this.pagination.currentPage = v;
    this.getList(this.getListFn, this.searchValues, this.options);
  }
  onSizeChange(v) {
    this.pagination.sizeOfPage = v;
    this.getList(this.getListFn, this.searchValues, this.options);
  }
  onAfterSubmit() {
    this.getList(this.getListFn, this.searchValues, this.options);
  }
  onClickEdit(row) {
    this.formShow = true;
    this.editId = row.id || row.dictCode;
  }
  onClickAdd() {
    this.formShow = true;
    this.editId = '';
  }
  onClickDel(fn: Function = null, parmas, type = '1') {
    // type = '1',单个删除，2：多个删除;
    this.$confirm(type == '1' ? DEL_TIPS.replace('%', parmas.title) : DEL_TIPS2, {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      const param = type == '1' ? parmas.id : parmas;
      fn(param).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getList(this.getListFn, this.searchValues, this.options);
      });
    });
  }
  getList(fn: Function = null, searchVal = {}, options = {}) {
    this.getListFn = fn;
    this.options = options;
    const { currentPage, sizeOfPage } = this.pagination;
    const params = {
      sizeOfPage: sizeOfPage,
      currentPage: currentPage - 1,
      ...searchVal,
      ...options
    };
    this.getListFn(params).then((res) => {
      this.dataSource = res.data.rows || [];
      this.pagination.total = parseInt(res.data.total) || 0;
    });
  }
  onSearch() {
    this.pagination.currentPage = 1;
    this.searchValues = (this.$refs.checkForm as any).values;
    this.getList(this.getListFn, this.searchValues, this.options);
  }
}



