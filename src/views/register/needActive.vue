<template>
  <div class="register" v-if="this.$route.params.account">
    <vheader></vheader>
    <div class="active_main">
      <div class="nickname">尊敬的 {{this.$route.params.account}}</div>
      <div>
        感谢您使用江湖。
        <div>
          请前往邮箱验证，来激活您的江湖服务账户
        </div>
      </div>
      <group>
        <Cell :title="'未收到邮件，重新发送邮件'" @click.native="updateEmailCode"></Cell>
      </group>
    </div>
    <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
  </div>
</template>

<script type="text/ecmascript-6">
  import { Group, Cell, Alert } from 'vux';
  import { updateEmailCode } from 'src/service/getData';
  import vheader from 'src/components/header/singinHeader';
  export default {
    components: {
      vheader,
      Group,
      Cell,
      Alert
    },
    data () {
      return {
        show2: false,
        content: '',
        block: false
      };
    },
    created () {},
    methods: {
      async updateEmailCode () {
        let result;
        try {
          result = await updateEmailCode(this.$route.params.account);
          this.show2 = true;
          this.content = result.message;
        } catch (err) {
          this.show2 = true;
          this.content = err.message;
        }
        //var self = this;
        /*if (!self.block) {
         axios('get', '/updateEmailCode', {
         account: self.username
         }, data => {
         self.show2 = true;
         if (data.status === 200) {
         self.content = '发送成功，请到填写的邮箱激活，即可立即登陆';
         } else {
         self.content = data.message;
         }
         });
         }
         self.block = true;
         setTimeout(() => {
         self.block = false;
         }, 5000);*/
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
