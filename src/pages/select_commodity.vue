<template>
  <scroll-view scroll-y style="height: 100vh;" @scrolltolower="query" class="select_commodity">
    <div class="selcet_box">
      <div @click="selectF('item1')">
        <span :class="{ 'active': activeItem == 'item1' }">{{ selectProject }}</span>
        <i-icon v-if="activeItem != 'item1'" type="unfold" color="#555555" size="18" />
        <i-icon v-else type="packup" color="#FC4396" size="18" />
      </div>
      <div @click="selectF('item2')">
        <span :class="{ 'active': activeItem == 'item2' }">{{ selectArea }}</span>
        <i-icon v-if="activeItem != 'item2'" type="unfold" color="#555555" size="18" />
        <i-icon v-else type="packup" color="#FC4396" size="18" />
      </div>
      <div @click="selectF('item3')">
        <span :class="{ 'active': activeItem == 'item3' }">{{ selectSort }}</span>
        <i-icon v-if="activeItem != 'item3'" type="unfold" color="#555555" size="18" />
        <i-icon v-else type="packup" color="#FC4396" size="18" />
      </div>
      <div @click="selectF('item4')">
        <span :class="{ 'active': activeItem == 'item4' }">{{ selectInfo }}</span>
        <i-icon v-if="activeItem != 'item4'" type="unfold" color="#555555" size="18" />
        <i-icon v-else type="packup" color="#FC4396" size="18" />
      </div>
    </div>
    <!-- 选择类别 -->
    <div v-if="activeItem == 'item1'" class="item1_select select_item">
      <scroll-view scroll-y style="height: 600rpx;" class="item1_select_left">
        <span @click="projectSelect(index, item)" :class="{ 'project_left': projectActive === index }" class="item_span" v-for="(item, index) of arrs" :key="index">{{ item.cateName }}</span>
      </scroll-view>
      <scroll-view scroll-y style="height: 600rpx;" class="item1_select_right">
        <span @click="projectItemSelect(index, item)" :class="{ 'project_left': projectItemActive === index }" class="item_span" v-for="(item, index) of arrs2" :key="index">{{ item.cateName }}</span>
      </scroll-view>
    </div>
    <!-- 选择区域 -->
    <div v-if="activeItem == 'item2'" class="item1_select select_item">
      <scroll-view scroll-y style="height: 600rpx;" class="item1_select_left">
        <span @click="projectSelect1(index, item)" :class="{ 'project_left': projectActive1 === index }" class="item_span" v-for="(item, index) of areaList" :key="index">{{ item.label }}</span>
      </scroll-view>
      <scroll-view scroll-y style="height: 600rpx;" class="item1_select_right">
        <!-- <span @click="projectItemSelect(index, item)" :class="{ 'project_left': projectItemActive === index }" class="item_span" v-for="(item, index) of arrs2" :key="index">{{ item.cateName }}</span> -->
      </scroll-view>
    </div>
    <!-- 选择排序 -->
    <div v-if="activeItem == 'item3'" class="item3_select">
      <span @click="sortSelect(0)" :class="{ 'project_left': sortItemActive == 0 }" class="item_span">销量最多</span>
      <span @click="sortSelect(1)" :class="{ 'project_left': sortItemActive == 1 }" class="item_span">最新上架</span>
    </div>
    <!-- 筛选 -->
    <div v-if="activeItem == 'item4'" class="item4_select select_item">

    </div>
    <div class="list_box">
      <commodityCard v-for="(item, index) of list" :key="index" :data="item" @jump="jump"></commodityCard>
    </div>
    <div class="list_over" v-if="list.length > 0 && isOver">
      <p>数据加载完毕！</p>
    </div>
    <div class="list_none" v-if="isOver && list.length < 1">
      <p>没有数据！</p>
    </div>
  </scroll-view>
</template>

<script>
import commodityCard from './comm/commodity_card'
export default {
  components: {
    commodityCard
  },
  data () {
    return {
      list: [],
      pageNum: 1,
      isOver: false,
      channelCode: null, // 频道编码
      id: null, // 分类id
      tier: null, // 层级
      params: {
        pageSize: 15
      },
      selectProject: '全部项目', // 选择的项目
      selectArea: '全城', // 选择的区域
      selectSort: '智能排序', // 选择的排序
      selectInfo: '筛选', // 筛选条件
      activeItem: '',
      arrs: [], // 项目分类
      arrs2: [], // 项目
      projectItemActive: null, // 选择的项目index
      projectActive: null,
      sortItemActive: null, // 选择的排序index
      areaList: [], // 区域id
      projectActive1: null,
      firstLeavlId: null,
    }
  },
  onShow () {
    this.channelCode = this.$route.query.channelCode
    this.id = this.$route.query.id
    this.tier = this.$route.query.tier
    this.getList()
    this.queryDiaryType()
    this.getArea()
  },
  onUnload () {
    this.list = []
    this.isOver = false
    this.pageNum = 1
    this.channelCode = null
    this.arrs = []
    this.arrs2 = []
    this.projectItemActive = null // 选择的项目index
    this.projectActive = null
    this.sortItemActive = null // 选择的排序index
    this.areaList = []
    this.projectActive1 = null
    this.firstLeavlId = null
  },
  methods: {
    projectSelect1 (index, item) {
      this.initQuery()
      if (this.projectActive1 == index) {
        this.projectActive1 = null
        delete this.params.areaId
      } else {
        this.projectActive1 = index
        this.params.areaId = item.id
      }
      this.getList()
    },
    getArea () { // 获取区域信息
      this.$http.post('common/getAreaTree', {
        // TODO: 这里写死了 石家庄市的id
        pId: 37
      }).then(res => {
        if (res.code === 1) {
          this.areaList = res.data
        }
      })
    },
    jump (val) {
      this.$router.push({
        path: 'others/productDetails',
        query: {
          id: val
        }
      })
    },
    sortSelect (val) { // 选择排序规则
      this.sortItemActive = val
    },
    initQuery () { // 重置分页和列表数据
      this.isOver = false
      this.pageNum = 1
    },
    projectItemSelect (val, item) { // 选择二级分类
      this.initQuery()
      if (this.projectItemActive == val) {
        this.projectItemActive = null
        this.id = this.firstLeavlId
      } else {
        this.projectItemActive = val
        this.id = item.id
      }
      this.getList()
    },
    projectSelect (val, item) { // 选择一级分类，请求二级分类
      this.initQuery()
      this.firstLeavlId = item.id
      if (this.projectActive == val) {
        this.projectActive = null
        this.id = null
        this.arrs2 = []
        delete this.params.categoryId
      } else {
        this.projectActive = val
        this.id = item.id
        this.projectItemActive = null
        if (item.channelCode) {
          this.$http.post('projectCate/listByCondition', {
            pId: item.id,
            tier: item.tier + 1
          }).then(res => {
            if (res.code === 1) {
              this.arrs2 = res.data
            }
          })
        }
      }
      this.getList()
    },
    getList () { // 请求数据
      if (this.isOver) {
        return
      }
      wx.showLoading({
        title: '正在加载中...'
      })
      this.params.pageNum = this.pageNum
      // if (this.channelCode) {
      //   this.params.channelCode = this.channelCode
      // }
      if (this.$store.state.userInfo.latitude) {
        this.params.lat = this.$store.state.userInfo.latitude
      }
      if (this.$store.state.userInfo.longitude) {
        this.params.lng = this.$store.state.userInfo.longitude
      }
      if (this.id) {
        this.params.categoryId = this.id
      }
      // if (this.tier) {
      //   this.params.tier = this.tier
      // }
      this.$http.post('commodity/commodityList', this.params).then(res => {
        wx.hideLoading()
        if (res.code === 1) {
          if (this.pageNum == 1) {
            this.list = []
          }
          this.list = this.list.concat(res.data.data)
          if (this.pageNum < res.data.pages) {
            this.pageNum++
            this.isOver = false
          } else {
            this.isOver = true
          }
        }
      })
    },
    query () {
      this.getList()
    },
    selectF (val) {
      if (this.activeItem == val) {
        this.activeItem = ''
      } else {
        this.activeItem = val
      }
    },
    queryDiaryType () {
      this.$http.post('projectCate/listByCondition', {
        tier: this.tier,
        channelCode: this.channelCode,
        categoryId: this.id
      }).then(res => {
        console.log(res)
        this.arrs = res.data
      })
    }
  }
}
</script>

<style scoped>
.select_commodity {
  background: #F5F5F5;
  box-sizing: border-box;
  padding-top: 80rpx;
}
.list_box {
  column-count: 2;
  column-gap: 0;
  width: 100%;
  margin-top: 20rpx;
  padding: 0 20rpx;
}
.list_item {
  break-inside: avoid;
  box-sizing: border-box;
}
.selcet_box {
  width: 100%;
  display: flex;
  align-items: stretch;
  font-size: 26rpx;
  color: #555555;
  background: #fff;
  border-bottom: 1rpx solid #f1f1f1;
  height: 80rpx;
  position: fixed;
  top: 0;
}
.selcet_box > div {
  flex: 1;
  border-right: 1rpx solid #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.selcet_box > div:last-child {
  border: none;
}
.active {
  color: #FC4396;
}
.select_item {
  width: 100%;
  height: 600rpx;
  box-sizing: border-box;
  position: fixed;
  top: 80rpx;
}
.item3_select {
  width: 100%;
  height: 176rpx;
  box-sizing: border-box;
  position: fixed;
  top: 80rpx;
  background: #fff;
}
.item3_select {
  border-top: 1rpx solid #f1f1f1;
}
.item1_select_left {
  width: 260rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.item_span {
  height: 88rpx;
  width: 100%;
  text-align: left;
  line-height: 88rpx;
  font-size: 26rpx;
  color: #333333;
  display: block;
  padding: 0 26rpx;
  box-sizing: border-box;
}
.item1_select {
  display: flex;
}
.project_left {
  background: #F5F5F5;
  color: #FC4396;
}
.item1_select_right {
  background: #F5F5F5;
}
.list_over, .list_none {
  font-size: 20rpx;
  text-align: center;
  padding: 17rpx 0;
}
.list_none {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400rpx;
}
</style>
