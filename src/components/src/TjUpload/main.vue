<template>
  <div class="tj-TjUpload">
    <div class="tj-TjUpload__box">
      <div class="tj-TjUpload__cropper">
        <vue-cropper
          :autoCrop="option.autoCrop"
          :autoCropHeight="option.autoCropHeight"
          :autoCropWidth="option.autoCropWidth"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :canScale="option.canScale"
          :centerBox="option.centerBox"
          :enlarge="option.enlarge"
          :fixed="option.fixed"
          :fixedBox="option.fixedBox"
          :fixedNumber="option.fixedNumber"
          :full="option.full"
          :height="option.height"
          :img="option.img"
          :info="option.info"
          :infoTrue="option.infoTrue"
          :maxImgSize="option.maxImgSize"
          :mode="option.mode"
          :original="option.original"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          @imgLoad="imgLoad"
          @realTime="realTime"
          ref="cropper"
        ></vue-cropper>
      </div>
      <!--底部操作工具按钮-->
      <div class="tj-TjUpload__footer">
        <div class="tj-TjUpload__footer-btn">
          <label
            class="btn"
            for="uploads"
          >选择封面</label>
          <input
            @change="selectImg($event)"
            accept="image/png, image/jpeg, image/gif, image/jpg"
            id="uploads"
            style="position:absolute; clip:rect(0 0 0 0);"
            type="file"
          />
          <el-button
            @click="changeScale(1)"
            icon="el-icon-zoom-in"
            plain
            size="mini"
            type="danger"
          >放大</el-button>
          <el-button
            @click="changeScale(-1)"
            icon="el-icon-zoom-out"
            plain
            size="mini"
            type="danger"
          >缩小</el-button>
          <el-button
            @click="rotateLeft"
            plain
            size="mini"
            type="danger"
          >↺ 左旋转</el-button>
          <el-button
            @click="rotateRight"
            plain
            size="mini"
            type="danger"
          >↻ 右旋转</el-button>
        </div>
        <div class="tj-TjUpload__upload-btn">
          <el-button
            @click="onUploadImg()"
            size="mini"
            type="success"
          >
            上传封面
            <i class="el-icon-upload"></i>
          </el-button>
        </div>
      </div>
    </div>
    <!--预览效果图-->
    <div class="tj-TjUpload__preview">
      <div
        :style="previews.div"
        class="preview"
      >
        <img
          :src="previews.url"
          :style="previews.img"
        />
      </div>
      <div
        class="setting"
        v-if="settingShow"
      >
        <div class="title">截图框设置</div>
        <el-form
          :inline="true"
          label-width="50px"
          size="mini"
        >
          <el-form-item label="宽度">
            <el-input
              @keyup.native="onKeyUpCrop(1)"
              maxlength="3"
              type="number"
              v-model.trim="cropWidth"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度">
            <el-input
              @keyup.native="onKeyUpCrop(2)"
              maxlength="3"
              type="number"
              v-model.trim="cropHeight"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { apiBasic } from '@/api';
import { VueCropper } from 'vue-cropper';
import { uploadImgTypeReg } from '@/config';

@Component({
  name: 'TjUpload',
  components: { VueCropper }
})
export default class App extends Vue {
  @Prop({ default: '' }) action: string;
  private settingShow: boolean = false;
  private autoUploadType: number = 2;
  private previews: any = {};
  private suffix: string = '';
  private cropWidth: number = null;
  private cropHeight: number = null;
  private option: any = {
    img: '', // 裁剪图片的地址
    outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
    outputType: 'png', // 裁剪生成图片的格式（jpeg || png || webp）
    info: true, // 裁剪框的大小信息
    canScale: true, // 图片是否允许滚轮缩放
    autoCrop: true, // 是否默认生成截图框
    autoCropWidth: 260, // 默认生成截图框宽度
    autoCropHeight: 130, // 默认生成截图框高度
    fixed: true, // 是否开启截图框宽高固定比例
    fixedNumber: [260, 130], // 截图框的宽高比例
    full: true, // false按原比例裁切图片，不失真
    fixedBox: false, // 固定截图框大小，不允许改变
    canMove: false, // 上传图片是否可以移动
    canMoveBox: true, // 截图框能否拖动
    original: true, // 上传图片按照原始比例渲染
    centerBox: false, // 截图框是否被限制在图片里面
    height: true, // 是否按照设备的dpr 输出等比例图片
    infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
    maxImgSize: 1500, // 限制图片最大宽度和高度
    enlarge: 1 // 图片根据截图框输出比例倍数
    // mode: '230px 150px' // 图片默认渲染方式
  };

  // 初始化函数
  imgLoad(msg) {}
  // 图片缩放
  changeScale(num) {
    num = num || 1;
    (this as any).$refs.cropper.changeScale(num);
  }
  // 向左旋转
  rotateLeft() {
    (this as any).$refs.cropper.rotateLeft();
  }
  // 向右旋转
  rotateRight() {
    (this as any).$refs.cropper.rotateRight();
  }
  // 实时预览函数
  realTime(data) {
    const _this = this as any;
    _this.previews = data;
    if (data.w && data.h) {
      this.cropWidth = Math.round(data.w);
      this.cropHeight = Math.round(data.h);
    }
    if (data.url) {
      if (this.autoUploadType == 2) {
        this.onUploadImg();
      }
    }
  }
  // 选择图片
  selectImg(e) {
    this.$confirm('是否需要裁剪?', {
      confirmButtonText: '需要',
      cancelButtonText: '不需要',
      type: 'warning'
    })
      .then(() => {
        this.$set(this.option, 'autoCrop', true);
        this.$set(this.option, 'canScale', true);
        this.$set(this.option, 'original', false);
        this.autoUploadType = 1;
        this.changeImage(e, 1);
      })
      .catch(() => {
        this.$set(this.option, 'autoCrop', false);
        this.$set(this.option, 'canScale', false);
        this.$set(this.option, 'original', true);
        this.autoUploadType = 2;
        this.changeImage(e, 2);
      });
  }
  changeImage(e, t) {
    this.settingShow = true;
    let file = e.target.files[0];
    this.suffix = e.target.value.split('.')[1] || 'jpg';
    if (!uploadImgTypeReg.test(e.target.value)) {
      this.$message({
        message: '图片类型要求：jpeg、jpg、png、gif',
        type: 'error'
      });
      return false;
    }
    // 转化为blob
    let reader = new FileReader();

    // 转化为base64
    reader.onload = (e) => {
      let data;
      if (typeof e.target.result === 'object') {
        data = window.URL.createObjectURL(new Blob([e.target.result]));
      } else {
        data = e.target.result;
      }
      this.option.img = data;
    };
    reader.readAsDataURL(file);
  }

  // 上传图片
  onUploadImg() {
    this.autoUploadType = 1;
    // 获取截图的blob数据
    (this as any).$refs.cropper.getCropBlob((data) => {
      if (!data) {
        this.$message({
          type: 'warning',
          message: '上传内容不能为空'
        });
        return false;
      }
      const formData = new FormData();
      const options = {
        upload: 'uploadFile',
        type: 'file'
      };
      formData.append('file', data, new Date().getTime() + '.' + this.suffix);
      // apiBasic.postUpload(this.action, formData, options).then((res) => {
      //   if (res.code == 'ok') {
      //     this.$message({
      //       message: '上传成功',
      //       type: 'success'
      //     });
      //     this.$emit('uploadImgSuccess', res);
      //     this.clear();
      //   }
      // });
    });
  }
  onKeyUpCrop(type) {
    if (type == 1) {
      this.cropWidth = this.cropWidth > 478 ? 478 : this.cropWidth;
      this.cropWidth = parseInt((this as any).cropWidth) === 0 ? 1 : this.cropWidth;
      this.$set(this.option, 'autoCropWidth', this.cropWidth);
    } else {
      this.cropHeight = this.cropHeight > 300 ? 300 : this.cropHeight;
      this.cropHeight = parseInt((this as any).cropHeight) === 0 ? 1 : this.cropHeight;
      this.$set(this.option, 'autoCropHeight', this.cropHeight);
    }
    this.$set(this.option, 'fixedNumber', [this.cropWidth, this.cropHeight]);
    setTimeout(() => {
      (this as any).$refs.cropper.goAutoCrop();
    }, 500);
  }
  clear() {
    this.settingShow = false;
    this.$set(this.option, 'img', '');
    (this as any).$refs.cropper.clearCrop();
    (this as any).$el.querySelector('.cropper-box-canvas img').src = '';
    (document as any).getElementById('uploads').value = '';
  }

  mounted() {}
}
</script>
<style lang="scss">
@include b(TjUpload) {
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  @include e(box) {
    flex: 1;
    width: 100%;
  }
  @include e(cropper) {
    width: auto;
    height: 300px;
    .vue-cropper {
      width: 90%;
    }
  }
  @include e(preview) {
    padding-left: 10px;
    flex: 1;
    -webkit-flex: 1;
    position: relative;
    // display: flex;
    // display: -webkit-flex;
    justify-content: center;
    .preview {
      overflow: hidden;
      border: 1px solid #67c23a;
      background: #cccccc;
    }
    .setting {
      position: absolute;
      bottom: -18px;
      width: 100%;
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        appearance: none !important;
      }

      .title {
        font-weight: bold;
        margin-bottom: 2px;
      }
    }
  }

  @include e(footer) {
    margin-top: 30px;
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
  }

  @include e(footer-btn) {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding-right: 10px;
  }

  @include e(upload-btn) {
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
  }
  .btn {
    outline: none;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    font-weight: 500;
    padding: 8px 15px;
    font-size: 12px;
    border-radius: 3px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    margin-right: 10px;
  }
}
</style>