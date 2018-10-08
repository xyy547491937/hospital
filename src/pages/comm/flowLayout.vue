<template>
  <div>

    <i-row v-if="productArr.length>0">
      <i-col span="12">
        <!-- {{productArr}} -->
        <div v-for="(leftitem,leftindex) in slitArr" :key="leftindex">

          <div class="FLkuang">

            <img :src="leftitem.commImg" :style="{height:leftitem.heightline}" class="classimg" @click="jump(leftitem)">
            <div class="FLtitle">{{leftitem.organName}}</div>
            <div class="FLdetails">
              <h5>[{{leftitem.commName}}]
                <span> {{leftitem.remark}}</span>
              </h5>
            </div>
            <div class="active">
              <span class="red" v-if="leftitem.isStage ">分期</span>
              <span class="green" v-if="leftitem.isInsurance ">保险</span>
              <span class="green">{{leftitem.distance}}米</span>
              <span class="red" v-if="leftitem.isRecommend ">推荐</span>
            </div>
            <div class="price">
              <span>
                <span class="price-span">¥{{leftitem.rulePrice}}</span>
                <span class="price-old">¥{{leftitem.price}}</span>
              </span>

              <span class="count-buy">
                <div class="c" @click="favoriteProduct(leftitem)">
                  <i-icon type="like" size="17" v-if="!leftitem.favourite" />
                  <i-icon type="like" size="17" color="#FF4691" v-else />
                </div>

                <div style="margin-left: 0.05rem;display: inline-block;">{{leftitem.favourite?"已收藏":"收藏"}}</div>
              </span>

            </div>
          </div>

        </div>

       
      </i-col>
      <i-col span="12">
        <div v-for="(rightitem,rightindex) in slitLastArr" :key="rightindex">

          <div class="FLkuang">

            <img :src="rightitem.commImg" style="height:20rem" class="classimg" @click="jump(rightitem)">
            <div class="FLtitle">{{rightitem.organName}}</div>
            <div class="FLdetails">
              <h5>[{{rightitem.commName}}]
                <span>{{rightitem.remark}}</span>
              </h5>
            </div>
            <div class="active">
              <span class="red" v-if="rightitem.isStage ">分期</span>
              <span class="green" v-if="rightitem.isInsurance ">保险</span>
              <span class="green">{{rightitem.distance}}米</span>
              <span class="red" v-if="rightitem.isRecommend ">推荐</span>
            </div>
            <div class="price">
              <span>
                <span class="price-span">¥{{rightitem.rulePrice}}</span>
                <span class="price-old">¥{{rightitem.price}}</span>
              </span>

              <span class="count-buy">
                <div class="c" @click="favoriteProduct(rightitem)">
                  <i-icon type="like" size="17" v-if="!rightitem.favourite" />
                  <i-icon type="like" size="17" color="#FF4691" v-else />
                </div>

                <div style="margin-left: 0.05rem;display: inline-block;">{{rightitem.favourite?"已收藏":"收藏"}}</div>
              </span>
            </div>
          </div>

        </div>

      </i-col>



    </i-row>
    <!-- <div class="noProduct" v-if="productArr.length==0">
      暂无数据
    </div> -->
     <div class="no_data" v-if="productArr.length < 1">
          <p>没有数据</p>
        </div>
        <div class="over_banner" v-if="isOver && productArr.length > 0">
          <p>数据加载完毕</p>
        </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["tabArrItem", "tabArr"],
  data() {
    return {
      slitArr: [],
      slitLastArr: [],
      productArr: [],
      pageNum: 1,
      pageSize: 15,
      isOver: true,
      channelState: this.tabArrItem
    };
  },
  computed: mapState(["isLogin", "curCityId"]),

  mounted() {
    this.getMedicalInstitution();
    this.vm.$on("vv", msg => {
      this.channelState = msg;
      this.productArr = [];
      this.getMedicalInstitution(this.channelState);
    });
  },
  onShow() {
    this.productArr = [];
    this.getMedicalInstitution();
  },
  methods: {
    jump(item) {
      this.$router.push({
        path: "/pages/others/productDetails",
        query: {
          id: item.id
        }
      });
    },

    getMedicalInstitution(item = this.tabArrItem) {
      this.$http
        .post("commodity/commodityList", {
          channelCode: item.detailCode,
          areaId: this.curCityId || "",
          lat: this.$store.state.userInfo.latitude || "",
          lag: this.$store.state.userInfo.longitude || "",
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          if (res.code == 1) {
            let a = res.data.data;

            this.productArr = this.productArr.concat(a);
            if (this.pageNum == res.data.pages || a.length < this.pageSize) {
              this.isOver = true;
            } else {
              this.pageNum++;
              this.isOver = false;
            }
            this.splitArr();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    splitArr() {
      this.slitArr = this.productArr.slice(
        0,
        Math.ceil(this.productArr.length / 2)
      );
      this.slitLastArr = this.productArr.slice(
        Math.ceil(this.productArr.length / 2),
        this.productArr.length
      );
    },
    //点击收藏
    favoriteProduct(item) {
      this.$http
        .post("storeRecord/save", {
          recordId: item.id,
          custId: this.$store.state.userInfo.custId, //模拟用户id
          recordType: 3, //3:商品; 4:资讯; 9:小视频
          state: item.favourite ? "-1" : "1"
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: item.favourite ? "取消成功" : "收藏成功",
              icon: "none"
            });
            item.favourite = !item.favourite;

            // this.getDetail();
            // this.$emit("isFavorite", true);
          }
        });
    }

    // //点击获取商品id
    // getProductID(item) {}
  },
  onReachBottom() {
    if (!this.isOver) {
      this.getMedicalInstitution(this.channelState);
    }
  }
};
</script>

<style scoped>
.noProduct {
  display: flex;
  height: 200px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #999;
  font-size: 14px;
}

.price-old {
  text-decoration: line-through;
  font-weight: normal;
}

.price-span {
  color: #ff5097;
  font-weight: bold;
  margin-right: 0.2rem;
}

.FLkuang .price {
  font-size: 0.24rem;
  color: #999;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin: 0.1rem 0 0.2rem 0.1rem;
  font-size: 0.24rem;
}

.FLkuang .count-buy {
  font-size: 0.24rem;
  padding-right: 0.15rem;
  color: #bbbbbb;
  text-align: left;
  font-weight: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.FLkuang .active {
  font-size: 0.2rem;
  color: #555555;
  margin: 0.1rem 0 0.2rem 0.1rem;
}

.FLkuang .active span {
  color: #fff;
  padding: 0.02rem 0.05rem;
  border-radius: 0.06rem;
}

.FLkuang .active span.red {
  background: #ff96be;
  margin-right: 0.1rem;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.FLkuang .active span.green {
  background: #69e1d7;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
  margin-right: 0.1rem;
}

.FLdetails {
  padding: 0rem 0.1rem 0.1rem 0.1rem;
  font-size: 0.25rem;
}

.FLtitle {
  font-size: 0.25rem;
  padding: 0.1rem;
  font-weight: bold;
  margin: 0.1rem 0;
}

.FLkuang {
  margin: 0.1rem 0.1rem;
  font-size: 14px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border: 1rpx solid #dddee1;
  border-radius: 5px;
}

.FLkuangimg {
  margin: 0.1rem 0.1rem;
  font-size: 14px;
  overflow: hidden;
  position: relative;
}

.classkuangimg {
  width: 100%;
  border-radius: 5px;
  max-height: 5rem;
  min-height: 1rem;
}

.classimg {
  width: 100%;
  max-height: 5rem;
  min-height: 1rem;
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
