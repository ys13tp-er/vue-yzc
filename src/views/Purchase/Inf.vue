<template>
  <div v-if="infdata" class="inf">
    <div class="iHeader">
      <img class="iHeaderImg" :src="'https://img.allchips.com'+infdata.storeLogo.fileUrl">
      <div class="iHeaderCont">
        <p v-text="infdata.storeName"></p>
        <p>在售商品{{infdata.wareTotal}}件</p>
      </div>
    </div>
    <div class="infspace"></div>
    <div class="iIntorduce">
      <div class="iIntorduceInner">
        <p class="iIntorduceInnerL">主要品牌</p>
        <p class="iIntorduceInnerR" v-text="infdata.displayStoreBrands[0].brandName"></p>
      </div>
      <div class="iIntorduceInner">
        <p class="iIntorduceInnerL">主营产品</p>
        <p class="iIntorduceInnerR">
          <span v-for="(item,index) in infdata.majorProducts" v-text="item.wareName + '、'"></span>
        </p>
      </div>
      <div class="iIntorduceInner">
        <p class="iIntorduceInnerL">联系方式</p>
        <p class="iIntorduceInnerR">
          <img src="https://h5.allchips.com/static/images/icons/icon_tel.png" style="display: inline-block;width:13px;margin-right: 2.5px;">
          <span v-text="infdata.tel" style="font-size: 12px;"></span>
        </p>
      </div>
      <div class="iIntorduceInner">
        <p class="iIntorduceInnerL">店铺简介</p>
        <p class="iIntorduceInnerR" v-html="infdata.storeDesc"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: 0,
      infdata: 0
    };
  },
  async created() {
    // 接收路由组建传给我的props
    this.id = this.$route.params.id;
    //   获取主体数据
    let infdataList = await this.$axios.get(
      "http://localhost:3000/mongodbcase/findinfdata",
      {
        params: {
          id: this.id
        }
      }
    );
    // console.log(infdataList);
    this.infdata = infdataList.data[0];
    // console.log(this.infdata);
  }
};
</script>

<style>
/* 头部 */
.inf .iHeader {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
}
.iHeaderImg {
  width: 113px;
  height: 78px;
  border: 1px solid #eee;
  margin-right: 10px;
}
.iHeaderCont {
  margin-top: 6px;
  flex: 1;
}
.iHeaderCont p:nth-child(1) {
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}
.iHeaderCont p:nth-child(2) {
  font-size: 12px;
  color: #666;
  margin-bottom: 5px;
}
.infspace {
  height: 10px;
  width: 100%;
  background: #f6f6f6;
}
.iIntorduce {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
.iIntorduceInner {
  width: 100%;
  padding: 12px 12px 12px 0;
  border-bottom: 0.5px solid #d9d9d9;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.iIntorduceInnerL {
  width: 60px;
  margin-right: 5px;
  font-size: 14px;
  color: #9c9c9c;
  line-height: 20px;
}
.iIntorduceInnerR {
  flex: 1;
  margin-right: 2.5px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
}
</style>
