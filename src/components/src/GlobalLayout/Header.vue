<template>
  <div class="tj-header tj-flex is-align-middle">
    <header-left @PtoggleMenu="toggleMenu"></header-left>
    <div class="tj-flex__1"></div>
    <header-user-info></header-user-info>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderLeft from './HeaderLeft.vue';
import HeaderUserInfo from './HeaderUserInfo.vue';
@Component({
  name: 'Header',
  components: { HeaderLeft, HeaderUserInfo }
})
export default class App extends Vue {
  created() {}
  mounted() {}
  toggleMenu(res) {
    this.$emit('StoggleMenu', res);
  }
}
</script>

<style lang="scss" scoped>
@include b(header) {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  z-index: 100;
  background-color: #071930;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.11);
}
</style>