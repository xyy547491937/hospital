<template>
  <div class="shipping_address">
    <div class="box">
       <!-- placeholder="请填写真实名字" -->
      <div class="item_input">
        <i-input @change="userNameF" :value="userName" type="text" title="收货人:" autofocus />
      </div>
       <!-- placeholder="联系人手机号" -->
      <div class="item_input number_input">
        <i-input @change="phoneF" :value="phone" type="number" title="联系电话:" />
      </div>
      
      <div class="item_input">
        <i-input @change="areaF" @click="toggleRight1" :value="area" type="text" title="所在地区:" :placeholder="addressText" disabled />
      </div>
      
      <!-- placeholder="街道、楼牌号等"  -->
      <div class="item_input">
        <i-input @change="addressF" :value="address" type="text" title="详细地址:" maxlength="100" />
      </div>
      
    </div>
    <div>
      <i-cell title="默认地址：每次下单默认使用该地址">
          <switch @click="selectF" slot="footer" :checked="check" />
      </i-cell>
    </div>
    <span @click="saveAddress" class="add_address">保存</span>
    <i-drawer mode="right" :visible="showRight1" @close="toggleRight1">
        <view class="drawer">
            <div class="select_city">
              <div class="citys">
                <scroll-view class="city_box" scroll-y style="height: 70vh;">
                  <p @click="selectCity1(index, item)" v-for="(item, index) of list1" :key="index" class="city_item" :class="{ 'active_item': activeIndex1 == index }">{{ item.label }}</p>
                </scroll-view>
                <scroll-view class="city_box" scroll-y style="height: 70vh;">
                  <p @click="selectCity2(index, item)" v-for="(item, index) of list2" :key="index" class="city_item" :class="{ 'active_item': activeIndex2 == index }">{{ item.label }}</p>
                </scroll-view>
                <scroll-view class="city_box" scroll-y style="height: 70vh;">
                  <p @click="selectCity3(index, item)" v-for="(item, index) of list3" :key="index" class="city_item" :class="{ 'active_item': activeIndex3 == index }">{{ item.label }}</p>
                </scroll-view>
              </div>
              <!-- <p @click="select_ok" class="ok_btn">确定</p> -->
            </div>
        </view>
    </i-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      phone: "",
      area: null,
      address: "",
      check: false,
      state: 1, // 是否有效
      id: null, // 收货地址id
      select: 0, // 是否设为默认地址
      showRight1: false,
      list1: [], // 省份
      list2: [], // 市区
      list3: [], // 县区
      activeIndex1: null,
      activeIndex2: null,
      activeIndex3: null,
      provinceId: null,
      cityId: null,
      areaId: null,
      addressText: "", // 地址信息
      provinceName: "",
      cityName: "",
      areaName: ""
    };
  },
  onShow() {
    console.log(this.$route.query);
    if (this.$route.query.data) {
      const a = JSON.parse(this.$route.query.data);
      this.userName = a.custName;
      this.id = a.id;
      this.address = a.address;
      this.select = a.isDefaults;
      this.phone = a.tel;
      this.addressText = `${a.provinceName}${a.cityName}${a.areaName}`;
      this.provinceId = a.provinceId;
      this.cityId = a.cityId;
      this.areaId = a.areaId;
      this.provinceName = a.provinceName;
      this.cityName = a.cityName;
      this.areaName = a.areaName;
      if (a.isDefaults) {
        this.check = true;
      } else {
        this.check = false;
      }
    }
  },
  mounted() {
    console.log(this.$route);
    this.getCityList1(1);
    console.log(this.list1);
  },
  onUnload() {
    this.provinceId = null;
    this.cityId = null;
    this.areaId = null;
    this.userName = "";
    this.phone = "";
    this.area = null;
    this.address = "";
    this.check = false;
    this.state = 1; // 是否有效
    this.select = 0;
    this.list1 = [];
    this.list2 = [];
    this.list3 = [];
    this.addressText = "";
    this.activeIndex1 = null;
    this.activeIndex2 = null;
    this.activeIndex3 = null;
    this.provinceName = "";
    this.cityName = "";
    this.areaName = "";
  },
  methods: {
    select_ok() {
      this.showRight1 = false;
      // this.activeIndex1 = null
      // this.activeIndex2 = null
      // this.activeIndex3 = null
    },
    selectCity1(index, val) {
      this.list2 = [];
      this.list3 = [];
      this.activeIndex1 = index;
      this.activeIndex2 = null;
      this.activeIndex3 = null;
      this.provinceId = val.id; // 省份
      this.cityId = null;
      this.areaId = null;
      this.addressText = "";
      this.addressText = val.label;
      this.provinceName = val.label;
      this.cityName = "";
      this.areaName = "";
      this.getCityList2(val.id);
    },
    selectCity2(index, val) {
      this.list3 = [];
      this.activeIndex2 = index;
      this.activeIndex3 = null;
      this.cityId = val.id;
      this.areaId = null;
      this.addressText = this.addressText + val.label;
      this.cityName = val.label;
      this.areaName = "";
      this.getCityList3(val.id);
    },
    selectCity3(index, val) {
      this.addressText = this.addressText + val.label;
      this.activeIndex3 = index;
      this.areaId = val.id;
      this.areaName = val.label;
    },
    getCityList1(val) {
      this.$http
        .post("common/getAreaTree", {
          pId: val
        })
        .then(res => {
          if (res.code === 1) {
            console.log(res);
            this.list1 = res.data;
          }
        });
    },
    getCityList2(val) {
      this.$http
        .post("common/getAreaTree", {
          pId: val
        })
        .then(res => {
          if (res.code === 1) {
            console.log(res);
            this.list2 = res.data;
          }
        });
    },
    getCityList3(val) {
      this.$http
        .post("common/getAreaTree", {
          pId: val
        })
        .then(res => {
          if (res.code === 1) {
            console.log(res);
            this.list3 = res.data;
          }
        });
    },
    toggleRight1() {
      this.showRight1 = !this.showRight1;
    },
    saveAddress() {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.phone)) {
        wx.showToast({
          title: "手机号码有误",
          image: "http://img.meiduduo.com/images/shop/cancel.png"
        });
        return false;
      }
      let params = {
        custId: this.$store.state.userInfo.custId,
        custName: this.userName,
        provinceId: this.provinceId,
        cityId: this.cityId,
        areaId: this.areaId,
        address: this.address,
        tel: this.phone,
        isDefaults: this.select,
        state: this.state,
        provinceName: this.provinceName,
        cityName: this.cityName,
        areaName: this.areaName
      };
      if (this.id) {
        params.id = this.id;
      }
      this.$http.post("address/save", params).then(res => {
        if (res.code === 1) {
          this.$router.go(-1);
        }
        if (res.code !== 1) {
          wx.showModal({
            title: "保存失败",
            content: res.msg,
            showCancel: false
          });
        }
      });
    },
    selectF() {
      this.check = !this.check;
      if (this.check) {
        this.select = 1;
      } else {
        this.select = 0;
      }
    },
    userNameF(event) {
      if (event.target.detail.value) {
        this.userName = event.target.detail.value;
      } else {
        this.userName = "";
      }
    },
    phoneF(event) {
      if (event.target.detail.value) {
        this.phone = event.target.detail.value;
      } else {
        this.phone = "";
      }
    },
    areaF(event) {
      if (event.target.detail.value) {
        this.area = event.target.detail.value;
      } else {
        this.area = "";
      }
    },
    addressF(event) {
      if (event.target.detail.value) {
        this.address = event.target.detail.value;
      } else {
        this.address = "";
      }
    }
  }
};
</script>

<style scoped>
.shipping_address {
  min-height: 100%;
  background: #f1f1f1;
}
.box {
  margin-bottom: 17rpx;
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
.select_city {
  font-size: 22rpx;
  color: #333;
  width: 100%;
  height: 100vh;
  background: #fff;
  padding: 30rpx;
}
.citys {
  display: flex;
}
.city_box {
  width: 160rpx;
  margin: 10rpx 5rpx;
  border: 1rpx solid #f1f1f1;
}
.city_item {
  padding: 15rpx 10rpx;
}
.ok_btn {
  text-align: center;
  background: #ff4691;
  color: #fff;
  margin-top: 30rpx;
  padding: 15rpx 0;
  width: 400rpx;
}
.active_item {
  color: #ff4691;
  background: #f1f1f1;
}
.drawer {
  z-index: 9999;
}
.area_style {
  margin-top: 1rpx solid #f1f1f1;
}
.item_input {
  margin-bottom: 2rpx;
}
.number_input {
  margin-bottom: 0rpx;
}
</style>
