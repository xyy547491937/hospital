<template>
	<!-- <div>大大大</div> -->
	<div>
		<div class="choice">
			<div :class="{active:selected==index}" v-for="(item,index) in choice" :key="index" @click="changeIndex(index)">{{item.name}}
				<span></span>

			</div>
		</div>

		<div class="projectList-shade" v-if="itemshow"> 
				<div style="position: relative;height: 100%;">
					<div class="projectList-sort" >
						<div @click="itemclick">
							<div class="projectList-sort-item" >
								<div>销量最多</div>
							</div>
							<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
						</div>
						<div @click="itemclick">
							<div class="projectList-sort-item">
								<div>销量最多</div>
							</div>
							<hr style="height:1px;border:none;border-top:1px solid #EEEEEE;" />
						</div>
					</div>
				</div> 
			
		</div>
		<slot></slot>
		
	</div>
</template>

<script>

	export default {

		data() {
			return {
				choice: [{
						name: "石家庄"
					},
					{
						name: "选择项目"
					},
					{
						name: "智能排序"
					},
					{
						name: "价格"
					},
				],
				selected: null,
				itemshow:false,




			}
		},

		mounted() {

		},
		methods: {

			changeIndex(index) {
				if (this.selected === index) {
					this.selected = null
					this.itemshow=false
				} else if (this.selected !== index) {
					this.selected = index
					this.itemshow=true
				}
				this.item = "item" + index
				// this.$router.push({ path:'/pages/jump' })


			},
			itemclick(){
				this.itemshow=false
			}

		},

	};
</script>

<style scoped>
	.projectList-sort {
		background-color: #FFFFFF;
		text-align: center;
		font-size: 0.3rem;
		z-index: 1000;
		position:absolute;
		/* top: -0.1rem; */
		width: 100%;
		
		
	}
	.projectList-sort-item{
		padding: 0.2rem 0;
		
	}
	.projectList-shade {
		width: 100%;
		height: 100%;
		position: absolute;
		/* top: 20%; */
		background-color: #FFFFFF;
		background: rgba(0, 0, 0, 0.5);
		text-align: center;
		z-index: 1000;
	}

	.choice {
		display: flex;
		justify-content: space-between;
		background: #fff;
		height: .6rem;
		width: 100%;
		font-size: .25rem;
		padding: .09rem 0 0 0;
		margin-bottom: .05rem;
		/* position: fixed; */
		z-index: 5;
		/*  display: flex;
        justify-content: space-between;
        height: .6rem;
        width: 100%;
        font-size: .25rem;
        background: #fff;
        padding: .09rem 0;
        margin-bottom: .17rem;
        position: fixed;
        z-index: 5; */
	}

	.choice div {
		box-sizing: border-box;
		height: .43rem;
		line-height: .43rem;
		width: 50%;
		text-align: center;
		border-right: 1px solid #DDDDDD;
	}

	.choice div span {
		padding: .15rem;
		display: inline-block;
		background: url("http://img.meiduduo.com/images/goodImg/tab_arrow1.png") no-repeat center .15rem;
		background-size: .15rem;
	}

	.choice div.active span {
		background: url("http://img.meiduduo.com/images/goodImg/tal_arrow2.png") no-repeat center .15rem;
		background-size: .15rem;
	}

	.choice div.active {
		color: #FC4396;
	}

	.choice div:last-child {
		border: none
	}
</style>
