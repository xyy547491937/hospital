<template>
	<div class="details-kuang">
		<hr style="height:0.1rem;border:none;border-top:0.1rem solid #F1F1F1;" />
		<div class="details-kuang-color">
			<div class="list-one">
				<div>收货人：</div>
				<input type="text" placeholder="请输入收货人">
			</div>
		</div>
			<div class="details-kuang-color">
				<div class="list-one">
					<div>联系电话：</div>
					<input type="text" placeholder="联系人手机号">
				</div>
			</div>
			<div class="details-kuang-color">
				<div class="list-one">
					<div>详细地址：</div>
					<input type="text" placeholder="请输入详细地址">
				</div>
			</div>
		
		<div class="save-buttom">保存</div>

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

		},

	};
</script>

<style scoped>
	.save-buttom{
		 position:fixed; 
		 bottom:0.2rem;
		 background-color: #FF4691;
			color:#FFFFFF;
			width:94%;
			margin-left: 3%;
			text-align: center;
			padding: 0.2rem 0;
			border-radius: 0.1rem;
		 
	}
	.details-kuang {
		background-color: #F1F1F1;
		height: 100%;
		width: 100%;
	}

	.details-kuang-color {

		
		background-color: #FFFFFF;
		margin-bottom: 1px;
	}

	.list-one {

		height: 0.8rem;
		display: flex;
		align-items: center;
		font-size: 0.3rem;
		width: 94%;
		margin-left: 3%;
		margin-bottom: 1px;
	}

	.list-one input {
		display: inline-block;
		height: 0.8rem;
		margin-left: 0.2rem;
	}

	.list-one div {
		display: inline-block;
	}
</style>
