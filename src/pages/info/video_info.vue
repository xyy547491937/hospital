<template>
    <div class="video-info">
        <div class="top">
            <div class="video" ref="videobox" :class="{fullScreen:videofullScreen,nofullScreen:!videofullScreen}"  >
                <video id="video" ref="video" @click="videoPause" @timeupdate="timeChange" autoplay="autoplay" show-progress  :controls="controls" :show-fullscreen-btn="fullScreen" :show-play-btn="showPlayBtn"  show-center-play-btn  :src="videoInfo.videoUrl">
                    <cover-image v-show="!videoPlaying" @click="videoPlay" class="playing" src="http://img.meiduduo.com/images/info/play.png" />
                    <cover-view class="coverview" v-show="videofullScreen">
                        <cover-view class="video-detail">
                            <!-- 头像 昵称 -->
                            <cover-view>
                            <!-- <img class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                            <cover-image class="avatar" :src="videoInfo.authorIcon" />
                            <!-- <cover-image class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" /> -->
                            <cover-view class="nickname">{{videoInfo.authorName}}</cover-view>
                            </cover-view>
                            <!-- video介绍 -->
                            <cover-view style="overflow:hidden;margin: 30rpx 0 30rpx 0;">
                                <cover-view class="detail-text">{{videoInfo.content}}</cover-view>
                                <!-- span -->
                                <cover-view class="more" @click="switchFullScreen(false)">更多</cover-view>
                            </cover-view>
                            <!-- 赞 收藏 -->
                            <cover-view class="video-bottom">
                                <cover-view class="zan" @click="changeThumbs(videoInfo.id)">
                                    <!-- @click="clickThumbs(videoInfo.isThumbsUp)" -->
                                    <cover-image class="video-handle"  v-if="videoInfo.isThumbsUp == 0" src="http://img.meiduduo.com/images/info/zan1.png" />
                                    <cover-image class="video-handle"  v-if="videoInfo.isThumbsUp != 0" src="http://img.meiduduo.com/images/info/zan2.png" />
                                    <cover-view class="count">赞 {{videoInfo.fabulousNum}}</cover-view>
                                </cover-view>

                                <cover-view class="zan" @click="changeCollect(videoInfo.id)">
                                    <!-- @click="clickCollect(videoInfo.isCollection)" -->
                                    <cover-image class="video-handle"  v-if="videoInfo.isCollection == 0" src="http://img.meiduduo.com/images/info/nolike.png" />
                                    <cover-image class="video-handle"  v-if="videoInfo.isCollection != 0" src="http://img.meiduduo.com/images/info/like.png" />
                                    <!-- span -->
                                    <cover-view class="count">收藏 {{videoInfo.favouriteNum}}</cover-view>
                                </cover-view>
                            </cover-view>
                        </cover-view>
                    </cover-view>
                     <cover-view v-show="!videofullScreen" class="video-bottom2" @click="switchFullScreen(true)">全屏</cover-view>
                </video>
            </div>
            <!-- 视频详情描述 -->

        </div>
        <div class="btm" v-show="!videofullScreen">
            <div class="box">
            <div class="title">
                <div class="person">
                    <!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                    <img  :src="videoInfo.authorIcon" alt="">
                    {{videoInfo.authorName}}
                </div>
                <div class="follow" v-show="!videoInfo.isFollow"  @click="clickFollow(videoInfo.author,1)">+关注</div>
                <div class="follow" v-show="videoInfo.isFollow"  @click="clickFollow(videoInfo.author,-1)">已关注</div>
            </div>
            <div class="content">
                {{videoInfo.content}}
            </div>
            <div class="content-bottom">
                <div>{{videoInfo.releaseTime}}</div>
                <div>{{videoInfo.fabulousNum}}次赞 {{videoInfo.favouriteNum}}次收藏</div>
            </div>
        </div>
        <div class="box comment">
            <div class="comment-title">
                <div class="title-bold">评论</div>
                <div class="comment-num">共{{commentTotal}}条评论</div>
            </div>
            <div class="comment-list">
                <div v-show="commenList&&commenList.length==0" style="padding:10rpx 15rpx">暂无评论</div>
                <div class="comment-item" v-for="(item,index) in commenList" :key="index">
                    <div class="item-img">
                        <!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt=""> -->
                        <img :src="item.icon" alt="">
                    </div>
                    <div style="display:flex;flex:1;flex-direction:column;">
                        <div class="item-name" >
                            <div style="overflow:hidden">
                                {{item.custName}}
                                <div class="item-social" @click="changeCommThumbs(item)">
                                    <img class="video-handle" v-show="!item.isThumbsUp" src="http://img.meiduduo.com/images/info/zan1.png" alt="">
                                    <img class="video-handle" v-show="item.isThumbsUp" src="http://img.meiduduo.com/images/info/zan2.png" alt="">
                                    <span style="color:#999">{{item.fabulousNum}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-content">
                            <div>{{item.content}}</div>
                            <div class="child-content" v-if="item.children.length>0">
                                <div v-for="(child,i) in item.children" :key="i"  v-if="i<10">
                                    <span class="child-name">{{child.custName}}：</span>
                                    <!-- <wxParse :content="child.content" noData=""/> -->
                                    <span class="child-text">{{child.content}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="item-time">
                            {{item.createDate}}    <span class="reply" @click="reply(item)">回复</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height:84rpx;">
                <writeComment  v-bind="writeItem" v-if="writeCommentS"  @send="refreshComm" @sendStatusM="sendStatusM(res)" ></writeComment>
            </div>
            <!-- <div class="comment-input"> -->
                <!-- <img class="place" src="http://img.meiduduo.com/images/info/input_bg.png" alt=""> -->
                <!-- <input type="text" :focus="focus" @bindconfirm="sendComment" :placeholder="placeholder" placeholder-style="color:#999;font-size:24rpx;" confirm-type="send"> -->
                <!-- <div class="input-right">
                    <div class="message">
                        <img src="http://img.meiduduo.com/images/info/message.png" alt="">
                        <span>32</span>
                    </div>
                    <div>
                        <img src="http://img.meiduduo.com/images/info/star.png" alt="">
                    </div>
                </div> -->
            <!-- </div> -->
        </div>
        <div class="relevant">
             <div class="retitle">相关视频</div>
             <div class="relevant-list">
                <div class="video-box">
                    <div class="video-item" @click="clickToVideoinfo(item)" v-if="index % 2 ==0" v-for="(item,index) in relevantList" :key="index" >
                        <div class="video-top">
                            <!-- 播放img -->
                                <img class="playbtn" src="http://img.meiduduo.com/images/info/play.png" alt="">
                                <!-- 预览图 -->
                                <!-- <img class="postimg" src="http://fs.meiduduo.com/oa/OA/other/1530184357137.png" alt=""> -->
                                <img class="postimg"  mode="widthFix" :src="item.cover" alt="">
                        </div>
                        <div class="desc">{{item.content}}</div>
                        <div class="author">
                            <div class="author-box">
                                    <!-- <img class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt="">
                                    <span class="nickname">阿拉蕾</span> -->
                                    <img class="avatar" :src="item.authorIcon" alt="">
                                    <span class="nickname">{{item.authorName}}</span>
                            </div>
                            <div class="author-box2">
                                <img class="collect" src="http://img.meiduduo.com/images/info/nolike.png" alt="">
                                <span class="count">{{item.favouriteNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="video-box">
                    <div class="video-item" @click="clickToVideoinfo(item)" v-if="index % 2 != 0" v-for="(item,index) in relevantList" :key="index">
                        <div class="video-top">
                            <!-- 播放img -->
                                <img class="playbtn" src="http://img.meiduduo.com/images/info/play.png" alt="">
                                <!-- 预览图 -->
                                <!-- <img class="postimg" src="http://fs.meiduduo.com/oa/OA/other/1530184357137.png" alt=""> -->
                                <img class="postimg"  mode="widthFix" :src="item.cover" alt="">
                        </div>
                        <div class="desc">
                            <!-- {{item.content}} -->
                            <!-- <rich-text :nodes="item.content"></rich-text> -->
                            <wxparse :content="item.content" noData=""></wxparse>
                        </div>
                        <div class="author">
                            <div class="author-box">
                                    <!-- <img class="avatar" src="http://fs.meiduduo.com/shop/SHOP/other/1530167832624.jpg" alt="">
                                    <span class="nickname">阿拉蕾</span> -->
                                    <img class="avatar" :src="item.authorIcon" alt="">
                                    <span class="nickname">{{item.authorName}}</span>
                            </div>
                            <div class="author-box2">
                                <img class="collect" src="http://img.meiduduo.com/images/info/nolike.png" alt="">
                                <span class="count">{{item.favouriteNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>


             </div>
        </div>
        </div>

    </div>
</template>

<script>
import writeComment from "../comm/writeComment";
import wxparse from "mpvue-wxparse";

export default {
  data() {
    return {
      custId: this.$store.state.userInfo.custId,
      videofullScreen: true,
      currentTime: "",
      duration: "",
      videoPlaying: true,
      playingIcon: {
        yes: "http://img.meiduduo.com/images/info/play.png",
        no: ""
      },
      controls: false,
      fullScreen: false,
      showPlayBtn: false,
      focus: false,
      placeholder: "写评论...",
      videoInfo: {},
      commenList: [],
      relevantList: [],
      writeItem: {
        write1: true,
        write2: false,
        sendStatus: false,
        contentId: "",
        custId: "",
        criticId: "",
        commentId: "",
        commentType: ""
      },
      writeCommentS: false,
      commentTotal: 0
    };
  },
  components: {
    writeComment,
    wxparse
  },
  methods: {
    videoPlay() {
      this.videoContext.play();
      this.videoPlaying = true;
    },
    // 暂停
    videoPause() {
      this.videoContext.pause();
      this.videoPlaying = false;
    },
    timeChange(e) {
      this.currentTime = e.mp.detail.currentTime;
      this.duration = e.mp.detail.duration;
    },
    switchFullScreen(flag) {
      this.videofullScreen = flag;
    },
    getVideoInfo(id) {
      this.$http
        .post("/smallVideo/queryOneByPkAndUserId", {
          id,
          userId: this.$store.state.userInfo.custId
        })
        .then(res => {
          console.log("视频信息:", res);
          if (res.code == "1") {
            this.videoInfo = res.data;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    clickThumbs(flag) {
      flag
        ? (this.videoInfo.fabulousNum -= 1)
        : (this.videoInfo.fabulousNum += 1);
      this.videoInfo.isThumbsUp = !flag;
    },
    // 视频点赞
    changeThumbs(id) {
      let state = this.videoInfo.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: id,
          custId: this.$store.state.userInfo.custId,
          recordType: "9",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          if (res.code == "1") {
            if (state == 1) {
              this.videoInfo.fabulousNum += 1;
              this.videoInfo.isThumbsUp = 1;
            } else {
              this.videoInfo.fabulousNum -= 1;
              this.videoInfo.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    // 评论点赞
    changeCommThumbs(item) {
      let state = item.isThumbsUp ? -1 : 1;
      this.$http
        .post("/customerRecord/save", {
          recordId: item.id,
          custId: item.custId,
          recordType: "11",
          crType: "1",
          state
        })
        .then(res => {
          // console.log(res);
          if (res.code == "1") {
            if (state == 1) {
              item.fabulousNum += 1;
              item.isThumbsUp = 1;
            } else {
              item.fabulousNum -= 1;
              item.isThumbsUp = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    // 收藏
    changeCollect(id) {
      let state = this.videoInfo.isCollection ? -1 : 1;
      this.$http
        .post("/storeRecord/save", {
          recordId: id,
          custId: this.$store.state.userInfo.custId,
          recordType: "9",
          state
        })
        .then(res => {
          // console.log(res);
          if (res.code == "1") {
            if (state == 1) {
              this.videoInfo.favouriteNum += 1;
              this.videoInfo.isCollection = 1;
            } else {
              this.videoInfo.favouriteNum -= 1;
              this.videoInfo.isCollection = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    clickCollect(flag) {
      flag
        ? (this.videoInfo.favouriteNum -= 1)
        : (this.videoInfo.favouriteNum += 1);
      this.videoInfo.isCollection = !flag;
    },
    // 关注视频
    clickFollow(author, state) {
      let type = "";
      if (this.videoInfo.createType == 0 && this.videoInfo.authorType == 0) {
        type = 2;
      } else {
        type = 6;
      }
      this.$http
        .post("/focusRecord/save", {
          recordId: author,
          custId: this.$store.state.userInfo.custId,
          recordType: type,
          state
        })
        .then(res => {
          // console.log(res);
          if (res.code == "1") {
            if (state == 1) {
              this.videoInfo.isFollow = 1;
            } else {
              this.videoInfo.isFollow = 0;
            }
          } else {
            wx.showToast({
              title: "操作失败",
              icon: "none"
            });
          }
        });
    },
    // 获取评论列表
    getCommenList(contentId, commentType, pageNum, pageSize) {
      this.$http
        .post("/comment/list4Page", {
          custId: this.custId,
          contentId,
          commentType,
          pageNum,
          pageSize
        })
        .then(res => {
          console.log("评论列表:", res);
          if (res.code == "1") {
            // let arr = []
            // res.data.forEach(element => {
            //     arr.push(element)
            //     if(element.children.length>0){
            //         element.children.forEach(value=>{
            //              arr.push(value)
            //         })
            //     }
            // });
            // this.commenList = arr
            this.commenList = res.data.data;
            this.commentTotal = res.data.total;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
          this.writeCommentS = true;
        });
    },
    // 回复评论
    reply(item) {
      this.writeItem.sendStatus = true;
      this.writeItem.commentId = item.id;
      this.writeItem.criticId = item.custId;
    },
    refreshComm() {
      this.getCommenList(this.videoInfo.id, "9", 1, 15);
    },
    sendStatusM(data) {
      console.log(this.writeItem.sendStatus);
      this.writeItem.sendStatus = data;
    },
    // 相关视频
    getRelevantVideo(channelCode) {
      this.$http
        .post("/smallVideo/list4PageForApp", {
          channelCode
        })
        .then(res => {
          // console.log('相关视频:',res);
          if (res.code == "1") {
            this.relevantList = res.data.data;
          } else {
            wx.showToast({
              title: "获取失败",
              icon: "none"
            });
          }
        });
    },
    clickToVideoinfo(item) {
      //  this.$router.push({
      // 	path:'/pages/info/video_info?id='+item.id+'&channelCode='+item.channelCode
      // })
      this.$router.push({
        path: "/pages/info/video_info",
        query: {
          id: item.id,
          channelCode: item.channelCode
        }
      });
    }
  },
  created() {},
  onUnload() {
    this.writeCommentS = false;
  },
  onLoad(options) {
    this.videofullScreen = true;
    // 记录回复视频id
    this.writeItem.contentId = options.id;

    // 记录评论类型
    this.writeItem.commentType = 9;
    this.writeItem.custId = this.$store.state.userInfo.custId;

    this.videoContext = wx.createVideoContext("video");

    this.getVideoInfo(options.id);
    //获取评论
    this.getCommenList(options.id, "9", 1, 15);
    setTimeout(() => {
      this.getRelevantVideo(options.channelCode);
    }, 300);
  },
  watch: {
    focus(val) {
      this.placeholder = val ? "回复" : "写评论...";
    }
  }
};
</script>

<style >
.item-social {
  float: right;
  font-size: 26rpx;
}
.item-social img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 4rpx;
}
.relevant {
  overflow: hidden;
}
.relevant .retitle {
  height: 90rpx;
  padding: 0 24rpx;
  border-bottom: 1rpx solid #f1f1f1;
  line-height: 90rpx;
  background: #fff;
}
.relevant-list {
  padding: 15rpx 13rpx;
  overflow: hidden;
  background: #fff;
  font-weight: bold;
}
.video.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  overflow: hidden;
  /* height:100%; */
}
.video.nofullScreen {
  height: 650rpx;
}
.video video {
  height: 100%;
}
.video video .playing {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90rpx;
  height: 90rpx;
  z-index: 10;
  /* background: red; */
}
.relevant .video-item {
  width: 355rpx;
  margin: 5rpx;
  /* width: 50%; */
  float: left;
  /* padding: 11rpx; */
  box-sizing: border-box;
  border-radius: 8rpx;
  border: 1rpx solid #f1f1f1;
}
.relevant .video-top {
  position: relative;
}
.relevant .video-top .playbtn {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}
.relevant .video-top .postimg {
  display: inline-block;
  width: 100%;
  /* height: 400rpx; */
  min-height: 200rpx;
  max-height: 450rpx;
}
.relevant .video-item .desc {
  padding: 10rpx;
}
.relevant .video-item .author {
  padding: 10rpx;
  overflow: hidden;
}

.author .author-box {
  float: left;
}
.author .author-box2 {
  float: right;
}
.author .desc {
  font-size: 16rpx;
}
.author .avatar {
  display: inline-block;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  margin-right: 14rpx;
  vertical-align: middle;
}
.author .nickname {
  display: inline-block;
  color: #333;
  font-size: 22rpx;
}
.author .collect {
  display: inline-block;
  width: 28rpx;
  height: 24rpx;
  vertical-align: middle;
}
.author .count {
  font-size: 24rpx;
  color: #999;
  margin-left: 6rpx;
  font-weight: normal;
}
.video-box {
  width: 50%;
  float: left;
}
.video-info {
  background: #f1f1f1;
  font-size: 14px;
  color: #333;
}
.box {
  background: #fff;
  margin-bottom: 0.18rem;
}
.top {
  position: relative;
}
.coverview {
  position: absolute;
  bottom: 26rpx;
  left: 30rpx;
  right: 30rpx;
  /* z-index: 10; */
  color: #fff;
}
.video-detail {
  /* position: absolute;
        bottom: 40rpx;
        left: 30rpx;
        right: 30rpx;
        z-index: 10;
        color: #fff; */
}
.video-info .video video {
  width: 100%;
}
.video-info .video-detail .avatar {
  display: inline-block;
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  margin-right: 20rpx;
  vertical-align: middle;
}
.video-detail .nickname {
  display: inline-block;
  color: #fff;
  font-size: 30rpx;
  vertical-align: middle;
}
.video-detail .detail-text {
  float: left;
  height: 36rpx;
  width: 564rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.video-detail .more {
  float: right;
  height: 36rpx;
}
.video-bottom2 {
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
  color: #fff;
  font-size: 26rpx;
  padding: 4rpx;
}
.video-bottom .zan {
  display: inline-block;
  margin-right: 60rpx;
}
.video-bottom .zan .count {
  display: inline-block;
  vertical-align: middle;
}
.video-info .video-bottom .video-handle {
  display: inline-block;
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 12rpx;
}
.title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 0;
  border-bottom: 1px solid #dddddd;
  margin: 0 0.3rem;
  margin-bottom: 0.1rem;
}
.person {
  width: 500rpx;
  height: 0.88rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.person img {
  width: 0.88rem;
  height: 100%;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 0.3rem;
}
.follow {
  width: 1.2rem;
  height: 0.56rem;
  line-height: 0.56rem;
  color: #fff;
  font-size: 0.3rem;
  text-align: center;
  background: #ff4691;
  border-radius: 0.1rem;
}

.content {
  margin: 0 0.3rem;
  margin-bottom: 0.5rem;
}
.content-bottom {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  font-size: 0.24rem;
  color: #999999;
  margin: 0 0.3rem;
  padding-bottom: 0.2rem;
}
.comment-title {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  height: 0.9rem;
  padding: 0 0.24rem;
  border-bottom: 1px solid #dddddd;
  margin-bottom: 0.2rem;
}
.title-bold {
  font-size: 0.3rem;
  color: #333;
  font-weight: bold;
}
.comment-list {
  margin: 0 0.3rem 0 0.2rem;
  padding-bottom: 20rpx;
}
.comment-num {
  font-size: 0.24rem;
  color: #999;
}
.comment-item {
  display: flex;
  display: -webkit-flex;
  margin-bottom: 0.24rem;
}
.item-img {
  margin-right: 0.2rem;
}
.item-img img {
  width: 0.66rem;
  height: 0.66rem;
  border-radius: 50%;
}
.item-name {
  font-size: 0.3rem;
  color: #1a518b;
}
.item-time {
  color: #999;
  font-size: 0.24rem;
}
.item-content {
  font-size: 0.24rem;
  line-height: 0.38rem;
  color: #333;
  margin-bottom: 0.3rem;
}
.comment-input {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  height: 0.82rem;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 50rpx;
  border-top: 1px solid #eee;
  position: relative;
}
.comment-input img {
  width: 0.34rem;
  height: 0.34rem;
  vertical-align: middle;
}
.comment-input .place {
  position: absolute;
  left: 75rpx;
  top: 28rpx;
  width: 28rpx;
  height: 20rpx;
}
.comment-input input {
  box-sizing: border-box;
  /* width: 5.13rem; */
  width: 100%;
  height: 0.54rem;
  border-radius: 0.26rem;
  padding: 0 0.5rem 0 0.6rem;
  background: #f1f1f1;
  /* background: url('http://img.meiduduo.com/images/info/input_bg.png') no-repeat left center #F1F1F1; */
}
.input-right {
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  width: 2rem;
  padding: 0 0.5rem;
}
.message {
  position: relative;
}
.message span {
  position: absolute;
  display: inline-block;
  /* width: 100%; */
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background: #ff4691;
  color: #fff;
  font-size: 0.12rem;
  text-align: center;
  line-height: 0.2rem;
}
</style>
