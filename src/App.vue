<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "../src/assets/theme.less";
  @import '~vux/src/styles/1px.less';
  body {
    padding: 0;
    margin: 0;
    background-color: #fbf9fe;
    font-family: Helvetica ;
  }
  #app{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
</style>
