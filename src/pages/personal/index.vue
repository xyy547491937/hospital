<template>
	<div class="mine">
		<div class="banner">
			<div class="person">
				<span>
					<!-- <img src="http://img.meiduduo.com/images/mine/user2.png"> -->
					<!-- <img :src="info.icon? info.icon:'http://img.meiduduo.com/images/mine/user2.png'"> -->
					<img :src="avator? avator:'http://img.meiduduo.com/images/mine/user2.png'">
				</span>
				<p>{{info.nickName}}</p>
				<div>{{info.provinceName}} {{info.cityName}}</div>

			</div>
			<!-- <div class="guanzhu">
				<span id="" class="wei">
						+关注
					</span>
			</div> -->
			<!--<div class="guanzhu">
					<span id="" class="yi">
						已关注
					</span>
				</div>-->
		</div>
		<div class="infor">
			<tab :titledata="nav" @clickactive="clickactive"></tab>
		</div>
		<div class="content">
			<div class="content-item" v-if="onclick==0">
				<div class="box-title">共{{diaryBookNum}}个日记本，{{total}}篇日记</div>
				<div class="content-diary">
					<div class="content-diary-item" @click="todiary(item.id)" v-for="(item,index) in disayList" :key="index">
						<div class="diary-title">
							<div class="diary-title-icon"><img :src="info.avator" alt=""></div>
							<div class="diary-title-name">
								<p>{{item.authorName}}</p>
								<p class="diary-title-name-data">{{item.createDate}}</p>
							</div>
						</div>
						<div class="diary-page">
							<!-- <p>开内角第33天</p> -->
							<div class="diary-page-mg">
								<ul style="padding:6rpx 0">
									<li><img :src="item.afterPhoto" class="typeDiary-before-img"></li>
									<!-- <li><img src="http://fs.meiduduo.com/oa/OA/other/1531463285241.jpg" class="typeDiary-before-img"></li>
									<li><img src="http://fs.meiduduo.com/oa/OA/other/1531463260456.jpg" class="typeDiary-before-img"></li>
									<li><img src="http://fs.meiduduo.com/oa/OA/other/1531463285241.jpg" class="typeDiary-before-img"></li> -->
								</ul>
							</div>

							<p class="diary-page-p">
								<!-- 就算是你长着一张很普通的脸，通过后天的改变也可以的，我鼻子天生就不好看，大概就怪那遗传了吧！ 所以如今我才会去选择去隆鼻，做了之后脸很立体，也很自然，以后再也不用担心别人用异样的眼光来看我，刚做完手术的时候， 难免会很难看，不过后面的等待我觉得都是值得的。现在不管是从哪个角度拍照都特别好看，很满意，很喜欢，很感谢医生。 -->
                                <!-- <wxParse :content="item.content" noData="" ></wxParse> -->
								<rich-text :nodes="item.content" bindtap="tap"></rich-text>
							</p>
							<div class="content-diary-footer">
								<p id="">
								{{item.readNum}}人已看过
							</p>
							<p class="diary-footer-r">
							<i-icon type="message" size="16" style="text-align: center;" />
							<span>{{item.fabulousNum}}</span>
							</p>
							<p class="diary-footer-r">
								<i-icon type="praise" size="16" style="text-align: center;" />
							<span>{{item.commentNum}}</span>
							</p></div>
						</div>
					</div>
				</div>
			</div>
			<div class="" v-if="onclick==1">
				<div class="content-item">
					<div class="box-title">基本资料</div>
					<div class="box-ul">
						<ul>
							<li>
								<span id="">性别</span>
								{{info.sex=='M' ? '男' :'女'}}
							</li>
							<li>
								<span id="">年龄</span>
								 {{info.old}}
							</li>
							<li>
								<span id="">地区</span>
								{{info.cityName}}
							</li>
							<!-- <li>
								<span id="">简介</span>
								{{info.sex=='M' ? '男' :'女'}}
							</li> -->
						</ul>
					</div>
				</div>
				<div class="content-item">
					<div class="box-title-1">做过的项目</div>
					<div class="box-p">
						<span id="" v-for="(item,index) in servicedItems" :key="index">{{item.commodityName}}</span>
						<!-- <span id="">眼部整形</span> -->
					</div>
				</div>
				<!-- <div class="content-item">
					<div class="box-title-1">想做的项目</div>
					<div class="box-p"><span id="">
					眼部整形
				</span>
						<span id="">
					眼部整形
				</span></div>
				</div> -->
			</div>
		</div>

	<!-- </div> -->

	</div>
</template>

<script>
	import tab from "../comm/tab.vue"
    // import wxParse from 'mpvue-wxparse'

	export default {
		components: {
			tab,
			// wxParse
		},
		data() {
			return {
				nav: [{
						title: "日记",
						badgeNum: 0,
					},
					{
						title: "资料",
						badgeNum: 1,
					}
				],
				onclick: 0,
				custId:2,
				disayList:[],
				total:0,
				info:{
					avator:'http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg'
				},
				avator:'',
				pageNum:1,
				nextPage:0,
				diaryBookNum:0

			}
		},
		methods: {
			todiary(id){
               this.$router.push({
				   path:'/pages/info/diary',
				   query:{
					   id,
					   type:5
				   }
			   })
			},
			clickactive(out) {
				this.onclick = out.badgeNum
			},
			getAllDiary(pageNum,flag){
				this.$http.post('/diary/list4Page',{
					author:this.custId,
					// userId:720
					pageNum,
					pageSize:15
				}).then(res=>{
					console.log(res);
					if(res.code == '1'){
						this.total = res.data.total
						this.nextPage = res.nextPage
						if(flag){
							this.disayList = res.data.data
						}else{
							this.disayList.concat(res.data.data)
						}

					}else{
						wx.showToast({
							title: '获取失败',
							icon: 'none'
						})
					}
				})
			},
			getInfo(){
				this.$http.post('/customer/queryOneByCondition',{
					id:this.custId,
					userId:''
				}).then(res=>{
					console.log(res);

					if(res.code == '1'){
						this.info = res.data
						let birthYear =  this.info.birthday.substr(0,4)
						let nowYear = new Date().getFullYear()
						let old = parseInt(nowYear) - parseInt(birthYear)
						this.info.old = old
						this.info.nickName = this.$store.state.userInfo.nickName ?this.$store.state.userInfo.nickName:''
					}else{
						wx.showToast({
							title: '获取失败',
							icon: 'none'
						})
					}
				})
			},
			getServicedItems(pageNum){
				this.$http.post('/order/list4Page',{
							custId:this.custId,
							osId:7,
							pageNum,
							pageSize:15
						}
					).then(res=>{
						console.log(res);
						if(res.code == 1){
							this.servicedItems = res.data.data
						}
					})
			}
		},
		onReachBottom(){
			// if(this.disayList.length< this.pageNum * 15){
			// 	return
			// }
			if(!this.nextPage){
                return
			}
			this.getAllDiary(this.nextPage,false)
		},
		onLoad(){
			this.custId = this.$store.state.userInfo.custId
			this.getAllDiary(this.pageNum,true)
			this.getInfo()
			this.avator = this.$store.state.userInfo.avatarUrl ?this.$store.state.userInfo.avatarUrl:''
			this.info.nickName = this.$store.state.userInfo.nickName ?this.$store.state.userInfo.nickName:''
		}
	}
</script>

<style>
	.infor .list-nav{
		position:static;
	}

	.collect-kuang {
		margin-top: 1.5rem;
	}

	.mine {
		background-color: #F1F1F1;
	}

	.guanzhu {
		position: absolute;
		right: 0.2rem;
		bottom: 1rem;
	}

	.guanzhu .yi {
		background: #999;
		color: #fff;
		font-size: 0.26rem;
		padding: 0.1rem 0.3rem;
		border-radius: 0.3rem;
	}

	.guanzhu .wei {
		background: #FC4396;
		color: #fff;
		font-size: 0.26rem;
		padding: 0.1rem 0.3rem;
		border-radius: 0.3rem;
	}

	.banner {
		position: relative;
		width: 100%;
		height: 4.1rem;
		background: url("http://img.meiduduo.com/images/mine/banner.png") no-repeat;
		background-size: 100% 100%;
		position: relative;
	}

	.person {
		position: absolute;
		top: .5rem;
		left: 0;
		right: 0;
		margin: 0 auto;
		text-align: center;
	}

	.person>span {
		height: 1.8rem;
		width: 1.8rem;
		border-radius: 50%;
		border: 2px solid #fff;
		display: inline-block;
		margin-bottom: .2rem;
	}

	.person img {
		height: 1.8rem;
		width: 1.8rem;
		border-radius: 50%;
	}

	.person p {
		font-weight: bolder;
		color: #333;
		font-size: .34rem;
	}

	.person>div {
		color: #666;
		font-size: .28rem;
		line-height: .6rem;
	}

	.content {
		width: 100%;
	}

	.content-item {
		background: #fff;
		padding: .3rem .3rem;
		margin-bottom: .2rem;
	}

	.box-title {
		color: #999999;
		font-size: .26rem;
		padding-bottom: 0.3rem;
		margin-bottom: .2rem;
		border-bottom: 1px solid #EEEEEE;
	}

	.box-title-1 {
		color: #999999;
		font-size: .26rem;
	}

	.box-ul ul {
		color: #333;
		font-size: .3rem;
		line-height: 2;
	}

	.box-ul ul li span {
		color: #999999;
		margin-right: 0.4rem;
	}

	.box-p span {
		background: #FFD2EE;
		color: #FF4691;
		font-size: .2rem;
		padding: 0.1rem 0.2rem;
		border-radius: 0.2rem;
		margin-right: 0.1rem;
	}
	/*日记样式*/

	.diary-title div {
		display: inline-block;
	}

	.content-diary-item {
		margin-bottom: 0.4rem;
	}

	.diary-title-icon {
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.2rem;
	}

	.diary-title-icon img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.diary-title-name {
		color: #333;
		font-size: .28rem;
	}

	.diary-title-name .diary-title-name-data {
		font-size: 0.2rem;
		color: #999;
	}

	.diary-page {
		padding: -0.2rem 0;
	}

	.diary-page p {
		font-size: 0.26rem;
		color: #333;
		margin: 0.1rem 0;
	}

	.diary-page .diary-page-p {
		color: #666;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		margin-bottom: 0.2rem;
	}

	.diary-page img {
		width: 100%;
		height: 100%;
		border-radius: 0.1rem;
	}

	.diary-page .diary-page-mg {
		background: #fff;
		line-height: .87rem;
		margin-bottom: .17rem;
		position: relative;
		/* top: 1.27rem; */
		z-index: 5;
		width: 100%;
		border-top: solid #EEEEEE 1px;
	}

	.diary-page .diary-page-mg ul {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		-webkit-justify-content: center;
	}

	.diary-page .diary-page-mg ul li {
		height: 2.5rem;
		width: 33.33%;
		padding-right: 0.2rem;
	}
	.content-diary-footer p{
		display: inline-block;
		font-size: 0.2rem;
		color: #999;
	}
	.diary-page .diary-footer-r{
		float: right;
		margin-left: 0.2rem;
	}
</style>
