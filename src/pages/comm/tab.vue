<template>
	<div style="background-color: #F1F1F1;">
		
		<div class="list-nav"  >
			<ul>
				<li v-for="(item, index) in titledata" :key="index" @click="changeActive(index)" :class="{active:index == activeNum}">
					<i-badge :count="item.badgeNum">
						<div class="demo-badge">{{item.title}}</div>
					</i-badge>
				</li>
			</ul>
		</div>
		
		
	</div>
</template>

<script>
export default {
  props: ["titledata", "width"],
  data() {
    return {
      // 				nav: [{
      // 						title: "待签字",
      // 						badgeNum: '3',
      // 					},
      // 					{
      // 						title: "已签字",
      // 						badgeNum: '',
      // 					},
      // 					{
      // 						title: "全部",
      // 						badgeNum: '',
      // 					}
      // 				],
      activeNum: "0"
    };
  },

  mounted() {},
  methods: {
    changeActive(index) {
      this.activeNum = index;
      this.$emit("clickactive", this.titledata[index]);
    }
  }
};
</script>

<style scoped>
.slotitem {
  margin-top: 0.3rem;
}
.list-nav {
  background: #fff;
  height: 0.87rem;
  line-height: 0.87rem;
  margin-bottom: 0.17rem;
  font-size: 0.28rem;
  position: fixed;
  /* top: 1.27rem; */
  z-index: 5;
  width: 100%;
  border-top: solid #eeeeee 1px;
}

.list-nav ul {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  padding: 0 0.3rem;
}

.list-nav ul li {
  padding: 0 0.3rem;
  position: relative;
}

.list-nav ul li.active {
  color: #ff4691;
  border-bottom: 2px solid #ff4691;
}
</style>
