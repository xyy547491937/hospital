<template>
  <div class="" style="background:#ddd; padding-top:10px;">
    <!-- 订单详情 -->
    <div class="item-order order-detail pay-methods">
      <p class=" v"> <span class="c">订单号：</span> <span class="c">{{orderList.payOrderNo }}</span></p>
      <p class="v"> <span class="c">订单状态：</span> <span class="c">{{orderList.state==1?"已支付":orderList.state==0?"未支付":"已删除"}}</span></p>
      <p class="v"> <span class="c">手机号：</span> <span class="c">{{phone}}</span></p>
      <p class="v"> <span class="c">下单时间：</span> <span class="c">{{orderList.payTime}}</span></p>
    </div>
    <!-- class 订单详情 -->
    <div class="pay-methods pay-list order-detail">
      <p class="flex-r pay-message-item"><span class="c">支付方式</span> <span style="color:#fc4396">{{orderList.payType==1?"微信":orderList.payType==2?"支付宝":"银联" }}</span> </p>
       <p class="flex-r pay-message-item"><span class="c">订单金额</span> <span>{{orderList.payPrice }}</span> </p>
        <!-- <p class="flex-r pay-message-item"> <span class="c">到院再付</span> <span>支付定金</span> </p> -->
         <p class=" flex-r pay-message-item"><span class="c">在线支付金额</span> <span style="color:#fc4396">{{orderList.payPrice }}</span> </p>

    </div>
    <!--  订单 -->
    <div class="fen-order order-detail pay-methods">
      <div class="flex-r order-list">
        <img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg" alt="">
        <div class="order-title">
          <p> [瘦身美体套餐］网红脸套餐(芭比眼
            综合＋鼻综合＋全面部自体脂肪填充)</p>
          <p>
            石家庄贵美人美容医疗机构
          </p>
          <p class="flex-r">
            <span style="color:#FC4396" class="price">¥69820</span>
            <a href="" class="rulePrice">医院价：¥99820</a>
          </p>
          <p> 已经购买 <span class="c" style="color:#FC4396">2万+</span>  </p>
        </div>
      </div>
    <!--  分期 -->
    <p class=" fen-y"> <span class="bardge"> 分期</span><span class="c"> 最高可享12期分期付款：<span class="c" style="color:#fc4396">¥698.20x12</span>   期</span></p>
    <p class="fen-y"><span class="bardge bardge-green">保险</span> <span>免费送50000元 贵美人.平安安心整形险</span></p>

    
    </div>
    <div class="order-address pay-methods order-detail"> 医院地址 <span>河北省石家庄市裕华区建华南大街与东岗路交口</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.getOrderDetail();
  },
  computed: {
    phone() {
      return this.$store.state.userInfo.mobile;
    }
  },
  methods: {
    getOrderDetail() {
      this.$http.post("payOrder/queryOneByPk", { id: 401 }).then(res => {
        // console.log(res);
        if (res.code == 1) {
          this.orderList = res.data;
        }
      });
    }
  }
};
</script>
<style scoped>
.v {
  padding: 5px 0;
}
.flex-r {
  display: flex;
  flex-direction: row;
}
.order-detail {
  padding: 0.3rem 0.3rem;
  background-color: #fff;
}
.item-order {
  font-size: 14px;
  font-family: PingFangSC-Light;
  /* font-weight: 300; */
  color: #333;
  line-height: 0.42rem;
}
.pay-methods {
  margin-bottom: 10px;
  background: #fff;
}
.order-list {
  margin-bottom: 10px;
}
.order-list img {
  display: block;
  width: 40%;
  height: 1.84rem;
  border-radius: 6px;
}
.order-title {
  display: flex;
  flex-direction: column;

  margin-left: 10px;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 0.36rem;
}
.rulePrice {
  text-decoration: line-through;
  color: #999;
  margin-left: 5px;
}
.price {
  font-size: 0.26rem;
  font-weight: bold;
}
.order-title p:first-child {
  font-size: 0.26rem;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
}
.order-title p:last-child {
  justify-content: flex-end;
  text-align: right;
}
.bardge {
  padding: 3px 5px;
  background-color: #fa97e6;
  border-radius: 5px;
  color: #fff;
}
.bardge-green {
  background-color: #7bdbcf;
}
.fen-y {
  font-size: 0.22rem;
  font-family: PingFangSC-Light;
  /* font-weight: 300; */
  color: #555;
  line-height: 0.3rem;
  margin-bottom: 10px;
}
.order-address {
  /* height: 0.9rem; */
  font-size: 0.24rem;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(51, 51, 51, 1);
  /* line-height: 0.9rem; */
}
.pay-list {
  font-size: 0.24rem;
  color: #333;
}
.pay-message-item {
  padding: 25rpx 0;
  justify-content: space-between;
  border-bottom: 1rpx solid #dfffff;
}
</style>
