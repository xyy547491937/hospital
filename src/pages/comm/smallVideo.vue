<template>

	<div style="background-color: #FFFFFF;">
		<div class="smallVideo-kuang">

			<div style="z-index: 0;">
				<slot></slot>
			</div>
			<div>
				<span class="smallVideo-details">
					{{ data.content }}
				</span>
			</div>
			<div class="typeDiary-bottom">
				<i-row>
					<i-col span="12">
						<i-col span="4">
							<div class="typeDiary-img">
								<img :src="data.cover" alt="">
							</div>
						</i-col>
						<i-col span="20" class="typeDiary-name">
							<div style="margin-top: .1rem;">{{ data.nickName }}</div>
						</i-col>
					</i-col>
					<i-col span="4">
						<i-icon type="message" size="14" style="text-align: center;" />
						<span>{{ data.commentNum }}</span>
					</i-col>
					<i-col span="4">
						<i-icon type="praise" size="14" style="text-align: center;" />
						<span>{{ data.fabulousNum }}</span>
					</i-col>
					<i-col span="4">
						<i-icon type="like" size="14" style="text-align: center;" />
						<span>{{ data.favouriteNum }}</span>
					</i-col>
				</i-row>
			</div>
		</div>

	</div>

</template>

<script>
	export default {
		props: ['data'],
		data() {
			return {}
		},

		mounted() {

		},
		methods: {

		},

	};
</script>

<style scoped>
	.smallVideo-kuang {
		width: 94%;
		margin: auto;
		padding: 0.2rem 0;
	}
	.smallVideo-details {
		margin: .15rem;
		color: #666666;
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
	.typeDiary-bottom {
		margin: 0.2rem 0 0.1rem 0.2rem;
		font-size: 0.25rem;
		color: #ACACAC;
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
</style>
