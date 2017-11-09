<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <group title="忘记了密码？">
        <x-input class="yzmInput" placeholder="Email" required @on-change="emailValid" v-model="email"></x-input>
      </group>
      <p class="yz">{{valid3}}</p>
      <group>
        <div class="yzm">
          <x-input placeholder="验证码" class="yzmInput" required @on-change="codeValid" v-model="validCode"></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <p class="yz">{{valid6}}</p>
      <x-button type="primary" class="submit" @click.native="findPass">找回密码</x-button>
      <alert v-model="alert.show2" :content="alert.content" @on-hide="onHide"></alert> <!--:title="title"-->
      <div v-transfer-dom>
        <loading :show="show1" :text="'发送中'"></loading>
      </div>
    </div>
  </div>
</template>

<script>
  import { getCaptchas, findPass } from 'src/service/getData';
  import { XInput, Group, XButton, Alert, Loading, TransferDomDirective as TransferDom } from 'vux';
  import vheader from 'src/components/header/singinHeader';
  export default {
    directives: {
      TransferDom
    },
    components: {
      vheader,
      Group,
      XInput,
      XButton,
      Alert,
      Loading
    },
    data () {
      return {
        validCode: '', //验证码
        captchas: '',
        email: '',
        valid3: '',
        valid6: '',
        show1: false,
        alert: {
          content: '',
          show2: false,
          status: false
        }
      };
    },
    created () {
      this.getCaptchas();
    },
    methods: {
      emailValid () {
        let patt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        if (!patt.test(this.email)) {
          this.valid3 = '请填写有效的Email';
          return false;
        }
        this.valid3 = '';
        return true;
      },
      codeValid () {
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
        } catch (err) {
          this.show2 = true;
          this.content = err.message;
        }
      },
      async findPass () {
        if (this.emailValid() && this.codeValid()) {
          try {
            this.show1 = true;
            let result = await findPass(this.email, this.validCode);
            this.show1 = false;
            this.alert.status = result.status === 200 ? 'true' : 'false';
            this.alert.show2 = true;
            this.alert.content = result.message;
          } catch (err) {
            this.show1 = false;
            this.alert.show2 = true;
            this.alert.content = err.message;
          }
        }
      },
      onHide () {
        if (this.alert.status) {
          this.$router.push(`/login`);
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
      .weui-cells {
        margin-top: 0;
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
          margin-bottom: 20px;
        }
      }

    }
  }
</style>
