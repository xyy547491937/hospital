<template>
    <div class="information">
        <div class="main">
            <div class="title">{{information.title}}</div>
            <div class="infor_top_detail">
                <span class="detail_left">
                    <img :src="information.authorIcon"> <em class="detail_source">{{information.source}}</em><br> <em class="detail_fromNow">{{information.releaseTime ? information.releaseTime : ''}}</em>
                </span>
                <span v-if="information.isFollow >= -1 && information.isFollow != -1"  class="follow" @click="publicMth('isFollow',focusRecordSave,information)">{{isFollow ? '已关注' : '+关注'}}</span>
            </div>
            <div class="content">
              <wxParse :content="information.content" noData=""/>
            </div>
            <div class="operation" v-if="type != 10" >
                <span class="fabulous" @click="publicMth('isThumbsUp',customerRecordSave,information)">
                    <img :src="isThumbsUp ? img.zan.yes : img.zan.no" alt="">{{information.fabulousNum}}
                </span>
                <span class="collection" @click="publicMth('isFavourite',storeRecordSave,information)">
                    <img :src="isFavourite ? img.collection.yes : img.collection.no" alt="">{{information.favouriteNum}}
                </span>
            </div>
            <div class="operation1">
                <span class="fabulous" @click="publicMth('isThumbsUp',customerRecordSave,information)">
                    <img :src="isThumbsUp? img.zan.yes : img.zan.no" alt="">{{information.fabulousNum}}
                </span>
            </div>
            <div class="information_review" v-for="(item, index) of comments" :key="index">
                <div>
                    <div class="review_main">
                        <div class="review_head">
                            <img :src="item.icon">
                        </div>
                        <div class="review_content">
                            <div class="review_title">
                                <span class="review_name">{{item.custName}}</span>
                                <span class="review_num" @click="publicMth(customerRecords, customerRecordSave, item, index)">
                                  <img :src="item.isThumbsUp > 0 ? img.zan.yes : img.zan.no" alt="">
                                  <em>{{item.fabulousNum}}</em></span>
                            </div>
                            <div class="review_matter2">
                                <div class="review_matter">
                                  <wxParse :content="item.content" noData=""/>
                                </div>
                                <!-- 回复 -->
                                <div class="child-content" v-show="item.children && item.children.length>0">
                                    <div v-for="(child,i) in item.children" :key="i" :track-by="i" v-if="i<10">
                                        <span class="child-name">{{child.custName}}：</span>
                                        <span class="child-text"><wxParse :content="child.content" noData=""/></span>
                                    </div>
                                </div>
                            </div>
                            <p class="review_other">
                                <span>{{item.createDate}}</span> <span @click="writeShow(item)">回复</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <writeComment @send="getList(id)" @sendStatusM="sendStatusM(res)" v-bind="writeItem" v-if="writeCommentS"></writeComment>
    </div>
</template>

<script>
import wxParse from "mpvue-wxparse";
import writeComment from "../comm/writeComment.vue"; //广告位
export default {
  data() {
    return {
      id: "",
      type: "",
      writeCommentS: false,
      isFollow: "",
      isFavourite: "",
      isThumbsUp: "",
      comments: [],
      customerRecords: [],
      writeItem: {
        write1: false,
        write2: true,
        sendStatus: false,
        contentId: "",
        custId: "",
        criticId: "",
        commentId: "",
        commentType: ""
      },
      information: {},
      img: {
        zan: {
          no: "/static/images/info/zan1.png",
          yes: "/static/images/info/zan2.png"
        },
        collection: {
          no: "/static/images/info/nolike.png",
          yes: "/static/images/info/like.png"
        }
      }
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    }
  },
  components: {
    writeComment,
    wxParse
  },
  onShow() {
    this.id = this.$route.query.id;
    console.log(this.$route.query.id, this.id, this.$store.state);
    this.type = this.$route.query.type;
    this.writeItem.commentType = this.type;
    this.writeItem.contentId = this.$route.query.id;
    this.writeItem.custId = this.custId;
    if (this.type == 10) {
      this.queryOneByPkAndUserId(this.id);
    } else {
      this.infoQueryOneByPkAndUserId(this.id);
    }
    this.getList(this.id);
  },
  onUnload() {
    this.writeCommentS = false;
  },
  methods: {
    publicMth(data, mth, item, index) {
      if (index >= 0) {
        this.$set(data, index, !data[index]);
        console.log(index, 666);
        mth(item, data[index], index);
      } else {
        this.$set(this, data, !this[data]);
        if (data == "isThumbsUp") {
          this.$set(
            item,
            "fabulousNum",
            this[data] ? item.fabulousNum + 1 : item.fabulousNum - 1
          );
        }
        if (data == "isFavourite") {
          this.$set(
            item,
            "favouriteNum",
            this[data] ? item.favouriteNum + 1 : item.favouriteNum - 1
          );
        }
        mth(item, this[data]);
      }
    },
    sendStatusM(data) {
      console.log(this.writeItem.sendStatus);
      this.writeItem.sendStatus = data;
    },
    queryOneByPkAndUserId(id) {
      var option = {
        type: this.type,
        id,
        custId: this.custId
      };
      console.log(this.custId);
      this.$http.post("/article/queryOneByPkAndUserId", option).then(res => {
        this.information = res.data;
        this.writeCommentS = true;
        if (res.data.isFollow === 0) {
          this.isFollow = false;
        } else if (res.data.isFollow === 1) {
          this.isFollow = true;
        } else {
          this.isFollow = -1;
        }
        this.isFavourite = res.data.isFavourite > 0 ? true : false;
        this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
      });
    },
    infoQueryOneByPkAndUserId(id) {
      var option = {
        type: this.type,
        id,
        custId: this.custId
      };
      this.$http.post("/info/queryOneByPkAndUserId", option).then(res => {
        this.information = res.data;
        this.writeCommentS = true;
        if (res.data.isFollow === 0) {
          this.isFollow = false;
        } else if (res.data.isFollow === 1) {
          this.isFollow = true;
        } else {
          this.isFollow = -1;
        }
        this.isFavourite = res.data.isFavourite > 0 ? true : false;
        this.isThumbsUp = res.data.isThumbsUp > 0 ? true : false;
      });
    },
    getList(id) {
      var option = {
        contentId: id,
        custId: this.custId,
        commentType: this.type,
        pageNum: 1,
        pageSize: 15
      };
      this.$http.post("/comment/list4Page", option).then(res => {
        this.customerRecords = [];
        res.data.data.forEach((ele, index) => {
          this.$set(
            this.customerRecords,
            index,
            ele.isThumbsUp > 0 ? true : false
          );
        });
        this.comments = res.data.data;
      });
    },
    customerRecordSave(item, status, index) {
      var option = {
        recordId: item.id,
        custId: this.custId,
        recordType: index >= 0 ? 11 : this.type,
        crType: 1,
        state: status ? 1 : -1
      };
      this.$http.post("/customerRecord/save", option).then(res => {
        if (index >= 0) {
          this.getList(this.id);
        }
      });
    },
    storeRecordSave(item) {
      var option = {
        custId: item.custId,
        recordId: item.recordId,
        recordType: item.recordType,
        state: status ? 1 : -1
      };
      this.$http.post("/storeRecord/save", option).then(res => {
        if (this.type == 10) {
          this.queryOneByPkAndUserId(this.id);
        } else {
          this.infoQueryOneByPkAndUserId(this.id);
        }
      });
    },
    focusRecordSave(item, status) {
      console.log(this);
      let type = "";
      if (item.createType == 0 && item.authorType == 0) {
        type = 2;
      } else {
        type = 6;
      }
      var recordType;
      var option = {
        recordId: item.author,
        custId: this.custId,
        state: status ? 1 : -1,
        recordType: type
      };
      this.$http.post("/focusRecord/save", option).then(res => {
        // if (this.type == 10) {
        //   this.queryOneByPkAndUserId(9)
        // } else {
        //   this.infoQueryOneByPkAndUserId(this.id)
        // }
      });
    },
    writeShow(item) {
      this.writeItem.sendStatus = true;
      this.writeItem.commentId = item.id;
      this.writeItem.criticId = item.custId;
    }
  }
};
</script>

<style scoped>
@import url("~mpvue-wxparse/src/wxParse.css");
.information {
  font-family: PingFangSC-Regular;
}
.main {
  padding: 0 0.24rem 82rpx;
}
.title {
  font-size: 0.38rem;
  color: #333;
  font-weight: bold;
  font-family: PingFangSC-Regular;
  margin-bottom: 0.44rem;
}
.infor_top_detail {
  margin-top: 0.4rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin-bottom: 0.48rem;
  justify-content: space-between;
}
/* .infor_top_detail>span {
        -webkit-box-flex: 0.5;
        -webkit-flex: 0.5;
        flex: 0.5;
    } */
.detail_left {
  width: 3rem;
}
.detail_left > img {
  width: 0.62rem;
  height: 0.62rem;
  float: left;
  border-radius: 50%;
  margin-right: 0.2rem;
}
.detail_left > .detail_source {
  font-size: 0.24rem;
  color: #333333;
}
.detail_left > .detail_fromNow {
  font-size: 0.24rem;
  color: #cccccc;
}
.content {
  font-family: PingFangSC;
  font-size: 0.24rem;
}
.content p {
  font-size: 0.24rem;
  line-height: 0.5rem;
  margin-bottom: 0.5rem;
}
.operation {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  padding: 0 1rem;
  margin-bottom: 0.6rem;
}
.operation1 {
  width: 1.52rem;
  height: 0.55rem;
  padding: 0 1rem 0.6rem;
  margin: 0 auto;
}
.operation span,
.operation1 span {
  display: inline-block;
  width: 1.52rem;
  height: 0.55rem;
  border: 1px solid #ccc;
  border-radius: 0.28rem;
  font-size: 0.24rem;
  color: #999;
  line-height: 0.55rem;
  text-align: center;
}
.operation span img,
.operation1 span img {
  width: 0.26rem;
  height: 0.27rem;
  vertical-align: middle;
  margin-right: 0.11rem;
}
.follow {
  width: 1.4rem;
  height: 0.56rem;
  background: rgba(255, 70, 145, 1);
  border-radius: 10px;
  font-size: 0.3rem;
  color: #fff;
  text-align: center;
  line-height: 0.56rem;
}
.information_content {
  background: #ffffff;
  width: 100%;
  min-height: 100%;
  display: inline-block;
  padding: 0 0.26rem 1rem;
}
.review_main {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.review_head,
.review_head > img {
  width: 0.67rem;
  height: 0.68rem;
  border-radius: 50%;
}
.review_content {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding-left: 0.25rem;
}
.review_title {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.review_matter2 {
  margin-top: 0.3rem;
}
.review_title > span {
  -webkit-box-flex: 0.5;
  -webkit-flex: 0.5;
  flex: 0.5;
}
.review_name {
  font-size: 0.28rem;
  color: #0f5893;
  height: 29rpx;
  line-height: 29rpx;
}
.review_title > .review_num {
  text-align: right;
  height: 29rpx;
  line-height: 29rpx;
}
.review_num > img {
  width: 0.31rem;
  height: 0.29rem;
}
.review_num > em {
  color: #cccccc;
  line-height: 0.29rem;
  display: inline-block;
  padding-left: 5px;
}
.review_matter {
  font-size: 0.24rem;
  color: #333333;
  line-height: 0.45rem;
}
.review_other span {
  height: 0.4rem;
  padding-right: 0.22rem;
  line-height: 0.4rem;
  color: #b4b4b4;
  font-size: 0.18rem;
}
</style>
