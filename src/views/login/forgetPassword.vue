<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <group title="忘记了密码？">
        <x-input class="yzmInput" placeholder="Email" required @on-change="getValid3" v-model="email"></x-input>
      </group>
      <p class="yz">{{valid3}}</p>
      <group>
        <div class="yzm">
          <x-input placeholder="验证码" class="yzmInput" required @on-change="getValid6" v-model="validCode"></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <p class="yz">{{valid6}}</p>
      <x-button type="primary" class="submit" @click.native="findPass">找回密码</x-button>
      <alert v-model="show2" :content="content" @on-hide="onHide"></alert> <!--:title="title"-->
    </div>
  </div>
</template>

<script>
  import { axios } from '@/router/config';
  import { XInput, Group, XButton, Alert } from 'vux';
  import vheader from '@/components/header/singinHeader';
  export default {
    components: {
      vheader,
      Group,
      XInput,
      XButton,
      Alert
    },
    data () {
      return {
        validCode: '', //验证码
        captchas: '',
        email: '',
        valid3: '',
        valid6: '',
        content: '',
        show2: false
      };
    },
    created () {
      this.getCaptchas();
    },
    methods: {
      getValid3 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          let patt = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
          self.valid3 = patt.test(self.email) ? ' ' : '请填写有效的Email';
          if (self.valid3 === ' ') {
            resolve();
          }
        });
      },
      getValid6 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.valid6 = self.validCode ? ' ' : '请填写有效的验证码';
          if (self.valid6 === ' ') {
            resolve();
          }
        });
      },
      getCaptchas () {
        var self = this;
        axios('get', '/getCaptchas', {}, data => {
          if (data.code === 200) {
            self.captchas = data.data;
          }
        });
      },
      findPass () {
        var self = this;
        Promise.all([this.getValid3(), this.getValid6()]).then(function (val) {
          axios('get', '/findPass',
            {
              email: self.email,
              validCode: self.validCode
            }, data => {
              if (data.status === 200) {
                console.log('success');
              } else {
                //self.title = '登录失败'
                self.content = data.message;
              }
            });
          self.show2 = true;
          self.content = '已发送您邮箱';
        });
      },
      onHide () {
        this.$router.push(`/login`);
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
