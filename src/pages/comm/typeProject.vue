<template>
	<div>
		<div class="item" @click="jump">
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
						<!-- <span><em><i>¥</i><span>1600</span><b >&nbsp;/&nbsp;{{item.unit}}</b>&nbsp;&nbsp;</em><del><i>¥</i>{{item.price}}</del></span> -->
						<span>
							<span class="price-span">¥1600</span>
							<span class="price-old">医院价：¥2000</span>
						</span>

						<span class="count-buy">11人购买</span>
					</div>
					<div class="count-c">
						<div class="active">
							<span class="red">分期</span>
							<span class="green">保险</span>
						</div>
						<p class="count-collection-btn">
							<span>
								<!-- <img src="/static/img/home/dz.png" /> -->
								<em>收藏</em>
							</span>
						</p>
						<!-- <p class="count-collection-btn1" v-else @click.stop="collectBtn(item)">
      						<span>
      							已收藏
      						</span>
      					</p> -->
					</div>

				</div>
			</div>
			<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
		</div>
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
					<div class="price">
						<!-- <span><em><i>¥</i><span>1600</span><b >&nbsp;/&nbsp;{{item.unit}}</b>&nbsp;&nbsp;</em><del><i>¥</i>{{item.price}}</del></span> -->
						<span>
							<span class="price-span">¥1600</span>
							<span class="price-old">医院价：¥2000</span>
						</span>

						<span class="count-buy">11人购买</span>
					</div>
					<div class="count-c">
						<div class="active">
							<span class="red">分期</span>
							<span class="green">保险</span>
						</div>
						<p class="count-collection-btn">
							<span>
								<!-- <img src="/static/img/home/dz.png" /> -->
								<em>收藏</em>
							</span>
						</p>
						<!-- <p class="count-collection-btn1" v-else @click.stop="collectBtn(item)">
  						<span>
  							已收藏
  						</span>
  					</p> -->
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
			}
		},

		mounted() {

		},
		methods: {
			jump(){
				this.$router.push({path:"/pages/others/productDetails"})
			}
		},

	};
</script>

<style scoped>
	.price-old {
		text-decoration: line-through;
		font-weight: normal;
	}

	.price-span {
		color: #FF5097;
		font-weight: bold;
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
		width: 2rem;
		height: 2rem;
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
