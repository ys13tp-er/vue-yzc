<template>
  <div class="login">
    <div class="loginInput">
      <div v-if="ptshow" class="loginInput-pass">
        <van-field v-model="username" clearable placeholder="手机号码/邮箱(13344455566)" />
        <van-field v-model="password" clearable type="password" placeholder="密码(123456)">
          <p class="nopassword" slot="right-icon">忘记密码</p>
        </van-field>
      </div>
      <div v-if="!ptshow" class="loginInput-tel">
        <van-field v-model="username" clearable placeholder="手机号码(13344455566)" />
        <div class="loginInputSlider">
          <van-slider v-model="value" active-color="#78c430" @change="wucha" @drag-end="wucha" :disabled="sliderok">
            <van-icon :name="slidericon" slot="button" :color="slidercolor" />
          </van-slider>
        </div>
        <van-field v-model="sms" center clearable placeholder="手机验证码(123456)">
          <van-button slot="button" size="small" type="primary">获取验证码</van-button>
        </van-field>
      </div>
    </div>
    <div class="loginBtn" @click="loginBtn">
      <p>登录</p>
    </div>
    <div class="loginTips">
      <p v-if="ptshow" @click="loginchangeT">密码登录</p>
      <p v-if="!ptshow" @click="loginchangeT">短信验证码登录</p>
      <p @click="ToRegiste">手机快速注册</p>
    </div>
    <div class="loginOther">
      <van-divider :style="{ color: '#000', borderColor: '#ccc', padding: '0 16px' }">
        其他方式登录
      </van-divider>
      <div class="loginOtherTC">
        <img src="https://h5.allchips.com/static/images/icons/login-qq.png">
        <p>QQ登陆</p>
      </div>
      <div class="loginOtherAttantion">
        <p>登录即代表您已同意</p>
        <a href="https://h5.allchips.com/passport/protocol.html">用户协议</a>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      //   出现
      ptshow: true,
      //   滑块
      value: 9,
      sliderok: false,
      slidericon: "arrow",
      slidercolor: "#dbdbdb"
    };
  },
  methods: {
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
    loginchangeT: function() {
      this.ptshow = !this.ptshow;
    },
    ToRegiste() {
      // console.log("返回");
      this.$router.push({
        name: "registe"
      });
    },
    // 登录
    loginBtn() {
      // console.log(11);
      if (this.ptshow) {
        // 密码
        if (this.username == "13344455566" && this.password == "123456") {
          // console.log("密码通过");
          // 存储用户名和token
          localStorage.setItem("username", this.username);
          // 假装是返回的token
          localStorage.setItem("token", "abcdefghijklmn");
          // 跳转首页
          this.$router.push({
            name: "home"
          });
        } else {
          Dialog.alert({
            message: "请输入正确信息"
          }).then(() => {
            // on close
          });
        }
      } else {
        // 验证码
        if (
          this.username == "13344455566" &&
          this.sms == "123456" &&
          this.sliderok
        ) {
          // console.log("验证码通过");
          // 存储用户名和token
          localStorage.setItem("username", this.username);
          // 假装是返回的token
          localStorage.setItem("token", "abcdefghijklmn");
          // 跳转首页
          this.$router.push({
            name: "home"
          });
        } else {
          Dialog.alert({
            message: "请输入正确信息"
          }).then(() => {
            // on close
          });
        }
      }
    }
  }
};
</script>

<style>
.login {
  overflow: auto;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 17.5px;
}
.loginInput {
  margin-top: 25px;
  overflow: hidden;
}
.loginInput-pass .van-field {
  background: #eee;
  padding: 0;
  padding-left: 12.5px;
  margin-top: 17.5px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.nopassword {
  padding: 0 10px;
  width: 52px;
  border-left: 1px solid #ddd;
  font-size: 13px;
  color: #666;
}
.loginInput-tel .van-field {
  background: #eee;
  padding: 0;
  padding-left: 12.5px;
  margin-top: 17.5px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.loginInput-tel .loginInputSlider {
  width: 100%;
  height: 72.5px;
  padding: 0 15px;
  padding-top: 17.5px;
  box-sizing: border-box;
}
.loginInput-tel .van-slider {
  width: 100%;
  height: 40px;
  border-radius: 4px;
}
.loginInput-tel .van-slider--disabled {
  opacity: 1;
}
.loginInput-tel .van-slider__bar {
  height: 40px !important;
  border-radius: 4px;
}
.loginInput-tel .van-slider__button-wrapper {
  line-height: 16px;
  height: 40px;
  width: 52px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: #fff;
}
.loginInput-tel .van-icon {
  font-size: 26px;
  color: #dbdbdb;
}
.loginBtn {
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
.loginTips {
  margin-top: 10px;
  width: 100%;
  font-size: 14px;
  line-height: 16px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.loginOther {
  margin-top: 110px;
  width: 100%;
}
.loginOtherTC {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
.loginOtherTC img {
  width: 35px;
  height: 35px;
}
.loginOtherTC p {
  margin-top: 2.5px;
  color: #666;
  font-size: 12px;
}
.loginOtherAttantion {
  margin-top: 40px;
  margin-bottom: 17.5px;
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  color: #999;
}
.loginOtherAttantion a {
  color: #f55d22;
}
</style>
