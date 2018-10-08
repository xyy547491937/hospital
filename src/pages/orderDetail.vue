<template>
  <div class="" style="background:#f5f5f5; padding-top:10px;height:100%">
    <!-- 订单详情 -->
    <div class="item-order order-detail pay-methods">
      <p class=" v"> <span class="ce">订单号：</span> <span class="c">{{orderList.orderNo}}</span></p>
      <p class="v"> <span class="ce">订单状态：</span> <span class="c">{{orderState}}</span></p>
      <p class="v"> <span class="ce">手机号：</span> <span class="c">{{phone}}</span></p>
      <p class="v"> <span class="ce">下单时间：</span> <span class="c">{{orderList.createDate}}</span></p>
    </div>
    <!-- class 订单详情 -->
    <div class="pay-methods pay-list order-detail">
      <!-- <i-cell title="支付方式" value="支付定金"></i-cell>
      <i-cell title="订单金额" value="￥200"></i-cell>
      <i-cell title="到院再付" value="￥300"></i-cell>
      <i-cell title="在线支付金额" value="￥300"></i-cell> -->
      <p class="flex-r pay-message-item"><span class="c">支付方式</span> <span style="color:#fc4396">{{orderList.prepayType?"全款支付":"定金支付"}}</span> </p>
       <p class="flex-r pay-message-item"><span class="c">订单金额</span> <span>￥{{orderList.payPrice }}</span> </p>
        <p class="flex-r pay-message-item"> <span class="c">到院再付</span> <span>￥{{orderList.rulePrice-orderList.payPrice }}</span> </p>
         <p class=" flex-r pay-message-item"><span class="c">在线支付金额</span> <span style="color:#fc4396">￥{{orderList.payPrice }}</span> </p>

    </div>
    <!--  订单 -->
    <div class="fen-order order-detail pay-methods">
      <div class="flex-r order-list">
        <img :src="orderList.commImg" alt="">
        <div class="order-title">
          <p> [{{orderList.commodityName}}］({{orderList.remark }})</p>
          <p>
            {{orderList.organName}}
          </p>
          <p class="flex-r">
            <span style="color:#FC4396" class="price">¥{{orderList.rulePrice}}</span>
            <a href="" class="rulePrice">医院价：¥{{orderList.price}}</a>
          </p>
          <p> 已经购买 <span class="c" style="color:#FC4396">{{orderList.buyNum}}万+</span>  </p>
        </div>
      </div>
    <!--  分期 -->
    <p class=" fen-y" v-if="orderList.isStage "> <span class="bardge"> 分期</span>
    <!-- <span class="c"> 最高可享12期分期付款：<span class="c" style="color:#fc4396">¥698.20x12</span>   期</span> -->
    </p>
    <p class="fen-y" v-if="orderList.isInsurance ">
      <!-- <span class="bardge bardge-green">保险</span> <span>免费送50000元 贵美人.平安安心整形险</span> -->
      </p>

    
    </div>
    <div class="order-address pay-methods order-detail"> 医院地址 <span>{{orderList.address }}</span></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderList: {},
      orderState: ""
    };
  },
  onShow() {
    this.getOrderDetail();
  },
  mounted() {
    // this.getOrderDetail();
  },
  computed: {
    phone() {
      return this.$store.state.userInfo.mobile;
    }
  },
  // 订单状态 1待付款，2已付款，3申请退款，4订单取消，5已发货，6待评价，7订单完成，8已退款，9待退款，10退款中， 11退款相关（包括8/9/10）
  methods: {
    getOrderDetail() {
      this.$http
        .post("order/queryOneByPk", { id: this.$root.$mp.query.id })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            // this.orderList = res.data;
            // cosnole.log(this.orderList);
            switch (res.data.osId.toString()) {
              case "1":
                this.orderState = "待付款";
                break;
              case "2":
                this.orderState = "已付款";
                break;
              case "3":
                this.orderState = "申请退款";
                break;
              case "4":
                this.orderState = "取消订单";
                break;
              case "5":
                this.orderState = "已发货";
                break;
              case "6":
                this.orderState = "待评价";
                break;
              case "7":
                this.orderState = "订单完成";
                break;
              case "8":
                this.orderState = "已退款";
                break;
              case "9":
                this.orderState = "待退款";
                break;
              case "10":
                this.orderState = "退款中";
                break;
              default:
                this.orderState = "退款相关";
                break;
            }
            this.orderList = res.data;
            this.orderList.commImg = this.orderList.commImg.split(",")[0];
          }
        });
    }
  }
};
</script>
<style scoped>
.ce {
  display: inline-block;
  width: 25%;
  text-align: left;
}
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
  width: 60%;

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
page {
  background-color: #f5f5f5;
}
</style>
