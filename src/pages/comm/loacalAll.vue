<template>
<div>
  <div class="itemList" v-for="(item, index) in itemList" :key="index">
    <div class="article-kuang">
    <div class="article-all">
      <div class="article" v-if="item.recordType === 10">
        <i-row span="24" class="article-title" @click="jump1(item.id, item.recordType)">{{item.title}}</i-row>
        <!-- 一张图 -->
        <i-row span="24" class="article-img">
          <img :src="item.cover" alt="">
        </i-row>
        <i-row class="article-bottom">
          <i-col span="16">{{item.source}}
            <i-icon type="browse" size="14" />
            <span>{{item.readNum}}</span>
          </i-col>
          <i-col span="4">
            <i-icon type="message" size="14" style="text-align: center;" />
            <span>{{item.commentNum}}</span>
          </i-col>
          <i-col span="4">
            <i-icon  :color="item.isThumbsUp === 1 ? '#ff4691' : ''" :type="item.isThumbsUp === 1 ? 'praise_fill' : 'praise'" size="14" style="text-align: center;"  @click="praise(item)"/>
            <span>{{item.fabulousNum}}</span>
          </i-col>
          <!-- <i-col span="4">
            <i-icon type="like" size="14" style="text-align: center;" />
            <span>{{item.id}}</span>
          </i-col> -->
        </i-row>
      </div>

      <!-- <div class="article"  v-if="item.recordType === 10">
        <i-row span="24" class="article-title"  @click="jump1(item.id, item.recordType)">{{item.title}}</i-row> -->
        <!-- 两张图 -->
        <!-- <i-row span="24" class="article-img">
          <i-col span="12">
            <img :src="item.cover" >
          </i-col>
          <i-col span="12">
            <img :src="item.prePhoto">
          </i-col>
        </i-row>
        <i-row class="article-bottom">
          <i-col span="16">{{item.source}}
            <i-icon type="browse" size="14" />
            <span>{{item.readNum}}</span>
          </i-col>
          <i-col span="4">
            <i-icon type="message" size="14" style="text-align: center;" />
            <span>{{item.commentNum}}</span>
          </i-col>
          <i-col span="4">
            <i-icon :color="item.isThumbsUp === 1 ? '#ff4691' : ''" :type="item.isThumbsUp === 1 ? 'praise_fill' : 'praise'" size="14" style="text-align: center;"  @click="praise(item)" />
            <span>{{item.fabulousNum}}</span>
          </i-col> -->
          <!-- <i-col span="4">
            <i-icon type="like" size="14" style="text-align: center;" />
            <span>{{item.id}}</span>
          </i-col> -->
        <!-- </i-row>
      </div> -->

      <!-- <div class="article"  v-if="item.recordType === 10">
        <i-row span="24" class="article-title" @click="jump1(item.id, item.recordType)">{{item.title}}</i-row> -->
        <!-- 三张图 -->
        <!-- <i-row span="24" class="article-img">
          <i-col span="8">
            <img :src="item.cover" alt="">
          </i-col>
          <i-col span="8">
            <img :src="item.prePhoto" alt="">
          </i-col>
          <i-col span="8">
            <img :src="item.afterPhoto" alt="">
          </i-col>
        </i-row>
        <i-row class="article-bottom">
          <i-col span="16">{{item.source}}
            <i-icon type="browse" size="14" />
            <span>{{item.readNum}}</span>
          </i-col>
          <i-col span="4">
            <i-icon type="message" size="14" style="text-align: center;" />
            <span>{{item.commentNum}}</span>
          </i-col>
          <i-col span="4" >
            <i-icon :color="item.isThumbsUp === 1 ? '#ff4691' : ''" :type="item.isThumbsUp === 1 ? 'praise_fill' : 'praise'" size="14" style="text-align: center;" @click="praise(item)"/>
            <span>{{item.fabulousNum}}</span>
          </i-col> -->
          <!-- <i-col span="4">
            <i-icon type="like" size="14" style="text-align: center;" />
            <span>{{item.id}}</span>
          </i-col> -->
        <!-- </i-row>
      </div> -->
    </div>
  </div>
	<div>
		<div class="typeDiary-kuang" v-if="item.recordType === 7">
			<div class="typeDiary-title">
				<i-row span="24">
					<i-col span="2">
						<div class="typeDiary-img">
							<img :src="item.icon" alt="">
						</div>
					</i-col>
					<i-col span="20" class="typeDiary-name" @click="jump(item.id, item.recordType)">
						{{item.nickName}}
					</i-col>
				</i-row>
			</div>
			<div>
				<i-row span="24">
					<i-col span="12">
						<div class="typeDiary-before">
							<img :src="item.prePhoto" class="typeDiary-before-img">
							<img src="http://img.meiduduo.com/images/index/Before.png" class="typeDiary-pos">
						</div>

					</i-col>
					<i-col span="12">
						<div class="typeDiary-before">
							<img :src="item.afterPhoto" class="typeDiary-before-img">
							<img src="http://img.meiduduo.com/images/index/After.png" class="typeDiary-pos">
						</div>
					</i-col>
				</i-row>
				<div>
					<span class="typeDiary-details">
						{{item.content}}
					</span>
				</div>
				<!-- <div class="div-type">
					<i-icon type="label" color="#FF4892" size="20" />
					<span class="typeDiary-type">{{item.id}}</span>
				</div> -->
				<div class="div-hos" @click="jump4(item)">
					<i-row span="24">
						<i-col span="20">
							<div class="div-hos-left">
								<img src="http://img.meiduduo.com/images/index/bye_icon.png" alt="">{{item.commName}}
							</div>
						</i-col>
						<i-col span="4">
							<div class="typeDiary-price">￥{{item.rulePrice}}</div>
						</i-col>
					</i-row>

				</div>
				<div class="typeDiary-bottom">
					<i-row>
						<i-col span="16">
							<i-icon type="browse" size="14" />
							<span>{{item.readNum}}</span>
						</i-col>
						<i-col span="4">
							<i-icon type="message" size="14" style="text-align: center;" />
							<span>{{item.commentNum}}</span>
						</i-col>
						<i-col span="4" >
							<i-icon :color="item.isThumbsUp === 1 ? '#ff4691' : ''" :type="item.isThumbsUp === 1 ? 'praise_fill' : 'praise'" size="14" style="text-align: center;" @click="praise(item)" />
							<span>{{item.fabulousNum}}</span>
						</i-col>
						<!-- <i-col span="4">
							<i-icon type="like" size="14" style="text-align: center;" />
							<span>{{item.id}}</span>
						</i-col> -->
					</i-row>
				</div>

			</div>

		</div>
	</div>
  <div style="background-color: #FFFFFF;" v-if="item.recordType === 9">
		<div class="smallVideo-kuang">

			<div @click="jump3(item.id, item.recordType)">
          <img :src="item.cover"/>
			</div>
			<div>
				<span class="smallVideo-details">
					{{item.content}}
				</span>
			</div>
			<div class="typeDiary-bottom">
				<i-row>
					<i-col span="12">
						<i-col span="4">
							<div class="typeDiary-img">
								<img :src="item.icon" alt="">
							</div>
						</i-col>
						<i-col span="20" class="typeDiary-name"  @click="jump3(item.id, item.recordType)">
							<div style="margin-top: .1rem;">{{item.nickName}}</div>
						</i-col>
					</i-col>
					<i-col span="4">
						<i-icon type="message" size="14" style="text-align: center;" />
						<span>{{item.commentNum}}</span>
					</i-col>
					<i-col span="4" >
						<i-icon :color="item.isThumbsUp === 1 ? '#ff4691' : ''" :type="item.isThumbsUp === 1 ? 'praise_fill' : 'praise'" size="14" style="text-align: center;" @click="praise(item)"/>
						<span>{{item.fabulousNum}}</span>
					</i-col>
					<i-col span="4">
						<i-icon :color="item.isFavourite === 1 ? '#ff4691' : ''" :type="item.isFavourite === 1 ? 'like_fill' : 'like'" size="14" style="text-align: center;"  @click="collect(item)"/>
						<span>{{item.favouriteNum}}</span>
					</i-col>
				</i-row>
			</div>
		</div>
    </div>
	</div>
</div>

</template>

<script>
import videoPlay from "../comm/videoPlay.vue"; //视频主体
export default {
  data() {
    return {
      itemList: []
    };
  },
  computed: {
    custId() {
      return this.$store.state.userInfo.custId;
    }
  },
  components: {
    videoPlay
  },
  onLoad() {
    this.getFocusInfo(this.custId);
  },
  onShow() {
    console.log(this.custId);
    this.getFocusInfo(this.custId);
  },
  methods: {
    getFocusInfo(custId) {
      this.$http
        .post("/focusRecord/getFocusInfo", {
          custId: custId,
          pageNum: 1,
          pageSize: 15
        })
        .then(res => {
          this.itemList = res.data;
        });
    },
    // 收藏
    storeRecordSave(item) {
      var option = {
        custId: item.custId,
        recordId: item.recordId,
        recordType: item.recordType
      };
      this.$http.post("/storeRecord/save", option).then(res => {
        if (this.type == 10) {
          this.queryOneByPkAndUserId(this.id);
        } else {
          this.infoQueryOneByPkAndUserId(this.id);
        }
      });
    },
    // 点赞
    customerRecordSave(item, status) {
      var option = {
        recordId: item.id,
        recordType: item.recordType,
        custId: item.custId,
        crType: 1,
        state: item.status ? 1 : -1
      };
      this.$http.post("/customerRecord/save", option).then(res => {
        this.getFocusInfo(this.custId);
      });
    },
    jump(id, type) {
      this.$router.push({
        path: "/pages/info/diary_info",
        query: { id: id, type: 7 }
      });
    },
    jump3(id, type) {
      this.$router.push({
        path: "/pages/info/video_info",
        query: { id: id, type: type }
      });
    },
    jump4(item) {
      // this.$router.push({path: '/pages/info/video_info'})
    },
    jump1(id, type) {
      this.$router.push({
        path: "/pages/info/information",
        query: { id: id, type: type }
      });
    },
    praise(item) {
      var option = {
        recordId: item.id,
        custId: item.custId,
        recordType: item.recordType,
        crType: 1,
        state: status ? 1 : -1
      };
      this.$http.post("/customerRecord/save", option).then(res => {
        this.list4Page(this.custId);
      });
    },
    collect(item) {
      var option = {
        custId: item.custId,
        recordId: item.recordId,
        recordType: item.recordType,
        state: status ? 1 : -1
      };
      this.$http.post("/storeRecord/save", option).then(res => {
        this.list4Page(this.custId);
      });
    }
  }
};
</script>

<style scoped>
.smallVideo-kuang {
  width: 94%;
  margin: auto;
  padding: 0.2rem 0;
}
.smallVideo-kuang {
  display: inline-block;
  width: 100%;
}
.smallVideo-details {
  margin: 0.15rem;
  color: #666666;
  font-size: 0.26rem;
  /* margin-bottom: .1rem; */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.typeDiary-bottom {
  margin: 0.2rem 0 0.1rem 0.2rem;
  font-size: 0.25rem;
  color: #acacac;
}
.typeDiary-img {
  width: 0.4rem;
  height: 0.4rem;
}
.typeDiary-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.typeDiary-bottom {
  padding: 0.18rem 0;
  font-size: 0.25rem;
  color: #acacac;
}
.typeDiary-price {
  font-size: 0.2rem;
}
.div-hos {
  margin: 0.1rem 0;
  padding: 0.1rem 0 0.1rem 0.2rem;
  background-color: #f5f5f5;
}
.div-hos img {
  vertical-align: sub;
  height: 0.3rem;
  width: 0.3rem;
  margin-right: 6rpx;
}
.div-hos-left {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  font-size: 0.23rem;
}
.div-type {
  margin-left: 0.2rem;
}
.typeDiary-type {
  color: #ff4892;
  margin-left: 0.1rem;
  font-size: 0.3rem;
}
.typeDiary-details {
  margin: 0.15rem;
  color: #666666;
  font-size: 0.26rem;
  /* margin-bottom: .1rem; */
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.typeDiary-pos {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1rem;
  height: 0.3rem;
}
.typeDiary-before {
  width: 3.42rem;
  height: 3.7rem;
  border-radius: 0.1rem;
  position: relative;
  overflow: hidden;
  margin-left: 0.1rem;
}
.typeDiary-before-img {
  height: 100%;
  width: 100%;
}
.typeDiary-title {
  padding: 0.28rem 0 0.24rem;
}
.typeDiary-name {
  font-size: 0.3rem;
}
.typeDiary-kuang {
  background: #fff;
  margin-bottom: 0.18rem;
  padding: 0 0.24rem;
}
.typeDiary-img {
  width: 0.4rem;
  height: 0.4rem;
}
.typeDiary-img img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.article {
  background: #fff;
  margin-bottom: 0.3rem;
  padding: 0.34rem 0.26rem;
  margin-bottom: 0.18rem;
}
.article-kuang {
  padding-top: 0.2rem;
}
.article-title {
  font-size: 0.3rem;
}
.article-img {
  height: 3rem;
}
.article-img img {
  margin: 0.2rem 0;
  height: 3rem;
  width: 98%;
}
.article-bottom {
  font-size: 0.25rem;
  color: #acacac;
}
</style>
