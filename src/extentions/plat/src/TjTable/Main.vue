<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import { Table, TableColumn } from 'element-ui';
import TjPagination from '../TjPagination/Main.vue';
import Toolbar from './Toolbar.vue';
import platConfig from '../utils/platConfig';

// table 默认属性
const defaultTableProps = {
  border: false
};

// column 默认属性
const defaultColumnProps = {
  align: 'center',
  resizable: false,
  showOverflowTooltip: true
};

// 适配最大高度相关数据
function getTableFixHeightData() {
  // table 适配最大高度时需要减去的常量
  const { tableFitHeightMargin, tableFitHeightMinHeight } = platConfig;
  const tableFitHeightMargin$1 = typeof tableFitHeightMargin === 'number' ? tableFitHeightMargin : 0;
  const tableFitHeightMinHeight$1 = typeof tableFitHeightMinHeight === 'number' ? tableFitHeightMinHeight : 280;
  return {
    tableFitHeightMargin: tableFitHeightMargin$1,
    tableFitHeightMinHeight: tableFitHeightMinHeight$1
  };
}

@Component({
  name: 'TjTable',
  components: {}
})
export default class App extends Vue {
  // columns$1 = [];
  unselectedColumnsProps = [];
  maxHeight = 0;
  isFitHeight = true;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  dataSource;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  columns;

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  tableProps;

  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  tableEvents;

  @Prop({ type: [Function] }) slotPrefixRender; // slot prefix
  @Prop({ type: [Function] }) slotBeforeToolsRender; // slot beforeTools
  @Prop({ type: [Function] }) slotBeforeTableRender; // slot beforeTable
  @Prop({ type: [Function] }) slotBeforePaginationRender; // slot beforePagination
  @Prop({ type: [Function] }) slotSuffixRender; // slot suffix

  @Prop({ type: [Function] }) tableAppendRender; // table slot append

  @Prop({ type: Boolean, default: true }) columnsConfigurable;

  @Prop({ type: [Boolean, Object] }) tools;

  @Prop({ type: [String] }) toolsTitle;
  @Prop({ type: [Function] }) toolsTitleRender;
  @Prop({ type: [Function] }) toolsRender;
  @Prop({ type: [Function] }) toolsPrefixRender;
  @Prop({ type: [Function] }) toolsSuffixRender;

  @Prop({ type: [Boolean, Object] }) pagination;
  @Prop({ type: Object }) paginationEvents;
  @Prop({ type: [Boolean, Function], default: true }) fitHeight;

  get columns$1() {
    if (!this.columnsConfigurable) {
      return this.columns;
    }
    return this.columns.filter((col) => {
      return !this.unselectedColumnsProps.includes(col.prop);
    });
  }
  // toolbar columns props
  get configurableColumns$1() {
    if (!this.columnsConfigurable) {
      return [];
    }
    return this.columns.filter((col) => col.configurable && col.prop);
  }

  @Ref('table') refTable;
  @Ref('pagination') refPagination;

  // table header change
  onTableHeaderChange(selectedProps, unselectedProps) {
    this.unselectedColumnsProps = unselectedProps;
  }

  updateHeight: () => void;

  calcMaxHeight() {
    const { fitHeight } = this;
    const { tableFitHeightMargin, tableFitHeightMinHeight } = getTableFixHeightData();

    let height = window.innerHeight - tableFitHeightMargin;
    if (typeof fitHeight === 'function') {
      const height$ = fitHeight(height);
      if (typeof height$ === 'number') {
        height = height$;
      }
    }
    if (height < tableFitHeightMinHeight) {
      height = tableFitHeightMinHeight;
    }

    return height;
  }
  created() {
    this.isFitHeight = this.fitHeight !== false;

    let updateHeightTimer = null;
    this.updateHeight = () => {
      if (updateHeightTimer) {
        return;
      }
      updateHeightTimer = setTimeout(() => {
        this.maxHeight = this.calcMaxHeight();
        updateHeightTimer = null;
      }, 100);
    };
  }
  mounted() {
    if (this.isFitHeight) {
      this.$nextTick(() => {
        window.addEventListener('resize', this.updateHeight);
        this.updateHeight();
      });
    }
  }
  beforeDestroy() {
    if (this.isFitHeight) {
      window.removeEventListener('resize', this.updateHeight);
    }
  }
  renderTools() {
    if (!this.tools) {
      return null;
    }
    const h = this.$createElement;
    const tools = Object.assign({}, this.tools);
    const columns = this.configurableColumns$1;

    const noop = function () {};
    if (this.columnsConfigurable === false) {
      tools.columnsConfig = false;
    }
    const toolbarData = {
      props: {
        title: this.toolsTitle,
        tools: tools,
        columns: columns
      },
      scopedSlots: {},
      on: {
        'table-header-change': this.onTableHeaderChange,
        refresh: () => {
          this.$emit('refresh', this.pagination.currentPage);
        },
        clickMenu: (item, i) => {
          this.$emit('click-menu', item, i);
        }
      }
    };

    let children = null;

    if (typeof this.toolsTitleRender === 'function') {
      children = [this.toolsTitleRender(h)];
    }
    if (typeof this.toolsSuffixRender === 'function') {
      (toolbarData.scopedSlots as any).suffix = () => {
        return this.toolsSuffixRender(h, this);
      };
    }

    return h(Toolbar, toolbarData, [children]);
  }
  renderTable() {
    const h = this.$createElement;
    const columns = this.columns$1;
    const tableData: any = {
      props: Object.assign({}, defaultTableProps, this.tableProps, { data: this.dataSource }),
      scopedSlots: {},
      on: this.tableEvents
    };

    tableData.ref = 'table';

    if (this.isFitHeight) {
      tableData.props.maxHeight = this.maxHeight;
    }

    if (typeof this.tableAppendRender === 'function') {
      tableData.scopedSlots.append = (props) => {
        return this.tableAppendRender(h, props);
      };
    }

    const children = this.renderColumns(columns);

    return h(Table, tableData, children);
  }
  renderColumns(columns) {
    const h = this.$createElement;
    const tableColumns = columns.map((column) => {
      const columnData: any = {
        props: Object.assign({}, defaultColumnProps, column),
        scopedSlots: {}
      };

      if (typeof column.render === 'function' && !column.nest) {
        columnData.scopedSlots.default = (props) => {
          return column.render(h, props) || '-';
        };
      } else if (typeof column.render === 'function' && column.nest) {
        // nest = true 并定义了render函数，视为多级表头，既多级表头只能通过render渲染
        return column.render(h);
      }

      // nest = true 并定义了render函数，视为多级表头，多级表头不执行以下代码
      if (typeof column.header === 'function') {
        columnData.scopedSlots.header = (props) => {
          return column.header(h, props) || column.label || '-';
        };
      }

      return h(TableColumn, columnData);
    });
    return tableColumns;
  }
  renderPagination() {
    if (!this.pagination) {
      return null;
    }
    const h = this.$createElement;
    const paginationData = {
      props: {
        pagination: Object.assign({}, this.pagination, { pageSize: this.pagination.sizeOfPage })
      },
      on: Object.assign({}, this.paginationEvents)
    };

    return h('div', { class: 'tj-tablePagination ptb-md' }, [h(TjPagination, paginationData)]);
  }
  render(h) {
    const Tools = this.renderTools();
    const Table = this.renderTable();
    const Pagination = this.renderPagination();

    let SlotPrefix = null;
    let SlotBeforeTools = null;
    let SlotBeforeTable = null;
    let SlotBeforePagination = null;
    let SlotSuffix = null;
    if (typeof this.slotPrefixRender === 'function') {
      SlotPrefix = this.slotPrefixRender(h);
    }
    if (typeof this.slotBeforeToolsRender === 'function') {
      SlotBeforeTools = this.slotBeforeToolsRender(h);
    }

    if (typeof this.slotBeforeTableRender === 'function') {
      SlotBeforeTable = this.slotBeforeTableRender(h);
    }
    if (typeof this.slotBeforePaginationRender === 'function') {
      SlotBeforePagination = this.slotBeforePaginationRender(h);
    }

    if (typeof this.slotSuffixRender === 'function') {
      SlotSuffix = this.slotSuffixRender(h);
    }
    return h(
      'div',
      {
        class: 'tj-table'
      },
      [SlotPrefix, SlotBeforeTools, Tools, SlotBeforeTable, Table, SlotBeforePagination, Pagination, SlotSuffix]
    );
  }
}
</script>
<style lang="scss">
@include b(table, tj) {
  padding: 0 0 $--padding-md 0;
  margin: 15px;
  background-color: #fff;
  th {
    color: $--color-theme;
    background: $--color-theme;
  }
  .el-table th {
    background-color: #f6f6f7;
  }
  .pointer + .pointer {
    margin-left: 6px;
  }

  .cell.el-tooltip {
    width: 100% !important;
  }
}
@include b(tablePagination, tj) {
  @include utils-clearfix;
  text-align: right;
  .el-pagination {
    float: right;
    .number,
    .btn-prev,
    .btn-next {
      margin-left: 6px;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      &.active {
        border: 1px solid $--color-primary;
        color: $--color-primary;
      }
    }

    .btn-prev,
    .btn-next {
      padding-left: 12px;
      padding-right: 12px;
      &:hover {
        border: 1px solid $--color-primary;
        color: $--color-primary;
      }
    }
    .el-input__inner {
      border-radius: 2px;
    }
  }
  .el-pagination__sizes {
    margin-right: 0;
  }
  .el-pagination__jump {
    margin-left: 10px;
  }
}
</style>