<template>
  <div class="register">
    <vheader></vheader>
    <div class="active_main">
      <div>
        Hi,

        感谢您注册七牛云服务。
        该邮箱已激活，请不要重复操作
        立即登录

      </div>
      <button class="submit" @click="active">立即激活</button>
    </div>
    <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { axios } from '@/router/config';
  import vheader from '@/components/header/singinHeader';
  import { Alert } from 'vux';
  import Base64 from 'js-base64';
  export default {
    components: {
      vheader,
      Alert
    },
    data () {
      return {
        href: '',
        username: '',
        code: '',
        show2: false,
        content: ''
      };
    },
    created () {
      const b = Base64.Base64;
      this.username = b.decode(this.queryString('a'));
      this.code = this.queryString('b');
    },
    methods: {
      queryString (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        let r = window.location.search.substr(1).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      },
      active () {
        var self = this;
        axios('get', '/actives', {
          account: self.username,
          code: self.code
        }, data => {
          if (data.status === 200) {
            if (data.code === 1) {
              //已激活
            } else if (data.code === 2) {
              //激活成功
            }
          } else {
            self.show2 = true;
            self.content = data.message;
          }
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
    .active_main {
      padding: 10px;
      @include csh(#494949, 14px, 1.8);
      .nickname {
        text-indent: 1em;
        @include csh(#1989fa, 16px, 2)
      }
      .submit {
        display: block;
        margin: 20px auto;
        width: 80%;
        color: #fff;
        @include bg();
        outline: none;
        border: 0;
        padding: 8px;
        border-radius: 5px;
        font-size: 18px;
      }
      .submit:active {
        @include bg-active();
      }
    }
  }
</style>
