<template>
	<div>
		<div class="re-doctor">
			<ul>
				<div v-for="(item, index) in doctor" :key="index" class="itemdiv">
					<span>
						<img :src="item.icon">
					</span>
					<p class="name">{{item.nickName}}</p>
					<p class="title">{{item.cheng}}</p>
					<span class="attention">+关注</span>
				</div>

			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["doctor"],
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
	.attention {
		/* font-size: .26rem;
	padding: 0.1rem  0.2rem;
	background-color: #FF4691;
	text-align: center;
	color:#FFFFFF */
		display: inline-block;
		background: #FF4691;
		color: #fff;
		font-size: .2rem;
		border-radius: .2rem;
		padding: .05rem .2rem;
	}

	.my-follow {
		font-size: .26rem;
		color: #333;
		line-height: .6rem;
	}

	.re-doctor {
		padding: .2rem;
		background: #fff;
		margin-bottom: 0.2rem;
	}

	.re-doctor ul {
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
	}

	.itemdiv {
		text-align: center;
		/* margin-right: .34rem; */
		width: 25%;
	}

	.re-doctor ul div span img {
		width: 1.14rem;
		height: 1.14rem;
		display: inline-block;
		border-radius: 50%;
	}

	.name {
		font-size: .26rem;
		color: #333;
		line-height: .5rem;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.name1 {
		line-height: .5rem;
		color: #999;
	}

	.title {
		font-size: .18rem;
		color: #999;
		margin-bottom: .1rem;
	}
</style>
