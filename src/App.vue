<template>
  <div
    class="ins-app"
    id="app"
  >
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'App',
  components: {}
})
export default class App extends Vue {
  created() {}
  mounted() {}
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  min-width: 1200px;
  min-height: 360px;
}
</style>