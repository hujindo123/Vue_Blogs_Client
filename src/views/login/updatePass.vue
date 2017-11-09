<template>
  <div class="register">
    <vheader></vheader>
    <div class="wrapper_main" v-if="this.$route.params.email && this.$route.params.code">
      <div class="desc">
        <h4>Hi, {{this.$route.params.email}}</h4>
        <p> 请输入您的新密码进行重置操作。</p>
      </div>
      <group>
        <x-input placeholder="密码" required type="password" @on-change="passValid" v-model="password"></x-input>
      </group>
      <p class="yz">{{valid4}}</p>
      <group>
        <x-input placeholder="确认密码" required type="password" @on-change="rpassValid" v-model="rpwd"></x-input>
      </group>
      <p class="yz">{{valid5}}</p>
      <x-button type="primary" class="submit" @click.native="updatePass">重置密码</x-button>
    </div>
    <alert v-model="alert.show2" :content="alert.content" @on-hide="onHide"></alert> <!--:title="title"-->
  </div>
</template>

<script>
  import { updatePass } from 'src/service/getData';
  import { XInput, Group, XButton, Alert } from 'vux';
  import vheader from 'src/components/header/singinHeader';
  export default {
    components: {
      vheader,
      Group,
      XInput,
      XButton,
      Alert
    },
    data () {
      return {
        email: '',
        password: '',
        rpwd: '',
        valid4: '',
        valid5: '',
        alert: {
          content: '',
          show2: false,
          status: false
        }
      };
    },
    methods: {
      passValid () {
        let patt = /^[a-zA-Z0-9]{4,16}$/;
        if (!patt.test(this.password)) {
          this.valid4 = '必须是4到16位字母或数字组成';
          return false;
        }
        this.valid4 = '';
        return true;
      },
      rpassValid () {
        if (this.password !== this.rpwd) {
          this.valid5 = '密码不一致  ';
          return false;
        }
        this.valid5 = '';
        return true;
      },
      async updatePass () {
        if (this.passValid() && this.rpassValid()) {
          try {
            let result = await updatePass(this.$route.params.email, this.$route.params.code, this.password);
            this.alert.show2 = true;
            this.alert.content = result.message;
          } catch (err) {
            this.alert.show2 = true;
            this.alert.content = '请重新打开连接';
          }
        }
      },
      onHide () {
        if (this.alert.status) {
          this.$router.push(`/login`);
        }
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
      .desc {
        padding: 10px;
        h4 {
          line-height: 28px;
        }
        p {
          font-size: 14px;
          line-height: 25px;
        }
      }
      .weui-cells {
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
  }
</style>
