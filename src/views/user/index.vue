<template>
  <scroller lock-x ref="scrollerBottom">
    <div class="user_message">
      <blur :blur-amount=40 :url="url">
        <i class="iconfont icon-fanhui-" @click="back"></i>
        <p class="center"><img :src="url"></p>
      </blur>
      <flexbox :gutter="0">
        <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%"
                                                                       @click="url = img"/></flexbox-item>
      </flexbox>
      <group title="性别">
        <checker v-model="demo1" default-item-class="user-sex-item" class="user-sex-item"
                 selected-item-class="user-sex-item-selected">
          <checker-item value="1" class="sex">{{ '男'}}</checker-item>
          <checker-item value="2" class="sex">{{ '女'}}</checker-item>
        </checker>
      </group>
      <group>
        <x-input placeholder="名字"></x-input>
      </group>
      <group>
        <datetime v-model="value" @on-change="change" :title="'生日'"></datetime>
      </group>
      <group>
        <x-input placeholder="email"></x-input>
      </group>
      <group>
        <x-address :title="'地址'" v-model="address" :list="ChinaAddressV3Data" placeholder="请选择地址">
          <template slot="title" scope="props">
        <span :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
          <span style="vertical-align:middle;">地址</span>
        </span>
          </template>
        </x-address>
      </group>
    </div>
  </scroller>
</template>

<script type="text/ecmascript-6">
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
  } from 'vux'
  export default {
    data () {
      return {
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        url: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        value: '2017-01-15',
        ChinaAddressV3Data: ChinaAddressV3Data,
        address: [],
        demo1: ''
      }
    },
    methods: {
      change (value) {
        console.log('change', value)
      },
      back () {
        this.$router.go(-1)
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
      ChinaAddressV3Data
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .user_message {
    @include wh(100%, 100%);
    box-sizing: border-box;
    padding-bottom: 150px;
    overflow: hidden;
    .iconfont {
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
      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: 4px solid #ececec;
      }
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
