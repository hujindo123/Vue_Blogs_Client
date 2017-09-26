<template>
  <div style="width: 100%;height: 100%">
    <div class="container" v-show="panel">
      <img id="image" :src="url" alt="Picture">
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    <scroller lock-x ref="scrollerBottom" v-if="message">
      <div class="user_message">
        <blur :blur-amount=20 :url="url">
          <i class="iconfont icon-fanhui-" @click="back"></i>
          <div class="center">
            <div class="header_btton">
              <div class="picture" v-if="headerImage" :style="'backgroundImage:url('+headerImage+')'"></div>
              <div class="picture" v-if="!headerImage" :style="'backgroundImage:url('+url+')'"></div>
              <input type="file" id="change" name="file" accept="image/png,image/gif,image/jpeg" @change="change">
            </div>
            <div class="desc">
              <span class="nickname">{{message.nickname}}</span>
              <i class="iconfont icon-xingbie-nv" v-if="message.sex==0"></i>
              <i class="iconfont icon-xingbie-nan" v-if="message.sex==1"></i>
            </div>
            <div class="bjxx" @click="show = true"><i class="iconfont icon-xiugai"></i> 编辑信息</div>
          </div>
        </blur>
        <flexbox :gutter="0">
          <flexbox-item v-for="(img, index) in images" :key="index">
            <img :src="img" style="width:100%" @click="url = img"/>
          </flexbox-item>
        </flexbox>
        <group>
          <x-input title="出生日期" :value="message.birthday" text-align="right" readonly="readonly">
          </x-input>
        </group>
        <group>
          <x-input title="Email" :value="message.email" text-align="right" readonly="readonly"></x-input>
        </group>
        <group>
          <x-address :title="'地址'" :value="message.area" :list="ChinaAddressV3Data"></x-address>
        </group>
      </div>
    </scroller>
    <update v-show="show" :message="message"></update>
  </div>


</template>

<script type="text/ecmascript-6">
  const ERROR_OK = 200;
  import { axios } from '@/router/config';
  import Cropper from 'cropperjs';
  import update from '@/components/user/updateMessage';
  import {
    Scroller,
    Flexbox,
    FlexboxItem,
    Blur,
    Group,
    Checker,
    CheckerItem,
    XInput,
    XButton,
    Datetime,
    XAddress,
    ChinaAddressV3Data
  } from 'vux';
  export default {
    data () {
      return {
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        ChinaAddressV3Data: ChinaAddressV3Data,
        message: {},
        headerImage: '',
        address: '', //北京市东城区'
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        show: false
      };
    },
    mounted () {
      //初始化这个裁剪框
      let self = this;
      let image = document.getElementById('image');
      self.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        background: false,
        zoomable: false,
        ready: function () {
          self.croppable = true;
        }
      });
      self.getUserMessage();
    },
    methods: {
      /*图片*/
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
        //每次替换图片要重新得到新的url
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
        var context = canvas.getContext('2d');
        var width = sourceCanvas.width;
        var height = sourceCanvas.height;

        canvas.width = width;
        canvas.height = height;

        context.imageSmoothingEnabled = true;
        context.drawImage(sourceCanvas, 0, 0, width, height);
        context.globalCompositeOperation = 'destination-in';
        context.beginPath();
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
        context.fill();

        return canvas;
      },
      /*图片-end*/
      postImg (t) {
        let pic = t.split(',')[1];
        /*let config = {
         headers: {'Content-Type': 'multipart/form-data'}
         };*/
        let formData = new FormData();
        formData.append('file', pic);
        axios('put', '/updateImg', formData, data => {});
      },
      getUserMessage () {
        var self = this;
        axios('get', '/getUserMessage', {}, data => {
          if (data.status === ERROR_OK) {
            self.message = data.data;
          }
        });
      },
      back () {
        this.$router.go(-1);
      }
    },
    components: {
      Scroller,
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
      ChinaAddressV3Data,
      update
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    z-index: 99;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, 1);
    .cropper-crop-box,
    .cropper-modal {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
    #button {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 80px;
      height: 40px;
      border: none;
      border-radius: 5px;
      background: white;
    }
  }

  .user_message {
    @include wh(100%, 100%);
    box-sizing: border-box;
    overflow: hidden;
    .icon-fanhui- {
      position: absolute;
      padding: 10px;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 23px;
    }
    .center {
      text-align: center;
      padding-top: 20px;
      color: #fff;
      font-size: 18px;
      .header_btton {
        margin: 0 auto;
        width: 100px;
        height: 100px;
        position: relative;
        overflow: hidden;
        .picture {
          width: 100px;
          height: 100px;
          margin: 0 auto;
          box-sizing: border-box;
          border-radius: 50%;
          border: 4px solid #ececec;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        #change {
          width: 100px;
          height: 100px;
          position: absolute;
          left: 0;
          top: 0;
          opacity: 0;
        }
      }
      .desc {
        font-size: 15px;
        margin-top: 5px;
        .iconfont{
          margin-left: 10px;
          &.icon-xingbie-nan {
            color: #1296db;
          }
          &.icon-xingbie-nv {
            color: #d4237a;
          }
        }
      }
      .bjxx {
        margin: 8px auto 0;
        width: 80px;
        padding: 3px;
        border: 1px solid #c7c7c7;
        border-radius: 15px;
        font-size: 12px;
      }

    }
    input {
      color: #999;
    }
    .user-sex-item {
      border: 1px solid #ececec;
      padding: 5px 15px;
      .sex {
        display: inline-block;
        margin-left: 20%
      }
    }

    .user-sex-item-selected {
      @include border()
    }
  }

</style>
