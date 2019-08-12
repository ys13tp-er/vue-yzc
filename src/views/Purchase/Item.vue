<template>
  <div class="goodsitem">
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
    <van-sticky>
      <van-nav-bar class="goodsitem2" left-arrow @click-left="onClickLeft">
        <van-icon name="ellipsis" slot="right" @click="clickNav" />
      </van-nav-bar>
    </van-sticky>

    <!-- 内容 -->
    <van-tabs class="itemmain" v-model="active" sticky>
      <van-tab title="商品">
        <div v-if="itemdata" class="itemshop">
          <div class="itemshopmain">
            <van-card :thumb="itemdata.fileUploadPojoList[0].fileUrl">
              <p class="itemshopmaintitle" slot="title" v-text="itemdata.partNumber"></p>
              <div slot="desc">
                <p v-text="'品牌：' + itemdata.brand.cnName"></p>
                <p v-text="'供应商型号：' + itemdata.vendorNumber"></p>
                <p v-text="'商品类别：' + itemdata.categoryList[0].catName"></p>
              </div>
            </van-card>
            <div class="itemshopmainitem">
              <p>
                <span class="itemshopmainitem1-1">参数描述</span>
                <span class="itemshopmainitem1-2" v-text="itemdata.partDesc"></span>
              </p>
            </div>
            <div class="itemshopmainitem">
              <p>
                <span class="itemshopmainitem1-1">库存</span>
                <span class="itemshopmainitem2-2">
                  <p v-if="!carisok" v-text="itemdata.stock"></p>
                  <p v-if="carisok">期货</p>
                  <p>
                    <span>MOQ</span>
                    <span v-text="itemdata.moq"></span>
                  </p>
                  <p>
                    <span>MPQ</span>
                    <span v-text="itemdata.mpq"></span>
                  </p>
                </span>
              </p>
            </div>
            <div class="itemshopmainitem">
              <p>
                <span class="itemshopmainitem1-1">价格</span>
                <span class="itemshopmainitem3-2">
                  <p v-for="(item,index) in itemdata.pricePojoList" :key="index" :class="{ acticeprice: isAP[index].isc }">
                    <span v-text="item.minAmount + '+'">1+</span>
                    <span v-if="itemdata.domesticDelivery" :class="{ acticepricechoies: isAP[index].c }" v-text="'￥' + item.priceCN / 100000"></span>
                    <span v-if="itemdata.hkDelivery" :class="{ acticepricechoies: isAP[index].n }" v-text="'$' + item.priceHK / 100000"></span>
                  </p>
                </span>
              </p>
            </div>
            <div class="itemshopmainitem">
              <p>
                <span class="itemshopmainitem1-1">交货地</span>
                <span class="itemshopmainitem4-2">
                  <van-button plain :class="{ itembtned: !isAP[0].c,itembtn:true }" v-if="itemdata.domesticDelivery" @click="itemadc">大陆({{itemdata.minDeliveryCn}}-{{itemdata.maxDeliveryCn}}工作日)</van-button>
                  <van-button plain :class="{ itembtned: !isAP[0].n,itembtn:true }" v-if="itemdata.hkDelivery" @click="itemadn">香港({{itemdata.minDeliveryHk}}-{{itemdata.maxDeliveryHk}}工作日)</van-button>
                </span>
              </p>
            </div>
            <div class="itemshopmainitem">
              <p>
                <span class="itemshopmainitem1-1">购买数量</span>
                <span class="itemshopmainitem5-2">
                  <van-stepper v-model="itemNub" :min="itemdata.moq" :max="itemdata.stock" :step="itemdata.multiple" input-width="100px" />
                  <span>递增量:{{itemdata.multiple}}</span>
                </span>
              </p>
            </div>
          </div>
          <div class="itemspace"></div>
          <div class="itemshoplink">
            <div class="itemshoplinkImg">
              <img src="https://img.allchips.com/online/product/jQSbQE8XcSr7nzcHCmEEbezebQSfcYk5.jpg" alt="广东华冠半导体有限公司.jpg">
              <p>华冠旗舰-硬之城代营</p>
            </div>
            <p class="itemshoplinkIn" @click="navTo(itemdata.displayStore.id)">进入店铺</p>
          </div>
        </div>
        <div class="itemspace"></div>
        <div class="itemshoptips">上拉查看详情</div>
      </van-tab>
      <!-- 详情 -->
      <van-tab title="详情">
        <van-tabs class="xiangqingnav" v-model="active2" line-height='0'>
          <van-tab title="商品参数">
            <div class="xiangqingbox">
              <div class="xiangqinginner" v-for="(item,index) in itemdata.data" :key="index">
                <p class="xiangqinginnerleft" v-text="item.propertyName"></p>
                <p class="xiangqinginnerright" v-text="item.propertyValue"></p>
              </div>
            </div>
          </van-tab>
          <van-tab title="数据手册">
            <div class="xiangqingbox">
              <div class="xiangqinginner xiangqinginner2" v-for="(item,index) in itemdata.specList" :key="index">
                <img src="https://h5.allchips.com/static/images/icons/list_icon_pdf.png" :alt="item.fileName">
                <p v-text="item.fileName">f</p>
                <span>下载</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="常见问题">
            <div class="xiangqingbox">
              <van-divider class="xiangqingboxtitle">常见问题</van-divider>
              <p class="xiangqingboxQ">1.平台上看到的库存、价格准确吗？</p>
              <p class="xiangqingboxA">答：库存流动性比较大，目前暂时无法做到实时更新，一般24小时内会周期性更新。下单后，建议先与对应店铺的供应商或硬之城在线客服确认订单无误后再付款。</p>
              <p class="xiangqingboxQ">2.可以提供原厂或代理的资质证明吗？</p>
              <p class="xiangqingboxA">答：可直接向入驻我们的原厂或者代理索取，平台上的原厂、代理专属店铺均有开放联系方式；部分自营的数据，因与合作的原厂、代理有保密协议，目前暂不能对外公开信息。</p>
              <p class="xiangqingboxQ">3.你们怎么保证是原厂或代理？</p>
              <p class="xiangqingboxA">答：我们设有专门的部门，对原厂和代理的资质进行严格的审核和认证，供应商上架物料前必须通过资质审核；我们比任何一位客户都注重产品的渠道和质量，对于供应商的审核是非常严格的，您可以放心选择！</p>
              <p class="xiangqingboxQ">4.硬之城平台价格普遍较低，但为什么有某些料价格偏高？</p>
              <p class="xiangqingboxA">答：我们平台品质保障是第一位的！平台上所有产品都是原厂或代理直供的，虽然不能保证每颗料都做到价格最低，但是在质量上，我们有绝对的保障，另外样品和批量的价格也是有差异的。我们也会不断努力，为平台用户争取更好的价格、交期。</p>
              <p class="xiangqingboxQ">5.线上拍单很麻烦，可以走你们线下或代下单吗？</p>
              <p class="xiangqingboxA">答：我们可提供代下单服务，您只需在客户端登陆后，点击“我的订单”进入交易管理中即可见“导入明细”界面,核对无误后全选点击“下单”。另外，在线下单可享受积分换礼，领优惠券，月下单金额超10万，连续下单3个月以上可以获得申请账期的机会，在平台累计信用享受更多折扣等</p>
              <p class="xiangqingboxQ">6.你们平台上的下单流程是什么样的？</p>
              <p class="xiangqingboxA">搜索物料 --> 加入购物车/直接购买 --> 确认地址和发票资料 --> 支付</p>
              <van-divider class="xiangqingboxtitle2">硬之城发展历程</van-divider>
              <img class="xiangqingboxtitle2img" src="https://h5.allchips.com/static/images/item/fzlc.png">
            </div>
          </van-tab>
        </van-tabs>
      </van-tab>
    </van-tabs>
    <!-- 底部 -->
    <van-goods-action class="itemfooter">
      <van-goods-action-icon info="2" icon="cart-o" text="购物车" />
      <van-goods-action-button :disabled="carisok" class="itemfooterBtn1" text="领取样品" />
      <van-goods-action-button :disabled="carisok" class="itemfooterBtn2" text="立即购买" />
      <van-goods-action-button :disabled="carisok" class="itemfooterBtn3" text="加入购物车" />
    </van-goods-action>
  </div>

</template>
<script>
export default {
  data() {
    return {
      // navbarnav
      navisok: true,
      id: 0,
      itemdata: 0,
      active: 0,
      active2: 0,
      itemNub: 1,
      isAP: [],
      carisok: false
    };
  },
  async created() {
    // 接收路由组建传给我的props
    this.id = this.$route.params.id;
    //   获取主体数据
    let itemdataList = await this.$axios.get(
      "http://localhost:3000/mongodbcase/finddata",
      {
        params: {
          aid: this.id
        }
      }
    );
    this.itemdata = itemdataList.data[0];
    // console.log(this.itemdata);
    // isAP
    let arr = [];
    for (var i = 0; i < this.itemdata.pricePojoList.length; i++) {
      arr.push({
        isc: 0,
        c: 0,
        n: 1
      });
    }
    this.isAP = arr;
    // c、n为1时不选择,为0表示选择
    this.carisok = this.itemdata.stock < 0 ? true : false;
  },
  watch: {
    itemNub: function(val, oldVal) {
      for (var i = 0; i < this.isAP.length; i++) {
        if (val >= this.itemdata.pricePojoList[i].minAmount) {
          for (var j = 0; j < this.isAP.length; j++) {
            this.isAP[j].isc = 0;
          }
          this.isAP[i].isc = 1;
        } else {
          break;
        }
      }
    }
  },
  methods: {
    onClickLeft() {
      // console.log("返回");
      this.$router.push({
        name: "home"
      });
    },
    onConfirm() {
      this.$refs.item.toggle();
    },
    clickNav() {
      this.navisok = false;
    },
    clickNavNo() {
      this.navisok = true;
    },
    // 选择交货地
    itemadc() {
      for (var i = 0; i < this.isAP.length; i++) {
        this.isAP[i].c = 0;
        this.isAP[i].n = 1;
      }
    },
    itemadn() {
      for (var i = 0; i < this.isAP.length; i++) {
        this.isAP[i].c = 1;
        this.isAP[i].n = 0;
      }
    },
    // 编程式导航:进入店铺
    navTo(id) {
      this.$router.push({
        name: "inf",
        params: { id }
      });
    }
  }
};
</script>

<style>
.van-nav-bar__left,
.van-nav-bar__right {
  font-size: 26px !important;
}
.van-nav-bar__left .van-icon,
.van-nav-bar__right .van-icon {
  color: #000 !important;
}
/* 菜单 */
.navshow {
  display: none;
}
.navbarnav {
  position: relative;
  z-index: 999;
}
.navbarnavcover {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
  opacity: 1;
  z-index: 1;
}
.navbarnavmain {
  position: fixed;
  padding: 7.5px;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: stretch;
  align-content: flex-start;
  right: 10px;
  top: 30px;
}
.navbarnavmainjiao {
  position: absolute;
  border-radius: 3px;
  width: 15px;
  height: 15px;
  background-color: rgb(34, 34, 34);
  top: 3px;
  transform: scaleX(0.8) rotate(45deg);
  right: 11px;
}
.navbarnavmaincont {
  width: 120px;
  background: #222222;
  border-radius: 5px;
  overflow: hidden;
}
.navbarnavmaincont .van-button {
  background: #222222;
  color: #fff;
  border: none;
  border-bottom: 0.5px solid #434343 !important;
  width: 100%;
  text-align: left;
}
/* main */
.goodsitem2 {
  border-bottom: 1px solid #d9d9d9;
}
.goodsitem .van-tab .van-ellipsis {
  font-size: 18px;
}
.goodsitem .van-tab--active .van-ellipsis {
  color: rgb(245, 93, 34);
  font-weight: bold;
}
.itemmain {
  position: absolute !important;
  width: 100%;
  top: 2px;
  margin-bottom: 50px;
}
.itemmain .van-tabs__wrap {
  width: 250px;
  margin: 0 auto;
  z-index: 1;
}
/* main1 */
.itemshop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}
.itemshopmain {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.itemshopmain .van-card {
  padding: 10px 0 !important;
  border-bottom: 0.5px solid #e6e6e6;
}
.itemshopmain .van-card__thumb {
  margin-right: 10px;
}
.itemshopmaintitle {
  font-size: 16px;
  color: #333;
}
.itemshopmainitem {
  border-bottom: 0.5px solid #e6e6e6;
  padding: 12px 12px 12px 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
.itemshopmain .itemshopmainitem:nth-child(6) {
  border: none;
}
.itemshopmainitem > p {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
.itemshopmainitem1-1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #9c9c9c;
  width: 60px;
  margin-right: 5px;
}
.itemshopmainitem1-2 {
  color: #333333;
  font-size: 14px;
  line-height: 18px;
  width: 265px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.itemshopmainitem2-2 {
  flex: 1;
  color: #333333;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.itemshopmainitem2-2 p:nth-child(1) {
  margin-right: 25px;
}
.itemshopmainitem2-2 p:nth-child(2),
.itemshopmainitem2-2 p:nth-child(3) {
  margin-right: 25px;
}
.itemshopmainitem2-2 p:nth-child(2) span:nth-child(1),
.itemshopmainitem2-2 p:nth-child(3) span:nth-child(1) {
  margin-right: 2.5px;
  color: rgb(153, 153, 153);
}
.itemshopmainitem3-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
}
.itemshopmainitem3-2 p span {
  display: inline-block;
  width: 85px;
}
.itemshopmainitem3-2 .acticeprice {
  color: #f55d22;
}
.itemshopmainitem3-2 p .acticepricechoies {
  color: #000;
}
.itemshopmainitem4-2 {
  flex: 1;
  display: flex;
  justify-content: space-around;
}
.itembtn {
  height: 34px !important;
  border-color: transparent !important;
  color: #000 !important;
  background-color: rgb(246, 246, 246) !important;
  line-height: 34px !important;
  border-radius: 6px !important;
}
.itembtned {
  color: rgb(245, 93, 34) !important;
  border-color: rgb(245, 93, 34) !important;
  background-color: rgb(255, 255, 255) !important;
}
.itemshopmainitem5-2 {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}
.itemshopmainitem5-2 span {
  margin-left: 10px;
  line-height: 28px;
}
.itemspace {
  width: 100%;
  height: 10px;
  background: #f6f6f6;
}
.itemshoplink {
  width: 100%;
  padding: 9px 10px 9px 9px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.itemshoplinkImg {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.itemshoplinkImg img {
  width: 60px;
  height: 42px;
  border: 1px solid #ddd;
}
.itemshoplinkImg p {
  font-size: 16px;
  line-height: 18px;
  margin-left: 11px;
}
.itemshoplinkIn {
  width: 65px;
  height: 20px;
  text-align: center;
  background-image: linear-gradient(270deg, #f55d22 0%, #fb894b 100%);
  border-radius: 2px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  padding-top: 2px;
}
.itemshoptips {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 14px;
}
/* main2 */
.xiangqingnav .van-tabs__wrap {
  width: 100%;
}
.xiangqingnav .van-tab {
  color: #333;
}
.xiangqingnav .van-tab:nth-child(2) {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.xiangqingnav .van-tab .van-ellipsis {
  font-size: 14px;
}
.xiangqingnav .van-tab--active .van-ellipsis {
  color: #f55d22;
  font-weight: normal;
}
.xiangqingbox {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
}
.xiangqinginner {
  padding: 12px 9px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 0.5px solid #d9d9d9;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.xiangqinginnerleft {
  width: 90px;
  color: #9c9c9c;
  font-size: 14px;
  line-height: 16px;
}
.xiangqinginnerright {
  flex: 1;
  color: #333;
  font-size: 13px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.xiangqinginner2 img {
  width: 15px;
  height: 20px;
  margin-right: 10px;
}
.xiangqinginner2 p {
  flex: 1;
  margin-right: 2.5px;
  font-size: 14px;
  line-height: 16px;
}
.xiangqinginner2 span {
  width: 55px;
  height: 25px;
  margin-left: 5px;
  background-color: rgb(255, 80, 0);
  text-align: center;
  line-height: 25px;
  border-radius: 3px;
  color: #fff;
  font-size: 12px;
}
.xiangqingbox .xiangqingboxtitle {
  margin: 0 !important;
  font-size: 16px !important;
}
.xiangqingboxQ {
  color: rgb(51, 51, 51);
  font-size: 12px;
  font-weight: 800;
  margin-top: 10px;
}
.xiangqingboxA {
  color: rgb(102, 102, 102);
  font-size: 12px;
}
.xiangqingbox .xiangqingboxtitle2 {
  margin: 0 !important;
  font-size: 16px !important;
  margin-top: 25px !important;
}
.xiangqingbox .xiangqingboxtitle2img {
  margin-left: 55px;
  margin-top: 20px;
  width: 203px;
  height: 327.5px;
}

/* footer */
.itemfooter .van-goods-action-icon {
  width: 75px;
}
.itemfooter .van-button {
  height: 50px;
  line-height: 50px;
  border-radius: 0px;
}
.itemfooter .itemfooterBtn1 {
  background-color: rgb(254, 232, 208);
  color: rgb(245, 93, 34);
}
.itemfooter .itemfooterBtn2 {
  background-color: rgb(250, 148, 93);
  color: #fff;
}
.itemfooter .itemfooterBtn3 {
  background-color: rgb(245, 93, 34);
  color: #fff;
}
</style>
