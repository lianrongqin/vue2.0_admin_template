<template>
  <div class="tj-testPage">
    <div id="wangeditor"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { apiBasic } from '@/api';
import { Getter } from 'vuex-class';
import { APP_AUTHORIZATION_PREFIX } from '@/config';
import { path } from '@/router';
import { relaunchApp, removeUserTokenInfo } from '@/utils';
import E from 'wangeditor';
// const editor = new E('#wangeditor');
@Component({
  name: 'testPage',
  components: {}
})
export default class App extends Vue {
  @Getter('token') token;
  @Prop({ default: '' }) value: string;
  get editor() {
    return new E('#wangeditor');
  }
  initEditor() {
    const _this = this;
    setTimeout(() => {
      if (_this.value) {
        _this.editor.txt.html(_this.value);
      }
    }, 500);
    this.editor.config.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic',
      'underline',
      'strikeThrough',
      'indent',
      'lineHeight',
      'foreColor',
      'backColor',
      'link',
      'list',
      // 'todo',
      'justify',
      'quote',
      'emoticon',
      'image',
      //  'video',
      'table',
      'code',
      'splitLine',
      'undo',
      'redo'
    ];
    this.editor.config.colors = [
      '#000000',
      '#eeece0',
      '#1c487f',
      '#4d80bf',
      '#c24f4a',
      '#8baa4a',
      '#7b5ba1',
      '#46acc8',
      '#f9963b',
      '#ffffff',
      '#767171',
      '#843c0c',
      '#fffb00',
      '#d6a841',
      '#ffda51',
      '#ffa900',
      '#ff4f79',
      '#ff2941',
      '#d92041',
      '#ab1942',
      '#3da742',
      '#407600',
      '#0052ff',
      '#7a4fd6',
      '#ff466f',
      '#ff273f',
      '#d8203d',
      '#a5193b',
      '#2a9e41',
      '#346b16',
      '#1041f8'
    ];
    this.editor.config.height = 400;
   // this.editor.config.uploadImgServer = apiBasic.getUploadUrl();
    this.editor.config.uploadImgHeaders = {
      authorization: `${APP_AUTHORIZATION_PREFIX} ${this.token}`
    };
    this.editor.config.onchange = function (html) {
      // 第二步，监控变化，同步更新到 textarea
      if (html) {
        _this.$emit('input', html);
      }
    };
    this.editor.config.uploadFileName = 'file';
    this.editor.config.uploadImgHooks = {
      // 上传图片之前
      before: function (xhr) {
        // 可阻止图片上传
      },
      // 图片上传并返回了结果，图片插入已成功
      success: function (xhr) {
        console.log('success', xhr);
      },
      // 图片上传并返回了结果，但图片插入时出错了
      fail: function (xhr, editor, resData) {
        console.log('fail', resData);
      },
      // 上传图片出错，一般为 http 请求的错误
      error: function (xhr: XMLHttpRequest) {
        const res = JSON.parse(xhr.response) || {};
        if (res.code == 'AUTH_001') {
          removeUserTokenInfo();
          relaunchApp(path.PATH_LOGIN);
        }
      },
      // 上传图片超时
      timeout: function (xhr) {
        console.log('timeout');
      },
      // 图片上传并返回了结果，想要自己把图片插入到编辑器中
      // 例如服务器端返回的不是 { errno: 0, data: [...] } 这种格式，可使用 customInsert
      customInsert: function (insertImgFn: Function, result: any) {
        // result 即服务端返回的接口
        // insertImgFn 可把图片插入到编辑器，传入图片 src ，执行函数即可
        insertImgFn(result.msg);
      }
    };
    this.editor.create();
  }
  created() {}
  mounted() {
    this.initEditor();
  }
}
</script>

<style lang="scss" scoped>
/deep/ .w-e-tooltip {
  display: none;
}
</style>