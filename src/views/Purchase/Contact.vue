<template>
  <div class="contact">
    <!-- 导航菜单 -->
    <div class="navbarnav" :class="{navshow:navisok}">
      <div class="navbarnavcover" @click="clickNavNo"></div>
      <div class="navbarnavmain">
        <div class="navbarnavmainjiao"></div>
        <div class="navbarnavmaincont">
          <van-button icon="wap-home" to="/home">首页</van-button>
          <van-button icon="search" to="/search">搜索</van-button>
          <van-button icon="shopping-cart-o" to="/cart">购物车</van-button>
          <van-button icon="orders-o" to="/oder">我的订单</van-button>
        </div>
      </div>
    </div>
    <!-- 导航栏 -->
    <van-nav-bar class="goodsitem2" title="我的硬之城" left-arrow @click-left="onClickLeft">
      <van-icon name="ellipsis" slot="right" @click="clickNav" />
    </van-nav-bar>
    <!-- main -->
    <div class="contactmian">
      <div class="userInf">
        <img class="userInfImg" src="https://h5.allchips.com/static/images/my/tx.png">
        <p class="userInfP">187username</p>
      </div>
      <div class="userList">
        <div class="userListItem">
          <img src="https://h5.allchips.com/static/images/my/my_list_information.png">
          <p>个人信息</p>
          <van-icon name="arrow" />
        </div>
        <div class="userListItem">
          <img src="https://h5.allchips.com/static/images/my/my_list_account.png">
          <p>账号安全</p>
          <van-icon name="arrow" />
        </div>
        <div class="userListItem" @click="ToOder">
          <img src="https://h5.allchips.com/static/images/my/my_list_order.png">
          <p>我的订单</p>
          <van-icon name="arrow" />
        </div>
        <div class="userListItem">
          <img src="https://h5.allchips.com/static/images/my/my_list_order.png">
          <p>导入明细</p>
          <van-icon name="arrow" />
        </div>
        <div class="userListItem">
          <img src="https://h5.allchips.com/static/images/my/my_list_address.png">
          <p>收货地址管理</p>
          <van-icon name="arrow" />
        </div>
        <div class="userListItem">
          <img src="https://h5.allchips.com/static/images/my/my_list_coupon.png">
          <p>优惠券</p>
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="userOut" @click="quit">
        <p>退出登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      // navbarnav
      navisok: true
    };
  },
  methods: {
    //   nav
    onClickLeft() {
      // console.log("返回");
      this.$router.push({
        name: "home"
      });
    },
    clickNavNo() {
      this.navisok = true;
    },
    clickNav() {
      this.navisok = false;
    },
    quit() {
      Dialog.confirm({
        message: "您真的要退出登录硬之城么?"
      })
        .then(() => {
          // on confirm
          // 清除token与用户信息
          localStorage.clear();
          // console.log("返回");
          this.$router.push({
            name: "home"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    ToOder() {
      // console.log("返回");
      this.$router.push({
        name: "oder"
      });
    }
  }
};
</script>

<style>
.contact {
  background: #f6f6f6;
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.contact .van-nav-bar__title {
  font-size: 18px;
}
.userInf {
  width: 100%;
  padding: 0 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90px;
  background: #fff;
  box-sizing: border-box;
}
.userInfImg {
  width: 60px;
  height: 60px;
  margin-right: 17.5px;
}
.userInfP {
  font-size: 18px;
}

.userList {
  background: #fff;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
.userListItem {
  width: 100%;
  box-sizing: border-box;
  padding-left: 10px;
  border-bottom: 0.5px solid #ddd;
  line-height: 48.5px;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 13px;
  color: #333;
}
.userListItem img {
  width: 24px;
  height: 24px;
  margin-right: 12.5px;
}
.userListItem .van-icon {
  position: absolute;
  top: 50%;
  right: 10px;
  font-size: 15px;
  transform: translateY(-50%);
}
.userOut {
  background: #fff;
  margin-top: 10px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f55d22;
  font-size: 16px;
}
</style>
