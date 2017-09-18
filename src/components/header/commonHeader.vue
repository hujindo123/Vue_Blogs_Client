<template>
  <div class="cm_header">
    <div class="header">
      <div class="top">
        <div class="title">咚咚</div>
        <div class="user">
          <router-link to="/user">
            <i class="iconfont  icon-yonghu"></i>
          </router-link>
        </div>
      </div>
      <div class="nav">
        <router-link @click.prevent="showTab" to="/itemGame" class="item">游戏</router-link>
        <router-link to="/itemNews" class="item">科学</router-link>
        <router-link to="/1" class="item">教育</router-link>
        <router-link to="/2" class="item">娱乐</router-link>
        <router-link to="/3" class="item">娱乐</router-link>
        <span class="item" @click="showTab()" :class="{'more': active}"><i class="iconfont icon-jiantou2"></i></span>
      </div>
    </div>
    <div class="more_tab vux-1px-t" :class="{'translate': active}">
      <navList></navList>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import navList from '../../components/header/navList';

  export default {
    data () {
      return {
        active: false
      };
    },
    components: {
      navList
    },

    methods: {
      showTab () {
        this.active = !this.active;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .cm_header {
    display: flex;
    flex-flow: column;
    background: #fff;
    .header {
      @include wh(100%, 77px);
      background: #fff;
      position: relative;
      .top {
        @include wh(100%, 44px);
        position: relative;
        @include bg();
        background-image: url(//mat1.gtimg.com/www/mobi/2017/image/siteheader-skin-default.svg);
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 120%;
        .title {
          @include csh(#fff, 18px, 44px);
          text-align: center;
          letter-spacing: 5px;
        }
        .user {
          position: absolute;
          right: 13px;
          top: 50%;
          transform: translateY(-50%);
          .icon-yonghu {
            @include wh(30px, 30px);
            @include csh(#fff, 25px, 30px);
          }
        }
      }
      .nav {
        @include wh(100%, 33px);
        @include csh(#2f2f2f, 12px, 33px);
        overflow: hidden;
        position: relative;
        .item {
          width: 16.6%;
          text-align: center;
          float: left;
          @include csh(#666, 16px, 33px);
          transition: all 0.3s ease;
          &.more {
            transform: rotate(180deg);
          }
        }
      }
    }
    .more_tab {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 77px;
      box-sizing: border-box;
      padding-top: 15px;
      background: #f6f6f6;
      right: -100%;
      z-index: 1000;
      transition: all 0.5s ease;
      &.translate {
        transform: translateX(-100%);
      }
    }
  }
</style>
