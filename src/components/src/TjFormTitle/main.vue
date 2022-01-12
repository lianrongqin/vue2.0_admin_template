<template>
  <div class="tj-title bsp-flex is-align-middle">
    <div class="tj-title__main ellipsis">
      <slot>
        <span class="tj-title__title">{{title}}</span>
        <span
          class="tj-title__sub-title"
          v-if="subTitle"
        >{{subTitle}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator';
@Component({
  name: 'tjImage',
  components: {}
})
export default class extends Vue {
  @Prop({ default: '' }) title: string;
  @Prop({ default: '' }) subTitle: string;
}
</script>
<style lang='scss'>
@include b(title) {
  padding: $--padding-sm 0;
  @include e(main) {
    flex: 1;
  }
  @include e(title) {
    font-size: $--font-size-lg;
    font-weight: bold;
  }
  @include e(sub-title) {
    color: $--color-text-secondary;
    font-size: $--font-size-sm;
  }
}
</style>
