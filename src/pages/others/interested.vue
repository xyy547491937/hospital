<template>
	<div class="grid-kuang">
		<div class="box">

			<div class="titel-h">
				<h3>你对什么感兴趣？</h3>
				<p>选择想看到的内容吧</p>
			</div>
			<div class="poject">
				<div class="poject-item" v-for="(item, index) in poject" :key="index">
					<p :class="{checkbox:item.isActive}"><span class="check" @click="checkedBox(item)">
						{{item.channelName}}
					</span></p>
				</div>
			</div>
			<div class="footer-h">
				<div class="footer-z">
					<span id="">
					选好了，进入首页
				</span>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.userInfo;
    }
  },
  data() {
    return {
      check: "",
      poject: [
        {
          cateName: "医美",
          isActive: false
        },
        {
          cateName: "美容院",
          isActive: false
        },
        {
          cateName: "健身",
          isActive: false
        }
      ],
      arr: []
      // 				dimensionlist: [{
      // 						collist: [{
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}]
      //
      // 					},
      // 					{
      // 						collist: [{
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}]
      //
      // 					},
      // 					{
      // 						collist: [{
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}, {
      // 							name: "Grid"
      // 						}]
      //
      // 					}
      //
      // 				]
    };
  },
  created() {},
  mounted() {
    this.$http
      .post("/channelRecord/listAll", {
        custId: this.user.custId
      })
      .then(res => {
        this.poject = res.data;
        for (var i = 0; i < this.poject.length; i++) {
          this.poject[i]["isActive"] =
            this.poject[i].hasRecord == 0 ? false : true;
        }
        this.poject = JSON.parse(JSON.stringify(this.poject));
      });
  },
  methods: {
    checkedBox(item) {
      item.isActive = !item.isActive;
    },
    jump() {
      let recordIds = [];
      this.poject.map((val, index) => {
        if (val.isActive) {
          recordIds.push(val.channelCode);
        }
      });
      this.$http
        .post("/channelRecord/updateBatch", {
          custId: this.user.custId,
          recordIds: JSON.stringify(recordIds)
        })
        .then(res => {
          if (res.code == 1) {
            wx.switchTab({
              url: "/pages/index"
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.footer-h {
  background: #fff;
  border-color: rgba(141, 39, 142, 0.75);
  -webkit-box-shadow: 0 0 18px #999;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 1.4rem;
  text-align: center;
}
.footer-z {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 60%;
  height: 30%;
  margin: auto;
}
.footer-h span {
  font-size: 0.25rem;
  border: 1px solid #ff4691;
  padding: 0.2rem 1.4rem;
  border-radius: 0.4rem;
  background: #ff4691;
  color: #fff;
}
.titel-h {
  text-align: center;
}

.titel-h h3 {
  font-size: 0.38rem;
  font-weight: 600;
}

.titel-h p {
  font-size: 0.2rem;
  color: #999999;
}

.poject-item span {
  font-size: 0.2rem;
}

.check {
  border: 1px solid #999;
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
}

.checkbox span {
  border: 1px solid #ff4691;
  padding: 0.2rem 0.4rem;
  border-radius: 0.4rem;
  color: #ff4691;
}

.grid-kuang {
  background-color: #ffffff;
}

.box {
  margin-bottom: 0.17rem;
  background: #fff;
}

.banner {
  padding-top: 0.17rem;
}

.banner img {
  height: 3.6rem;
  width: 100%;
}

.poject {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  background: #fff;
  text-align: center;
  padding: 0.31rem 0.34rem 0.41rem 0.21rem;
}

.poject .poject-item {
  width: 33.33%;
}

.poject .poject-item > span {
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  margin: 0.2rem;
}

.poject .poject-item {
  width: 33.33%;
  margin-bottom: 0.5rem;
}

.poject .poject-item > span {
  width: 0.6rem;
  height: 0.6rem;
  display: inline-block;
  margin: 0.2rem;
}

.poject .poject-item img {
  width: 0.6rem;
  height: 0.6rem;
}
</style>
