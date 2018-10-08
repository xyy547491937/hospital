<template>
    <div class="follow">
        <div>
            <div>全部关注</div>
            <div class="list-item">
                <div class="item-img">
                    <img src="" alt="">
                </div>
                <div class="item-content">
                    <div class="item-title">石家庄贵美人医疗美容医院</div>
                    <div>省重点医疗机构</div>
                    <div>已约<span>5万+</span></div>
                </div>
                <div class="item-follow"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed:{
            user(){
                return this.$store.state.userInfo
            }
        }
    }
</script>

<style scoped>
    .list-item{
        padding: .2rem .26rem;
        display: flex;
        justify-content: space-between;
    }
    .item-img{
        width: 1.4rem;
        height: 1.4rem;
    }
    .item-title{
        color: #333;
        font-size: .28rem;
    }
</style>    