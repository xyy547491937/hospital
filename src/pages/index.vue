<template>
	<div>
		<!--搜索框-->
		<div class="fixation">

			<div style="background-color:#FFFFFF;">
				<search v-bind:currentCity="currentCity"></search>
			</div>
			<!--导航栏-->
			<div class="nav" style="background-color: #FBFBFB;" :class="{none:none}">
				<navigation @clickOK="clickOK"></navigation>
			</div>
		</div>
		<div class="content" v-if="clickNow=='recommend'">
			<recommend @changeFixed="changeFixed"></recommend>
		</div>
		<div class="content" v-if="clickNow!='recommend'">
			<plant :Data="itemData"></plant>
		</div>


	</div>



</template>

<script>
import QQMapWX from "../utils/qqmap-wx-jssdk.min.js";
import search from "./comm/search.vue"; //顶部搜索框
import navigation from "./comm/navigation.vue"; //顶部频道导航
import plant from "./middle/plant.vue"; //非推荐
import recommend from "./middle/recommend.vue"; //推荐
// 	import advertising from '../comm/advertising.vue' //广告位
// 	import videoPlay from '../comm/videoPlay.vue' //视频主体
// 	import smallVideo from '../comm/smallVideo.vue' //视频框
// 	import channel from '../comm/channel.vue' //带频道名字外部框
// 	import project from '../comm/project.vue' //不带频道名字外部框
// 	import typeArticle from '../comm/typeArticle.vue' //文章列表
// 	import typeProject from '../comm/typeProject.vue' //项目列表
// 	import typeDiary from '../comm/typeDiary.vue' //日记列表
// 	import projectList from '../comm/projectList.vue' //商品列表
// 	import goodList from '../comm/goodList.vue' //商品列表
// 	import tabClassify from '../comm/tabClassify.vue' //分类导航
// 	import optimizationList from '../comm/optimizationList.vue' //优选榜单
// 	import banner from '../comm/banner.vue' //banner图
// 	import grid from '../comm/grid.vue' //宫格
// 	import doctor from '../comm/doctor.vue' //关注医生
// 	import lifeBeautifyProject from '../comm/lifeBeautifyProject.vue' //横排项目
//
// import videoList from '../comm/videoList.vue' //小视频
export default {
  components: {
    search,
    navigation,
    plant,
    recommend
  },
  data() {
    return {
      clickNow: "recommend",
      itemData: {},
      currentCity: "",
      none: false
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    var _this = this;
    wx.getSetting({
      success(res) {
        console.log(res, 454);
        if (res.authSetting["scope.userInfo"]) {
          if (res.authSetting["scope.userLocation"]) {
            _this.login(false);
          } else {
            _this.login(true);
          }
        } else {
          wx.showModal({
            showCancel: false,
            title: "提示",
            content: "你还未登录，登录后可获得完整体验 ",
            confirmText: "一键登录",
            success(res) {
              // 点击一键登录，去授权页面
              _this.router(res);
            },
            fail(res) {
              _this.router(res);
            }
          });
        }
      }
    });
    _this.getData("recommend");
  },
  onShow() {
    console.log(this.$store.state, "监测vuex数据值");
  },
  methods: {
    router(res) {
      if (res.confirm) {
        wx.reLaunch({
          url: "/pages/authorization"
        });
      }
      if (res.cancel) {
        wx.reLaunch({
          url: "/pages/authorization"
        });
      }
    },
    login(state) {
      var _this = this;
      if (state) {
        _this.$store.commit("updateCity", "全国");
        _this.$store.commit("updateCityId", "");
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
                _this.$set(
                  _this.user,
                  "province",
                  res.result.address_component.province
                );
              }
            });
          }
        });
      }
      wx.login({
        success: function(loginRes) {
          if (loginRes.code) {
            wx.request({
              url:
                "https://api.weixin.qq.com/sns/jscode2session?appid=wxb35784c778465400&secret=04fc7a500bcbc262c4f33934102584ac&js_code=" +
                loginRes.code +
                "&grant_type=authorization_code",
              method: "GET",
              success: function(res) {
                console.log(res, 6);
                _this.$set(_this.user, "openid", res.data.openid);
                wx.request({
                  url: _this.$store.state.httpUrl + "/auth/login",
                  method: "POST",
                  data: {
                    loginName: res.data.openid,
                    platform: "shop4",
                    terminalType: "shop4"
                  },
                  header: {
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  success: function(res) {
                    console.log(res, 3);
                    if (res.data.code == 1) {
                      _this.user.avatarUrl = res.data.data.user.icon;
                      _this.user.gender = res.data.data.user.sex == "M" ? 1 : 0;
                      _this.user.nickName = res.data.data.user.username;
                      _this.user.mobile = res.data.data.user.mobile;
                      _this.user.peopleId = res.data.data.user.userId;
                      _this.user.openid = res.data.data.user.loginName;
                      _this.user.custId = res.data.data.user.id;
                      _this.user.token = res.data.data.user.token;
                      _this.$store.commit("updateIsLogin", true);
                      if (_this.$store.state.invited) {
                        _this.$router.go(-1);
                      }
                    }
                  }
                });
              }
            });
          }
        }
      });
      console.log(_this.$store.state, "初始石家庄定位");
    },
    changeFixed(flag) {
      this.none = flag;
    },
    getData(type) {
      if (type == "attention") {
        this.itemData.ishow = {
          advertising: "hidden",
          typeArticle: "hidden",
          lifeBeautifyProject: "hidden",
          typeProject: "hidden",
          typeDiary: "hidden",
          smallVideo: "hidden",
          nochannelVideo: "hidden",
          goodList: "hidden",
          tabClassify: "hidden",
          optimizationList: "hidden",
          banner: "hidden",
          grid: "hidden",
          doctor: "hidden",
          videoList: "hidden",
          loacalAll: "show"
        };
      } else if (type == "local") {
        this.itemData.ishow = {
          advertising: "hidden",
          typeArticle: "show",
          lifeBeautifyProject: "hidden",
          typeProject: "show",
          typeDiary: "show",
          smallVideo: "hidden",
          nochannelVideo: "hidden",
          goodList: "hidden",
          tabClassify: "hidden",
          optimizationList: "hidden",
          banner: "hidden",
          grid: "hidden",
          doctor: "show",
          videoList: "hidden"
        };
      } else if (type == "video") {
        this.itemData.ishow = {
          advertising: "hidden",
          typeArticle: "hidden",
          lifeBeautifyProject: "hidden",
          typeProject: "hidden",
          typeDiary: "hidden",
          smallVideo: "hidden",
          nochannelVideo: "hidden",
          goodList: "hidden",
          tabClassify: "hidden",
          optimizationList: "hidden",
          banner: "hidden",
          grid: "hidden",
          doctor: "hidden",
          videoList: "show"
        };
      } else if (type == "medicine") {
        this.itemData.ishow = {
          advertising: "hidden",
          typeArticle: "hidden",
          lifeBeautifyProject: "hidden",
          typeProject: "hidden",
          typeDiary: "show",
          smallVideo: "hidden",
          nochannelVideo: "hidden",
          goodList: "hidden",
          tabClassify: "show",
          optimizationList: "show",
          banner: "show",
          grid: "show",
          doctor: "hidden",
          videoList: "hidden"
        };
      } else if (type == "beauty") {
        this.itemData.ishow = {
          advertising: "hidden",
          typeArticle: "hidden",
          lifeBeautifyProject: "show",
          typeProject: "hidden",
          typeDiary: "hidden",
          smallVideo: "hidden",
          nochannelVideo: "hidden",
          goodList: "show",
          tabClassify: "hidden",
          optimizationList: "hidden",
          banner: "show",
          grid: "hidden",
          doctor: "hidden",
          videoList: "hidden"
        };
      }
      this.clickNow = type;
    },
    clickOK(out) {
      if (out) {
        this.getData(out.type);
      }
    }
  }
};
</script>

<style scoped>
.nav.none {
  display: none;
}
.content {
  margin-top: 1.58rem;
  height: 100%;
  /* top:2rem; */
  background-color: #f1f1f1;
}

.fixation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background-color: #f1f1f1;
}
</style>
