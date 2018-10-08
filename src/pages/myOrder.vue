<template>
	<div  style="background-color: #F1F1F1;;width:100%;">
		<div>
			<tab :titledata="titledata" @clickactive="clickactive" :activeIndex="activeIndex"></tab>
		</div>
		<div>&nbsp;</div>
		<div style="margin-top: 45rpx;" v-for="(item,index) in orderList" :key="index">
			<!-- 普通订单 item.orderType != 2 -->
			<div v-if="item.orderType != 2" class="order-kuang" @click.stop="jump(item.id, 1)">
				<div class="order-title">
					<div>胚豆订单号：{{item.orderNo}}</div>
					<div>
						<span v-if="item.checkState != ''">{{ arr2[item.checkState] }}</span>
						<span v-else>{{ arr1[item.osId] }}</span>
					</div>
				</div>
				<div class="item" >
					<div class="item-top">
						<div class="item-img">
							<img :src="item.commImg[0]" alt="">
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
									<span v-if="item.prepayType == 0" class="price-span">预约金：¥{{item.payPrice}}</span>
									<span v-else class="price-span">全款：¥{{item.rulePrice}}</span>
								</span>
							</div> 
						</div>
					</div>
					<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
				</div>
				<div class="order-bottom">
						<div v-if="item.osId == 1" class="footer_btns">
							<span class="footer_button" @click.stop="cancelOrder(item)">取消订单</span>
							<span class="footer_button" @click.stop="goPay(item)">去付款</span>
						</div>
						<!-- 普通商品不能退款 -->
						<!-- <div v-if="true" class="footer_btns">
							<span class="footer_button" @click.stop="requestARefund">申请退款</span>
							<span class="footer_button" @click.stop="goAppointment">快去预约</span>
						</div> -->
						<!-- <div v-if="false" class="reimburse">
							<div class="reimburse-first">
								<div class="reimburse-first-first">申请退款时间</div>
								<div>2018-08-15 16:45:00</div>
							</div>
							<div class="reimburse-right">
								<div class="reimburse-first-first">退款时间</div>
								<div>2018-08-15 16:45:00</div>
							</div>
						</div> -->
				</div>
			</div>

			<!-- 拼团订单 -->
			<div v-else @click.stop="jump(item.id, 2)" class="order-kuang">
				<div class="order-title">
					<div class="organ_info">
						<img class="organ_icon" src="http://img.meiduduo.com/images/hos_icon.png" alt="">
						<span style="margin-left: 10rpx;">{{ item.organName }}</span>
					</div>
					<div>
						<span>{{ arr[item.gosId] }} </span>
						<span v-if="item.checkState != ''">{{ arr2[item.checkState]}}</span>
						<span v-else> {{arr1[item.osId]}}</span>
					</div>
				</div>
				<div class="item" >
					<div class="item-top">
						<div class="item-img">
							<img :src="item.commImg[0]" alt="">
						</div>
						<div class="info">
							<div>
								<h5>[{{item.commodityName}}]
									<span>{{item.remark}}</span>
								</h5>
							</div>
							<div class="price_info">
								<span>￥{{ item.payPrice }}</span>
								<span>单买：￥{{ item.rulePrice }}</span>
							</div>
							<div class="service_info">
								<div>
									<span class="serviec_item">分</span>
									<span class="serviec_item">保</span>
								</div>
								<span>x1</span>
							</div>
						</div>
					</div>
					<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
				</div>
				<div class="usre_info">
					<div class="user_icons">
						<img v-for="(label, inx) of item.icons" :key="inx" class="user_info_item" :src="label" alt="">
					</div>
					<div>
						<span>共 1 件 合计：</span>
						<span style="#333333">￥{{ item.payPrice }}</span>
					</div>
				</div>
				<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;margin:0 30rpx;" />
				<div class="order-bottom">
					<!-- 已付款 -->
					<div v-if="item.osId == 2" class="compay">
						<div @click.stop="inviteFriends(item)" class="order-refund">邀请好友</div>
						<div @click.stop="apply(item)" class="order-pay">申请退款</div>
					</div>
					<div v-if="item.osId==1" class="compay">
						<div @click.stop="cancelOrder(item)" class="order-refund">取消订单</div>
						<div @click.stop="goPay(item)" class="order-pay">立即支付</div>
					</div>
					<div v-if="item.osId == 3 || item.osId == 8 || item.osId == 9 || item.osId == 10" class="reimburse">
						<div class="reimburse-first">
							<div class="reimburse-first-first">申请退款时间</div>
							<div v-if="item.reqredTime">{{ item.reqredTime }}</div>
						</div>
						<div class="reimburse-right">
							<div v-if="item.refundTime" class="reimburse-first-first">退款时间</div>
							<div v-if="item.refundTime">{{ item.refundTime }}</div>
							<div v-else class="isReimburse">正在退款中...</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="no_data" v-if="orderList.length < 1">
			<p>没有数据</p>
		</div>
		<div class="over_banner" v-if="isOver && pageNum > 1">
			<p>数据加载完毕</p>
		</div>
	</div>
</template>

<script>
	import tab from './comm/tab.vue'
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
					// {
					// 	title: "待评价",
					// 	badgeNum: '',
					// },
					{
						title: "退款",
						badgeNum: '',
					}
				],
				orderList:[],
				arr2: ['审核通过', '未审核', '审核未通过'],
				arr1: ['', '待付款', '已付款', '申请退款', '订单取消', '已发货', '待评价', '订单完成', '已退款', '待退款', '退款中'],
				arr: ['拼团无效', '拼团中', '拼团成功', '拼团失败'],
				activeIndex: null, // 活跃index
				pageNum: 1,
				pageSize: 10,
				isOver: false, // 是否加载完毕
				params: {}
			}
		},
		computed:{
			user(){
				return this.$store.state.userInfo
			}
		},
		onLoad () {
			this.init()
			if (this.$route.query.index != null) {
				this.activeIndex = this.$route.query.index
				if (this.$route.query.index == 1) {
					this.params.osId = 1
				}
				if (this.$route.query.index == 2) {
					this.params.osId = 2
				}
				if (this.$route.query.index == 3) {
					this.params.osId = 11
				}
			}
		},
		onShow () {
			this.init()
			if (this.$route.query.index != null) {
				this.activeIndex = this.$route.query.index
				if (this.$route.query.index == 1) {
					this.params.osId = 1
				}
				if (this.$route.query.index == 2) {
					this.params.osId = 2
				}
				if (this.$route.query.index == 3) {
					this.params.osId = 11
				}
			}
			this.getList()
		},
		// mounted() {
		// 	this.init()
		// 	this.getList()
		// },
		onReachBottom () {
			if (!this.isOver) {
				this.getList()
			}
		},
		methods: {
			init () {
				this.isOver = false
				this.pageNum = 1
				this.orderList = []
				this.params = {}
			},
			apply (item) { // 申请退款
				this.$router.push({ path: '/pages/shop/request_refund', query: {
					orderNo: item.orderNo,
					orderId: item.id,
					orderType: item.orderType
				} })
			},
			inviteFriends (item) {
				this.$router.push({ path: '/pages/invite_friends', query: {
					id: item.id, // 订单id
					commodityId: item.commodityId // 商品id
				} })
			},
			jump (id, type) {
				if (type == 1) {
					this.$router.push({
						path: '/pages/orderDetail',
						query:{
							id:id
						}
					})
				}
				if (type == 2) {
					this.$router.push({
						path: '/pages/groupOrderDetail',
						query:{
							id:id
						}
					})
				}
			},
			cancelOrder (item) { // 取消订单
				this.$http.post('order/cancelOrder', {
					id: item.id,
					orderType: item.orderType ? item.orderType : 1
				}).then(res => {
					if (res.code === 1) {
						this.init()
						this.params.osId = 1
						this.getList()
					} else {
						wx.showModal({
							title: '操作失败',
							content: '取消订单失败',
							showCancel: false
						})
					}
				})
			},
			goPay (item) { // 去付款
				this.$router.push({
					path: 'payOrder',
					query: {
						orderId: item.id,
						pin: item.orderType == 2 ? true : false
					}
				})
			},
			requestARefund () { // 申请退款

			},
			goAppointment () { // 快去预约

			},
			getList (osId) { // 获取订单列表
				this.params.pageNum = this.pageNum
				this.params.pageSize = this.pageSize
				this.params.custId = this.user.custId || this.$store.state.userInfo.custId
				if (osId) {
					this.params.osId = osId
				}
				this.$http.post('order/list4Page', this.params)
				.then( res => {
					if (res.code === 1) {
						let a = res.data.data
						for (let i = 0, j = a.length; i < j; i++) {
							if (a[i].commImg) {
								a[i].commImg = a[i].commImg.split(',')
							} else {
								a[i].commImg = []
							}
							if (a[i].icons) {
								a[i].icons = a[i].icons.split(',')
							} else {
								a[i].icons = []
							}
							// 处理退款时间
							// if (a[i].refundTime) {
							// 	a[i].refundTime = `${a[i].refundTime.slice(0, 10)} ${a[i].refundTime.slice(10, 19)}`
							// }
							// if (a[i].reqredTime) {
							// 	a[i].reqredTime = `${a[i].reqredTime.slice(0, 10)} ${a[i].reqredTime.slice(10, 19)}`
							// }
						}
						if (res.pageNum == 1) {
							this.orderList = a
						} else {
							this.orderList = this.orderList.concat(a)
						}
						if (this.pageNum == res.data.pages || a.length < this.pageSize) {
							this.isOver = true
						} else {
							this.pageNum++
							this.isOver = false
						}
					}
				})
			},
			clickactive (val) {
				this.init()
				if (val.title == '待付款') {
					this.getList(1)
				}
				if (val.title == '待使用') {
					this.getList(2)
				}
				if (val.title == '退款') {
					this.getList(11)
				}
				if (val.title == '全部') {
					delete this.params.osId
					this.getList()
				}
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
		display: flex;
		justify-content: flex-end;
		align-items: center;
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
		width: 100%;
		padding: 17rpx 30rpx;
		box-sizing: border-box;
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
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-title div:first-child{
		width:70%;

	}
	.order-title div:last-child{
		width:30%;
		display: inline-block;
		text-align: right;
		color:#FF65A3;
	}
.order-kuang{
	background-color: #FFFFFF;
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
		width: 100%;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
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
	.footer_btns {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.footer_button {
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 42rpx 0 40rpx;
		border-radius: 30rpx;
		font-size: 30rpx;
		text-align: center;
		box-sizing: border-box;
	}
	.footer_btns > span:first-child {
		color: #999999;
		background: #fff;
	}
	.footer_btns > span:last-child {
		color: #FFF;
		background: #FF4691;
		margin-left: 65rpx;
	}
	.organ_icon {
		width: 40rpx;
		height: 50rpx;
		display: block;
	}
	.organ_info {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: #666666;
	}
	.price_info {
		font-size: 24rpx;
		color: #999999;
	}
	.price_info > span:first-child {
		font-size: 30rpx;
		color: #FC4396;
		margin-right: 19rpx;
	}
	.service_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 22rpx;
		color: #333333;
	}
	.serviec_item {
		color: #fff;
		padding: 4rpx 5rpx 6rpx 6rpx;
		border-radius: 3rpx;
	}
	.service_info >span:first-child {
		margin-right: 8rpx;
	}
	.user_info_item {
		display: block;
		width: 72rpx;
		height: 72rpx;
		border-radius: 100%;
		margin-left: -30rpx;
	}
	.user_icons {
		display: flex;
		align-items: center;
	}
	.user_icons > img:first-child {
		margin-left: 0;
	}
	.usre_info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #999999;
		padding: 5rpx 30rpx;
		margin-bottom: 17rpx;
	}
	.over_banner {
		font-size: 20rpx;
		color: #A9A9A9;
		text-align: center;
		padding: 17rpx;
		background: #fff;
	}
	.no_data {
		width: 100%;
		height: 900rpx;
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #A9A9A9;
		text-align: center;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.isReimburse {
		color: #FFB99D;
		text-align: center;
	}
</style>
