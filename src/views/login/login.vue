<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main reg_main">
      <group title="登录">
        <x-input placeholder="用户名" required v-model="account" @on-change="getValid1"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="密码" required type="password" v-model="password" @on-change="getValid4"></x-input>
      </group>
      <p class="yz">{{valid4}}</p>
      <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
      <div class="login_state">
        <x-switch title="记住登录状态（60天）" v-model="demo1"></x-switch>
      </div>
      <x-button type="primary" class="submit" @click.native="login" action-type="button">登录</x-button>
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
  import { axios } from '@/router/config';
  import { XInput, Group, XButton, Cell, XSwitch, CheckIcon, Alert } from 'vux';
  import vheader from '../../components/header/singinHeader';
  export default {
    components: {
      vheader,
      XSwitch,
      XInput,
      XButton,
      Group,
      CheckIcon,
      Cell,
      Alert
    },
    data () {
      return {
        account: '',
        valid1: '',
        password: '',
        valid4: '',
        show2: false,
        title: '',
        content: '',
        demo1: false
      };
    },
    methods: {
      getValid1 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          let patt = /^[a-zA-Z0-9]{4,16}$/;
          self.valid1 = patt.test(self.account) ? ' ' : '账号必须是4到16位字母或数字组成';
          if (self.valid1 === ' ') {
            resolve();
          }
        });
      },
      getValid4 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          let patt = /^[a-zA-Z0-9]{4,16}$/;
          self.valid4 = patt.test(self.password) ? ' ' : '密码必须是4到16位字母或数字组成';
          if (self.valid4 === ' ') {
            resolve();
          }
        });
      },
      login () {
        let self = this;
        Promise.all([this.getValid1(), this.getValid4()]).then(function (val) {
          axios('get', '/login',
            {
              account: self.account,
              password: self.password
            }, data => {
              if (data.status === 200) {
                sessionStorage.setItem('userId', data.data.userId);
                sessionStorage.setItem('header', data.data.header);
                self.$router.push('/');
              } else if (data.status === 1) {
                self.$router.push(`/needActive?a=${data.account}`);
              } else {
                self.show2 = true;
                //self.title = '登录失败'
                self.content = data.message;
              }
            });
        });
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
      .login_state {
        color: #999;
      }
      .submit {
        margin-top: 20px;
        margin-bottom: 20px;
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
