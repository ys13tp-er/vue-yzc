<template>
  <div class="registe">
    <!-- 导航 -->
    <van-nav-bar title="硬之城注册" left-arrow @click-left="ToLogin" />
    <div v-if="!registeInner2isok" class="registeInner">
      <div class="registeInnerTips">
        <van-icon name="volume" />
        <p>新人注册立送528元优惠券大礼包</p>
      </div>
      <div class="loginInput-tel">
        <van-field v-model="username" clearable placeholder="手机号码:13344455566" />
        <div class="loginInputSlider">
          <van-slider v-model="value" active-color="#78c430" @change="wucha" @drag-end="wucha" :disabled="sliderok">
            <van-icon :name="slidericon" slot="button" :color="slidercolor" />
          </van-slider>
        </div>
      </div>
      <div class="registeBtn" @click="registeBtn">
        <p>注册</p>
      </div>
      <div class="registeTip">
        <van-checkbox v-model="checked" checked-color="#f55d22" shape="square" icon-size="16">我已阅读并同意硬之城的 《用户协议》</van-checkbox>
      </div>
    </div>
    <div v-if="registeInner2isok" class="registeInner registeInner2">
      <p class="registeInner2T">输入验证码</p>
      <p class="registeInner2T2">
        <span>验证码已经发送至：</span>
        <span>13344455566</span>
      </p>
      <!-- 密码输入框 -->
      <van-password-input :value="yzvalue" @focus="showKeyboard = true" />
      <van-count-down class="registeInner2timeTips" ref="countDown" :time="time" :format="timeformat" :class="{ red: isRed }" @finish="changeTips" />
      <div v-if="isRed" class="registeInner2timeMa" @click="aginYZ"></div>
      <!-- 数字键盘 -->
      <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false" />
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      value: 9,
      sliderok: false,
      slidericon: "arrow",
      slidercolor: "#dbdbdb",
      // fuxuankuang
      checked: true,
      // 注册标志
      usernameok: false,
      // 密码输入区
      registeInner2isok: false,
      yzvalue: "",
      showKeyboard: true,
      time: 60 * 1000,
      isRed: false,
      timeformat: "请在 ss 秒内输入验证码(123456)"
    };
  },
  watch: {
    username: function(val, oldVal) {
      if (val == "13344455566") {
        this.usernameok = true;
      }
    }
  },
  methods: {
    ToLogin() {
      this.$router.push({
        name: "login"
      });
    },
    wucha: function() {
      if (this.value < 9) {
        this.value = 9;
      } else if (this.value > 91) {
        this.value = 92;
        this.sliderok = true;
        this.slidericon = "success";
        this.slidercolor = "#78c430";
      } else {
        this.value = 9;
      }
    },
    registeBtn: function() {
      if (this.usernameok && this.sliderok) {
        // console.log("可以注册");
        this.registeInner2isok = true;
      } else {
        // console.log("请完善信息");
        Dialog.alert({
          message: "请完善信息"
        }).then(() => {
          // on close
        });
      }
    },
    onInput(key) {
      this.yzvalue = (this.yzvalue + key).slice(0, 6);
      if (this.yzvalue == "123456") {
        // console.log(1);
        // 正确跳转到登录页
        this.$router.push({
          name: "login"
        });
      }
    },
    onDelete() {
      this.yzvalue = this.yzvalue.slice(0, this.yzvalue.length - 1);
    },
    changeTips() {
      this.isRed = !this.isRed;
      this.timeformat = "重新获取验证码";
    },
    aginYZ() {
      // console.log(1);
      this.isRed = false;
      this.timeformat = "请在 ss 秒内输入验证码(123456)";
      this.$refs.countDown.reset();
    }
  }
};
</script>

<style>
.registe {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.registe .van-nav-bar {
  border-bottom: 1px solid #d9d9d9;
}
.registe .van-nav-bar__left .van-icon {
  font-size: 26px;
}
.registeInner {
  padding: 0 17.5px;
  position: relative;
}
.registeInnerTips {
  margin-top: 25px;
  padding-left: 10px;
  box-sizing: border-box;
  background: #fcf6f0;
  color: #f55d22;
  border-radius: 4px;
  height: 30px;
  line-height: 24px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.registeInnerTips .van-icon {
  margin-right: 7px;
}
.registeBtn {
  width: 100%;
  height: 44px;
  margin-top: 22.5px;
  background: #ff5000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  color: #fff;
  font-size: 18px;
}
.registeTip {
  margin-top: 17px;
}
.registeTip .van-checkbox__label {
  font-size: 12px;
}
.registeInner2T {
  width: 100%;
  margin-top: 50px;
  font-size: 20px;
  text-align: center;
  color: #333;
}
.registeInner2T2 {
  margin-top: 22.5px;
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #333;
}
.registeInner2T2 span:nth-child(2) {
  font-size: 16px;
}
.registeInner2 .van-password-input {
  margin: 0;
  margin-top: 12.5px;
}
.registeInner2 .van-password-input__security {
  width: 100%;
  justify-content: space-around;
}
.registeInner2 .van-password-input__security li {
  border: 1px solid #bbb;
  width: 38px;
  height: 38px;
  flex: initial;
}
.registeInner2timeTips {
  margin-top: 22.5px;
  text-align: center;
  font-size: 13px;
}
.red {
  color: #ff7940 !important;
}
.registeInner2timeMa {
  width: 100%;
  height: 40px;
  position: absolute;
  left: 0;
  bottom: 0;
}
</style>
