<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <div class="desc">
        <h4>Hi, {{email}}</h4>
        <p> 请输入您的新密码进行重置操作。</p>
      </div>
      <group>
        <x-input placeholder="密码" required type="password" @on-change="getValid4" v-model="password"></x-input>
      </group>
      <p class="yz">{{valid4}}</p>
      <group>
        <x-input placeholder="确认密码" required type="password" @on-change="getValid5" v-model="rpwd"></x-input>
      </group>
      <p class="yz">{{valid5}}</p>
      <x-button type="primary" class="submit" @click.native="updatePass">重置密码</x-button>
    </div>
  </div>
</template>

<script>
  import { axios } from '@/router/config';
  import { XInput, Group, XButton } from 'vux';
  import vheader from '@/components/header/singinHeader';
  export default {
    components: {
      vheader,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        email: '',
        password: '',
        rpwd: '',
        valid4: '',
        valid5: ''
      };
    },
    created () {
      if (this.queryString('a')) {
        this.email = this.queryString('a');
      }
    },
    methods: {
      queryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      },
      getValid4 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          let patt = /^[a-zA-Z0-9]{4,16}$/;
          self.valid4 = patt.test(self.password) ? ' ' : '必须是4到16位字母或数字组成';
          if (self.valid4 === ' ') {
            resolve();
          }
        });
      },
      getValid5 () {
        var self = this;
        return new Promise(function (resolve, reject) {
          self.valid5 = self.password === self.rpwd ? ' ' : '密码不一致  ';
          if (self.valid5 === ' ') {
            resolve();
          }
        });
      },
      updatePass () {
        var self = this;
        Promise.all([this.getValid4(), this.getValid5()]).then(function (val) {
          axios('get', '/updatePass',
            {
              email: self.email,
              password: self.password,
              code: self.queryString('b')
            }, data => {
              self.show2 = true;
              if (data.status === 200) {
                //self.title = '登录失败'
                self.content = '账号注册成功，请到填写的邮箱激活，即可立即登陆';
                self.$router.push(`/login`);
              } else {
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
      .desc {
        padding: 10px;
        h4 {
          line-height: 28px;
        }
        p {
          font-size: 14px;
          line-height: 25px;
        }
      }
      .weui-cells {
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
