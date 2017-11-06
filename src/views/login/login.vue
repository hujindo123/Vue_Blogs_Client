<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main reg_main">
      <group title="登录">
        <x-input placeholder="用户名" required v-model="account" @on-change="accountValid"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="密码" required type="password" v-model="password" @on-change="passwordValid"></x-input>
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
  //import { login } from 'src/service/getData';
  import axios from 'axios';
  import { XInput, Group, XButton, Cell, XSwitch, CheckIcon, Alert } from 'vux';
  import vheader from 'src/components/header/singinHeader';
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
        return true;
      },
      passwordValid () {
        let patt = /^[a-zA-Z0-9]{4,16}$/;
        if (!patt.test(this.account)) {
          this.valid4 = '密码必须是4到16位字母或数字组成';
          return false;
        }
        return true;
      },
      singUp () {
        let self = this;
        if (this.accountValid() && this.passwordValid()) {
          /*login(self.account, self.password).then(res => {
           debugger;
           }).catch((err) => {
           debugger;
           console.log(err);
           });
           console.log(123);*/
          axios.get('http://172.16.0.61:3001/login', {
            account: self.account,
            password: self.password
          })
            .then(function (res) {
              console.log(res);
            })
            .catch(function (err) {
              console.log(err);
            });
        }
        /*Promise.all([this.accountValid(), this.passwordValid()]).then(function (val) {
         debugger;
         login(self.account, self.password);
         /!*axios('get', '/login',
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
         });*!/
         });*/
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
