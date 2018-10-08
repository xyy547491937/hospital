<template>
    <div >
       <!--<div>-->
       		<!--<div class="ls_tab">-->
       				<div class="tab-box">
       						<div class="ls_tab">
       								<div v-for="(item, index) in tabList" :key="index" @click="changeIndex(item.numIn)">
       										<span class="border" :class="{active:item.numIn == isIndex}">{{item.title}}</span>
       								</div>
                       <div v-for="(item, index) in tabList1" :key="index" @click="changeIndex(item.numIn)">
       										<span class="border" :class="{active:item.numIn == isIndex}">{{item.title}}</span>
       								</div>
       						</div>
                   <div class="add">
                     <i-icon type="add" size="18" style="text-align: center;width:100%;display:block;" />
                   </div>
       				</div>
       		<!--</div>-->
       <!--</div>-->
    </div>
</template>

<script>
export default {
  data() {
    return {
      tabList: [
        {
          title: "推荐",
          numIn: "recommend"
        },
        {
          title: "关注",
          numIn: "attention"
        },
        {
          title: "小视频",
          numIn: "video"
        },
        {
          title: "同城",
          numIn: "local"
        }
      ],
      tabList1: [],
      isIndex: "recommend"
    };
  },

  onLoad () {
    this.channel()
  },
  onShow() {
    // this.channel()
  },
  methods: {
    channel () {
      this.tabList1 = []
      this.$http.post("/common/dictList", {masterCode: 'channel_type'}).then(res => {
        res.data.forEach(ele => {
          if (ele.detailName == '医美') {
            this.tabList1.push({
              title: "医美",
              numIn: "medicine",
              detailCode: ele.detailCode
            })
          } else {
            // if (ele.detailName == '美容院') {
            //   this.tabList1.push({
            //     title: "美容院",
            //     numIn: "beauty",
            //     detailCode: ele.detailCode
            //   })
            // }
          }
        }, this);
        // this.tabList.push(res.data)
        console.log(this.tabList)
        // this.$set(this, 'tabList', res.data)
      });
    },
    changeIndex(id) {
      this.isIndex = id;
      this.$emit("clickOK", { type: this.isIndex });
    }
  }
};
</script>

<style scoped>
.add {
  position: absolute;
  right: 0;
  width: 0.66rem;
  line-height: 78rpx;
  box-shadow: -4px 0px 11px #eee;
  line-height: 76rpx;
  height: 76rpx;
  border-bottom: 2rpx solid #fbfbfb;
  box-sizing: border-box;
}
.tab-box {
  height: 80rpx;
  overflow: hidden;
  background: #fbfbfb;
  display: flex;
  display: -webkit-flex;
  position: relative;
  padding-right: 0.66rem;
}
.ls_tab {
  display: -webkit-box;
  overflow-x: scroll;
  height: 80rpx;
  -webkit-overflow-scrolling: touch;
  background: #fbfbfb;
  width: 100%;
}
.ls_tab::-webkit-scrollbar {
  display: none;
}
.ls_tab div {
  padding: 0 0.26rem;
  font-size: 0.3rem;
  color: #555555;
  font-family: "PingFangSC-Regular";
  font-weight: 500;
}
.ls_tab div span {
  display: inline-block;
  border-top: 2rpx solid #fbfbfb;
  line-height: 76rpx;
  height: 76rpx;
  border-bottom: 2rpx solid #fbfbfb;
  box-sizing: border-box;
}
.ls_tab div span.active {
  color: #ff4691;
  font-weight: bold;
  border-bottom: 2rpx solid #ff4691;
}
</style>
