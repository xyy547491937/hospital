<template>
	<div class="basic">
		<hr style="height:0.1rem;border:none;border-top:0.1rem solid #EEEEEE;" />
		<div style="background-color: #FFFFFF;">
		<div class="item" @click="jump(item)" v-for="(item,index) in list" :key="index">
			<div class="item-top">
				<div class="item-img">
					<img :src="item.icon" alt="">
				</div>
				<div class="info">
					<div class="title-yy">
						{{item.name}}
					</div>
					<p class="addr"> {{item.content}} <span>已关注</span>  </p>	
					<div class="price">
						<span class="count-buy">已约<span>{{item.number?item.number:0}}</span></span>
					</div>
				</div>
			</div>
			<!-- <div class="item-top">
				<div class="item-img">
					<img src="http://fs.meiduduo.com/oa/OA/other/1530174436360.jpg" alt="">
				</div>
				<div class="info">
					<div class="title-yy">
						石家庄贵美人医疗美容医院
					</div>
					<p class="addr"> 省重点医疗机构 <span>已关注</span>  </p>	
					<div class="price">
						<span class="count-buy">已约<span>5万+</span></span>
					</div>
				</div>
			</div> -->
						
		</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {
    this.$http
      .post("/focusRecord/list4Page", {
        custId: this.user.custId
      })
      .then(res => {
        console.log(res.data);
        this.list = res.data.data;
        console.log(this.list, 456456);
      });
  },
  methods: {
    jump(item) {
      switch (item.recordType) {
        case "2":
          break;
        case "3":
          break;
        case "6":
          break;
      }
    }
  }
};
</script>

<style scoped>
.addr span {
  border: solid #eeeeee 1px;
  padding: 0.1rem 0.2rem;
  border-radius: 1rem;
  margin-left: 2rem;
  float: right;
}
.basic {
  background-color: #f1f1f1;
  height: 100%;
  width: 100%;
}
.price-old {
  text-decoration: line-through;
  font-weight: normal;
}

.price-span {
  color: #ff5097;
  font-weight: bold;
  margin-right: 0.2rem;
}

.item {
  margin-bottom: 0.3rem;

  width: 94%;
  margin-left: 3%;
}

.item-top {
  display: flex;
  display: -webkit-flex;
  padding: 0.17rem 0.17rem 0.17rem 0;
  margin-bottom: 0.1rem;
  border-bottom: 1px solid #eeeeee;
}

.item .item-img {
  width: 1.9rem;
  height: 1.9rem;
  border-radius: 0.2rem;
}

.item .item-img img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.item .info {
  padding-top: 0.2rem;
  padding-left: 0.29rem;
  width: 80%;
  font-weight: bold;
}

.item .info .title-yy {
  font-size: 0.28rem;
  font-weight: bold;
}

.item .info .addr {
  font-size: 0.24rem;
  color: #999;
  line-height: 0.6rem;
  margin: 0.1rem 0;
}

.item .price {
  font-size: 0.24rem;
  color: #999;
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.item .price em {
  font-size: 0.3rem;
  color: #ff4691;
  font-weight: 500;
}

.item .price em > i {
  font-size: 0.26rem;
  font-weight: normal;
}

.item .price em > b {
  font-size: 0.2rem;
  font-weight: normal;
}

.item .price del {
  font-weight: normal;
  color: #bbbbbb;
  font-size: 0.24rem;
}
.count-c {
  display: -webkit-box;
  display: flex;
  display: -webkit-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-top: 0.15rem;
}
.item .count-buy {
  font-size: 0.24rem;
  color: #bbbbbb;
  text-align: left;
  font-weight: 100;
}
.item .count-buy span {
  color: #ff4691;
}
.count-collection-btn,
.count-collection-btn1 {
  text-align: right;
}

.count-collection-btn > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #ffa6da;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #fb84bc;
  line-height: 0.41rem;
}

.count-collection-btn1 > span {
  width: 1.2rem;
  height: 0.41rem;
  border: 1px solid #eeeeee;
  display: inline-block;
  text-align: center;
  border-radius: 0.2rem;
  color: #999999;
  line-height: 0.41rem;
}

.count-collection-btn > span > img {
  width: 0.2rem;
  height: 0.17rem;
}

.count-collection-btn > span > em {
  font-size: 0.24rem;
}

.item .active {
  font-size: 0.25rem;
  color: #555555;
  margin-bottom: 0.2rem;
}

.item .active span {
  color: #fff;
  padding: 0.02rem 0.05rem;
  border-radius: 0.06rem;
}

.item .active span.red {
  background: #ff96be;
  margin-right: 0.2rem;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.item .active span.green {
  background: #69e1d7;
  padding: 0.05rem 0.1rem 0.05rem 0.1rem;
}

.count {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  color: #cccccc;
  line-height: 0.6rem;
  padding-left: 0.1rem;
}

.count .praise {
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}

.count img {
  width: 0.22rem;
  vertical-align: initial;
}

.count span {
  padding: 0 0.1rem 0 0;
}
</style>
