<template>
  <div class="fight_group">
    <div class="tabs">
      <i-tabs :current="current" color="#f759ab" @change="handleChange">
          <i-tab key="tab1" title="正在热拼"></i-tab>
          <i-tab key="tab2" title="即将开始"></i-tab>
      </i-tabs>
    </div>
    <div v-if="current == 'tab1'" class="group_list">
      <img class="img" src="http://img.meiduduo.com/images/shop/pt.png" mode="aspectFit">
      <div class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <div class="isOver" v-if="isOver && pageNum > 1">
        <p>数据加载完毕</p>
      </div>
      <div class="no_data" v-if="list.length < 1">
        <p>没有数据</p>
      </div>
    </div>
    <div v-if="current == 'tab2'" class="group_list">
      <img class="img" src="http://img.meiduduo.com/images/shop/banner1.png">
      <div class="content">
        <projectCard v-for="(item, index) of list" :key="index" :data="item"></projectCard>
      </div>
      <div class="isOver" v-if="isOver && pageNum > 1">
        <p>数据加载完毕</p>
      </div>
      <div class="no_data" v-if="list.length < 1">
        <p>没有数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import projectCard from './project_card.vue'
export default {
  data () {
    return {
      current: 'tab1',
      list: [],
      pageNum: 1, // 页数
      pageSize: 10, // 每页条数
      isOver: false, // 是否加载完毕
    }
  },
  components: {
    projectCard
  },
  mounted () {
    // this.query(1)
  },
  onShow () {
    this.isOver = false
    this.list = []
    this.query(1)
  },
  onUnload () {
    this.isOver = false
    this.list = []
    this.pageNum = 1
  },
  onReachBottom () {
    this.lower()
  },
  methods: {
    handleChange (val) {
      this.current = val.target.key
      this.isOver = false
      this.list = []
      this.pageNum = 1
      if (this.current == 'tab1') {
        this.query(1)
      }
      if (this.current == 'tab2') {
        this.query(0)
      }
    },
    lower () {
      if (this.isOver) { // 如果数据加载完毕，不再触发请求
        return
      }
      if (this.current == 'tab1') {
        this.query(1)
      }
      if (this.current == 'tab2') {
        this.query(0)
      }
    },
    query (val) {
      let self = this
      this.$http.post('fightGroup/list4PageGroupVersion4', {
          onState: val,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
      }).then(res => {
        this.dealData(res)
      })
    },
    dealData (res) {
      if (res.code === 1) {
        if (this.pageNum >= res.data.pages || res.data.data.length < this.pageSize) {
          this.isOver = true
        } else {
          this.pageNum++
        }
        this.list = this.list.concat(res.data.data)
      }
    }
  }
}
</script>

<style scoped>
.img {
  width: 100%;
  height: 2.1rem;
}
.isOver {
  font-size: 22rpx;
  color: #d9d9d9;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  padding: 17rpx 0;
}
.tabs {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.no_data {
  width: 100%;
  height: 400rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24rpx;
  color: #d9d9d9;
  text-align: center;
}
.group_list {
  margin-top: 90rpx;
}
</style>
