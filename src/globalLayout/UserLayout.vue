<template>
  <div class="contain-wrapper tj-userLayout">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'UserLayout',
  components: {}
})
export default class App extends Vue {
  created() {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
@include b(userLayout) {
  background-color: #fcfcfc;
}
</style>