<template>
    <div class="address-kuang">
			<hr style="height:0.1rem;border:none;border-top:0.1rem solid #F1F1F1;" />
			<div class="address-content" @click="jump">
				<div class="address-content-kuang">
					
					<div class="address-name">
							<div>莉莉   <span>13654215421</span></div>
							
					</div>
					<div class="address-address">萨达多久撒大口径安徽的科技和阿卡金黄色的空间安徽肯定会爱空间号地块安徽肯定会阿克苏较好的卡号看看的华会计师</div>
					</div>
					<div class="operation"><span>编辑</span><span>删除</span></div>
			</div>
			<div class="address-content">
				<div class="address-content-kuang">
					
					<div class="address-name">
							<div>莉莉   <span>13654215421</span></div>
							
					</div>
					<div class="address-address">萨达多久撒大口径安徽的科技和阿卡金黄色的空间安徽肯定会爱空间号地块安徽肯定会阿克苏较好的卡号看看的华会计师</div>
					</div>
					<div class="operation"><span>编辑</span><span>删除</span></div>
			</div>
    </div>
</template>

<script>
    export default {
        data() {
					return{
						
						
						
					}
        },

        mounted() {

        },
        methods: {
					jump(){
						this.$router.push({path:"/pages/mineItem/addressDetails"})
					},
        },

    };
</script>

<style scoped>
	.operation{
		font-size: 0.26rem;
		text-align: right;
		width: 94%;
		margin-left: 3%;
		padding: 0.1rem 0;
		color:#737373;
	}
	.operation span:first-child{
			padding-right: 0.3rem;
	}
	.operation span:last-child{
		
	}
	.address-address{
		font-size: 0.24rem;
		color:#7E7E7E;
		padding: 0.2rem 0;
		line-height:0.4rem;
	}
.address-kuang{
	background-color: #F1F1F1;
	height: 100%;
	width:100%;
	
}
.address-content{
	background-color: #FFFFFF;
	margin-top: 0.1rem;
	
}
.address-content-kuang{
	width:94%;
	margin-left: 3%;
	border-bottom:solid #EEEEEE 1px;
}
.address-name{
	font-size: 0.28rem;
	font-weight: bold;
	padding-top: 0.2rem;

}
.address-name span{
	padding-left: 0.4rem;

}
</style>
