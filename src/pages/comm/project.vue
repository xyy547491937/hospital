<template>
	<div>
			<i-row>
				<!-- <i-col span="24" ><div class="project-title" ><div :style="{color:titleColor,fontSize:titlesize}" class="title-left">{{title}}</div> <div class="title-right" v-if="isshow">更多<i-icon type="enter" /></div></div></i-col> -->
				<i-col span="24">
					<slot>
					</slot>
				</i-col>
			</i-row>
	</div>
</template>

<script>
	export default {
	props:["title","titleColor","moreshow","titlesize"],
		data() {
			return {
				isshow:true,


			}
		},

		created() {
			if(this.moreshow=="false"){
				this.isshow=false
			}

		},
		methods: {

		},

	};
</script>

<style scoped>
.project-title{
	border-bottom: solid #F4F4F4 1px;
	width:96%;
	margin-left: 2%;
	font-size: 0.3rem;
	color:#42EBEB;
	padding: 0.15rem 0;
	margin-bottom: 0.1rem;
}
.title-left{
	width:70%;display: inline-block;
}
.title-right{
	width:30%;display: inline-block;
	text-align: right;
	color:#A9A9A9;
	font-size: 0.25rem;

}
</style>
