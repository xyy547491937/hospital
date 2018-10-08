
<style>
/* 拼团  */
.fl{
	float: left;
	width: 50%;
	box-sizing: border-box;
}
.pintuan{
   padding:36rpx 30rpx;
  overflow: hidden;
  margin-bottom: 18rpx;
  background: url('http://img.meiduduo.com/images/info/pinback.png') no-repeat;
}
.pintuan .tuan img{
   width: 324rpx;
   height: 266rpx;
}
.pintuan .sudi{
	height: 266rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.pintuan .sudi img{
	width: 328rpx;
	height: 112rpx;
}
 
</style>

<template>
 <div>
    <div class="pintuan">
        <div @click="jump" class="tuan fl">
            <img @click="toPintuan" src="http://img.meiduduo.com/images/info/pintuan.png" alt="">
            </div>
            <div class="sudi fl">
                <img src="http://img.meiduduo.com/images/info/sudi1.png" alt="">
                <img  src="http://img.meiduduo.com/images/info/sudi2.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {
         
     }
   },
   props:{
        title:''
   },
   components: {

   },
   methods:{
       toPintuan(){
           this.$router.push({
               path:'/pages/shop/fight_group'
           })
       }
   }
 }
</script>

