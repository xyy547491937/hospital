<template>
	<div style="background-color: #F1F1F1;height: 100%;width:100%;" class="signa-box">
		<tab :titledata="titledata" @clickactive="change"></tab>
		<div>&nbsp;</div>
		<div class="sign-list">
			<div class="list-item" style="background-color: #FFFFFF;" @click="signRoute(item)" v-for="(item,index) in list" :key="index">
				<div class="sign-kuang">
					<div class="sign-title">
						<img :src="item.logo"> {{item.organName}}
					</div>
					<div class="conten-kuang">
						<i-row>
							<i-col span="20"><div class="sign-middle-left">{{item.documentName}}</div></i-col>
							<i-col span="4"><div class="sign-middle-right">{{item.isSignature==1?'待签字':'已签字'}}</div></i-col>
							<!-- <i-col span="4"><div class="index-search">搜索</div> </i-col> -->
						</i-row>
						<i-row><div class="sign-content-title">隆胸手术</div></i-row>
						<i-row><div class="sign-content">可能出现的危险：填充物可能破裂、渗漏或缩小、感染， 填充物周围的结疤组织变硬，乳房变得僵硬、疼痛。</div></i-row>
					</div>
					<i-row>
						<i-col span="22"><div class="sign-bottom"> <span>刘卓达 副主任医师 </span></div></i-col>
						<i-col span="2"><i-icon type="enter" /></i-col>
					</i-row>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import tab from '../comm/tab.vue'
	export default {
		components: {
			tab
		},
		data() {
			return{
				titledata:[{
						title: "待签字",
						isSignature: '1',
					},
					{
						title: "已签字",
						isSignature: '2',
					},
					{
						title: "全部",
						isSignature: '',
					}
				],
				params:{
					isSignature:1
				},
				list:[]
				
			}
		},
		computed:{
			user(){
				return this.$store.state.userInfo
			}
		},
		mounted() {
			this.getData()
		},
		methods: {
			getData(){
				this.params['peopleId'] = this.user.peopleId || 781
				// this.params['peopleId'] = 781
				this.$http.post('/serviceEvaluation/getSignList',this.params)
				.then( res => {
					this.list = res.data.data
				})	
			},
			signRoute (item) {
				// this.changeJump("/pages/others/signConfirm")
				this.$router.push({path:"/pages/others/signConfirm",query:{info:JSON.stringify(item)}})
			},
			change(obj){
				this.params.isSignature = obj.isSignature
				this.getData()
			}
		}
	};
</script>

<style scoped>
	.signa-box{
		height: 100%;
		overflow: auto;
	}
	.sign-kuang {
		width: 94%;
		margin-left: 3%;
	}

	.sign-list {
		margin-top: 0.5rem;

	}

	.sign-title {
		border-bottom: solid #EEEEEE 1px;
		font-size: .32rem;
		padding: 0.2rem 0 0.1rem 0;
		font-weight: 900;
	}

	.sign-title img {
		width: 0.62rem;
		height: 0.66rem;
		vertical-align: middle;
		margin-right: 0.1rem;
	}
	.sign-middle-left{
		margin-left: 0.72rem;
		font-size: 0.28rem;
		font-weight: 600;
	}
	.sign-middle-right{
		font-size: 0.24rem;
		text-align: right;
		color:#FF4691;
	}
	.conten-kuang{
		margin-top: 0.2rem;
		border-bottom: solid #EEEEEE 1px;
	}
	.sign-content-title{
		margin-left: 0.72rem;
		font-size: 0.26rem;
		padding: 0.2rem 0 0.1rem 0;
	}
	.sign-content{
		margin-left: 0.72rem;
		font-size: 0.24rem;
		color:#BDBDBD;
		margin-bottom: 0.2rem;
	}
	.sign-bottom{
		font-size: 0.24rem;
		color: #BEBEBE;
		padding: 0.15rem 0 0.15rem 0.72rem ;
	}
	.sign-bottom span {
		color: #333;
	}
	.list-item{
		margin-bottom: .2rem;
	}
	/* .sign-middle{
	width:100%;

	margin: 0.1rem 0;
}
.sign-middle-left{
	display: inline-block;
	width:80%;
	font-size: 0.28rem;
	font-weight: 600;

}
.sign-middle-right{
	display: inline-block;
	width:20%;
	text-align: right;
	font-size: 0.24rem;
	color:#FF4691;


}
.sign-content-title{
	font-size: 0.28rem;
}
.sign-content{
	font-size: 0.24rem;
	color:#EEEEEE
}
.contents{
	width:72%;
	padding-left:14%;
	margin: 0.1rem 0;

} */
</style>
