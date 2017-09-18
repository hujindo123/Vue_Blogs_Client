<template>

  <div class="article">
    <!-- 头部 -->
    <div class="top vux-1px-b">
      <i class="iconfont icon-fanhui-" @click="back"></i>
      <i class="iconfont icon-daohang" @click="showTab()"></i>
    </div>
    <!-- 文章 -->
    <scroller lock-x ref="scrollerBottom">
      <div class="article_main">
        <h1 class="title">她是收视女王，常被丈夫暴打，离婚后人财两空，却被世界冠军捧在手心</h1>
        <div class="author_time"><span>雨过恬晴</span>2017-08-28 04:15</div>
        <div class="article_content">
          <p>不管是80后还是90后，记忆里肯定会有几部有关爱情和乡村的电视剧，《趟过河的男人》《搭错车》这些剧名是不是听着莫名熟悉。其实这两部剧的主演都是一个人，李琳。</p>
          <p>不管是80后还是90后，记忆里肯定会有几部有关爱情和乡村的电视剧，《趟过河的男人》《搭错车》这些剧名是不是听着莫名熟悉。其实这两部剧的主演都是一个人，李琳。</p>
          <p>不管是80后还是90后，记忆里肯定会有几部有关爱情和乡村的电视剧，《趟过河的男人》《搭错车》这些剧名是不是听着莫名熟悉。其实这两部剧的主演都是一个人，李琳。</p>
          <p>不管是80后还是90后，记忆里肯定会有几部有关爱情和乡村的电视剧，《趟过河的男人》《搭错车》这些剧名是不是听着莫名熟悉。其实这两部剧的主演都是一个人，李琳。</p>
          <p>不管是80后还是90后，记忆里肯定会有几部有关爱情和乡村的电视剧，《趟过河的男人》《搭错车》这些剧名是不是听着莫名熟悉。其实这两部剧的主演都是一个人，李琳。</p>
          <img src="https://static.vux.li/demo/3.jpg" alt="">
          <span class="img-total">图1/5</span>
          <img src="https://static.vux.li/demo/3.jpg" alt="">
          <span class="img-total">图1/5</span>
          <img src="https://static.vux.li/demo/3.jpg" alt="">
          <span class="img-total">图1/5</span>
          <img src="https://static.vux.li/demo/3.jpg" alt="">
          <span class="img-total">图1/5</span>
        </div>
      </div>
    </scroller>
    <!-- 发表评论按钮 -->
    <div class="userlun vux-1px-t">
      <div @click="showComment" class="vux-1px-r tbas"><i class="iconfont icon-pinglun1"></i><span>写评论</span></div>
      <div @click="showComment" class="tbas"><i class="iconfont icon-pinglun2"></i><span>3</span></div>
    </div>
    <!-- 更多导航 -->
    <div class="more_tab" :class="{'translate': active}">
      <navList></navList>
    </div>
    <!-- 评论 -->
    <div class="comment" :class="{'commentActive': commentActive}">
      <div class="comment_top vux-1px-b">
        <i class="iconfont icon-fanhui-" @click="commentActive=false"></i>
        评论 <span>(2)</span>
      </div>
      <scroller lock-x ref="scrollerBottom">
        <div>
          <div class="textarea">
            <Vtextarea></Vtextarea>
          </div>
          <div class="comment_list vux-1px-t">
            <comment></comment>
            <comment></comment>
            <comment></comment>
            <comment></comment>
            <comment></comment>
          </div>
        </div>
      </scroller>
    </div>
  </div>


</template>

<script type="text/ecmascript-6">
  import { Scroller, Group } from 'vux';
  import navList from '../components/header/navList';
  import comment from '../components/comment/comment';
  import Vtextarea from '../components/comment/textarea';
  export default {
    data () {
      return {
        active: false,
        commentActive: false
      };
    },
    components: {
      Group,
      Scroller,
      navList,
      comment,
      Vtextarea
    },

    methods: {
      showTab () {
        this.active = !this.active;
      },
      showComment () {
        this.commentActive = true;
      },
      back () {
        this.active === true ? this.active = false : this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/mixin";

  .article {
    @include wh(100%, 100%);
    .top {
      @include wh(100%, 47px);
      line-height: 47px;
      padding: 0 12px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      .iconfont {
        display: inline-block;
        @include csh(#666, 24px, 47px);
        &.icon-daohang {
          position: absolute;
          padding-right: 16px;
          right: 0;
        }
      }
    }
    .article_main {
      width: 100%;
      padding: 0 15px 150px 15px;
      box-sizing: border-box;
      .title {
        padding: 20px 0;
        @include csh(#222, 22px, 1.3);
        letter-spacing: 2px;
      }
      .author_time {
        @include csh(#545454, 12px, l .3);
        span {
          margin-right: 10px;
        }
      }
      .article_content {
        padding: 20px 0 0 0;
        word-wrap: break-word;
        word-break: break-all;
        text-align: justify;
        color: #222;
        font-size: 16px;
        img {
          display: inline-block;
          width: 100%;
          height: 200px;
          margin-top: 10px;
        }
      }
    }
    .userlun {
      @include wh(100%, 48px);
      position: fixed;
      background: #fff;
      bottom: 0;
      left: 0;
      padding: 12px;
      margin-top: 150px;
      box-sizing: border-box;
      .tbas {
        width: 50%;
        text-align: center;
        float: left;
        color: #222 !important;
        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
    .more_tab {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 47px;
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
    .comment {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      box-sizing: border-box;
      background: #fff;
      right: -100%;
      z-index: 1000;
      transition: all 0.5s ease;
      overflow: hidden;
      &.commentActive {
        transform: translateX(-100%);
      }
      .comment_top {
        @include wh(100%, 47px);
        line-height: 47px;
        text-align: center;
        box-sizing: border-box;
        position: relative;
        font-size: 20px;
        .iconfont {
          font-size: 24px;
          position: absolute;
          left: 0;
        }
        span {
          font-size: 18px;
        }
      }
      .textarea{
        width: 90%;
        margin: 10px auto;
      }
      .comment_list{
        clear: both;
        margin-top: 80px;
        padding: 12px 12px 150px 12px;
      }
    }
  }
</style>
