<template>
  <div class="tj-headerleft">
    <div
      :class="!isMenu?'':'is-close'"
      class="topMenuBox"
    >
      <img
        @click="toggleMenu"
        alt
        class="topMenu"
        src="@/assets/image/globalLayout/icon_menu.png"
      />
    </div>
    <a :href="rootLink">
      <img
        alt
        class="topLogo"
        src="@/assets/image/logo.png"
      />
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { APP_PATH_PREFIX } from '@/config';
@Component({
  name: 'HeaderLeft',
  components: {}
})
export default class App extends Vue {
  isMenu = false;
  rootLink = `/${APP_PATH_PREFIX}/`;
  created() {}
  mounted() {}
  toggleMenu() {
    this.isMenu = !this.isMenu;
    this.$emit('PtoggleMenu', this.isMenu);
  }
}
</script>

<style lang="scss" scoped>
@include b(headerleft) {
  .topMenuBox {
    display: inline-block;
    width: 64px;
    height: 100%;
    text-align: center;
    background-color: transparent;
  }
  .topMenu {
    width: 24px;
    height: 24px;
    vertical-align: middle;
    cursor: pointer;
  }
  .topLogo {
    height: 34px;
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>