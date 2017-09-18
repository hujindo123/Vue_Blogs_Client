<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <group title="忘记了密码？">
        <x-input placeholder="Email" class="yzmInput"></x-input>
      </group>
      <group>
        <div class="yzm">
          <x-input placeholder="验证码" class="yzmInput"></x-input>
          <div class="yzmButtons vux-1px-l" @click="getCaptchas"><img :src="captchas"/></div>
        </div>
      </group>
      <x-button type="primary" class="submit">找回密码</x-button>
    </div>
  </div>
</template>

<script>
  import { axios } from '@/router/config';
  import { XInput, Group, XButton, Cell, XSwitch, CheckIcon } from 'vux';
  import vheader from '@/components/header/singinHeader';
  export default {
    components: {
      vheader,
      XSwitch,
      XInput,
      XButton,
      Group,
      CheckIcon,
      Cell
    },
    data () {
      return {
        validCode: '', //验证码
        valid6: '',
        captchas: ''
      };
    },
    created () {
      this.getCaptchas();
    },
    methods: {
      getCaptchas () {
        var self = this;
        axios('get', '/getCaptchas', {}, data => {
          if (data.code === 200) {
            self.captchas = data.data;
          }
        });
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/mixin";

  .register {
    display: flex;
    flex-flow: column;
    @include wh(100%, 100%);
    position: relative;
    .wrapper_main {
      flex: 1;
      .yzm {
        display: flex;
        flex-flow: row;
        align-items: center;
        .yzmInput {
          flex: 1;
        }
        .yzmButtons {
          width: 100px;
          flex: 0 0 100px;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
        }
      }
      .submit {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
</style>
