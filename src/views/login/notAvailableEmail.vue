<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main">
      <group title="重新发送解锁邮件">
        <x-input placeholder="Email"></x-input>
      </group>
      <x-button type="primary" class="submit">重新发送解锁邮件</x-button>
    </div>
  </div>
</template>

<script>
  import { XInput, Group, XButton, Cell, XSwitch, CheckIcon } from 'vux';
  import vheader from '../../components/header/singinHeader';
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
        password: '123465',
        demo1: false,
        password2: '',
        enterText: '',
        valid1: false,
        valid2: false,
        iconType: '',
        be2333: function (value) {
          return {
            valid: value === '2333',
            msg: 'Must be 2333'
          };
        },
        style: '',
        disabledValue: 'hello',
        debounceValue: '',
        maxValue: ''
      };
    },
    methods: {
      getValid1 () {
        this.valid1 = this.$refs.input01.valid;
      },
      getValid2 () {
        this.valid2 = this.$refs.input02.valid;
      },
      change (val) {
        console.log(val);
      },
      onBlur (val) {
        console.log('on blur', val);
      },
      onFocus (val, $event) {
        console.log('on focus', val, $event);
      },
      onEnter (val) {
        console.log('click enter!', val);
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
      .submit {
        margin-top: 20px;
        margin-bottom: 20px;
      }
    }
  }
</style>
