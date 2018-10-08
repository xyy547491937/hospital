<template>
    <div class="search">
        <i-row>

			<!-- <i-col span="4"></i-col> -->
			<i-col span="5"><div class="index-address" @click="jump">{{currentCity1}}</div></i-col>
			<i-col span="19"><div class="search-address"><input type="text" class="index-input" placeholder="请输入"> </div></i-col>
			<!-- <i-col span="4"><div class="index-search">搜索</div> </i-col> -->

        </i-row>
        <citySelect></citySelect>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentCity1: ""
    };
  },
  props: {
    currentCity: String
  },
  watch: {
    currentCity(value) {
      this.$set(this, "currentCity1", value);
      this.currentCity1 = value;
    }
  },
  onLoad() {
    this.$set(this, "currentCity1", this.currentCity);
  },
  onShow() {
    this.currentCity = this.$store.state.curCity;
  },
  methods: {
    init() {
      this.$set(this, "currentCity1", this.$store.state["curCity"]);
    },
    jump() {
      this.$router.push({ path: "/pages/citySelect" });
    }
  }
};
</script>

<style scoped>
.search {
  width: 100%;
  height: 0.78rem;
  box-sizing: border-box;
  padding: 0 0.24rem;
}
.search-address {
  height: 0.56rem;
  box-sizing: border-box;
  border-radius: 1.2rem;
  background: #f5f5f5 url("http://img.meiduduo.com/images/search.png") no-repeat
    11px center;
  background-size: 0.28rem 0.3rem;
  padding-left: 62rpx;
  margin: 11rpx 0;
}
.index-address {
  font-size: 0.26rem;
  height: 0.78rem;
  text-align: center;
  line-height: 0.78rem;
  padding-right: 24rpx;
  background: url("http://img.meiduduo.com/images/cityIcon.png") no-repeat right
    center;
  background-size: 0.2rem 0.12rem;
  margin-right: 0.21rem;
}
.index-input {
  font-size: 0.28rem;
}
.index-search {
  margin-top: 0.05rem;
  text-align: center;
  font-size: 0.3rem;
}
</style>
