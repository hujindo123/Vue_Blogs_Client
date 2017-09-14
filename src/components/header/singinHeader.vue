<template>
  <div class="register_header">
    江 湖
    <div class="header_c">
      <router-link to="/register">注册</router-link>
      <router-link to="/login">登录</router-link>
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";
  .register {
    .register_header {
      @include wh(100%, 40px);
      box-sizing: border-box;
      text-align: center;
      @include csh(#fff,18px,40px);
      position: relative;
      @include bg();
      .header_c{
        position: absolute;
        height: 30px;
        right: 10px;
        top: 0;
        a{
          @include csh(#fff,14px,40px);
          margin-left: 10px;
          text-decoration: none;
        }
      }
    }
  }
</style>
