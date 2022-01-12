# ApcDrawer

ApcSearchBar 是基于 element 封装的抽屉组件 </br>
详细文档https://element.eleme.cn/#/zh-CN/component/drawer</br>
包含：</br>

- 头部标题
- 抽屉 body 插槽部分
- 底部 footer

## Props

- title 标题
- visible.sync 显示关闭
- before-close function(done){} 关闭前的回调，会暂停 Drawer 的关闭 非必填
- direction 打开的方向 rtl-右至左/ ltr-左至右 / ttb-上至下 / btt-下至上
- onlyBody 抽屉只显示插槽内容，优先级最高
- with-header 头部显示状态 默认 true
- with-footer 底部显示状态 默认 true
- drawerSize:string 尺寸 默认 small small-600px medium-800px larger-1000
- size:string '100px'/'10%' 优先级比 drawerSize 高
- 使用方法：

```
// eg
    <apc-drawer
      :before-close="onConfirm"
      :title="title"
      :visible.sync="show"
    >
      <div>这是内容</div>
    </apc-drawer>

// before-close 关闭前的回调 默认 -
// 执行了done() 抽屉才能关闭，没有绑定回调时则正常关闭
    onConfirm(done){
      setTimeout(() => {
        done();
      }, 1000);
    }

```
