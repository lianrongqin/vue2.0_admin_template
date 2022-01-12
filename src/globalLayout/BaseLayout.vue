<template>
  <el-container class="app-container contain-wrapper tj-baseLayout">
    <Header @StoggleMenu="StoggleMenu"></Header>
    <el-container class="app-mainWrapper">
      <Menu :isMenu="isMenu"></Menu>
      <el-main class="app-main">
        <div class="main-container">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'BaseLayout',
  components: {}
})
export default class App extends Vue {
  isMenu = false;
  onClickMenu(path) {
    this.$router.push(path);
  }
  StoggleMenu(res) {
    this.isMenu = res;
  }
  created() {}

  mounted() {}
}
</script>

<style lang="scss" scoped>
@include b(container, app) {
}
@include b(header, app) {
  border-bottom: 1px solid #dcdfe6;
  background-color: #409eff;
  // background-color: #b3d8ff;
  .logo {
    line-height: 60px;
    color: #fff;
    font-size: 28px;
  }
  .userMenu {
    span {
      color: #fff;
      margin-right: 8px;
    }
  }
}
@include b(mainWrapper, app) {
  margin-top: 60px;
}
@include b(aside, app) {
  border-right: solid 1px #e6e6e6;
  overflow-x: hidden;
  overflow-y: auto;
  .menus {
    border-right: none;
  }
}
@include b(main, app) {
  background-color: #fafafa;
  -ms-overflow-style: none;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
    width: 0px !important;
  }
  // .main-container {
  //   background-color: #fff;
  // }
}
</style>
<style>
.el-main {
  padding: 0;
}
.el-menu--popup {
  padding: 0;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>