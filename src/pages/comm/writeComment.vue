<template>
<div class="commentbor">
  <div class="footer" v-if="write1 && !status" @click="sendStatusMth">
    <img src="http://img.meiduduo.com/images/info/footer_comment.png" alt="">评论
  </div>
	<div class="write-comment" v-if="write2 && !status">
    <input name="input" placeholder="写评论..." v-model="content" @focus="sendStatusMth"/>
	</div>
  <div class="writeComment1" v-if="status">
    <input name="input1"  v-model="content" :focus="status"/>
    <span class="send" @click="commentSave">发布</span>
  </div>
</div>
</template>

<script>
const dataArr = []
	export default {
		data() {
			return {
        status: false,
        add: false,
        content: ''
			}
    },
    props: {
      write1: Boolean,
      write2: Boolean,
      sendStatus: Boolean,
      contentId: String,
      custId: Number,
      criticId: Number,
      commentId: String,
      commentType: Number
    },
    onShow() {
      this.status = this.sendStatus
    },
    watch: {
      sendStatus() {
        console.log(this.sendStatus)
        this.status = this.sendStatus
      }
    },
		methods: {
      sendStatusMth () {
        this.add =true
        this.status = true
      },
      // 保存评论
        commentSave () {
          var commentType = '', commentId = 0, criticId= ''
          console.log(this.add, this.sendStatus)
          if (this.add) {
            commentType = this.commentType
            commentId = 0
            criticId = ''
          }
          if (this.sendStatus) {
            commentType = 11
            commentId = this.commentId
            criticId= this.criticId
          }
          var option = {
            id: '', // id，新增时为空，修改时必输
            contentId: this.contentId,
            custId: this.custId,
            criticId: this.criticId,
            content: this.content,
            commentId: commentId,
            commentType: commentType
          }
          console.log(option);
          // return

          this.$http.post('/comment/save', option).then((res) => {
            this.add = false
            this.status = false
            this.content = ''
            this.$emit('send')
            this.$emit('sendStatusM', this.status)
          })
        }
		},
	};
</script>

<style scoped>
 .footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: .84rem;
        text-align: center;
        line-height: .84rem;
        background: #f1f1f1;
        font-size: .3rem;
        color: #555;
        z-index: 101;
    }
    .footer img{
        width: .4rem;
        height: .4rem;
        vertical-align: middle;
        margin-right: .1rem;
    }
  .commentbor{
    width: 100%;
    height:84rpx;
    overflow: hidden;
    border-top: 1px solid #f3f3f3;
    position: fixed;
    bottom: 0;
    background: #fff;
    z-index: 100;
  }
  .write-comment{
    width: 7.02rem;
    box-sizing: border-box;
    height: .54rem;
    margin: .16rem auto 0.16rem;
    border-radius: 14px;
    padding-left:.8rem;
    font-size: .24rem;
    color:#999999;
		background:#F1F1F1 url("http://img.meiduduo.com/images/info/input_bg.png") no-repeat .3rem center;
    background-size: .28rem .2rem;
  }
  .write-comment input{
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding-right:.4rem;
		background:#F1F1F1 url("http://img.meiduduo.com/images/face.png") no-repeat 5.6rem center;
    background-size: .36rem;
  }
</style>
