<template>
    <div class="qr">
        <!-- seach -->
        <div class="qrSearch seachheader">
            <van-nav-bar left-arrow @click-left="onClickLeft">
                <van-search slot="title" v-model="value" readonly placeholder="请输入型号/参数" shape="round" @click="toseach">
                    <div slot="right-icon">搜索</div>
                </van-search>
                <van-icon name="cart-o" :info="carinfo" slot="right" @click="toCart" />
            </van-nav-bar>
        </div>
        <!-- qrmain -->
        <div class="qrmain">
            <div class="qrmainL">
                <van-sidebar v-model="activeKey" @change="qrshow">
                    <van-sidebar-item v-for="(item,index) in qrdata" :key="index" :title="item.curCategory.catName"></van-sidebar-item>
                </van-sidebar>
            </div>
            <div class="qrmainR">
                <div v-if="qrRshow[0]">
                    <div class="qrmainRinner" v-if="qrdata0" v-for="(item,index) in qrdata0" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[1]">
                    <div class="qrmainRinner" v-if="qrdata1" v-for="(item,index) in qrdata1" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[2]">
                    <div class="qrmainRinner" v-if="qrdata2" v-for="(item,index) in qrdata2" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[3]">
                    <div class="qrmainRinner" v-if="qrdata3" v-for="(item,index) in qrdata3" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[4]">
                    <div class="qrmainRinner" v-if="qrdata4" v-for="(item,index) in qrdata4" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[5]">
                    <div class="qrmainRinner" v-if="qrdata5" v-for="(item,index) in qrdata5" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[6]">
                    <div class="qrmainRinner" v-if="qrdata6" v-for="(item,index) in qrdata6" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[7]">
                    <div class="qrmainRinner" v-if="qrdata7" v-for="(item,index) in qrdata7" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[8]">
                    <div class="qrmainRinner" v-if="qrdata8" v-for="(item,index) in qrdata8" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[9]">
                    <div class="qrmainRinner" v-if="qrdata9" v-for="(item,index) in qrdata9" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[10]">
                    <div class="qrmainRinner" v-if="qrdata10" v-for="(item,index) in qrdata10" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[11]">
                    <div class="qrmainRinner" v-if="qrdata11" v-for="(item,index) in qrdata11" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
                <div v-if="qrRshow[12]">
                    <div class="qrmainRinner" v-if="qrdata12" v-for="(item,index) in qrdata12" :key="index">
                        <p class="qrmainRinnerT" v-text="item.curCategory.catName"></p>
                        <div class="qrmainRinnerC">
                            <p v-for="(item2,index2) in item.childCategoryList" :key="index2" v-text="item2.curCategory.catName"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      //   搜索
      value: "",
      carinfo: "", //为空时不显示，不为空时显示数量角标
      //侧导航
      activeKey: 0,
      //  数据
      qrdata: 0,
      qrdata0: 0,
      qrdata1: 0,
      qrdata2: 0,
      qrdata3: 0,
      qrdata4: 0,
      qrdata5: 0,
      qrdata6: 0,
      qrdata7: 0,
      qrdata8: 0,
      qrdata9: 0,
      qrdata10: 0,
      qrdata11: 0,
      qrdata12: 0,
      //   控制显示
      qrRshow: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    };
  },
  async created() {
    // 接收路由组建传给我的props
    this.id = this.$route.params.id;
    //   获取主体数据
    let qrdataList = await this.$axios.get(
      "https://www.easy-mock.com/mock/5d4bbaa3c092f23039a20656/yingZC/qr"
    );
    // console.log(qrdataList);
    this.qrdata = qrdataList.data.data;
    // console.log(this.qrdata);
    this.qrdata0 = qrdataList.data.data[0].childCategoryList;
    this.qrdata1 = qrdataList.data.data[1].childCategoryList;
    this.qrdata2 = qrdataList.data.data[2].childCategoryList;
    this.qrdata3 = qrdataList.data.data[3].childCategoryList;
    this.qrdata4 = qrdataList.data.data[4].childCategoryList;
    this.qrdata5 = qrdataList.data.data[5].childCategoryList;
    this.qrdata6 = qrdataList.data.data[6].childCategoryList;
    this.qrdata7 = qrdataList.data.data[7].childCategoryList;
    this.qrdata8 = qrdataList.data.data[8].childCategoryList;
    this.qrdata9 = qrdataList.data.data[9].childCategoryList;
    this.qrdata10 = qrdataList.data.data[10].childCategoryList;
    this.qrdata11 = qrdataList.data.data[11].childCategoryList;
    this.qrdata12 = qrdataList.data.data[12].childCategoryList;
    // console.log(this.qrdata0);
  },
  methods: {
    onClickLeft() {
      // console.log("返回首页");
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
    // 搜索
    toseach() {
      this.$router.push({
        name: "search"
      });
    },
    // 显示
    qrshow(index) {
      this.qrRshow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.qrRshow[index] = 1;
    }
  }
};
</script>

<style>
.qr {
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
/* header */
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
.qrSearch {
  position: fixed;
}
/* qrmain */
.qrmain {
  margin-top: 47px;
  overflow: hidden;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
}
.qrmainL {
  overflow: auto;
  margin-top: 47px;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
}
.qrmainR {
  overflow: auto;
  margin-top: 47px;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  margin-left: 85px;
  padding-left: 10px;
}
.qrmainRinner {
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
}
.qrmainRinnerT {
  margin: 10px 0;
  color: #333;
  font-size: 14px;
}
.qrmainRinnerC {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.qrmainRinnerC p {
  width: 126px;
  margin-right: 12.5px;
  line-height: 25px;
  font-size: 12px;
  color: #777;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.qr .van-sidebar-item__text {
  text-align: center !important;
  font-size: 14px;
  line-height: 23px;
}
.qr .van-sidebar-item {
  padding-top: 10px !important;
  padding-bottom: 10px !important;
}
</style>