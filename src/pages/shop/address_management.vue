<template>
  <div class="address_management">
    <addressCard v-for="(item, index) of address" :key="index" :data="item" @deleteSuccess="getAddressList" @edit="childEdit"></addressCard>
    <span @click="addNewAddress" class="add_address">新增地址</span>
  </div>
</template>

<script>
import addressCard from "../comm/addressCard";
export default {
  components: {
    addressCard
  },
  data() {
    return {
      address: [] // 地址列表
    };
  },
  mounted() {
    this.getAddressList();
  },
  onShow() {
    this.getAddressList();
  },
  onUnload() {
    this.address = [];
  },
  methods: {
    getAddressList() {
      // 获取收货地址列表
      this.$http
        .post("address/listByCondition", {
          custId: this.$store.state.userInfo.custId,
          state: 1
        })
        .then(res => {
          if (res.code === 1) {
            this.address = res.data.data;
          }
        });
    },
    addNewAddress() {
      this.$router.push({
        path: "shipping_address"
      });
    },
    childEdit(val) {
      let a = JSON.stringify(val);
      this.$router.push({
        path: "shipping_address",
        query: {
          data: a
        }
      });
    }
  }
};
</script>

<style scoped>
.address_management {
  background: #f1f1f1;
  min-height: 100%;
}
.add_address {
  position: fixed;
  bottom: 41rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 600rpx;
  height: 80rpx;
  text-align: center;
  line-height: 80rpx;
  box-sizing: border-box;
  border-radius: 40rpx;
  background: #ff4691;
  color: #fff;
  box-shadow: 0 0 4rpx #ff4691;
  font-size: 32rpx;
}
</style>
