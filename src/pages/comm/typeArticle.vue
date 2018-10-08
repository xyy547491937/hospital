<template>
	<div class="article-kuang">
	<div class="article-all">
		<div class="article">
			<i-row span="24" class="article-title" @click="jump">2018世界医美抗衰老上海峰会</i-row>
			<!-- 一张图 -->
			<i-row span="24" class="article-img">
				<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png" alt="">
			</i-row>
			<i-row class="article-bottom">
				<i-col span="12">来源:健美网
					<i-icon type="browse" size="14" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="message" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="praise" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="like" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
			</i-row>
		</div>

		<div class="article">
			<i-row span="24" class="article-title">2018世界医美抗衰老上海峰会</i-row>
			<!-- 两张图 -->
			<i-row span="24" class="article-img">
				<i-col span="12">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png" >
				</i-col>
				<i-col span="12">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png">
				</i-col>
			</i-row>
			<i-row class="article-bottom">
				<i-col span="12">来源:健美网
					<i-icon type="browse" size="14" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="message" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="praise" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="like" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
			</i-row>
		</div>

		<div class="article">
			<i-row span="24" class="article-title">2018世界医美抗衰老上海峰会</i-row>
			<!-- 三张图 -->
			<i-row span="24" class="article-img">
				<i-col span="8">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png" alt="">
				</i-col>
				<i-col span="8">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png" alt="">
				</i-col>
				<i-col span="8">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530184697179.png" alt="">
				</i-col>
			</i-row>
			<i-row class="article-bottom">
				<i-col span="12">来源:健美网
					<i-icon type="browse" size="14" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="message" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="praise" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
				<i-col span="4">
					<i-icon type="like" size="14" style="text-align: center;" />
					<span>1320</span>
				</i-col>
			</i-row>
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
				this.$router.push({path:'/pages/info/information'})
			}
		},

	};
</script>

<style scoped>
.article{
  background: #fff;
  margin-bottom: 0.3rem;
  padding: .34rem .26rem;
  margin-bottom: .18rem;
}
	.article-kuang{
		padding-top: 0.2rem;
	}

	.article-title {
		font-size: 0.3rem;
	}

	.article-img {
		height: 3rem;
	}

	.article-img img {
		margin: 0.2rem 0;
		height: 3rem;
		width: 98%;
	}

	.article-bottom {
		font-size: 0.25rem;
		color: #ACACAC;
	}
</style>
