<template>
	<div class="gain">
			<div  v-if="orderList!=''" class="reserva_title">
				共<span>{{orderList.length}}</span>条预约
			</div>
			<div>&nbsp;</div>
			<div class="reserva_main">
				<div v-if="orderList!=''">
					<div v-for="(item, index) in orderList" :key="index" class="itemclass">
						<div class="rowKuang">
							<div  class="rowTitle" >
								<i-row >
									<!-- <i-col span="12">订单号：{{item.reservationServiceCode}}</i-col> -->
									<i-col span="12" class="rowTitle-right">{{item.createDate}} </i-col>
								</i-row>
							</div>
							<div class="row-two">
								<i-row >
									<i-col span="20" class="row-two-lift">{{item.organName}}</i-col>
									<!-- <i-col span="4" class="row-two-right">待使用 </i-col> -->
								</i-row>
							</div>
							<div class="row-three">

									<div class="row-three-left">预约项目：<span>{{item.appointmentProjectName}}</span></div>
									<!-- <div class="row-three-left">预约医师：<span>{{item.}}</span></div> -->
									<div class="row-three-left">到店时间：<span>{{item.appointmentTime}}</span></div>

							</div>
							<div class="numb">预约码：{{item.reservationServiceCode}}</div>
							<div class="reserva_consulting">
								<span @click="callPhone(item)"><img src="http://img.meiduduo.com/images/mineItem/my1.png"/><em>电话咨询</em></span>
								<div class="consul_tel" >
									<img  src="http://img.meiduduo.com/images/mineItem/my3.png"/><span>在线咨询</span>
								</div>
								<span @click="del(item,index)"><img src="http://img.meiduduo.com/images/mineItem/my2.png"/><em>取消预约</em></span>
							</div>
						</div>

					</div>
				</div>

				<div v-else class="no_content">
		        	<span>
		        		<img src="http://img.meiduduo.com/images/mineItem/content.png" />
		        	</span>
		        	<p><span>您还没有相关预约哦！</span></p>
		        </div>
			</div>
			<div>&nbsp;</div>

	</div>
</template>

<script>
// import reservaList from '../reserva_index'
// import head1 from "@/components/common/ls_header"
export default {
  components: {
    // 			reservaList,
    // 			head1
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  data() {
    return {
      title: "我的预约",
      orderList: "",
      beforePath: "/mine",
      orderList: [
        { ordernum: "6666666", creatTime: "2018/08/13" },
        { ordernum: "6666666", creatTime: "2018/08/13" },
        { ordernum: "6666666", creatTime: "2018/08/13" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  created() {},
  methods: {
    callPhone(item) {
      wx.makePhoneCall({
        phoneNumber: item.tel, //此号码并非真实电话号码，仅用于测试
        success: function() {},
        fail: function() {}
      });
    },
    del(item, index) {
      this.$http.post("/preregistration/delete", { id: item.id }).then(res => {
        if (res.code == 1) {
          this.orderList.splice(index, 1);
          wx.showToast({
            title: res.msg
          });
        } else {
          wx.showToast({
            title: res.msg,
            image: "http://img.meiduduo.com/images/shop/cancel.png"
          });
        }
      });
    }
  },
  mounted() {
    this.$http
      .post("preregistration/list", {
        peopleId: this.user.peopleId
      })
      .then(res => {
        this.orderList = res.data;
      });
  }
};
</script>

<style scoped>
.rowKuang {
  font-size: 0.24rem;
  width: 94%;
  margin-left: 3%;
  /* border-bottom: #EEEEEE solid 1px; */
}
.rowTitle {
  color: #b0b0b0;
  border-bottom: #eeeeee solid 1px;
  padding: 0.2rem 0;
}
.row-two {
  margin: 0.2rem 0;
}
.row-two-lift {
  font-size: 0.3rem;
  font-weight: bold;
}
.row-two-right {
  color: #ff5e9f;
  text-align: right;
  font-size: 0.24rem;
}
.row-three {
  font-size: 0.26rem;
}
.row-three-left {
  padding-top: 0.1rem;
}
.row-three-left span {
  color: #aeaeae;
}
.itemclass {
  background: #ffffff;
  margin-bottom: 0.2rem;
}
.rowTitle-right {
  text-align: right;
}
.numb {
  margin: 0.66rem;
  background-color: #eeeeee;
  font-size: 0.36rem;
  font-weight: bold;
  padding: 0.48rem 0.84rem;
}
.gain {
  background-color: #f1f1f1;
}
.reserva_title {
  width: 100%;
  padding: 0.2rem 0;
  background: #ffffff;
  text-align: center;
  font-size: 0.24rem;
  border-top: solid #eeeeee 1px;
  border-bottom: solid #eeeeee 1px;
  position: fixed;
}
.reserva_main {
  margin-top: 0.4rem;
}
.no_content {
  width: 100%;
  height: 88%;
  background: #ffffff;
  overflow: hidden;
  text-align: center;
  padding-top: 50%;
}
.no_content img {
  width: 2.4rem;
  height: 2.4rem;
}
.no_content > p {
  margin-top: 0.2rem;
  color: #999999;
  font-size: 0.26rem;
}
.reserva_consulting {
  width: 100%;
  border-top: 1px solid #eeeeee;
  font-size: 0.24rem;
  padding-bottom: 0.2rem;
}

.reserva_consulting > span {
  padding: 0.06rem 0.2rem;
  display: inline-block;
  border: 1px solid #cccccc;
  border-radius: 0.3rem;
  margin-top: 0.15rem;
}

.reserva_consulting > span:last-child {
  float: right;
}

.reserva_consulting > span:first-child > img {
  width: 0.2rem;
  height: 0.32rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
}
.consul_tel {
  padding: 0.06rem 0.2rem;
  display: inline-block;
  border: 1px solid #cccccc;
  border-radius: 0.3rem;
  margin-top: 0.15rem;
  margin-left: 0.1rem;
}
.reserva_consulting > .consul_tel > img {
  width: 0.3rem;
  height: 0.28rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
  display: inline-block;
  /* margin-top: 0.02rem; */
}

.reserva_consulting > span:last-child > img {
  width: 0.2rem;
  height: 0.25rem;
  margin-bottom: -0.05rem;
  margin-right: 0.1rem;
}

.reserva_consulting > span:last-child > em,
.reserva_consulting > span:first-child > em {
  /* float: right; */
  display: inline-block;
}

/**页面宽度**/
/* .header {
		position: fixed;
		top: 0;
		left: 0;
		background: url(/static/img/tabbar/top_bg.png) no-repeat;
		background-size: 100% 100%;
		z-index: 88;
		width: 100%;
		height: 0.9rem;
		line-height: 0.9rem;
	}


	.header-l,
	.header-r {
		font-size: 0.25rem;
		text-align: left;
		padding-left: 0.1rem;
	}

	.header-l,.header-r {
		width: 2rem;
		color: #ffffff;
		font-size: 0.26rem;
	}

	.header-c{
		width:100%;
		height: 0.9rem;
		text-align: center;
		color: #ffffff;
		font-size: 0.32rem;
	}

	.reserva_main{
		margin-top: 1.27rem;
	}


	.reserva_title>span{
		color: #FF4691;
		padding: 0 0.1rem;
	}
	.no_content{
    	width: 100%;
    	height:88%;
    	background: #FFFFFF;
    	overflow: hidden;
    	text-align: center;
    	padding-top: 50%;
    }
    .no_content img{
    	width: 2.4rem;
    }
    .no_content>p{
    	margin-top: 0.2rem;
    	color: #999999;
    	font-size: 0.26rem;
    } */
</style>
