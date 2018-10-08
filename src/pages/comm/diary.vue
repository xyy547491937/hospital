<template>
    <div id="info">
        <div class="info-top">
             <div class="author">
                 <img class="fl avatar" :src="item.authorIcon" alt="">
                 <div class="fl name-time">
                     <div class="name">{{item.authorName}}</div>
                     <div class="timer">{{item.createDate}}</div>
                 </div>
                 <div class="fr follow-box">
                     <div class="follow-text">
                        <span @click="follow(1)" v-show="!item.isFollow">+关注</span>
                        <span @click="follow(-1)" v-show="item.isFollow">已关注</span>
                     </div>
                 </div>
             </div>
        </div>
        <div class="seemore">
            <img class="book" src="http://img.meiduduo.com/images/info/book.png" alt="">
            <span class="moretext" @click="toDiaryBook(item)">查看其余7篇日记</span>
            <img class="arrow " src="http://img.meiduduo.com/images/link.png" alt="">
        </div>
        <div class="detail-box">
            <div class="detail">
                <img class="detailimg" src="http://img.meiduduo.com/images/info/diary_img1.png" alt="">
                <div class="detail-text">
                    <div class="title">{{item.diaryBookName }} </div>
                    <div class="place">{{item.organName }}</div>
                    <div class="name">{{item.personalName}}   {{item.detailName}}  <span class="money">￥{{item.rulePrice}}</span></div>
                </div>
            </div>
        </div>
        <div class="info-content">
            <wxParse :content="item.content" noData=""/>
            <!-- {{item.content}} -->
        </div>
        <div class="remain-box">
            <div class="remain" @click="toDiaryBook(item)">
              <span class="remain-text">查看其余7篇日记 </span>
              <i-icon class="enter" type="enter" />
            </div>
        </div>
        
        <!-- <div class="box">
            <div class="consum">消费项目</div>
            <div class="project">
                <div class="title">切开双眼皮 切开法双眼皮 切开法割双眼皮</div>
                <div class="position">石家庄贵美人医疗美容医院</div>
                <div class="doctor">刘卓达 副主任医师 <span>￥2333</span></div>
            </div>
            <div class="consum-btn">
                <div>医院主页</div>
                <div>我要咨询</div>
            </div>
        </div> -->
        <div class="box comment">
            <div class="commnet-title">
                评论
            </div>
            <div class="" style="font-size:24rpx;color:#333;" v-show="comments.length==0">暂无评论</div>
            <div class="comment-item" v-for="(item,index) of comments" :key="index">
                <div class="item-img">
                    <img :src="item.icon" alt="">
                </div>
                <div class="item-p">
                    <div class="item-hos">
                        <div>{{item.custName}}</div>
                        <div class="item-num" @click="changeCommThumbs(item)">
                            <img src="http://img.meiduduo.com/images/info/zan1.png" v-show="item.isThumbsUp!=1" alt="">
                            <img src="http://img.meiduduo.com/images/info/zan2.png" v-show="item.isThumbsUp==1" alt="">
                            <span>{{item.fabulousNum}}</span>
                        </div>
                    </div>
                    <div class="item-content">
                        <div>{{item.content}}</div>
                      <!-- <wxParse :content="item.content" /> -->
                      <!-- 回复 -->
                      <!-- <div class="child-content" v-if="item.children.length>0">
                           <div v-for="(child,i) in item.children" :key="i"  v-if="i<10">
                               <span class="child-name">{{child.custName}}：</span> -->
                               <!-- <wxParse :content="child.content" noData=""/> -->
                               <!-- <span class="child-text">{{child.content}}</span>
                           </div>
                      </div> -->
                      
                    </div>
                    <div class="item-footer">
                        <div class="item-time">{{item.createDate}}</div>
                        <span class="reply" @click="reply(item)">回复</span>
                        <!-- <div class="item-right">
                            <div class="item-follow" @click="customerRecordSave">
                                <img src="http://img.meiduduo.com/images/info/item-follow.png" alt="">赞
                            </div>
                            <div class="item-message" @click="writeShow">
                                <img src="http://img.meiduduo.com/images/info/item-message.png" alt="">回复
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="toTop" v-if="topShow" @click="toTop">
          顶部
        </div>
        <writeComment  v-bind="writeItem" v-if="writeCommentS"  @send="getComment" @sendStatusM="sendStatusM(res)" ></writeComment>
        <!-- <writeComment v-bind="writeItem" @send="getList(this.id)"></writeComment> -->
    </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import writeComment from "../comm/writeComment.vue"; //广告位
export default {
  props: ["item"],
  data() {
    return {
      topShow: false,
      userId: 1,
      custId: 1,
      type: "",
      id: "",
      //   item: {},
      comments: [1, 1, 1, 1],
      //   writeItem: {
      //     write1: true,
      //     write2: false,
      //     item: {}
      //   },
      writeItem: {
        write1: true,
        write2: false,
        sendStatus: false,
        contentId: "",
        custId: 3,
        criticId: "",
        commentId: "",
        commentType: ""
      },
      writeCommentS: false
    };
  },
  onPageScroll(param) {
    if (param.scrollTop > 2000) {
      this.topShow = true;
    } else {
      this.topShow = false;
    }
  },
  components: {
    writeComment,
    wxParse
  },
  onLoad() {
    console.log(this.$route.query);
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    // this.getDiaryinfo();
    this.getComment();
    this.writeItem.commentType = 5;
    // 记录回复日记id
    this.writeItem.contentId = this.id;
    this.writeItem.id = this.id;
    // 记录评论类型
    this.writeItem.commentType = 5;
    console.log(this.writeItem.contentId);
    // this.queryOneForDiaryBook(this.id)
    // this.getList(this.id)
  },
  methods: {
    toTop() {
      this.topShow = false;
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    toDiaryBook(item) {
      console.log(this.item.diaryBookId);
      this.$router.push({
        path: "/pages/info/diary_info",
        query: {
          id: item.diaryBookId,
          type: 7
        }
      });
    },
    follow(state) {
      let option = {
        recordId: this.id,
        custId: "123",
        recordType: "6",
        state
      };
      console.log(option);
      // return
      this.$http.post("/focusRecord/save", option).then(res => {
        console.log(res);
        if (res.code == "1") {
          if (state == 1) {
            this.item.isFollow = 1;
          } else {
            this.item.isFollow = 0;
          }
        } else {
          wx.showToast({
            title: "操作失败",
            icon: "none"
          });
        }
      });
    },
    getDiaryinfo() {
      let option = {
        id: this.id,
        type: this.type
      };
      this.$http.post("/diary/queryOneByPkAndUserId", option).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.item = res.data;
        }
      });
    },
    getComment() {
      let option = {
        contentId: this.id,
        commentType: 5,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        console.log(res);
        if (res.code == "1") {
          this.comments = res.data;
          // let arr = []
          // res.data.forEach(element => {
          //     arr.push(element)
          //     if(element.children.length>0){
          //         element.children.forEach(value=>{
          //             arr.push(value)
          //         })
          //     }
          // });
          // this.comments = arr
        }
        this.writeCommentS = true;
      });
    },
    // 评论点赞
    changeCommThumbs(item) {
      let state = item.isThumbsUp ? -1 : 1;

      this.$http
        .post("/customerRecord/save", {
          recordId: item.id,
          custId: item.custId,
          recordType: "5",
          crType: "1",
          state
        })
        .then(res => {
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
    // 回复评论
    reply(item) {
      this.writeItem.commentType = 11;
      this.writeItem.sendStatus = true;
      this.writeItem.criticId = item.criticId;
      this.writeItem.commentId = item.commentId;
      this.writeItem.id = item.id;
      this.writeItem.contentId = item.contentId;
      this.writeItem.criticId = item.custId;
      this.writeItem.custId = this.custId;
      this.writeItem.sendType = 1;
    },
    sendStatusM(data) {
      // console.log(this.writeItem.sendStatus)
      this.writeItem.sendStatus = data;
      this.writeItem.commentType = 5;
    },
    writeShow() {}
  }
};
</script>

<style  scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
#info {
  background: #f1f1f1;
}
/* 顶部信息 */
.info-top {
  padding: 10rpx 32rpx;
  background: #fff;
}
.info-top .author {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-bottom: 30rpx;
  border-bottom: 2rpx solid #f5f5f5;
}
.info-top .author .fl {
  float: left;
}
.info-top .author .fr {
  float: right;
}
.info-top .avatar {
  display: inline-block;
  width: 90rpx;
  height: 90rpx;
  margin-right: 24rpx;
  border-radius: 50%;
}
.info-top .name-time {
  height: 90rpx;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  flex: 1;
}
.info-top .name {
  color: #333;
  font-size: 26rpx;
}
.info-top .timer {
  color: #999;
  font-size: 24rpx;
}
.info-top .follow-box {
}
.info-top .follow-box .follow-text {
  color: #fa418c;
  font-size: 26rpx;
  border: 2rpx solid #fa418c;
  border-radius: 16rpx;
  padding: 4rpx 14rpx;
}
/* 查看更多 */
.seemore {
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: #fff;
}
.seemore .book {
  display: inline-block;
  width: 24rpx;
  height: 28rpx;
}
.seemore .moretext {
  font-size: 26rpx;
  flex: 1;
  margin-left: 22rpx;
  color: #666;
}
.seemore .arrow {
  float: right;
  width: 14rpx;
  height: 18rpx;
}
/* 内容顶部栏 */
.detail-box {
  padding: 0 32rpx 32rpx;
  background: #fff;
}
.detail-box .detail {
  background: #fefdef;
  border: 2rpx solid #ffd35c;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
}
.detail-box .detail .detailimg {
  width: 96rpx;
  height: 142rpx;
}
.detail-box .detail .detail-text {
  display: inline-block;
  padding: 6rpx 14rpx;
  height: 130rpx;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
}
.detail-box .detail .title {
  color: #333;
  font-size: 28rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-box .detail .title {
  color: #333;
  font-size: 28rpx;
}
.detail-box .detail .place {
  color: #999;
  font-size: 24rpx;
}
.detail-box .detail .name {
  color: #999;
  font-size: 24rpx;
}
.detail-box .detail .name .money {
  float: right;
}
/* 富文本 */
.info-content {
  padding: 10rpx 32rpx;
  color: #333;
  font-size: 24rpx;
  background: #fff;
}
/* 查看剩余 */
.remain-box {
  padding-top: 24rpx;
  background: #fff;
  text-align: center;
}
.remain {
  display: inline-block;
  margin: 0 auto;
  padding: 6rpx 40rpx 14rpx 40rpx;
  background: #ff8bcd;
  border-radius: 30rpx;
}
.remain .remain-text {
  color: #fff;
  font-size: 24rpx;
}
.remain .enter {
  color: #fff;
}
.toTop {
  width: 1rem;
  height: 1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 1.16rem;
  right: 0.16rem;
  border-radius: 100% 100%;
  border: 1px solid #cccccc;
  -moz-box-shadow: 0 0 10px 0 #ccc;
  -webkit-box-shadow: 0 0 10px 0 #ccc;
  box-shadow: 0 0 10px 0 #ccc;
  padding-top: 0.5rem;
  background: #fff url("http://img.meiduduo.com/images/topArr.png") no-repeat
    center 0.16rem;
  background-size: 0.26rem 0.28rem;
  text-align: center;
  font-size: 0.22rem;
  color: #333333;
}

.box {
  background: #fff;
  margin-bottom: 0.18rem;
}
.top {
  padding-bottom: 0.2rem;
}
.photo {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0.24rem;
}
.photo div {
  width: 3.5rem;
  height: 3.1rem;
  position: relative;
}
.photo img {
  width: 100%;
  height: 100%;
}
.photo .before,
.photo .after {
  position: absolute;
  height: 0.3rem;
  width: 1rem;
  bottom: 0;
  right: 0;
}
.person {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  font-size: 0.26rem;
  color: #555;
  padding: 0 0.24rem;
}
.person img {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.follow {
  display: inline-block;
  width: 1.1rem;
  height: 0.36rem;
  border: 1px solid #ff4691;
  border-radius: 0.18rem;
  text-align: center;
  line-height: 0.36rem;
}
.person-info {
  display: flex;
  align-items: center;
}
.time {
  font-size: 0.24rem;
  color: #999;
  line-height: 0.6rem;
  padding-left: 0.8rem;
}

.doctor {
  display: flex;
  justify-content: space-between;
}
.label {
  width: 1.68rem;
  height: 0.48rem;
  color: #333;
  background: #f1f1f1;
  border-radius: 0.24rem;
  font-size: 0.24rem;
  line-height: 0.48rem;
  text-align: center;
  margin: 0 0.24rem;
}
.diary-sort {
  display: flex;
  justify-content: space-between;
  padding: 0.22rem;
  background: #fff;
  color: #333;
  font-size: 0.24rem;
}
.diary-time {
  color: #999;
}
.consum {
  padding: 0.22rem;
  font-size: 0.24rem;
  color: #020202;
}
.consum-btn {
  display: flex;
  justify-content: space-between;
  padding: 0 0.64rem;
}
.consum-btn div {
  box-sizing: border-box;
  width: 2.98rem;
  height: 0.48rem;
  border: 1px solid #cccccc;
  border-radius: 0.24rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 0.48rem;
}

.comment {
  padding: 0 0.2rem 2.32rem 0.2rem;
}
.commnet-title {
  color: #333;
  font-size: 0.24rem;
  line-height: 0.6rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 0.12rem;
}
.comment-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.2rem;
  margin-bottom: 0.2rem;
}
.item-img {
  width: 0.8rem;
  height: 0.8rem;
}
.item-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.item-hos {
  display: flex;
  justify-content: space-between;
  color: #333;
  font-size: 0.24rem;
  /* margin-bottom: .6rem; */
}
.item-num {
  color: #999;
}
.item-num img {
  width: 30rpx;
  height: 30rpx;
  vertical-align: top;
  margin-right: 6rpx;
}
.item-p {
  width: 6rem;
}
.toTop {
  width: 1rem;
  height: 1rem;
  box-sizing: border-box;
  position: fixed;
  bottom: 1.16rem;
  right: 0.16rem;
  border-radius: 100% 100%;
  border: 1px solid #cccccc;
  -moz-box-shadow: 0 0 10px 0 #ccc;
  -webkit-box-shadow: 0 0 10px 0 #ccc;
  box-shadow: 0 0 10px 0 #ccc;
  padding-top: 0.5rem;
  background: #fff url("http://img.meiduduo.com/images/topArr.png") no-repeat
    center 0.16rem;
  background-size: 0.26rem 0.28rem;
  text-align: center;
  font-size: 0.22rem;
  color: #333333;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.84rem;
  text-align: center;
  line-height: 0.84rem;
  background: #f1f1f1;
  font-size: 0.3rem;
  color: #555;
}
.footer img {
  width: 0.4rem;
  height: 0.4rem;
  vertical-align: middle;
  margin-right: 0.1rem;
}
.item-content {
  color: #333;
  font-size: 0.28rem;
  line-height: 0.48rem;
  margin-bottom: 0.1rem;
}

.item-footer {
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  color: #999;
  font-size: 0.24rem;
}
.item-footer .reply {
}
.item-time {
  color: #999;
  font-size: 0.24rem;
}

.item-right {
  display: flex;
  justify-content: space-between;
}
.item-right img {
  width: 0.26rem;
  height: 0.26rem;
  margin-right: 0.1rem;
}
.item-right div {
  width: 1.35rem;
  height: 0.45rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.24rem;
  box-sizing: border-box;
  border-radius: 0.22rem;
  margin-left: 0.2rem;
}
.item-follow {
  background: #fecc56;
}
.item-message {
  background: #ff8bcd;
}
</style>
