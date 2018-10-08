<template>
  <div class="c ">
    <!-- 引入组件 -->
    <!-- <tab :titledata="nav"></tab> -->
    <div class="pin" v-for="(item,i) in rateArr " :key="i">


      <div class="flex-c">
        <p class="discuess-time flex-r"> <span class="c">{{item.arriveTime }} 至 {{item.leaveTime }}</span>
          <span class="state-btn" v-if="item.state=='E'">已评价</span>
          <span class="state-btn no-state-btn" v-if="item.state=='F'" @click="editorDiscuess(item)">发表评价</span>

        </p>
      </div>
      <!-- 医院信息title -->
      <div class="hospital-title flex-r">
        <img :src="item.logo" alt="">
        <div class="flex-c" style="margin-left:10px;">
          <span class="hospital-title-oargan"> {{item.organName }}</span>
          <span class="hospital-title-text">{{item.projectName }}</span>
        </div>
      </div>
      <!-- server-list -->
      <!-- 接待服务 -->
      <div class="rate-box">
        <p class="flex-r server-list"> <span class="server-icon icon-reception"></span>
          <span class="server-text"> 接待服务</span>
          <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate :value="item.receptionistStar " :count="count" v-on:change="change3($event,item,1)" size="15"
                  :disabled="item.state=='E'?true:false">
                </i-rate>
              </i-cell>
            </i-cell-group>
          </span>

          <span class="server-text" style="text-align:right;"> {{q}}</span>
        </p>

      <!-- </div> -->
      <!-- 咨询服务 -->
      <!-- <div class="rate-box"> -->
        <p class="flex-r server-list"> <span class="server-icon icon-seek"></span>
          <span class="server-text"> 咨询服务</span>
          <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate :value="item.counselorStar  " :count="count" v-on:change="change3($event,item,2)"
                  size="15" :disabled="item.state=='E'?true:false">
                </i-rate>
              </i-cell>
            </i-cell-group>
          </span>

          <span class="server-text" style="text-align:right;"> {{w}}</span>
        </p>

      <!-- </div> -->
      <!-- 诊疗服务 -->
      <!-- <div class="rate-box"> -->
        <p class="flex-r server-list"> <span class="server-icon icon-diagnosis"></span>
          <span class="server-text"> 诊疗服务</span>
          <span class="rates">
            <i-cell-group>
              <i-cell title="很好">
                <i-rate :value="item.doctorStar  " :count="count" v-on:change="change3($event,item,3)"
                  size="15" :disabled="item.state=='E'?true:false">
                </i-rate>
              </i-cell>
            </i-cell-group>
          </span>

          <span class="server-text" style="text-align:right;"> {{ e}} </span>
        </p>

      </div>
      <!-- !TODO 评价内容没有 -->
      <!-- 写评论 -->
      <div class="editor-text">
        <textarea placeholder="这次服务让您感觉满意吗？快来说说吧" placeholder-style="color:#AAABB3;" style="width:100% " auto-focus
          maxlength="-1"  :disabled="item.state=='E'" />
        </div>
</div>
  </div>
</template>
<script>
import tab from "@/pages/comm/tab";
export default {
  props: ["rateArr", "isDisabled", "rateArr1"],
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
      q: "",
      w: "",
      e: ""
    };
  },
  components: {
    tab
  },
  computed: {},
  methods: {
    change3(e, item, n) {
      const index = e.mp.detail.index;

      if (n == 1) {
        item.receptionistStar = index;
        // this.q = index;/
      } else if (n == 3) {
        item.doctorStar = index;
        // this.w = index;
      } else if (n == 2) {
        item.counselorStar = index;
      }
      //   console.log(item, index);
      this.iswei(index, n);
    },
    iswei(index, n) {
      let discuessText = "";
      switch (index) {
        case 1:
          discuessText = "差";
          break;
        case 2:
          discuessText = "一般";
          break;
        case 3:
          discuessText = "一般";
          break;
        case 4:
          discuessText = "好";
          break;
        case 5:
          discuessText = "很好";
          break;
        default:
          discuessText = "很差";
      }
      // return discuessText;
      if (n == 1) this.q = discuessText;
      if (n == 2) this.w = discuessText;
      if (n == 3) this.e = discuessText;
    },
    editorDiscuess(item) {
      // console.log(item.receptionistStar);
      this.$http
        .post("serviceEvaluation/saveEvaluate", {
          organId: item.organId,
          serviceRecordId: item.serviceRecordId,
          receptionistId: item.receptionistId,
          receptionistStar: item.receptionistStar,
          doctorId: item.doctorId,
          doctorStar: item.doctorStar,
          counselorId: item.counselorId,
          counselorStar: item.counselorStar
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: "评论成功",
              icon: "none"
            });
            this.$emit("isRefrensh", true);
          }
        });
    }
  }
};
</script>
<style scoped>
.flex-c {
  display: flex;
  flex-direction: column;
}

.flex-r {
  display: flex;
  flex-direction: row;
}
.pin {
  margin-bottom: 15px;
  background: #fff;
  padding: 15px;
  margin-top: 15px;
}

.discuess-time {
  color: #bbb;
  justify-content: space-between;
}

.state-btn {
  /* 已评价 */
  width: 1.2rem;
  height: 0.41rem;
  background: rgba(230, 230, 230, 1);
  border-radius: 16px;
  text-align: center;
  line-height: 0.41rem;
  color: #fff;
}

.no-state-btn {
  /* 待评价 */
  background-color: #ff4691;
}

.hospital-title {
  margin-top: 15px;
  align-items: center;
  justify-content: flex-start;
}

.hospital-title img {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}

.hospital-title-oargan {
  font-size: 0.3rem;
  font-weight: bold;
}
.rates {
  width: 50%;
  text-align: center;
}
.hospital-title-text {
  font-size: 0.26rem;
  margin-top: 10px;
  /* margin-left: 10px; */
}
.server-list {
  /* width: 100%; */
  align-items: center;
  justify-content: flex-start;
  font-size: 0.28rem;
}
.server-icon {
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 0.3rem;
  height: 0.3rem;
}
.rate-box {
  border-top: 1rpx solid #ddd;
  border-bottom: 1rpx solid #ddd;
  padding: 15px 0;
  margin-top: 15px;
  width: 100%;
}
.server-text {
  display: block;
  width: 20%;
  text-align: center;
}
.icon-reception {
  background-image: url("http://img.meiduduo.com/images/xyy/smile.png");
}
.icon-seek {
  background-image: url("http://img.meiduduo.com/images/xyy/dmessage.png");
}
.icon-diagnosis {
  background-image: url("http://img.meiduduo.com/images/xyy/docker.png");
}
.icon-account {
  background-image: url("http://img.meiduduo.com/images/xyy/smoney.png");
}
.icon-beauty {
  background-image: url("http://img.meiduduo.com/images/xyy/mrs.png");
}
.editor-text textarea {
  font-size: 0.28rem;
  min-height: 3rem;
  padding: 10px 0;
}
</style>
