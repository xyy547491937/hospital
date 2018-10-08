<template>
	<div>
		<div v-if="list.length > 0" @click="jump(item)" v-for="(item, index) of list" :key="index" class="typeDiary-kuang">
			<div class="typeDiary-title">
				<i-row span="24">
					<i-col span="2">
						<div class="typeDiary-img">
							<img :src="item.authorIcon" alt="">
						</div>
					</i-col>
					<i-col span="18" class="typeDiary-name">
						{{ item.authorName }}
					</i-col>
					<i-col span="4" class="typeDiary-name" @click.stop="focus(item)">
						<span v-if="item.isFollow != -1" class="add_btn">
							<i-icon v-if="!item.isFollow" type="add" />
							<i-icon v-else type="right" />
							<span v-if="!item.isFollow"> 关注</span>
							<span v-else> 已关注</span>
						</span>
					</i-col>
				</i-row>
			</div>
			<div>
				<i-row span="24">
					<i-col v-if="item.preFirstPhoto" span="12">
						<div class="typeDiary-before">
							<img :src="item.preFirstPhoto" class="typeDiary-before-img">
							<img src="http://img.meiduduo.com/images/index/Before.png" class="typeDiary-pos">
						</div>

					</i-col>
					<i-col v-if="item.afterFirstPhoto" span="12">
						<div class="typeDiary-before">
							<img :src="item.afterFirstPhoto" class="typeDiary-before-img">
							<img src="http://img.meiduduo.com/images/index/After.png" class="typeDiary-pos">
						</div>
					</i-col>
				</i-row>
				<div>
					<rich-text :nodes="item.diaryContent" class="typeDiary-details">
						<!-- {{ item.diaryContent }} -->
					</rich-text>
				</div>
				<div class="div-type">
					<i-icon type="label" color="#FF4892" size="20" />
					<span class="typeDiary-type">{{ item.commName }}</span>
				</div>
				<div class="div-hos">
					<i-row span="24">
						<i-col span="20">
							<div class="div-hos-left">
								<img src="http://img.meiduduo.com/images/index/bye_icon.png" alt=""> {{ item.commName }}
							</div>
						</i-col>
						<i-col span="4">
							<div class="typeDiary-price">￥{{ item.rulePrice }}</div>
						</i-col>
					</i-row>

				</div>
				<div class="typeDiary-bottom">
					<i-row>
						<i-col span="16">
							<i-icon type="browse" size="14" />
							<span>{{ item.readNum }}</span>
						</i-col>
						<i-col span="4">
							<i-icon type="message" size="14" style="text-align: center;" />
							<span>{{ item.commentNum }}</span>
						</i-col>
						<i-col @click.stop="like(item)" span="4">
							<i-icon v-if="item.isThumbsUp != 0"  color="#FF4892" type="praise_fill" size="14" style="text-align: center;" />
							<i-icon v-else type="praise" size="14" style="text-align: center;" />
							<span>{{ item.fabulousNum }}</span>
						</i-col>
						<!-- <i-col span="4">
							<i-icon type="like" size="14" style="text-align: center;" />
							<span>1320</span>
						</i-col> -->
					</i-row>
				</div>

			</div>
		</div>
		<div v-if="list.length < 1" class="noDate">
			<p>没有数据！</p>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['type'],
		data() {
			return {
				isFollow: false, // 是否关注
				list: []
			}
		},
		mounted() {
			this.getList(this.type)
		},
		methods: {
			like (item) {
				if (item.isThumbsUp != 0) {
					this.$http.post('customerRecord/save', {
						recordId: item.id,
						custId: this.$store.state.userInfo.id,
						recordType: 7,
						crType: 1,
						state: -1
					}).then(res => {
						if (res.code === 1) {
							this.getList(this.type)
						}
					})
				} else {
					this.$http.post('customerRecord/save', {
						recordId: item.id,
						custId: this.$store.state.userInfo.id,
						recordType: 7,
						crType: 1,
						state: 1
					}).then(res => {
						if (res.code === 1) {
							this.getList(this.type)
						}
					})
				}
			},
			jump (item) {
				this.$router.push({
          path: '/pages/info/diary',
          query: {
            id: item.id,
            type: 5,
          }
        })
			},
			toFollow () { // 关注用户
				this.isFollow = !this.isFollow
			},
			getList (type) {
				let params = {
					pageNum: 1,
					pageSize: 15
				}
				if (this.$store.state.userInfo.id) {
					params.custId = this.$store.state.userInfo.id
				}
				if (type) {
					params.diaryType = type
					params.isRecommend = 1 // 0
				} else {
					params.isRecommend = 1
				}
				this.$http.post('diaryBook/list4PageForDiaryBook', params).then(res => {
					if (res.code === 1) {
						let a = res.data.data
						// a.map(val => {
						// 	val.diaryContent = val.diaryContent.slice(3, val.diaryContent.length - 4)
						// })
						this.list = a
					}
				})
			},
			focus (item) {
				this.$http.post('focusRecord/save', {
					recordId: item.author, // 关注达人传达人id
					custId: this.$store.state.userInfo.id,
					recordType: 6,
					crType: 1,
					state: item.isFollow ? -1 : 1
				}).then(res => {
					if (res.code === 1) {
						this.getList(this.type)
					}
				})
			}
		},
		watch: {
			'type': function () {
				this.getList(this.type)
			}
		}
	};
</script>

<style scoped>
	.typeDiary-bottom {
		padding: .18rem 0;
		font-size: 0.25rem;
		color: #ACACAC;
	}

	/* .typeDiary-bottom {
		;
	} */

	.typeDiary-price {
		font-size: .2rem;
	}

	.div-hos {
		margin: 25rpx 0;
		padding: .1rem 0 .1rem .2rem;
		background-color: #f5f5f5;
		color: #555;
	}

	.div-hos img {
		vertical-align: sub;
		height: .3rem;
		width: .3rem;
	}

	.div-hos-left {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
		font-size: .22rem;
	}

	.div-type {}

	.typeDiary-type {
		color: #FF4691;
		margin-left: .1rem;
		font-size: 26rpx;
	}

	.typeDiary-details {
		color: #666666;
		font-size: .26rem;
		/* margin-bottom: .1rem; */
		width: 100%;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		margin: 30rpx 0;
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
		border-radius: .1rem;
		position: relative;
		overflow: hidden;
	}

	.typeDiary-before-img {
		height: 100%;
		width: 100%;
	}

	.typeDiary-title {
		padding: .28rem 0 .24rem;
		font-size: 26rpx;
		color: #555;
	}

	.typeDiary-name {
		font-size: 0.3rem;
	}

	.typeDiary-kuang {
    background: #fff;
    margin-bottom: .18rem;
    padding: 0 .24rem;
		width: 100%;
		box-sizing: border-box;
	}

	.typeDiary-img {
		width: .4rem;
		height: .4rem;
	}

	.typeDiary-img img {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	.add_btn {
		display: flex;
		align-items: center;
		color: #FA418C;
		height: 34rpx;
		border-radius: 17rpx;
		border: 1rpx solid #FA418C;
		line-height: 34rpx;
		justify-content: center;
		font-size: 22rpx;
	}
	.footer_bar {
		text-align: center;
	}
	.noDate {
		text-align: center;
		color: #dddddd;
		font-size: 20rpx;
		padding: 17rpx 0;
	}
</style>
