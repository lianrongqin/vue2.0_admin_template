<template>
  <div class="tj-drawer">
    <el-drawer
      :direction="direction"
      :modal="modal"
      :modal-append-to-body="false"
      :size="size"
      :title="title"
      :visible.sync="show"
      :with-header="showHeader"
      :wrapperClosable="wrapperClosable"
      custom-class="tj-drawer__main"
      ref="drawer"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div
        :class="bodyPadding"
        class="tj-drawer__main--body"
      >
        <slot />
      </div>
      <div
        class="tj-drawer__main--footer"
        v-if="showFooter"
      >
        <el-button @click="onCancel">取 消</el-button>
        <el-button
          :disabled="btnStatus"
          :loading="loading"
          @click="onConfirm"
          type="primary"
        >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, PropSync, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  name: 'tjDrawer',
  components: {}
})
export default class extends Vue {
  @PropSync('visible', { type: Boolean, default: false }) show: boolean;
  @Prop({ type: String, default: '' }) title: string; // 头部标题
  @Prop({ type: String, default: 'rtl' }) direction: string; // 打开的方向 rtl-右往左 ltr-左往右 ttb-上往下 btt-下往上
  @Prop({ type: Boolean, default: false }) onlyBody: boolean; // 不显示头部 底部
  @Prop({ type: Boolean, default: true }) withHeader: boolean; // 头部显示状态
  @Prop({ type: Boolean, default: true }) withFooter: boolean; // 底部显示状态
  @Prop({ type: String, default: 'small' }) drawerSize: string;
  @Prop({ type: Boolean, default: true }) modal: boolean;
  @Prop({ type: Boolean, default: true }) wrapperClosable: boolean;
  private loading: boolean = false;
  private btnStatus: Boolean = false;
  private sizeOptions = {
    small: '600px',
    medium: '800px',
    larger: '1000px'
  };
  get size() {
    const size = this.$attrs.size;
    if (size) {
      return size;
    }
    const str = this.sizeOptions[this.drawerSize] || '600px';
    return str;
  }
  // 是否展示头部
  get showHeader() {
    if (this.onlyBody) return false;
    return this.withHeader;
  }
  // 是否展示底部
  get showFooter() {
    if (this.onlyBody) return false;
    return this.withFooter;
  }
  // 内容区域绑定class
  get bodyPadding() {
    if (this.onlyBody || (!this.withHeader && !this.withFooter)) return 'is-show';
    if (!this.withHeader) return 'is-noHead';
    if (!this.withFooter) return 'is-noFooter';
    return '';
  }
  mounted() {}
  onCancel() {
    this.show = false;
  }
  onConfirm() {
    if (!this.btnStatus) {
      this.btnStatus = true;
      this.$emit('confirm');
    }
    setTimeout(() => {
      this.btnStatus = false;
    }, 3000);
  }
}
</script>
<style lang='scss'>
@include b(drawer) {
  position: relative;
  div,
  span,
  button,
  i {
    outline: none;
  }
  .el-drawer {
    max-width: 70%;
  }
  @include e(main) {
    $bodyPt: 83px;
    $bodyPb: 92px;
    .el-drawer__header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin-bottom: 0;
      padding-bottom: 20px;
      background-color: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.11);
      z-index: 20000;
    }
    .el-drawer__body {
      overflow-y: auto;
    }
    @include m(body) {
      padding: $bodyPt 20px $bodyPb 20px;
      @include when(show) {
        padding: 20px;
      }
      @include when(noHead) {
        padding: 20px 20px $bodyPb;
      }
      @include when(noFooter) {
        padding: $bodyPt 20px 20px;
      }
    }
    @include m(footer) {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      padding: 20px;
      background-color: #fff;
      z-index: 10000;
      button {
        width: 30%;
        max-width: 180px;
      }
    }
  }
}
</style>
