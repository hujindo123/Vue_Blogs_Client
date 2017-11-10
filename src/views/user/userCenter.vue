<template>
  <div style="width: 100%;height: 100%">
    <div class="container" v-show="panel">
      <img id="image" :src="url" alt="Picture">
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    <scroller lock-x ref="scrollerBottom" v-if="message">
      <div class="user_message">
        <blur :blur-amount=20 @click.nactive="changgeBackground" :url="headerImage?headerImage:url">
          <i class="iconfont icon-fanhui-" @click="back"></i>
          <div class="center">
            <div class="header_btton">
              <div class="picture"
                   :style="headerImage?'backgroundImage:url('+headerImage+')':'backgroundImage:url('+url+')'"></div>
              <input type="file" id="change" name="file" accept="image/png,image/gif,image/jpeg" @change="change">
            </div>
            <div class="desc">
              <span class="nickname">{{message.nickname}}</span>
              <i class="iconfont icon-xingbie-nv" v-if="message.sex==0"></i>
              <i class="iconfont icon-xingbie-nan" v-if="message.sex==1"></i>
            </div>
            <router-link to="/updateMessage">
              <div class="bjxx" @click="show = true"><i class="iconfont icon-xiugai"></i> 编辑信息</div>
            </router-link>
          </div>
        </blur>
        <!--  <flexbox :gutter="0">
            <flexbox-item v-for="(img, index) in images" :key="index">
              <img :src="img" style="width:100%" @click="url = img"/>
            </flexbox-item>
          </flexbox>-->
        <group>
          <cell :title="'写文章'" link="/writerArticle">
            <div slot="icon" class="iconfont icon-xiugai icon"></div>
          </cell>
        </group>
        <group>
          <cell :title="'我的文章'" is-link>
            <div slot="icon" class="iconfont icon-shiliangzhinengduixiang icon"
                 style="display:block;margin-right:15px;"></div>
          </cell>
        </group>
        <group>
          <cell :title="'消息'" is-link>
            <div slot="icon" class="iconfont icon-xiaoxi icon"></div>
            <div class="badge-value" slot="value">
              <span class="vertical-middle">新消息&nbsp;</span>
              <badge text="8"></badge>
            </div>
          </cell>
        </group>
        <group>
          <cell :title="'关于'" is-link>
            <div slot="icon" class="iconfont icon-guanyu icon"></div>
          </cell>
        </group>
        <group>
          <x-input title="出生日期" :value="message.birthday" text-align="right" readonly="readonly">
          </x-input>
        </group>
        <group>
          <x-input title="Email" :value="message.email" text-align="right" readonly="readonly"></x-input>
        </group>
        <group>
          <x-input title="地址" :value="address" text-align="right" readonly="readonly"></x-input>
        </group>
      </div>
      <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
    </scroller>
  </div>


</template>

<script type="text/ecmascript-6">
  //const ERROR_OK = 200;
  import Cropper from 'cropperjs';
  import { getUserMessage } from 'src/service/getData';
  import {
    Cell,
    Scroller,
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
    Icon,
    Alert
  } from 'vux';
  export default {
    data () {
      return {
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        ChinaAddressV3Data: ChinaAddressV3Data,
        message: '',
        address: '',
        headerImage: '',
        picValue: '',
        cropper: '',
        croppable: false,
        panel: false,
        show: false,
        show2: false,
        content: ''
      };
    },
    components: {
      Cell,
      Box,
      Badge,
      Icon,
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
      ChinaAddressV3Data
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
      self.initData();
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
        formData.append('userId', sessionStorage.getItem('userId'));
        //console.log('userId' + formData.get('userId')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        this.axios('put', '/updateImg', formData, data => {
          sessionStorage.setItem('header', data.data.header);
        });
      },
      async initData () {
        try {
          let result = await getUserMessage();
          this.message = result.data;
          this.show2 = true;
          if (result.status === 200) {
            this.content = result.message;
            //this.$router.push(`/needActive/${result.data.account}`);
          } else {
            console.log(result);
            throw new Error(result.message);
          }
        } catch (e) {
          this.content = e.message;
        }
      },
     /*getUserMessage () {
        var self = this;
        this.axios('get', '/getUserMessage', {}, data => {
          if (data.status === ERROR_OK) {
            self.message = data.data;
            self.address = `${self.message.province} ${self.message.city} ${self.message.area}`;
            self.headerImage = self.message.header.length > 0 ? self.QiNiu + self.message.header : self.message.header;
          }
        });
      },*/
      back () {
        this.$router.go(-1);
      }
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
    color: #666;
    .icon {
      margin-right: 15px;
      font-size: 20px;
    }
    .icon-fanhui- {
      position: absolute;
      padding: 10px;
      top: 0;
      left: 0;
      color: #fff;
      font-size: 23px;
      margin-right: 0;
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
        height: 17px;
        .iconfont {
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
        color: #fff;
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
