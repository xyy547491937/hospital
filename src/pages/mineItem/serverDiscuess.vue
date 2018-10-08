<template>
  <div class="c server-discuess">
    
    <div class="tab">
        <!-- 引入组件 -->
    <tab :titledata="nav" @clickactive="clickactive"></tab>
    </div>
    <div class="co">
        <!-- 引入组件 -->
        <serverDiscuessList :rateArr="rateArr" :isDisabled="false" :rateArr1="rateArr1" @isRefrensh="isRefrensh"></serverDiscuessList>
    </div>
      <div class="no_data" v-if="rateArr.length < 1">
			<p>没有数据</p>
		</div>
		<div class="over_banner" v-if="isOver && rateArr.length > 0">
			<p>数据加载完毕</p>
		</div>
  </div>
</template>
<script>
import tab from "@/pages/comm/tab";
import serverDiscuessList from "@/pages/comm/serverDiscuessList";
export default {
  data() {
    return {
      nav: [
        {
          title: "全部",
          badgeNum: "3"
        },
        {
          title: "待评价",
          badgeNum: ""
        },
        {
          title: "已评价",
          badgeNum: ""
        }
      ],
      count: 5,
      startIndex: 1,
      discuessText: "",
      rateArr1: [
        {
          title: "接待服务",
          iconfont: "icon-reception",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "咨询服务",
          iconfont: "icon-seek",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "诊疗服务",
          iconfont: "icon-diagnosis",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "收银服务",
          iconfont: "icon-account",
          startIndex: 0,
          discuessText: ""
        }
      ],
      rateArr2: [
        {
          title: "接待服务",
          iconfont: "icon-reception",
          startIndex: 0,
          discuessText: ""
        },
        {
          title: "美容师服务",
          iconfont: "icon-beauty",
          startIndex: 0,
          discuessText: ""
        }
      ],
      stating: {},
      rateArr: [],
      isRequest: false,
      pageNum: 1,
      pageSize: 15,
      isOver: true
    };
  },
  components: {
    tab,
    serverDiscuessList
  },
  mounted() {
    this.getDiscuess();
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getDiscuess(this.stating);
    }
  },
  methods: {
    getDiscuess(state = "") {
      this.$http
        .post("serviceEvaluation/list4Page", {
          state: state,
          peopleId: 781,
          peopleId: this.$store.state.userInfo.peopleId,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            // conosle.log(this.rateArr);
            let a = res.data.data;
            a.forEach(v => {
              this.$set(v, "qt", "");
              this.$set(v, "wt", "");
              this.$set(v, "et", "");
            });
            if (res.data.pageNum == 1) {
              this.rateArr = a;
            } else {
              this.rateArr = this.rateArr.concat(a);
            }
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
          }
        });
    },
    clickactive(msg) {
      this.stating = msg;
      this.rateArr = [];
      //   console.log(this.stating);
      switch (this.stating.title) {
        case "全部":
          this.getDiscuess();
          break;
        case "待评价":
          this.getDiscuess("F");
          break;
        default:
          this.getDiscuess("E");
          break;
      }
    },
    isRefrensh(msg) {
      this.isRequest = msg;
      if (this.isRequest) {
        this.getDiscuess();
        return false;
      }
    }
  }
};
</script>
<style>
.tab {
  height: 87rpx;
}
.server-discuess {
  /* padding: 0 0.5rem; */
  font-size: 0.24rem;
  color: #333;
  font-family: PingFangSC-Medium;
  /* padding-top: 10px; */
  background: #f1f1ff;
}
.over_banner {
  font-size: 20rpx;
  color: #666666;
  text-align: center;
  padding: 17rpx;
}
.no_data {
  width: 100%;
  height: 900rpx;
  margin-top: 30rpx;
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
