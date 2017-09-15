<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main reg_main">
      <group title="新用户注册">
        <x-input placeholder="账号" required @on-change="getValid1" v-model="account"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="昵称" required @on-change="getValid2" v-model="nickname"></x-input>
      </group>
      <p class="yz">{{valid2}}</p>
      <group>
        <x-input placeholder="Email" required @on-change="getValid3" v-model="email"></x-input>
      </group>
      <p class="yz">{{valid3}}</p>
      <group>
        <x-input placeholder="密码" required type="password" @on-change="getValid4" v-model="password"></x-input>
      </group>
      <p class="yz">{{valid4}}</p>
      <group>
        <x-input placeholder="确认密码" required type="password" @on-change="getValid5" v-model="rpwd"></x-input>
      </group>
      <p class="yz">{{valid5}}</p>
      <group>
        <div class="yzm">
          <x-input placeholder="验证码" class="yzmInput" required @on-change="getValid6" v-model="validCode"></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <p class="yz">{{valid6}}</p>
      <x-button class="submit" @click.native="submit">提交注册信息</x-button>
      <alert v-model="show2"  :content="content"></alert> <!--:title="title"-->

    </div>
  </div>
</template>

<script>
  import { axios } from '@/router/config'
  import { XInput, Group, XButton, Cell, CheckIcon, Alert } from 'vux'
  import vheader from '@/components/header/singinHeader'
  export default {
    components: {
      vheader,
      XInput,
      XButton,
      Group,
      CheckIcon,
      Cell,
      Alert
    },
    data () {
      return {
        account: '', // 账号
        valid1: '',
        nickname: '', // 昵称
        valid2: '',
        email: '', // 邮箱
        valid3: '',
        password: '',
        valid4: '',
        rpwd: '',
        valid5: '',
        validCode: '', // 验证码
        valid6: '',
        captchas: '',
        show2: false,
        title: '',
        content: ''
      }
    },
    created () {
      this.getCaptchas()
    },
    methods: {
      getValid1 () {
        var self = this
        return new Promise(function (resolve, reject) {
          let patt = /^[a-zA-Z0-9]{4,16}$/
          self.valid1 = patt.test(self.account) ? ' ' : '必须是4到16位字母或数字组成'
          if (self.valid1 === ' ') {
            resolve()
          }
        })
      },
      getValid2 () {
        var self = this
        return new Promise(function (resolve, reject) {
          self.valid2 = self.nickname ? ' ' : '请填写有效的昵称'
          if (self.valid2 === ' ') {
            resolve()
          }
        })
      },
      getValid3 () {
        var self = this
        return new Promise(function (resolve, reject) {
          let patt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          self.valid3 = patt.test(self.email) ? ' ' : '请填写有效的Email'
          if (self.valid3 === ' ') {
            resolve()
          }
        })
      },
      getValid4 () {
        var self = this
        return new Promise(function (resolve, reject) {
          let patt = /^[a-zA-Z0-9]{4,16}$/
          self.valid4 = patt.test(self.password) ? ' ' : '必须是4到16位字母或数字组成'
          if (self.valid4 === ' ') {
            resolve()
          }
        })
      },
      getValid5 () {
        var self = this
        return new Promise(function (resolve, reject) {
          self.valid5 = self.password === self.rpwd ? ' ' : '密码不一致  '
          if (self.valid5 === ' ') {
            console.log(5)
            resolve()
          }
        })
      },
      getValid6 () {
        var self = this
        return new Promise(function (resolve, reject) {
          self.valid6 = self.validCode ? ' ' : '请填写有效的验证码'
          if (self.valid6 === ' ') {
            resolve()
          }
        })
      },
      getCaptchas () {
        var self = this
        axios('get', '/getCaptchas', {}, data => {
          if (data.code === 200) {
            self.captchas = data.data
          }
        })
      },
      submit () {
        let self = this
        Promise.all([this.getValid1(), this.getValid2(), this.getValid3(), this.getValid4(), this.getValid5(), this.getValid6()]).then(function (val) {
          axios('get', '/register',
            {
              account: self.account,
              nickname: self.nickname,
              email: self.email,
              password: self.password,
              validCode: self.validCode
            }, data => {
              if (data.status === 200) {
                self.$router.push('/login')
              } else {
                self.show2 = true
                // self.title = '登录失败'
                self.content = data.message
              }
            })
        })
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../assets/mixin";

  .register {
    display: flex;
    flex-flow: column;
    @include wh(100%, 100%);
    position: relative;
    .wrapper_main {
      flex: 1;
      overflow-y: scroll;
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
      .yzm {
        display: flex;
        flex-flow: row;
        align-items: center;
        .yzmInput {
          flex: 1;
        }
        .yzmButtons {
          width: 100px;
          flex: 0 0 100px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
      }
      .submit {
        margin-top: 20px;
        width: 80%;
        margin-bottom: 20px;
        color: #fff;
        @include bg();
      }
    }
  }
</style>
