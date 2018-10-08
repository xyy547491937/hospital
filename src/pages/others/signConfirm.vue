<template>
  <div class="signconfirm">
    <div class="headImg">
      <img class="head-img" :src="info.logo" alt="">
    </div>
    <div class="signctn">
      <div class="originT">
        {{info.organName}}
      </div>
      <div class="originT1">
        {{info.documentName}}
      </div>
      <div class="originT2">
        隆胸手术
      </div>
      <div>
        <!-- {{info}} -->
      </div>
      <div class="originT3">
        <span class="span1">刘卓达</span>
        <span class="span2">副主任医师</span>
        <span class="span3">{{info.createDate}}</span>
      </div>
    </div>
    <div class="signctn" v-if="info.isSignature==1">
      <div class="tip">请仔细阅读上述资料，完成手签确认</div>
      <canvas class="canvas" v-if="base64==''" canvas-id="firstCanvas" disable-scroll="true" @touchstart="canvasStart" @touchmove="canvasMove" @touchend="canvasEnd" @touchcancel="canvasEnd" @error="canvasIdErrorCallback"></canvas>
      <img v-else :src="base64" alt="">
    </div>
    <div class="signbtm" v-if="info.isSignature==1&&base64==''">
      <i-button i-class="signbtn" inline="true" shape="circle" @click="cleardraw">重签</i-button>
      <i-button i-class="signbtn signbtn1" inline="true" shape="circle" @click="getimg">确认</i-button>
    </div>
    <div class="signctn" v-if="info.isSignature==2">
      <img :src="info.documentUrl" alt="">
    </div>
    <!-- <view class="img-box">
        <image :src="tempFilePath"/>>
    </view> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      context: '',
      context: null,
      isButtonDown: false,
      arrx: [],
      arry: [],
      arrz: [],
      canvasw: 300,
      canvash: 150,
      tempFilePath: '',
      info:'',
      base64:''
    }
  },
  onReady:function(e){
    this.context = wx.createCanvasContext('firstCanvas')
    this.context.beginPath()
    this.context.setStrokeStyle('#333333')
    this.context.setLineWidth(4)
    this.context.setLineCap('round')
    this.context.setLineJoin('round')
    console.log(this.context)
     wx.createSelectorQuery().select('.canvas').fields({
      size: true,
    }, function(res){
      this.canvasw = res.width
      this.canvash = res.height
    }).exec()
  },
  onUnload () {
    this.cleardraw()
  },
  onShow () {
    this.info = JSON.parse(this.$route.query.info)
  },
  mounted () {
    this.info = JSON.parse(this.$route.query.info)
    console.log(this.info)
  },
  methods: {
    canvasStart: function (event) {
      this.isButtonDown = true
      this.arrz.push(0)
      this.arrx.push(event.x)
      this.arry.push(event.y)
    },
    // 过程
    canvasMove: function (event) {
      if (this.isButtonDown) {
        this.arrz.push(1)
        this.arrx.push(event.x)
        this.arry.push(event.y)
      }
      for (var i = 0; i < this.arrx.length; i++) {
        if (this.arrz[i] === 0) {
          this.context.moveTo(this.arrx[i], this.arry[i])
        } else {
          this.context.lineTo(this.arrx[i], this.arry[i])
        }
      }
      this.context.setFillStyle("#ffffff");
      this.context.fillRect(0, 0, 600, 300)
      this.context.stroke()
      this.context.draw()
    },
    canvasEnd: function (event) {
      this.isButtonDown = false
    },
    cleardraw: function () {
      // 清除画布
      this.arrx = []
      this.arry = []
      this.arrz = []
      this.context.clearRect(0, 0, this.canvasw, this.canvash)
      this.context.draw()
    },
    // 导出图片
    getimg: function () {
      if (this.arrx.length === 0) {
        wx.showModal({
          title: '提示',
          content: '签名内容不能为空！',
          showCancel: false
        })
        return false
      }
      var _this = this
      this.context.draw(false, wx.canvasToTempFilePath({
        canvasId: 'firstCanvas',
        success(res) {
          var tempFilePath = res.tempFilePath;
          // console.log(tempFilePath)
          wx.request({
            url: res.tempFilePath,
            responseType: "arraybuffer",
            success(res) {
              let base64 = wx.arrayBufferToBase64(res.data)
              _this.tempFilePath = 'data:image/jpg;base64,' + base64;
                  var parames = {
	                	base64Img:encodeURIComponent(_this.tempFilePath),
	                	id:_this.info.id,
	                	signType:_this.info.signType,
	                	documentUrl:_this.info.documentUrl
	                }
	                _this.$http.post("/serviceEvaluation/saveSign",parames)
	                .then( res => {
                      _this.arrx = []
                      _this.arry = []
                      _this.arrz = []
                      _this.context.clearRect(0, 0, _this.canvasw, _this.canvash)
                      _this.context.draw()
                      _this.$router.go(-1);
	                })
              
            }
          })
        },
        fail: function (res) {
          console.log(res);
        }
      }, this));
      wx.canvasToTempFilePath({
        width: 170, //canvas原本的大小
        heght: 170,
        destWidth: 680,  //生成图片的大小设置成canvas大小的二倍
        destHeight: 680,
        canvasId: 'firstCanvas',
        fileType: 'png',
        quality: 1,
        success: (res) => {
          console.log(res.tempFilePath,456464565);
          // wx.saveImageToPhotosAlbum({
          //   filePath: res.tempFilePath,
          // });
        },
        fail: function (res) {
          console.log(res);
        },
      })

      // 生成图片
      // wx.canvasToTempFilePath({
      //   canvasId: 'firstCanvas',
      //   success: function (res) {
      //     console.log(res.tempFilePath)
      //     // 存入服务器
      //     // wx.uploadFile({
      //     //   url: '', // 接口地址
      //     //   filePath: res.tempFilePath,
      //     //   name: 'file',
      //     //   formData: {
      //     //     'user': 'test'
      //     //   },
      //     //   success: function (res) {
      //     //     console.log(res)
      //     //   },
      //     //   fail: function (res) {
      //     //     console.log(res)
      //     //   },
      //     //   complete: function (res) {
      //     //   }
      //     // })
      //   }
      // })
    }
  }
}
</script>
<style scoped>
/* .img-box{padding: 32rpx;background-color: #fff;border-bottom: 1rpx solid #e5e5e5;position: relative}
.img-box image{width: 686rpx;height: 686rpx;background-color: #f9f9f9} */
.signconfirm{
  width: 100%;
  background: #f0f0f0 url("http://img.meiduduo.com/images/signbg.png") no-repeat left top;
  background-size: 100% 3.44rem;
  overflow: hidden;
  font-size: 0.26rem;
  color: #555555;
  line-height: .54rem;
}
.headImg{
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 100%;
  border: 1px solid #fff;
  background: url("http://img.meiduduo.com/images/headImg.png") no-repeat center;
  background-size: 100%;
  margin: .48rem auto .28rem;
}
.signctn{
  box-sizing: border-box;
  width: 7rem;
  margin: 0 auto .18rem;
  padding:0 .36rem;
  border-radius:4px;
  background: #fff;
  -moz-box-shadow:.1rem .1rem 8% rgba(112, 105, 111, 23%); -webkit-box-shadow:.1rem .1rem 8% rgba(112, 105, 111, 23%); box-shadow:.1rem .1rem 8% rgba(112, 105, 111, 23%);
}
.signctn .originT{
  height: 1.06rem;
  line-height: 1.06rem;
  font-size: .32rem;
  color: #333333;
  font-weight: 700;
  padding-left: .8rem;
  border-bottom: 1px solid #ff4691;
  background: url("http://img.meiduduo.com/images/signIcon.png") no-repeat left center;
  background-size: .62rem .66rem;
  margin-bottom: .12rem;
}
.signctn .originT1{
  height: 1rem;
  line-height: 1rem;
  font-size: .36rem;
  font-weight: 700;
  color: #333333;
  text-align: center;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: .16rem;
}
.signctn .originT2{
  height: .64rem;
  line-height: .64rem;
  font-size: .3rem;
}
.signctn .originT3{
  height: .8rem;
  line-height: 0.8rem;
  border-top: 1px solid #EEEEEE;
}
.signctn .originT3 .span2{
  padding:0 .32rem 0 .16rem;
}
.signctn .originT3 .span3{
  color: #999999;
}
.signctn .tip{
  font-size: .26rem;
  color: #FA9B0A;
  height: .86rem;
  line-height: .86rem;
}
canvas{
  height: 2.84rem;
  width: 100%;
  /* background: #333; */
}
.signbtm{
  color: #fff;
  width: 6.72rem;
  margin: .46rem auto;
}
.head-img {
  display: block;
  width: 87px;
  height: 87px;
  border-radius: 100%;
}
</style>
