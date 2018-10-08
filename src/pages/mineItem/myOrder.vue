<template>
	<div  style="background-color: #F1F1F1;height: 100%;width:100%;">
		<div>
			<tab :titledata="titledata"></tab>
		</div>
		<div>&nbsp;</div>

		<div class="order-kuang" v-for="(item,index) in orderList" :key="index" @click="jump(item.id)">
			<div class="order-title">
				<div>胚豆订单号：{{item.orderNo}}</div>
				<div>{{item.orderState}}</div>
			</div>
			<div class="item" >
				<div class="item-top">
					<div class="item-img">
						<img :src="item.commImg" alt="">
					</div>
					<div class="info">
						<div>
							<h5>[{{item.commodityName}}]
								<span>{{item.remark}}</span>
							</h5>
						</div>
						<p class="addr">{{item.organName}}</p>
						<div class="price">

							<span>
								<span class="price-span">预约金：¥{{item.rulePrice}}</span>

							</span>
						</div>
					</div>
				</div>
				<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
			</div>
			<div class="order-bottom">
				<!-- 待付款 -->
				<!-- <div class="nopay">
					<div class="order-cancal">取消订单</div>
					<div class="order-pay">去付款</div>
				</div> -->
				<!-- 已付款 -->
				<!-- <div class="compay">
					<div class="order-refund">申请退款</div>
					<div class="order-pay">快去预约</div>
				</div> -->
				<!-- 待评价 -->
				<!-- <div class="appraise">
					<div class="appraisebutton">去评价</div>
				</div> -->
				<!-- 退款 -->
				<!-- <div class="reimburse">
					<div class="reimburse-first">
						<div class="reimburse-first-first">申请退款时间</div>
						<div>2018-08-15 16:45:00</div>
					</div>
					<div class="reimburse-last">
						<div >正在退款中......</div>
						<div>&nbsp;</div>
					</div>
				</div> -->
				<!-- 退款完成 -->
					<div class="reimburse">
					<div class="reimburse-first">
						<div class="reimburse-first-first">申请退款时间</div>
						<div>2018-08-15 16:45:00</div>
					</div>
					<div class="reimburse-right">
						<div class="reimburse-first-first">退款时间</div>
						<div>2018-08-15 16:45:00</div>
					</div>
				</div>
			</div>
		</div>

		<div @click="jump" class="order-kuang">
			<div class="order-title">
				<div>胚豆订单号：0000000001</div>
				<div>等待付款</div>
			</div>
			<div class="item" >
				<div class="item-top">
					<div class="item-img">
						<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" alt="">
					</div>
					<div class="info">
						<div>
							<h5>[埋线双眼皮]
								<span>全城模特招募海选中</span>
							</h5>
						</div>
						<p class="addr">贵美人整形医院</p>
						<div class="price">

							<span>
								<span class="price-span">预约金：¥1600</span>

							</span>
						</div>
					</div>
				</div>
				<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
			</div>
			<div class="order-bottom">
				<!-- 已付款 -->
				<div class="compay">
					<div @click="inviteFriends" class="order-refund">邀请好友</div>
					<div @click="apply" class="order-pay">申请退款</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import tab from '../comm/tab.vue'
	export default {
		components: {
			tab
		},
		data() {
			return {
				titledata: [{
						title: "全部",
						badgeNum: '',
					},
					{
						title: "待付款",
						badgeNum: '',
					},
					{
						title: "待使用",
						badgeNum: '',
					},
					{
						title: "待评价",
						badgeNum: '',
					},
					{
						title: "退款",
						badgeNum: '',
					}
				],
				orderList:[]


			}
		},
		computed:{
			user(){
				return this.$store.state.userInfo
			}
		},
		mounted() {
			this.$http.post('/order/list4Page',{customId:this.user.customerId})
			.then( res => {
				this.orderList = res.data
				console.log(this.orderList)
			})
		},
		methods: {
			apply () {
				this.$router.push({ path: '/pages/shop/request_refund' })
			},
			inviteFriends () {
				this.$router.push({ path: '/pages/shop/invite_friends' })
			},
			jump (id) {
				this.$router.push({
					path: '/pages/groupOrderDetail',
					query:{
						id:id
					}
				})
			}
		},

	};
</script>

<style scoped>
	.reimburse{
		font-size: 0.24rem;
		margin: 0.05rem  0;
	}
	.reimburse-first{
		width:47%;
		display: inline-block;
		border-right: solid  #EEEEEE  1px;
		color: #A9A9A9;
	}
	.reimburse-right{
		width:47%;
		display: inline-block;
		margin-left: 0.2rem;
		color: #A9A9A9;
	}
	.reimburse-first-first{
		margin-bottom: 0.1rem;
	}
	.reimburse-last{
		width:47%;
		display: inline-block;
		/* margin: auto; */
		text-align: center;
		color:#FF82B5;


	}

	.compay{
		margin-left:42%;
	}
	.nopay{
		margin-left:55%;
	}
	.appraise{
		margin-left:72%;
	}
	.appraisebutton{
		font-size: 0.30rem;
		display: inline-block;
		background-color: #FEF0A2;
		color:#F36006;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		margin-left: 0.4rem;
		border:solid #FEF0A2 1px;
	}
	.order-bottom{
		width:94%;
		margin-left: 3%;
		padding-bottom: .2rem;

	}
	.order-cancal{
		font-size: 0.28rem;
		display: inline-block;
		color:#ACACAC;
		text-align: right;


	}
	.order-pay{
		font-size: 0.30rem;
		display: inline-block;
		background-color: #FF4691;
		color:#FFFFFF;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		margin-left: 0.4rem;
		border:solid #FF4691 1px;
	}

	.order-refund{
		font-size: 0.30rem;
		display: inline-block;
		color:#FF4691;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		border:solid #FF4691 1px;

	}
	.order-title{
		font-size: 0.24rem;
		color:#B8B8B8;
		width:94%;
		margin-left: 3%;
		border-bottom: solid #EEEEEE 1px;
		padding-bottom: 0.2rem;
		margin-bottom: 0.2rem;
	}
	.order-title div:first-child{
		width:70%;
		display: inline-block;

	}
	.order-title div:last-child{
		width:30%;
		display: inline-block;
		text-align: right;
		color:#FF65A3;
	}
.order-kuang{
	background-color: #FFFFFF;
	margin-top: 0.8rem;
	padding-top: 0.2rem;
}
.price-old {
		text-decoration: line-through;
		font-weight: normal;
	}

	.price-span {
		color: #FF5097;
		font-weight: bold;
		margin-right: 0.28rem;

	}

	.item {
		margin-bottom: .2rem;

		/* border-bottom: 1px solid #EEEEEE; */
		width: 94%;
		margin-left: 3%;
	}

	.item-top {
		display: flex;
		display: -webkit-flex;
		padding-bottom: .17rem;
		margin-bottom: .1rem;
	}

	.item .item-img {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: .2rem;
	}

	.item .item-img img {
		height: 100%;
		width: 100%;
	}

	.item .info {
		padding-left: .29rem;
		width: 5rem;
		font-weight: bold;
	}

	.item .info h5 {
		width: 4.35rem;
		font-size: .28rem;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: normal;
	}

	.item .info h5 span {
		font-size: .28rem;
		font-weight: normal;
	}

	.item .info .addr {
		font-size: .24rem;
		color: #999;
		line-height: .6rem;
	}

	.item .price {
		font-size: .24rem;
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
		font-size: .3rem;
		color: #FF4691;
		font-weight: 500;
	}

	.item .price em>i {
		font-size: .26rem;
		font-weight: normal;
	}

	.item .price em>b {
		font-size: .2rem;
		font-weight: normal;
	}

	.item .price del {
		font-weight: normal;
		color: #bbbbbb;
		font-size: .24rem;
	}
	.count-c {
		display: -webkit-box;
		display: flex;
		display: -webkit-flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		margin-top: 0.15rem;
	}
	.item .count-buy {
		font-size: .24rem;
		color: #bbbbbb;
		text-align: left;
		font-weight: 100;
	}

	.count-collection-btn,
	.count-collection-btn1 {
		text-align: right;
	}

	.count-collection-btn>span {
		width: 1.2rem;
		height: 0.41rem;
		border: 1px solid #FFA6DA;
		display: inline-block;
		text-align: center;
		border-radius: 0.2rem;
		color: #FB84BC;
		line-height: 0.41rem;
	}

	.count-collection-btn1>span {
		width: 1.2rem;
		height: 0.41rem;
		border: 1px solid #EEEEEE;
		display: inline-block;
		text-align: center;
		border-radius: 0.2rem;
		color: #999999;
		line-height: 0.41rem;
	}

	.count-collection-btn>span>img {
		width: 0.2rem;
		height: 0.17rem;
	}

	.count-collection-btn>span>em {
		font-size: 0.24rem;
	}

	.item .active {
		font-size: .25rem;
		color: #555555;
		margin-bottom: .2rem;
	}

	.item .active span {
		color: #fff;
		padding: .02rem .05rem;
		border-radius: .06rem;
	}

	.item .active span.red {
		background: #ff96be;
		margin-right: 0.2rem;
		padding: 0.05rem 0.1rem 0.05rem 0.1rem;
	}

	.item .active span.green {
		background: #69e1d7;
		padding: 0.05rem 0.1rem 0.05rem 0.1rem;
	}

	.count {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		color: #CCCCCC;
		line-height: .6rem;
		padding-left: .1rem;
	}

	.count .praise {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
	}

	.count img {
		width: .22rem;
		vertical-align: initial;
	}

	.count span {
		padding: 0 .1rem 0 0;
	}
</style>
