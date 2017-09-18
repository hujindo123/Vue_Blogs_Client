<template>
  <div class="comment_component">
    <div class="title">最热评论</div>
    <div class="comment_message">
      <div class="user_header">
        <img src="/static/test/234990-13122611215343.jpg" alt="">
      </div>
      <div class="message">
        <div class="username">吉人自有天相</div>
        <div class="time">8小时前</div>
        <div class="content">
          拜金女，活踩死！不值半包手纸的，还卫生巾了！
        </div>
        <div class="action">
          <div class="item vux-1px"><i class="iconfont icon-dianzan"></i><span>1</span></div>
          <div class="item  vux-1px" @click="showdown"><i class="iconfont icon-pinglun2"></i><span>回复</span></div>
        </div>
        <Vtextarea class="vtextarea" :class="{'showText': showText}"></Vtextarea>
      </div>
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import Vtextarea from './textarea';
  export default {
    data () {
      return {
        showText: false
      };
    },
    components: {
      Vtextarea
    },
    methods: {
      showdown () {
        this.showText = !this.showText;
      }
    }
  };
</script>


<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .comment_component {
    padding-top: 10px;
    box-sizing: border-box;
    .title {
      padding-top: 10px;
      &:before {
        @include wh(4px, 15px);
        content: " ";
        display: inline-block;
        vertical-align: middle;
        @include bg();
        margin-right: 8px;
      }
    }
    .comment_message {
      display: flex;
      flex-flow: row;
      margin-top: 10px;
      .user_header {
        width: 40px;
        height: 40px;
        overflow: hidden;
        flex: 0 0 40px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .message {
        flex: 1;
        padding-left: 10px;
        box-sizing: border-box;
        .vtextarea {
          display: none;
        }
        .username {
          padding: 3px 0;
          font-size: 13px;
        }
        .time {
          @include csh(#888, 12px, 1.5);
        }
        .content {
          padding-top: 10px;
          font-size: 15px;
        }
        .action {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          margin-bottom: 20px;
          .item {
            border-radius: 3px;
            padding: 0 5px;
            height: 20px;
            line-height: 22px;
            font-size: 12px;
            margin-left: 20px;
            color: #93afca;
            .iconfont {
              font-size: 12px;
            }
            span {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
</style>
