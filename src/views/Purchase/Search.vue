<template>
  <div>
    <!-- 头部 -->
    <div class="seachheader">
      <van-nav-bar left-arrow @click-left="onClickLeft">
        <van-search slot="title" v-model="value" placeholder="请输入型号/参数" shape="round" @search="onSearch">
          <div slot="right-icon" @click="onSearch">搜索</div>
        </van-search>
        <van-icon name="cart-o" :info="carinfo" slot="right" @click="toCart" />
      </van-nav-bar>
    </div>
    <!-- 底部 -->
    <van-tabbar v-model="active" active-color="#f55d22" inactive-color="#999" border>
      <van-tabbar-item name="home" to="/home" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="qr" to="/qr" icon="qr">分类</van-tabbar-item>
      <van-tabbar-item name="cart" to="/cart" icon="cart-o" :info="carinfo">购物车</van-tabbar-item>
      <van-tabbar-item name="contact" to="/contact" icon="contact">我的硬之城</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 底部导航数据
      active: "home",
      carinfo: "", //为空时不显示，不为空时显示数量角标
      //   搜索
      value: ""
    };
  },
  methods: {
    onClickLeft() {
      // console.log("返回");
      this.$router.push({
        name: "home"
      });
    },
    // 编程式导航:跳转购物车
    toCart() {
      this.$router.push({
        name: "cart"
      });
    },
    onSearch() {}
  }
};
</script>

<style>
.seachheader {
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
}
.seachheader .van-icon {
  font-size: 24px;
  color: #ccc !important;
}
.seachheader .van-search {
  padding: 0 !important;
  padding-top: 5px !important;
}
.seachheader .van-field__right-icon {
  border-left: 1px solid #d9d9d9;
}
</style>
