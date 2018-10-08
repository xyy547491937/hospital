<template>
	<div style="background-color: #F1F1F1;height: 100%;width:100%">
		<div>
			<tab :titledata="titledata" @clickactive="clickactive"></tab>
		</div>
		<div>&nbsp;</div>
		<div class="collect-kuang">
			<!-- 不带频道的小视频 -->
			<div v-if="onclick=='项目'">
				<project title="共30条收藏" moreshow="false" titlesize="0.7rem" titleColor="#A8A8A8" v-if="projectList.length">
					<typeProject :list="projectList"></typeProject>
				</project>
			</div>
			<div v-if="onclick=='小视频'">
				<div v-if="videoList.length > 0">
					<div>
						<div v-for="(item,index) of videoList" :key="index">
							<smallVideo :data="item">
								<videoPlay :videoSrc="item.videoUrl"></videoPlay>
							</smallVideo>
						</div>
					</div>
					<!-- <project title="共30条收藏" moreshow="false" titlesize="0.7rem" titleColor="#A8A8A8">
						<div v-for="(item,index) of videoList" :key="index">
							111
							<smallVideo>
								<videoPlay videoSrc="http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ"></videoPlay>
							</smallVideo>
						</div>

					</project> -->
				</div>
			</div>
			<div v-if="onclick=='资讯'" >
				<project title="共30条收藏" moreshow="false" titlesize="0.7rem" titleColor="#A8A8A8" v-if="informationList.length">
					<typeArticle :list="informationList"></typeArticle>
				</project>
			</div>
		</div>

	</div>
</template>

<script>
import tab from "../comm/tab.vue";
import videoPlay from "../comm/videoPlay.vue"; //视频主体
import smallVideo from "../comm/smallVideo.vue"; //视频框
import project from "../comm/project.vue"; //不带频道名字外部框
import typeProject from "../comm/typeProject.vue"; //项目列表
import typeArticle from "../comm/typeArticle.vue"; //文章列表

export default {
  components: {
    tab,
    videoPlay,
    smallVideo,
    project,
    typeProject,
    typeArticle
  },
  data() {
    return {
      titledata: [
        {
          title: "项目",
          badgeNum: "3"
        },
        {
          title: "小视频",
          badgeNum: "9"
        },
        {
          title: "资讯",
          badgeNum: "4"
        }
      ],
      onclick: "项目",
      projectList: [],
      videoList: 2,
      informationList: []
    };
  },
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  mounted() {
    this.getDate();
  },
  methods: {
    clickactive(out) {
      // console.log(JSON.stringify(out))
      this.onclick = out.title;
      switch (out.badgeNum) {
        case "3":
          this.getDate();
          break;
        case "4":
          this.getDate("4");
          break;
        case "9":
          this.getDate("9");
          break;
      }
    },
    getDate(index) {
      console.log(this.user);
      var index = index || "3";
      this.$http
        .post("/storeRecord/list4Page", {
          custId: this.user.custId,
          recordType: index
        })
        .then(res => {
          switch (index) {
            case "3":
              this.projectList = res.data;
              break;
            case "4":
              this.informationList = res.data;
              break;
            case "9":
              this.videoList = res.data;
              console.log(this.videoList, 445556);
              break;
          }
        });
    }
  }
};
</script>

<style scoped>
.collect-kuang {
  margin-top: 0.5rem;
}
</style>
