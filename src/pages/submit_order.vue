<template>
  <div v-if="detail" class="order">
    <div class="project_main">
      <orderCard :data="detail"></orderCard>
    </div>
    <div>
      <i-cell :title="phoneInfo"></i-cell>
    </div>
    <div class="footer_btn">
      <p>实付：<span style="color: #FF4691;">￥{{ detail.comm.groupPrice }}</span></p>
      <span @click="saveGroupOrder" class="push_btn">提交订单</span>
    </div>
  </div>
</template>

<script>
import orderCard from './shop/order_card'
export default {
  components: {
    orderCard
  },
  data () {
    return {
      detail: null, // 商品详情
      phoneInfo: '手机号：'
    }
  },
  mounted () {
    this.getDetail()
  },
  onShow () {
    // this.getDetail()
    console.log(this.$store.state)
  },
  methods: {
    getDetail () {
      console.log(this.$store.state)
      console.log('submit_order 下单参数')
      console.log(this.$route.query.id)
      console.log(this.$route.query)
      this.$http.post('commodity/queryOneGroupCommidityByPk', {
        id: this.$route.query.id,
        commType: 'P'
      }).then(res => {
        if (res.code === 1) {
          let a = res.data
          if (a.comm.commImg) {
            a.comm.commImg = a.comm.commImg.split(',')
          } else {
            a.comm.commImg = []
          }
          this.detail = a
          this.phoneInfo = `手机号：${this.$store.state.userInfo.mobile}`
        }
      })
    },
    saveGroupOrder () {
      console.log(this.$store.state)
      let params = {
        organId: 1,
        customId: this.$store.state.userInfo.custId,
        peopleId: this.$store.state.userInfo.peopleId,
        nickName: this.$store.state.userInfo.nickName,
        customName: this.$store.state.userInfo.nickName,
        customTel: this.$store.state.userInfo.mobile,
        // projectId: this.detail.
        commodityId: this.detail.comm.id,
        payType: 1,
        commodityName: this.detail.comm.commName,
        unit: this.detail.comm.unit,
        price: this.detail.comm.price,
        rulePrice: this.detail.comm.rulePrice,
        payPrice: this.detail.comm.groupPrice,
        commImg: this.detail.comm.commImg.join(','),
        doctorId: this.detail.servicePersonal.id,
        groupCommId: this.detail.comm.groupCommId,
        clusterNo: this.$route.query.clusterNo,
        isOwner: this.$route.query.isOwner,
        orderType: 2
      }
      if (this.$route.query.goId) {
        params.goId = this.$route.query.goId
      }
      this.$http.post('groupOrder/saveGroupOrder', params).then(res => {
        if (res.code === 1) {
          wx.showToast({
            title: '提交成功！'
          })
          this.$router.replace({
            path: 'payOrder',
            query: {
              orderId: res.data,
              pin: true,
              groupCommId: this.detail.comm.groupCommId
            }
          })
        } else {
          if (res.data === -3) {
              wx.showToast({
                title: '商品库存不足',
                image: 'http://img.meiduduo.com/images/shop/cancel.png'
              })
              return
          }
          if (res.data === -5) {
              wx.showToast({
                title: '拼主不能参与自己的拼团',
                image: 'http://img.meiduduo.com/images/shop/cancel.png'
              })
              return
          }
          if (res.data === -6) {
              wx.showToast({
                title: '已有待付款订单或已参与活动',
                image: 'http://img.meiduduo.com/images/shop/cancel.png'
              })
              return
          }
          wx.showToast({
            title: '提交失败！',
            image: 'http://img.meiduduo.com/images/shop/cancel.png'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.order {
  background: #f1f1f1;
  min-height: 100vh;
}
.footer_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 86rpx;
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  font-size: 30rpx;
  color: #333;
}
.footer_btn > p {
  line-height: 86rpx;
  text-align: right;
  padding: 0 36rpx;
  background: #fff;
  flex: 1;
}
.push_btn {
  width: 209rpx;
  background: #FF4691;
  color: #fff;
  line-height: 86rpx;
  text-align: center;
}
</style>
