<template>
	<div class="basic">
		<hr style="height:0.1rem;border:none;border-top:0.1rem solid #EEEEEE;" />
		<div style="background-color: #FFFFFF;">
		<div class="item" >
			<div v-if="stores.length == 0">暂无</div>
			<div class="item-top" @click="jump(store.organId)" v-for="(store,index) in stores" :key="index">
				<div class="item-img">
					<!-- <img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" > -->
					<img :src="store.logo" >
				</div>
				<div class="info">
					<div class="info-title">{{store.organName}}</div>
					<div class="info-addr">{{store.address}}</div>
					<div class="balance">
						<div class="balance-title">可用余额</div>
						<div class="balance-money">￥{{store.balance + store.rechargeMoney }}</div>
						<div class="info-money">
							<div class="info-money-title">剩余余额：￥{{store.balance}}</div>
							<div class="info-money-two">增值金：￥{{store.rechargeMoney}}</div>
						</div>
					</div>
					<div class="info-bottom">服务项目：<span>{{store.chineseName}}</span></div>
				</div>
			</div>
			<!-- <div class="item-top">
				<div class="item-img">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" >
				</div>
				<div class="info">
					<div class="info-title">石家庄贵美人医疗美容医院</div>
					<div class="info-addr">石家庄新华区</div>
					<div class="balance">
						<div class="balance-title">可用余额</div>
						<div class="balance-money">￥2000</div>
						<div class="info-money">
							<div class="info-money-title">剩余余额：￥6000</div>
							<div class="info-money-two">增值金：￥2000</div>
						</div>
					</div>
					<div class="info-bottom">服务项目：<span>脱毛</span></div>
				</div>
			</div> -->
					
		</div>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
			  custId:1,	
			  peopleId:720,
              stores:[]
			}
		},

		onLoad(){
			this.getList(0)
		},
		methods: {
			jump(organId){
				this.$router.push({path:"/pages/mineItem/storeDetail?organId="+organId})
			},
            getList(pageNum){
				this.$http.post('/serviceEvaluation/getArrivedShop',{
					   peopleId:this.peopleId,
					   pageNum,
					   pageSize:15,
				   }
				).then(res=>{
					console.log(res);
					if(res.code == 1){
						this.stores = res.data.data

					}
				})
			}
		},

	};
</script>

<style scoped>
	.info-bottom{
		font-size: 0.24rem;
		color:#BABABA;
		margin:0.1rem 0;
		
	}
	.info-bottom span{
		color: #333;
	}
	.info-money{
		font-size: 0.24rem;
		background-color: #EEEEEE;
		margin-top: 0.05rem;
		padding: 0.1rem 0.2rem;
	}
	.info-money-title{
		display: inline-block;
		margin-right: 0.2rem;
	}
	.info-money-two{
		display: inline-block;
	}
	.balance-money{
		display: inline-block;
		font-size: 0.24rem;
		color:#FF4691;
		margin-left: 0.2rem;
	}
	.balance-title{
		font-size: 0.24rem;
		color:#C0C0C0;
		display: inline-block;
		
	}
	.info{
		 margin-left: 0.1rem;
	}
	.info-title{
		font-size: 0.32rem;
		font-weight: bold;
		margin: 0.1rem 0 0.2rem 0;
	}
	.info-addr{
		font-size: 0.24rem;
	}
	.basic{
		background-color: #F1F1F1;
		height: 100%;
		width:100%;
		
	}
	

	.item {
		width: 94%;
		margin-left: 3%;
		
	}

	.item-top {
		display: flex;
		display: -webkit-flex;
		/* padding: 0.17rem 0.17rem 0.17rem 0; */
		border-bottom: 1px solid #EEEEEE;
	}
    .item-top:last-child{
		border: none;
	}
	.item .item-img {
		padding: 0.2rem  0.1rem 0.1rem 0.1rem;
		width: 2rem;
		height: 2rem;
		border-radius: .2rem;
	}

	.item .item-img img {
		height: 100%;
		width: 100%;
		border-radius: 50%;
	}

	


	

	

</style>
