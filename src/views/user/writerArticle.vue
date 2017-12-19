<template>
  <div class="writerArticle">
    <ViewBox>
      <div>
        <div class="vux-header  vux-1px-b">
          <x-header>写日志<a slot="right">发表</a></x-header>
        </div>
        <div class="writerArticle_content">
          <x-input :title="'标题'" class="title vux-1px-b"></x-input><!-- -->
          <vue-editor id="editor"
                      :editorToolbar="customToolbar"
                      useCustomImageHandler
                      @imageAdded="handleImageAdded" v-model="htmlForEditor">
          </vue-editor>
        </div>
      </div>
    </ViewBox>
  </div>
</template>
<script type="text/ecmascript-6">
  import { VueEditor } from 'vue2-editor';
  import { updateImg } from 'src/service/getData';
  import axios from 'axios';
  /*import Quill from 'quill';
   import { ImageResize } from '../modules/ImageResize.js';
   Quill.register('modules/imageResize', ImageResize);*/
  import {
    XHeader,
    Scroller,
    ViewBox,
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
      ViewBox,
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
      VueEditor
    },
    data () {
      return {
        htmlForEditor: '开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap开发项目，原来的富文本使用的是基于jquery的ckeditor.js，现在用vue需要将项目重新翻新，使用的是vue1.0的版本，求介绍一款vue富文本插件，UI风格类似bootstrap',
        customToolbar: [
          /*['bold', 'italic', 'underline'],
           [{'list': 'ordered'}, {'list': 'bullet'}],*/
          ['image'] /*'code-block'*/
        ]
      };
    },
    mounted () {
      document.getElementById('file-upload').setAttribute('enctype', 'multipart/form-data');
      document.getElementById('file-upload').setAttribute('accept', 'image/*');
    },
    methods: {
      update (e) {   //上传照片
        var self = this;
        let file = e.target.files[0];
        /*eslint-disable no-undef */
        let param = new FormData();  //创建form对象
        param.append('file', file, file.name);  //通过append向form对象添加数据
        param.append('chunk', '0'); //添加form表单中其他数据
        console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        };
        axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        //添加请求头
        axios.post('http://172.16.0.61:3001/updateImg', param, config)
          .then(response => {
            if (response.data.code === 0) {
              self.ImgUrl = response.data.data;
            }
            console.log(response.data);
          });
      },
      handleImageAdded (file, Editor, cursorLocation) {
        //An example of using FormData
        //NOTE: Your key could be different such as:
        //formData.append('file', file)
        var formData = new FormData();
        formData.append('type', 1);//通过append向form对象添加数据
        formData.append('images', file);
        axios({
          url: 'http://172.16.0.61:3001/updateImg',
          method: 'POST',
          data: formData
        }).then(result => {
          let url = this.imageUrl + result.data.url; //Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
        }).catch(err => {
          console.log(err);
        });
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
    flex-flow: column;
    color: #666;
    font-size: 16px;
    background: #fff;
    .vux-header {
      @include wh(100%, 46px);
      background: #fff;
      flex: 0 0 46px;
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
      display: flex;
      flex-flow: column;
      flex: 1;
      .title {
        flex: 0 0 30px;
      }
      .quillWrapper {
        flex: 1;
        display: flex;
        flex-flow: column;
        .ql-toolbar {
          width: 100%;
          flex: 0 0 50px;
          border: 0;
          &:after {
            width: 120%;
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            right: 0;
            height: 1px;
            border-bottom: 1px solid #C7C7C7;
            color: #C7C7C7;
            -webkit-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
          }
        }
        .ql-container {
          border: 0;
          flex: 1;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
