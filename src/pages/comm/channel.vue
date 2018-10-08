<template>
    <div>
		<div class="page-yimei">
			<div class="channdl-label">{{title}}</div>
			<div class="article-list">
				<slot>
						
				</slot>
				
			</div>
		</div>
       
    </div>
</template>

<script>
		
    export default {
				props:["title"],
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
	.page-yimei{
		position: relative;
		margin-top: 0.52rem;
		
	}
    .channdl-label {
        background-color: #FF4691;
        width: 1.1rem;
        color: #FFFFFF;
        font-size: 0.3rem;
        padding: 0.1rem 0.1rem  0.1rem  0.2rem   ;
		border-radius:0 200rpx 200rpx 0;
		position:absolute;
		top: -0.4rem;
		font-size: 0.3rem;
    }
	.article-list{
		background-color: #FFFFFF; 
		padding-top: 0.4rem;
		padding-bottom: 0.2rem;
	}
</style>
