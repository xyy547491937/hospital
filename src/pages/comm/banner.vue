<template>
	<div>
		<!-- <div class="banner">
			<img :src="imgsrc" >
		</div> -->
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000">
			<block v-for="(item, index) in movies" :index="index" :key="index">
				<swiper-item>
					<image :src="item.pictureUrl" class="slide-image" mode="scaleToFill" />
				</swiper-item>
			</block>
		</swiper>

	</div>
</template>

<script>
export default {
  props: ["imgsrc"],
  data() {
    return {
      movies: [
        {
          pictureUrl: "http://fs.meiduduo.com/oa/OA/other/1530237590667.png"
        },
        {
          pictureUrl: "http://fs.meiduduo.com/oa/OA/other/1530237590667.png"
        },
        {
          pictureUrl: "http://fs.meiduduo.com/oa/OA/other/1530237590667.png"
        }
      ]
    };
  },
  onShow () {
    // this.getBannerImg()
  },
  mounted() {
    // this.getBannerImg()
  },
  methods: {
    getBannerImg () {
      this.$http.post('advertRecord/selAdvertRecord', {
        place: 3
      }).then(res => {
        if (res.code === 1) {
          if (res.data instanceof Object) {
            this.movies.push(res.data)
          }
          if (res.data instanceof Array) {
            this.movies.concat(res.data)
          }
        }
      })
    }
  }
};
</script>

<style scoped>
.swiper {
  height: 180px;
}
.slide-image {
  width: 100%;
  height: 180px;
}
/* 	.banner {
		padding-top: .17rem;
		background-color: #FFFFFF;
	}

	.banner img {
		height: 3.6rem;
		width: 100%;
	} */
</style>
