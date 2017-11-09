<template>
  <div class="register" v-if="this.$route.params.account">
    <vheader></vheader>
    <div class="active_main">
      <div class="nickname">尊敬的 {{this.$route.params.account}}</div>
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
  import { actives } from 'src/service/getData';
  import vheader from 'src/components/header/singinHeader';
  import { Alert } from 'vux';
  export default {
    components: {
      vheader,
      Alert
    },
    data () {
      return {
        show2: false,
        content: ''
      };
    },
    methods: {
      async active () {
        let result;
        result = await actives(this.$route.params.account, this.$route.params.code);
        this.show2 = true;
        this.content = result.message;
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
