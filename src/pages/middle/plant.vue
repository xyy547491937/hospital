<template>
	<div>

		<div>
			<!--广告位-->
			<div style="margin-bottom: 0.8rem;" v-if="Data.ishow.advertising=='show'">
				<advertising src="http://fs.meiduduo.com/oa/OA/other/1530237590667.png"></advertising>
			</div>

			<!--带头部资讯-->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.medicine=='show'">
				<channel title="医美">
					<typeArticle></typeArticle>
				</channel>
			</div>
			<!-- 不带头部文章 -->
			<div v-if="Data.ishow.typeArticle=='show'">
				<typeArticle></typeArticle>
			</div>
			<!-- 关注医生 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.doctor=='show'">
				<doctor :doctor="doctorlist"></doctor>
			</div>


			<!--优惠项目-->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.typeProject=='show'">
				<project title="优惠项目">
					<typeProject></typeProject>
				</project>
			</div>

			<!-- banner图 -->
			<div v-if="Data.ishow.banner=='show'">
				<banner imgsrc="http://img.meiduduo.com/images/grid/syymbg.jpg"></banner>
			</div>
			<!-- 宫格 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.grid=='show'">
				<grid></grid>
			</div>
			<!-- 优选榜单 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.optimizationList=='show'">
				<optimizationList></optimizationList>
			</div>

			<!-- 分类导航 -->
			<div class="type_boxs" :class="{fixed:fixed,static:!fixed}" v-if="Data.ishow.tabClassify=='show'">
				<tabClassify @callback="selectType" :width="'100%'" :data="arrs"></tabClassify>
			</div>
			<div v-if="Data.ishow.typeDiary=='show'">
				<!-- 美人日记 -->
				<!-- <project titleColor="#FB78AB" title="美人日记">
					<typeDiary></typeDiary>
				</project> -->
				<div style="background: #fff;padding: 20rpx 0;">
					<typeDiary :type="selctTypeVal"></typeDiary>
				</div>
			</div>
			<!-- 小视频 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.smallVideo=='show'">
				<channel title="小视频">
					<smallVideo>
						<videoPlay videoSrc="http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"></videoPlay>
					</smallVideo>
				</channel>

			</div>
			<!-- 不带频道的小视频 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.nochannelVideo=='show'">

								<smallVideo>
									<videoPlay videoSrc="http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"></videoPlay>
								</smallVideo>


						</div>
			<!-- 横排项目 -->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.lifeBeautifyProject=='show'">
				<lifeBeautifyProject></lifeBeautifyProject>
			</div>
			<!-- 商品列表 -->
			<div v-if="Data.ishow.goodList=='show'"  >
				<projectList>
					<goodList></goodList>
				</projectList>
			</div>



			<!-- 小视频列表-->
			<div style="margin-bottom: 0.2rem;" v-if="Data.ishow.videoList=='show'">
				<videoList></videoList>
			</div>
      <!-- 同城 -->
      <div style="margin-bottom: 0.2rem;" v-if="Data.ishow.loacalAll=='show'">
				<loacalAll></loacalAll>
			</div>
		</div>
	</div>



</template>

<script>
	// 	import search from '../comm/search.vue' //顶部搜索框
	// 	import navigation from '../comm/navigation.vue' //顶部频道导航
	import advertising from '../comm/advertising.vue' //广告位
	import videoPlay from '../comm/videoPlay.vue' //视频主体
	import smallVideo from '../comm/smallVideo.vue' //视频框
	import channel from '../comm/channel.vue' //带频道名字外部框
	import project from '../comm/project.vue' //不带频道名字外部框
	import typeArticle from '../comm/typeArticle.vue' //文章列表
	import typeProject from '../comm/typeProject.vue' //项目列表
	import typeDiary from '../comm/diaryCard.vue' //日记列表
	import projectList from '../comm/projectList.vue' //商品列表
	import goodList from '../comm/goodList.vue' //商品列表
	import tabClassify from '../comm/tabClassify.vue' //分类导航
	import optimizationList from '../comm/optimizationList.vue' //优选榜单
	import banner from '../comm/banner.vue' //banner图
	import grid from '../comm/grid.vue' //宫格
	import doctor from '../comm/doctor.vue' //关注医生
	import lifeBeautifyProject from '../comm/lifeBeautifyProject.vue' //横排项目
	import loacalAll from '../comm/loacalAll.vue' //小视频
	import videoList from '../comm/videoList.vue' //小视频


	export default {
		props: ["Data"],
		components: {
			// 			search,
			// 			navigation,
			advertising,
			videoPlay,
			smallVideo,
			channel,
			typeArticle,
			project,
			typeProject,
			typeDiary,
			projectList,
			goodList,
			tabClassify,
			optimizationList,
			banner,
			grid,
			doctor,
			// "diary": project,
			lifeBeautifyProject,
			videoList,
      loacalAll
		},
		data() {
			return {
				arrs: [],
				doctorlist: [{
						icon: "http://fs.meiduduo.com/shop/SHOP/other/1530045715118.png",
						nickName: "张利民",
						cheng: "贵美人医疗美容中心"
					},
					{
						icon: "http://fs.meiduduo.com/shop/SHOP/other/1530045715118.png",
						nickName: "张利民",
						cheng: "贵美人医疗美容中心"
					},
					{
						icon: "http://fs.meiduduo.com/shop/SHOP/other/1530045715118.png",
						nickName: "张利民",
						cheng: "贵美人医疗美容中心"
					},
					{
						icon: "http://fs.meiduduo.com/shop/SHOP/other/1530045715118.png",
						nickName: "张利民",
						cheng: "贵美人医疗美容中心"
					},

				],
				selctTypeVal: 0, // 选择的日记分类
				top: 450,
				scrollTop: 0,
				fixed: false,
			}
		},
		created() {
			console.log(JSON.stringify(this.Data))
		},
		mounted() {
			this.queryDiaryType()
			const self = this
			wx.createSelectorQuery().select('.type_boxs').boundingClientRect((res)=>{
				console.log(res)
				self.top = res.top - 40
			}).exec()
		},
		onPageScroll(event){
				this.scrollTop = event.scrollTop
				if(event.scrollTop>this.top){
					this.fixed = true
				}else{
					this.fixed = false
				}
		},
		onShow () {
			// this.queryDiaryType()
		},
		methods: {
			selectType (index, code) {
				console.log(index, code)
				this.selctTypeVal = code
			},
			queryDiaryType () { // 获取日记本类型
				this.$http.post('common/dictList', {
					// TODO: organId 的取值是否正确
					organId: this.$store.state.userInfo.organId,
					masterCode: 'diary_type'
				}).then(res => {
					console.log(res)
					this.arrs = res.data
				})
			}
		},

	};
</script>

<style scoped>
	.content {
		margin-top: 1.4rem;
		height: 100%;
		/* top:2rem; */
		background-color: #F1F1F1;
	}

	.fixation {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 2000;
		background-color: #F1F1F1;
	}
	.fixed {
		position: fixed;
		top: 78rpx;
		z-index: 3000;
		background: #fff;
	}
	.static {
		position: static;
	}
</style>
