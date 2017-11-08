<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main reg_main">
      <group title="新用户注册">
        <x-input placeholder="账号" required @on-change="accountValid" v-model="account"></x-input>
      </group>
      <p class="yz">{{valid1}}</p>
      <group>
        <x-input placeholder="昵称" required @on-change="nicknameValid" v-model="nickname"></x-input>
      </group>
      <p class="yz">{{valid2}}</p>
      <group>
        <x-input placeholder="Email" required @on-change="emailValid" v-model="email"></x-input>
      </group>
      <p class="yz">{{valid3}}</p>
      <group>
        <x-input placeholder="密码" required type="password" @on-change="passValid" v-model="password"></x-input>
      </group>
      <p class="yz">{{valid4}}</p>
      <group>
        <x-input placeholder="确认密码" required type="password" @on-change="rpassValid" v-model="rpwd"></x-input>
      </group>
      <p class="yz">{{valid5}}</p>
      <group>
        <div class="yzm">
          <x-input placeholder="验证码" class="yzmInput" required @on-change="capValid" v-model="validCode"></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <p class="yz">{{valid6}}</p>
      <x-button class="submit" @click.native="submit">提交注册信息</x-button>
      <alert v-model="show2" :content="content"></alert> <!--:title="title"-->

    </div>
  </div>
</template>

<script>
  import { getCaptchas, register } from 'src/service/getData';
  import { XInput, Group, XButton, Alert } from 'vux';
  import vheader from 'src/components/header/singinHeader';
  export default {
    components: {
      vheader,
      XInput,
      XButton,
      Group,
      Alert
    },
    data () {
      return {
        account: '', //账号
        valid1: '',
        nickname: '', //昵称
        valid2: '',
        email: '', //邮箱
        valid3: '',
        password: '',
        valid4: '',
        rpwd: '',
        valid5: '',
        validCode: '', //验证码
        valid6: '',
        captchas: '',
        show2: false,
        title: '',
        content: ''
      };
    },
    created () {
      this.getCaptchas();
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
      nicknameValid () {
        if (!this.nickname) {
          this.valid2 = '请填写有效的昵称';
          return false;
        }
        this.valid2 = '';
        return true;
      },
      emailValid () {
        let patt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!patt.test(this.email)) {
          self.valid3 = '请填写有效的Email';
          return false;
        }
        this.valid3 = '';
        return true;
      },
      passValid () {
        let patt = /^[a-zA-Z0-9]{4,16}$/;
        if (!patt.test(this.password)) {
          this.valid4 = '必须是4到16位字母或数字组成';
          return false;
        }
        this.valid4 = '';
        return true;
      },
      rpassValid () {
        if (this.password !== this.rpwd) {
          this.valid5 = '密码不一致';
          return false;
        }
        this.valid5 = '';
        return true;
      },
      capValid () {
        if (!this.validCode) {
          this.valid6 = '请填写有效的验证码';
          return false;
        }
        this.valid6 = '';
        return true;
      },
      async getCaptchas () {
        try {
          let result = await getCaptchas();
          this.captchas = result.data;
        } catch (error) {
          console.log(error);
        }
      },
      async submit () {
        if (this.accountValid() && this.nicknameValid() && this.emailValid() && this.passValid() && this.rpassValid() && this.CapValid()) {
          let result;
          try {
            result = await register(this.account, this.nickname, this.email, this.password, this.validCode);
            this.show2 = true;
            if (result.status === 200) {
              this.content = '账号注册成功，请到填写的邮箱激活，即可立即登陆';
              this.$router.push(`/needActive/${result.data.account}`);
            } else {
              throw new Error(result);
            }
          } catch (e) {
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
