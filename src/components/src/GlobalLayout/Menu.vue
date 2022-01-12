<template>
  <div :class="showclass" class="tj-menu">
    <el-menu
      :collapse="isMenu"
      :default-active="defaultActive[path]"
      class="el-menu-vertical"
      collapse-transition
      unique-opened
    >
      <template v-for="(item, i) in menus">
        <el-submenu
          :index="i.toString()"
          :key="i"
          v-if="item.childrens && item.childrens.length && item.policy"
        >
          <template slot="title">
            <img :src="item.icon" alt class="tj-menu__icon" v-show="isMenu" />
            <span class="tj-menu__label" v-show="!isMenu">{{ item.name }}</span>
          </template>
          <el-menu-item-group :key="i2" v-for="(item2, i2) in item.childrens">
            <el-menu-item
              :index="item2.id"
              @click.native="onClickMenu(item2.path)"
              v-if="item2.policy"
              >{{ item2.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <template v-else>
          <el-menu-item
            :class="item.path === path ? 'is-active' : ''"
            :index="item.id"
            :key="item.id + Math.random()"
            @click.native="onClickMenu(item.path)"
            v-if="item.policy"
          >
            <img :src="item.icon" alt class="tj-menu__icon" v-show="isMenu" />
            <span class="tj-menu__label" v-show="!isMenu">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import path from "@/router/src/routesPath";
import { menus } from "@/config";
const defaultActive = {
  "/": "1-1",
};
@Component({
  name: "Menu",
  components: {},
})
export default class App extends Vue {
  private defaultActive: any = defaultActive;
  showclass = "is-expand"; // 导航栏显隐性
  @Prop({ type: Boolean, default: true }) isMenu;
  @Watch("isMenu", { deep: true, immediate: true })
  UserCenter(n) {
    if (n) {
      this.showclass = "is-close";
    } else {
      setTimeout(() => {
        this.showclass = "is-expand";
      }, 300);
    }
  }
  @Watch("unReadNum")
  get menus() {
    const _this = this as any;
    return [
      {
        id: "1",
        name: "大菜单一",
        icon: require("@/assets/image/globalLayout/icon_content.png"),
        path: null,
        policy: true,
        childrens: [
          {
            id: "1-1",
            name: "子菜单一",
            icon: null,
            path: "/",
            policy: true,
          },
        ],
      },
    ];
  }
  get path() {
    return this.$route.path;
  }
  onClickMenu(path) {
    if (path !== this.path) {
      this.$router.push({ path: path });
    }
  }
  setDefaultActive() {
    const active = {};
  }
  created() {}
  mounted() {}
}
</script>

<style lang="scss">
$menuActiveBg: #dddddd;
@include b(menu) {
  background-color: #fff;
  .el-menu {
    border-right: none;
    background-color: #fff;
    .el-menu-item.is-active {
      color: #005dd4;
    }
  }
  .el-menu-vertical {
    height: 100%;
    -ms-overflow-style: none;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  // 菜单展开
  @include when(expand) {
    .el-menu-item.is-active {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: #2d3a4b;
      }
    }
  }
  // 菜单缩起
  @include when(close) {
    .el-menu {
      background-color: $--background-color-white;
    }
    background-color: $--background-color-white;
    $gray: $menuActiveBg;

    .el-submenu {
      &.is-active {
        background-color: $gray;
      }
    }
    .el-submenu,
    .el-submenu__title {
      &:hover {
        background-color: $gray;
      }
      &:focus {
        background-color: $gray;
      }
    }

    .el-menu-item {
      &:hover {
        background-color: $gray;
      }
      &:focus {
        background-color: $gray;
      }
      &.is-active {
        background-color: $gray;
      }
    }
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  [class^="el-icon-"] {
    vertical-align: middle;
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
  }

  /deep/ {
    .el-submenu .el-menu-item {
      & > span {
        margin-left: 9px;
      }
    }
  }
  @include e(icon) {
    width: 24px;
    height: 24px;
  }
}
</style>