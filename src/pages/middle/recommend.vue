<style scoped>


/* activity  */
.activity{
	padding: 20rpx 10rpx;
	background: #fff;
	margin-top: 18rpx;
}


</style>

<template>
	<div>
		<div>
			<!-- ---------------------------------医美-------------------------------- -->
			<!--广告位-->
			<div style="margin-bottom: 0rem;">
				<advertising src="http://fs.meiduduo.com/oa/OA/other/1530237590667.png"></advertising>
			</div>
	
			<!-- 资讯 -->
			<div>
                <news title="资讯"></news>
			</div>
            
           <!-- 拼团购 -->
		   <div>
			   <collage :title="title"></collage>
		   </div>

           <!-- 为你推荐 -->
		   <div>
			   <reforyou :title="title"></reforyou>
		   </div>
			<!-- 活动  -->
			<div class="activity">
                  <!-- <img src="" alt=""> -->
                <activity :title="title"></activity>                   
			</div>


			<!--资讯-->
			<!-- <div style="margin-bottom: 0.2rem;">
				<channel title="医美">
					<typeArticle></typeArticle>
				</channel>
			</div> -->
			<!--优惠项目-->
			<!-- <div style="margin-bottom: 0.2rem;">
				<project title="优惠项目">
					<typeProject></typeProject>
				</project>
			</div> -->

			<div style="margin-bottom: 2rem;"  >
				<!-- 美人日记 -->
				<beautyDiary @changeFixed="changeFixed" :title="title"></beautyDiary>
				<!-- <typeDiary :title="title"></typeDiary> -->
				<!-- <project titleColor="#FB78AB" title="美人日记" >
					<typeDiary :title="title"></typeDiary>
				</project> -->

			</div>
			
			
			<div>
				<!-- ---------------------------------美容院-------------------------------- -->
				<!--广告位-->
				<!-- <div style="margin-bottom: 0.8rem;">
					<advertising src="http://fs.meiduduo.com/oa/OA/other/1530237590667.png"></advertising>
				</div> -->
				<!-- 小视频 -->
				<!-- <div style="margin-bottom: 0.2rem;">
					<channel title="小视频">
						<smallVideo>
							<videoPlay videoSrc="http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"></videoPlay>
						</smallVideo>
					</channel>
				</div> -->
				
				<!--资讯-->
				<!-- <div style="margin-bottom: 0.2rem;">
					<channel title="美容院">
						<typeArticle></typeArticle>
					</channel>
				</div> -->
				<!--优惠项目-->
				<!-- <div style="margin-bottom: 0.2rem;">
					<project title="优惠项目">
						<typeProject></typeProject>
					</project>
				</div> -->
				
				
			</div>
			
		</div>

	</div>
</template>

<script>
	import advertising from '../comm/advertising.vue' //广告位
	import channel from '../comm/channel.vue' //带频道名字外部框
	import typeArticle from '../comm/typeArticle.vue' //文章列表
	import project from '../comm/project.vue' //不带频道名字外部框
	import typeProject from '../comm/typeProject.vue' //项目列表
	import typeDiary from '../comm/typeDiary.vue' //日记列表
	import videoPlay from '../comm/videoPlay.vue' //视频主体
	import smallVideo from '../comm/smallVideo.vue' //视频框

	import news from '../comm/news'//新闻
	import collage from '../comm/collage'//拼团
	import reforyou from '../comm/reforyou'//为你推荐
	import activity from '../comm/activity'//活动
	import beautyDiary from '../comm/beautyDiary'
	
	export default {
		components: {
			// 			search,
			// 			navigation,
			advertising,
			channel,
			typeArticle,
			project,
			typeProject,
			typeDiary,
			videoPlay,
			smallVideo,
			news,
			collage,
			reforyou,
			activity,
			beautyDiary
		},
		data() {
			return {
				imgUrls:[
				  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png',
                  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png',
                  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png'
				],
				title:'aaa'
 

			}
		},
		mounted() {

		},
		methods: {
           changeFixed(flag){
			   this.$emit('changeFixed',flag)
		   }
		},

	};
</script>


