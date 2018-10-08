<template>
  <div class="order">
    <div class="order_info box">
      <span class="order_info_state">{{ arr1[detail.osId] }}</span>
      <span>订单号：{{ detail.orderNo }}</span>
      <span>预定手机号：{{ detail.customTel }}</span>
      <span>下单时间：{{ detail.createDate }}</span>
    </div>
    <div class="order_project box">
      <div class="project_organ">
        <div class="project_organ_info">
          <img class="organ_icon" style="margin-right: 20rpx;" src="http://img.meiduduo.com/images/hos_icon.png" alt="">
          <span>{{ detail.organName }}</span>
        </div>
        <span></span>
      </div>

      <div class="project_main">
        <img :src="detail.commImg" alt="">
        <div>
          <p class="project_name">
            <span>[{{ detail.commodityName }}]</span>
            <span>{{ detail.remark }}</span>
          </p>
          <p class="project_price">
            <span>￥{{ detail.payPrice }}</span>
            <span>单买：￥{{ detail.rulePrice }}</span>
          </p>
          <div class="project_type">
            <p>
              <span v-if="detail.isStage" class="staging dot">分</span>
              <span v-if="detail.isInsurance" class="insurance dot">保</span>
            </p>
            <span>x1</span>
          </div>
        </div>
      </div>

      <div v-if="detail.icons && detail.icons.length > 0" class="project_imgs">
        <img v-for="(item, index) of detail.icons" :key="index" class="img_item" :src="item">
      </div>

      <div class="project_footer">
        <p>
          <span>商品总价</span>
          <span>￥{{ detail.payPrice }}</span>
        </p>
        <p>
          <span>实付款</span>
          <span style="color: #FF4691;">￥{{ detail.payPrice }}</span>
        </p>
      </div>
    </div>
    <div class="footer_address box">
      <span>医院地址：</span>
      <span>{{ detail.address }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      detail: {},
      id: null, // 订单id
      arr1: ['', '待付款', '已付款', '申请退款', '订单取消', '已发货', '待评价', '订单完成', '已退款', '待退款', '退款中']
    }
  },
  onShow () {
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
    this.getDetail()
  },
  onUnload () {
    this.detail = {}
  },
  methods: {
    
    getDetail () {
      this.$http.post('order/queryOneByPk', { // groupOrder/queryOneByPk
        id: this.id,
      }).then(res => {
        if (res.code === 1) {
          let a = res.data
          if (a.icons) {
            a.icons = a.icons.split(',')
          } else {
            a.icons = []
          }
          this.detail = a
        }
      })
    }
  }
}
</script>

<style scoped>
.order {
  min-height: 100vh;
  background: #f1f1f1;
}
.box {
  margin-bottom: 17rpx;
  background: #fff;
}

.order_info {
  font-size: 26rpx;
  color: #999;
  padding: 41rpx 31rpx 0 31rpx;
  display: flex;
  flex-direction: column;
}
.order_info > span {
  margin-bottom: 25rpx;
}
.order_info_state {
  font-size: 30rpx;
  color: #FF4691;
}

.order_project {
  padding: 30rpx;
}
.organ_icon {
  display: block;
  width: 40rpx;
  height: 50rpx;
}
.project_organ {
  display: flex;
  font-size: 26rpx;
  color: #666;
  align-items: center;
  justify-content: space-between;
  height: 50rpx;
  border-bottom: 1rpx solid #f1f1f1;
  padding-bottom: 20rpx;
}
.project_organ_info {
  display: flex;
  align-items: center;
}
.project_main {
  display: flex;
  align-items: flex-start;
  padding: 33rpx 0;
  border-bottom: 1rpx solid #f1f1f1;
}
.project_main > img {
  display: block;
  width: 180rpx;
  height: 180rpx;
  border-radius: 5rpx;
  margin-right: 28rpx;
}
.project_main > div {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.project_name {
  font-size: 26rpx;
  color: #333;
  margin-bottom: 26rpx;
}
.project_price {
  margin-bottom: 34rpx;
}
.project_price > span:first-child {
  font-size: 30rpx;
  color: #FC4396;
  margin-right: 19rpx;
}
.project_price > span:last-child {
  font-size: 24rpx;
  color: #999;
}
.dot {
  font-size: 22rpx;
  color: #fff;
  padding: 4rpx 5rpx 6rpx 6rpx;
  border-radius: 3rpx;
}
.staging {
  background: #FA97E6;
  margin-right: 8rpx;
}
.insurance {
  background: #74DEC4;
}
.project_type {
  font-size: 28rpx;
  color: #333;
  display: flex;
  justify-content: space-between;
}
.project_type > span:first-child {
  margin-right: 8rpx;
}
.project_imgs {
  padding: 17rpx 31rpx;
  border-bottom: 1rpx solid #f1f1f1;
  margin-bottom: 33rpx;
  display: flex;
  align-items: center;
  padding-left: -30rpx;
}
.img_item {
  display: block;
  width: 72rpx;
  height: 72rpx;
  border-radius: 100%;
  margin-left: -30rpx;
}
.project_footer {
  font-size: 26rpx;
  color: #333;
}
.project_footer > p {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.project_footer > p:first-child {
  margin-bottom: 33rpx;
}

.footer_address {
  font-size: 28rpx;
  color: #333;
  padding: 35rpx 33rpx 38rpx 33rpx;
}
</style>
