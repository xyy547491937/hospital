<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
	.typeDiary-bottom {
		margin: 0.2rem 0 0.2rem 0.2rem;
		font-size: 0.25rem;
		color: #ACACAC;
	}

	/* .typeDiary-bottom {
		;
	} */

	.typeDiary-price {
		font-size: .26rem;
		color: #FF4691;
	}

	.div-hos {
		margin: .1rem 0;
		padding: .1rem 0 .1rem 0;
		background-color: #f5f5f5;
	}

	.div-hos img {
		vertical-align: sub;
		height: .3rem;
		width: .3rem;
	}

	.div-hos-left {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		font-size: .23rem;
	}

	.div-type {
		/* margin-left: .2rem; */
	}

	.typeDiary-type {
		color: #FF4892;
		margin-left: .1rem;
		font-size: 0.3rem;
	}

	.typeDiary-details {
		margin: .15rem 0;
		color: #666666;
		font-size: .26rem;
		/* margin-bottom: .1rem; */
		/* width: 100%; */
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* white-space: nowrap; */
		overflow: hidden;
		/* height: 40rpx; */
		/* line-height: 40rpx; */
		/* padding-right:80rpx; */
		
	}
	.typeDiary-details.extend{
		/* height: auto;
		white-space:normal;
		padding-right:0rpx; */
	}
	.typeDiary-details .rich-text{
		/* display: inline; */
	}

	.typeDiary-pos {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 1rem;
		height: 0.3rem;
	}
	.typeDiary-pos.afterimg{
        left: 0;
	}
	.typeDiary-before {
		width: 3.42rem;
		height: 3.7rem;
		border-radius: .1rem;
		position: relative;
		overflow: hidden;
		/* margin-left: 0.1rem; */
	}


	.typeDiary-before-img {
		height: 100%;
		width: 100%;
	}

	.typeDiary-title {
		margin: 0.2rem 0;
	}

	.typeDiary-name {
		font-size: 0.3rem;
	}

	.typeDiary-kuang {
		/* width: 94%;
		margin-left: 2%; */
		margin:35rpx 30rpx 20rpx 30rpx;
		padding-bottom:5rpx;
		border-bottom:2rpx solid #ccc;
	}
	.typeDiary-kuang:last-child{
		border: none;
	}

	.typeDiary-img {
		width: .4rem;
		height: .4rem;
	}

	.typeDiary-img img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.diarytab-box{
		overflow: hidden;
	}
	.diarytab{
		margin: 0 30rpx 0rpx 30rpx;
		/* display: flex;
		justify-content: space-between; */
		font-size: 26rpx;
		color: #555;
		overflow-x:scroll;
		white-space: nowrap;
	}
	.diarytab::-webkit-scrollbar{
		display: none;
	}
	.tabitem{
		display:inline-block;
		color: #555;
		padding:0 26rpx;
		padding-bottom: 8rpx;
		/* float: left; */
		box-sizing: border-box;
	}
	.tabitem::-webkit-scrollbar{
		display: none;
	}
	.tabitem.active{
		color: #FF4691;
		border-bottom: 2rpx solid #FF4691;
	}
	.top{
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
}
.top .title-img{
    display: inline-block;
	width: 32rpx;
	height: 8rpx;
	vertical-align:top;
	margin-top: 8rpx;
}
 .content-body{
   float:right;
   width:60%;
 } 
 .content-body i-icon{
   margin-right:4rpx;
   vertical-align:top;
 }
 .praisebtn.active{
	color: #FF4691;
 }
 .beauty .diarytab-box.fixed{
	position: fixed;
	top: 78rpx;
	z-index: 3000;
	background: #fff;
 }
 .beauty .diarytab-box.static{
	position: static;
 }

</style>

<template>
	<div style="background:#fff" class="beauty">
		<div class="top" ref="beauty" >
             <div class="title-text">精选日记</div>
            <img class="title-img" src="http://img.meiduduo.com/images/info/wan.png" alt="">
		</div>
		<!-- <i-sticky :scrollTop="scrollTop">
           <i-sticky-item i-class="i-sticky-demo-title"> -->
			   <!-- <view slot="title"> -->
					<div class="diarytab-box" :class="{fixed:fixed,static:!fixed}">
						<div class="diarytab">
							<div class="tabitem" v-for="(item,index) in diaryTypes" :key="index"
							@click="tabClick(item.code,index)" :class="{active:currentTab == index}" >{{item.name}}</div>
						</div>
					</div>
               <!-- </view> -->
			   <!-- <view slot="content"> -->
                  <div class="diarytab-Content" v-for="(list,index) in diaryContent" :key="index" v-show="currentTab == index">
					<!-- v-for="(item,index) in diaryTypes[index]" :key="index" v-show="currentTab == index" -->
				
				<!-- v-for="(item,index) in diaryContent" :key="index" -->
					<div >
						<div class="typeDiary-kuang" v-for="(item,i) in list" :key="i" >
							<div>
								<i-row span="24" >
									<i-col span="12">
										<div class="typeDiary-before" @click="todiary(item)">
											<img :src="item.prePhoto" class="typeDiary-before-img">
											<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1531463285241.jpg" class="typeDiary-before-img"> -->
											<!-- <img :src="http://fs.meiduduo.com/oa/OA/other/1531463285241.jpg" class="typeDiary-before-img"> -->
											<img src="http://img.meiduduo.com/images/index/Before.png" class="typeDiary-pos">
										</div>
									</i-col>
									<i-col span="12">
										<div class="typeDiary-before" @click="todiary(item)">
											<img :src="item.afterPhoto" class="typeDiary-before-img">
											<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1531463260456.jpg" class="typeDiary-before-img"> -->
											<img src="http://img.meiduduo.com/images/index/After.png" class="typeDiary-pos afterimg">
										</div>
									</i-col>
								</i-row>

								<div class="typeDiary-title" @click="todiary(item)">
									<i-row span="24">
										<i-col span="2">
											<div class="typeDiary-img">
												<!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
												<img :src="item.authorIcon" alt="">
											</div>
										</i-col>
										<i-col span="20" class="typeDiary-name">{{item.authorName}}</i-col>
									</i-row>
								</div>
								<div @click="todiary(item)">
									<div class="typeDiary-details" :class="{extend:item.extend}"  style="position:relative;">
										<rich-text :nodes="item.diaryContent" ></rich-text>
										<!-- <div>{{item.diaryContent}}</div> -->
										<!-- <wxParse :content="item.diaryContent" noData="" ></wxParse> -->
										<!-- 就算是你长着一张很普通的脸，通过后天的改变也可以的，我鼻子天生就不好看，大概就怪那遗传了吧！所以如今我才会去选择去隆鼻，做了之后脸很立体，也很自然，以后再也不用担心别人用异样的眼光来看我，刚做完手术的时候，难免会很难看，不过后面的等待我觉得都是值得的。现在不管是从哪个角度拍照都特别好看，很满意，很喜欢，很感谢医生。 -->
										<!-- <div style="position:absolute;right:0rpx;bottom:0rpx;display:inline;z-index:10;background:#fff;"> 
										  <span style="margin-right:10rpx">...</span>
										  <span @click.stop="seeAll(item,true)" v-if="!item.extend" style="color:#FF4691;font-size:26rpx;">全文</span>
										  <span @click.stop="seeAll(item,false)" v-if="item.extend" style="color:#FF4691;font-size:26rpx;">收起</span>
										</div> -->
									</div>
								</div>
								<div class="div-type">
									<i-icon type="label" color="#FF4892" size="20" />
									<span class="typeDiary-type">{{item.commName}}</span>
								</div>
								<div class="div-hos">
									<i-row span="24">
										<i-col span="20">
											<div class="div-hos-left">
												<img src="http://img.meiduduo.com/images/index/bye_icon.png" alt=""> 
												{{item.commName}}    {{item.organName}}
											</div>
										</i-col>
										<i-col span="4">
											<div class="typeDiary-price">￥{{item.rulePrice}}</div>
										</i-col>
									</i-row>
								</div>
								<div class="typeDiary-bottom">
									<i-row>
										<i-col span="12" style="width:50%;">
											<!-- <i-icon type="like" size="14" style="text-align: center;" />
											<span>1320</span> -->
										</i-col>
										<div class="content-body" >
											<i-col span="8" style="text-align:right">
												<i-icon type="browse" size="14" />
												<span>{{item.readNum}}</span>
											</i-col>
											<i-col span="8" style="text-align:right">
												<i-icon type="message" size="14" style="text-align: center;" />
												<span>{{item.commentNum}}</span>
											</i-col>
											<i-col span="8" style="text-align:right" >
												<!-- :class="{active:item.isThumbsUp}" -->
												<i-icon type="praise" class="praisebtn"  @click="praise(item)" v-if="!item.isThumbsUp"  size="14" style="text-align: center;" />
												<i-icon type="praise" class="praisebtn active"  @click="praise(item)"  v-if="item.isThumbsUp" size="14" style="text-align: center;" />
												<span  @click="praise(item)">{{item.fabulousNum}}</span>
											</i-col>
										</div>
									</i-row>
								</div>
							</div>
						</div>
					</div>
				  </div>

			   <!-- </view> -->
				
		    <!-- </i-sticky-item>
		</i-sticky> -->
				


	</div>
</template>

<script>
   import wxParse from 'mpvue-wxparse'

	export default {

		data() {
			return {
               tab:['推荐','鼻部','眼部','自体脂肪','面部','胸部','瘦身','瘦身','瘦身','瘦身','瘦身','瘦身'],
               currentTab:0,
			   diaryTypes:[],
			   diaryContent:[],
			   scrollTop:0,
			   top:900,
			   fixed:false,
			   custId: this.$store.state.userInfo.custId,
			}
		},
        props:{
          title:''
		},
		components:{
          wxParse
		},
		mounted() {
		//    console.log(wx.createSelectorQuery().select('.top'))
		   wx.createSelectorQuery().select('.top').boundingClientRect((res)=>{
				this.top = res.top - 40
			}).exec()
		},
		onPageScroll(event){
				// console.log(event.scrollTop);
				// console.log(this.top);
				this.scrollTop = event.scrollTop
				if(event.scrollTop>this.top){
					this.fixed = true
					this.$emit('changeFixed',true)
				}else{
					this.fixed = false
					this.$emit('changeFixed',false)
				}
		},
		methods: {
			seeAll(item,flag){
				item.extend = flag
			},
			todiary(item){
				// this.$router.push('/pages/info/diary_info')
				this.$router.push({
					path:'/pages/info/diary',
					query:{
						id:item.id,
						type:5
					}
				})
			},
			tabClick(code,index){
				this.currentTab = index
				this.getDiaryList(code,index)
			},
			getDiaryTypes(){
               this.$http.post('/common/dictList',{ masterCode:'diary_type'}).then(res=>{
					console.log(res);
					if(res.code == '1'){
						let ret = []
						res.data.forEach(element => {
							ret.push({
								name:element.label,
								code:element.detailCode
							})
							this.diaryContent.push([])
						});
						this.diaryTypes = ret
						this.getDiaryList(ret[0].code,0)
					}else{
						wx.showToast({
							title: '获取失败',
							icon: 'none'
						})
					}
				})
			},
			getDiaryList(code,index){
				if(this.diaryContent[index].length>0){
                    return
				}
				let ret = this.diaryContent
				
				this.currentTab = index
				let options = {
					isRecommend:1,
					// organId:0, 
					custId:this.$store.state.userInfo.custId,
					diaryType:code
				}
				console.log(options);
				
				this.$http.post('/diaryBook/list4PageForDiaryBook',options).then(res=>{
					console.log(res);
					if(res.code == '1'){
						this.diaryContent[index] = res.data.data 
						this.diaryContent.splice(index, 1, res.data.data)
						// this.diaryContent.splice(index, 1, res.data.data)
					}else{
						wx.showToast({
							title: '获取失败',
							icon: 'none'
						})
					}
				})
			},
			praise(item){
				// console.log(this.$store.state.userInfo.custId)
				let state =  item.isThumbsUp ? -1 : 1
				let options = {
					recordId:item.id,
                    custId:this.$store.state.userInfo.custId,
                    recordType:'7',
                    crType:'1',
                    state
				}
				console.log(options);
				
                this.$http.post('/customerRecord/save',options).then(res=>{
                    // console.log(res);
                    if(res.code == 1){
                        if(state == 1){
							item.isThumbsUp = 1
							item.fabulousNum += 1
                        }else{ 
							item.isThumbsUp = 0
							item.fabulousNum -= 1
						}
                    }else{
                        wx.showToast({
                            title: '操作失败',
                            icon: 'none'
                        })
                    }
				})
			}
		},
		onLoad(){
		   this.getDiaryTypes()
				// console.log(this.$store.state.userInfo.custId)		   
		}

	};
</script>


