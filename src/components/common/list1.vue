<template>
  <div class="list1">
    <div class="list_main vux-1px-b">
      <router-link to="/article">
        <div class="list_row">
          <div class="title">一个小标题</div>
          <div class="img"><img src="https://static.vux.li/demo/3.jpg"/></div>
        </div>
        <div class="time"><span>10小时前</span> <span>83评</span></div>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";
  .list1 {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
    .list_main {
      display: flex;
      flex-flow: column;
      .list_row {
        display: flex;
        flex-flow: row;
        .title {
          flex: 1;
          color: #000;
          font-weight: 600;
        }
        .img {
          width: 32%;
          flex: 0 0 32%;
          img {
            width: 100%;
            display: inline-block;
          }
        }
      }
      .time {
        @include csh(#666, 12px, 1.5);
        padding-bottom: 15px;
        span{
          margin-right: 15px;
        }
      }
    }
  }
</style>
