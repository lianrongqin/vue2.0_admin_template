<template>
  <div class="tj-tjImage">
    <template v-if="single && imageList">
      <div class="tj-tjImage__box">
        <el-image
          :src="imageList"
          ref="image"
        />
      </div>
    </template>
    <template v-else>
      <div
        :key="i"
        @mouseenter="onEnter(i)"
        @mouseleave="onLeave"
        class="tj-tjImage__box"
        v-for="(url,i) in imageList"
      >
        <div
          @click="onClickMark(i)"
          class="icon_mark"
          v-show="i==current"
        >
          <i class="icon el-icon-delete"></i>
        </div>

        <el-image
          :src="url"
          ref="image"
        />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator';
@Component({
  name: 'tjImage',
  components: {}
})
export default class extends Vue {
  @Prop({ default: () => [] }) imgList: any;
  @Prop({ default: false }) single: boolean;
  private showMark: boolean = false;
  private current: number = null;
  get imageList() {
    return this.imgList;
  }
  onEnter(index) {
    this.current = index;
  }
  onLeave() {
    this.current = null;
  }
  onClickMark(i) {
    this.imgList.splice(i, 1);
    this.$emit('click-delete', this.imgList[i]);
  }
}
</script>
<style lang='scss'>
@include b(tjImage) {
  @include e(box) {
    position: relative;
    width: 150px;
    height: 150px;
    margin: $--margin-sm;
    float: left;
    .el-image {
      width: 100%;
      height: 100%;
    }
    .icon_mark {
      cursor: pointer;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      text-align: center;
      .icon {
        line-height: 150px;
        font-size: $--font-size-xl;
        color: $--color-white;
      }
    }
  }
}
</style>
