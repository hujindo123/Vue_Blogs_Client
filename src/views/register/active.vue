<template>
  <div class="register"  v-if="!username">
    <vheader></vheader>
    <div class="active_main">
      <div class="nickname">尊敬的 {{username}}</div>
      <div>
        感谢您使用江湖。
        <div>
          请点击以下链接进行邮箱验证，以便开始使用您的江湖服务账户：
        </div>
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
      if (this.queryString('a')) {
        this.username = b.decode(this.queryString('a'));
        this.code = this.queryString('b');
      }
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
            if (data.code === 1 || data.code === 2) {
              //已激活 && 激活成功
              self.$route.push('/login');
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
