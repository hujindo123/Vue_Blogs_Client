<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main reg_main">
      <group title="登录">
        <x-input placeholder="用户名" required v-model="account" @on-change="accountValid"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="密码"  type="password" v-model="password" @on-change="passwordValid"></x-input>
      </group>
      <p class="yz">{{valid2}}</p>
      <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
      <div class="login_state">
        <x-switch title="记住登录状态（60天）" v-model="demo1"></x-switch>
      </div>
      <x-button type="primary" class="submit" @click.native="singUp" action-type="button">登录</x-button>
      <group class="login_more">
        <cell value-align="left">
          <router-link to="/register">注册</router-link>
        </cell>
        <cell value-align="left">
          <router-link to="/forget">忘记密码</router-link>
        </cell>
        <!-- <cell value-align="left">
           <router-link to="/NotEmail">未收到邮件？</router-link>
         </cell>-->
      </group>
    </div>
  </div>
</template>

<script>
  import { login } from 'src/service/getData';
  import { XInput, Group, XButton, Cell, XSwitch, Alert } from 'vux';
  import vheader from 'src/components/header/singinHeader';
  export default {
    components: {
      vheader,
      XSwitch,
      XInput,
      XButton,
      Group,
      Cell,
      Alert
    },
    data () {
      return {
        account: '',
        password: '',
        valid1: '',
        valid2: '',
        show2: false,
        title: '',
        content: '',
        demo1: false
      };
    },
    methods: {
      accountValid () {
        let patt = /^[a-zA-Z0-9]{4,16}$/;
        if (!patt.test(this.account)) {
          this.valid1 = '账号必须是4到16位字母或数字组成';
          return false;
        }
        this.valid1 = '';
        return true;
      },
      passwordValid () {
        let patt = /^[a-zA-Z0-9]{4,16}$/;
        if (!patt.test(this.account)) {
          this.valid4 = '密码必须是4到16位字母或数字组成';
          return false;
        }
        this.valid4 = '';
        return true;
      },
      async singUp () {
        if (this.accountValid() && this.passwordValid()) {
          try {
            let result = await login(this.account, this.password);
            if (result.status === 200) {
              debugger;
              sessionStorage.setItem('userId', result.data.userId);
              sessionStorage.setItem('header', result.data.header);
              this.$router.push('/');
            } else if (result.status === 300) {
              debugger;
              this.$router.push(`/needActive/${result.account}`);
            } else {
              debugger;
              throw new Error(result.message);
            }
          } catch (e) {
            this.show2 = true;
            this.content = e.message;
          }
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .register {
    display: flex;
    flex-flow: column;
    @include wh(100%, 100%);
    position: relative;
    .wrapper_main {
      flex: 1;
      &.reg_main {
        .weui-cells {
          margin-top: 0;
        }
      }
      .yz {
        padding: 3px 10px;
        height: 13px;
        @include csh(#FF0000, 12px, 13px);
      }
      .login_state {
        color: #999;
      }
      .submit {
        margin-top: 20px;
        width: 80%;
        margin-bottom: 20px;
        color: #fff;
        @include bg();
      }
      .login_more {
        margin-top: 40px;
        a {
          display: block;
        }
      }
    }
  }
</style>
