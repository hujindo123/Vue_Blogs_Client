<template>
  <div>
    <div class="vux-1px">
      <x-textarea :placeholder="'说说你的看法'" :max="200" :autosize="true"></x-textarea>
    </div>
    <div class="btn">
      <button class="btns">评论</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { XTextarea } from 'vux'
  export default {
    components: {
      XTextarea
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .btn {
    display: flex;
    justify-content: flex-end;
    .btns {
      background: #f2f2f2;
      height: 30px;
      line-height: 30px;
      margin-top: 15px;
      border-radius: 5px;
      width: 70px;
      border: 0 none;
      font-size: 16px;
      color: #888;
    }
  }

</style>
