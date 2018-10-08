<template>
  <div>

    <!--搜索框-->
    <div class="fixation">
      <div style="padding: 0.2rem;background-color:#FFFFFF;">
        <search></search>
      </div>
      <!--导航栏-->
      <div style="margin-bottom: 0.2rem; background-color: #FBFBFB;">
        <!-- <navigation></navigation> -->
        <i-tabs :current="current_scroll" scroll color="#FF4691" @change="handleChangeScroll($event)" class="i-ad">
          <i-tab :key="i" :title="v.label" v-for=" (v,i) in tabArr" ></i-tab>
        
        </i-tabs>
      </div>
    </div>
  
    <div class="content">
      <div style="margin-bottom: 0.2rem;">
        <flowLayout :tabArrItem="tabArrItem" :tabArr="tabArr"></flowLayout>
      </div>
    </div>
    <!-- 底部加载 -->
    <!-- <i-load-more /> -->
    <!-- <i-load-more tip="暂无数据" :loading="false" /> -->
    <!-- <i-load-more :loading="false" /> -->
    <navigator open-type="navigate" url="./shop/cart">
      <div class="cart-icon">
        <i class="c"></i>
      </div>
    </navigator>

  </div>



</template>

<script>
const util = require("@/utils/qqmap-wx-jssdk.min.js");
import tab from "./comm/tab.vue";
import search from "./comm/search.vue"; //顶部搜索框
import navigation from "./comm/navigation.vue"; //顶部频道导航
import flowLayout from "./comm/flowLayout.vue"; //流布局商城列表

export default {
  components: {
    search,
    navigation,
    flowLayout,
    tab
  },
  data() {
    return {
      productArr: [],
      isRefrensh: false,
      current_scroll: 0,
      tabArr: [],
      tabArrItem: {}
    };
  },

  created() {
    this.getTabs();
  },
  onShow() {
    // this.getTabs();
  },
  onReady() {
    // this.getTabs();
  },
  mounted() {
    // this.getTabs();
    console.log(this.tabArr);
  },
  methods: {
    //获取tab列表
    getTabs() {
      this.$http
        .post("common/dictList", { masterCode: "channel_type" })
        .then(res => {
          if (res.code == 1) {
            this.tabArr = res.data;
            console.log(this.tabArr);
            this.tabArrItem = this.tabArr[this.current_scroll];
            // console.log(this.tabArrItem);
          }
        });
    },
    handleChangeScroll({ mp }) {
      console.log(mp);
      this.current_scroll = mp.detail.key;
      this.vm.$emit("vv", this.tabArr[this.current_scroll]);
    }
  }
};
</script>

<style scoped>
.i-ad {
  color: cadetblue;
}
.cart-icon {
  width: 1rem;
  height: 1rem;
  background: rgba(0, 0, 0, 1);
  opacity: 0.85;
  border-radius: 50%;
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
}

.cart-icon i {
  background: url("http://img.meiduduo.com/images/shop/cart.png");
  width: 0.48rem;
  height: 0.4rem;
  background-size: contain;
  margin: 0 auto;
  /* background: rgba(255, 255, 255, 1); */
  display: block;
}

.content {
  margin-top: 1.1rem;
  height: 100%;
  /* top:2rem; */
  background-color: #f1f1f1;
  /* margin-top: 2rem; */
}

.fixation {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2000;
  background-color: #f1f1f1;
}
</style>
