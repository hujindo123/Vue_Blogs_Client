<template>
  <div class="writerArticle">
    <x-header>写日志<a slot="right">发表</a></x-header>
    <div class="writerArticle_content">
      <x-input :title="'标题'" class="title vux-1px-b"></x-input>
      <x-textarea :height="txtHeight" name="description" placeholder='正文' class="txt"></x-textarea>
    </div>
    <div class="writerArticle_bottom">
    </div>
    <!-- 遮罩层 -->
    <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    <div style="padding:20px;">
      <div class="show">
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'">
        </div>
      </div>
      <div>
        <input type="file" id="change" name="file" accept="image/png,image/gif,image/jpeg" @change="change">
      </div>
    </div>
    <span class="save">保存至草稿</span>
  </div>


</template>

<script type="text/ecmascript-6">
  import Cropper from 'cropperjs';
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
    data () {
      return {
        txtHeight: '',
        headerImage: '',
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        url: ''
      };
    },
    mounted () {
      //const $height = document.body.clientHeight;
      this.txtHeight = 30;  //$height - 46 * 3 - 20;//3个group和一个padding
      console.log(this.txtHeight);
      //初始化这个裁剪框
      //var self = this;
      var image = document.getElementById('image');
      this.cropper = new Cropper(image);
    },
    methods: {
      getObjectURL (file) {
        var url = null;
        if (window.createObjectURL !== undefined) { //basic
          url = window.createObjectURL(file);
          console.log(url);
        } else if (window.URL !== undefined) { //mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { //webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },
      change (e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.panel = true;
        this.picValue = files[0];
        this.url = this.getObjectURL(this.picValue);
        //每次替换图片要重新得到新的urls
        if (this.cropper) {
          this.cropper.replace(this.url);
        }
        this.panel = true;
      },
      crop () {
        this.panel = false;
        var croppedCanvas;
        var roundedCanvas;

        if (!this.croppable) {
          return;
        }
        //Crop
        croppedCanvas = this.cropper.getCroppedCanvas();
        //Round
        roundedCanvas = this.getRoundedCanvas(croppedCanvas);

        this.headerImage = roundedCanvas.toDataURL();
        this.postImg(this.headerImage);
      },
      getRoundedCanvas (sourceCanvas) {
        var canvas = document.createElement('canvas');
        //var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        //context.imageSmoothingEnabled = true;
        //context.drawImage(sourceCanvas, 0, 0, width, height);
        //context.globalCompositeOperation = 'destination-in';
        //context.beginPath();
        //context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
       //context.fill();

        return canvas;
      },
      postImg (t) {
        debugger;
      }
    }
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
        .left-arrow:before {
          border: 0;
          width: 0;
        }
        .vux-header-back {
          padding: 0;
        }
      }
      .vux-header-right a {
        color: #000;
      }
    }
    .writerArticle_content {
      flex: 1;
      flex-flow: column;
      box-sizing: border-box;
      .title {
        flex: 0 0 30px;
      }
      textarea {
        background: #dedede;
        -webkit-overflow-scrolling: touch;
      }
    }
    .writerArticle_bottom {
      @include wh(100%, 46px);
      background: #fff;
      flex: 0 0 46px;
      line-height: 46px;
      position: relative;
      .icon-tupian {
        font-size: 26px;
        vertical-align: middle;
        margin-left: 30px;
        .file {
          @include wh(86px, 46px);
          position: absolute;
          left: 0;
          opacity: 0;
        }
      }
      .save {
        float: right;
        margin-right: 30px;
        text-align: right;
      }
    }
    #demo #button {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 80px;
      height: 40px;
      border: none;
      border-radius: 5px;
      background: white;
    }

    #demo .show {
      width: 100px;
      height: 100px;
      overflow: hidden;
      position: relative;
      border-radius: 50%;
      border: 1px solid #d5d5d5;
    }

    #demo .picture {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    #demo .container {
      z-index: 99;
      position: fixed;
      padding-top: 60px;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 1);
    }

    #demo #image {
      max-width: 100%;
    }
  }

</style>
