<template>
  <div>
    <div class="writerArticle">
      <div class="vux-header  vux-1px-b">
        <x-header>写日志<a slot="right">发表</a></x-header>
      </div>
      <div class="writerArticle_content">
        <x-input :title="'标题'" class="title vux-1px-b"></x-input><!-- -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <form action="" method="post" enctype="multipart/form-data" ref="form" id="uploadFormMulti">
          <input style="display: none" ref="uniqueId" type="file" name="avator" multiple
                 accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')">
        </form>

      </div>
    </div>
    <!--  <div class="writerArticle_bottom vux-1px-t">
        <span class="save">保存至草稿</span>
      </div>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import { quillEditor } from 'vue-quill-editor';
  /*import Quill from 'quill';
   import { ImageResize } from '../modules/ImageResize.js';
   Quill.register('modules/imageResize', ImageResize);*/
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
      quillEditor
    },
    data () {
      return {
        content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
        editorOption: {
          //some quill options
          modules: {
            toolbar: [
              ['image']
            ]
          }
        }
      };
    },
    mounted () {
      var self = this;
      var imgHandler = async function (image) {
        self.addImgRange = self.$refs.myTextEditor.quill.getSelection();
        if (image) {
          var fileInput = self.$refs.uniqueId; //隐藏的file文本ID
          fileInput.click(); //加一个触发事件
          //button is clicked
        }
      };
      self.$refs.myTextEditor.quill.getModule('toolbar').addHandler('image', imgHandler);
    },
    methods: {
      updateData: function (data) {
        //sync content to component
        this.content = data;
      },
      async onEditorBlur (editor) {
        console.log('editor blur!', editor);
      },
      onEditorFocus (editor) {
        console.log('editor focus!', editor);
      },
      onEditorReady (editor) {
        console.log('editor ready!', editor);
      },
      onEditorChange ({quill, html, text}) {
        console.log('editor change!', quill, html, text);
        this.content = html;
      },
      uploadImg: async function (id) {
        debugger;
        var vm = this;
        vm.imageLoading = true;
        var formData = new FormData();//$('#' + id)[0]
        debugger;
        /*try {
          const url = await vm.uploadImgReq(formData);//自定义的图片上传函数
          if (url != null && url.length > 0) {
            var value = url;
            vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection();
            value = value.indexOf('http') !== -1 ? value : 'http:' + value;
            vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange !== null ? vm.addImgRange.index : 0, 'image', value, Quill.sources.USER);
          } else {
            vm.$message.warning('图片增加失败');
          }
          document.getElementById(vm.uniqueId).value = '';
        } catch ({message: msg}) {
          document.getElementById(vm.uniqueId).value = '';
          vm.$message.warning(msg);
        }
        vm.imageLoading = false;*/
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";
  @import '../../../node_modules/quill/dist/quill.core.css';
  @import '../../../node_modules/quill/dist/quill.snow.css';
  @import '../../../node_modules/quill/dist/quill.bubble.css';

  /*  .writerArticle {
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
          img {
            display: block;
            max-width: 100%;
          }
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

    }*/
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>
