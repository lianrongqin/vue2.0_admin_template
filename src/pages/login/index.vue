<template>
  <!-- <transition name="bounceInRight"> -->

  <div class="tj-login">
    <div class="tj-login__form">
      <TjForm
        :formItems="formItems"
        :initValues="formInitValues"
        :operate="false"
        :props="props"
        :rules="formRules"
        :slotPrefixRender="prefixRender"
        class="tj-loginForm"
        ref="TjFormRef"
        type="normal"
      />
    </div>
  </div>
  <!-- </transition> -->
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator';
import { path } from '@/router';
import { Button } from 'element-ui';
import { app } from '@/sdk';
import md5 from 'js-md5';
const loginLogo = require('@/assets/image/globalLayout/logo.png');

@Component({
  name: 'Login',
  components: {}
})
export default class App extends Vue {
  isMounted = false;
  loading = false;
  formRules = {
    username: [{ required: true, message: 'username is required', trigger: 'blur' }],
    password: [{ required: true, message: 'password is required', trigger: 'blur' }]
  };

  formInitValues = {
    username: '',
    password: ''
  };
  props = {
    form: {
      labelWidth: '0'
    },
    col: {
      xs: 24,
      sm: 24,
      md: 24,
      lg: 24,
      xl: 24
    }
  };

  get formItems() {
    return [
      {
        prop: 'username',
        fieldType: 'Input',
        fieldProps: {
          placeholder: 'username'
        }
      },
      {
        prop: 'password',
        fieldType: 'Input',
        fieldProps: {
          placeholder: 'password',
          type: 'Password'
        },
        fieldNative: {
          keyup: (e) => {
            if (e.keyCode !== 13) return;
            this.onClickLogin();
          }
        }
      },
      {
        render: (h, values, prop) => {
          const ButtonData = {
            props: {
              type: 'primary',
              loading: this.loading
            },
            on: {
              click: this.onClickLogin
            },
            class: ['tj-loginForm__loginButton']
          };

          return h(Button, ButtonData, 'LOGIN');
        }
      }
    ];
  }

  get refForm() {
    return this.TjFormRef && this.TjFormRef.refForm;
  }

  @Ref('TjFormRef') TjFormRef;

  prefixRender(h) {
    return h('img', { class: ['tj-login__logo'], attrs: { src: loginLogo } });
  }

  onClickLogin() {
    this.refForm.validate((valid) => {
      if (valid) {
        this.loading = true;
        const values = this.TjFormRef.values;
        const { username, password } = values;
        const params = {
          username: username,
          password: md5(password)
        };
        app
          .login(params, async () => {
            (this.$message as any).closeAll();
            this.$message.success({ message: '登陆成功', duration: 1000 });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    });
  }

  created() {}
  mounted() {}
}
</script>

<style lang="scss">
@include b(login) {
  min-width: 1000px;
  height: 100%;
  background: #f9fafb;
  @include utils-clearfix;
  @include e(logo) {
    display: block;
    margin: 0 auto 20px auto;
    width: 70%;
  }
  @include e(form) {
    float: left;
    width: 400px;
    height: 100%;
    margin-left: 50%;
    transform: translateX(-50%);
    background: #f9fafb;
    .tj-form {
      background: #f9fafb;
    }
  }
}

@include b(loginForm) {
  position: relative;
  top: 45%;
  transform: translateY(-50%);

  &__loginButton,
  .el-input__inner {
    height: 48px;
    border-radius: 3px !important;
  }
  &__loginButton {
    height: 48px;
    width: 100%;
    background-color: #4a90e2 !important;
  }
  .el-input__inner {
    border: 1px solid #a8a9aa;
    // border: 1px solid rgba(0, 0, 0, 0.32);
  }
}
</style>