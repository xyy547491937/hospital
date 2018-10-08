<template>
  <div class="special_offer">
    <div v-for="(item, index) of hotList" :key="index" class="offer">
      <hotCard :data="item"></hotCard>
    </div>
    <div class="list_none" v-if="hotList.length < 1">
      <p>没有数据！</p>
    </div>
  </div>
</template>

<script>
import hotCard from './hot_card'
export default {
  components: {
    hotCard
  },
  data () {
    return {
      hotList: []
    }
  },
  onShow () {
    this.getDocterHot()
  },
  onUnload () {
    this.hotList = []
  },
  methods: {
    getDocterHot () {
      let params = {
        pageNum: 1,
        pageSize: this.$route.query.total || 15
      }
      if (this.$route.query.id) {
        params.servicePersonalId = this.$route.query.id
      }
      this.$http.post('commodity/commodityList', params).then(res => {
        if (res.code === 1) {
          this.hotList = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
.special_offer {
  background: #f1f1f1;
  min-height: 100vh;
}
.offer {
  background: #fff;
  margin-bottom: 17rpx;
}
.list_none {
  text-align: center;
  font-size: 24rpx;
  color: #999;
  height: 400rpx;
  line-height: 400rpx;
}
</style>
