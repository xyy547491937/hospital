<template>
    <div class="information">
        <div class="main">
            <div class="title">如何才能留住面部胶原蛋白</div>
            <div class="infor_top_detail">
                <span class="detail_left">
                    <!-- <img src="http://fs.meiduduo.com/shop/SHOP/other/1532070544384.jpg"> -->
                    <img :src="newsInfo.authorIcon">
                    <em class="detail_source">{{newsInfo.authorName}}</em><br>
                    <em class="detail_fromNow">{{newsInfo.releaseTime}}</em>
                </span>
                <!-- <span class="follow" >+ 关注</span> -->
                <!-- <span class="follow">+已关注</span> -->
            </div>
            <div class="content" v-html="newsInfo.content">
                <!-- <p>
                    如果一个人体内的胶原蛋白比较充足的话，肌肤就学会显得非常水
                    嫩白皙富有弹性;反之，如果你的皮肤缺少胶原蛋白，就会显得暗黄
                    粗糙和松弛，只能被人嘲笑是“黄脸婆”了。那么女人究竟该如何才
                    能留住面部胶原蛋白呢?一起来了解一下吧。
                </p>
                <p>
                    婴儿的皮肤水嫩剔透、吹弹可破，那是因为他们拥有80%的胶原蛋
                    白。而成人会因为污染的环境、糟糕的情绪和自然衰老的规律，致
                    使胶原蛋白不断流失。胶原蛋白如此神奇而宝贵，相信大家一定迫
                    不及待想要走近它和了解它了吧!
                </p> -->
            </div>
            <div class="operation">
                <span class="fabulous">
                    <img :src="img.zan.no" alt="">
                    <!-- {{newsInfo.fabulousNum }} -->
                    <span class="num">{{newsInfo.fabulousNum }}</span>
                </span>
                <span class="collection">
                    <img :src="img.collection.no" alt="">
                    <!-- {{newsInfo.favouriteNum }} -->
                    <span class="num">{{newsInfo.favouriteNum }}</span>
                </span>
            </div>
            <div class="information_review">
                <div v-for="(comment,index) in newsCommenList" :key="index">
                    <div class="review_main">
                        <div class="review_head">
                            <!-- <img src="http://fs.meiduduo.com/shop/icon.jpg"> -->
                            <img :src="comment.icon">
                        </div>
                        <div class="review_content">
                            <div class="review_title">
                                <span class="review_name">{{comment.custName}}</span>
                                <span class="review_num">
                                    <img :src="img.zan.no">
                                    <em>{{comment.fabulousNum}}</em></span>
                            </div>
                            <div class="review_matter2">
                                <p class="review_matter">{{comment.content}}</p>
                            </div>
                            <p class="review_other">
                                <span>{{comment.createDate}}</span> <span>回复</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="comment-input">
                    <img class="place" src="http://img.meiduduo.com/images/info/input_bg.png" alt="">
                    <input type="text" placeholder="写评论.."  placeholder-style="color:#999;font-size:24rpx;" confirm-type="send">

                </div>
                <form action="">
                    <input type="text"  >
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                img:{
                    zan:{
                        no:'/static/images/info/zan1.png',
                        yes:'/static/images/info/zan2.png'
                    },
                    collection:{
                        no:'/static/images/info/details4.png',
                        yes:'/static/images/info/like.png'
                    }
                },
                newsInfo:{},
                newsCommenList:[]
            }
        },
        methods:{
             getInfo(id){
                this.$http.post('/info/queryOneByPkAndUserId',{
                    type:2,id
                }).then(res=>{
                    // console.log(res);
                    if(res.code == '1'){
                        this.newsInfo = res.data
                    }else{
                        wx.showToast({
                            title: '获取失败',
                            icon: 'none'
                        })
                    }
                })
             },
             getCommenList(contentId,commentType,pageNum,pageSize){
                this.$http.post('/comment/list4Page',{
                    contentId,commentType,pageNum,pageSize
                 }
				).then(res=>{
                    console.log(res);
                    if(res.code == '1'){
                        this.newsCommenList = res.data
                    }else{
                        wx.showToast({
                            title: '获取失败',
                            icon: 'none'
                        })
                    }
				})
            }

        },
        onLoad(options){
            console.log(options);

            this.getInfo(options.newsid)
            // 获取评论
            this.getCommenList(options.newsid,'4',1,15)
        }
    }
</script>

<style scoped>
    .information{
        font-family: PingFangSC-Regular;
    }
    .main{
        padding:0 .24rem;
    }
    .title{
        font-size: .38rem;
        color: #333;
        font-weight: bold;
        font-family:PingFangSC-Regular;
        margin-bottom: .44rem;
    }
    .infor_top_detail {
        margin-top: 0.4rem;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        margin-bottom: .48rem;
        justify-content: space-between;
    }
    /* .infor_top_detail>span {
        -webkit-box-flex: 0.5;
        -webkit-flex: 0.5;
        flex: 0.5;
    } */
    .detail_left{
        width: 3rem;
    }
    .detail_left>img {
        width: 0.62rem;
        height: 0.62rem;
        float: left;
        border-radius: 50%;
        margin-right: 0.2rem;
    }
    .detail_left>.detail_source {
        font-size: 0.24rem;
        color: #333333;
    }
    .detail_left>.detail_fromNow {
        font-size: 0.24rem;
        color: #CCCCCC;
    }
    .content{
        font-family: PingFangSC;
        font-size: .24rem;
        color: #333;
        line-height: 50rpx;
    }
    .content p{
        font-size: .24rem;
        line-height: .5rem;
        margin-bottom: .5rem;
    }
    .operation{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: 0 1rem;
    }
    .operation .collection,.operation .fabulous{
        display: inline-block;
        width: 1.52rem;
        height: .55rem;
        border: 1px solid #ccc;
        border-radius: .28rem;
        font-size: .24rem;
        color: #999;
        line-height: .55rem;
        text-align: center;
    }
    .operation span img{
        width: 0.26rem;
        height: 0.27rem;
        vertical-align: middle;
        margin-right: .11rem;
    }
    .operation .num{
        vertical-align: middle;
    }
    .follow{
        width:1.4rem;
        height:.56rem;
        background:rgba(255,70,145,1);
        border-radius:10px;
        font-size: .3rem;
        color: #fff;
        text-align: center;
        line-height: .56rem;
    }
    .information_review{
        padding-bottom: 90rpx;
        margin-bottom:30rpx;
    }
    .information_content {
        background: #FFFFFF;
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
        border-bottom: 1px solid #EEEEEE;
    }
    .review_head, .review_head>img {
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
    .review_other {
        margin-top: 0.2rem;
    }
    .review_title>span {
        -webkit-box-flex: 0.5;
        -webkit-flex: 0.5;
        flex: 0.5;
    }
    .review_name {
        font-size: 0.28rem;
        color: #0f5893;
    }
    .review_title>.review_num {
        text-align: right;
    }
    .review_num>img {
        margin-right:8rpx;
        width: 0.31rem;
        height: 0.29rem;
    }
    .review_num>em {
        display:inline-block;
        color: #CCCCCC;
        line-height: 0.29rem;
        font-size: 28rpx;
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
        font-size: .18rem;
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height:85rpx;
        background: #fff;
    }
    .comment-input{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: .82rem;
        align-items: center;
        padding-left: .5rem;
        padding-right:50rpx;
        border-top: 1px solid #eee;
        position: relative;
    }
    .comment-input img{
        width: .34rem;
        height: .34rem;
        vertical-align: middle;
    }
    .comment-input .place{
        position: absolute;
        left: 75rpx;
        top: 28rpx;
        width: 28rpx;
        height: 20rpx;
    }
    .comment-input input{
        box-sizing: border-box;
        width: 100%;
        height: .54rem;
        border-radius: .26rem;
        padding: 0 .5rem 0 0.6rem;
        background: #F1F1F1;
    }
</style>
