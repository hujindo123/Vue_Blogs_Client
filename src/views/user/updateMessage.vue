<template>
  <div class="updateMessage">
    <group title="修改信息">
      <x-input title="昵称" v-model="nickname"></x-input>
    </group>
    <group>
      <div class="sex">
        <checker default-item-class="demo5" v-model="sex" selected-item-class="demo5-selected">
          <checker-item :key="'男'" :value="1">男</checker-item>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <checker-item :key="'女'" :value="0">女</checker-item>
        </checker>
      </div>
    </group>
    <group>
      <datetime v-model="birthday" :min-year=1950 :max-year=2010 format="YYYY-MM-DD"
                :title="'生日'"></datetime>
    </group>
    <group>
      <x-address :title="'地址'" v-model="address" raw-value :popup-style="style" :list="ChinaAddressV3Data"
                 placeholder="请选择地址">
      </x-address>
    </group>
    <alert v-model="show2" :content="content"></alert> <!--:title="title"-->
    <x-button type="primary" class="submit" @click.native="setMessage" action-type="button">保存</x-button>
    <x-button type="default" class="submit" @click.native="back" action-type="button">返回</x-button>
  </div>
</template>

<script type="text/ecmascript-6">
  const ERROR_OK = 200;
  import { getUserMessage, setMessage } from 'src/service/getData';
  import {
    Group,
    XInput,
    Datetime,
    XButton,
    XAddress,
    Checker,
    CheckerItem,
    ChinaAddressV3Data,
    Alert,
    Value2nameFilter as value2name
  } from 'vux';
  export default {
    data () {
      return {
        nickname: '',
        birthday: '',
        sex: '',
        address: [], //北京市东城区
        ChinaAddressV3Data: ChinaAddressV3Data,
        show2: false,
        content: '',
        style: {
          'z-index': 2000
        }
      };
    },
    components: {
      Group,
      Checker,
      CheckerItem,
      XInput,
      XButton,
      Datetime,
      XAddress,
      Alert,
      ChinaAddressV3Data
    },
    created () {
      this.initData();
    },
    methods: {
      async initData () {
        try {
          let result = await getUserMessage();
          if (result.status === ERROR_OK) {
            this.nickname = result.data.nickname;
            this.sex = Number(result.data.sex);
            this.birthday = result.data.birthday;
            this.address = [result.data.province, result.data.city, result.data.area];
          } else {
            this.show2 = true;
            throw new Error(result.message);
          }
        } catch (e) {
          this.content = e.message;
        }
      },
      async setMessage () {
        const self = this;
        if (self.nickname === '' || self.nickname === undefined || self.nickname === null) {
          self.show2 = true;
          self.content = '用户名不能为空';
        } else {
          let result = await setMessage(this.nickname, this.sex, this.birthday, value2name(self.address, ChinaAddressV3Data).split(' ')[0], value2name(self.address, ChinaAddressV3Data).split(' ')[1], value2name(self.address, ChinaAddressV3Data).split(' ')[2]);
          /*if (data.status === ERROR_OK) {
           self.back();
           }*/
        }
      },
      back () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .updateMessage {
    @include wh(100%, 100%);
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    overflow: hidden;
    input {
      color: #999;
      font-size: 16px;
    }
    .sex {
      justify-content: space-around;
      align-items: flex-end;
      flex: 1;
      display: flex;
      justify-items: center;
      padding: 10px 0;
      .demo5 {
        width: 100px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        border-radius: 6px;
        border: 1px solid #ffd748;
        background-color: #fff;
        display: inline-block;
      }
      .demo5-selected {
        background: #ffffff url(../../../static/img/choice.png) no-repeat right bottom;
        background-size: contain;
      }
    }
    .submit {
      box-sizing: border-box;
      display: inline-block;
      margin-left: 6.4%;
      width: 40%;
      margin-top: 40px;
      margin-bottom: 20px;
      &.weui-btn_default:not(.weui-btn_disabled):active {
        color: #535353;
        background-color: #eaeaea;
      }
    }
  }
</style>
