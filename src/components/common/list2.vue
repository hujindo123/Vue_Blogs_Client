<template>
  <div class="list2">
    <div class="list_main vux-1px-b">
      <div class="list_row">
        <div class="title">一个小标题</div>
        <div class="img">
          <img src="https://static.vux.li/demo/3.jpg"/>
          <img src="https://static.vux.li/demo/3.jpg"/>
          <img src="https://static.vux.li/demo/3.jpg"/>
        </div>
      </div>
      <div class="time"><span>10小时前</span> <span>83评</span></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .list2 {
    width: 100%;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
    .list_main {
      display: flex;
      flex-flow: column;
      .list_row {
        display: flex;
        flex-flow: column;
        .title {
          flex: 1;
          color: #000;
          font-weight: 600;
        }
        .img {
          margin: 10px 0;
          flex: 1;
          width: 100%;
          font-size: 0;
          justify-content: space-between;
          img {
            width: 32%;
            margin-right: 2%;
            flex: 0 0 1;
            display: inline-block;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
      .time {
        @include csh(#666, 12px, 1.5);
        padding-bottom: 15px;
        span {
          margin-right: 15px;
        }
      }
    }
  }
</style>
