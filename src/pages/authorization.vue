<template>
  <div>
    <open-data type="userAvatarUrl"></open-data>
    <open-data type="userNickName"></open-data>
    <div class="inputBox">
      <i-input i-class="input" :value="user.mobile" type="number" title="手机号" placeholder="请输入手机号"  @change="phone"  maxlength="11"/>
      <i-input i-class="input input1" :value="phoneY" type="number" title="验证码" placeholder="请输入验证码" @change="phoneCode" maxlength="6" />
      <i-button :i-class="status?'button1': 'button1 button2'"  @click="handleClick()"  size="default ">{{time}}</i-button>
    </div>
    <button
      :disabled="!(phoneY&&user.mobile&& user.mobile.length >= 11)"
      :class="(phoneY&&user.mobile && user.mobile.length >= 11)? 'author' : 'author author1'"
      v-if="canIUse"
      open-type="getUserInfo"
      @getuserinfo="userInfo">授权并登录</button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
import QQMapWX from "../utils/qqmap-wx-jssdk.min.js";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo"),
      // list: ['scope.userLocation'],
      all: false,
      phoneY: "",
      status: true,
      index: 0,
      i: 60,
      time: "验证码"
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    phone(event) {
      console.log(event);
      this.$set(this.user, "mobile", event.target.detail.value);
      // this.$set(this,'mobile', event.target.detail.value)
    },
    phoneCode(event) {
      this.phoneY = event.target.detail.value;
    },
    handleClick() {
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!this.user.mobile) {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000
        });
      } else if (!reg.test(this.user.mobile)) {
        wx.showToast({
          title: "请输入正确手机号",
          icon: "none",
          duration: 2000
        });
      } else {
        this.$set(this, "status", false);
        if (this.i == 60 && this.index == 0) {
          this.index = this.index + 1;
          this.Countdown();
          var option = {
            mobile: this.user.mobile,
            templateCode: "SMS_137390046"
          };
          this.$http.post("/common/sendSms", option).then(res => {});
        }
      }
    },
    Countdown() {
      var _this = this;
      _this.$set(_this, "time", _this.i + "秒后");
      var timer = "";
      clearInterval(timer);
      timer = setInterval(function() {
        if (_this.i <= 0) {
          _this.status = true;
          _this.time = "重新获取";
          _this.$set(_this, "i", 60);
          clearInterval(timer);
          _this.index = 0;
        } else {
          _this.$set(_this, "i", _this.i - 1);
          _this.$set(_this, "time", _this.i + "秒后");
        }
      }, 1000);
    },
    userInfo: function(e) {
      console.log(5555);
      var _this = this;
      wx.getSetting({
        success(res) {
          console.log(
            e.mp.detail.rawData,
            res.authSetting["scope.userLocation"],
            res.authSetting["scope.userInfo"],
            _this.all
          );
          if (res.authSetting["scope.userLocation"] == undefined) {
            console.log(11111111111111);
            _this.login();
          } else {
            if (res.authSetting["scope.userInfo"] == true) {
              console.log(222222222222222);
              _this.getLocation(
                res.authSetting["scope.userLocation"] == false ? true : null
              );
            } else {
              _this.locationFail();
            }
          }
        }
      });
    },
    login() {
      var _this = this;
      wx.getSetting({
        success(res) {
          console.log(res, "第二个弹窗");
          if (!res.authSetting["scope.userLocation"]) {
            console.log(555555555555555);
            wx.authorize({
              scope: "scope.userLocation",
              success() {
                console.log(123);
                _this.getLocation();
              },
              fail() {
                _this.getLocation(true);
              }
            });
          }
        }
      });
    },
    getLocation(state) {
      var _this = this;
      console.log(state, "state");
      if (state == true) {
        _this.$store.commit("updateCity", "全国");
        _this.$store.commit("updateCityId", "");
        _this.getUserInfo();
      } else {
        wx.getLocation({
          type: "wgs84",
          success: function(res) {
            console.log(res, 2);
            var latitude = res.latitude;
            var longitude = res.longitude;
            var speed = res.speed;
            var accuracy = res.accuracy;
            _this.$set(_this.user, "latitude", latitude);
            _this.$set(_this.user, "longitude", longitude);
            var qqmapsdk = new QQMapWX({
              key: "DSJBZ-MZ7EP-A62D7-V3Y5R-GTB2J-Z4F7C"
            });
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: latitude,
                longitude: longitude
              },
              success: function(res) {
                console.log(res, 4);
                _this.$set(
                  _this.user,
                  "city",
                  res.result.address_component.city
                );
                _this.$store.commit(
                  "updateCity",
                  res.result.address_component.city
                );
                _this.$http
                  .post("/common/getCityId", {
                    areaName: res.result.address_component.city
                  })
                  .then(res => {
                    _this.$store.commit("updateCityId", res.data);
                  });
                console.log(_this.$store.state, "初始石家庄定位");
                _this.$set(
                  _this.user,
                  "province",
                  res.result.address_component.province
                );
                _this.getUserInfo();
              }
            });
          },
          fail: function() {
            _this.locationFail();
          }
        });
      }
    },
    getUserInfo() {
      var _this = this;
      wx.getUserInfo({
        success: function(res) {
          // 昵称+头像
          console.log(res, 1);
          _this.$set(_this.user, "avatarUrl", res.userInfo.avatarUrl);
          _this.$set(_this.user, "gender", res.userInfo.gender);
          _this.$set(_this.user, "nickName", res.userInfo.nickName);
          wx.login({
            success: function(loginRes) {
              if (loginRes.code) {
                console.log(loginRes, "是的合法");
                wx.request({
                  url:
                    "https://api.weixin.qq.com/sns/jscode2session?appid=wxb35784c778465400&secret=04fc7a500bcbc262c4f33934102584ac&js_code=" +
                    loginRes.code +
                    "&grant_type=authorization_code",
                  method: "GET",
                  success: function(res) {
                    console.log(res, 6);
                    _this.$set(_this.user, "openid", res.data.openid);
                    _this.$set(_this.user, "session_key", res.data.session_key);
                    var obj = {
                      openID: res.data.openid,
                      nickName: _this.user.nickName,
                      avatarUrl: _this.user.avatarUrl,
                      mobile: _this.user.mobile,
                      verify: _this.phoneY,
                      gender: _this.user.gender
                      // city:_this.user.city,
                      // province:_this.user.province
                    };
                    _this.$http
                      .post("/customer/saveCustomerInfoFromWeixin", obj)
                      .then(res => {
                        console.log(res, "短信", obj);
                        if (res.code === 1) {
                          wx.request({
                            url: _this.$store.state.httpUrl + "/auth/login",
                            method: "POST",
                            data: {
                              loginName: obj.openID,
                              platform: "shop4",
                              terminalType: "shop4"
                            },
                            header: {
                              "content-type":
                                "application/x-www-form-urlencoded"
                            },
                            success: function(res) {
                              console.log(res, 3);
                              if (res.data.code == 1) {
                                _this.$set(
                                  _this.user,
                                  "custId",
                                  res.data.data.user.id
                                );
                                _this.$set(
                                  _this.user,
                                  "token",
                                  res.data.data.user.token
                                );
                                _this.$store.commit("updateIsLogin", true);
                                console.log("登录成功，检测");
                                console.log(
                                  "_this.$store.state.invited",
                                  _this.$store.state.invited
                                );
                                if (!_this.$store.state.invited) {
                                  wx.reLaunch({
                                    url: "/pages/others/interested"
                                  });
                                } else {
                                  _this.$router.go(-1);
                                }
                              }
                            }
                          });
                        } else {
                          wx.showToast({
                            title: res.msg,
                            icon: "none",
                            duration: 2000
                          });
                        }
                      });
                  }
                });
              }
            }
          });
        }
      });
      _this.$store.commit("updateUser", _this.user);
      console.log(_this.user);
    },
    locationFail() {
      var _this = this;
      wx.showModal({
        showCancel: false,
        title: "提示",
        content: "授权后可获得完整体验 ",
        confirmText: "确定",
        success(res) {
          _this.openSetting();
        }
      });
    },
    openSetting() {
      var _this = this;
      wx.openSetting({
        success: function(data) {
          console.log(data);
          if (
            data.authSetting["scope.userLocation"] == true &&
            data.authSetting["scope.userInfo"] == true
          ) {
            wx.showToast({
              title: "授权成功",
              icon: "success",
              duration: 2000
            });
            _this.all = true;
          } else {
            wx.showToast({
              title: "授权失败",
              icon: "none",
              duration: 2000
            });
            _this.all = false;
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.inputBox {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.authorize {
  background: url("http://img.meiduduo.com/images/author.png") no-repeat center
    77rpx;
  background-size: 603rpx 491rpx;
  padding: 606rpx 60rpx 0;
  font-size: 32rpx;
  color: #333333;
}
.authorize span {
  display: block;
  height: 32rpx;
  line-height: 32rpx;
  margin-bottom: 56rpx;
  text-align: center;
}

.authorize .author {
  display: block;
  height: 88rpx;
  line-height: 88rpx;
  background: #00bf00;
  width: 100%;
  color: #fff;
  border-radius: 6rpx;
  text-align: center;
}
.authorize .author.author1 {
  background: #ccc;
}
</style>
