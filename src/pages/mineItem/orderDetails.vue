<template>
	<div style="background-color: #F1F1F1;height: 100%;width:100%;">
		<div class="order-kuang">
			<ul class="order-state">
				<li>订单号：0000000001</li>
				<li>订单状态：等待付款</li>
				<li>预定手机：1569999999</li>
				<li>下单时间：2018-09-02</li>
			</ul>
		</div>
		<div class="order-kuang">
			<div class="order-title">
				<div>支付方式</div>
				<div>支付定金</div>
			</div>
			<div class="order-pages">
				<ul>
					<li>
						<div>订单金额</div>
						<div>100000</div>
					</li>
					<li>
						<div>到院再付</div>
						<div>100000</div>
					</li>
				</ul>

			</div>
			<div class="order-footers">
				<div>在线支付金额</div>
				<div>¥500</div>
			</div>

		</div>
		<div class="order-kuang">
			<div class="item">
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
						<p class="price-spans">¥1600<span style="text-decoration:line-through">医院价：¥16000</span>
						</p>
						<p class="price-nub">已购买<span>2万+</span></p>
					</div>
					
				</div>
				<div class="item-footer">
					<ul>
						<li><span id="" class="fenqi">
							分期
						</span><span id="">
							最高可享12期分期付款：<em>¥698.20</em> X12期
						</span></li>
						<li><span id="" class="baoxian">
							保险
						</span><span id="">
							免费送50000元 贵美人.平安安心整形险
						</span></li>
					</ul>
				</div>
			</div>

		</div>
			<div class="order-kuang">
			<p class="address">医院地址：河北省石家庄市裕华区建华南大街与东岗路交口</p>
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

			}
		},

		mounted() {
			alert()
			this.$http.post('/order/queryOneByPk',{id:this.$route.query.id})
			.then( res => {
				console.log(res,121313212131)
			})
		},
		methods: {
			
		},

	};
</script>

<style scoped>
	.address{
		font-size: 0.26rem;
		padding:0 0.3rem  0.2rem;
	}
	.item-footer ul li{
		font-size: 0.24rem;
		line-height: 2.3;
		color: #555555;
	}
	.item-footer{
		padding-bottom: 0.2rem;
	}
	.item-footer em{
		color:#FC4396 ;
		display: inline-block;
	}
	.fenqi{
		background: #FA97E6;
		padding: 2px 7px;
		color: #fff;
		border-radius: 0.1rem;
		margin-right: 0.2rem;
	}
	.baoxian{
		background: #7BDBCF;
		padding: 2px 7px;
		color: #fff;
		border-radius: 0.1rem;
		margin-right: 0.2rem;
	}
	.order-state {
		margin-top: 0.1rem;
		padding: 0.1rem 0.3rem;
	}
	
	.order-state li {
		font-size: 0.26rem;
		line-height: 2;
		color: #666;
	}
	
	.compay {
		margin-left: 42%;
	}
	
	.nopay {
		margin-left: 55%;
	}
	
	.appraise {
		margin-left: 72%;
	}
	
	.appraisebutton {
		font-size: 0.30rem;
		display: inline-block;
		background-color: #FEF0A2;
		color: #F36006;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		margin-left: 0.4rem;
		border: solid #FEF0A2 1px;
	}
	
	.order-cancal {
		font-size: 0.28rem;
		display: inline-block;
		color: #ACACAC;
		text-align: right;
	}
	
	.order-pay {
		font-size: 0.30rem;
		display: inline-block;
		background-color: #FF4691;
		color: #FFFFFF;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		margin-left: 0.4rem;
		border: solid #FF4691 1px;
	}
	
	.order-refund {
		font-size: 0.30rem;
		display: inline-block;
		color: #FF4691;
		padding: 0.1rem 0.3rem;
		border-radius: 60px 60px 60px 60px;
		text-align: center;
		border: solid #FF4691 1px;
	}
	
	.order-title {
		font-size: 0.24rem;
		color: #B8B8B8;
		padding: 0.1rem 0.3rem;
		border-bottom: solid #EEEEEE 1px;
		padding-bottom: 0.2rem;
		margin-bottom: 0.2rem;
	}
	
	.order-pages {
		font-size: 0.24rem;
		color: #666;
		padding: 0.1rem 0.3rem;
	}
	
	.order-footers {
		font-size: 0.24rem;
		color: #666;
		border-top: solid #EEEEEE 1px;
		padding: 0.2rem 0.3rem;
		margin-bottom: 0.2rem;
	}
	.order-pages ul li{
		line-height: 2;
	}
	.order-pages ul li div:last-child{
		width: 30%;
		display: inline-block;
		text-align: right;
	}
	.order-pages ul li div:first-child{
		width: 70%;
		display: inline-block;
	}
	.order-pages div:last-child {
		width: 30%;
		display: inline-block;
		text-align: right;
	}
	
	.order-title div:first-child,
	.order-footers div:first-child {
		width: 70%;
		display: inline-block;
	}
	
	.order-title div:last-child,
	.order-footers div:last-child {
		width: 30%;
		display: inline-block;
		text-align: right;
		color: #FF65A3;
	}
	
	.order-kuang {
		background-color: #FFFFFF;
		margin-top: 0.1rem;
		padding-top: 0.2rem;
	}
	
	.price-old {
		text-decoration: line-through;
		font-weight: normal;
	}
	.price-nub{
		font-size: 0.22rem;
		text-align: right;
		 color: #999;
	}
	.price-nub span{
		color: #FF5097;
		margin: 0 0.1rem;
	}
	.price-spans {
		color: #FF5097;
		font-size: 0.3rem;
		margin-right: 0.28rem;
	}
.price-spans span{
	   color: #999;
		font-size: 0.22rem;
		margin-right: 0.28rem;
		margin-left: 0.2rem;
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
		width: 2.6rem;
		height: 1.8rem;
		border-radius: .2rem;
	}
	
	.item .item-img img {
		height: 100%;
		width: 100%;
		border-radius: 0.1rem;
	}
	
	.item .info {
		padding-left: .29rem;
		width: 100%;
	}
	
	.item .info h5 {
		width: 4.35rem;
		font-size: .28rem;
		color: #333;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.item .info h5 span {
		font-size: .28rem;
		font-weight: bold;
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