<template>
  <div class="c">
    <div class="mine">
      <div class="banner" :style="{background:'url('+ organData.organ.completePicture+')'}">
        <div class="banner-navs"></div>
        <div class="banner-page">
          <div class="banner-page-h">
            <h3>{{organData.organ.organName}}</h3>
          </div>
          <div class="banner-pingfen">
            <i-rate disabled :value="starIndex4">
              {{starIndex4}}.0分
            </i-rate>
            <span id="" class="banner-pingfen-s">
             {{organData.organ.natureName}}
            </span>
          </div>
        </div>
        <div class="guanzhu" @click="followHospital">
          <span id="" class="wei">
            {{organData.isFollow?"已关注":"+关注"}}
          </span>
        </div>
        <!-- <div class="guanzhu">
					<span id="" class="yi">
						已关注
					</span>
				</div> -->
      </div>
      <div class="infor">
        <!-- <tab :titledata="nav" @clickactive="clickactive"></tab> -->

        <ul class="content-item tabs">
            <li class="tab-item" v-for="(v,i) in nav" :key="i" :class="{'active':cur==i}" @click="clickactive(i)">
              <span class="tab-icon " :class="[{'cnm':cur==i},v.icon]" ></span>
              <p> <span> {{v.title}}</span></p>
            </li>
        </ul>
      </div>
      <div class="content">
        <!-- 服务 -->
        <div class="content-item" v-if="cur=='0'">
          <div class="item" v-for="(v,i) in organData.commodityList" :key="i" @click="changeJump('./productDetails',{id:v.id})">
            <div class="item-top">
              <div class="item-img">
                <img :src="v.commImg" :alt="v.commName">
              </div>
              <div class="info">
                <div>
                  <h5>[{{v.commName}}]
                    <span>[{{v.projectName}}］{{v.remark}}</span>
                  </h5>
                </div>
                <p class="addr">{{v.organName}}</p>
                <p class="price-spans">¥{{v.rulePrice}}<span style="text-decoration:line-through">医院价：¥{{v.price}}</span>
                </p>
                <div class="price-nub">
                  <div class="">
                    <span id="" class="fenqi" v-if="v.isStage">分</span>
                    <span id="" class="baoxian" v-if="v.isInsurance">保</span>
                    <span id="" class="fenqi" v-if="v.isRecommend">推</span>


                  </div>
                  <div class="">
                    <span>{{v.buyNum}}人购买</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
        <!-- 视讯 -->
        <div class="content-item" v-if="cur==1">
          <live :liveList="organData.videoAndArticleVOList"></live>
        </div>
          
        <!-- 医生 -->
        <div class="doc" v-if="cur==2">
          
            <doctorList :doctorers="doctorers"></doctorList>
          
            
        </div>

        <!-- 简介 -->
        <div class=" organ-summary" v-if="cur==3">
            <div class="organ-content content-item">
              <p class="organ-introduce"> {{organData.organ.organName}}</p>
              <p> <span>资质：</span> <span>{{organData.organ.aptitude}}</span></p>
              <p> <span>电话：</span> <span>{{organData.organ.tel}} </span></p>
              <p> <span> 地址：</span> <span>{{organData.organ.address}}</span></p>
            </div>
            <div class="c content-item">
              <p class="organ-title organ-introduce">机构简介</p>
              <p v-html="organData.organ.introduce"> </p>
            </div>
        </div>
        <!-- 尾部 -->
      </div>
      <div class="footer-og">
        <div class="footer-og-lf" @click="callPhone(organData.organ.tel)">
          <img src="http://img.meiduduo.com/images/mineItem/phon.png" />电话预约
        </div>
        <div class="footer-og-rh">
          <img src="http://img.meiduduo.com/images/mineItem/infro.png" />在线咨询
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import tab from "../comm/tabsOrgin.vue";
import live from "../comm/live.vue";
import doctorList from "@/pages/comm/doctorList";
export default {
  components: {
    tab,
    live,
    doctorList
  },
  data() {
    return {
      starIndex4: 5,
      nav: [
        {
          title: "服务",
          badgeNum: "3",
          icon: "shop-no"
        },
        {
          title: "视讯",
          badgeNum: "0",
          icon: "live-no"
        },
        {
          title: "医生",
          badgeNum: "0",
          icon: "doctor-no"
        },
        {
          title: "简介",
          badgeNum: "",
          icon: "hospital-no"
        }
      ],
      cur: 0,
      organData: {
        commodityList: [],
        diaryBookList: [],
        servicePersonalList: [],
        organ: {
          introduce: ""
        },
        videoAndArticleVOList: []
      },
      doctorers: []
      // b: { "background-image": url(this.organData.organData.logo) }
    };
  },
  mounted() {
    this.getOrganDetail();
    this.getDoctorList();
  },
  methods: {
    clickactive(i) {
      this.cur = i;
    },
    getOrganDetail() {
      this.$http
        .post("organ/queryOneByPk", {
          id: this.$root.$mp.query.id,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            this.organData = res.data;
            this.organData.organ.introduce = this.imgSet(
              this.organData.organ.introduce
            );
          }
        });
    },
    //关注医院
    followHospital() {
      this.$http
        .post("focusRecord/save", {
          recordId: this.organData.organ.id,
          custId: this.$store.state.userInfo.custId,
          recordType: "2",
          state: this.organData.isFollow ? "-1" : "1"
        })
        .then(res => {
          // console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: this.organData.isFollow ? "已取消" : "已成功",
              icon: "none"
            });
            this.organData.isFollow = !this.organData.isFollow;
          }
        });
    },

    //获取机构医生列表
    getDoctorList() {
      this.$http
        .post("servicePersonal/getServicePersonalList", {
          organId: this.$root.$mp.query.id,
          lat: this.$store.state.userInfo.latitude,
          lng: this.$store.state.userInfo.longitude
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            this.doctorers = res.data;
          }
        });
    },
    //打电话
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item,
        success: res => {
          console.log(res);
        }
      });
    },
    dealRichImg(text) {
      // this.dealRichText(text)
      return text.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto" '
      );
    },
    dealRichText(text) {
      return text.replace(/\<p/gi, '<p style=" font-size:12px;color:#999;"');
    },
    imgSet(text) {
      return this.dealRichImg(this.dealRichText(text));
    }
  }
};
</script>

<style>
.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 0.3rem;
  color: #333;
}
.tabs .tab-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  /* border-bottom: 1px solid #ff4691; */
  border-bottom: 1px solid transparent;
  padding: 0 10px 10px 10px;
}
.active {
  border-bottom: 1px solid #ff4691 !important;
  color: #ff4691;
}
.tab-item .tab-icon {
  width: 0.55rem;
  height: 0.55rem;
  display: block;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  margin-bottom: 5px;
}
.shop-no {
  background-image: url("http://img.meiduduo.com/images/xyy/shop-n.png");
}
.live-no {
  background-image: url("http://img.meiduduo.com/images/xyy/live-n.png");
}
.cnm.live-no {
  background-image: url("http://img.meiduduo.com/images/xyy/live-y.png");
}

.cnm.shop-no {
  background-image: url("http://img.meiduduo.com/images/xyy/shop-y.png");
}
.doctor-no {
  background-image: url("http://img.meiduduo.com/images/xyy/doctor-n.png");
}
.cnm.doctor-no {
  background-image: url("http://img.meiduduo.com/images/xyy/doctor-y.png");
}
.hospital-no {
  background-image: url("http://img.meiduduo.com/images/xyy/hospital-n.png");
}
.cnm.hospital-no {
  background-image: url("http://img.meiduduo.com/images/xyy/hospital-y.png");
}
.content {
  margin-top: 0.1rem;
  margin-bottom: 1.2rem;
}

.content-item {
  background: #fff;
  padding: 0.2rem 0.3rem;
}

.banner-page-h {
  padding: 0.3rem 0.2rem 0;
}

.banner-pingfen {
  font-size: 0.26rem;
  padding: 0 0.2rem;
}

.banner-pingfen-s {
  font-size: 0.26rem;
  margin-left: 0.2rem;
  line-height: 2;
  position: relative;
  top: 4px;
}

.banner-page-h h3 {
  font-size: 0.32rem;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.banner-page {
  height: 1.5rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #fff;
}

.banner-navs {
  height: 1.5rem;
  background: #000;
  opacity: 0.5;
  position: absolute;
  bottom: 0;
  width: 100%;
}

.collect-kuang {
  margin-top: 1.5rem;
}

.mine {
  background-color: #f1f1f1;
}

.guanzhu {
  position: absolute;
  right: 0.2rem;
  bottom: 0.5rem;
}

.guanzhu .yi {
  background: #999;
  color: #fff;
  font-size: 0.26rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
}
.doc-mag {
  margin-bottom: 0.2rem;
}
.guanzhu .wei {
  background: #fc4396;
  color: #fff;
  font-size: 0.26rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.3rem;
}

.banner {
  position: relative;
  width: 100%;
  height: 4.1rem;
  background: url("http://img.meiduduo.com/images/mine/banner.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}

/**/
.item-footer ul li {
  font-size: 0.24rem;
  line-height: 2.3;
  color: #555555;
}

.item-footer {
  padding-bottom: 0.2rem;
}

.item-footer em {
  color: #fc4396;
  display: inline-block;
}

.fenqi {
  background: #fa97e6;
  padding: 2px 4px;
  color: #fff;
  border-radius: 0.1rem;
  margin-right: 0.1rem;
}

.baoxian {
  background: #7bdbcf;
  padding: 2px 4px;
  color: #fff;
  border-radius: 0.1rem;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  padding-bottom: 0.17rem;
}

.item .item-img {
  width: 2.6rem;
  height: 1.8rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  height: 100%;
  width: 100%;
  border-radius: 0.1rem;
}

.item .info {
  padding-left: 0.29rem;
  width: 100%;
}

.item .info h5 {
  width: 4.35rem;
  font-size: 0.28rem;
  color: #333;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item .info h5 span {
  font-size: 0.28rem;
  font-weight: bold;
}

.item .info .addr {
  font-size: 0.24rem;
  color: #999;
  line-height: 2;
}

.item .price {
  font-size: 0.24rem;
  color: #999;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.15rem;
}

.item .price em {
  font-size: 0.3rem;
  color: #ff4691;
  font-weight: 500;
}

.item .price em > i {
  font-size: 0.26rem;
  font-weight: normal;
}

.item .price em > b {
  font-size: 0.2rem;
  font-weight: normal;
}

.item .price del {
  font-weight: normal;
  color: #bbbbbb;
  font-size: 0.24rem;
}

.price-spans {
  color: #ff5097;
  font-size: 0.3rem;
  margin-right: 0.28rem;
}

.price-spans span {
  color: #999;
  font-size: 0.22rem;
  margin-right: 0.28rem;
  margin-left: 0.2rem;
}

.price-nub {
  font-size: 0.22rem;
  color: #999;
  margin-top: 0.2rem;
}

.price-nub div:first-child {
  color: #fff;
  width: 70%;
  display: inline-block;
}

.price-nub div:last-child {
  width: 30%;
  display: inline-block;
  text-align: right;
}

.footer-og {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.2rem;
}

.footer-og .footer-og-lf {
  background: #fa97e6;
}

.footer-og-lf img,
.footer-og-rh img {
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 0.2rem;
  position: relative;
  top: 5px;
}

.footer-og .footer-og-rh {
  background: #fc4396;
}

.footer-og .footer-og-lf,
.footer-og .footer-og-rh {
  color: #fff;
  width: 50%;
  display: inline-block;
  line-height: 1.2rem;
  text-align: center;
}
.organ-summary {
  font-size: 14px;
  color: #999;
  line-height: 20px;
}
.organ-introduce {
  margin-bottom: 15px;
  color: #333;
  font-size: 16px;
  font-weight: bold;
}
</style>
