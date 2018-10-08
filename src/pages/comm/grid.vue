<template>
	<div class="grid-kuang">
		<!-- <div v-for="(dimitem,dimindex) in dimensionlist" :key="dimindex">

			<i-grid>
				<div v-for="(colitem,colindex) in dimitem.collist" :key="colindex">
					<i-grid-item>
						<i-grid-icon>
							<image src="http://img.meiduduo.com/images/head-img.png" />
						</i-grid-icon>
						<i-grid-label>{{colitem.name}}</i-grid-label>
					</i-grid-item>
				</div>

			</i-grid>
		</div> -->
		<div class="box">


			<div class="poject">
				<div class="poject-item" @click="jump()">
					<span>
						<img src="/static/images/grid/14.png" alt="">
					</span>
					<p class="typeface">全部项目</p>
				</div>
				<div class="poject-item" v-for="(item, index) in list" :key="index" @click="jump(item)">
					<span>
						<img :src="item.cover" alt="">
					</span>
					<p class="typeface">{{item.cateName}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				poject: [
					{
						cateName: "全部项目",
						cover: "http://img.meiduduo.com/images/grid/14.png"
					},
					{
						cateName: "玻尿酸",
						cover: "http://img.meiduduo.com/images/grid/13.png"
					},
					{
						cateName: "肉毒素",
						cover: "http://img.meiduduo.com/images/grid/12.png"
					},
					{
						cateName: "鼻部",
						cover: "http://img.meiduduo.com/images/grid/11.png"
					},
					{
						cateName: "眼部",
						cover: "http://img.meiduduo.com/images/grid/10.png"
					},
					{
						cateName: "脂肪填充",
						cover: "http://img.meiduduo.com/images/grid/9.png"
					},
					{
						cateName: "胸部",
						cover: "http://img.meiduduo.com/images/grid/8.png"
					},
					{
						cateName: "水光针",
						cover: "http://img.meiduduo.com/images/grid/7.png"
					},
					{
						cateName: "口腔",
						cover: "http://img.meiduduo.com/images/grid/6.png"
					},
					{
						cateName: "面部轮廓",
						cover: "http://img.meiduduo.com/images/grid/5.png"
					},
					{
						cateName: "激光脱毛",
						cover: "http://img.meiduduo.com/images/grid/4.png"
					},
					{
						cateName: "皮肤管理",
						cover: "http://img.meiduduo.com/images/grid/3.png"
					},
					{
						cateName: "毛发种植",
						cover: "http://img.meiduduo.com/images/grid/2.png"
					},
					{
						cateName: "唇部",
						cover: "http://img.meiduduo.com/images/grid/1.png"
					},
					{
						cateName: "美体塑形",
						cover: "http://img.meiduduo.com/images/grid/15.png"
					}
				],
				list: []
			}
		},

		mounted() {
			this.queryType()
		},
		onShow () {},
		methods: {
			jump (item) {
				if (item) {
					this.$router.push({
						path: 'select_commodity',
						query: {
							channelCode: item.channelCode,
							id: item.id,
							tier: item.tier
						}
					})
				} else {
					this.$router.push({
						path: 'select_commodity',
						query: {
							channelCode: '1533971621599',
							tier: 2
						}
					})
				}
			},
			queryType () {
				this.$http.post('projectCate/listByCondition', {
					tier: 2,
					channelCode: '1533971621599'
				}).then(res => {
					console.log(res)
					if (res.code === 1) {
						this.list = res.data
					}
				})
			}
		},

	};
</script>

<style scoped>
	.typeface{
		font-size: 0.2rem;
	}
	.grid-kuang {
		background-color: #FFFFFF;
	}
	.box{
	    margin-bottom: .17rem;
	    background: #fff;
	}
	.banner{
	    padding-top: .17rem;
	}
	.banner img{
	    height: 3.6rem;
	    width: 100%;
	}
	.poject {
		display: flex;
		display: -webkit-flex;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		background: #fff;
		text-align: center;
		padding: .31rem .34rem .41rem .21rem;
	}

	.poject .poject-item {
		width: 20%;
	}

	.poject .poject-item>span {
		width: .6rem;
		height: .6rem;
		display: inline-block;
		margin: .2rem;
	}

	.poject .poject-item img {
		width: .6rem;
		height: .6rem;
	}
</style>
