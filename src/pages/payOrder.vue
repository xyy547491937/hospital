<template>
  <div class="pay-order">
    <hr style="height:0.1rem;border:none;border-top:0.1rem solid #F1F1F1;" />
    <!-- 地址蓝没做 -->
    <div class="pay-address" v-if="commType==2">
      <div class="pay-address-first">
        <div>收货人：张莉</div>
        <div>13625454214</div>
      </div>
      <div class="pay-address-two">
        收货地址：河北省石家庄新华区
      </div>
    </div>
    <div class="pay-info"  @click="changeJump('../shop/orderDetail',{})">
      <div v-if="!pin">胚豆订单号：{{orderArr.payOrderNo}}</div>
      <div v-else>胚豆订单号：{{orderArr.orderNo}}</div>
      <div>支付金额：<span>¥{{orderArr.payPrice}}</span></div>
    </div>
    <div class="pay-mode">
      <div class="pay-mode-title">选择支付方式</div>
      <!-- <yd-radio-group v-model="radio1"> -->
      <div class="pay-mode-item" @click="isShow=1">
        <!-- <yd-radio val="1"> -->
          <div class="c er-circle" :class="{'cart-active':isShow==1}" >
            
          </div>
        <div class="wx">
          <span class="name">微信支付</span><br /><span class="notes">亿万用户的选择，更快更安全</span>
        </div>
        <!-- </yd-radio> -->
      </div>
      <!-- <div class="pay-mode-item" @click="isShow=2"> -->
        <!-- <yd-radio val="1"> -->
          <!-- <div class="c er-circle" :class="{'cart-active':isShow==2}" > -->
            
          <!-- </div>
        <div class="wx zfb ">
          <span class="name">支付宝支付</span><br /><span class="notes">亿万用户的选择，更快更安全</span>
        </div> -->
        <!-- </yd-radio> -->
      <!-- </div> -->

      <!-- </yd-radio-group> -->
      <div class="message">* 订单已生成，请在60分钟内完成预约订金支付！*</div>
    </div>

    <div class="online_btn" @click="weichartPay"><span>确认支付</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orderId: "",
      radio1: "1",
      orderList: [],
      pay: [],
      commType: "",
      orderArr: {},
      isShow: 1,
      pin: false
    };
  },
  components: {},
  computed: {},
  created() {},
  onLoad() {
    this.pin = this.$route.query.pin;
  },
  methods: {
    //获取订单编号
    getOrder(id) {
      this.$http
        .post("payOrder/queryOneByPk", {
          id: id
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.orderArr = res.data;
          }
        });
    },
    //支付
    // @购物车不需要传商品id
    gopay(params) {
      let p = {
        id: this.orderArr.id,
        commName: this.orderArr.commName, //商品名称
        payType: this.isShow, //支付方式(1微信、2支付宝、3银联)
        openid: this.$store.state.userInfo.openid //"wxb35784c778465400" //
      };
      params = Object.assign({}, p, params);
      console.log(params);
      this.$http.post("wPay/goPay", params).then(res => {
        // console.log(res);
        if (res.code == 1) {
          console.log(res.data);
          wx.requestPayment({
            timeStamp: res.data.timestamp.toString(),
            nonceStr: res.data.nonceStr,
            package: res.data.package, // `prepay_id=${res.data.prepayid}`,
            signType: "MD5",
            paySign: res.data.sign,
            success: function(succ) {
              self.$router.push("myOrder");
            },
            fail: function(res) {
              wx.showToast({
                title: "支付失败",
                image: "http://img.meiduduo.com/images/shop/cancel.png"
              });
            }
          });
        }
      });
    },

    weichartPay() {
      let params = {};
      if (this.$root.$mp.query.shopType == 1) {
        //购物车
        params = {
          orderType: 1, //普通
          isCart: 1
        };
      } else if (this.$root.$mp.query.shopType == 2) {
        //立即购买
        params = {
          commodityId: this.$root.$mp.query.proId,
          orderType: 1,
          isCart: 1
        };
      } else if (this.$root.$mp.query.pin) {
        params = {
          orderType: 2,
          groupCommId: this.$root.$mp.query.groupCommId,
          isOwner: this.orderArr.isOwner,
          goId: ""
        };
        this.groupOrderPay();
        return;
      }

      this.gopay(params);
    },

    // 拼团订单详情
    getOrderDetail() {
      this.$http
        .post("order/queryOneByPk", {
          id: this.$route.query.orderId
        })
        .then(res => {
          if (res.code === 1) {
            this.orderArr = res.data;
          }
          console.log("返回的值");
          console.log(res.data);
        });
    },
    // 拼团订单付款
    groupOrderPay() {
      const self = this;
      let params = {
        id: this.orderArr.id,
        // commodityId: this.orderArr.commodityId || 114,
        commName: this.orderArr.commodityName,
        payType: 1,
        orderType: 2,
        isOwner: this.orderArr.isOwner,
        version: this.orderArr.version,
        commodityVersion: this.orderArr.commodityVersion,
        groupCommId: this.orderArr.groupCommId || 134,
        isCart: 0
      };
      if (this.orderArr.goId) {
        params.goId = this.orderArr.goId;
      } else {
        delete params.goId;
      }
      if (this.$store.state.userInfo.openid) {
        params.openid = this.$store.state.userInfo.openid;
      }
      console.log("支付参数");
      console.log(params);
      this.$http
        .post("http://wx.lan.meiduduo.com/shop4/wPay/goPay", params)
        .then(res => {
          if (res.code === 1) {
            // 发起微信支付
            wx.requestPayment({
              timeStamp: res.data.timestamp,
              nonceStr: res.data.nonceStr,
              package: res.data.package, // `prepay_id=${res.data.prepayid}`,
              signType: "MD5",
              paySign: res.data.sign,
              success: function(res) {
                self.$router.push("myOrder");
              },
              fail: function(res) {
                wx.showToast({
                  title: "支付失败",
                  image: "http://img.meiduduo.com/images/shop/cancel.png"
                });
              }
            });
          }
        });
    }
  },
  mounted() {
    // this.weichartPay();
    console.log(this.$root.$mp.query);
    this.commType = this.$root.$mp.query.commType;
    // console.log(this.$route.query);
    this.getOrder(this.$route.query.orderId);
    if (this.$route.query.pin) {
      this.getOrderDetail();
    }
  },
  onShow() {
    // this.weichartPay();
    console.log(this.$root.$mp.query);
    this.commType = this.$root.$mp.query.commType;
    // console.log(this.$route.query);
    this.getOrder(this.$route.query.orderId);
    if (this.$route.query.pin) {
      this.getOrderDetail();
    }
  }
};
</script>

<style scoped>
.er-circle {
  background-image: url("http://img.meiduduo.com/images/mine/nosel.png");
  background-size: contain;

  display: block;
  width: 0.36rem;
  height: 0.36rem;
  /* border: 2px solid rgba(191, 191, 191, 1);
  border-radius: 50%; */
}
.cart-active {
  background-image: url("http://img.meiduduo.com/images/mine/yessel.png");
}
.pay-address-two {
  margin-left: 0.2rem;
  font-size: 0.26rem;
  margin: 0.2rem;
}

.pay-address-first {
  font-size: 0.26rem;
}

.pay-address-first div:first-child {
  display: inline-block;
  width: 60%;
  padding-left: 0.2rem;
}

.pay-address-first div:last-child {
  display: inline-block;
  width: 30%;
  text-align: right;
}

.pay-address {
  background-color: #ffffff;
  padding: 0.1rem 0;
  background-image: url("http://img.meiduduo.com/images/arrow.png");
  background-position: 7rem center;
  background-repeat: no-repeat;
  background-size: 0.12rem 0.2rem;
}

.pay-order {
  background-color: #f1f1f1;
}

.pay-mode,
.pay-info {
  margin-top: 0.2rem;
  background: #fff;
  padding: 0 0.2rem;
  margin-bottom: 0.17rem;
}

.pay-mode {
  height: 9.3rem;
}

.pay-info div {
  color: #333;
  font-size: 0.3rem;
  line-height: 1rem;
  border-bottom: 1px solid #eee;
}

.pay-info div:last-child {
  border: none;
}

.pay-info div span {
  color: #ff4691;
  font-weight: 500;
}

.pay-mode-title {
  line-height: 0.8rem;
  font-size: 0.26rem;
  color: #999;
  border-bottom: 1px solid #eee;
}

.mode-info {
  display: inline-block;
}

.pay-mode-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.2rem 0;
  border-bottom: 1px solid #eee;
}

.pay-mode-item .wx {
  /* display: inline-block; */
  padding-left: 1.2rem;
}

.pay-mode-item .name {
  color: #333;
  font-size: 0.3rem;
  font-weight: bold;
}

.pay-mode-item .notes {
  color: #999;
  font-size: 0.24rem;
}

.wx {
  background: url("http://img.meiduduo.com/images/pay/wx.png") 0.3rem center
    no-repeat;
  background-size: 0.55rem 0.55rem;
}

.zfb {
  background: url("http://img.meiduduo.com/images/pay/zfb.png") 0.3rem center
    no-repeat;
  background-size: 0.55rem 0.55rem;
}

.hb {
  background: url("http://img.meiduduo.com/images/pay/hb.png") 0.3rem center
    no-repeat;
  background-size: 0.55rem 0.55rem;
}

.pay-mode-item label {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}

.radio-box {
  display: inline-block;
}

.message {
  text-align: center;
  color: #999;
  padding: 0 0.2rem;
  line-height: 1rem;
  font-size: 0.24rem;
}

.online_btn {
  padding: 0 0.76rem;
}

.online_btn > span {
  width: 80%;
  height: 0.8rem;
  background: #ff4691;
  display: inline-block;
  color: #ffffff;
  font-size: 0.32rem;
  text-align: center;
  line-height: 0.8rem;
  border-radius: 0.4rem;
  position: fixed;
  bottom: 0.41rem;
  box-shadow: 0 7px 26px #ffc9f2;
}
</style>
