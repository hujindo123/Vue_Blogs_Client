<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <group title="新用户注册">
        <x-input placeholder="账号" required @on-change="getValid1" v-model="account"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="昵称" required v-model="nickname"></x-input>
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
          <x-input placeholder="验证码" class="yzmInput" required></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <x-button class="submit" @click.native="submit">提交注册信息</x-button>
    </div>
  </div>
</template>

<script>
  import { axios } from '@/router/config'
  import { XInput, Group, XButton, Cell, CheckIcon } from 'vux'
  import vheader from '../components/header/singinHeader'
  export default {
    components: {
      vheader,
      XInput,
      XButton,
      Group,
      CheckIcon,
      Cell
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
        captchas: '', // 验证码

        demo1: false,
        enterText: '',
        iconType: '',
        yzmm: function (value) {
          return {
            valid: value === this.password,
            valid5: '密码不一致'
          }
        },
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: ''
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
          if (self.valid1 === '') {
            resolve()
          }
        })
      },
      getValid2 () {
        this.valid2 = this.account ? '' : '请填写有效的昵称'
      },
      getValid3 () {
        let patt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        this.valid3 = patt.test(this.email) ? ' ' : '请填写有效的Email'
      },
      getValid4 () {
        let patt = /^[a-zA-Z0-9]{4,16}$/
        this.valid4 = patt.test(this.password) ? ' ' : '必须是4到16位字母或数字组成'
      },
      getValid5 () {
        this.valid5 = this.password === this.rpwd ? ' ' : '密码不一致  '
      },
      /* user method */
      getCaptchas () {
        var self = this
        axios('get', '/getCaptchas', {}, function (data) {
          self.captchas = data.data
        })
      },
      submit () {
        Promise.all([this.getValid1(), this.getValid2(), this.getValid3(), this.getValid4(), this.getValid5()]).then(function (val) {
          let b = val.join('')
          if (b.length > 0) {
            return
          }
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
      .weui-cells {
        margin-top: 0;
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
