<template>
    <div class="discuess-box">
        <div class="discuess-item">
            <!-- 待评价界面 author xyy没写完 -->
            <div class="discuess-title flex-r">
                <p> <span> 胚豆订单号：</span> <span class="c"> 123456789</span></p>
                <p class="c"> 已使用</p>
             </div>
             <!--  图文信息 -->
             <div class="c">

             </div>
        </div>
        <!--  发表评论 产品评价 -->
         <div class="editor-discuess" v-if="proDiscuess"> 
            <div class="flex-r editor-discuess-title">
              <img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg " alt="">
              <span> [超声刀］原装美版超声刀Get提拉</span>
            </div>
            <!-- editor  -->
            <textarea name="" id="" cols="30" rows="10" placeholder=" 你觉得效果怎么样，快告诉大家" placeholder-style=" color:#999;font-size:14px; " auto-focus/>
            <div class="flex-r discuess-methods">
              <p class="discuess-item flex-r"><span class="discuess-icon icon-good-sel"> </span> <span class="cap">好评</span> </p>
              <p class="discuess-item flex-r"><span class="discuess-icon icon-middle-nosel"> </span > <span class="cap">中评</span> </p>
              <p class="discuess-item flex-r"><span class="discuess-icon icon-bad-nosel"> </span> <span class="cap">差评</span>    </p>
            </div>
         </div>
         <!-- 评价服务 -->
         <div class="editor-discuess server-discuess">
            <div class="flex-r organ-title">
              <img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg " alt="">
              <p class="flex-c">
                <span>
                  石家庄贵美人医疗美容医院
                </span>
                <span>
                  脱毛 、咨询
                </span>
              </p>
            </div>
            <!-- 服务评价星星 -->
            <div class="flex-r">
              <p><img src="http://192.168.1.55:8200/oa/OA/other/1534211592738.jpg" alt=""><span>容服务评价</span></p>
              <p> <img src="http://img.meiduduo.com/images/mine/item12.png" alt="" v-for="v in 5" :key="v"> <span>非常好 </span> </p>
            </div>
            <textarea name="" id="" cols="25" rows="10" placeholder="这次服务让您感觉满意吗？快来说说吧" placeholder-style="color:#999"/>

         </div>
    </div>
    
   
</template>

<script scoped>
// import Vue from "vue";
export default {
  data() {
    return {
      proDiscuess: true,
      serDiscuess: true
    };
  }
};
</script>
<style>
discuess-box {
  font-family: PingFangSC-Light;

  color: rgba(153, 153, 153, 1);
}
.discuess-item {
}
.flex-r {
  display: flex;
  flex-direction: row;
}
.flex-c {
  display: flex;
  flex-direction: column;
}
/* 写评价*/

.editor-discuess {
  padding: 0.5rem;
}
.editor-discuess-title {
  align-items: center;
  background: rgba(248, 248, 248, 1);
}
.editor-discuess-title img {
  width: 1.1rem;
  height: 1.1rem;
}
.editor-discuess-title span {
  font-size: 0.3rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 0.36rem;
  margin-left: 5px;
}
.discuess-methods {
  border-top: 1rpx solid #ddd;
  justify-content: space-around;
}
.discuess-item {
  padding: 10px;
}
.discuess-item .cap {
  margin-left: 10px;
  color: #bbb;
  font-size: 0.28rem;
}
textarea {
  padding: 15px 0;
  width: 80%;
}
.discuess-icon {
  display: block;
  width: 0.46rem;
  height: 0.5rem;
  background-repeat: no-repeat;
  background-size: contain;
}
.icon-good-sel {
  background-image: url(http://img.meiduduo.com/images/xyy/hpy.png);
}
.icon-good-nosel {
  background-image: url(http://img.meiduduo.com/images/xyy/hpn.png);
}
.icon-middle-sel {
  background-image: url(http://img.meiduduo.com/images/xyy/zpy.png);
}
.icon-middle-nosel {
  background-image: url(http://img.meiduduo.com/images/xyy/zpn.png);
}
.icon-bad-sel {
  background-image: url(http://img.meiduduo.com/images/xyy/cpy.png);
}
.icon-bad-nosel {
  background-image: url(http://img.meiduduo.com/images/xyy/cpn.png);
}
.organ-title {
  display: block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
</style>
