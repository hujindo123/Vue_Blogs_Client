<template>
  <div class="writerArticle">
    <div class="vux-header  vux-1px-b">
      <x-header>写日志<a slot="right">发表</a></x-header>
    </div>
    <div class="writerArticle_content">
      <x-input :title="'标题'" class="title vux-1px-b"></x-input>
      <editor :content="content" class="needsclick" :height="txtHeight()" :z-index="3000" :auto-height="false"
              @change="updateData"></editor>
    </div>
    <div class="writerArticle_bottom vux-1px-t">
      <span class="save">保存至草稿</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueHtml5Editor from 'vue-html5-editor';
  const editor = new VueHtml5Editor({
    language: 'zh-cn',
    hiddenModules: [
      'color',
      'text',
      'font',
      'link',
      'tabulation',
      'info',
      'undo',
      'hr',
      'eraser',
      'unlink'
    ],
    icons: {
      text: 'fa fa-pencil',
      color: 'fa fa-paint-brush',
      font: 'fa fa-font',
      align: 'fa fa-align-justify',
      list: 'fa fa-list',
      link: 'fa fa-chain',
      unlink: 'fa fa-chain-broken',
      tabulation: 'fa fa-table',
      image: 'fa fa-file-image-o',
      hr: 'fa fa-minus',
      eraser: 'fa fa-eraser',
      undo: 'fa-undo fa',
      'full-screen': 'fa fa-arrows-alt',
      info: 'fa fa-info'
    },
    visibleModules: [
      'text',
      'color',
      'font',
      'align',
      'list',
      'link',
      'unlink',
      'tabulation',
      'image',
      'hr',
      'eraser',
      'undo',
      'full-screen',
      'info'
    ],
    //配置图片模块
    //config image module
    image: {
      //文件最大体积，单位字节  max file size
      sizeLimit: 512 * 1024,
      //上传参数,默认把图片转为base64而不上传
      //upload config,default null and convert image to base64
      upload: {
        url: null,
        headers: {},
        params: {},
        fieldName: {}
      },
      //压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩
      //compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG)
      //set null to disable compression
      compress: {
        width: 1600,
        height: 1600,
        quality: 80
      },
      //响应数据处理,最终返回图片链接
      //handle response data，return image url
      uploadHandler (responseText) {
        //default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"}
        var json = JSON.parse(responseText);
        if (!json.ok) {
          alert(json.msg);
        } else {
          return json.data;
        }
      }
    }
  });
  import {
    XHeader,
    Scroller,
    Cell,
    Badge,
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
      Cell,
      Box,
      Badge,
      Icon,
      Blur,
      Group,
      Checker,
      CheckerItem,
      XInput,
      XButton,
      Datetime,
      XAddress,
      ChinaAddressV3Data,
      editor
    },
    data () {
      return {
        txtHeight: function () {
          let $height = document.body.clientHeight;
          $height = $height - 46 * 3 - 37;//3个group和一个padding
          return $height;
        },
        content: 'Hello World!'
      };
    },
    mounted () {
      console.log(this.txtHeight());
    },
    methods: {
      updateData: function (data) {
        //sync content to component
        this.content = data;
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
    background: #fff;
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
      .title {
        flex: 0 0 30px;
      }
      .needsclick {
        border: 0;
        border-radius: 0;
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

  }

</style>
