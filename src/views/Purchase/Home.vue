<template>
  <div class="home">
    <!-- 切换弹窗 -->
    <van-dialog v-model="userchangeshow" title="切换角色" show-cancel-button>
      <div class="cbox">
        <div :class="{cboxinner:true,cboxinnered:cboxinneredshow[0]}" @click="userchangePc">
          <img src="https://h5.allchips.com/static/images/tp_purchase-big.png">
          <p>我是采购</p>
        </div>
        <div :class="{cboxinner:true,cboxinnered:cboxinneredshow[1]}" @click="userchangeMg">
          <img src="https://h5.allchips.com/static/images/tp_engineer_big.png">
          <p>我是工程师</p>
        </div>
      </div>
    </van-dialog>
    <!-- 头部 -->
    <van-sticky @scroll="hdsearchSc" class="hdsticky">
      <van-row type="flex" justify="space-between" align="center" class="hdsearch" :style="{background:hdbgc}">
        <van-col span="4" class="userchange">
          <div @click="userchangebtn" style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
            <van-icon name="exchange" />
            <p>切换角色</p>
          </div>
        </van-col>
        <van-col span="20">
          <van-search v-model="value" readonly placeholder="搜索硬之城商品" :background="hdbgc" shape="round" @click="toseach">
            <img slot="label" src="https://h5.allchips.com/static/images/logo.png" style="width: 19px;height: 19px;border-right: 1px solid #c7c7c7;padding: 0 6px;margin-top:7.5px;">
          </van-search>
        </van-col>
      </van-row>
    </van-sticky>
    <!-- main -->
    <div class="homemain">
      <!-- banner -->
      <div class="banner">
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item, index) in adBanners" :key="index">
            <a :href="item.adUrl">
              <img class="bannerimg" :src="require(`@/${item.picUrl}`)" :alt="item.adName">
            </a>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 优势品牌 -->
      <div class="advantageBrand">
        <p class="advantageBrandP">优势品牌</p>
        <div class="advantageBrandNav">
          <div class="advantageBrandImg">
            <div class="advantageBrandImgItem" v-for="(item, index) in purchaseHomeDataPojo.superiorityBrandList" :key="index">
              <img :src="item.siteData.picUrl" :alt="item.data.cnName">
              <p v-text="item.siteData.dataContent"></p>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新入驻 -->
      <div class="newShop">
        <p class="newShopP">最新入驻</p>
        <div class="newShopNav">
          <a class="newShopItem" v-for="(item, index) in purchaseHomeDataPojo.newestDisplayStoreList" :key="index" @click="navToinf(item.siteData.dataId)" :data-id="item.siteData.dataId">
            <img :src="item.siteData.picUrl" :alt="item.data.storeName">
            <p v-text="item.data.storeName"></p>
          </a>
        </div>
      </div>
      <!-- 热门商品 -->
      <div class="hotGoods">
        <p class="hotGoodsP">热门商品</p>
        <div class="hotGoodsLists" v-for="(item, index) in purchaseHomeDataPojo.hotWareList" :key="index" @click="navTo(item.siteData.dataId)" :data-id="item.siteData.dataId">
          <van-image class="hotGoodsImg" width="80" height="80" fit="cover" :src="item.siteData.picUrl" />
          <div class="hotGoodsDcr">
            <p v-text="item.data.partNumber"></p>
            <p v-text="item.data.brandName"></p>
            <p v-text="item.data.partDesc"></p>
            <p>
              <span>￥</span>
              <span v-text="item.data.pricePojoList[0].priceCN / 100000"></span>
            </p>
          </div>
        </div>
      </div>

    </div>
    <!-- 底部 -->
    <van-tabbar class="bottomnav" v-model="active" route active-color="#f55d22" inactive-color="#999" border>
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
      // 用户切换
      userchangeshow: false,
      cboxinneredshow: [1, 0],
      // 头部数据
      value: "",
      hdbgc: "#f55d22",
      // 底部导航数据
      active: "home",
      carinfo: "", //为空时不显示，不为空时显示数量角标
      // 主体main数据
      // 轮播图
      adBanners: [],
      // 主体数据
      purchaseHomeDataPojo: []
    };
  },
  async created() {
    //   获取banner数据
    let adBannersList = await this.$axios(
      "https://www.easy-mock.com/mock/5d4bbaa3c092f23039a20656/yingZC/homebanner"
    );
    this.adBanners = adBannersList.data.adBanners;
    //   获取主体数据
    let purchaseHomeDataPojoList = await this.$axios(
      "https://www.easy-mock.com/mock/5d4bbaa3c092f23039a20656/yingZC/homemain"
    );
    // console.log(purchaseHomeDataPojoList.data);
    this.purchaseHomeDataPojo = purchaseHomeDataPojoList.data;
  },
  methods: {
    // 用户切换
    userchangebtn() {
      this.userchangeshow = !this.userchangeshow;
    },
    userchangePc() {
      this.cboxinneredshow = [1, 0];
    },
    userchangeMg() {
      this.cboxinneredshow = [0, 1];
    },
    // 搜索
    toseach() {
      this.$router.push({
        name: "search"
      });
    },
    // 编程式导航:跳转详情页
    navTo(id) {
      this.$router.push({
        name: "item",
        params: { id }
      });
    },
    // 不吸顶时背景透明
    hdsearchSc(scrollisok) {
      if (!scrollisok.isFixed) {
        this.hdbgc = "#f55d2200";
      } else {
        this.hdbgc = "#f55d22";
      }
    },
    // 编程式导航:进入店铺
    navToinf(id) {
      this.$router.push({
        name: "inf",
        params: { id }
      });
    }
  }
};
</script>

<style>
.home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
/* 头部 */
.van-search__label {
  line-height: 26px !important;
}
.hdsticky {
  position: absolute;
  width: 100%;
  z-index: 99;
}
.hdsearch {
  width: 100%;
  height: 54px;
  display: flex;
  color: #fff;
}
.userchange {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.userchange .van-icon {
  font-size: 16px;
}
.userchange p {
  font-size: 12px;
}
/* main */
.homemain {
  background: #eee;
  margin-bottom: 51px;
}
/* 轮播图图片 */
.van-swipe-item .bannerimg {
  width: 100%;
}
/* 优质品牌 */
.advantageBrandP {
  font-size: 16px;
  color: #333333;
  margin-left: 10px;
  margin-top: 13px;
}
.advantageBrandNav {
  width: 355px;
  height: 140px;
  margin-left: 9px;
  margin-top: 10px;
}
.advantageBrandImg {
  width: 100%;
  height: 124px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-template-rows: 50% 50%;
  grid-gap: 0.5px;
}
.advantageBrandImgItem {
  width: 100%;
  height: 100%;
  position: relative;
}
.advantageBrandImgItem img {
  width: 100%;
  height: 100%;
}
.advantageBrandImgItem p {
  width: 13px;
  font-size: 12px;
  color: #fff;
  background: #e84859;
  padding: 0 2px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 80;
}
.advantageBrandImgItem:nth-child(6) p {
  background: #76be75;
}
.advantageBrandImgItem:nth-child(7) p {
  background: #eb7d4e;
}
/* 最新入驻 */
.newShop {
  width: 100%;
}
.newShopP {
  font-size: 16px;
  color: #333333;
  margin-left: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: left;
}
.newShopNav {
  width: 100%;
  height: 95px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
}
.newShopItem {
  width: 23%;
  height: 100%;
  background: #fff;
}
.newShopItem img {
  height: 60px;
  width: 100%;
}
.newShopItem p {
  width: 100%;
  height: 0.93333rem;
  background-color: #fafafa;
  font-size: 0.26667rem;
  color: #333333;
  text-align: center;
  align-items: center;
}
/* 热门商品 */
.hotGoods {
  width: 100%;
  background: #fff;
  overflow: hidden;
}
.hotGoodsP {
  font-size: 16px;
  letter-spacing: 0px;
  color: #333333;
  padding-left: 10px;
  margin-top: 15px;
  text-align: left;
}
.hotGoodsLists {
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  margin-bottom: 2.5px;
  display: flex;
}
.hotGoodsImg {
  border: 0.8px solid #e6e6e6;
}
.hotGoodsDcr {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 10px;
  box-sizing: border-box;
  flex: 1;
}
.hotGoodsDcr p:nth-child(1) {
  font-size: 16px;
  line-height: 18px;
  width: 265px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hotGoodsDcr p:nth-child(2) {
  font-size: 12px;
  line-height: 16px;
  width: 265px;
  color: #666;
  margin-top: 5px;
}
.hotGoodsDcr p:nth-child(3) {
  font-size: 12px;
  line-height: 16px;
  width: 265px;
  color: #999;
  margin-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.hotGoodsDcr p:nth-child(4) {
  display: flex;
  flex-direction: row;
  width: 265px;
  align-items: baseline;
  margin-top: 5px;
  box-sizing: border-box;
  color: #f55d22;
}
.hotGoodsDcr p:nth-child(4) span:nth-child(1) {
  font-size: 10px;
  line-height: 12px;
}
.hotGoodsDcr p:nth-child(4) span:nth-child(2) {
  font-size: 16px;
  line-height: 18px;
}

/* 底部 */
.bottomnav {
  border-top: 1px solid #e3e3e3;
}
.van-tabbar-item__icon {
  font-size: 24px !important;
}
.van-tabbar-item__text {
  font-size: 10px !important;
  line-height: 6px !important;
}
/* 切换角色 */
.cbox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
}
.cboxinner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 123px;
  height: 163px;
  border: 1px solid #eee;
  margin-top: 10px;
}
.cboxinner img {
  width: 90px;
  height: 90px;
}
.cboxinner p {
  width: 100%;
  color: #333;
  margin-top: 17.5px;
  text-align: center;
  font-size: 12px;
}
.cboxinnered {
  background-color: #fcf5f2;
  border-color: #f55d22;
  color: #f55d22;
}
.cboxinnered p {
  color: #f55d22;
}
</style>

