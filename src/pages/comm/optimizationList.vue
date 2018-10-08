<template>
    <div class="list-kuang" >
       <div class="box">
       		<div class="list-title">
       				———— 优选榜单 ————
       		</div>
       		<div class="list-box">
       				<ul>
						<li v-for="(item, index) in list" :key="index">
								<img :src="item" >
						</li>
       				</ul>
       		</div>
       </div>
    </div>
</template>

<script>
    export default {

        data() {
			return{
				list:["http://img.meiduduo.com/images/optimizationList/bnsbg.png", "http://img.meiduduo.com/images/optimizationList/rdsbg.png", "http://img.meiduduo.com/images/optimizationList/sypbg.png"],
			}
        },

        mounted() {

        },
        methods: {

        },

    };
</script>

<style scoped>

	.box{
	    margin-bottom: .17rem;
	    background: #fff;
	}
	.list-title{
	    text-align: center;
	    font-size: .26rem;
	    color: #555555;
	    font-weight: 500;
	    padding-top: .2rem;
	}
	.list-box ul{
	    display: -webkit-box;
	    overflow-x: scroll;
	    -webkit-overflow-scrolling:touch;
	    padding: .2rem 0;
	}
	.list-box ul li{
	    padding: .2rem;
	}
	.list-box ul li img{
	    height: 1.36rem;
	    width: 2.6rem;
	}
.list-kuang{
	background-color: #FFFFFF;

}
.list-title{
	width:100%;
	text-align: center;
	font-size: 0.3rem;
}
</style>
