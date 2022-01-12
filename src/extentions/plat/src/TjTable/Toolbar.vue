<script lang="ts">
import { Button, Checkbox, CheckboxGroup, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
import { Component, Vue, Prop } from 'vue-property-decorator';
// import { VNodeData } from 'Vue';

const defaultDropdownTitle = '操作';

@Component({
  name: 'TjTableToolbar',
  components: {}
})
export default class App extends Vue {
  selectedColumnProps = [];
  columnsConfigSKey = '';

  @Prop({ type: String }) title;
  @Prop({
    type: Object,
    default() {
      return {};
    }
  })
  tools;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  columns;

  created() {
    const { columnsConfig } = this.tools;

    if (columnsConfig !== false) {
      let skey = columnsConfig && columnsConfig.skey ? columnsConfig.skey : '';
      if (skey) {
        this.columnsConfigSKey = this.$route.path + '_' + skey;
      }
    }

    let cachedSelectedColumnProps = [];
    if (this.columnsConfigSKey) {
      const key = this.columnsConfigSKey;
      const str = sessionStorage.getItem(key);
      cachedSelectedColumnProps = str ? JSON.parse(str) : [];
    }
    this.selectedColumnProps =
      cachedSelectedColumnProps instanceof Array && cachedSelectedColumnProps.length
        ? cachedSelectedColumnProps
        : this.columns.map((column) => column.prop);

    const selectedProps = this.selectedColumnProps;
    const unselectedProps = this.columns.filter((col) => !selectedProps.includes(col.prop)).map((col) => col.prop);
    this.$emit('table-header-change', selectedProps, unselectedProps);
  }
  mounted() {}
  beforeDestroy() {
    if (this.columnsConfigSKey) {
      sessionStorage.setItem(this.columnsConfigSKey, JSON.stringify(this.selectedColumnProps));
    }
  }
  renderContent() {
    const h = this.$createElement;
    return h(
      'div',
      { class: 'tj-tableToolbar__content' },
      this.$slots.default || [h('div', { class: 'tj-tableToolbar__title' }, this.title)]
    );
  }
  renderTools() {
    const h = this.$createElement;
    const { refresh, columnsConfig, dropdownMenu, menus, menusTiledNumber } = this.tools;

    const menus$1 = menus || [];
    const menusTiledNumber$1 = typeof menusTiledNumber === 'number' ? menusTiledNumber : 2;
    const menusTiled$1 = menusTiledNumber$1 === 0 ? [] : menus$1.slice(0, menusTiledNumber$1);
    const dropdownMenus$1 = menus$1.slice(menusTiledNumber$1);
    const hasDropdownMenus = !!dropdownMenus$1.length;
    const Menus = menusTiled$1.map((menu, i) => {
      return h(
        Button,
        {
          props: {
            icon: menu.icon,
            type: menu.type || 'default',
            disabled: menu.disabled
          },
          class: ['tools-button'],
          on: {
            click: (e) => {
              if (typeof menu.clickHandler === 'function') {
                menu.clickHandler(e, menu, i);
              }
              this.$emit('clickMenu', menu, i);
            }
          }
        },
        menu.label
      );
    });
    const DropdownMenu = !hasDropdownMenus ? null : this.renderDropdownMenu(dropdownMenus$1, menusTiledNumber$1);

    const Refresh =
      refresh === false
        ? null
        : h(Button, { props: { type: 'default' }, class: ['tools-button'] }, [
            h('i', {
              class: 'el-icon-refresh',
              on: {
                click: () => {
                  this.$emit('refresh');
                }
              }
            })
          ]);
    const TableHeaderFilter = columnsConfig === false ? null : this.renderTableColumnsFilter();

    const Tools = [Menus, DropdownMenu, Refresh, TableHeaderFilter];
    return h('div', { class: 'tj-tableToolbar__tools clearfix' }, Tools);
  }
  // table header filter
  renderTableColumnsFilter() {
    const h = this.$createElement;
    const columns = this.columns;
    const { columnsConfig } = this.tools;
    const dropdownMenuData = {
      class: 'tj-tableToolbar__toolsDropdonMenu tools-button tools-button__columnConfig',
      props: { trigger: 'click' }
    };
    const Title = h(Button, { props: { type: 'default' } }, [h('i', { class: 'el-icon-setting' })]);
    const CheckboxList = h(
      CheckboxGroup,
      {
        props: {
          value: this.selectedColumnProps
        },
        on: {
          input: (selected) => {
            this.selectedColumnProps = selected;
            const selectedProps = selected;
            const unselectedProps = this.columns
              .filter((col) => !selectedProps.includes(col.prop))
              .map((col) => col.prop);
            this.$emit('table-header-change', selectedProps, unselectedProps);
          }
        }
      },
      [
        this.columns.map((col) => {
          return h('div', { style: 'padding: 0 10px' }, [
            h(
              Checkbox,
              {
                props: {
                  label: col.prop
                }
              },
              col.label
            )
          ]);
        })
      ]
    );
    const EmptyPlaceholder = h('div', { style: 'padding: 0 10px; color: #999;' }, '无可配置项');

    const DropdownBox = h(DropdownMenu, { slot: 'dropdown' }, [this.columns.length ? CheckboxList : EmptyPlaceholder]);

    if (columnsConfig && columnsConfig.props) {
      Object.assign(dropdownMenuData.props, columnsConfig.props);
    }

    return h(Dropdown, dropdownMenuData, [Title, DropdownBox]);
  }
  renderDropdownMenu(dropdownMenus, menusTiledNumber) {
    const h = this.$createElement;
    const { title, props } = this.tools.dropdownMenu || {};
    const dropdownMenuData = {
      class: 'tj-tableToolbar__toolsDropdonMenu tools-button tools-button__operate',
      props: { trigger: 'click' }
    };
    const Title = h(Button, { props: { type: 'default' } }, [
      title || defaultDropdownTitle,
      h('i', { class: 'el-icon-caret-bottom' })
    ]);
    const Menus = h(
      DropdownMenu,
      { slot: 'dropdown', class: 'tj-tableToolbarToolsDrop' },
      (dropdownMenus || []).map((menu, i) => {
        return h(
          DropdownItem,
          {
            props: {
              disabled: menu.disabled,
              icon: menu.icon
            },
            class: [
              {
                'is-disabled': menu.disabled
              },
              menu.type ? `is-${menu.type}` : '',
              menu.class || ''
            ],
            key: i,
            nativeOn: {
              click: (e) => {
                if (typeof menu.clickHandler === 'function') {
                  menu.clickHandler(e, menu, i + menusTiledNumber);
                }
                this.$emit('clickMenu', menu, i + menusTiledNumber);
              }
            }
          },
          menu.label
        );
      })
    );

    Object.assign(dropdownMenuData.props, props);

    return h(Dropdown, dropdownMenuData, [Title, Menus]);
  }
  renderSuffix() {
    const h = this.$createElement;
    let Suffix = null;
    if (this.$scopedSlots.suffix) {
      Suffix = h('div', { class: 'tj-tableToolbar__suffix' }, [this.$scopedSlots.suffix(null)]);
    }

    return Suffix;
  }
  render(h) {
    const Content = this.renderContent();
    const Tools = this.renderTools();
    const Suffix = this.renderSuffix();
    return h('div', { class: 'tj-tableToolbar border-bottom' }, [Content, Tools, Suffix]);
  }
}
</script>

<style lang="scss">
@include b(tableToolbar, tj) {
  $md: $--padding-md;
  $sm: $--padding-sm;
  $lh: 32px;
  display: flex;
  max-width: 100%;
  min-height: 42px;
  padding: 10px $md;
  overflow: hidden;
  @include e(content) {
    flex: 1;
    overflow: hidden;
  }
  @include e(title) {
    font-size: 16px;
    line-height: $lh;
    color: #333;
  }
  @include e(tools) {
    margin-left: $md;

    .tools-button {
      float: left;
      height: 32px;
      min-width: 69px;
      padding-top: 0;
      padding-bottom: 0;
      line-height: 30px;
      border: 1px solid #dcdfe6;
      border-radius: 0;
      vertical-align: middle;
      &:first-child {
        border-radius: 2px 0 0 2px;
      }
      &:last-child {
        border-radius: 0 2px 2px 0;
      }

      & > .el-button {
        min-width: 69px;
        border: none;
        padding-top: 0;
        padding-bottom: 0;
        line-height: 30px;
        display: block;
      }
      .el-icon-refresh,
      .el-icon-setting {
        font-size: 20px;
        vertical-align: middle;
        cursor: pointer;
      }
    }
    .tools-button + .tools-button {
      border-left: none;
    }
    .el-button + .el-button {
      margin-left: 0;
    }
  }

  @include e(suffix) {
    margin-left: $md;
    line-height: $lh;
    vertical-align: middle;
  }
}
@include b(tableToolbarToolsDrop, tj) {
  .el-dropdown-menu__item {
    &.is-danger {
      color: $--color-danger;
      &.is-disabled {
        color: #f9a7a7;
      }
      &:focus,
      &:not(.is-disabled):hover {
        color: #f9a7a7;
        background: #fef0f0;
      }
    }

    &.is-disabled {
      cursor: not-allowed;
    }
  }
}
</style>