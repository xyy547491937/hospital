<template>
	<div class="mine">
		<div class="qrcode-box" v-show="qrcodeShow" @click="hideQrcode">
            <img class="qrcode-img" :src="qrcodeSrc" alt="">
		</div>
		 <div class="banner">
			<div class="banner-title">
				<!-- <div  class="ball" @click="toMsg">
					<img class="alarm" src="../../static/images/mine/alarm2.png" alt="">
				</div>  -->
				<div class="ball" @click="showQrcode">
					<img class="qrcode"   src="http://img.meiduduo.com/images/mine/xiaoxi_icon.png" alt="">
				</div>
			</div>
			<div class="person">
				<span>
					<!--↓ formidcollect -->
						<form @submit="createFormids" report-submit="true">
							<button plain="true" formType="submit" class="hideform">
					<!--↑ formidcollect -->
								<img @click="codeBtn" :src="info.avator">
					<!--↓ formidcollect -->
							</button>
						</form>
					<!--↑ formidcollect -->
				</span>
				<p>{{info.name}}</p>
				<!-- <div>600积分</div> -->
			</div>
			<!--fmc子组件收集formid 2018年9月14日 15:14:30 zx  -->
			<fmc ref="fmc"></fmc>
		</div>
		<div class="content">
			<div class="content-item">
					<div class="box">
						<div class="box-item"  v-for="(item, index) in mine" :key="index" @click="changeJump(item.toUrl)">
							<div class="item-top">
								<img :src="item.src" alt="">
							</div>
							<p>{{item.name}}</p>
						</div>
					</div>
				</div>

				 <div class="content-item">
					<div class="box-title">我的订单</div>
					<div class="box">
						<div class="box-item"  @click.stop="goJump('/pages/myOrder', item.name)" v-for="(item, index) in navArr" :key="index" >
							<div class="item-top">
								<img :src="item.src" alt="">
							</div>
							<p>{{item.name}} <span v-if="item.num !=''">{{item.num}}</span></p>
						</div>
					</div>
				</div>
				<div class="content-item">

					<div class="box">
						<div class="box-item"  v-for="(item, index) in item" :key="index" @click="changeJump(item.toUrl)">
							<div class="item-top">

								<img :src="item.src" alt="">
							</div>
							<p>{{item.name}}</p>
						</div>
					</div>
				</div>
			</div>
		<!-- <mine-mask v-if="isMask"></mine-mask>
		<code-mask v-if="isCode" @codeMain="codeMain" :icon="personal.icon"></code-mask>
		<dialogList v-if='dialogMask' :dialogC='dialogContent'></dialogList> -->

	</div>
</template>

<script>
// 	import mineMask from "./sign_in"
// 	import codeMask from "./qr_code"
// 	import dialogList from "@/components/common/dialog"
// 	import list1 from "@/components/common/popular_project"

// import fmc子组件收集formid 2018年9月14日 15:15:08 zx
import fmc from "./comm/formIdCollector.vue";
export default {
  data() {
    return {
      mine: [
        {
          name: "我的预约",
          src: "http://img.meiduduo.com/images/mine/item1.png",
          toUrl: "/pages/mineItem/myAppointment",
          badge: "",
          imgUrl: ""
        },
        {
          name: "手签确认",
          src: "http://img.meiduduo.com/images/mine/item4.png",
          toUrl: "/pages/mineItem/signatureList",
          badge: "",
          imgUrl: ""
        },
        {
          name: "服务评价",
          src: "http://img.meiduduo.com/images/mine/item11.png",
          toUrl: "/pages/mineItem/serverDiscuess",
          badge: "",
          imgUrl: ""
        }
        // {
        // 	name:"我的共享",
        // 	src:"http://img.meiduduo.com/images/mine/item5.png",
        // 	toUrl:'/myQuestion',
        // 	badge:'',
        // 	imgUrl:''
        // },
      ],
      navArr: [
        {
          name: "全部",
          src: "http://img.meiduduo.com/images/mine/nav1.png",
          num: ""
        },
        {
          name: "待付款",
          src: "http://img.meiduduo.com/images/mine/nav2.png",
          num: ""
        },
        {
          name: "待使用",
          src: "http://img.meiduduo.com/images/mine/nav3.png",
          num: ""
        },
        {
          name: "退款售后",
          src: "http://img.meiduduo.com/images/mine/nav4.png",
          num: ""
        }
      ],
      item: [
        // {
        // 	name:"我的钱包",
        // 	src:"http://img.meiduduo.com/images/mine/item8.png",
        // 	toUrl:'/myStore',
        // 	badge:'',
        // 	numIn:''
        // },
        // {
        // 		name:"收货地址",
        // 		src:"http://img.meiduduo.com/images/mine/shaddress.png",
        // 		toUrl:'shop/address_management',
        // 		badge:'',
        // 		numIn:''
        // 	},
        {
          name: "我去过的店",
          src: "http://img.meiduduo.com/images/mine/item8.png",
          toUrl: "/pages/mineItem/myStore",
          badge: "",
          numIn: ""
        },

        {
          name: "我的收藏",
          src: "http://img.meiduduo.com/images/mine/item12.png",
          toUrl: "/pages/mineItem/collect",
          badge: "",
          numIn: ""
        },

        {
          name: "我的关注",
          src: "http://img.meiduduo.com/images/mine/item13.png",
          // toUrl:'/home/index',
          toUrl: "mineItem/myAttention",
          badge: "",
          numIn: ""
        }
        // {
        // 	name:"医生查询",
        // 	src:"http://img.meiduduo.com/images/mine/doctorsearch.png",
        // 	toUrl:'/myStores',
        // 	badge:'',
        // 	numIn:''
        // },

        // {
        // 	name:"药品验真",
        // 	src:"http://img.meiduduo.com/images/mine/ypcheck.png",
        // 	toUrl:'/mine/myCollection',
        // 	badge:'',
        // 	numIn:''
        // },

        // {
        // 	name:"安心保障",
        // 	src:"http://img.meiduduo.com/images/mine/axbz.png",
        // 	toUrl:'/pages/others/interested',
        // 	badge:'',
        // 	numIn:''
        // }
      ],
      isMask: false,
      isCode: false,
      personal: [],
      iconUrl: "",
      listParames: {
        areaId: 37,
        isRecommend: "Y"
      },
      pointNum: 0,
      dialogMask: false,
      dialogContent: "",
      signText: "",
      qrcodeSrc: "http://img.meiduduo.com/images/mine/user2.png",
      custId: 123,
      info: {
        name: "123",
        avator: "http://img.meiduduo.com/images/mine/user2.png"
      },
      qrcodeShow: false
    };
  },
  components: {
    // 			mineMask,
    // 			list1,
    // 			codeMask,
    // 			dialogList,
    // fmc
  },
  created() {
    // console.log(this.userCheck)
    this.getData();
    this.getData1();
  },
  onLoad() {
    // this.getQrcode()
    if (this.$store.state.userInfo.avatarUrl) {
      this.info.avator = this.$store.state.userInfo.avatarUrl;
    }
    this.info.name = this.$store.state.userInfo.nickName
      ? this.$store.state.userInfo.nickName
      : "";
    // this.$store.state.userInfo.pelpleId = 781
  },

  computed: {
    baseUrlImg() {
      return this.$store.state.baseUrlImg;
    },
    user() {
      return this.$store.state.user;
    },
    userCheck() {
      return this.$store.state.userCheck;
    }
  },
  methods: {
    // this.$router.push({path:"/pages/personal/index"})

    //收集formid fmc子组件收集父页面formid写入子组件data.formIdKey 2018年9月14日 15:16:37 zx
    createFormids(e) {
      //  let fomrid = e.mp.detail.formId;
      //  this.$refs.fmc.createFormids(fomrid);
      //  this.isCode = true;
      //  this.$router.push({path:"./personal/index"})
      this.$router.push({ path: "/pages/personal/index" });
      return;
      if (this.$store.state.userInfo.custId) {
        this.isCode = true;
        this.$router.push({ path: "/pages/personal/index" });
      } else {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
      }
    },
    getData() {
      // 				var parames = {
      // 					id:this.user.id
      // 				}
      // 				this.axios.post("/customer/queryOneByPk",parames)
      //                 .then( res => {
      //                     this.personal = res.data.data;
      //                     this.mine[1].imgUrl = this.personal.icon;
      //                 })
      //                 this.axios.post("/preregistration/list",{userId:this.user.id})
      // 				.then( res => {
      // 					this.mine[0].badge = res.data.data.length;
      // 				})
      /*var parames = {
					isSignature:1,
					peopleId:this.user.peopleId,
					pageNum:1,
					pageSize:7,
				}
				this.axios.post("/serviceEvaluation/getSignList",parames)
                .then( res => {
                    this.signList = res.data.data.data;
                })*/
    },
    getData1() {
      // 				this.axios.post("/pointRecord/queryOneByCust",{userId:this.user.id})
      //                 .then( res => {
      //                    	this.pointNum = res.data.data;
      //                 })
    },
    changeMask() {
      // 				this.axios.post('/pointRecord/saveCheck',{'userId':this.user.id})
      // 				.then( res => {
      // 					if(res.data.code==1){
      // 						this.isMask = true
      // 						setTimeout( ()=>{
      // 							this.isMask = false;
      // 							this.getData1();
      // 							this.signText='已签到';
      // 							this.$store.commit('SET_USERCHECK', '已签到');
      // 						}, 1000)
      // 					} else {
      // 						this.showmsg('error',res.data.msg)
      // 						/*this.$dialog.toast({
      // 							mes: res.data.msg,
      // 							timeout: 1500,
      // 							icon: 'error'
      // 						});*/
      // 					}
      // 				})
    },
    getQrcode() {
      if (!this.$store.state.userInfo.custId) {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
        return;
      }
      this.$http
        .get(
          "/qr/genQR?width=300&height=300&format=png&content=" +
            this.$store.state.custId,
          {
            headers: { "content-type": "application/json" }
          }
        )
        .then(res => {
          console.log(res);
          this.qrcodeSrc = res;
          // this.videolist = res.data.data
        });
    },
    hideQrcode() {
      this.qrcodeShow = false;
    },
    showQrcode() {
      if (!this.$store.state.userInfo.custId) {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
        return;
      }
      this.qrcodeSrc =
        this.$store.state.httpUrl +
        "/shop4/qr/genQR?width=100&height=100&format=png&content=" +
        this.custId;
      this.qrcodeShow = true;
    },
    jump(item) {
      this.$router.push(item.path);
    },
    toMsg() {
      this.$router.push({ path: "/pages/personal/message" });
    },
    codeBtn() {
      if (this.$store.state.userInfo.pelpleId) {
        this.isCode = true;
        this.$router.push({ path: "/pages/personal/index" });
      } else {
        wx.showToast({
          title: "未登录",
          mask: true,
          icon: "none"
        });
      }
    },
    codeMain() {
      this.isCode = false;
    },
    showmsg: function(state, msg, timeout) {
      var _this = this;
      var time;
      timeout ? (time = timeout) : (time = 1500);
      this.dialogContent = msg;
      this.dialogMask = true;
      setTimeout(() => {
        this.dialogMask = false;
      }, time);
    },
    goJump(path, name) {
      let index = null;
      if (name == "全部") {
        index = 0;
      }
      if (name == "待付款") {
        index = 1;
      }
      if (name == "待使用") {
        index = 2;
      }
      if (name == "退款售后") {
        index = 3;
      }
      this.$router.push({
        path: path,
        query: {
          index: index,
          page: "myOrder"
        }
      });
    }
  }
};
</script>

<style scoped>
.qrcode-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  text-align: center;
  /* display: none; */
}
.qrcode-img {
  width: 450rpx;
  height: 450rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
/* 临时添加cssclass .hideform 收集formid用 */
.hideform {
  border: 0;
  padding: 0;
}
.mine {
  background-color: #f1f1f1;
}
.banner {
  width: 100%;
  height: 4.1rem;
  background: url("http://img.meiduduo.com/images/mine/banner.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.banner-title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  padding: 0.6rem 0.3rem 0 0.3rem;
  position: relative;
  z-index: 5;
}
.banner-title .ball {
  height: 0.6rem;
  width: 0.6rem;
  background: #000;
  opacity: 0.5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.banner-title .ball {
  /* background-size: 45% 45%;
		background-repeat: no-repeat;
		background-position: center center;
		z-index: 1; */
}
.banner-title .ball .alarm {
  width: 28rpx;
  height: 32rpx;
}
.banner-title .ball .qrcode {
  width: 32rpx;
  height: 32rpx;
}
.banner-title .ball {
  position: absolute;
  top: 30rpx;
  right: 24rpx;
}
.banner-title .ball:first-child {
  /* background-image: url("http://img.meiduduo.com/images/mine/lun.png") */
}
.banner-title .ball:last-child {
  /* background-image: url("http://img.meiduduo.com/images/mine/xiaoxi_icon.png") */
}
.person {
  position: absolute;
  top: 0.5rem;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
}
.person > span {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
  border: 2px solid #fff;
  display: inline-block;
  margin-bottom: 0.2rem;
}
.person img {
  height: 1.8rem;
  width: 1.8rem;
  border-radius: 50%;
}
.person p {
  font-weight: bolder;
  color: #fff;
  font-size: 0.34rem;
}
.person > div {
  color: #fff;
  font-size: 0.28rem;
  line-height: 0.6rem;
}
.sign {
  font-size: 0.26rem;
  font-weight: normal;
  color: #fff;
  background: #fc4396;
  padding: 0.05rem 0.4rem;
  border-radius: 0.3rem 0 0 0.3rem;
  position: absolute;
  right: 0;
  top: 2.5rem;
}
.content {
  /* position: absolute; */
  top: 3.5rem;
  width: 100%;
}
.content-item {
  background: #fff;
  padding: 0.3rem 0.3rem;
  margin-bottom: 0.2rem;
}
.box {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  text-align: center;
  -webkit-text-align: center;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
}
.box-title {
  color: #333;
  font-size: 0.26rem;
  padding-bottom: 0.3rem;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #eeeeee;
}
.box .item-top {
  color: #fc4396;
  text-align: center;
  line-height: 0.4rem;
  height: 0.4rem;
  font-size: 0.3rem;
  margin-bottom: 0.1rem;
}
.box .item-top img {
  width: 0.4rem;
  height: 100%;
}
.content .content-item:first-child .box-item {
  width: 25%;
}
.content .content-item:nth-child(2) .box-item {
  width: 25%;
  margin: 0.1rem 0;
}
.content .content-item:nth-child(3) .box-item {
  width: 25%;
  margin: 0.2rem 0 0.1rem;
}
.content .content-item:last-child .box-item {
  width: 25%;
  margin: 0.1rem 0;
}
.box-item p {
  color: #333;
  font-size: 0.26rem;
}
.box-item p span {
  color: #ff4691;
}
.item-top {
  position: relative;
}
.item_badge {
  position: absolute;
  right: 12px;
  top: -9px;
  padding: 0.03rem 0.09rem;
}
.hot-poject .title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin: 0 0.24rem;
  font-size: 0.26rem;
  line-height: 0.6rem;
  border-bottom: 1px solid #eeeeee;
}
.hot-poject {
  width: 100%;
}
.hot-poject .title span {
  color: #999999;
  font-size: 0.22rem;
}
.hot-poject .title img {
  width: 0.14rem;
  height: 0.22rem;
  margin-top: -0.07rem;
  margin-left: 0.1rem;
}
.items {
  padding: 0.24rem;
}
.box {
  background: #fff;
}
</style>
