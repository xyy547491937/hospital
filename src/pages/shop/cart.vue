<template>
  <div class="cart-box">
    <!-- 引入组件 -->
    <CartList :cartArr="cartArr.data" :isManger="isManger" :isAll="isAll" @allSelect="allSelect" @cartChangeArr="cartChangeArr"
      @cartNum="cartNum" :isnum="isnum" :isSelect="isSelect" :isCartShow="isCartShow" @a="a" />
    <div class="cartNo" v-if="cartArr.data.length==0">
      <!-- <img src=" http://img.meiduduo.com/images/shop/cart.png" alt=""> -->

      <div class="cart-of-no">
        <span class="icon-cart"></span>
      </div>
      <div class="cartNo-title"> 你的购物车空空如也</div>
     
    </div>
     <div class="no_data" v-if="cartArr.data.length < 1">
        <p>没有数据</p>
      </div>
      <div class="over_banner" v-if="isOver && cartArr.data.length > 0">
        <p>数据加载完毕</p>
      </div>
    <div class="foot" v-if="cartArr.data.length!=0">
      <p class="flex all-sel" @click="allSel">
        <span class="er-circle" :class="{'cart-active':isAll}"></span>
        <span style="margin-left:5px;">全选</span>
      </p>
      <p style="color:#2FAEFE" @click="mangerCart()">
        {{isManger?'完成':"管理"}}
      </p>
      <p>
        <span> 合计</span>
        <span style="color:#FC4396;font-size:16px;font-weight:bold;"> ¥{{totalMoney}}</span>
      </p>

      <div class="submit-btn" @click="goSureOrder">
        结算
      </div>

    </div>

  </div>
</template>

<script>
import CartList from "@/pages/comm/cartList";

export default {
  components: {
    CartList
  },
  data() {
    return {
      value1: 1,
      value2: 5,
      cartArr: {
        data: []
      },
      isManger: false,
      isAll: true,
      cnum: null,
      isnum: true,
      isSelect: true,
      isCartShow: false,
      cnm: "",
      pageNum: 1,
      pageSize: 15,
      isOver: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getCartDetail();
      console.log(this.$store.state.userInfo.custId);
    });
  },
  computed: {
    totalMoney() {
      let n = 0;
      this.cartArr.data.forEach(v => {
        v.cartList.forEach(el => {
          // console.log(el);
          if (el.isChecked) {
            n += el.oldPrice * el.quantity;
            // console.log(n);
          }
        });
      });

      return n;
    },
    cartIds() {
      let cartids = [];
      this.cartArr.data.forEach(v => {
        v.cartList.forEach(el => {
          if (el.isChecked) {
            cartids.push(el.id);
          }
        });
      });
      return cartids;
    }
  },
  watch: {
    cnum() {
      this.getCartDetail();
    }
  },
  methods: {
    a(msg) {
      this.cartArr.data = msg;
      // console.log(msg);
      // console.log(this.cartArr.data);
    },
    // 获取用户购物车详情
    getCartDetail() {
      this.$http
        .post("cart/list4Page", {
          custId: this.$store.state.userInfo.custId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            if (res.data.length == 0) {
            } else {
              // 添加自定义属性
              res.data.data.forEach(element => {
                //假如后台没有给这个值，自己默认为1
                if (typeof element.isShopChecked == "undefined") {
                  this.$set(element, "isShopChecked", 1);
                }
                element.cartList.forEach(v => {
                  if (typeof v.isChecked == "undefined") {
                    this.$set(v, "isChecked", 1);
                  }
                });
              });

              this.cartArr = res.data;
              let a = res.data.data;
              // this.cartArr.data = res.data.data;

              if (res.data.pageNum == 1) {
                this.cartArr.data = a;
              } else {
                this.cartArr.data = this.cartArr.data.concat(a);
              }
              if (this.pageNum == res.data.pages || a.length < this.pageSize) {
                this.isOver = true;
              } else {
                this.pageNum++;
                this.isOver = false;
              }
            }
          }
        });
    },
    // 管理
    mangerCart() {
      this.isManger = !this.isManger;
    },

    // 获取子组件的值
    allSelect(msg) {
      this.isAll = msg;
      // console.log(this.isAll);
    },
    cartChangeArr(msg) {
      this.cartArr.data = msg;
      // console.log(this.cartArr.data);
    },
    allSel() {
      this.isAll = !this.isAll;
      // console.log(this.isAll);
      this.cartArr.data.forEach(v => {
        v.isShopChecked = this.isAll;
        v.cartList.forEach(el => {
          el.isChecked = this.isAll;
        });
      });
    },
    cartNum(msg) {
      this.cnum = msg;
      // console.log(this.cnum);
      // console.log(this.cnum);
      // this.getCartDetail();
    },
    //确认订单
    //本地缓冲购物车数据
    goSureOrder() {
      wx.setStorageSync("cartData", JSON.stringify(this.cartArr.data));
      this.changeJump("/pages/others/successOrder", {
        shopType: 1
      });
    }
  },
  onReachBottom() {
    console.log("到底了");
    if (!this.isOver) {
      // this.getList();
      this.getCartDetail();
    }
  }
};
</script>
<style lang="css">
.cartNo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #999;
  height: 300px;
}

.cart-of-no {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: rgba(153, 153, 153, 0.5);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.cart-of-no span {
  width: 60%;
  height: 60%;
  background-repeat: no-repeat;
  background-image: url("http://img.meiduduo.com/images/shop/cart.png");
  background-size: contain;
  margin: 0 auto;
  /* margin-top: 20px; */
}

.cartNo-title {
  margin-top: 10px;
}

page {
  background: #eee;
}

.all-sel {
  align-items: center;
}

.cart-box {
  padding: 10px 0 0.79rem 0;
  background: #eee;
  /* height: 100%; */
}

.foot {
  font-size: 12px;
  padding-left: 20rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 10;

  /* width:7.5rem; */
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.8rem;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(238, 238, 238, 1);
}

.submit-btn {
  /* z-index: 10; */
  line-height: 0.79rem;
  color: #fff;
  text-align: center;
  width: 1.99rem;
  height: 0.79rem;
  background: rgba(252, 67, 150, 1);
}

.no_data {
  width: 100%;
  height: 900rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.isReimburse {
  color: #ffb99d;
  text-align: center;
}
.over_banner {
  font-size: 20rpx;
  color: #666666;
  text-align: center;
  padding: 17rpx;
}
</style>
