<template>
    <div id="info">
        <div class="box top">
            <div class="photo">
                <div>
                    <img :src="item.preFirstPhoto" alt="">
                    <img class="before" src="http://img.meiduduo.com/images/info/Before.png" alt="">
                </div>
                <div>
                    <img :src="item.afterFirstPhoto" alt="">
                    <img class="after" src="http://img.meiduduo.com/images/info/After.png" alt="">
                </div>
            </div>

            <div class="person">
                <div class="person-info">
                    <img :src="item.authorIcon" alt="">{{item.authorName}}
                </div>
                <span v-if="isFollow !== -1" class="follow" :style="isFollow == 1? 'background: #ff4691;color:#fff;' : 'background: #fff;color:#555;'" @click="follow(focusRecordSave,item)">{{isFollow == 1? '已关注' : '+关注'}}</span>
            </div>
            <div class="time">更新于 {{item.updateTime}}</div>
            <div class="project">
              <div class="left">
                  <img src="http://img.meiduduo.com/images/diaryshop1.png" alt="">
              </div>
              <div class="middle"></div>
              <div class="right">
                <div class="title">{{item.commName}}</div>
                <div class="position">{{item.organName}}</div>
                <div class="doctor">{{item.personalName}} {{item.detailName}} <span>￥{{item.rulePrice}}</span></div>
              </div>
            </div>
            <div class="label">{{item.tagName}}</div>
        </div>
        <div class="box Preoperative">
            <span>术前</span>
            <div class="img-list">
              <img v-for="(one, index) in item.prePhoto" :key="index" :src="one" alt="">
              <img v-for="(one, index) in item.prePhoto" :key="index" :src="one" alt="">
              <img v-for="(one, index) in item.prePhoto" :key="index" :src="one" alt="">
              <div v-if="item.prePhoto&&item.prePhoto.length > 3" class="pubMark">{{item.prePhoto.length}}</div>
            </div>
        </div>
        <div class="diary-sort">
            <div>{{item.title}}</div>
            <div class="diary-time">时间由新到旧</div>
        </div>
        <div class="box Postoperatively" v-for="(diary, index1) in item.diaryList" :key="index1">
            <span>术后{{diary.afterDay}}天</span>
            <div class="img-list" @click="jump(diary.id, 5)">
              <img v-for="(one, index) in item.afterPhoto" :key="index" :src="one" alt="">
              <img v-for="(one, index) in item.afterPhoto" :key="index" :src="one" alt="">
              <img v-for="(one, index) in item.afterPhoto" :key="index" :src="one" alt="">
              <div v-if="item.afterPhoto&& item.afterPhoto.length > 3" class="pubMark">{{item.afterPhoto.length}}</div>
            </div>
            <div :class="hign[index1] ? 'content': 'content high'">
              <wxParse :content="diary.content" noData=""/>
            </div>
            <div class="operation">
                <div class="operation-l">
                    <div v-if="!hign[index1]" @click="expandMth(index1, hign)">展开<img src="http://img.meiduduo.com/images/upArrow.png" alt=""></div>
                    <div v-else @click="expandMth(index1, hign)">收起<img style="transform:rotate(180deg);margin-bottom:10rpx;" src="http://img.meiduduo.com/images/upArrow.png" alt=""></div>
                    <div><img class="img1" src="http://img.meiduduo.com/images/info/see.png" alt="">{{diary.readNum}}</div>
                </div>
                <div class="operation-r">
                    <div>
                        <img src="http://img.meiduduo.com/images/info/comment.png" alt="">{{diary.commentNum}}
                    </div>
                    <div @click="expandMth(index1, diaryThumbsUp, diary, customerRecordSave, 5)">
                        <img :src="diaryThumbsUp[index1] ? 'http://img.meiduduo.com/images/info/zan2.png' : 'http://img.meiduduo.com/images/info/zan1.png'" alt="">{{diary.fabulousNum}}
                    </div>
                </div>
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
            <div class="comment-item" v-for="(item, index) of comments" :key="index">
                <div class="item-img">
                    <img :src="item.icon" alt="">
                </div>
                <div class="item-p">
                    <div class="item-hos">
                        <div>{{item.custName}}</div>
                        <div class="item-num">{{index + 1}}楼</div>
                    </div>
                    <div class="item-content">
                      <wxParse :content="item.content" noData=""/>
                      <!-- 回复 -->
                      <div class="child-content" v-show="item.children.length>0">
                          <div v-for="(child,i) in item.children" :key="i" :track-by="i" v-if="i<10">
                              <span class="child-name">{{child.custName}}：</span>
                              <span class="child-text"><wxParse :content="child.content" noData=""/></span>
                          </div>
                      </div>
                    </div>
                    <div class="item-footer">
                        <div class="item-time">{{item.createDate}}</div>
                        <div class="item-right">
                            <div class="item-follow" @click="expandMth(index, customerRecords, item, customerRecordSave, 11)">
                                <img :src="customerRecords[index]? 'http://img.meiduduo.com/images/info/item-follow1.png': 'http://img.meiduduo.com/images/info/item-follow.png'" alt="">{{customerRecords[index]? '已赞' : '赞'}}
                            </div>
                            <div class="item-message" @click="writeShow(item)">
                                <img src="http://img.meiduduo.com/images/info/item-message.png" alt="">回复
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="toTop" v-if="topShow" @click="toTop">
          顶部
        </div>
        <writeComment v-bind="writeItem" @sendStatusM="sendStatusM(res)" @send="getList(id)"  v-if="writeCommentS"></writeComment>
    </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import writeComment from "../comm/writeComment.vue"; //广告位
export default {
  data() {
    return {
      topShow: false,
      type: "",
      id: "",
      item: {},
      comments: [],
      hign: [],
      isFollow: true,
      diaryThumbsUp: [],
      customerRecords: [],
      writeCommentS: false,
      writeItem: {
        write1: true,
        write2: false,
        sendStatus: false,
        contentId: "",
        custId: "",
        criticId: "",
        commentId: "",
        commentType: ""
      }
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    }
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
  onShow() {
    this.id = this.$route.query.id;
    this.type = this.$route.query.type;
    this.writeItem.commentType = this.type;
    this.writeItem.contentId = this.$route.query.id;
    this.writeItem.custId = this.custId;
    this.queryOneForDiaryBook(this.id);
    this.getList(this.id);
  },
  onUnload() {
    this.writeCommentS = false;
  },
  methods: {
    expandMth(index, name, diary, mth, type) {
      if (mth) {
        if (name[index] == undefined) {
          this.$set(name, index, diary["isThumbsUp"] > 0 ? false : true);
          mth(diary, name[index], type);
        } else {
          this.$set(name, index, !name[index]);
          console.log(this.item["diaryList"][index], name[index]);
          if (type == 5) {
            this.$set(
              this.item["diaryList"][index],
              "fabulousNum",
              name[index]
                ? this.item["diaryList"][index].fabulousNum + 1
                : this.item["diaryList"][index].fabulousNum - 1
            );
          }
          mth(diary, name[index], type);
        }
      } else {
        this.$set(name, index, !name[index]);
      }
    },
    sendStatusM(data) {
      console.log(this.writeItem.sendStatus);
      this.writeItem.sendStatus = data;
    },
    toTop() {
      this.topShow = false;
      wx.pageScrollTo({
        scrollTop: 0
      });
    },
    queryOneForDiaryBook(id) {
      var option = {
        custId: this.custId,
        id
      };
      this.$http.post("/diaryBook/queryOneForDiaryBook", option).then(res => {
        res.data.prePhoto = res.data.prePhoto.split(",");
        res.data.afterPhoto = res.data.afterPhoto.split(",");
        console.log(res.data);
        this.diaryThumbsUp = [];
        this.item = res.data;
        res.data.diaryList.forEach((ele, index) => {
          this.$set(
            this.diaryThumbsUp,
            index,
            ele.isThumbsUp > 0 ? true : false
          );
        });
        this.isFollow = this.item.isFollow;
        this.writeCommentS = true;
      });
    },
    getList(id) {
      var option = {
        custId: this.custId,
        contentId: id,
        commentType: this.type,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        this.customerRecords = [];
        var arr = [];
        console.log(res);
        if (res.data.data) {
          res.data.data.forEach((ele, index) => {
            this.$set(
              this.customerRecords,
              index,
              ele.isThumbsUp > 0 ? true : false
            );
            arr.push(ele);
            if (ele.children) {
              ele.children.forEach((ele1, index1) => {
                arr.push(ele1);
              });
            }
          });
        }
        this.comments = arr;
      });
    },
    customerRecordSave(item, status, type) {
      var option = {
        recordId: item.id,
        recordType: type,
        custId: this.custId,
        crType: 1,
        state: status ? 1 : -1
      };
      this.$http.post("/customerRecord/save", option).then(res => {
        // this.queryOneForDiaryBook(this.id)
        // this.getList(this.id)
      });
    },
    follow(mth, item) {
      this.$set(this, "isFollow", !this.isFollow);
      mth(item, this.isFollow);
    },
    focusRecordSave(item, status) {
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: status ? 1 : -1,
        recordType: 6
      };
      this.$http.post("/focusRecord/save", option).then(res => {});
    },
    writeShow(item) {
      this.writeItem.sendStatus = true;
      this.writeItem.commentId = item.id;
      this.writeItem.criticId = item.custId;
    },
    jump(id, type) {
      console.log(id, type);
      this.$router.push({ path: "/pages/info/diary", query: { id, type } });
    }
  }
};
</script>

<style scoped>
#info {
  background: #f1f1f1;
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
.project {
  width: 7rem;
  height: 1.42rem;
  margin: 0 auto;
  box-sizing: border-box;
  border: 1px solid #ffd35c;
  background-color: #fefdef;
  color: #999;
  font-size: 0.24rem;
  border-radius: 0.1rem;
  padding-right: 0.22rem;
  margin-bottom: 0.15rem;
  position: relative;
}
.project .left {
  float: left;
}
.project .right {
  width: 5.5rem;
  float: right;
}
.project .right div {
  height: 26rpx;
}
.project .left {
  width: 0.96rem;
  height: 1.42rem;
  background: #ffd35c;
  margin-right: 0.25rem;
}
.project .middle {
  width: 0.14rem;
  height: 1.5rem;
  position: absolute;
  background: url("http://img.meiduduo.com/images/diaryshop4.png") no-repeat
    right top;
  background-size: 0.14rem 1.5rem;
  top: -0.042rem;
  left: 0.86rem;
}
.project .left img {
  display: block;
  width: 0.46rem;
  height: 0.5rem;
  margin: 0.44rem auto 0;
}
.project .title {
  color: #333;
  font-size: 0.28rem;
  padding-top: 0.15rem;
  margin-bottom: 0.1rem;
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
.Preoperative {
  position: relative;
  padding-top: 0.94rem;
}
.Preoperative span {
  position: absolute;
  top: 0.25rem;
  left: 0;
  color: #fff;
  font-size: 0.24rem;
  line-height: 0.4rem;
  background: #ff4691;
  padding: 0 0.2rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
}
.Preoperative .img-list {
  display: flex;
  display: -webkit-flex;
  padding: 0.22rem;
}
.Preoperative .img-list img {
  /* width: 1.65rem;
        height: 1.65rem; */
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.22rem;
}

.Postoperatively .img-list {
  display: flex;
  display: -webkit-flex;
  padding: 0.22rem;
}
.Postoperatively {
  position: relative;
  padding-top: 0.74rem;
}
.Postoperatively span {
  position: absolute;
  top: 0.22rem;
  left: 0;
  color: #fff;
  line-height: 0.4rem;
  padding: 0 0.3rem;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  font-size: 0.24rem;
  background: #ff4691;
}
.Postoperatively .img-list img {
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.22rem;
}
.Postoperatively .content {
  color: #333;
  font-size: 0.24rem;
  line-height: 0.4rem;
  padding: 0 0.22rem;
  overflow: hidden;
}
.Postoperatively .content.high {
  max-height: 1.2rem;
}
.Postoperatively .content.expand {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.Preoperative .img-list img:last-of-type,
.Postoperatively .img-list img:last-of-type {
  margin-right: 0;
}
.Preoperative .img-list .pubMark,
.Postoperatively .img-list .pubMark {
  position: absolute;
  right: 0.25rem;
  top: 2.64rem;
  font-size: 0.26rem;
  height: 0.32rem;
  width: 36rpx;
  line-height: 0.32rem;
  text-align: center;
  padding: 4rpx 28rpx 4rpx 0rpx;

  background: rgba(255, 255, 255, 0.5)
    url("http://img.meiduduo.com/images/info/icon_num.png") no-repeat 36rpx
    center;
  background-size: 24rpx 24rpx;
}
.Postoperatively .img-list .pubMark {
  top: 2.64rem;
}
.operation {
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
  font-size: 0.24rem;
  color: #999;
  padding: 0.2rem 0.22rem;
}
.operation img {
  vertical-align: sub;
  margin-right: 0.1rem;
}
.operation-l {
  width: 1.9rem;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
}
.operation-l img {
  width: 0.12rem;
  height: 0.08rem;
  display: inline-block;
  margin-left: 0.1rem;
  padding-bottom: 0.1rem;
}
.operation-l .img1 {
  width: 0.26rem;
  height: 0.2rem;
  padding-bottom: 0.04rem;
}
.operation-r {
  width: 1.9rem;
  display: flex;
  justify-content: space-between;
  display: -webkit-flex;
}
.operation-r img {
  width: 0.26rem;
  height: 0.24rem;
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
  margin: 4rpx 0 60rpx;
}
.item-num {
  color: #999;
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
  margin-bottom: 0.3rem;
}
.item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
