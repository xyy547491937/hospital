<template>
  <div class="project-info">
    <div class="box">
      <div class="loop">
        <!-- 轮播图组件 -->
        <banner :imgsrc="imgsrc"></banner>
      </div>
      <div class="project">

        <div class="project-title-box flex-r">
          <div class="project-x-title ">
            <h5>
              <span>[{{comm.commName}}]</span>{{comm.remark}}
            </h5>
            <span class="price">
              <span>
                <span>¥</span>{{comm.rulePrice }}
              </span>
              <!--  -->
              <span class="line">¥{{comm.price}}</span>
              <!--  -->
              <!-- <span>9折</span> -->
              <!--  -->
            </span>
          </div>
          <div class="project-x-fav" @click="favoriteProduct">
            <i-icon type="collection" size="20" color="#999" v-if="!comm.favourite" />
            <i-icon type="collection" size="20" color="#FC4396" v-else />
            <p class="c" >{{comm.favourite?"已收藏":"收藏"}}</p>
          </div>

        </div>

        <p class="position" >
          <span>距离{{comm.distance}}</span>
          <span @click="changeJump('../shop/orderDetail',{})"> {{comm.buyNum }}人购买</span>
        </p>
      </div>
    </div>

    <div class="box">
      <div class="c .sel-server">
        <div class="flex-r">
          <span class="name-label"> 数量</span>
          <!-- 引入模块 -->
          <inputNumber :addNum="addNum" @addnum="addnum" />
        </div>

      </div>
      <div class="c .sel-server" v-if="comm.commType==1">
        <div class="flex-r middle-label">
          <span class="c name-label"> 付款</span>
          <!-- 引入模块 -->
          <inputNumber :sel="sel" :comm="comm" @payType="payType" />
        </div>
      </div>
      <div class="c server sel-server flex-r">
        <div class="name-label"> 服务 </div>
        <div class="item">
          <div class="link">
            <!-- <span>闪电退</span> -->
            <span v-if="comm.isInsurance ">保险</span>
            <span v-if="comm.isStage ">分期</span>
            <span class="c" v-if="comm.isRecommend ">推荐 </span>
            <span class="c" v-if="comm.isPrefer "> 优选</span>
            <span class="c" v-if=" comm.isHot ">热卖</span>
          </div>
        </div>
      </div>

    </div>
    <div class="box addr-box">
      <div class="address">
        <div class="addr-img">
          <img :src="organ.logo">
        </div>
        <div class="addr-p" >
          <div @click="changeJump('./orgin',{id:organ.id})">
            <p>{{organ.organName}}</p>
            <p>资质：{{organ.aptitude}}</p>
            <p>地址：{{organ.address}}</p>
          </div>
          <div class="contact">
            <div @click="callPhone(organ)">电话咨询</div>
            <div>在线咨询</div>
          </div>
        </div>
      </div>
      <div class="link doctor" style="color:#666;" v-if="severPersonal" @click="changeJump('../doctor_detail',{id:severPersonal.id})">
        <span>{{severPersonal.personalName}}</span>
        {{severPersonal.technicalName}} <span style="margin-left:10px; color:#666;"> 擅长：{{severPersonal.fields}}</span>  
        <span class="clc"> <i-icon type="enter" size="15" color="#666" /></span>
      </div>
    </div>
    <div class="box">
      <!-- 引入评价模块 -->
      <!-- <discuess /> -->
      <!-- <div class="c all-discuess">
        查看全部评价
        <span class="c">
          <i-icon type="enter" size="15" color="#FF4691" /></span>
      </div> -->
    </div>
    <div class="box box1">
      <div class="order-tab">
        <ul>
          <li v-for="(item, index) in orderArr" :key="index" :class="{active:index==orderTabIndex}" @click="changeActive(index)">{{item}}</li>
        </ul>
      </div>
      <div class="tab-item" v-show="orderTabIndex==0">
        <div class="tab-title">服务介绍</div>
        <div ref="commInfo" class="item-block">
          <p>{{comm.stageDesc }}</p>
          <p>{{comm.insuranceDesc }}</p>
        </div>
        <div class="tab-title" v-if="severPersonal">医生介绍</div>
        <div class="item-block" v-if="severPersonal"> 
          <div class="item-banner">
            <img :src="severPersonal.icon">
          </div>
          <p ref="doctorIntro"></p>
        </div>
        <div class="tab-title">医院介绍</div>
        <!-- <h2>石家庄贵美人医疗美容医院</h2> -->
        <div class="item-banner out-img" v-html="organ.introduce">
        </div>
        <div class="tab-title">版权声明</div>
        <div class="item-block">
          <p>如在胚豆发布的“胚豆网上内容”设计知识产权争议等问题，请 相关权利人或利害关系人与胚豆网联系。</p>
        </div>
        <div class="tab-title">免责声明</div>
        <div class="item-block">
          <p>如在胚豆发布的“胚豆网上内容”设计知识产权争议等问题，请 相关权利人或利害关系人与胚豆网联系。</p>
        </div>
      </div>
      <div class="tab-item tab-item1" v-show="orderTabIndex==1 && comm.commType==1" style="color:#999">
        <div style="font-size: 0.65rem;">胚豆百科带您了解该项目的操作方法、术后效果、恢复时间、术后护理等相关知识</div>
        <hr style="height:0.4rem;border:none;border-top:0.4rem solid #F1F1F1;" />
        <div class="comm_explain">
          <p>项目概览</p>
          <!--<div class="exp_abstract">
									<p>项目简介</p>
									<span>
										操作过程简单，创伤较小，深受年轻一族爱美人士所喜爱。
									</span>
								</div>-->
          <div class="exp_abstract">
            <p>埋线双眼皮</p>
            <span>
              双眼皮手术又名重睑术，亦称双眼皮成形术，是整形美容外科最常见的手术之一。 埋线法
              亦有称之为高分子成型法，是通过缝合方式，直接把缝线（或高分子缝合线）埋藏于皮肤及睑板之间，使上睑皮肤同睑板发生粘连，形成重睑。此方法操作简便，创伤小，不留疤痕，消肿快，不需拆线，比较适合年轻人、眼皮较薄、眼裂长，亦无皮肤松弛的情况；对眼皮较厚，皮肤松弛及年龄较大者不太适合，并有重睑消失的可能。
              埋线法适合于上睑较薄无明显脂肪、上睑皮肤不松弛、年龄较轻的人群。优点是，操作简便、创伤小，恢复快。但缺点是适用范围较小，对上睑肥厚者有疗效，双眼皮容易消失.
            </span>
          </div>
        </div>
        <div class="comm_explain1">
          <div class="explain_tit">
            <img src="http://img.meiduduo.com/images/productDetails/comm11.png" />治疗档案</div>
          <ul>
            <li>
              <span>单次治疗时长</span>
              <div>{{comm.onceTreatmentTime }}</div>
            </li>
            <li>
              <span>治疗次数</span>
              <div>{{comm.treatmentNum }}次</div>
            </li>
            <li>
              <span>效果持续时间</span>
              <div>{{comm.durationTime }}</div>
            </li>
            <li>
              <span>麻醉方式</span>
              <div>{{comm.anesthesia }}</div>
            </li>
            <li>
              <span>恢复过程</span>
              <div>{{comm.recoveryProcedure }}</div>
            </li>
            <li>
              <span>达到效果时间</span>
              <div>{{comm.finishTime }}</div>
            </li>
            <li>
              <span>疤痕情况</span>
              <div>{{comm.scar }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-item" ref="reserveProcess" v-show="orderTabIndex==2 && comm.commType==1" style="color:#999">
     <div class="order">
        <div class="link">预定须知</div>
        <div>
          <div class="order-title">服务项目</div>
          <p>{{comm.projectName}}</p>
        </div>
        <div>
          <div class="order-title">通过胚豆预定</div>
          <p>全款需支付
            <span>¥{{comm.rulePrice}}</span> 订金需支付
            <span>¥{{comm.depositPrice}}</span> 到院支付剩余
            <span>¥{{comm.rulePrice-comm.depositPrice}}</span>
          </p>
        </div>
        <div>
          <div class="order-title">使用规则</div>
          <p ref="useRule">支付成功后，即可使用！</p>
        </div>
      </div>
      </div>

      <!-- <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1"> -->
        <!-- 评价 产品为服务-->
        <!-- 引入评价模块 -->
        <!-- <discuess />
      </div> -->

      <!-- <div class="tab-item" v-show="orderTabIndex==1 && comm.commType==2"> -->
        <!-- 评价 产品为产品时-->
        <!-- 引入评价模块 -->
        <!-- <discuess />
      </div> -->
      <div class="tab-item" v-show="orderTabIndex==3 && comm.commType==1">
        <!-- 日记本的模块 -->
        <typeDiary :diaryValue="diaryValue" :commType="comm.commType"></typeDiary>
      </div>

    </div>
    <hr style="height:0.4rem;border:none;border-top:0.4rem solid #F1F1F1;" />
    <hr style="height:1.4rem;border:none;border-top:1.4rem solid #F1F1F1;" />
    <div class="footer">
      <div class="footer-left">
        <!-- 电话 -->
        <div class="co" @click="callPhone(organ)">
          <img src="http://img.meiduduo.com/images/shop/call.png" alt="" class="c">
          <p class="c">电话</p>
        </div>
        <!-- 客服-->
        <div class="co">
          <img src="http://img.meiduduo.com/images/shop/message_b.png" alt="">
          <!-- <img v-if="!commodity.favourite" src="/static/img/projectInfo/star.png" alt=""> -->
          <p class="c">客服</p>
        </div>
        <!-- 预约 -->
        <div class="co" @click="goAppointment">
          <img src="http://img.meiduduo.com/images/shop/yuyue.png" alt="" class="c">
          <p>预约</p>
        </div>
      </div>
      <div class="footer-right">
        <div @click="addCart($event)"> 加入购物车</div>

        <div @click="jump(comm)">立即购买</div>
      </div>
    </div>





  </div>
</template>

<script>
// const util = require("@/utils/common.js");
import discuess from "../comm/discuess";
import banner from "../comm/shopBanner";
import typeDiary from "../comm/typeDiary.vue"; //日记列表
import inputNumber from "../comm/inputNumber"; //数量++

// 	import homeCase from './common/case.vue'
export default {
  data() {
    return {
      orderArr: [],
      orderTabIndex: "0",
      commodity: [],
      doctor: [],
      organ: [],
      projectId: "",
      doctorId: "",
      organId: "",
      caseParames: {
        areaId: 37,
        verifyState: "Y"
      },
      dialogMask: false,
      dialogContent: "",
      beforePath: "/",
      explainList: [],
      explainContent: [],
      comm: {}, //获取商品详情的对象
      organ: {
        introduce: ""
      },
      severPersonal: {},
      diaryValue: [],
      imgsrc: [],
      sel: true,
      addNum: true,
      num: 1, //从子组件获取数据
      payMethod: 1,
      cartNum: 0,
      pageNum: 1,
      pageSize: 15
    };
  },
  components: {
    banner,
    typeDiary,
    discuess,
    inputNumber
    //             homeCase,
    //             dialogList
  },
  created() {
    this.getDiary();
  },
  computed: {
    baseUrlImg() {
      return this.$store.state.baseUrlImg;
    },

    user() {
      return this.$store.state.user;
    },

    oldMoney() {
      let n = 0;
      if (this.comm.commType == 1) {
        if (this.payMethod == 1) {
          // 0定金，1全款
          n = this.comm.rulePrice;
        } else {
          n = this.comm.depositPrice;
        }
      } else {
        n = this.comm.rulePrice;
      }
      return n;
    }
  },

  mounted() {
    this.getCommenList();
  },

  onReady() {
    this.getDetail();
  },
  methods: {
    jump(item) {
      this.$router.push({
        path: "/pages/others/successOrder",
        query: {
          id: item.id,
          commType: item.commType,
          shopType: 2,
          num: this.num,
          buyType: this.payMethod
        }
      });
    },
    changeActive(index) {
      this.orderTabIndex = index;
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
    },
    tablist(comm) {
      if (comm.commType == "1") {
        this.orderArr = ["详情", "科普", "流程", "日记"];
      } else if (comm.commType == "2") {
        this.orderArr = ["详情"];
      }
    },
    //名词解释性接口
    // !TODO 接口没完善
    NounInterpretation() {
      this.$http
        .post("projectNounExplanation/queryOneByCondition", {
          projectCateId: this.comm.categoryId
        })
        .then(res => {
          console.log(res);
        });
    },
    //点击收藏
    favoriteProduct() {
      this.$http
        .post("storeRecord/save", {
          recordId: this.comm.id,
          custId: this.$store.state.userInfo.custId, //模拟用户id
          recordType: 3, //3:商品; 4:资讯; 9:小视频
          state: this.comm.favourite ? "-1" : "1"
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            wx.showToast({
              title: this.comm.favourite ? "取消成功" : "收藏成功",
              icon: "none"
            });
            this.getDetail();
          }
        });
    },
    // 获取商品详情
    getDetail() {
      this.$http
        .post("commodity/getCommodityInfo", {
          id: this.$route.query.id,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          //   console.log(res.data.data);
          if (res.code == 1) {
            // console.log(1);
            // this.detailArr = res.data.data;
            const { comm, organ, servicePersonal } = res.data;
            this.comm = comm;
            this.organ = organ;
            this.organ.introduce = this.imgSet(organ.introduce);

            this.severPersonal = servicePersonal;
            this.imgsrc = comm.commImg.split(",");
            this.tablist(this.comm);
            this.NounInterpretation();
          }
        });
    },
    //打电话
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item.tel,
        success: res => {
          console.log(res);
        }
      });
    },
    //获取日记列表   POST /diary/queryOneByPkAndUserId
    getDiary() {
      this.$http
        .post("diaryBook/list4PageForDiaryBook", {
          // personalName: this.severPersonal.personalName
        })
        .then(res => {
          //   console.log(res);
          if (res.code == 1) {
            this.diaryValue = res.data.data;
          }
        });
    },
    //预约

    goAppointment() {
      // this.changeJump("../shop/myAppointment", { pid: this.comm.id });
      if (this.$store.state.isLogin) {
        this.changeJump("../shop/myAppointment", {
          pid: this.comm.id,
          isDetail: false
        });
      } else {
        wx.showToast({
          title: "请前往授权登陆",
          icon: "none"
        });
      }
    },
    //获取评价列表
    //评论类型(1:医生; 2:医院; 3:商品; 4:资讯; 5:日记; 6:达人; 7:日记本; 8:问答;9:小视频;10:文章;11:评论)
    getCommenList() {
      this.$http
        .post("comment/getList", {
          commentType: 3,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
        });
    },

    //获得子组件的参数
    addnum(msg) {
      this.num = msg;
      // console.log(this.num);
    },
    //接受子组件传过来的支付方式
    payType(msg) {
      this.payMethod = msg;
      // console.log(this.payMethod);
    },
    /*
        @ 加入购物车
        @ 加入成功后跳转
        @ 弹出提时
      actions*/
    addCart(e) {
      this.$http
        .post("cart/save", {
          organId: this.organ.id,
          commodityId: this.comm.id,
          custId: this.$store.state.userInfo.custId,
          buyType: this.payMethod, //定金0 //全款1
          quantity: this.num,
          oldPrice: this.oldMoney, //加入时的价格
          state: 1
        })
        .then(res => {
          // console.log(res);

          if (res.code == 1) {
            wx.showToast({
              title: "加入成功",
              icon: "success"
            });
            this.cartNum++;
            setTimeout(() => {
              // 加入成功，跳转
              // this.changeJump("../shop/cart", "");
            }, 1500);
          }
        });
    }
  }
};
</script>

<style scoped >
.clc {
  position: absolute;
  right: 0;
}
.out-img img {
  max-width: 100%;
  height: auto;
  display: block;
}

.all-discuess {
  border-top: 1rpx solid #ccc;
  margin-top: 10px;
  text-align: center;
  color: #ff4691;
  font-size: 0.24rem;
  padding: 10px;
}

.middle-label {
  align-items: flex-start;
}

.project-info {
  padding-bottom: 0.9rem;
  background-color: #f1f1f1;
  height: 100%;
  width: 100%;
}

.box {
  margin-bottom: 0.17rem;
  background: #fff;
}

.box1 {
  background: transparent;
}

.loop {
  /* height: 7.3rem; */
  position: relative;
}

.loop .title {
  height: 0.51rem;
  width: 100%;
  position: absolute;
  top: 0.5rem;
  z-index: 55;
}

.loop .title .content {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  padding: 0 0.25rem;
}

.loop .title .content .right {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  /* width: 1.2rem;*/
}

.loop .title .content .ball {
  width: 0.51rem;
  height: 0.51rem;
  background-color: #000;
  border-radius: 50%;
  opacity: 0.5;
  background-size: 80% 80%;
  background-position: center center;
  background-repeat: no-repeat;
}

.loop .title .content .back {
  background-image: url("/static/img/projectInfo/back.png");
  background-size: 60% 60%;
  background-repeat: no-repeat;
}

.loop .title .content .right div:first-child {
  background-image: url("/static/img/projectInfo/che.png");
}

.loop .title .content .right div:last-child {
  background-image: url("/static/img/projectInfo/dian.png");
}

.loop img {
  height: 100%;
}

.project {
  padding: 0.2rem 0.25rem;
}

.project h5 {
  font-weight: normal;
  font-size: 0.3rem;
  color: #333;
  margin-bottom: 0.1rem;
  border-right: 1rpx solid #ccc;
}

.project h5 span {
  font-weight: bolder;
}

.project p {
  color: #666;
  font-size: 0.24rem;
}

.project .price {
  margin-bottom: 0.05rem;
}

.project .price span:first-child {
  font-size: 0.48rem;
  color: #ff4691;
  margin-right: 0.1rem;
}

.project .price span:first-child a {
  font-size: 0.36rem;
}

.project .price .line {
  font-size: 0.24rem;
  color: #999;
  text-decoration: line-through;
}

.project .price i {
  font-size: 0.3rem;
}

/* .project .price span:last-child {
  font-size: 0.14rem;
  line-height: 1;
  padding: 0.01rem 0.05rem;
  background: #ff4691;
  color: #fff;
  font-weight: 100;
  border-radius: 0.03rem;
  position: relative;
  bottom: 0.1rem;
} */

.project .position {
  display: flex;
  color: #999;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
}

.server {
  display: flex;
  display: -webkit-flex;
}

.sel-server {
  padding: 0.2rem 0.25rem;
  font-size: 0.24rem;
  align-items: center;
}

.name-label {
  width: 15%;
  font-size: 35rpx;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  margin-right: 30rpx;
}

.server .name {
  width: 0.73rem;
  color: #000;
  font-weight: 500;
  line-height: 0.6rem;
}

.link {
  /*background: url("/static/img/projectInfo/link.png") no-repeat right center;
        background-size: .14rem .19rem;*/
}

.server .item div {
  /* width: 6.32rem; */
  font-size: 0.24rem;
  line-height: 0.6rem;
}

.server .item div:nth-child(1) span {
  padding: 0 0.15rem 0 0.33rem;
  background: url("http://img.meiduduo.com/images/productDetails/yes.png")
    no-repeat left center;
  background-size: 0.22rem 0.22rem;
}

.server .item div:nth-child(2) span:first-child {
  padding-left: 0.33rem;
  background: url("http://img.meiduduo.com/images/productDetails/fen.png")
    no-repeat left center;
  background-size: 0.27rem 0.27rem;
}

.addr-box {
  padding: 0.26rem;
  /* margin-top: 15px; */
}

.address {
  display: flex;
  display: -webkit-flex;
}

.addr-img {
  width: 0.92rem;
  height: 0.92rem;
  flex-shrink: 0;
  -webkit-flex-shrink: 0;
}

.addr-img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.addr-p {
  padding-left: 0.16rem;
  font-size: 0.24rem;
}

.addr-p p {
  font-size: 0.24rem;
  color: #333;
  margin-bottom: 0.05rem;
}

.addr-p p:first-child {
  font-size: 0.3rem;
}

.addr-p p:not(:first-child) {
  color: #999999;
}

.contact {
  width: 5.5rem;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  padding: 0.2rem 0;
}

.contact div {
  width: 1.8rem;
  height: 0.54rem;
  border: 1px solid #ff4691;
  border-radius: 0.27rem;
  color: #ff4691;
  line-height: 0.54rem;
  padding-left: 1.1rem;
  margin-right: 0.1rem;
}

.contact div:first-child {
  background: url("http://img.meiduduo.com/images/productDetails/phone.png")
    no-repeat 0.4rem center;
  background-size: 0.31rem 0.31rem;
}

.contact div:last-child {
  background: url("http://img.meiduduo.com/images/productDetails/message.png")
    no-repeat 0.4rem center;
  background-size: 0.31rem 0.25rem;
}

.addr-box .doctor {
  line-height: 0.4rem;
  font-size: 0.24rem;
  width: 100%;
  overflow: hidden;
  /*文本不换行*/
  white-space: nowrap;
  /*文字超出用省略号*/
  text-overflow: ellipsis;
  margin-top: 15px;
}

.addr-box .doctor span {
  color: #333333;
  font-weight: bolder;
  margin-right: 0.3rem;
}

.order {
  padding: 0.1rem 0.32rem;
  font-size: 0.24rem;
  color: #999999;
  background: #ffffff;
}

.order .link {
  color: #333;
  font-weight: bolder;
  line-height: 0.6rem;
  border-bottom: 1px solid #eee;
}

.order-title {
  padding-top: 0.2rem;
  color: #333;
  line-height: 0.4rem;
}

.order p span {
  color: #ff4691;
  margin-right: 0.2rem;
}

.order-tab {
  width: 7.5rem;
  height: 0.7rem;
  background: #f1f1f1;
}

.order-tab ul {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  -webkit-justify-content: space-between;
  line-height: 0.7rem;
  font-size: 0.26rem;
  color: #555;
  font-weight: bolder;
  padding: 0 0.57rem;
}

.order-tab ul li {
  padding: 0 0.16rem;
}

.order-tab ul li.active {
  color: #ff4691;
  border-bottom: 2px solid #ff4691;
}

.tab-item {
  padding: 0.2rem;
  background: #ffffff;
}

.tab-item1 {
  background: transparent;
  padding: 0;
}

.tab-item1 > div {
  background: #ffffff;
  padding: 0.2rem;
}

.tab-item1 > .comm_explain {
  background: #ffffff;
  padding: 0.2rem;
  margin-top: 0.2rem;
}

.tab-item1 > .comm_explain1 {
  background: #ffffff;
  padding: 0.2rem 0.5rem;
  margin-top: 0.2rem;
}

.comm_explain > p {
  background: url("http://img.meiduduo.com/images/productDetails/comm_logo.png")
    no-repeat left center;
  padding: 0 0.15rem 0 0.42rem;
  background-size: 0.32rem 0.32rem;
  font-size: 0.28rem;
  color: #555555;
}

.exp_abstract {
  margin-top: 0.2rem;
}

.exp_abstract > p {
  font-size: 0.26rem;
  color: #666666;
}

.exp_abstract > span {
  font-size: 0.24rem;
  display: inline-block;
  line-height: 0.4rem;
  margin-top: 0.1rem;
}

.explain_tit {
  text-align: center;
  font-size: 0.36rem;
  color: #333333;
  font-weight: 600;
  margin-top: 0.3rem;
}

.explain_tit > img {
  width: 0.29rem;
  height: 0.34rem;
  margin-right: 0.16rem;
  margin-top: -0.08rem;
}

.comm_explain1 > ul {
  border: 1px solid #eeeeee;
  margin: 0.4rem 0;
}

.comm_explain1 > ul > li {
  display: flex;
  display: -webkit-flex;
  font-size: 0.24rem;
  color: #666666;
}

.comm_explain1 > ul > li:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.comm_explain1 li > span {
  flex: 0.4;
  -webkit-flex: 0.4;
  text-align: center;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: Center;
}

.comm_explain1 li > div {
  flex: 0.6;
  -webkit-flex: 0.6;
  padding: 0.2rem;
}

.tab-title {
  padding-left: 0.2rem;
  border-left: 3px solid #ff4691;
  font-size: 0.24rem;
  height: 0.25rem;
  line-height: 1;
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
}

.title-title {
  font-size: 0.24rem;
  color: #555;
  line-height: 0.6rem;
}

.item-block p {
  color: #999;
  font-size: 0.24rem;
  line-height: 0.36rem;
  margin-bottom: 0.2rem;
}

.item-block-img {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  width: 100%;
  margin-bottom: 0.1rem;
}

.item-block-img img {
  width: 3.43rem;
  height: 3.7rem;
  border-radius: 0.1rem;
}

.item-banner img {
  display: block;
  width: 100%;
  height: 3.75rem;
  margin-bottom: 0.2rem;
}

.tab-item h2 {
  font-size: 0.3rem;
  line-height: 0.6rem;
}

.phone {
  height: 1.6rem;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}

.phone p {
  font-size: 0.3rem;
  color: #999;
  line-height: 0.5rem;
}

.phone p span {
  font-size: 0.36rem;
  color: #ff4691;
}

.phone img {
  width: 0.93rem;
  height: 0.93rem;
  margin-right: 0.3rem;
}

.footer {
  display: flex;
  display: -webkit-flex;
  width: 100%;
  height: 0.9rem;
  position: fixed;
  bottom: 0;
  font-size: 0.3rem;
}

.footer-left {
  /* width: 70%; */
  justify-content: space-around;
  width: 60%;
  display: flex;
  flex-direction: row;
  display: -webkit-flex;
  background: #ffffff;
}

/* .footer-left div {
  width: 100%;
  text-align: center;
  border-top: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
  padding-top: 0.1rem;
  line-height: 0.7rem;
  color: #999;
  font-size: 0.26rem;
} */

/* .footer-left div span {
  margin-left: 0.1rem;
} */
.footer .co {
  text-align: center;
}

.footer .co p {
  font-size: 0.25rem;
  color: #666;
}

.footer-left div img {
  width: 0.36rem;
  height: 0.35rem;
  margin-bottom: 0.05rem;
}

.footer-left {
  padding: 3px 0;
}

.footer-right {
  width: 50%;
  display: flex;
  display: -webkit-flex;
}

.footer-right div {
  width: 100%;
  font-size: 0.3rem;
  color: #fff;
  line-height: 0.9rem;
  text-align: center;
}

.footer-right div:first-child {
  background: #fe86d8;
}

.footer-right div:last-child {
  background: #ff4691;
}

.project-title-box {
  width: 100%;
}

.project-x-title {
  width: 85%;
}

.project-x-fav {
  width: 15%;
  text-align: center;
  color: #999;
}

.flex-r {
  display: flex;
  flex-direction: row;
}
</style>
