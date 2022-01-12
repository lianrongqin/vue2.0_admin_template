<template>
  <el-dialog
    :title="title"
    :visible.sync="show"
    @open="init"
    center
    class="tj-exportDlg"
    width="500px"
  >
    <el-form label-width="90px">
      <el-form-item label>
        <el-radio-group v-model="exportType">
          <el-radio label="download">导出至本地</el-radio>
          <el-radio label="email">发送至指定邮箱</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="邮箱地址："
        v-show="exportType=='email'"
      >
        <el-input
          :placeholder="userInfo.email||'请输入邮箱'"
          class="tj-exportDlg__input"
          v-model="email"
        ></el-input>
      </el-form-item>
      <el-form-item
        label
        v-show="exportType=='download'"
      >
        <div class="tj-exportDlg__tip">
          <img
            alt
            class="tj-exportDlg__icon"
            src="~@/assets/image/checkAccountReport/warn_fill.png"
          />
          <span class="tj-exportDlg__tipText">导出数据量如果过大，可能会导出失败!</span>
        </div>
      </el-form-item>
    </el-form>
    <span
      class="dialog-footer"
      slot="footer"
    >
      <el-button @click="show = false">取 消</el-button>
      <el-button
        @click="onConfirm"
        type="primary"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Provide } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import store from '@/store/src/index';
@Component({
  name: 'exportDlg',
  components: {}
})
export default class extends Vue {
  private title: string = '导出数据';
  private show: boolean = false;
  private REGEX_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  private exportType: string = 'download';
  private email: string = '';
  get userInfo() {
    return store.getters.userInfo;
  }
  open() {
    this.show = true;
  }
  close() {
    this.show = false;
  }
  init() {
    this.exportType = 'download';
    this.email = '';
  }
  onConfirm() {
    if (this.exportType == 'download') {
      this.$emit('confirm', { type: 'download', email: '' });
    } else {
      const email = this.email || this.userInfo.email || '';
      if (!this.REGEX_EMAIL.test(email)) {
        return this.$message({
          message: '请输入正确的邮箱',
          type: 'warning'
        });
      }
      this.$emit('confirm', { type: 'email', email: email });
    }
  }
}
</script>
<style lang='scss'>
@include b(exportDlg) {
  @include e(input) {
    width: 305px;
  }
  @include e(tip) {
    display: flex;
    align-items: center;
  }
  @include e(icon) {
    margin-right: 10px;
    width: 16px;
    height: 14px;
  }
  @include e(tipText) {
    font-size: 14px;
    font-weight: 300;
    color: #e60012;
  }
  .el-dialog__header {
    text-align: left;
    border-bottom: 1px solid #ebedf2;
  }
  .el-dialog__footer {
    padding: 20px;
    background-color: #f7f8fa;
  }
}
</style>
