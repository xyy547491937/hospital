<template>
  <div class="doctor">
    <div class="doctor_image box">
      <img :src="detail.photo" alt="">
      <div class="doctor_image_info">
        <div>
          <span class="doctor_name">{{ detail.personalName }}</span>
          <span v-if="!isFollow" @click.stop="focus" class="follow_btn">
            <i-icon type="add" color="#ffffff" size="18" />
            关注
          </span>
          <span v-else @click.stop="focus" class="follow_btn">
            <i-icon type="right" color="#ffffff" size="18" />
            已关注
          </span>
        </div>
        <p>
          <span>{{ detail.technicalName }}</span>
          <span> 从业{{ detail.workingSeniority }}年</span>
        </p>
      </div>
    </div>
    <div class="doctor_info box">
      <div class="doctor_info_tag">
        <p class="aside_lable">擅长：</p>
        <div>
          <span v-for="(item, index) of detail.fieldsName" :key="index" class="aside_lable_item">{{ item }}</span>
        </div>
      </div>
      <div class="doctor_info_intro">
        <p class="aside_lable">简介：</p>
        <rich-text :nodes="detail.introduce"></rich-text>
        <!-- <p class="doctor_info_content">{{ detail.introduce }}</p> -->
      </div>
      <!-- <div class="doctor_info_footer">
        <span>查看全部简介</span>
      </div> -->
    </div>
    <div @click.stop="toOrganPage" class="doctor_organ box">
      <img src="http://img.meiduduo.com/images/hos_icon.png" alt="">
      <span>{{ detail.organName }}</span>
      <i-icon type="enter" color="#666666" size="18" />
    </div>
    <div class="doctor_example box">
      <span class="example_label">客户案例</span>
      <div class="example_imgs">
        <div class="example_img">
          <img src="http://img.meiduduo.com/images/shop/banner1.png" alt="">
          <img style="right: 0;" src="http://img.meiduduo.com/images/index/Before.png" alt="">
        </div>
        <div class="example_img">
          <img src="http://img.meiduduo.com/images/shop/banner1.png" alt="">
          <img style="left: 0;" src="http://img.meiduduo.com/images/index/After.png" alt="">
        </div>
      </div>
      <div class="example_user">
        <img src="http://img.meiduduo.com/images/shop/banner1.png" alt="">
        <span>客户姓名</span>
      </div>
      <p class="example_content">的肌肤的佛地方降低房价的飓风的风，放大镜放大了。 地方当局决定发动老师发的发的发。大幅度反对法大幅度了。</p>
      <p class="example_tag">
        <i-icon type="label" color="#FF4892" size="20" />
        <span>鼻综合整形</span>
      </p>
      <div class="example_price">
        <img src="http://img.meiduduo.com/images/index/bye_icon.png" alt="">
        <span class="example_price_content">东方基督教 都浪费了地方领导</span>
        <span>￥5979</span>
      </div>
      <div class="footer_btns">
        <div class="footer_btn_item">
          <i-icon type="browse" size="14" />
          <span> 141</span>
        </div>
        <div class="footer_btn_item">
          <i-icon type="message" size="14" />
          <span> 11</span>
        </div>
        <div class="footer_btn_item">
          <i-icon type="praise" size="14" />
          <span> 11</span>
        </div>
      </div>
      <div @click="goExamples" class="example_btns">
        <span>查看全部</span>
        <span>32个案例<i-icon type="enter" color="#FC4396" size="20" /></span>
      </div>
    </div>
    <div style="margin-bottom: 50px;" class="doctor_example box">
      <span class="example_label">我的热卖</span>
      <div>
        <hotCard v-for="(item, index) of hotList" :key="index" :data="item"></hotCard>
      </div>
      <div @click="goOffer" class="example_btns">
        <span>查看全部</span>
        <span>12个特惠<i-icon type="enter" color="#FC4396" size="20" /></span>
      </div>
    </div>
    <!-- TODO: 在线预约和咨询 -->
    <!-- <div class="fixed_btn">
      <span><i-icon type="time" color="#ffffff" size="24" /> 在线预约</span>
      <span><i-icon type="message" color="#ffffff" size="24" /> 咨询</span>
    </div> -->
  </div>
</template>

<script>
import hotCard from "./shop/hot_card";
export default {
  components: {
    hotCard
  },
  data() {
    return {
      hotList: [], // 热卖商品列表
      detail: {},
      isFollow: false // 是否关注
    };
  },
  onShow() {
    this.getDocterHot();
    this.getDocterDetail();
  },
  onUnload() {
    this.hotList = [];
    this.detail = {};
    this.isFollow = false;
  },
  methods: {
    getDocterDetail() {
      this.$http
        .post("servicePersonal/queryOneByPk", {
          id: this.$route.query.id,
          custId: this.$store.state.userInfo.custId
        })
        .then(res => {
          let a = res.data;
          if (a.introduce) {
            a.introduce = this.dealRichP(this.dealRichText(a.introduce));
          }
          if (a.fieldsName) {
            a.fieldsName = a.fieldsName.split(",");
          } else {
            a.fieldsName = [];
          }
          this.detail = res.data;
        });
    },
    dealRichText(text) {
      // 处理 rich-text 中的 img
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto" '
      );
    },
    dealRichP(text) {
      // 处理 rich-text 中的 p
      return text.replace(/\<p/gi, '<p style="font-size:14px;color:#666666" ');
    },
    getDocterHot() {
      this.$http
        .post("commodity/commodityList", {
          // servicePersonalId: 1,
          doctorId: 1,
          pageNum: 1,
          pageSize: 3
        })
        .then(res => {
          console.log(res);
          if (res.code === 1) {
            this.hotList = res.data.data;
          }
        });
    },
    goExamples() {
      this.$router.push({
        path: "/pages/shop/doctor_example",
        query: {}
      });
    },
    goOffer() {
      this.$router.push({
        path: "/pages/shop/special_offer",
        query: {}
      });
    },
    focus() {
      this.$http
        .post("focusRecord/save", {
          recordId: this.detail.id,
          custId: this.$store.state.userInfo.custId,
          recordType: 1,
          state: 1
        })
        .then(res => {
          if (res.code == 1) {
            this.isFollow = true;
          }
        });
    },
    toOrganPage() {
      this.$router.push({
        path: "others/orgin"
      });
    }
  }
};
</script>

<style scoped>
.doctor {
  background: #f1f1f1;
}
.box {
  margin-bottom: 17rpx;
}
.doctor_image {
  width: 100%;
  box-sizing: border-box;
  height: 440rpx;
  position: relative;
}
.doctor_image > img {
  display: block;
  width: 100%;
  height: 100%;
}
.doctor_image_info {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120rpx;
  background: rgba(85, 85, 85, 0.32);
  padding: 27rpx 33rpx 21rpx 33rpx;
  box-sizing: border-box;
  font-size: 22rpx;
  color: #fff;
}
.doctor_name {
  font-size: 30rpx;
}
.follow_btn {
  font-size: 26rpx;
  padding: 7rpx 24rpx 8rpx 24rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 20rpx;
  background: #fc4396;
  margin-left: 28rpx;
}
.doctor_image_info > p {
  margin-top: 14rpx;
}
.doctor_info {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.aside_lable {
  font-size: 28rpx;
  color: #333333;
  width: 160rpx;
  display: block;
}
.doctor_info_tag,
.doctor_info_intro {
  padding: 30rpx;
}
.doctor_info_tag {
  display: flex;
}
.doctor_info_tag > div {
  display: flex;
  flex-wrap: wrap;
}
.aside_lable_item {
  font-size: 24rpx;
  color: #fc4396;
  background: #fdd2ec;
  padding: 9rpx 26rpx 8rpx 30rpx;
  border-radius: 20rpx;
  margin: 0 19rpx 20rpx 0;
}
.doctor_info_content {
  font-size: 24rpx;
  color: #666666;
  line-height: 40rpx;
}
.doctor_info_footer {
  border-top: 1rpx solid #f1f1f1;
  font-size: 24rpx;
  color: #fc4396;
  text-align: center;
  padding: 24rpx 0;
}
.doctor_organ {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  color: #333333;
  padding: 30rpx;
  background: #fff;
}
.doctor_organ > img {
  width: 40rpx;
  height: 50rpx;
  display: block;
}
.doctor_organ > span {
  flex: 1;
  margin: 0 17rpx;
}
.doctor_example {
  padding: 30rpx 30rpx 0 30rpx;
  background: #fff;
}
.example_label {
  font-size: 28rpx;
  color: #333333;
  border-left: 4rpx solid #fc4396;
  margin-bottom: 29rpx;
  display: block;
  padding: 0 16rpx;
}
.example_imgs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30rpx;
}
.example_img {
  position: relative;
  width: 344rpx;
  height: 330rpx;
  border-radius: 4rpx;
  box-sizing: border-box;
}
.example_img > img:first-child {
  width: 100%;
  height: 100%;
  display: block;
}
.example_img > img:last-child {
  position: absolute;
  bottom: 0;
  display: block;
  width: 100rpx;
  height: 30rpx;
}
.example_user {
  display: flex;
  align-items: center;
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 32rpx;
}
.example_user > img {
  width: 57rpx;
  height: 57rpx;
  display: block;
  border-radius: 100%;
  margin-right: 29rpx;
}
.example_content {
  font-size: 26rpx;
  color: #666666;
  margin-bottom: 39rpx;
}
.example_tag {
  font-size: 26rpx;
  color: #ff4691;
  display: flex;
  align-items: center;
  margin-bottom: 25rpx;
}
/* .example_tag > img {
  display: block;
  width: 20rpx;
  height: 20rpx;
  margin-right: 5rpx;
} */
.example_price {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 13rpx 17rpx 15rpx 17rpx;
  border-radius: 3rpx;
  font-size: 22rpx;
  color: #555555;
  margin-bottom: 26rpx;
}
.example_price > img {
  display: block;
  width: 26rpx;
  height: 26rpx;
  margin-right: 10rpx;
}
.example_price_content {
  flex: 1;
}
.example_price > span:last-child {
  color: #ff4691;
}
.footer_btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24rpx;
  color: #cccccc;
}
.footer_btn_item {
  display: flex;
  align-items: center;
  margin-left: 50rpx;
  margin-bottom: 21rpx;
}
.example_btns {
  border-top: 1rpx solid #f1f1f1;
  padding: 25rpx 0 28rpx 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24rpx;
  color: #999999;
}
.example_btns > span:first-child {
  margin-right: 10rpx;
}
.example_btns > span:last-child {
  display: flex;
  align-items: center;
  color: #fc4396;
}
.fixed_btn {
  width: 100%;
  height: 98rpx;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  font-size: 30rpx;
  color: #ffffff;
  position: fixed;
  bottom: 0;
}
.fixed_btn span {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.fixed_btn span:first-child {
  background: #fa97e6;
}
.fixed_btn span:last-child {
  background: #fc4396;
}
</style>
