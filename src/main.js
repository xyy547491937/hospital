import Vue from "vue";
import App from "@/App";
import store from "@/store";
import Qs from "qs";
import MD5 from "js-md5";
import FMC from "./utils/fidcollector";

import "./css/common.css";
import "./css/resetUI.css";
import "./css/iconfont.css";

import MpvueRouterPatch from "mpvue-router-patch";
Vue.use(MpvueRouterPatch);

var Fly = require("flyio/dist/npm/wx");
var fly = new Fly();

//配置请求基地址
fly.config.timeout = 5000;
fly.config.baseURL = "http://192.168.1.230:8200/shop4/"; // 测试地址
// fly.config.baseURL = "http://192.168.1.200:8201/shop4/"; // 开发地址
// fly.config.baseURL = "http://wx.lan.meiduduo.com/shop4/"; // 调试登录地址
fly.config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
fly.config.headers['Access-Control-Allow-Origin'] = '*';

// Add a request interceptor
fly.interceptors.request.use(request => {
  // Do something before request is sent
  request.headers["X-Tag"] = "flyio";
  // Complete the request with custom data
  // return Promise.resolve("fake data")
});

// Add a response interceptor
fly.interceptors.response.use(
  response => {
    // Do something with response data .
    // Just return the data field of response
    console.log(response.data);
    return response.data;
  },
  err => {
    // Do something with response error
    //return Promise.resolve("ssss")
  }
);

Vue.prototype.$http = fly;

Vue.prototype.changeJump = function (path, query) {
  //changeData是函数名
  this.$router.push({
    path: path,
    query: query
  });
};
Vue.config.productionTip = false;
App.store = store;
App.mpType = "app";

const app = new Vue(App);
app.$mount();
let vm = new Vue({})
Vue.prototype.vm = vm
export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: "light",
      navigationBarBackgroundColor: "#fff",
      navigationBarTitleText: "胚豆",
      navigationBarTextStyle: "black"
    },
    tabBar: {
      borderStyle: "white",
      backgroundColor: "#fff",
      selectedColor: "#FF4691",
      color: "#666",
      list: [{
          pagePath: "pages/index",
          iconPath: "static/images/tab1.png",
          selectedIconPath: "static/images/tab1-s.png",
          text: "首页"
        },
        {
          pagePath: "pages/shop",
          selectedIconPath: "static/images/tab2-s.png",
          iconPath: "static/images/tab2.png",
          text: "商城"
        },
        {
          pagePath: "pages/mine",
          selectedIconPath: "static/images/tab3-s.png",
          iconPath: "static/images/tab3.png",
          text: "我的"
        }
      ]
    }
  }
};

//formid收集
// var fmc = require("http://img.meiduduo.com/utils/fidcollector.js");
// Vue.prototype.$fmc = fmc
// var fmc = require("@/utils/fidcollector.js");
// Vue.prototype.$fmc = fmc
