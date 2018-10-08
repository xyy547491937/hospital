<template>
 <div>
    <!-- 为你推荐 -->
    <div class="reforyou">
        <div class="reforyou-title">
            <div class="title-text">为您推荐</div>
            <img class="title-img" src="http://img.meiduduo.com/images/info/wan.png" alt="">
        </div>
        <div class="reforyou-swiper">
            <!-- <scroll-view scroll-x> -->
                <div class="reforyou-box" style="overflow-x:scroll;margin:0">
                    <div :style="{width:scrollWidth}">
                        <div v-for="(item,index) in recomList" @click="clickToGoods(item.id)" :key="index" style="float:left;white-space:nowrap;">
                            <div  class="reforyou-slider">
                                <span class="toptag">{{item.channelName}}</span>
                                <image  :src="item.commImg" class="slide-image" />
                                <div class="intro sdiv overtext">【{{item.commName}}】{{item.remark}}</div>
                                <div class="place sdiv overtext">{{item.organName}}</div>
                                <div class="price sdiv">
                                    <span class="new-price">￥{{item.rulePrice}}</span>
                                    <span class="old-price">医院价 {{item.price}}</span>
                                </div>
                                <div class="tag-box sdiv">
                                    <span class="tag tag1" v-if="item.isStage">分期</span>
                                    <span class="tag tag2" v-if="item.isInsurance">保险</span>
                                    <span class="tag tag1" v-if="item.isTop ">热卖</span>
                                    <span class="tag tag2" v-if="item.isPrefer ">优选</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- </scroll-view> -->
            <!-- <swiper class="reforyou-swiper" previous-margin="30rpx" display-multiple-items=2 >
                <block v-for="(item,index) in imgUrls" :key="index">
                    <swiper-item class="reforyou-slider">
                        <image  :src="item" class="slide-image" />
                        <div class="intro sdiv overtext">【眼部微整】自然 ...</div>
                        <div class="place sdiv overtext">石家庄贵美人美容...</div>
                        <div class="price sdiv">
                            <span class="new-price">￥6000</span>
                            <span class="old-price">医院价 8000</span>
                        </div>
                        <div class="tag-box sdiv">
                            <span class="tag tag1">分期</span>
                            <span class="tag tag2">保险</span>
                        </div>
                    </swiper-item>
                </block>
            </swiper> -->
        </div>
    </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [
        "http://fs.meiduduo.com/oa/OA/other/1530237590667.png",
        "http://fs.meiduduo.com/oa/OA/other/1530237590667.png",
        "http://fs.meiduduo.com/oa/OA/other/1530237590667.png"
      ],
      sliderNum: 3,
      recomList: []
    };
  },
  computed: {
    scrollWidth() {
      return this.sliderNum * 100 + "%";
      //    return (this.sliderNum * 155 + 20) +'rpx'
    }
  },
  methods: {
    getRecomGoods() {
      this.$http
        .post("/commodity/commodityList", { isRecommend: 1 })
        .then(res => {
          console.log("推荐:", res);
          if (res.code == "1") {
            let recomList = res.data.data;
            recomList.forEach(item => {
              let commImg = item.commImg.split(",")[0];
              item.commImg = commImg;
            });
            this.recomList = recomList;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    clickToGoods(id) {
      console.log(id);
      this.$router.push({
        path: "/pages/others/productDetails",
        query: { id }
      });
    }
  },
  components: {},
  onLoad() {
    this.getRecomGoods();
    console.log(this.$store.state.userInfo.custId);
  }
};
</script>

<style>
/* 为您推荐 */
.reforyou {
  background: #fff;
  padding: 30rpx 0 0 0;
}
.reforyou-title {
  text-align: center;
  font-size: 30rpx;
  font-weight: bold;
  color: #333;
}
.reforyou-title .title-img {
  display: inline-block;
  width: 32rpx;
  height: 8rpx;
  vertical-align: top;
  margin-top: 8rpx;
}
.reforyou-swiper {
  height: 500rpx;
  /* width: 760rpx; */
  /* overflow-x:scroll; */
  overflow: hidden;
}
.reforyou-box {
  overflow-x: scroll;
  margin: 0;
}
.reforyou-box::-webkit-scrollbar {
  display: none;
}
.reforyou-swiper image {
  display: inline-block;
  width: 280rpx;
  height: 280rpx;
}
.sdiv {
  width: 280rpx;
  text-align: left;
}
/* 省略 */
.overtext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.reforyou-slider {
  position: relative;
  /* float: left; */
  margin-left: 30rpx;
}
.reforyou-slider .toptag {
  position: absolute;
  top: 0;
  left: 0;
  width: 52rpx;
  height: 26rpx;
  background: #ff4691;
  color: #fff;
  font-size: 16rpx;
  text-align: center;
  line-height: 26rpx;
}
.reforyou-slider .intro {
  font-size: 26rpx;
  color: #333;
  font-weight: bold;
}
.reforyou-slider .place {
  font-size: 24rpx;
  color: #999;
}
.price {
  vertical-align: middle;
}
.price .new-price {
  color: #ff4691;
  font-size: 28rpx;
}
.price .old-price {
  margin-left: 10rpx;
  color: #999;
  font-size: 18rpx;
  text-decoration: line-through;
}
.reforyou-slider .tag {
  width: 66rpx;
  height: 30rpx;
  border-radius: 4rpx;
  font-size: 22rpx;
  margin-right: 10rpx;
  padding: 0 4rpx;
}
.reforyou-slider .tag1 {
  color: #ff4691;
  border: 1rpx solid #ff4691;
}
.reforyou-slider .tag2 {
  color: #01d7fe;
  border: 1rpx solid #01d7fe;
}
</style>
