# TjTable

## 介绍

TjTable 组件为基于 element-ui，用于快速开发统一风格的列表。

## 特性：

- 可选可配置 工具栏 toolbar；
- 必选可配置 列表 table；
- 可选可配置 分页组件 pagination；
- 支持 table 最小高度计算，自适应 windown 可视区高度；
- 支持多插槽定制化；

## props

**toolbar 相关配置**

- toolsTitle： tools 的 title，复杂 UI 可通过 toolsTitleRender 接口定制
- tools：右侧操作按钮配置信息，设为 false 则不显示右侧操作；
  - refresh: boolean，是否显示刷新图标，默认 true；
  - columnsConfig: boolean | object，false 不显示表格栏可配置按钮
    - skey：object 时必须项，用于缓存该页面表格显示栏配置信息，避免缓存信息错误；
    - props：作为 props 传递给 dropdown 组件
  - menusTiledNumber: numebr，设置平铺按钮个数，剩余 menus 操作将合并在 dropdown 下拉菜单显示；可选；默认：2；
  - menus: Array，按钮操作菜单，
    - lebel 必填
    - icon 可选
    - disabled 可选
    - type：见 Button 组件 type，在 dropdown 里的菜单，只支持 default 和 dander；可选；默认：‘default’；
    - clickHandler：点击事件； 可选，没传 clickHandler 可通过监听组件事件 click-menu 捕获；
  - dropdownMenu：‘操作’下拉配置信息
    - title: dropdownMenu title，可选，默认： ‘操作’；
    - props: 作为 props 传递给‘操作’ dropdown 组件

**table 相关配置**

- columns: 包含 elTableColumns 的 props，额外添加:
  - header：渲染 header 的函数
  - render：函数化渲染内容方法
- dataSource: table 数据源
- tableEvents: 监听 elTable 组件的事件对象
- tableProps: 其他的 elTable props

**pagination 相关配置**

- pagination: boolean | object；值为 false 时，不显示分页；
  - 分页的配置信息；见 elPagination
- paginationEvents: 监听分页的事件，一般需要监听 pageSizeChange,currentChange

**插槽**

- toolsPrefixRender: prefix 渲染接口，可定制 toolsTitle 前内容
- toolsSuffixRender: suffix 渲染接口，可在‘设置’之后定制按钮
- toolsTitleRender: tools 的 title 定制接口
- slotPrefixRender: TjTable 前插入定制渲染接口
- slotBeforeToolsRender: tools 前插入定制渲染接口，可通过 slotPrefixRender 实现，此处为了组件完整性
- slotBeforeTableRender: table 前插入定制渲染接口
- slotBeforePaginationRender: pagination 前插入定制渲染接口
- slotSuffixRender: TjTable 后插入定制渲染接口

## events

- refresh 点击刷新事件；设置 tools.refresh = true 时必须选；
- click-menu 点击菜单事件；可选；参数：item, i；
