<template>
  <div style="width: 100%;height: 100%">
    <cmheader></cmheader>
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

<script type="text/ecmascript-6">
  import cmheader from '@/components/header/commonHeader';
  export default {
    components: {
      cmheader
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
