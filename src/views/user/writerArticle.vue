<template>
  <div class="writerArticle">
    <x-header>写日志<a slot="right">发表</a></x-header>
    <scroller lock-x ref="scrollerBottom">
      <div class="writerArticle_content">
        <x-input :placeholder="'标题'"></x-input>
        <x-textarea  autosize name="description" :placeholder="'内容'"></x-textarea>
      </div>
    </scroller>
    <div class="writerArticle_bottom"></div>
  </div>


</template>

<script type="text/ecmascript-6">
  import {
    XHeader,
    Scroller,
    XTextarea,
    Cell,
    Flexbox,
    Badge,
    FlexboxItem,
    Blur,
    Group,
    Checker,
    CheckerItem,
    XInput,
    XButton,
    Datetime,
    XAddress,
    ChinaAddressV3Data,
    Box,
    Icon
  } from 'vux';
  export default {
    components: {
      XHeader,
      Scroller,
      XTextarea,
      Cell,
      Box,
      Badge,
      Icon,
      Blur,
      Flexbox,
      FlexboxItem,
      Group,
      Checker,
      CheckerItem,
      XInput,
      XButton,
      Datetime,
      XAddress,
      ChinaAddressV3Data
    },
    methods: {}
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .writerArticle {
    @include wh(100%, 100%);
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-flow: column;
    overflow: hidden;
    color: #666;
    font-size: 16px;
    background: #dedede;
    .vux-header {
      @include wh(100%, 46px);
      background: #fff;
      flex: 0 0 46px;
      top: 0;
      left: 0;
      z-index: 0;
      .vux-header-title {
        color: #000;
      }
      .vux-header-left, .vux-header-right {
        color: #000;
        font-size: 16px;
      }
      .vux-header-left {
        a {
          color: #000;
        }
        .left-arrow:before{
          border: 0;
          width: 0;
        }
        .vux-header-back{
          padding: 0;
        }
      }
      .vux-header-right a {
        color: #000;
      }
    }
    .writerArticle_content {
      flex: 1;
      padding-bottom: 92px;
    }
    .writerArticle_bottom {
      @include wh(100%, 46px);
      background: red;
      flex: 0 0 46px;
    }
  }

</style>
