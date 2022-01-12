<template>
  <span
    :class="classes"
    class="tj-status"
  >
    <slot
      name="icon"
      v-if="showIcon"
    >
      <i
        :class="iconClasses"
        class="tj-status__icon"
      ></i>
    </slot>
    <slot>
      <span class="tj-status__label">{{label}}</span>
    </slot>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';

@Component({
  name: 'tjStatus',
  components: {}
})
export default class App extends Vue {
  @Prop({ type: String }) type; // default, primary, success, warning, danger
  @Prop({ type: String }) label;
  @Prop({ type: Boolean, default: true }) showIcon;
  @Prop({ type: Boolean, default: false }) isColorful; // label是否需要颜色

  get classes() {
    return this.type ? `is-${this.type}` : 'is-default';
  }
  get iconClasses() {
    return this.type ? `is-${this.type} icon-annimation` : 'is-default';
  }

  created() {}
  mounted() {}
}
</script>

<style lang="scss">
@include b(status, tj) {
  @include when(default) {
    color: $--color-dark;
  }
  @include when(primary) {
    color: $--color-primary;
  }
  @include when(success) {
    color: $--color-success;
  }
  @include when(warning) {
    color: $--color-warning;
  }
  @include when(danger) {
    color: $--color-danger;
  }
  @include when(none) {
    color: $--color-none;
  }
  @include e(icon) {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-top: -2px;
    margin-right: 3px;
    border-radius: 50%;
    vertical-align: middle;
    @include when(default) {
      background-color: $--color-dark;
    }
    @include when(primary) {
      background-color: $--color-primary;
    }
    @include when(success) {
      background-color: $--color-success;
    }
    @include when(warning) {
      background-color: $--color-warning;
    }
    @include when(danger) {
      background-color: $--color-danger;
    }
    @include when(none) {
      background-color: $--color-none;
    }

    // &.icon-annimation {
    //   animation: tjStatuIconPulse 1s ease 0.1s infinite;
    // }
  }
}

// @keyframes tjStatuIconPulse {
//   0% {
//     transform: scale(0.9);
//   }
//   50% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(0.9);
//   }
// }
</style>