<template>
 <div>
       <div class="news" style="margin-bottom:18rpx;padding:20rpx 36rpx">
            <img class="news-logo" src="http://img.meiduduo.com/images/info/news-logo.png" alt="">
            <div class="news-info">
                <swiper class="news-swiper" 
                    :autoplay="autoplay" :interval="interval" :duration="duration" :display-multiple-items="mutipleItems" :circular="circular" vertical="true"  >
                    <block v-for="(item,index) in newsList" :key="index">
                        <swiper-item style="height:50%!important;">
                            <!-- <image  :src="item" class="slide-image" /> -->
                            <div class="info-body" @click="clickToInfo(item.id)">
                                <span class="news-title">{{item.channelName}} • </span>
                                <span class="news-desc">{{item.title}}</span>   
                            </div>
                        </swiper-item>
                    </block>
                </swiper>
                <!-- <div class="info-body">
                    <span class="news-title">医美 • </span>
                    <span class="news-desc">2018第二届全球皮肤管理大会，已经来了 来了</span>   
                </div>
                <div class="info-body">
                    <span class="news-title">医美 • </span>
                    <span class="news-desc">2018第二届全球皮肤管理大会，已经来了 来了</span> 
                </div> -->
            </div>
        </div>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         autoplay:true,
         interval:4000,
         duration:500,
         circular:true,
         imgUrls:[1,1,1],
         newsList:[],
         mutipleItems:2
     }
   },
   props:{
       title:''
   },
   components: {

   },
   methods:{
      getNews(){
            this.$http.post('/info/getByAreaIdsAndIsRecommend').then(res=>{
                // console.log(res);
                if(res.code == '1'){
                    this.newsList = res.data
                    if(this.newsList.length==1){
                        this.mutipleItems = 1
                    }
                }else{
                    wx.showToast({
                        title: '获取失败',
                        icon: 'none'
                    })
                }
            }) 
      },
      clickToInfo(id){
            this.$router.push({
                path:'/pages/info/information',
                query:{
                    id:id,
                    type:2
                }
            })
            // this.$router.push('/pages/info/news_info?newsid='+id)
      }
   },
   onLoad(){
      this.getNews()
   }
 }
</script>

<style>
/* 资讯 */
.news{
	overflow: hidden;
	background: #fff;
	/* height: 55rpx;
	line-height: 55rpx; */
}
.news-logo{
	display: inline-block;
	width: 70rpx;
    height: 70rpx;
	background: #fff;
	float: left;
}
.news-swiper{
    height: 100%;
}
.news-info{
	float: left;
	height:70rpx;
    width:520rpx;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
}
.news-info .info-body{
   font-size: 22rpx;
   margin: 0 0 0 50rpx;
   width: 520rpx;
   overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.news-info .news-title{
   color: #FF4691;
}
.news-desc{
	color: #666;
}
 
</style>
