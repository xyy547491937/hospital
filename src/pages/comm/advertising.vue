<template>
    <div style="background-color: #FFFFFF;" >
		<!-- <div>  
        <i-row >
            <i-col span="24" class="index-advertising"> <img :src="src"  ></i-col>
        </i-row>
		</div> -->
        <div class="swiper-box">
            <!-- indicator-color="#fff" indicator-active-color="#fff" -->
            <swiper class="swiper" :indicator-dots="indicatorDots"
                :autoplay="autoplay" :interval="interval" :circular="circular" :duration="duration" :current="currentSwiper" @change="swiperChange" >
                <block v-for="(item,index) in imgUrls" :key="index">
                    <swiper-item>
                        <img :src="item" class="slide-image" alt="">
                        <!-- <image  :src="item" class="slide-image" /> -->
                    </swiper-item>
                </block>
            </swiper>
            <!--重置小圆点的样式  -->
            <view class="dots">  
                <block v-for=" ( item,index ) in imgUrls" :key="index">  
                    <view class="dot" :class="index == currentSwiper ? ' active' : ''"></view>  
                </block>  
            </view> 
        </div>
    </div>
</template>

<script>
    export default {
		props:["src"],
        data() {
            return{
                currentSwiper:0,
                indicatorDots:false,
                autoplay:false,
                interval:2000,
                duration:300,
                circular:true,
                imgUrls:[
                  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png',
                  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png',
                  'http://fs.meiduduo.com/oa/OA/other/1530237590667.png'
                ],
                adList:[]
            }
        },
        mounted() {

        },
        methods: {
            swiperChange(e){
                this.currentSwiper = e.target.current
            },
            getADList(pageNum,pageSize){
                let options = {
                    pageNum,
                    pageSize
                }
                this.$http.post('/advertRecord/list4Page',{...options}).then(res=>{
                    // console.log(res);
                    if(res.code == '1'){
                        this.adList = res.data.data
                    }else{
                        wx.showToast({
                            title: '获取失败',
                            icon: 'none'
                        })
                    }
                })
            },
            swiperChange(e) {
                this.currentSwiper = e.target.current;
            }
					
        },
        onLoad(){
            this.getADList(1,15)
        }
   
  } 
</script>

<style scoped>
.swiper-box {
  position: relative;
}
.swiper,
.slide-image {
  width: 100%;
  height: 360rpx;
}
.swiper .wx-swiper-dots::before {
  color: #fff;
}
.swiper .wx-swiper-dot-active::before {
  width: 60rpx;
  color: red;
}

/*用来包裹所有的小圆点  */
.dots {
  /* width: 156rpx; */
  height: 36rpx;
  display: flex;
  flex-direction: row;
  position: absolute;
  right: 40rpx;
  bottom: 16rpx;
}
/*未选中时的小圆点样式 */
.dot {
  width: 12rpx;
  height: 12rpx;
  border-radius: 50%;
  margin-right: 26rpx;
  background-color: white;
}
/*选中以后的小圆点样式  */
.active {
  width: 24rpx;
  height: 12rpx;
  border-radius: 5rpx;
  /* background-color: coral; */
}

.index-advertising {
  height: 2rem;
}
.index-advertising img {
  height: 2rem;
  width: 93%;
  margin: 0.3rem 0.3rem 0.3rem 0.3rem;
}
</style>
