<template>
	<div>
		<div class="box">
			<div class="list-x">
				<div class="list-x-title">专属优惠
					<span>更多
						<img src="http://img.meiduduo.com/images/link.png" />
					</span>

				</div>
				<div class="line"><hr style="height:1px;border:none;border-top:1px solid #F3F3F3;" /></div>


				<div class="ullist">
					<div class="item" v-for="(item,index) in itemList" :key="index">
						<div class="item-top">
							<div class="item-img">
								<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" alt="">
							</div>
							<div class="info">
								<div>
									<h5><span style="font-weight: bold;">[埋线双眼皮]</span>
										<span>全城模特招募海选中阿斯达四大</span>
									</h5>
								</div>
								<p class="addr">贵美人整形医院</p>
								<div class="price">
									<!-- <span><em><i>¥</i><span>1600</span><b >&nbsp;/&nbsp;{{item.unit}}</b>&nbsp;&nbsp;</em><del><i>¥</i>{{item.price}}</del></span> -->
									<span>
										<span class="price-span">¥1600</span>
										<span class="price-old">¥2000</span>
									</span>

									<span class="count-buy">990m</span>
								</div>
								<div class="count-c">
									<div class="active">
										推荐理由：超划算，人气高，干净卫生
									</div>

								</div>

							</div>
						</div>

					</div>



				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				itemList: [{
						icon: 'http://img.meiduduo.com/images/lifeBeautifyProject/time_bg1.png',
						title: '皮肤护理',
						content: [
							"完美护理",
							"永保美丽青春",
						],
						price: "¥566",
						rulePrice: '¥398'
					},
					{
						icon: 'http://img.meiduduo.com/images/lifeBeautifyProject/time_bg2.png',
						title: '美容美发',
						content: [
							"打造明显造型",
							"时尚都市发型",
						],
						price: "¥698",
						rulePrice: '¥419'
					},
					{
						icon: 'http://img.meiduduo.com/images/lifeBeautifyProject/time_bg3.png',
						title: '完美meirong',
						content: [
							"原生翘然美鼻",
							"尊享极致自然",
						],
						price: "¥566",
						rulePrice: '¥681'
					},
				],


			}
		},

		mounted() {

		},
		methods: {

		},

	};
</script>

<style scoped>
	.line{width:94%;margin-left: 3%;}
	.ullist{
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.box {
		/* padding: 0 .25rem; */
		background: #fff;
		margin-bottom: .18rem;
	}

	.list-x {
		padding: .2rem 0 .1rem 0;
	}

	.list-x-title {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		font-size: .26rem;
		color: #555;
		height: .4rem;
		line-height: .4rem;
		font-weight: 600;
		width:94%;
		margin-left: 3%;
		margin-bottom: 0.1rem;
	}

	.list-x-title span {
		font-size: .22rem;
		color: #999;
	}

	.list-x-title img {
		width: 0.14rem;
		height: 0.22rem;
		margin-top: -0.07rem;
		margin-left: 0.1rem;
	}

	.price-old {
		text-decoration: line-through;
		font-weight: normal;
	}

	.price-span {
		color: #FF5097;
		font-weight: bold;
		font-size: 0.32rem;
		margin-right: 0.2rem;
	}

	.item {
		margin: 0.1rem 0.1rem;
		font-size: 14px;
		overflow: hidden;
		position: relative;
		background: #FFFFFF;
		padding: 0.15rem;
		border-radius: 0.1rem;
		/* border: 1rpx solid #dddee1; */
		-moz-box-shadow:4px 4px 11px #F2F2F2; -webkit-box-shadow:4px 4px 11px #F2F2F2; box-shadow:4px 4px 11px #F1F1F1;
		-moz-box-shadow:-1px -1px 11px #F2F2F2; -webkit-box-shadow:-1px -1px 11px #F2F2F2; box-shadow:-1px -1px 11px #F1F1F1;
		/* margin-bottom: .3rem; */
		/* margin-bottom: .3rem; */
		/* border-bottom: 1px solid #EEEEEE; */
		width: 6.3rem;
		/* margin-left: 3%; */
	}

	.item-top {
		display: flex;
		display: -webkit-flex;
		/* padding-bottom: .17rem;
		margin-bottom: .1rem; */
	}

	.item .item-img {
		width: 2rem;
		height: 2rem;

	}

	.item .item-img img {
		height: 100%;
		width: 100%;
		border-radius: .1rem;

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
		margin-top: 0.2rem;
		background-color: #FFF0F6;
	}

	.item .count-buy {
		font-size: .24rem;
		color: #bbbbbb;
		text-align: left;
		font-weight: 100;
		padding-right: 0.1rem;
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
		margin: 0.1rem ;
		/* margin-bottom: .2rem; */
		color:#FF71AA;
		font-weight: normal;
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
	/* .list-x ul {
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		margin-top: 0.2rem;
	}

	.list-x ul li>div {
		height: 1rem;
		width: 3.12rem;
		margin-right: .15rem;
		background-size: 100%;
		background-repeat: no-repeat;
		border-radius: 0.1rem;
		margin-bottom: 0.1rem;
		padding: 0.3rem 0.2rem;
	}

	.list_t {
		font-size: 0.3rem;
		color: #333333;
	}

	.list_c {
		font-size: 0.22rem;
		color: #999999;
	}

	.list_c0 {
		margin-top: 0.16rem;
	}

	.list_rule {
		color: #FC428D;
		font-size: 0.3rem;
		margin-left: 0.2rem;
	}

	.list_p {
		color: #999999;
		font-size: 0.24rem;
		margin-left: 0.26rem;
	} */
</style>
