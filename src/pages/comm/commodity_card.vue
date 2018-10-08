<template>
  <div @click="jump" class="commodity">
    <img class="commodity_img" :src="data.commImg" alt="">
    <div class="commodity_main">
      <span class="commodity_title">[吸脂瘦脸]{{ data.commName }}</span>
      <span class="commodity_content">{{ data.remark }}</span>
      <div class="commodity_info">
        <span>￥{{ data.rulePrice }}</span>
        <span>￥{{ data.price }}</span>
        <span>{{ data.buyNum }}人购买</span>
      </div>
      <div class="commodity_footer">
        <div class="commodity_dot">
          <span v-if="data.distance" style="background: #D29DFF;">{{ data.distance }}m</span>
          <span v-if="data.isStage == 1" style="background: #FA97E6;">分</span>
          <span v-if="data.isInsurance == 1" style="background: #74DEC4;">保</span>
        </div>
        <img :src="data.logo" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      
    }
  },
  methods: {
    jump () {
      this.$emit('jump', this.data.id)
    },
  }
}
</script>

<style scoped>
.commodity {
  break-inside: avoid;
  width: 334rpx;
  box-sizing: border-box;
  /* margin: 20rpx; */
}
.commodity_img {
  display: block;
  width: 334rpx;
  height: 350rpx;
  border-top-left-radius: 8rpx;
  border-top-right-radius: 8rpx;
}
.commodity_main {
  padding: 20rpx 17rpx;
  background: #fff;
}
.commodity_title {
  font-size: 26rpx;
  color: #333333;
  margin-bottom: 21rpx;
}
.commodity_content {
  font-size: 24rpx;
  color: #666666;
  margin-bottom: 26rpx;
}
.commodity_info {
  font-size: 24rpx;
  color: #999999;
  display: flex;
  align-items: flex-end;
  margin-bottom: 25rpx;
}
.commodity_info span:first-child {
  font-size: 30rpx;
  color: #FF4691;
  margin-right: 14rpx;
}
.commodity_info span:last-child {
  flex: 1;
  text-align: right;
}
.commodity_footer {
  display: flex;
  justify-content: space-between;
  font-size: 22rpx;
  color: #fff;
}
.commodity_dot > span {
  padding: 6rpx 12rpx 8rpx 11rpx;
  border-radius: 4rpx;
  margin-right: 8rpx;
}
.commodity_dot > span:last-child {
  margin-right: 0;
}
.commodity_footer > img {
  display: block;
  width: 72rpx;
  height: 32rpx;
}
</style>
