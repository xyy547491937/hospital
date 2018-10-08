<template>
	<div class="goodList-kuang">
		<div v-for="(proitem,index) in projectList" :key="index">
			<div class="item">
				<div class="item-top">
					<div class="item-img">
						<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" alt="">
					</div>
					<div class="info_box">
						<div class="info_title">
							<h5>[{{proitem.titleOne}}]
								<span>{{proitem.titleTwo}}</span>
							</h5>
						</div>
						<div class="info_main">
							<div class="addr_item_box">
								<img class="addr_item" src="/static/images/mine/item12.png" alt="">
								<span>5.0</span>
							</div>
							<div>
								{{proitem.addr}}
							</div>
						</div>
						<div v-for="(item,itemkey) in proitem.group" :key="itemkey">
							<div v-if="(itemkey<2?true:false)||proitem.proshow==2">
								<div class="price">
									<span>
										<span class="price-span">¥{{item.price}}</span>
										<span class="price-old">{{item.pro}}</span>
									</span>

									<span class="count-buy">{{item.buy}}</span>

								</div>
								<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
							</div>
						</div>

					</div>

				</div>
				<div>
					<div class="goodList-more" @click="changeType(proitem,index)">
						<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
						<div style="margin-top: 0.3rem;">{{proitem.prodown}}</div>
					</div>

				</div>

			</div>
			<hr style="height:1px;border:none;border-top:0.8rem solid #EEEEEE;" />
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				projectList: [{
						"titleOne": "埋线双眼皮",
						"titleTwo": "全城模特招募海选中",
						"addr": "裕华区 1.2Km",
						"prodown": "查看详情",
						"proshow":1,
						"group": [{
								"price": "1600",
								"pro": "单人背部祛痘套餐",
								"buy": "已售418",
								
							},
							{
								"price": "1600",
								"pro": "单人背部祛痘套餐",
								"buy": "已售418",
								
							},
							{
								"price": "1600",
								"pro": "单人背部祛痘套餐",
								"buy": "已售418",
								
							}
						]


					}



				],
				starIndex: null,
				starIndexInfo: 0

			}
		},
		
		mounted() {

		},
		methods: {
			changeType(proitem,index){
				if(proitem.proshow==1){
					this.projectList[index].proshow=2
					this.projectList[index].prodown="收起"
				}else if(proitem.proshow==2) {
					this.projectList[index].proshow=1
					this.projectList[index].prodown="查看详情"
				}
				
				
			},
			onChange (e) {
				const index = e.target.index
				this.starIndex = index
				this.starIndexInfo = index + '.0'
			}
		},

	};
</script>

<style scoped>
	.goodList-more {
		text-align: center;
		font-size: 0.3rem;
		color: #bbbbbb
	}

	.goodList-kuang {
		background-color: #FFFFFF;
		padding-top: 0.2rem;
	}

	.price-old {
		/* text-decoration: line-through; */
		font-weight: normal;
	}

	.price-span {
		/* color: #FF5097; */
		/* font-weight: bold; */
		margin-right: 0.2rem;
	}

	.item {
		margin-bottom: .3rem;
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
		width: 1.28rem;
		height: 1.28rem;
		border-radius: .2rem;
	}

	.item .item-img img {
		height: 100%;
		width: 100%;
	}

	.item .info {
		padding-left: .2rem;
		width: 100%;
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

	.item .info {
		font-size: .24rem;
		color: #FCBB5E;
		line-height: .6rem;
		margin: 0.1rem 0;
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
		padding: 0.2rem 0;
		width: 98%;
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
	.addr_item_box {
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #FEB259;
		margin: 17rpx 0 22rpx 0;
	}
	.addr_item {
		display: inline-block;
		width: 26rpx;
		height: 26rpx;
		margin-right: 10rpx;
	}
	.info_title {
		font-size: 30rpx;
		color: #333;
	}
	.info_main {
		font-size: 24rpx;
		color: #333;
	}
	.info_box {
		margin-left: 27rpx;
		flex: 1;
	}
</style>
