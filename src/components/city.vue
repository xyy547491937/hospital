<template>
	<div class="z-width-100-percent">
    <div class="cityL">
      <scroll-view scroll-y style="height:calc(100vh);" scroll-top="0" :scroll-into-view=currView>
        <dl class="ub-box ub-col">
          <dd class="z-width-100-percent z-margin-bottom-5-px z-bg-color-fff ub-box ub-ver">
            <div class="search ub-box ub-ver-v">
              <i class="iconfont icon-sousuo z-color-666 z-font-size-16"></i>
              <input
                class="ub-flex-1 z-font-size-14 z-color-666 z-padding-v-5-px z-margin-left-8-px"
                placeholder="城市/拼音" v-model="searchText" @change="searchFn(searchText)"/>
            </div>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box z-border-bottom-1-eee">
            <span id="cc" class="z-font-size-14 z-font-weight-bold z-color-333 z-padding-all-8-px">当前：{{currentCity}}</span>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">定位</span>
            <!-- <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">定位/最近访问</span> -->
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box">
            <ul class="ub-box ub-wrap z-padding-all-8-px">
              <!-- <li @click.stop="clickCity(city)" v-for="(city, idx) in visitCityList" :key="idx" class="hotcity z-font-size-14 z-color-333">{{city.name}}</li> -->
              <li @click.stop="clickCity(position, positionId)" class="hotcity z-font-size-14 z-color-333">{{position}}</li>
            </ul>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">热门城市</span>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box">
            <ul class="ub-box ub-wrap z-padding-all-8-px">
              <li @click.stop="clickCity(city)" v-for="(city, idx) in hotCityList" :key="idx" class="hotcity z-font-size-14 z-color-333">{{city.name}}</li>
            </ul>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box" v-if="search">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">所有城市</span>
          </dd>
          <dd class="ub-box ub-col" v-if="search">
            <div v-for="(val, idx) in cityList" :key="idx" class="z-width-100-percent z-bg-color-fff ub-box ub-col">
              <span :id="val.initial" class="ub-flex-1 z-padding-all-8-px z-font-size-14 z-color-888 codeBK">{{val.initial}}</span>
              <ul class="ub-box ub-col">
                <li @click.stop="clickCity(city)" v-for="(city, i) in val.list" :key="i" class="city ub-flex-1 z-font-size-14 z-color-666">{{city.name}}</li>
              </ul>
            </div>
          </dd>
          <dd class="z-width-100-percent z-bg-color-fff ub-box" v-if="!search">
            <span class="z-font-size-14 z-color-333 z-font-weight-bold z-padding-all-8-px">搜索结果</span>
          </dd>
          <dd class="ub-box ub-col" v-if="!search">
            <div v-for="(val, idx) in searchList" :key="idx" class="z-width-100-percent z-bg-color-fff ub-box ub-col">
              <span :id="val.initial" class="ub-flex-1 z-padding-all-8-px z-font-size-14 z-color-888 codeBK">{{val.initial}}</span>
              <ul class="ub-box ub-col">
                <li @click.stop="clickCity(city)" v-for="(city, i) in val.list" :key="i" class="city ub-flex-1 z-font-size-14 z-color-666">{{city.name}}</li>
              </ul>
            </div>
          </dd>
        </dl>
      </scroll-view>
      <!--fixed部分-->
      <dl class="fixList ub-box ub-col ub-ver-v">
        <dt class="z-font-size-12 z-margin-bottom-3-px" style="color:#06c1ae">最近热门</dt>
        <dd @click.stop="clickCode(val)" v-for="(val, idx) in cityList" :key="idx" class="z-font-size-12" style="margin-bottom:2px;color:#06c1ae;padding:0 50px;">{{val.initial}}</dd>
      </dl>
    </div>
	</div>
</template>
<script>
// import cityData from "../utils/city.js"
// import QQMapWX from "../utils/qqmap-wx-jssdk.min.js"
export default {
  data() {
    return {
      currView: "",
      search: true,
      searchText: "",
      searchList: [
        {
          zip: "110000",
          pinyin: "B",
          name: "北京市",
          id: 2
        },
        {
          zip: "310000",
          pinyin: "S",
          name: "上海市",
          id: 10
        },
        {
          zip: "440100",
          pinyin: "G",
          name: "广州市",
          id: 232
        },
        {
          zip: "440300",
          pinyin: "S",
          name: "深圳市",
          id: 234
        },
        {
          zip: "120000",
          pinyin: "T",
          name: "天津市",
          id: 3
        },
        {
          zip: "510100",
          pinyin: "C",
          name: "成都市",
          id: 273
        },
        {
          zip: "330100",
          pinyin: "H",
          name: "杭州市",
          id: 122
        },
        {
          zip: "500000",
          pinyin: "C",
          name: "重庆市",
          id: 23
        }
      ],
      visitCityList: [
        { zip: "010", name: "北京" },
        { zip: "021", name: "上海" }
      ],
      hotCityList: [
        {
          zip: "110000",
          pinyin: "B",
          name: "北京市",
          id: 2
        },
        {
          zip: "310000",
          pinyin: "S",
          name: "上海市",
          id: 10
        },
        {
          zip: "440100",
          pinyin: "G",
          name: "广州市",
          id: 232
        },
        {
          zip: "440300",
          pinyin: "S",
          name: "深圳市",
          id: 234
        },
        {
          zip: "120000",
          pinyin: "T",
          name: "天津市",
          id: 3
        },
        {
          zip: "510100",
          pinyin: "C",
          name: "成都市",
          id: 273
        },
        {
          zip: "330100",
          pinyin: "H",
          name: "杭州市",
          id: 122
        },
        {
          zip: "500000",
          pinyin: "C",
          name: "重庆市",
          id: 23
        }
      ],
      cityList: [],
      selectCity: {}
    };
  },
  computed: {
    currentCity() {
      return this.$store.state.curCity;
    },
    position() {
      return this.$store.state.userInfo.city;
    },
    positionId() {
      return this.$store.state.curCityId;
    }
  },
  onReady() {
    this.initCityList();
    this.currView = "";
  },
  methods: {
    searchFn(text) {
      this.$set(this, "search", false);
      this.$http.post("/common/getCityArea", { areaName: text }).then(res => {
        this.$set(this, "searchList", res.data);
      });
    },
    initCityList() {
      this.$http.post("/common/getCityArea", { areaName: "" }).then(res => {
        this.$set(this, "cityList", res.data);
      });
    },
    clickCode(obj) {
      if (obj.list.length < 1) return;
      this.currView = obj.initial;
    },
    clickCity(city, id) {
      if (id) {
        this.$emit("cityService", { name: city, id: id });
      } else {
        this.$emit("cityService", city);
      }
    }
  }
};
</script>
<style scoped>
.search {
  background: #f5f5f5;
  width: 90%;
  border-radius: 15px;
  padding: 0 10px;
}
.codeBK {
  background: #f5f5f5;
}
.hotcity {
  border: 1px solid #f5f5f5;
  padding: 6px 12px;
  margin: 0 8px 8px 0;
}
.city {
  padding: 10px 8px;
  border-bottom: 1px solid #f5f5f5;
}
.fixList {
  position: fixed;
  right: 5px;
  top: 12%;
  z-index: 10;
  width: 30px;
  background: transparent;
}
</style>
