<template>
  <div class="tj-userMenu">
    <div class="userInfo" v-if="isLogin">
      <el-dropdown @command="onCommand">
        <span class="el-dropdown-link">
          <img :alt="userName" class="avatar" src="@/assets/image/head.png" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="3" icon="el-icon-right"
            >退出</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <span @click="onClickToLogin" class="name pointer" v-else>登陆</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { path } from "@/router";
import { relaunchApp } from "@/utils";
import { app } from "@/sdk";

@Component({
  name: "HeaderLeft",
  components: {},
})
export default class App extends Vue {
  @Getter("userInfo") userInfo;
  get userName() {
    return this.userInfo ? this.userInfo.username : "";
  }

  get isLogin() {
    return !!this.userInfo;
  }
  onClickToLogin() {
    relaunchApp(path.PATH_LOGIN);
  }
  onCommand(value) {
    switch (value) {
      case "3":
        this.onClickLogout();
        break;
    }
  }
  onClickJump(path, activeTab?) {
    this.$router.push({
      path: path,
      query: {
        activeTab: activeTab,
      },
    });
  }
  onClickLogout() {
    this.$confirm("确认退出?", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {});
  }
  created() {
    if (!this.userInfo) {
     // relaunchApp(path.PATH_LOGIN);
    }
  }
  mounted() {}
}
</script>

<style lang="scss" scoped>
@include b(userMenu) {
  display: flex;
  align-items: center;
  padding-right: 27px;
  color: #fff;
  font-size: 16px;
  .userInfo {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .logout {
    margin-left: 23px;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}
</style>