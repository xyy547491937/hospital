<style scoped>
	.count-buy {
		font-size: .24rem;
		padding-right: 0.15rem;
		color: #bbbbbb;
		text-align: left;
		font-weight: 100;
	}

	.FL-bottom {
		width: 96%;
		margin-left: 2%;
		margin-bottom: 0.1rem;
	}

	.FL-name {
		font-size: 0.25rem;
	}

	.FL-img {
		width: .4rem;
		height: .4rem;
	}

	.FL-img img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.FL-details {
		margin: .15rem;
		font-size: .26rem;
		/* margin-bottom: .1rem; */
		width: 100%;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.FLdetails {
		padding: 0rem 0.1rem 0.1rem 0.1rem;
		font-size: 0.25rem;
	}
	.FLtitle {
		font-size: 0.25rem;
		padding: 0.1rem;
		font-weight: bold;
		margin: 0.1rem 0;
	}
	.FLkuang {
		margin: 0.1rem 0.1rem;
		font-size: 14px;
		overflow: hidden;
		position: relative;
		background: #fff;
		border: 1rpx solid #dddee1;
		border-radius: 8rpx;
	}
	.FL-details {
		margin: .15rem;
		font-size: .26rem;
		/* margin-bottom: .1rem; */
		width: 95%;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-weight: bold;
	}
	image.classimg {
		width: 100%;
		max-height: 5rem;
		min-height: 2rem;
	}
	.videolist{
		background: #F1F1F1;
		overflow:hidden;
		/* column-count:2; */
	}
</style>


<template>
<!-- import func from './vue-temp/vue-editor-bridge'; -->
	<div style="background-color: #F1F1F1;" class="videolist">
		<!-- <i-row>
            <i-col span="12"> -->
				<!-- <div class="videolist">
					<div class="FLkuang" v-for="(item,index) in videolist" :key="index" @click="jump">

						<img :src="item.cover"  class="classimg">
						<div class="FL-details">{{item.authorName}}</div>

						<div class="FL-bottom">

							<i-row span="24">
								<i-col span="4">
									<div class="FL-img">
										<img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt="">
									</div>
								</i-col>
								<i-col span="13" class="FL-name">
									{{item.auditorName}}
								</i-col>
								<i-col span="7">
									<span class="count-buy">
										<i-icon type="like" size="17" />
										<div style="margin-left: 0.05rem;display: inline-block;">{{item.commentNum}}</div>
									</span>
								</i-col>
							</i-row>
						</div>
					</div>
				</div> -->
			<!-- </i-col> -->


        <scroll-view  style="height:100%" :scroll-y="true" lower-threshold="10" @scrolltolower="loadMore">
			<i-col span="12" >
				<div style="padding-left:8rpx">
					<div class="FLkuang" v-for="(item,index) in videolist" v-if="index % 2 == 0 " :key="index" @click="jump(item)">

						<img :src="item.cover" mode="widthFix"  class="classimg">
						<div class="FL-details">{{item.authorName}}</div>

						<div class="FL-bottom">

							<i-row span="24">
								<i-col span="4">
									<div class="FL-img">
										<img  :src="item.authorIcon" alt="">
										<!-- <img mode="widthFix" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
									</div>
								</i-col>
								<i-col span="13" class="FL-name">
									{{item.auditorName}}
								</i-col>
								<i-col span="7">
									<span class="count-buy">
										<i-icon type="like" size="17" />
										<div style="margin-left: 0.05rem;display: inline-block;">{{item.favouriteNum}}</div>
									</span>
								</i-col>
							</i-row>
						</div>
					</div>
				</div>
			</i-col>
			<i-col span="12" >
				<div style="padding-right:8rpx">
					<div class="FLkuang" v-for="(item,index) in videolist" v-if="index % 2 != 0 " :key="index" @click="jump(item)">
						<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530184357137.png"  class="classimg"> -->
						<img :src="item.cover" mode="widthFix"  class="classimg">
						<div class="FL-details">{{item.authorName}}</div>

						<div class="FL-bottom">

							<i-row span="24">
								<i-col span="4">
									<div class="FL-img">
										<img  :src="item.authorIcon" alt="">
										<!-- <img  src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
									</div>
								</i-col>
								<i-col span="13" class="FL-name">
									{{item.auditorName}}
								</i-col>
								<i-col span="7">
									<span class="count-buy">
										<i-icon type="like" size="17" />
										<div style="margin-left: 0.05rem;display: inline-block;">{{item.favouriteNum}}</div>
									</span>
								</i-col>
							</i-row>
						</div>
					</div>
				</div>

			</i-col>


        </scroll-view>
		<!-- </i-row> -->
	</div>
</template>

<script>

	export default {

		data() {
			return {

				listleft: [{
						heightline: "20rem",
						FLaddr: "贵美人医疗整形医院SADASASDASDJHAKJDHKASHDAHDKAHD",
						FLtitle: '埋线双眼皮',
						FLdetails: "全城模特招募海选中",

					},
					{
						heightline: "20rem",
						FLaddr: "贵美人医疗整形医院",
						FLtitle: '埋线双眼皮',
						FLdetails: "全城模特招募海选中",

					},
				],
				listright: [{
						heightline: "7rem",
						FLaddr: "贵美人医疗整形医院",
						FLtitle: '埋线双眼皮',
						FLdetails: "全城模特招募海选中",

					},
					{
						heightline: "7rem",
						FLaddr: "贵美人医疗整形医院",
						FLtitle: '埋线双眼皮',
						FLdetails: "全城模特招募海选中",

					},
				],
				videolist:[]
			}
		},

		mounted() {

		},
		methods: {
			jump(item){
				this.$router.push({
					path:'/pages/info/video_info',
                    query:{
						id:item.id,
						channelCode:item.channelCode
					}
				})
			},
			getVideoList(pageNum,pageSize){
				this.$http.post('/smallVideo/list4PageForApp',{
                    pageNum,
					pageSize
				  },{
					headers: { "content-type": "application/json" }
				   }
				).then(res=>{
					// console.log(res);
					this.videolist = res.data.data
				})
               
			},
			loadMore(){
				console.log(666);
				
			}
			// onImageLoad(e) {
			// 	let imageId = e.currentTarget.id;
			// 	let oImgW = e.detail.width;         //图片原始宽度
			// 	let oImgH = e.detail.height;        //图片原始高度
			// 	let imgWidth = (this.data.winWidth - 20) * 0.48;
			// 	let scale = imgWidth / oImgW;        //比例计算
			// 	let imgHeight = scale * oImgH;
			// 	let imgObj = {
			// 		id: imageId,
			// 		width: imgWidth,
			// 		height: imgHeight
			// 	};
			// 	imgLen++;
			// 	for (let i = 0; i < temResImgArr.length; i++) {
			// 		if (temResImgArr[i].id == imageId) {
			// 			temResImgArr[i].width = imgWidth;
			// 			temResImgArr[i].height = imgHeight;
			// 			break;
			// 		}
			// 	}
			// 	if (imgLen == temResImgArr.length) {//图片遍历完
			// 		this.waterFall();
			// 	}

			// },
			// onImageError() {
			// 	imgLen++;
			// },
			// init(){
			// 	let self = this;
			// 	imgLen = 0;
			// 	heightArr = [];
			// 	wx.getSystemInfo({
			// 		success: function (res) {
			// 			let imgW = Math.floor(350 * (res.windowWidth) / 750);//图片在当前屏幕尺寸下的实际宽度
			// 			let colW = Math.floor((res.windowWidth - 2 * imgW) / 3);//左右两边边距和图片边距的宽度
			// 			this.winWidth = res.windowWidth
			// 			this.winHeight = res.windowHeight
			// 			this.colW = colW
			// 			self.getImgInfo();
			// 		}
			// 	})
			// },
			// waterFall: function (data) {
			// 	for (let i = 0; i < temResImgArr.length; i++) {
			// 		if (heightArr.length < 2 && i < 2) {
			// 			heightArr.push(temResImgArr[i].height + 10);
			// 		} else {
			// 			let minH = Math.min.apply(null, heightArr);
			// 			let index = heightArr.indexOf(minH);
			// 			temResImgArr[i].top = `${minH}`;
			// 			temResImgArr[i].left = `${360 * index}rpx`;
			// 			heightArr[index] += (temResImgArr[i].height + 10);
			// 		}
			// 	}
			// 	let maxH = Math.max.apply(null, heightArr);
			// 	let temp = this.data.imgArr;
			// 	temp.push(...temResImgArr);
			// 	this.setData({
			// 		imgArr: temp,
			// 		viewHeight: maxH,
			// 		temImgArr: []
			// 	});
			// 	//重置数据。
			// 	temResImgArr = [];
			// 	imgLen = 0;
			// 	wx.hideToast();
			// },
		},
		created(){
			// this.getVideoList(1,15)
		},
		onLoad(){
			this.getVideoList(1,15)
		}

	};
</script>
