<template>
  <div class="register">
    <vheader></vheader>
    <div class="hasActive">
      <div>Hi,</div>
      <div> 感谢您注册江湖服务。</div>
      <div> 该邮箱已激活，请不要重复操作</div>
      <router-link to="/login" class="submit" >立即登录</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import vheader from '@/components/header/singinHeader';
  export default {
    components: {
      vheader
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
    .hasActive{
      padding: 10px;
      @include csh(#494949, 16px, 1.8);
      text-align: center;
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
